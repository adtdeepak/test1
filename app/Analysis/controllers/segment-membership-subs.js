angular.module('Analysis')

.controller('segmentDeepDiveController', function($scope, CustomService, chartsService, ChartOptionsService, DataService, DataConversionService, $location) {
	$scope.selectedGroup = [{"key":"All Users","selected":false},{"key":"Project Managers","selected": false},{"key":"Creative Agencies","selected": false},
	                        {"key":"Finance Executives","selected": false},{"key":"Musicians","selected": false},{"key":"Photographers","selected": false}];
	function getSelectedGroupFromUrl(){
		var urlIndex = $location.search();

		$.each($scope.selectedGroup, function(key, value){
			$scope.selectedGroup[key].selected= false;
			if($scope.selectedGroup[key].key == urlIndex.currentlySelected){
				$scope.selectedGroup[key].selected= true;
			}
		})
	}
	getSelectedGroupFromUrl();
})
.controller('comparisonController', function($scope, CustomService, chartsService, ChartOptionsService, DataService, DataConversionService) {
    //chart options
    var chartOptions;
    var chartData;
    var chartDataObj = {};
	
	$scope.comparisonDataSuccess = function(comparisonData) {
		chartData = DataConversionService.getPieChartData(comparisonData.data.pieData.revenue);
		chartOptions = ChartOptionsService.getPieChartWithNoLegend(chartData, "Revenue", "($mn)", 150);
		chartOBJ = chartsService.pieChart.call($('#revenuePieChart'),chartOptions, $scope);

		chartData = DataConversionService.getPieChartData(comparisonData.data.pieData.subscribers);
		chartOptions = ChartOptionsService.getPieChartWithNoLegend(chartData, "Subscribers", "(No. of users)", 150);
		chartOBJ = chartsService.pieChart.call($('#subsPieChart'),chartOptions, $scope);

		chartData = DataConversionService.getPieChartData(comparisonData.data.pieData.newSubscribers);
		chartOptions = ChartOptionsService.getPieChartWithNoLegend(chartData, "New Subscribers", "(No. of users)", 150);
		chartOBJ = chartsService.pieChart.call($('#newSubsPieChart'),chartOptions, $scope);

		chartData = DataConversionService.getPieChartData(comparisonData.data.pieData.cancels);
		chartOptions = ChartOptionsService.getPieChartWithNoLegend(chartData, "Cancels", "(No. of users)", 150);
		chartOBJ = chartsService.pieChart.call($('#cancelPieChart'),chartOptions, $scope);
		
		chartDataObj['xAxisData'] = comparisonData.data.trend.stageCompletion.xAxisData;
	    chartDataObj['series'] = comparisonData.data.trend.stageCompletion.series;
	    chartOptions = ChartOptionsService.getTrendingBarChartSeries(chartDataObj, "Stage Completion", "% users who have completed target activities per stage", 600, "#EE7E34");
		chartOBJ = chartsService.basicBar.call($('#stageBarChart'),chartOptions, $scope);

		chartDataObj['xAxisData'] = comparisonData.data.trend.churnRisk.xAxisData;
	    chartDataObj['series'] = comparisonData.data.trend.churnRisk.series;
		chartOptions = ChartOptionsService.getTrendingBarChartSeries(chartDataObj, "Churn Risk", "Probability of users churning", 600, "#EE7E34");
		chartOBJ = chartsService.basicBar.call($('#churnBarChart'),chartOptions, $scope);
		
		$scope.overallTableData = comparisonData.data.tableData.overall.data;
		$scope.busniessImpactTableData = comparisonData.data.tableData.businessImpact.data;
		$scope.customerProfileTableData = comparisonData.data.tableData.customerProfile.data;
		$scope.productUsageTableData = comparisonData.data.tableData.productUsage.data;
		$scope.retentionTableData = comparisonData.data.tableData.retention.data;
	}

	var requestData = {};
	function loadComparisonData() {
		var func = $scope.comparisonDataSuccess; 
		if (arguments[1]) { 
			if (arguments[1].key == cacheKey) { 
				func = null; 
			} else { 
				return false; 
			} 
		} 
		DataService.getComparisonData(requestData, func, $scope.fail); 

	} 
	loadComparisonData();
	
	$(document).ready(function(){
		$(".collapseDiv").click(function(){
			$(this).find('.xclose').toggleClass("expandclose");
			$(this).next().collapse('toggle');
		});
	});
})

.controller('deepDiveSummaryController', function($scope, CustomService, chartsService, ChartOptionsService, DataService) {
	//Common options for all the donut circle
    var options = {
        percentage: 80,
        radius: 40,
        width: 10,
        number: 80,
        text: '',
        colors: ['#1b6395', '#0070C0'],
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

.controller('deepDiveProfileController', function($scope, CustomService, chartsService, ChartOptionsService, DataConversionService, DataService) {
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
	    chartOptions = ChartOptionsService.getPieChart(chartData, "Age", "As a % of total subscribers", 300);
		chartOBJ = chartsService.pieChart.call($('#agePieChart'),chartOptions, $scope);
		
		//chart data and options for Location pie chart
		chartData = DataConversionService.getPieChartData(profileData.data.pieData.location);
	    chartOptions = ChartOptionsService.getPieChart(chartData, "Location", "As a % of total subscribers", 300);
		chartOBJ = chartsService.pieChart.call($('#locationPieChart'),chartOptions, $scope);

		//chart data and options for signup pie chart
		chartData = DataConversionService.getPieChartData(profileData.data.pieData.signup);
	    chartOptions = ChartOptionsService.getPieChart(chartData, "Paid users vs Free users", "", 300);
		chartOBJ = chartsService.pieChart.call($('#signupPieChart'),chartOptions, $scope);
		
		//chart data and options for access mode pie chart
		chartData = DataConversionService.getPieChartData(profileData.data.pieData.accessMode);
		chartOptions = ChartOptionsService.getProfilePieChart(chartData, "Mode of Aceess", "% of subscribers", 300);
		chartOBJ = chartsService.donutChart.call($('#accessDonutChart'),chartOptions, $scope);

		//chart data and options for platform pie chart
		chartData = DataConversionService.getPieChartData(profileData.data.pieData.platform);
		chartOptions = ChartOptionsService.getProfilePieChart(chartData, "Platform", "% of subscribers", 300);
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

.controller('deepDiveEngagmentController', function($scope, CustomService, chartsService, ChartOptionsService, DataService, DataConversionService) {
	
	$scope.engagementDataSuccess = function(engagementData) {

	    var chartOptions;
	    var chartData;
	    var chartDataObj = {};
	    
		chartData = DataConversionService.getPieChartData(engagementData.data.pieData.subscribers);
	    chartOptions = ChartOptionsService.getProfilePieChart(chartData, "", "As a %age of all subscribers", 300);
		chartOBJ = chartsService.donutChart.call($('#subsDonutChart'),chartOptions, $scope);
		
		chartData = DataConversionService.getHorizontalBarChartData(engagementData.data.trend.activeUsers);
	    chartOptions = ChartOptionsService.activeUsersAreaChart(chartData, "", "%age Active users, Past 6 months", 300);
		chartOBJ = chartsService.areaChart.call($('#subsAreaChart'),chartOptions, $scope);
		 
		chartData = DataConversionService.getHorizontalBarChartData(engagementData.data.trend.trendingActivities);
	    chartOptions = ChartOptionsService.getTrendingBarChart(chartData, "Trending Activities", "Average, % times activity performed per login", 300, "#EE7E34");
		chartOBJ = chartsService.basicBar.call($('#trendActBarChart'),chartOptions, $scope);
		
		chartData = DataConversionService.getHorizontalBarChartData(engagementData.data.trend.trendingSections);
	    chartOptions = ChartOptionsService.getTrendingBarChart(chartData, "Trending Sections", "Average, % times section visited per login", 300, "#5F5F84");
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


.controller('deepDiveRetentionController', function($scope, CustomService, chartsService, ChartOptionsService, DataService, DataConversionService) {
	  
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
		    chartOptions = ChartOptionsService.getPieChart(chartData, "Paid vs Free", "", 300);
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