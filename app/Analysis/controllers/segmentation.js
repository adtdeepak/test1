angular.module('Analysis')

.controller("segmentationInitController", function ($scope, CustomService) {
	setTimeout(function () { CustomService.appInit(); }, 1000);
})

.controller('segmentationOverviewController', function($scope, CustomService, chartsService, ChartOptionsService, DataService, DataConversionService) {
	$scope.engagementDataSuccess = function(engagementData) {

	    var chartOptions;
	    var chartData;
	    var chartDataObj = {};
	    
		chartData = DataConversionService.getPieChartData(engagementData.data.pieData.subscribers);
	    chartOptions = ChartOptionsService.getProfilePieChart(chartData, "", "As a %age of all subscribers", 300);
		chartOBJ = chartsService.pieChart.call($('#subsDonutChart1'),chartOptions, $scope);
		
		chartData = DataConversionService.getHorizontalBarChartData(engagementData.data.trend.activeUsers);
	    chartOptions = ChartOptionsService.activeUsersAreaChart(chartData, "", "%age Active users, Past 6 months", 300);
	//	chartOBJ = chartsService.areaChart.call($('#subsAreaChart1'),chartOptions, $scope);
		
		
		$scope.adoptionTrendData = engagementData.data.adoptionTrend;
	};
	
	var requestData = {};
	function loadEngagementData() {
		var func = $scope.engagementDataSuccess; 
		if (arguments[1]) { 
			if (arguments[1].key == cacheKey) { 
				func = null; 
			} else { 
				return false; 
			} 
		} 
		DataService.getSegmentationOverviewData(requestData, func, $scope.fail); 

	} 
	loadEngagementData();
})

.controller('segmentationProfileController', function($scope, CustomService, chartsService, ChartOptionsService, DataConversionService, DataService) {
    //Profile chart options
    var chartOptions;
    var chartData;
    
	$scope.profileDataSuccess = function(profileData) {
	    //chart data and options for gender pie chart
		chartData = DataConversionService.getPieChartData(profileData.data.pieData.gender);
		console.log("chartData", JSON.stringify(chartData));
	    chartOptions = ChartOptionsService.getProfilePieChart(chartData, "Gender", "", 300);
		chartOBJ = chartsService.pieChart.call($('#genderChartSeg'),chartOptions, $scope);
		
	    //chart data and options for age pie chart
		chartData = DataConversionService.getHorizontalBarChartData(profileData.data.trend.login);
	    chartOptions = ChartOptionsService.getLoginBarChart(chartData, "Age Distribution", "", 300);
		chartOBJ = chartsService.basicBar.call($('#ageChartSeg'),chartOptions, $scope)
		
		//chart data and options for Location pie chart
		chartData = DataConversionService.getPieChartData(profileData.data.pieData.location);
	    chartOptions = ChartOptionsService.getPieChart(chartData, "Location", "", 300);
		chartOBJ = chartsService.donutChart.call($('#locationChartSeg'),chartOptions, $scope);

	}
	
	var requestData = {};
	function loadProfileData() {
		var func = $scope.profileDataSuccess; 
		if (arguments[1]) { 
			if (arguments[1].key == cacheKey) { 
				func = null; 
			} else { 
				return false; 
			} 
		} 
		DataService.getSegmentationProfileData(requestData, func, $scope.fail); 

	} 
	loadProfileData();
	
})

.controller('segmentationEngagmentController', function($scope, CustomService, chartsService, ChartOptionsService, DataService, DataConversionService) {
	
	$scope.engagementDataSuccess = function(engagementData) {

	    var chartOptions;
	    var chartData;
	    var chartDataObj = {};
	    
	    chartOptions = ChartOptionsService.getBasicLineChart(engagementData.data.trend.totalRevenue, "Trend", "", 300);
		chartOBJ = chartsService.basicLine.call($('#engTrendChart'),chartOptions, $scope);
		
		
		$scope.adoptionTrendData = engagementData.data.adoptionTrend;
	};
	
	var requestData = {};
	function loadEngagementData() {
		var func = $scope.engagementDataSuccess; 
		if (arguments[1]) { 
			if (arguments[1].key == cacheKey) { 
				func = null; 
			} else { 
				return false; 
			} 
		} 
		DataService.getSegmentationEngagementData(requestData, func, $scope.fail); 

	} 
	loadEngagementData();
})

.controller('segmentationRetentionController', function($scope, CustomService, chartsService, ChartOptionsService, DataService, DataConversionService) {
  
	 $scope.RetentionDataSuccess = function(retentionData){
		    var chartOptions;
		    var chartData;
		    var chartDataObj = {};
		    //chart data and options for gender pie chart
			chartData = DataConversionService.getPieChartData(retentionData.data.pieData.gender);
		    chartOptions = ChartOptionsService.getProfilePieChart(chartData, "Gender", "% of users Male/Female", 275);
			chartOBJ = chartsService.pieChart.call($('#genderPieChartRet'),chartOptions, $scope);
			
		    //chart data and options for age pie chart
			chartData = DataConversionService.getPieChartData(retentionData.data.pieData.age);
		    chartOptions = ChartOptionsService.getPieChart(chartData, "Age", "As a % of total subscribers", 300);
			chartOBJ = chartsService.pieChart.call($('#agePieChartRet'),chartOptions, $scope);
			
			//chart data and options for Location pie chart
			chartData = DataConversionService.getPieChartData(retentionData.data.pieData.location);
		    chartOptions = ChartOptionsService.getPieChart(chartData, "Location", "As a % of total subscribers", 300);
			chartOBJ = chartsService.pieChart.call($('#locationPieChartRet'),chartOptions, $scope);

			//chart data and options for signup pie chart
			chartData = DataConversionService.getPieChartData(retentionData.data.pieData.signup);
		    chartOptions = ChartOptionsService.getPieChart(chartData, "Signup Email", "As a % of total subscribers", 300);
			chartOBJ = chartsService.pieChart.call($('#signupPieChartRet'),chartOptions, $scope);
			
			//chart data and options for access mode pie chart
			chartData = DataConversionService.getPieChartData(retentionData.data.pieData.accessMode);
			chartOptions = ChartOptionsService.getProfilePieChart(chartData, "Mode of Aceess", "% of subscribers", 300);
			chartOBJ = chartsService.donutChart.call($('#accessDonutChartRet'),chartOptions, $scope);

			//chart data and options for platform pie chart
			chartData = DataConversionService.getPieChartData(retentionData.data.pieData.platform);
			chartOptions = ChartOptionsService.getProfilePieChart(chartData, "Platform", "% of subscribers", 300);
			chartOBJ = chartsService.donutChart.call($('#platformDonutChartRet'),chartOptions, $scope);

			//chart data and options for login bar chart
			chartData = DataConversionService.getHorizontalBarChartData(retentionData.data.trend.login);
		    chartOptions = ChartOptionsService.getLoginBarChart(chartData, "Logins", "Avg Logins per week", 300);
			chartOBJ = chartsService.basicBar.call($('#loginBarChartRet'),chartOptions, $scope)
			
			//churn Activities
			chartData = DataConversionService.getHorizontalBarChartData(retentionData.data.trend.churnActivities);
			chartOptions = ChartOptionsService.getTrendingBarChart(chartData, "Activities before Churn", "Average, % times activity performed per login", 300, "#EE7E34");
			chartOBJ = chartsService.basicBar.call($('#trendActBarChartRet'),chartOptions, $scope);
		    
			//cancels
			chartData = DataConversionService.getHorizontalBarChartData(retentionData.data.trend.churnModules);
		    chartOptions = ChartOptionsService.getTrendingBarChart(chartData, "Modules visited before churn", "Average, % times section visited per login", 300, "#5F5F84");
			chartOBJ = chartsService.basicBar.call($('#trendSecBarChartRet'),chartOptions, $scope);
			
			
			chartDataObj['xAxisData'] = retentionData.data.trend.cancels.xAxisData;
			chartDataObj['data'] = retentionData.data.trend.cancels.data;
		    chartOptions = ChartOptionsService.getColumnChartWithoutPercentage(chartDataObj, "Cancels", "No. of Subscribers who cancelled, Past 6 months", 300);
			chartOBJ = chartsService.columnChart.call($('#cancelColChartRet'),chartOptions, $scope);
			
			chartDataObj['xAxisData'] = retentionData.data.trend.churnTenure.xAxisData;
			chartDataObj['data'] = retentionData.data.trend.churnTenure.data;
			chartOptions = ChartOptionsService.getLoginDurationColumnChart(chartDataObj, "Tenure before Churn", "Time spent as a subscriber before churn", 300);
			chartOBJ = chartsService.columnChart.call($('#activeColChartRet'),chartOptions, $scope);
			
			chartDataObj['xAxisData'] = retentionData.data.trend.churnInactiveDays.xAxisData;
			chartDataObj['data'] = retentionData.data.trend.churnInactiveDays.data;
		    chartOptions = ChartOptionsService.getLoginDurationColumnChart(chartDataObj, "Inactive days before Churn", "Time spent as a subscriber before churn", 300);
			chartOBJ = chartsService.columnChart.call($('#inactiveColChartRet'),chartOptions, $scope);
	 }
	
	var requestData = {};
	function loadRetentionData() {
		var func = $scope.RetentionDataSuccess; 
		if (arguments[1]) { 
			if (arguments[1].key == cacheKey) { 
				func = null; 
			} else { 
				return false; 
			} 
		} 
		DataService.getRetentionData(requestData, func, $scope.fail); 

	} 
	loadRetentionData();
	
})