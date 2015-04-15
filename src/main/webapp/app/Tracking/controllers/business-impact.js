angular.module('Tracking')

.controller("businessImpactInitController",['$scope','CustomService','DataService' ,'DataConversionService','$rootScope','UtilitiesService',
                                            function ($scope, CustomService, DataService, DataConversionService,$rootScope, UtilitiesService) {
    angular.element(document).ready(function () {

        var chartOBJ = {};
        var classNames = [];
        $('.newSubsTrendTab .tabItem').on('click', function () {
            if ($(this).hasClass('active')) {
                return false;
            }
            $(this).addClass('active').siblings('li').removeClass('active');
            $('.subsTrendCohort, #subsTrendCohort, .subsTrendChart, #subsTrendChart').toggleClass('hidden');
            $('.deepDive2, #deepDive2, .deepDive1, #deepDive1').toggleClass('hidden');
        });
        setTimeout(function () { CustomService.appInit(); }, 1000);
    });    
    //For getting amount of local storage used
    UtilitiesService.getTotalMemory();
    $rootScope.$broadcast('periodChange');
}])

.controller("businessImpactMatricesController",['$scope','$rootScope','Permission','MenuService','NetworkService','DataService','RequestConstantsFactory','UtilitiesService','sharedProperties','$location','DataConversionService','StorageService',
                                                function ($scope, $rootScope,Permission, MenuService, NetworkService, DataService, RequestConstantsFactory ,UtilitiesService, sharedProperties, $location, DataConversionService, StorageService) {
	//This will check session is valid or not
	UtilitiesService.checkValidSession(location, $scope);
	var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
	$scope.initialFlag = true;
	$scope.dataLoaded = false;
    $scope.urlIndex = $location.search();
    $scope.menuType = [];
    $scope.menuData = [];
    $scope.userSettings = {};
    
    $scope.menu = MenuService.getMenu(5, $scope);
    //Widget to be selected
    $scope.selected = MenuService.widgetSelected;
    $scope.menu.getUserSettings("BI",
								function (userSettingsData) {
								    $scope.userSettings = userSettingsData;
								});
    //Watching cache expiry
    $rootScope.$on('onCacheExpiry', loadData);
    $scope.$on('periodChange',function(){
	    $scope.dataLoaded = false;
        $scope.error = false;
		loadData();
	});
    
    //Watching any change in widget selection menu 
    $scope.$on('menuSave', function () {
        $scope.menu.saveMenu("BI", "Business Impact", $scope.userSettings);
    });

    //Success function for business impact matrices
    $scope.success = function (trackSummaryBI) {
    	$scope.dataLoaded = true;
        try {
            $scope.error = false;
            if (trackSummaryBI[$rootScope.selectedPeriod].length == 0)
                throw { message: "Selected period data not available!", type: "internal" };
            $scope.businessImpact = trackSummaryBI[$rootScope.selectedPeriod];
            $scope.menu.setData($scope.businessImpact);
            $scope.forecastText = $scope.Constants[$scope.Constants.BI_Prefix + 'forecast_' + $scope.selectedPeriod];
            $scope.vsLastText = $scope.Constants[$scope.Constants.BI_Prefix + 'vsLast_' + $scope.selectedPeriod];
            $scope.vsLastYearText = $scope.Constants[$scope.Constants.BI_Prefix + 'vsLastYear_' + $scope.selectedPeriod];
        } catch (e) {
        	$scope.fail(errorConstants.DATA_ERR);
        }
    }
    
    //Failure function for business impact matrices
    $scope.fail = function (msg) {
        $scope.error = true;
        $scope.hasErrorMsg = true;
        $rootScope.$emit('businessImpactDataError');
        if(msg){
        	if(msg instanceof Object){
        		$scope.errorMsg = (msg.message == "" ? errorConstants.NETWORK_ERR  : msg.status+" : "+msg.message);
        	} else {
                $scope.errorMsg = msg;
        	}
        }
    }

    //Load function for business impact matrices
    function loadData(forceSilent) {
    	var requestData = {"groupBy": "BI"};
    	var utilData = UtilitiesService.getRequestData();
		var func = $scope.success; 
    	if($scope.initialFlag == true){
    		$scope.initialFlag = false;
			var utilData = UtilitiesService.getInitialRequestData();
		}else if(forceSilent == true){
    		var func = null; 
		}
		requestData = angular.extend({}, utilData, requestData);
		var cacheKey = "BIM" + JSON.stringify(requestData);
    	if (arguments[1]) {
    		if (arguments[1].key == cacheKey) {
    			func = null;
    		} else {
    			return false;
    		}
    	}
    	//Data service call for business impact matrices values
    	DataService.getTrackSummaryDataBI(requestData, func, $scope.fail);
    }
    loadData();
	loadData(true);
}])

.controller("businessImpactSummaryController",['$scope','$rootScope','Permission','DataService','sharedProperties','RequestConstantsFactory','DataConversionService','UtilitiesService','StorageService',
                                               function ($scope, $rootScope,Permission, DataService, sharedProperties, RequestConstantsFactory,DataConversionService, UtilitiesService, StorageService) {
	var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
	$scope.businessImpactSummary = {};
	$scope.dataLoaded = false;
	$scope.$on('periodChange',function(){
		$scope.dataLoaded = false;
		$scope.error = false;
		loadData();
	});

	$scope.$on('dataReady', function(event, widgetType){
		if(widgetType == "BI"){
			loadData();
		}
	})
	
	//Watching any selection in widget
	$rootScope.$on('widgetSelected', function(event, widgetType){
		//Checking whether the widget selection is made in BI 
		if(widgetType == "BI"){
			loadData();
		}
	})
	//Watch for cache Expired
	$rootScope.$on('onCacheExpiry', loadData);

	//Watching widget error(matrices section) - if error, this widgets summary section should not be shown 
	$rootScope.$on('businessImpactDataError',function(){
		$scope.fail(errorConstants.DATA_ERR);
	})
	
	//Success function for summary of BI widgets
	$scope.success = function (businessImpactSummary) {
		try {
			$scope.dataLoaded = true;
			$scope.error = false;
			businessImpactSummary[$rootScope.selectedPeriod].forEach(function (data) {
				if (data.subGroupBy == sharedProperties.getSubGroupBy()) {
					$scope.businessImpactSummary = data;
				}
			});
			$scope.forecastText = $scope.Constants[$scope.Constants.BI_Prefix + 'summary_forecast_' + $rootScope.selectedPeriod];
			$scope.toLastText = $scope.Constants[$scope.Constants.BI_Prefix + 'comparedLast_' + $rootScope.selectedPeriod];
			$scope.toLastLYText = $scope.Constants[$scope.Constants.BI_Prefix + 'comparedLastYear_' + $rootScope.selectedPeriod];
		} catch (e) {
			$scope.fail(errorConstants.DATA_ERR);
		}
	}
	
	//Failure function for summary of BI widgets
	$scope.fail = function (msg) {
		$scope.error = true;
		$scope.hasErrorMsg = true;
		if(msg){
			if(msg instanceof Object){
				$scope.errorMsg = (msg.message == "" ? errorConstants.NETWORK_ERR  : msg.status+" : "+msg.message);
			} else {
				$scope.errorMsg = msg;
			}
		}
	}

	//Load function for summary of BI widgets
	function loadData() {
		var requestData = {"groupBy": "BI"};
		var utilData = UtilitiesService.getRequestData();
		requestData = angular.extend({}, utilData, requestData);
		var cacheKey = "BIM" + JSON.stringify(requestData);
		var func = $scope.success;
		if (arguments[1]) {
			if (arguments[1].key == cacheKey) {
				func = null;
			} else {
				return false;
			}
		}
		//Data Service for summary of BI widgets - same call as for BI matrices section
		DataService.getTrackSummaryDataBI(requestData, func, $scope.fail);
	}
}])

.controller("businessImpactTrendController",['$scope','$rootScope','chartsService','Permission','DataService','RequestConstantsFactory','UtilitiesService','DataConversionService','sharedProperties',
                                             function ($scope, $rootScope, chartsService, Permission,DataService, RequestConstantsFactory,UtilitiesService, DataConversionService, sharedProperties) {
	
	var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
	$scope.dataLoaded = false;
	$scope.$on('periodChange',function(){
		$scope.dataLoaded = false;
		$scope.error = false;
		loadData();
	});

	$scope.$on('dataReady', function(event, widgetType){
		if(widgetType == "BI"){
			loadData();
		}
	})
	
	//Watching any selection in widget
	$rootScope.$on('widgetSelected', function(event, widgetType){
		if(widgetType == "BI"){
			loadData();
		}
	})
	//Watch for cache Expired
	$rootScope.$on('onCacheExpiry', loadData);
	
	//Watching widget error(matrices section) - if error, this trend section should not be shown 
	$rootScope.$on('businessImpactDataError',function(){
		$scope.fail(errorConstants.DATA_ERR);
	})
	
	//Success function for BI Trend
	$scope.success = function (businessImpactTrendData) {
		try {
			$scope.dataLoaded = true;
			$scope.error = false;
			chartOBJ = chartsService.splineArea.call($('#subsTrendChart'), businessImpactTrendData[$rootScope.selectedPeriod], businessImpactTrendData[$rootScope.selectedPeriod].chartOptions, $scope);
		} catch (e) {
			$scope.fail(errorConstants.DATA_ERR);
		}
	}
	
	//Failure function for BI Trend
	$scope.fail = function (msg) {
		$scope.error = true;
		$scope.dataLoaded = true;
		$scope.hasErrorMsg = true;
		if(msg){
			if(msg instanceof Object){
				$scope.errorMsg = (msg.message == "" ? errorConstants.NETWORK_ERR  : msg.status+" : "+msg.message);
			} else {
				$scope.errorMsg = msg;
			}
		}
	}

	//Load function for BI Trend
	function loadData() {
		var requestData = UtilitiesService.getRequestData();
		//Getting the widget which is selected
		requestData['groupBy'] = sharedProperties.getSubGroupBy();
		var cacheKey = "BITrend" + JSON.stringify(requestData);
		var func = $scope.success;
		if (arguments[1]) {
			if (arguments[1].key == cacheKey) {
				func = null;
			} else {
				return false;
			}
		}
		if(sharedProperties.getSubGroupBy() != null){
			//Data service call for BI Trend
			DataService.getBusinessImpactTrendData(requestData, func, $scope.fail);
		}
	}

}])

.controller("businessImpactDeepDiveController",['$scope','$rootScope','DataService','Permission','sharedProperties','RequestConstantsFactory','DataConversionService','UtilitiesService',
                                                function ($scope, $rootScope, DataService, Permission, sharedProperties, RequestConstantsFactory , DataConversionService, UtilitiesService) {
	
	var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
	$scope.dataLoaded = false;
	$scope.options = UtilitiesService.getDataTableOptions();
	//Watch for cache Expired
	$rootScope.$on('onCacheExpiry', loadData);
	$scope.$on('periodChange',function(){
		$scope.dataLoaded = false;
		$scope.error = false;
		loadData();
	});

	$scope.$on('dataReady', function(event, widgetType){
		if(widgetType == "BI"){
			loadData();
		}
	})
	$rootScope.$on('widgetSelected', function(event, widgetType){
		if(widgetType == "BI"){
			$scope.trigger = false;
			$scope.$apply();
			loadData();
		}
	})

	//Watching widget error(matrices section) - if error, this deep dive section should not be shown 
	$rootScope.$on('businessImpactDataError',function(){
		$scope.fail(errorConstants.DATA_ERR);
	})
	
	//Success function for BI deep dive
	$scope.addData = function (data) {
		try {
			$scope.dataLoaded = true;
			$scope.error = false;
			$scope.options.aaData = [];
			if (data.length == 0)
				throw "noDataError";
			var countWidget = 0;
			var aoColumns = [];
			var aaData = [];
			var selectedData = [];
			$.each(data[$rootScope.selectedPeriod], function(key, eachData){
				if(eachData.groupBy == sharedProperties.getSubGroupBy()){
					selectedData = eachData.deepDive;
					countWidget++;
				}
			})

			if(countWidget==0){
				$scope.hasNoDeepDive = true;
			}
			if(selectedData.length!=0){
				//Loading dynamic header in table
				$.each(selectedData, function(key, value){
					var tempObj = {
							"sTitle": value.field
					};
					aaData.push(value.value);
					aoColumns.push(tempObj);
				})
			}
			$scope.options.aoColumns = aoColumns;
			$scope.options.aaData = aaData;
			//This will trigger each time deep dive is loaded
			$scope.trigger = true;
		} catch (e) {
			$scope.fail(errorConstants.DATA_ERR);
		}
	};

	//Failure function for BI deep dive
	$scope.fail = function (msg) {
		$scope.error = true;
		$scope.hasErrorMsg = true;
		if(msg){
			if(msg instanceof Object){
				$scope.errorMsg = (msg.message == "" ? errorConstants.NETWORK_ERR  : msg.status+" : "+msg.message);
			} else {
				$scope.errorMsg = msg;
			}
		}
	}
	
	//Load function for BI deep dive
	function loadData() {
		$scope.hasNoDeepDive = false;
		var requestData = UtilitiesService.getRequestData();
		//Getting the widget which is selected
		requestData['groupBy'] = sharedProperties.getSubGroupBy();
		var cacheKey = "BID" + JSON.stringify(requestData);
		var func = $scope.addData;
		if (arguments[1]) {
			if (arguments[1].key == cacheKey) {
				func = null;
			} else {
				return false;
			}
		}
		//Data service call for BI Deep Dive table
		DataService.getBusinessImpactDeepDiveTableData(requestData, func, $scope.fail);

	}
}])