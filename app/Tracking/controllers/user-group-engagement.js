angular.module('Tracking')

.controller("userGroupInitController",function($scope, CustomService, UtilitiesService ,$rootScope){

	var chartOBJ = {};
	var classNames = [];

	$('.groupTime.active').removeClass('active');
	$('.groupTime.week').addClass('active');

	setTimeout(function(){CustomService.appInit();},1);
	UtilitiesService.getTotalMemory();
	$rootScope.$broadcast('periodChange');
})

.controller("modalContentController",function($scope,UtilitiesService,RequestConstantsFactory,$rootScope){
	
	var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
	$scope.campaignViewOptions = {
			bPaginate: false,
	};
	$scope.currentData = {};
	$scope.options= UtilitiesService.getDataTableOptions();
	$.extend(true,$scope.options,$scope.campaignViewOptions);
	$scope.$on('CampaignData',addData);
	$scope.$on('UGClicked', function(object,index){
		addData(index);
	});

	function addData(index,campaignData) {
		try{
			if(campaignData instanceof Object) {
			$scope.currentData = campaignData;
			return false;
		}
		else
		{	
			var index = index; 
		}
		$.each($scope.currentData.data[index].campaignDetails, function(key, obj){
				$scope.options.aaData = [];
				$scope.options.aaData.push([obj.campaignName,obj.channel,obj.timeRemaining]);
				$scope.$apply();
		});
		}
		catch(e){
			$scope.fail(errorConstants.DATA_ERR);
		}
	};
	 $scope.fail = function (msg) {
	        $scope.error = true;
	        $scope.hasErrorMsg = true;
	        $scope.$apply();
	        if(msg){
	        	if(msg instanceof Object){
	        		$scope.errorMsg = (msg.statusText == "" ? errorConstants.NETWORK_ERR  : msg.statusText);
	        	} else {
	                $scope.errorMsg = msg;
	                $scope.$apply();
	        	}
	        }
	    }
})
.controller("overallUserGroupSummaryController",function($scope, $rootScope, MenuService, RequestConstantsFactory,sharedProperties,Permission, NetworkService, DataConversionService, DataService, sharedProperties, $location, UtilitiesService){

	var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
	$scope.dataLoaded = false;
	$scope.urlIndex = $location.search();
	$scope.select = $scope.urlIndex.currentlySelected;
	$scope.userSettings = {};
	$scope.menuType = [];
	$scope.menuData=[];
	$scope.userSettings = {};
	$scope.menu = MenuService.getMenu(5, $scope);

   
	$scope.menu.getUserSettings("UG",
			function(userSettingsData) {
		$scope.userSettings = userSettingsData;
	});

	$scope.$on('periodChange', loadData);
	$rootScope.$on('onCacheExpiry', loadData);
	$scope.$on('menuSave', function () {
		$scope.menu.saveMenu("UG", "", $scope.userGroup);
	});

	$scope.success = function(userGroup) {
		try{ 
			if($rootScope.selectedPeriod == 'weekly'){
		    	$scope.timePeriod = "Weekly";
		    }else {
		    	$scope.timePeriod = "Monthly";
		    }
			$scope.dataLoaded = true;
			$scope.error = false;
			 if (!userGroup[$rootScope.selectedPeriod])
	                throw { message: "Selected period data not available!", type: "internal" };
			$scope.userGroup = userGroup[$rootScope.selectedPeriod];
			$scope.menu.setData($scope.userGroup);
			$scope.averageTimePeriodText = $scope.Constants[$scope.Constants.EA_Prefix + 'averagePeriod_' + $scope.selectedPeriod];
		} catch (e) {
			$scope.fail(errorConstants.DATA_ERR);
		}
	}
	$scope.fail = function (msg) {
		$rootScope.$emit('UserGroupError')
        $scope.error = true;
        $scope.hasErrorMsg = true;
        if(msg){
        	if(msg instanceof Object){
        		$scope.errorMsg = (msg.statusText == "" ? errorConstants.NETWORK_ERR  : msg.statusText);
        	} else {
                $scope.errorMsg = msg;
        	}
        }
    }

	$scope.$watch(
			function(){
				return sharedProperties.getSubGroupBy();
			},
			function (newValue) {
				loadData();
			}
	);

	var requestData=
	{
			"groupBy": "UsrGrp1"
	};
	var utilData = UtilitiesService.getRequestData();

	requestData = $.extend(true,requestData,utilData);
	var cacheKey = "UGS" + JSON.stringify(requestData);
	function loadData() { 
		var func = $scope.success; 
		if (arguments[1]) { 
			if (arguments[1].key == cacheKey) { 
				func = null; 
			} else { 
				return false; 
			} 
		} 
		DataService.getTrackSummaryUserGroup(requestData, func, $scope.fail); 

	} 

	//loadData();
})

.controller("userGroupSummaryController",function($scope, $rootScope, Permission,RequestConstantsFactory,sharedProperties, DataService, UtilitiesService){
	var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
	$scope.dataLoaded = false;
	$rootScope.$on('onCacheExpiry', loadData);
	$scope.$on('periodChange', loadData);
	$scope.$on('dataReady', loadData);
	//To load the summary once the ajax call complete
	$scope.loadingIsDone = false;
	$scope.activeUserPerText = "";
	$scope.avgLoginPerText = "";

	 $rootScope.$on('UserGroupError',function(){
			$scope.fail(errorConstants.DATA_ERR);
		})
	$scope.success = function (UserGroupSummary) {
		try{
			$scope.dataLoaded = true;
			if(!UserGroupSummary[$rootScope.selectedPeriod]){
				$scope.error = true;
			}
			else{
				$scope.error = false;
				UserGroupSummary[$rootScope.selectedPeriod].forEach(function(data){
					if(data.groupBy == sharedProperties.getSubGroupBy()) {
						$scope.UserGroupSummary = data;
					}
				});
				$scope.heading = sharedProperties.getHeading();
				$scope.forecastText = $scope.Constants[$scope.Constants.EA_Prefix + 'summary_forecast_' + $rootScope.selectedPeriod];
				$scope.toLastText = $scope.Constants[$scope.Constants.EA_Prefix + 'comparedLast_' + $rootScope.selectedPeriod];
				$scope.toLastLYText = $scope.Constants[$scope.Constants.EA_Prefix + 'comparedLastYear_' + $rootScope.selectedPeriod];
			}
		} catch (e) {
			$scope.fail(errorConstants.DATA_ERR);
		}

	}
	$scope.fail = function (msg) {
        $scope.error = true;
        $scope.hasErrorMsg = true;
        if(msg){
        	if(msg instanceof Object){
        		$scope.errorMsg = (msg.statusText == "" ? errorConstants.NETWORK_ERR  : msg.statusText);
        	} else {
                $scope.errorMsg = msg;
        	}
        }
    }
	//Watching the value of shared property
	$scope.$watch(
			function () {
				return sharedProperties.getSubGroupBy();
			},
			function (newValue) {
				loadData();
			}
	);

	var requestData=
	{
			"groupBy": "UsrGrp1"
	};
	var utilData = UtilitiesService.getRequestData();

	requestData = $.extend(true,requestData,utilData);
	var cacheKey = "UGS" + JSON.stringify(requestData);
	function loadData() {
		var func = $scope.success; 
		if (arguments[1]) { 
			if (arguments[1].key == cacheKey) { 
				func = null; 
			} else { 
				return false; 
			} 
		} 
		DataService.getTrackSummaryUserGroup(requestData, func, $scope.fail); 

	} 
})

.controller("userGroupTrendController",function($scope, $rootScope, chartsService, Permission,DataService, ChartOptionsService,RequestConstantsFactory, DataConversionService, UtilitiesService, sharedProperties){
	var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
	$scope.dataLoaded = false;
	$scope.$on('periodChange', loadData);
	$rootScope.$on('onCacheExpiry', loadData);
	$scope.$on('dataReady', loadData);

	 $rootScope.$on('UserGroupError',function(){
			$scope.fail(errorConstants.DATA_ERR);
		})
	$scope.success = function(uGTrendData) {
		 try {
	            if($rootScope.selectedPeriod == "weekly")
	            	$scope.trendPeriod = "Nov 09 to Nov 13";
	            if($rootScope.selectedPeriod == "monthly")
	            	$scope.trendPeriod = "Nov 01 to Nov 13";
	            if($rootScope.selectedPeriod == "quarterly")
	            	$scope.trendPeriod = "Oct 01 to Nov 13";
	            if($rootScope.selectedPeriod == "yearly")
	            	$scope.trendPeriod = "Jan 01 to Nov 13";
	        	$scope.dataLoaded = true;
	            $scope.error = false;
	            chartOBJ = chartsService.splineArea.call($('#trendChart'), uGTrendData[$rootScope.selectedPeriod], uGTrendData[$rootScope.selectedPeriod].chartOptions, $scope);
	        } catch (e) {
	        	$scope.fail(errorConstants.DATA_ERR);
	        }
		
	}
	$scope.fail = function (msg) {
        $scope.error = true;
        $scope.hasErrorMsg = true;
        if(msg){
        	if(msg instanceof Object){
        		$scope.errorMsg = (msg.statusText == "" ? errorConstants.NETWORK_ERR  : msg.statusText);
        	} else {
                $scope.errorMsg = msg;
        	}
        }
    }

	var requestData={
			"groupBy" : "UsrGrp1"
	};
	var utilData = UtilitiesService.getRequestData();

	requestData = $.extend(true, requestData, utilData);
	var cacheKey = "UGTrend" + JSON.stringify(requestData);

	function loadData() { 
		var requestData = UtilitiesService.getRequestData();
    	requestData['groupBy'] = sharedProperties.getSubGroupBy();
		var func = $scope.success; 
		if (arguments[1]) { 
			if (arguments[1].key == cacheKey) { 
				func = null; 
			} else { 
				return false; 
			} 
		} 
		DataService.getUserGroupTrendData(requestData, func, $scope.fail); 

	} 
})

.controller("userGroupDeepDiveController",function($scope, $rootScope, DataService, Permission,DataConversionService, RequestConstantsFactory,UtilitiesService){
	var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
	$scope.dataLoaded = false;
	$scope.campaignTableoptions= UtilitiesService.getDataTableOptions();
	$scope.engagementTableOptions= UtilitiesService.getDataTableOptions();
	$rootScope.$on('onCacheExpiry', loadData);
	$scope.$on('periodChange',loadData);
	$scope.$on('dataReady', loadData);
	$scope.currentView = "campaign";
	
	 $rootScope.$on('UserGroupError',function(){
			$scope.fail(errorConstants.DATA_ERR);
		})
	$scope.changeCurrentView = function(value){
		$scope.currentView = value;
	};
	$scope.addCampaignData = function (data) {
		try{
			$scope.dataLoaded = true;
			$scope.error = false;
			$scope.campaignTableoptions.aaData = [];
			 if (!data)
	                throw "noDataError";
			$.each(data, function(key, obj){
				$scope.campaignTableoptions.aaData.push(["<a href='#' data-modal='#campaignDialog' name='modal' id='"+obj.groupId+"' ng-click='ugClicked' class='campaignDialog'>"+obj.groupName+"</a>",
				                                         obj.noOfUsers,obj.baseExpectedConv,
				                                         obj.newUsersAchieved,
				                                         obj.comparedToLastPeriod,
				                                         obj.target,
				                                         obj.convUplift,
				                                         obj.timeRemaining
				                                         ]);
			})
		} catch (e) {
			console.log("ERROR TH",$scope.error)
			$scope.fail(errorConstants.DATA_ERR);
		}
	};
	$scope.addEngagementData = function (data) {
		try{
			$scope.dataLoaded = true;
			$scope.error = false;
			$scope.engagementTableOptions.aaData = [];
			$.each(data, function(key, obj){
				$scope.engagementTableOptions.aaData.push([obj.groupName,obj.activeUsers,obj.avgLogins,
				                                           obj.recurringBooking,
				                                           obj.arpu,
				                                           obj.engagementLevel,
				                                           obj.engagementScore
				                                           ]);
			})
		} catch (e) {
			$scope.fail(errorConstants.DATA_ERR);
		}
	};
	$scope.fail = function (msg) {
        $scope.error = true;
        $scope.hasErrorMsg = true;
        if(msg){
        	if(msg instanceof Object){
        		$scope.errorMsg = (msg.statusText == "" ? errorConstants.NETWORK_ERR  : msg.statusText);
        	} else {
                $scope.errorMsg = msg;
        	}
        }
    }
	
	var campaignReqData={
			"groupBy" : "cmpgnView",
	};
	var engagementReqData={
			"groupBy" : "engmtView",
	};
	var campaignReqData = $.extend(true,campaignReqData, UtilitiesService.getRequestData());
	var engagementReqData = $.extend(true,engagementReqData, UtilitiesService.getRequestData());

	var cacheKey = "UGDD" + JSON.stringify(campaignReqData);

	function loadData(addCampaignData, addEngagementData) {
		console.log("DEEEP DR EXECUTED!!")
		var addCampaignDataCallback = $scope.addCampaignData; 
		var addEngagementDataCallback = $scope.addEngagementData;
		if (arguments[1]) { 
			if (arguments[1].key == cacheKey) { 
				addCampaignData = addEngagementData = null;
			} else { 
				return false; 
			} 
		} 

		DataService.getUserGroupDeepDiveData(campaignReqData, addCampaignDataCallback, $scope.fail);
		DataService.getUserGroupDeepDiveData(engagementReqData, addEngagementDataCallback, $scope.fail);

	} 
})