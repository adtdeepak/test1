angular.module('Tracking')

.controller("businessImpactInitController", function ($scope, CustomService, DataService, DataConversionService,$rootScope, UtilitiesService) {
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
    UtilitiesService.getTotalMemory();
    $rootScope.$broadcast('periodChange');
})

.controller("businessImpactMatricesController", function ($scope, $rootScope,Permission, MenuService, NetworkService, DataService, RequestConstantsFactory ,UtilitiesService, sharedProperties, $location, DataConversionService, StorageService) {

    if($rootScope.selectedPeriod == "weekly")
    	$scope.trendPeriod = "Nov 09 to Nov 13";
    if($rootScope.selectedPeriod == "monthly")
    	$scope.trendPeriod = "Nov 01 to Nov 13";
    if($rootScope.selectedPeriod == "quarterly")
    	$scope.trendPeriod = "Oct 01 to Nov 13";
    if($rootScope.selectedPeriod == "yearly")
    	$scope.trendPeriod = "Jan 01 to Nov 13";
	var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
	$scope.dataLoaded = false;
    $scope.urlIndex = $location.search();
    $scope.menuType = [];
    $scope.menuData = [];
    $scope.userSettings = {};
    $scope.menu = MenuService.getMenu(5, $scope);
    //Setting shared property value when the widget is selected
    $scope.selected = MenuService.widgetSelected;
    $scope.menu.getUserSettings("BI",
								function (userSettingsData) {
								    $scope.userSettings = userSettingsData;
								});
    $rootScope.$on('onCacheExpiry', loadData);
    $scope.$on('periodChange', loadData);
    $scope.$on('menuSave', function () {
        $scope.menu.saveMenu("BI", "", $scope.businessImpact);
    });

    $scope.success = function (trackSummaryBI) {
    	$scope.dataLoaded = true;
        try {
            $scope.error = false;
            if (!trackSummaryBI[$rootScope.selectedPeriod])
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
    $scope.fail = function (msg) {
        $scope.error = true;
        $scope.hasErrorMsg = true;
        $rootScope.$emit('businessImpactDataError');
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

    var requestData = {
        "groupBy": "BI"
    };
    var utilData = UtilitiesService.getRequestData();

    requestData = angular.extend({}, utilData, requestData)
    var cacheKey = "BIM" + JSON.stringify(requestData);

    function loadData() {
    	var func = $scope.success;
    	if (arguments[1]) {
    		if (arguments[1].key == cacheKey) {
    			func = null;
    		} else {
    			return false;
    		}
    	}
    	DataService.getTrackSummaryDataBI(requestData, func, $scope.fail);
    }
    loadData();
})

.controller("businessImpactSummaryController", function ($scope, $rootScope,Permission, DataService, sharedProperties, RequestConstantsFactory,DataConversionService, UtilitiesService, StorageService) {
	var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
    $scope.businessImpactSummary = {};
	$scope.dataLoaded = false;
    $scope.$on('periodChange', loadData);
    $scope.$on('dataReady', loadData);
    $rootScope.$on('onCacheExpiry', loadData);
    
    $rootScope.$on('businessImpactDataError',function(){
		$scope.fail(errorConstants.DATA_ERR);
	})
    $scope.success = function (businessImpactSummary) {
        try {
        	$scope.dataLoaded = true;
            $scope.error = false;
            if(sharedProperties.getSubGroupBy()!= null){
            	businessImpactSummary[$rootScope.selectedPeriod].forEach(function (data) {
                    if (data.subGroupBy == sharedProperties.getSubGroupBy()) {
                        $scope.businessImpactSummary = data;
                    }
                });
            }else{
            	 $scope.businessImpactSummary = businessImpactSummary[$rootScope.selectedPeriod][0];
            }
            
            $scope.forecastText = $scope.Constants[$scope.Constants.BI_Prefix + 'summary_forecast_' + $rootScope.selectedPeriod];
            $scope.toLastText = $scope.Constants[$scope.Constants.BI_Prefix + 'comparedLast_' + $rootScope.selectedPeriod];
            $scope.toLastLYText = $scope.Constants[$scope.Constants.BI_Prefix + 'comparedLastYear_' + $rootScope.selectedPeriod];
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

    var requestData = {
        "groupBy": "BI"
    };
    var utilData = UtilitiesService.getRequestData();

    requestData = angular.extend({}, utilData, requestData);
    var cacheKey = "BIM" + JSON.stringify(requestData);

    function loadData() {
    	var func = $scope.success;
    	if (arguments[1]) {
    		if (arguments[1].key == cacheKey) {
    			func = null;
    		} else {
    			return false;
    		}
    	}
    	DataService.getTrackSummaryDataBI(requestData, func, $scope.fail);
    }
})

.controller("businessImpactTrendController", function ($scope, $rootScope, chartsService, Permission,DataService, RequestConstantsFactory,UtilitiesService, DataConversionService, sharedProperties) {
	
	var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
	$scope.dataLoaded = false;
    $scope.$on('periodChange', loadData);
    $scope.$on('dataReady', loadData);
    $rootScope.$on('onCacheExpiry', loadData);
    $rootScope.$on('businessImpactDataError',function(){
		$scope.fail(errorConstants.DATA_ERR);
	})
    $scope.success = function (businessImpactTrendData) {
        try {
        	if($rootScope.selectedPeriod == "weekly")
             	$scope.trendPeriod = "Sept 06 to Sept 13";
             if($rootScope.selectedPeriod == "monthly")
             	$scope.trendPeriod = "Sept 01 to Sept 30";
             if($rootScope.selectedPeriod == "quarterly")
             	$scope.trendPeriod = "Jul 01 to Sept 30";
             if($rootScope.selectedPeriod == "yearly")
             	$scope.trendPeriod = "Jan 01 to Sept 30";
        	$scope.dataLoaded = true;
            $scope.error = false;
            chartOBJ = chartsService.splineArea.call($('#subsTrendChart'), businessImpactTrendData[$rootScope.selectedPeriod], businessImpactTrendData[$rootScope.selectedPeriod].chartOptions, $scope);
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
    	

    function loadData() {
    	var requestData = UtilitiesService.getRequestData();
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
    	DataService.getBusinessImpactTrendData(requestData, func, $scope.fail);

    }

})

.controller("businessImpactDeepDiveController", function ($scope, $rootScope, DataService, Permission, sharedProperties, RequestConstantsFactory , DataConversionService, UtilitiesService) {
	var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
	$scope.dataLoaded = false;
    $scope.options = UtilitiesService.getDataTableOptions();
    $rootScope.$on('onCacheExpiry', loadData);
    $scope.$on('periodChange', loadData);
    $scope.$on('dataReady', loadData);
    
    $rootScope.$on('businessImpactDataError',function(){
		$scope.fail(errorConstants.DATA_ERR);
	})
    $scope.addData = function (_data) {
        try {
        	$scope.dataLoaded = true;
        	data = _data[$rootScope.selectedPeriod];
            $scope.error = false;
            $scope.options.aaData = [];
            if (!data)
                throw "noDataError";
            $.each(data, function (key, obj) {
                obj.versusLastWeekTrend == 'up' ? $scope.img = "<img  src='images/arrow-up-green.png' alt='arrow'width='10px' height='5px' title='arrow' />"
					: $scope.img = "<img  src='images/arrow-red.png' alt='arrow'width='10px' height='5px' title='arrow' />";
                obj.versusLastYearTrend == 'up' ? $scope.img1 = "<img  src='images/arrow-up-green.png' alt='arrow'width='10px' height='5px' title='arrow' />"
					: $scope.img1 = "<img  src='images/arrow-red.png' alt='arrow'width='10px' height='5px' title='arrow' />";
                $scope.options.aaData.push([obj.userGroupName, obj.wtdActual, obj.curWeekForecast, obj.curWeekTarget, obj.diffFromTarget, $scope.img
				                            + obj.versusLastWeek, $scope.img1 + obj.versusLastYear]);
            })
    	
            $scope.timePeriodText = $scope.Constants[$scope.Constants.BI_Prefix + 'DeepDive_' + $scope.selectedPeriod];
            $scope.sameLastYearText = $scope.Constants[$scope.Constants.BI_Prefix + 'sameLastYearText_' + $scope.selectedPeriod];
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

    var requestData = {
        "groupBy": "userGroup"
    };


    function loadData() {
    	var utilData = UtilitiesService.getRequestData();
    	requestData = angular.extend({}, utilData, requestData);
    	var cacheKey = "BID" + JSON.stringify(requestData);
    	var func = $scope.addData;
    	if (arguments[1]) {
    		if (arguments[1].key == cacheKey) {
    			func = null;
    		} else {
    			return false;
    		}
    	}
    	DataService.getBusinessImpactDeepDiveTableData(requestData, func, $scope.fail);

    }
})