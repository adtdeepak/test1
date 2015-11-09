angular.module('Home')

.controller("trackingInitController",function($scope, CustomService, $rootScope, DataService, $rootScope,DataConversionService, UtilitiesService)
{
    //Used by metrics as well
    $rootScope.title = $scope.Constants[$scope.Constants.SUMMARY_Prefix + 'Title_' + $scope.selectedPeriod];
    //Title changes when time period changes
    $scope.$on('periodChange', function(event, date) {
        $rootScope.title = $scope.Constants[$scope.Constants.SUMMARY_Prefix + 'Title_' + $scope.selectedPeriod];
    });
    $rootScope.currentDate = new Date();
    angular.element(document).ready(function () {
        setTimeout(function(){CustomService.appInit();},1);
    }); 
    UtilitiesService.getTotalMemory();
    $rootScope.$broadcast('periodChange');
    
})

.controller("acquisitionFunnelController",function($scope, $rootScope, Permission,chartsService, $element, UtilitiesService, RequestConstantsFactory ,DataService, DataConversionService, ChartOptionsService,UtilitiesService,StorageService){
    var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
    $scope.$on('periodChange', loadData);
    //Watch for SummaryExpired
    $rootScope.$on('onCacheExpiry', loadData);
    $scope.dataLoaded = false;
    $scope.visitors = {};
    $scope.cancellations = {};
    $scope.subscriptions = {};
    $scope.registrations = {};
    $scope.acqFunnelWidgets =[{"name":"Visitors","selected":false}, 
                              {"name":"Registrations","selected":true},
                              {"name":"Subscriptions","selected":false},
                              {"name":"Cancellations","selected":false}];
    
    $scope.acqFunnelWidget = function(widgetName){
        $.each($scope.acqFunnelWidgets, function(key, value){
            value.selected = false;
            if(value.name == widgetName){
                value.selected = true;
            }
        })
        $rootScope.$broadcast("acqFunnelWidget", widgetName);
    }
    
    $scope.success = function(funnelData) {
        console.log(funnelData);
        $scope.dataLoaded = true;
        try{
            $scope.error = false;
            var funnelData = funnelData[$rootScope.selectedPeriod];
            
            funnelData.forEach(function(data) {
                //Math.round() is used to rounding off
                if(data.groupBy == 'visitors') {
                    $scope.visitors.actualTillDate = Math.round(data.actualTillDate);
                    $scope.visitors.weeklyTrend = data.weeklyTrend;
                } else if(data.groupBy == 'cancellations') {
                    $scope.cancellations.churnRate = Math.round(data.rate * 100) / 100;
                    $scope.cancellations.actualTillDate = data.actualTillDate;
                    $scope.cancellations.weeklyTrend = data.weeklyTrend;
                } else if(data.groupBy == 'subscriptions') {
                    $scope.subscriptions.conversionRate = Math.round(data.rate * 100) / 100;
                    $scope.subscriptions.actualTillDate = data.actualTillDate;
                    $scope.subscriptions.weeklyTrend = data.weeklyTrend;
                } else if(data.groupBy == 'registrations') {
                    $scope.registrations.acquisitionRate = Math.round(data.rate * 100) / 100;
                    $scope.registrations.actualTillDate = data.actualTillDate;
                    $scope.registrations.weeklyTrend = data.weeklyTrend;
                }
            })

            var chartColors = ['#132d52','#149ae3','#1b6395','#5bc1ff'];
            var lineDatas  = [$scope.visitors.weeklyTrend, $scope.registrations.weeklyTrend, 
                              $scope.subscriptions.weeklyTrend, $scope.cancellations.weeklyTrend];

            $('.chart').each(function(index) {
                var sparkleLineChartOptions = ChartOptionsService.getSparkleLineData();
                var sparkleLineData = lineDatas[index];
                var chartOptions = {
                        series: [{
                            color: chartColors[index],
                        }],
                        //Disabling export icon - will not be visible
                         exporting: {
                                enabled: false
                            }
                }
                sparkleLineChartOptions = Highcharts.merge(sparkleLineChartOptions, chartOptions);
                chartOBJ = chartsService.sparkleLine.call($(this), sparkleLineData, sparkleLineChartOptions, $scope);
            });
            
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
    var requestData = UtilitiesService.getRequestData();
    var cacheKey = "summaryFunnel" + JSON.stringify(requestData);
    function loadData() { 
            var func = $scope.success; 
            if (arguments[1]) { 
                if (arguments[1].key == cacheKey) { 
                    func = null; 
                } else { 
                    return false; 
                } 
            } 
            DataService.getTrackSummaryFunnelData(requestData, func, $scope.fail); 
        
    } 
    loadData();
})

.controller("acquisitionTrendController",function($scope, $rootScope, chartsService, Permission,$element,DataService, DataConversionService, RequestConstantsFactory ,UtilitiesService, StorageService, ChartOptionsService){
    
    var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
     $scope.dataLoaded = false;
    //Watch for SummaryExpired
    $rootScope.$on('onCacheExpiry', loadData);
    $scope.$on('periodChange', loadData);
    $scope.widgetName = 'Registrations';
    $scope.acqTrendTitle = 'Registrations';
    $rootScope.$on("acqFunnelWidget", function(event, widgetName){
        $scope.acqTrendTitle = widgetName;
        $scope.widgetName = widgetName;
        loadData();
    });
    $scope.success = function (acqTrendData) {
         if($rootScope.selectedPeriod == "weekly")
            $scope.trendPeriod = "Sept 06 to Sept 12";
         if($rootScope.selectedPeriod == "monthly")
            $scope.trendPeriod = "Sept 01 to Sept 30";
         if($rootScope.selectedPeriod == "quarterly")
            $scope.trendPeriod = "Jul 01 to Sept 30";
         if($rootScope.selectedPeriod == "yearly")
            $scope.trendPeriod = "Jan 01 to Sept 30";
          $scope.dataLoaded = true;
        try{
            $scope.error = false;
            chartOptions = ChartOptionsService.getBasicLineChart(acqTrendData[$rootScope.selectedPeriod], "", "");
            chartOBJ = chartsService.basicLine.call($('#acquisitionTrendChart'),chartOptions, $scope);
        } catch (e) {
            console.log(e);
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
    //Processing Request
    var requestData = {
        "groupBy": "revPaid"
    };
    var utilData = UtilitiesService.getRequestData();
    requestData = angular.extend({}, utilData, requestData);
    var cacheKey = "summaryTrend" + JSON.stringify(requestData);
    
    function loadData() {
        var func = $scope.success; 
        if (arguments[1]) { 
            if (arguments[1].key == cacheKey) { 
                func = null; 
            } else { 
                return false; 
            } 
        } 
        DataService.getTrackSummaryAcqTrend(requestData, $scope.widgetName, func, $scope.fail); 
    } 
    
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
            $scope.averageTimePeriodText = $scope.Constants[$scope.Constants.EA_Prefix + 'averagePeriod_' + $scope.selectedPeriod];
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