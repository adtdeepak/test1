angular.module('Tracking')

.controller("engagementActivityInitController", function ($scope, CustomService, DataService, $rootScope, UtilitiesService) {

    angular.element(document).ready(function () {
        var chartOBJ = {};
        var classNames = [];
        $('.acquisitiontabs .heatMap').on('click', function () {
            var btn = $(this);
            if (btn.hasClass('active')) {
                return false;
            }
            btn.addClass('active').siblings('li').removeClass('active');
        });
        setTimeout(function () { CustomService.appInit(); }, 1);
    });
    UtilitiesService.getTotalMemory();
    $rootScope.$broadcast('periodChange');

})

.controller("engagementScoreController", function ($scope, $rootScope, chartsService, DataService, Permission, CustomService, $location, ChartOptionsService, DataConversionService, RequestConstantsFactory, UtilitiesService) {
    var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
    $scope.dataLoaded = false;
    $rootScope.$on('onCacheExpiry', loadData);
    $scope.$on('periodChange', loadData);
   // $scope.$on('dataReady', loadData);

    $scope.success = function (engagementScore) {
        try {
            $scope.dataLoaded = true;
            if (!engagementScore[$rootScope.selectedPeriod]) {
                $scope.error = true;
            }
            else {
                $scope.error = false;
                var scoreChartOptions = ChartOptionsService.getEngagementActivityScoreData();
                chartOBJ = chartsService.line.call($('#scoreChart'), engagementScore[$rootScope.selectedPeriod], scoreChartOptions, $scope);
                loadDonutChart(engagementScore['engagementScore']);
            }
        } catch (e) {
            $scope.fail(errorConstants.DATA_ERR);
        }
    }
    $scope.fail = function (msg) {
        $scope.error = true;
        $scope.hasErrorMsg = true;
        if (msg) {
            if (msg instanceof Object) {
                $scope.errorMsg = (msg.statusText == "" ? errorConstants.NETWORK_ERR : msg.statusText);
            } else {
                $scope.errorMsg = msg;
            }
        }
    }
    var requestData = {
        "timeRanges": [{
            "maxRows": "5"
        }, {
            "maxRows": "5"
        }, {
            "maxRows": "5"
        }, {
            "maxRows": "5"
        }]
    };
    var utilData = UtilitiesService.getRequestData();
    $.extend(true, requestData, utilData);
    var cacheKey = "EAScore" + JSON.stringify(requestData);


    function loadDonutChart(engagementScore) {
        $scope.engagementScore = engagementScore;

        var options = {
            percentage: $scope.engagementScore.score,
            radius: 80,
            width: 28,
            number: $scope.engagementScore.score,
            text: '',
            colors: ['#F6F6F6', '#0070C0'],
            duration: 500
        };
        CustomService.addDonutCircle('engagementScore', options);
    }

    function loadData() {
        var func = $scope.success;
        if (arguments[1]) {
            if (arguments[1].key == cacheKey) {
                func = null;
            } else {
                return false;
            }
        }
        DataService.getEngagementActivityScoreData(requestData, func, $scope.fail);
    }
    loadData();
})

.controller("engagementActivityMatricesController", function ($scope, $rootScope, MenuService, Permission, RequestConstantsFactory, NetworkService, DataService, $location, sharedProperties, DataConversionService, UtilitiesService) {
    var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
    $scope.dataLoaded = false;
    $scope.urlIndex = $location.search();
    $scope.select = $scope.urlIndex.currentlySelected;
    $scope.menuType = [];
    $scope.menuData = [];
    $scope.val1 = false;
    $scope.val2 = true;
    $scope.userSettings = {};
    $scope.menu = MenuService.getMenu(4, $scope, 'engmtScore');

    $scope.menu.getUserSettings("EA",
			function (userSettingsData) {
    	//console.log("getUserSettings:", userSettingsData)
			    $scope.userSettings = userSettingsData;
			});

    //Watch for SummaryExpired
    $rootScope.$on('onCacheExpiry', loadData);

    $scope.$on('periodChange', loadData);
    $scope.$on('menuSave', function () {
        $scope.menu.saveMenu("EA", "", $scope.userSettings);
    });
    

    $scope.success = function (engagementActivity) {
        try {
            if($rootScope.selectedPeriod == 'weekly'){
            	$scope.timePeriod = "Weekly";
            }else {
            	$scope.timePeriod = "Monthly";
            }
            $scope.dataLoaded = true;
            $scope.error = false;
            if (!engagementActivity[$rootScope.selectedPeriod])
                throw { message: "Selected period data not available!", type: "internal" };
            $scope.engagementActivity = engagementActivity[$rootScope.selectedPeriod];
            $scope.menu.setData($scope.engagementActivity);
        } catch (e) {
            $scope.error = true;
            UtilitiesService.throwError(e);
        }
    }
    $scope.fail = function (msg) {
        $scope.error = true;
        $scope.hasErrorMsg = true;
        if (msg) {
            if (msg instanceof Object) {
                $scope.errorMsg = (msg.statusText == "" ? errorConstants.NETWORK_ERR : msg.statusText);
            } else {
                $scope.errorMsg = msg;
            }
        }
    }
    $scope.$watch(
			function () {
			    return sharedProperties.getSubGroupBy();
			},
			function (newValue) {
			    loadData();
			}
	);
    var requestData = {
        "groupBy": "EA"
    };
    var utilData = UtilitiesService.getRequestData();
    requestData = $.extend(true, requestData, utilData);
    var cacheKey = "EAM" + JSON.stringify(requestData);
    function loadData() {
        var func = $scope.success;
        if (arguments[1]) {
            if (arguments[1].key == cacheKey) {
                func = null;
            } else {
                return false;
            }
        }
        DataService.getTrackSummaryEngagementActivity(requestData, func, $scope.fail);

    }
})

.controller("engagementActivitySummaryController", function ($scope, $rootScope, DataService, Permission, sharedProperties, RequestConstantsFactory, UtilitiesService) {
    var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
    $scope.dataLoaded = false;
    //Watch for SummaryExpired
    $rootScope.$on('onCacheExpiry', loadData);
    $scope.$on('periodChange', loadData);
    $scope.$on('dataReady', loadData);

    $scope.success = function (engagementActivitySummary) {
        try {
            $scope.dataLoaded = true;
            if (!engagementActivitySummary[$rootScope.selectedPeriod]) {
                $scope.error = true;
            }
            else {
                $scope.error = false;
                engagementActivitySummary[$rootScope.selectedPeriod].forEach(function (data) {
                    if (data.subGroupBy == sharedProperties.getSubGroupBy()) {
                        $scope.engagementActivitySummary = data;
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
        if (msg) {
            if (msg instanceof Object) {
                $scope.errorMsg = (msg.statusText == "" ? errorConstants.NETWORK_ERR : msg.statusText);
            } else {
                $scope.errorMsg = msg;
            }
        }
    }
    function loadData() {
        var requestData = UtilitiesService.getRequestData();
        requestData['groupBy'] = 'EA';
        var cacheKey = "EAM" + JSON.stringify(requestData);
        var func = $scope.success;
        if (arguments[1]) {
            if (arguments[1].key == cacheKey) {
                func = null;
            } else {
                return false;
            }
        }
        DataService.getTrackSummaryEngagementActivity(requestData, func, $scope.fail);
    }
})

.controller("engagementActivityTrendController", function ($scope, $rootScope, chartsService, Permission, DataService, ChartOptionsService, RequestConstantsFactory, sharedProperties, UtilitiesService) {
    var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
    $scope.dataLoaded = false;
    $rootScope.$on('onCacheExpiry', loadData);
    $scope.$on('periodChange', loadData);
    $scope.$on('dataReady', loadData);

    $scope.success = function (engagementActivityTrend) {
        try {
            $scope.dataLoaded = true;
            if (!engagementActivityTrend[$rootScope.selectedPeriod]) {
                $scope.error = true;
            }
            else {
                $scope.error = false;
                var trendChartOptions = ChartOptionsService.getEngagementActivityTrendData();
                if(sharedProperties.getSubGroupBy() == "EAScore"){
                	var yAxis = {
                			"min":50,
                			"tickInterval":5,
                			"max":75
                	};
                	//trendChartOptions['yAxis']= yAxis;
                	$.extend(true, trendChartOptions['yAxis'], yAxis);
                }
                console.log("trendChartOptions:", trendChartOptions)
                chartOBJ = chartsService.line.call($('#trendChart'), engagementActivityTrend[$rootScope.selectedPeriod], trendChartOptions, $scope);
                $scope.heading = sharedProperties.getHeading();
            }
        } catch (e) {
            $scope.fail(errorConstants.DATA_ERR);
        }
    }
    $scope.fail = function (msg) {
        $scope.error = true;
        $scope.hasErrorMsg = true;
        if (msg) {
            if (msg instanceof Object) {
                $scope.errorMsg = (msg.statusText == "" ? errorConstants.NETWORK_ERR : msg.statusText);
            } else {
                $scope.errorMsg = msg;
            }
        }
    }
    var requestData = {
        "timeRanges": [{
            "maxRows": "5"
        }, {
            "maxRows": "5"
        }, {
            "maxRows": "5"
        }, {
            "maxRows": "5"
        }]
    };
    function loadData() {
        var utilData = UtilitiesService.getRequestData();
        requestData['groupBy'] = sharedProperties.getSubGroupBy();
        $.extend(true, requestData, utilData);
        var cacheKey = "EATrend" + JSON.stringify(requestData);
        var func = $scope.success;
        if (arguments[1]) {
            if (arguments[1].key == cacheKey) {
                func = null;
            } else {
                return false;
            }
        }
        DataService.getEngagementActivityTrendData(requestData, func, $scope.fail);
    }
})

.controller("engagementActivityDeepDiveController", function ($scope, $rootScope, chartsService, DataService, Permission, DataConversionService, RequestConstantsFactory, UtilitiesService, sharedProperties) {
    var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
    $scope.dataLoaded = false;
    $scope.$on('periodChange', loadData);
    $rootScope.$on('onCacheExpiry', loadData);
    $scope.$on('dataReady', loadData);

    //loading engagement level or conversion weightage data based on the tab click
    //    $scope.optionChange = function (value) {
    //        option = value;
    //        if (option == "enLevel") {
    //            requestData = {
    //                "groupBy": "enLevel"
    //            };
    //            loadData();
    //        }

    //        else {
    //            requestData = {
    //                "groupBy": "convWeight"
    //            };
    //            loadData();
    //        }

    //    }
    $scope.$watch(
			function () {
			    return sharedProperties.getSubGroupBy();
			},
			function (newValue) {
			    loadData();
			}
	);

    $scope.success = function (engagementActivityDeepDive) {
        try {
            engagementActivityDeepDive = DataConversionService.toGetEngagementActivityDeepDiveData(engagementActivityDeepDive);
            $scope.dataLoaded = true;
            $scope.error = false;
            chartOBJ = chartsService.treemap.call($('.heatMap1'), engagementActivityDeepDive[$rootScope.selectedPeriod].moduleData, null, $scope);
            chartOBJ = chartsService.treemap.call($('.heatMap2'), engagementActivityDeepDive[$rootScope.selectedPeriod].activityData, null, $scope);
            $scope.heading = sharedProperties.getHeading();
        } catch (e) {
            $scope.fail(errorConstants.DATA_ERR);
        }
    }
    $scope.fail = function (msg) {
        $scope.error = true;
        $scope.hasErrorMsg = true;
        if (msg) {
            if (msg instanceof Object) {
                $scope.errorMsg = (msg.statusText == "" ? errorConstants.NETWORK_ERR : msg.statusText);
            } else {
                $scope.errorMsg = msg;
            }
        }
    }
    var requestData = {};
    requestData = {
        "groupBy": "enLevel"
    };

    var cacheKey = "EADD" + JSON.stringify(requestData);
    function loadData() {
        var func = $scope.success;
        if (arguments[1]) {
            if (arguments[1].key == cacheKey + requestData.groupBy) {
                func = null;
            } else {
                return false;
            }
        }
        var utilData = UtilitiesService.getRequestData();
        $.extend(true, requestData, utilData);
        var cacheKey = "EADD" + JSON.stringify(requestData);
        DataService.getEngagementActivityDeepDiveData(requestData, func, $scope.fail);
    }
})

.controller("engagementModuleController", function ($scope, $rootScope, DataService, DataConversionService, Permission, RequestConstantsFactory, UtilitiesService, sharedProperties) {
    var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
    $scope.dataLoaded = false;
    $scope.options = UtilitiesService.getDataTableOptions();
    //Sort by eaScore default
    $scope.options.aaSorting = [[ 2, "desc" ]];
    $rootScope.$on('onCacheExpiry', loadData);
    $scope.$on('periodChange', loadData);
    $scope.$on('dataReady', loadData);

    $scope.addData = function (_data) {
        try {
            data = _data[$rootScope.selectedPeriod];
            $scope.dataLoaded = true;
            $scope.error = false;
            $scope.heading = sharedProperties.getHeading();
            $scope.options.aaData = [];
            $.each(data, function (key, obj) {
                obj.engagementLevel == 'high' ? $class = "green" : obj.engagementLevel == 'low' ? $class = "red" : $class = "orange";
                $scope.options.aaData.push([obj.moduleName, "<span class=" + $class + ">"
                                                       + obj.engagementLevel + "</span>",
                                                       obj.engagementScore.score,
                                                       obj.engagementScore.scoreLastMo,
                                                       obj.engagementScore.scoreLastQtr,
                                                       obj.engagementScore.scoreLastYr,
                                                        obj.noOfUsers.number,
                                                       obj.noOfUsers.noLastMo,
                                                       obj.noOfUsers.noLastQtr,
                                                       obj.noOfUsers.noLastYr]);
            })
        } catch (e) {
            $scope.fail(errorConstants.DATA_ERR);
        }

    };
    $scope.fail = function (msg) {
        $scope.error = true;
        $scope.hasErrorMsg = true;
        if (msg) {
            if (msg instanceof Object) {
                $scope.errorMsg = (msg.statusText == "" ? errorConstants.NETWORK_ERR : msg.statusText);
            } else {
                $scope.errorMsg = msg;
            }
        }
    }
    var requestData = {
        "timeRanges": [{
            "maxRows": "5"
        }, {
            "maxRows": "5"
        }, {
            "maxRows": "5"
        }, {
            "maxRows": "5"
        }]
    };
    var utilData = UtilitiesService.getRequestData();

    requestData = $.extend(true, requestData, utilData);
    var cacheKey = "EAMC" + JSON.stringify(requestData);
    function loadData() {
        var func = $scope.addData;
        if (arguments[1]) {
            if (arguments[1].key == cacheKey) {
                func = null;
            } else {
                return false;
            }
        }
        DataService.getTrackModuleEngagementTableData(requestData, func, $scope.fail);
    }
})


