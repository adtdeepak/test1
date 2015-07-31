angular.module('Analysis')

.controller("customerLandscapeInitController", function ($scope, CustomService) {
	setTimeout(function () { CustomService.appInit(); }, 1000);
})

.controller('overviewController', function($scope, CustomService, chartsService, ChartOptionsService, DataService) {
		//Common options for all the donut circle
        var options = {
            percentage: 80,
            radius: 40,
            width: 10,
            number: 80,
            text: '',
            colors: ['#1b6395', '#149ae3'],
            duration: 500
        };
   		
   		$scope.overallDataSuccess = function(overallData) {
   			$scope.overallData = overallData.data;
   			var revenueTrendata = $scope.overallData.revenue;

   	        //Value for overall subscribers
   	        var overallSubs = {
   	                percentage: $scope.overallData.subscriberValues.allUsers,
   	                number:  $scope.overallData.subscriberValues.allUsers
   	        };
   	        //Value for active subscribers
   	        var activeSubs = {
   	                percentage:  $scope.overallData.subscriberValues.active,
   	                number:  $scope.overallData.subscriberValues.active
   	        };
   	        //Value for dormant subscribers
   	        var dormantSubs = {
   	                percentage:  $scope.overallData.subscriberValues.dormant,
   	                number:  $scope.overallData.subscriberValues.dormant
   	        };
   	        //Donut chart for overall subscribers
   	        overallSubs = $.extend(true, options, overallSubs);
   	        CustomService.addDonutCircle('overallSubscribers', overallSubs);
   	        //Donut chart for active subscribers
   	        activeSubs = $.extend(true, options, activeSubs);
   	        CustomService.addDonutCircle('activeSubscribers', activeSubs);
   	        //Donut chart for dormant subscribers
   	        dormantSubs = $.extend(true, options, dormantSubs);
   	        CustomService.addDonutCircle('dormantSubscribers', dormantSubs);
   	        

   	        //Revenue chart options
   	        var chartOptions = ChartOptionsService.getRevenueSubsTrend(revenueTrendata);
   	   		chartOBJ = chartsService.stackedBar.call($('#revenueTrendChart'),chartOptions, $scope); 
   		}
   		var requestData = {};
   		function loadOverviewData() {
			var func = $scope.overallDataSuccess; 
	    	if (arguments[1]) { 
	    		if (arguments[1].key == cacheKey) { 
	    			func = null; 
	    		} else { 
	    			return false; 
	    		} 
	    	} 
	    	DataService.getOverviewData(requestData, func, $scope.fail); 
    	
   		} 
   		loadOverviewData();
})

.controller('profileController', function($scope, CustomService, chartsService, ChartOptionsService, DataConversionService, DataService) {
    //Profile chart options
    var chartOptions;
    var chartData;
    
	$scope.profileDataSuccess = function(profileData) {
	    //chart data and options for gender pie chart
		chartData = DataConversionService.getPieChartData(profileData.data.pieData.gender);
	    chartOptions = ChartOptionsService.getProfilePieChart(chartData, "Gender", "% of users Male/Female", 275);
		chartOBJ = chartsService.pieChart.call($('#genderPieChart'),chartOptions, $scope);
		
	    //chart data and options for age pie chart
		chartData = DataConversionService.getPieChartData(profileData.data.pieData.age);
	    chartOptions = ChartOptionsService.getPieChart(chartData, "Age distribution", "%age of total user", 300);
		chartOBJ = chartsService.pieChart.call($('#agePieChart'),chartOptions, $scope);
		
		//chart data and options for Location pie chart
		chartData = DataConversionService.getPieChartData(profileData.data.pieData.location);
	    chartOptions = ChartOptionsService.getPieChart(chartData, "Location", "%age of total user", 300);
		chartOBJ = chartsService.pieChart.call($('#locationPieChart'),chartOptions, $scope);

		//chart data and options for signup pie chart
		chartData = DataConversionService.getPieChartData(profileData.data.pieData.signup);
	    chartOptions = ChartOptionsService.getPieChart(chartData, "Paid VS Free", "", 300);
		chartOBJ = chartsService.pieChart.call($('#signupPieChart'),chartOptions, $scope);
		
		//chart data and options for access mode pie chart
		chartData = DataConversionService.getPieChartData(profileData.data.pieData.accessMode);
		chartOptions = ChartOptionsService.getProfilePieChart(chartData, "Product Plan", "No of subscribers", 300);
		chartOBJ = chartsService.donutChart.call($('#accessDonutChart'),chartOptions, $scope);

		//chart data and options for platform pie chart
		chartData = DataConversionService.getPieChartData(profileData.data.pieData.platform);
		chartOptions = ChartOptionsService.getProfilePieChart(chartData, "Product Plan", "%age of Revenue", 300);
		chartOBJ = chartsService.donutChart.call($('#platformDonutChart'),chartOptions, $scope);

		//chart data and options for login bar chart
		chartData = DataConversionService.getHorizontalBarChartData(profileData.data.trend.login);
	    chartOptions = ChartOptionsService.getLoginBarChart(chartData, "Logins", "Avg Logins per week", 300);
		chartOBJ = chartsService.basicBar.call($('#loginBarChart'),chartOptions, $scope)
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
		DataService.getProfileData(requestData, func, $scope.fail); 

	} 
	loadProfileData();
	
})

.controller('engagmentController', function($scope, CustomService, chartsService, ChartOptionsService, DataService, DataConversionService) {
	
	$scope.engagementDataSuccess = function(engagementData) {

	    var chartOptions;
	    var chartData;
	    var chartDataObj = {};
	    
		chartData = DataConversionService.getPieChartData(engagementData.data.pieData.subscribers);
	    chartOptions = ChartOptionsService.getProfilePieChart(chartData, "Time Spend Online", "Avg time spend per login", 300);
		chartOBJ = chartsService.donutChart.call($('#subsDonutChart'),chartOptions, $scope);
		
		chartData = DataConversionService.getHorizontalBarChartData(engagementData.data.trend.activeUsers);
	    chartOptions = ChartOptionsService.activeUsersAreaChart(chartData, "", "%age Active users, Past 6 months", 300);
		chartOBJ = chartsService.areaChart.call($('#subsAreaChart'),chartOptions, $scope);
		 
		chartData = DataConversionService.getHorizontalBarChartData(engagementData.data.trend.trendingActivities);
	    chartOptions = ChartOptionsService.getTrendingBarChart(chartData, "Trending Features", "", 300, "#EE7E34");
		chartOBJ = chartsService.basicBar.call($('#trendActBarChart'),chartOptions, $scope);
		
		chartData = DataConversionService.getHorizontalBarChartData(engagementData.data.trend.trendingSections);
	    chartOptions = ChartOptionsService.getTrendingBarChart(chartData, "Trending Activities", "", 300, "#5F5F84");
		chartOBJ = chartsService.basicBar.call($('#trendSecBarChart'),chartOptions, $scope);
		
		chartData = DataConversionService.getHorizontalBarChartData(engagementData.data.trend.login);
		chartOptions = ChartOptionsService.getLoginBarChart(chartData, "Logins", "Avg Logins per week", 300);
		chartOBJ = chartsService.basicBar.call($('#loginBarChart1'),chartOptions, $scope);
		
	    
	    chartDataObj['xAxisData'] = engagementData.data.trend.loginDuration.xAxisData;
	    chartDataObj['data'] = engagementData.data.trend.loginDuration.data;
	    chartOptions = ChartOptionsService.getLoginDurationColumnChart(chartDataObj, "Login Duration", "Avg time spent per login", 300);
		chartOBJ = chartsService.columnChart.call($('#loginDurationColChart'),chartOptions, $scope);
		
		
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
		DataService.getEngagementData(requestData, func, $scope.fail); 

	} 
	loadEngagementData();
})

.controller('retentionController', function($scope, CustomService, chartsService, ChartOptionsService, DataService, DataConversionService) {
  
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