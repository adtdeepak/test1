angular.module('DecisionWorkbench')

.controller( "setDoInit",['$scope','DataService','CustomService','ChartOptionsService','$rootScope', function($scope, DataService, CustomService, ChartOptionsService, $rootScope) {
	//Broadcasting when the page is loaded - for making free trial/ freemium tabs enable or disable
	$rootScope.$broadcast('DWPageChange', "changed");
	setTimeout(function(){CustomService.appInit();},1);

}])

.controller( "setGoalsDataController",['$scope','$rootScope','chartsService','NetworkService','DataService','RequestConstantsFactory','ChartOptionsService','UtilitiesService','sharedProperties',
                                       function($scope, $rootScope, chartsService, NetworkService, DataService, RequestConstantsFactory,ChartOptionsService, UtilitiesService, sharedProperties) {
	//This will check session is valid or not
	UtilitiesService.checkValidSession(location, $scope);
	var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
	$scope.initialFlag = true;
	$scope.dataLoaded = false;
	$scope.$on('periodChange', function(event, period) {
		loadData();
	});

	//Success function for waterfall chart and showing data section
	$scope.success = function (setGoalsData) {
		try {
			$scope.dataLoaded = true;
			//Function call for periodFrom and periodTo date in Showing data section
			loadPeriodData();
			$scope.error = false;
			$scope.weeklyListData = setGoalsData['showingPeriodData'][$rootScope.selectedPeriod];
			var setGoalsChartOptions = ChartOptionsService.getSetGoalsData();
			var deficitValue = setGoalsData['paidUsers'][$rootScope.selectedPeriod][2].y;
			var targetValue = setGoalsData['paidUsers'][$rootScope.selectedPeriod][0].y + setGoalsData['paidUsers'][$rootScope.selectedPeriod][1].y + setGoalsData['paidUsers'][$rootScope.selectedPeriod][2].y;
			chartsService.waterfall.call($("#setGoalsChart"), setGoalsData['paidUsers'][$rootScope.selectedPeriod],setGoalsChartOptions, $scope);
			sharedProperties.setMaxValue(targetValue);
			sharedProperties.setDeficitValue(deficitValue);
		} catch (e) {
			$scope.fail(errorConstants.DATA_ERR);
		}
	}
	
	//Failure function for waterfall chart and showing data section
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
	
	//For getting periodFrom and periodTo date in Showing data section
	function loadPeriodData() {
		$scope.periodText = window.appConstants.SETGOALS[$rootScope.selectedPeriod];
		var availablePeriods = UtilitiesService.getAvailablePeriods();
		var periodData = {};
		$.each(availablePeriods, function (key, obj) {
			if (obj.periodName == $rootScope.selectedPeriod) {
				$scope.periodStart = moment(obj.periodFrom, 'MM-DD-YYYY').toDate();
				$scope.periodTo = moment(obj.periodTo, 'MM-DD-YYYY').toDate();
			}
		});
		return periodData; 
	}
	
	//Load function for waterfall chart and showing data section
	function loadData(forceSilent) {
		var requestData = {"groupBy" : "cmpgnView"};
		var func = $scope.success; 
		var utilData = UtilitiesService.getRequestData();
		if($scope.initialFlag == true){
    		$scope.initialFlag = false;
			var utilData = UtilitiesService.getInitialRequestData();
		}else if(forceSilent == true){
    		var func = null; 
		}
		requestData = angular.extend({}, utilData, requestData);
		var cacheKey = "DWISetGoals" + JSON.stringify(requestData);
		if (arguments[1]) { 
			if (arguments[1].key == cacheKey) { 
				func = null; 
			} else { 
				return false; 
			} 
		}
		//Data service call for waterfall chart and showing data section
		DataService.getSetGoalsChartData(requestData, func, $scope.fail);
	}
	loadData();
	loadData(true);

}])

.controller( "engagedActivitiesController",['$scope','DataService','chartsService','ChartOptionsService' ,'DataConversionService','RequestConstantsFactory','$rootScope','UtilitiesService',
                                            function($scope, DataService, chartsService, ChartOptionsService, DataConversionService, RequestConstantsFactory, $rootScope, UtilitiesService) {
	
	var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
	$scope.initialFlag = true;
	$scope.dataLoaded = false;
	$scope.$on('periodChange', function(event, period) {
		loadData();
	});
	
	//Success function for engagement activities chart
	$scope.success = function (engagedData) {
		try {
			$scope.dataLoaded = true;
			$scope.error = false;
			engagedUserData = engagedData['engagedUserGroups'];
			engagedActivityData = engagedData['engagedActivities'];
			var engagedUserChartOptions =  ChartOptionsService.getTopLeastEngagedUserData();
			var engagedActChartOptions = ChartOptionsService.getTopLeastEngagedData();
			chartsService.bubbleWithoutAxis.call($("#engagedChart").find('.TEchartvalue'), engagedActivityData[$rootScope.selectedPeriod], engagedActChartOptions, $scope);
			chartsService.bubbleWithoutAxis.call($("#engagedChart1").find('.TEchartvalue'), engagedUserData[$rootScope.selectedPeriod], engagedUserChartOptions, $scope);
		} catch (e) {
			$scope.fail(errorConstants.DATA_ERR);
		}
	}
	
	//Failure function for engagement activities chart
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
	
	//Load function for engagement activities chart
	function loadData(forceSilent) {
		var requestData = {"groupBy" : "cmpgnView"};
		var func = $scope.success; 
		var utilData = UtilitiesService.getRequestData();
		if($scope.initialFlag == true){
    		$scope.initialFlag = false;
			var utilData = UtilitiesService.getInitialRequestData();
		}else if(forceSilent == true){
    		var func = null; 
		}
		requestData = angular.extend({}, utilData, requestData);
		var cacheKey = "DWIndex" + JSON.stringify(requestData);
		if (arguments[1]) { 
			if (arguments[1].key == cacheKey) { 
				func = null; 
			} else { 
				return false; 
			} 
		}
		//Data service call for engagement activities chart
		DataService.getSetGoalsChartData(requestData, func, $scope.fail);
	}
	loadData();
	loadData(true);
}])

