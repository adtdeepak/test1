angular.module('Tracking')

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
	
	$scope.success = function(funnelData) {
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
					$scope.cancellations.churnRate = Math.round(data.churnRate * 100) / 100;
					$scope.cancellations.actualTillDate = data.actualTillDate;
					$scope.cancellations.weeklyTrend = data.weeklyTrend;
				} else if(data.groupBy == 'subscriptions') {
					$scope.subscriptions.conversionRate = Math.round(data.conversionRate * 100) / 100;
					$scope.subscriptions.actualTillDate = data.actualTillDate;
					$scope.subscriptions.weeklyTrend = data.weeklyTrend;
				} else if(data.groupBy == 'registrations') {
					$scope.registrations.acquisitionRate = Math.round(data.acquisitionRate * 100) / 100;
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

.controller("acquisitionTrendController",function($scope, $rootScope, chartsService, Permission,$element,DataService, DataConversionService, RequestConstantsFactory ,UtilitiesService, StorageService){
	
	var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
	 $scope.dataLoaded = false;
    //Watch for SummaryExpired
    $rootScope.$on('onCacheExpiry', loadData);
    $scope.$on('periodChange', loadData);

    $scope.success = function (acqTrendData) {
    	 if($rootScope.selectedPeriod == "weekly")
         	$scope.trendPeriod = "Nov 09 to Nov 13";
         if($rootScope.selectedPeriod == "monthly")
         	$scope.trendPeriod = "Nov 01 to Nov 13";
         if($rootScope.selectedPeriod == "quarterly")
         	$scope.trendPeriod = "Oct 01 to Nov 13";
         if($rootScope.selectedPeriod == "yearly")
         	$scope.trendPeriod = "Jan 01 to Nov 13";
    	  $scope.dataLoaded = true;
    	try{
    		$scope.error = false;
    		chartOBJ = chartsService.combinedStackedBarLine.call($('#acquisitionTrendChart'), acqTrendData[$rootScope.selectedPeriod], acqTrendData[$rootScope.selectedPeriod].chartOptions, $scope);
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
    	DataService.getTrackSummaryAcqTrend(requestData, func, $scope.fail); 
    } 
    loadData();
    
})

