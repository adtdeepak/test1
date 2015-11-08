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
	
	if(!$scope.urlIndex.currentlySelected){
    	$scope.urlIndex = {"currentlySelected": "OfficeGoers", "name": "Office Goers"}
    }
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

	$scope.$on('periodChange', updateData);
	$rootScope.$on('onCacheExpiry', loadData);
	$scope.$on('menuSave', function () {
		$scope.menu.saveMenu("UG", "", $scope.userGroup);
	});
	
	function updateData(){
		$scope.dataLoaded = true;
		$scope.error = false;
		if (!$scope.successData[$rootScope.selectedPeriod])
			throw { message: "Selected period data not available!", type: "internal" };
			$scope.userGroup = $scope.successData[$rootScope.selectedPeriod];
			$.each($scope.successData[$rootScope.selectedPeriod], function(key, value){
				if(value.groupBy == $scope.select){
					$scope.menu.setData($scope.userGroup);
					$scope.menu.selected(value);
				}
			})
			$scope.averageTimePeriodText = $scope.Constants[$scope.Constants.EA_Prefix + 'averagePeriod_' + $scope.selectedPeriod];
	}

	$scope.success = function(userGroup) {
		try{ 

			console.log(userGroup);
			$scope.successData = userGroup;
			updateData();
			$scope.menu.setData($scope.userGroup);
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

	/*$scope.$watch(
			function(){
				return sharedProperties.getSubGroupBy();
			},
			function (newValue) {
				loadData();
			}
	);*/

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

	loadData();
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
				$scope.timePeriodText =  $scope.Constants[$scope.Constants.TRACK_Prefix + $rootScope.selectedPeriod];
				$scope.averageTimePeriodText = $scope.Constants[$scope.Constants.EA_Prefix + 'averagePeriod_' + $scope.selectedPeriod];
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
					$scope.trendPeriod = "Sept 06 to Sept 12";
				if($rootScope.selectedPeriod == "monthly")
					$scope.trendPeriod = "Sept 01 to Sept 30";
				if($rootScope.selectedPeriod == "quarterly")
					$scope.trendPeriod = "Jul 01 to Sept 30";
				if($rootScope.selectedPeriod == "yearly")
					$scope.trendPeriod = "Jan 01 to Sept 30";
	        	$scope.dataLoaded = true;
	            $scope.error = false;
	            $scope.heading = sharedProperties.getHeading();
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
