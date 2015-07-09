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
            colors: ['#F6F6F6', '#0070C0'],
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
	    chartOptions = ChartOptionsService.getPieChart(chartData, "Age", "As a % of total subscribers", 300);
		chartOBJ = chartsService.pieChart.call($('#agePieChart'),chartOptions, $scope);
		
		//chart data and options for Location pie chart
		chartData = DataConversionService.getPieChartData(profileData.data.pieData.location);
	    chartOptions = ChartOptionsService.getProfilePieChart(chartData, "Location", "As a % of total subscribers", 300);
		chartOBJ = chartsService.pieChart.call($('#locationPieChart'),chartOptions, $scope);

		//chart data and options for signup pie chart
		chartData = DataConversionService.getPieChartData(profileData.data.pieData.signup);
	    chartOptions = ChartOptionsService.getProfilePieChart(chartData, "Signup Email", "As a % of total subscribers", 300);
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

.controller('engagmentController', function($scope, CustomService, chartsService, ChartOptionsService) {
	//Profile chart options
    var chartOptions;
    var chartData;
  //chart data and options for platform donut chart
    chartData = [{
    	name: "Active Subscribers",
    	y: 59,
    	color:"#A6A6A6"
    },{	
    	name: "Dormant Subscribers",
    	y: 41,
    	color:"#308BCB"
    }];
    chartOptions = ChartOptionsService.getProfilePieChart(chartData, "", "As a %age of all subscribers", 300);
	chartOBJ = chartsService.donutChart.call($('#subsDonutChart'),chartOptions, $scope);
	
	//chart data and options for access donut chart
    var xAxisData = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    var data = [41, 34, 49, 54, 44, 47];
    var chartDataObj = {};
    chartDataObj['xAxisData'] = xAxisData;
    chartDataObj['data'] = data;
    
    chartOptions = ChartOptionsService.activeUsersAreaChart(chartDataObj, "", "%age Active users, Past 6 months", 300);
	chartOBJ = chartsService.areaChart.call($('#subsAreaChart'),chartOptions, $scope);
	
	//chart data and options for trending activities bar chart
    var xAxisData = ['Adding Connections', 'Reviewing Profiles', 'Reading Blogs', 'Updating Profile'];
    var data = [66, 45, 34, 22];
    var chartDataObj = {};
    chartDataObj['xAxisData'] = xAxisData;
    chartDataObj['data'] = data;
    
    chartOptions = ChartOptionsService.getTrendingBarChart(chartDataObj, "Trending Activities", "Average, % times activity performed per login", 300, "#EE7E34");
	chartOBJ = chartsService.basicBar.call($('#trendActBarChart'),chartOptions, $scope);
	
	//chart data and options for trending activities bar chart
    var xAxisData = ["Who's viewed your profile", 'Add Connections', 'Messages', 'Notifications'];
    var data = [82, 35, 24, 18];
    var chartDataObj = {};
    chartDataObj['xAxisData'] = xAxisData;
    chartDataObj['data'] = data;
    
    chartOptions = ChartOptionsService.getTrendingBarChart(chartDataObj, "Trending Sections", "Average, % times section visited per login", 300, "#5F5F84");
	chartOBJ = chartsService.basicBar.call($('#trendSecBarChart'),chartOptions, $scope);
	
	//chart data and options for access donut chart
    var xAxisData = ['>10', '5-10', '2-5', 'Once a week'];
    var data = [11, 15, 10, 64];
    var chartDataObj = {};
    chartDataObj['xAxisData'] = xAxisData;
    chartDataObj['data'] = data;
    
    chartOptions = ChartOptionsService.getLoginBarChart(chartDataObj, "Logins", "Avg Logins per week", 300);
	chartOBJ = chartsService.basicBar.call($('#loginBarChart1'),chartOptions, $scope);
	
	//chart data and options for access donut chart
    var xAxisData = ['<10 mins', '10-30 mins', '30-45 mins', '>45 mins'];
    var data = [{
    	name: "This week",
    	data:[44, 21, 15, 20],
    	color:"#308BCB"
    },{	
    	name: "Last week",
    	data:[33, 29, 18, 20],
    	color:"#FF9900"
    }];
    var chartDataObj = {};
    chartDataObj['xAxisData'] = xAxisData;
    chartDataObj['data'] = data;
    
    chartOptions = ChartOptionsService.getLoginDurationColumnChart(chartDataObj, "Login Duration", "Avg time spent per login", 300);
	chartOBJ = chartsService.columnChart.call($('#loginDurationColChart'),chartOptions, $scope);
})

.controller('retentionController', function($scope, CustomService, chartsService, ChartOptionsService) {
    //Profile chart options
    var chartOptions;
    var chartData;
    //chart data and options for gender pie chart
    chartData = [{
    	name: "Male",
    	y: 64,
        color:"#308BCB"
    }, {	
    	name: "Female",
    	y: 36,
        color:"#ff9900"
    }];
    chartOptions = ChartOptionsService.getProfilePieChart(chartData, "Gender", "% of users Male/Female", 275);
	chartOBJ = chartsService.pieChart.call($('#genderPieChartRet'),chartOptions, $scope);
	//chart data and options for gender pie chart
    chartData = [{
    	name: "15-25",
    	y: 5,
    	color:"#70AD45"
    }, {	
    	name: "25-30",
    	y: 15,
    	color:"#F07726"
    }, {	
    	name: "30-40",
    	y: 35,
    	color:"#A6A6A6"
    }, {	
    	name: "40-50",
    	y: 25,
    	color:"#FFC000"
    }, {	
    	name: "50-65",
    	y: 15,
    	color:"#4877BF"
    }, {	
    	name: ">65",
    	y: 5,
    	color:"#5097D7"
    }];
    chartOptions = ChartOptionsService.getPieChart(chartData, "Age", "As a % of total subscribers", 300);
	chartOBJ = chartsService.pieChart.call($('#agePieChartRet'),chartOptions, $scope);
	//chart data and options for gender pie chart
    chartData = [{
    	name: "US",
    	y: 55,
    	color:"#5097D7"
    }, {	
    	name: "Europe",
    	y: 21,
    	color:"#EE7F30"
    },{
    	name: "China",
    	y: 10,
    	color:"#B6B3AC"
    }, {	
    	name: "International",
    	y: 14,
    	color:"#FFC000"
    }];
    chartOptions = ChartOptionsService.getProfilePieChart(chartData, "Location", "As a % of total subscribers", 300);
	chartOBJ = chartsService.pieChart.call($('#locationPieChartRet'),chartOptions, $scope);
	//chart data and options for gender pie chart
    chartData = [{
    	name: "Professional",
    	y: 29,
    	color:"#5A9BD5"
    }, {	
    	name: "Personal",
    	y: 71,
    	color:"#EE7E34"
    }];
    chartOptions = ChartOptionsService.getProfilePieChart(chartData, "Signup Email", "As a % of total subscribers", 300);
	chartOBJ = chartsService.pieChart.call($('#signupPieChartRet'),chartOptions, $scope);
	
	//chart data and options for access donut chart
    chartData = [{
    	name: "Mobile",
    	y: 15,
    	color:"#308BCB"
    },{	
    	name: "Web",
    	y: 36,
    	color:"#FF9900"
    },{	
    	name: "mix",
    	y: 49,
    	color:"#A6A6A6"
    }];
    chartOptions = ChartOptionsService.getProfilePieChart(chartData, "Mode of Aceess", "% of subscribers", 300);
	chartOBJ = chartsService.donutChart.call($('#accessDonutChartRet'),chartOptions, $scope);
	
	//chart data and options for access donut chart
    var xAxisData = ['>10', '5-10', '2-5', 'Once a week'];
    var data = [11, 15, 10, 64];
    var chartDataObj = {};
    chartDataObj['xAxisData'] = xAxisData;
    chartDataObj['data'] = data;
    
    chartOptions = ChartOptionsService.getLoginBarChart(chartDataObj, "Logins", "Avg Logins per week", 300);
	chartOBJ = chartsService.basicBar.call($('#loginBarChartRet'),chartOptions, $scope);
	
	//chart data and options for platform donut chart
    chartData = [{
    	name: "Android",
    	y: 34,
    	color:"#308BCB"
    },{	
    	name: "iOS",
    	y: 44,
    	color:"#FF9900"
    },{	
    	name: "Windows",
    	y: 10,
    	color:"#A6A6A6"
    },{	
    	name: "Others",
    	y: 12,
    	color:"#FFC000"
    }];
    chartOptions = ChartOptionsService.getProfilePieChart(chartData, "Platform", "% of subscribers", 300);
	chartOBJ = chartsService.donutChart.call($('#platformDonutChartRet'),chartOptions, $scope);
	
	//chart data and options for trending activities bar chart
    var xAxisData = ['Adding Connections', 'Reviewing Profiles', 'Reading Blogs', 'Updating Profile'];
    var data = [66, 45, 34, 22];
    var chartDataObj = {};
    chartDataObj['xAxisData'] = xAxisData;
    chartDataObj['data'] = data;
    
    chartOptions = ChartOptionsService.getTrendingBarChart(chartDataObj, "Activities before Churn", "Average, % times activity performed per login", 300, "#EE7E34");
	chartOBJ = chartsService.basicBar.call($('#trendActBarChartRet'),chartOptions, $scope);
	
	//chart data and options for trending activities bar chart
    var xAxisData = ["Who's viewed your profile", 'Add Connections', 'Messages', 'Notifications'];
    var data = [82, 35, 24, 18];
    var chartDataObj = {};
    chartDataObj['xAxisData'] = xAxisData;
    chartDataObj['data'] = data;
    
    chartOptions = ChartOptionsService.getTrendingBarChart(chartDataObj, "Modules visited before churn", "Average, % times section visited per login", 300, "#5F5F84");
	chartOBJ = chartsService.basicBar.call($('#trendSecBarChartRet'),chartOptions, $scope);
	
	//chart data and options for access donut chart
    var xAxisData = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    var data = [{
    	name: "Cancels",
    	data:[187821, 154776, 260862, 246949, 315644, 297208],
    	color:"#EE7E34"
    }];
    var chartDataObj = {};
    chartDataObj['xAxisData'] = xAxisData;
    chartDataObj['data'] = data;
    
    chartOptions = ChartOptionsService.getColumnChartWithoutPercentage(chartDataObj, "Cancels", "No. of Subscribers who cancelled, Past 6 months", 300);
	chartOBJ = chartsService.columnChart.call($('#cancelColChartRet'),chartOptions, $scope);
	
	//chart data and options for access donut chart
    var xAxisData = ['0-15 days', '15-30 days', '1-3 months', '3-6 months', '6-12 months', '>1 year'];
    var data = [{
    	name: "Tenure",
    	data:[25, 22, 10, 5, 23, 15],
    	color:"#EE7E34"
    }];
    var chartDataObj = {};
    chartDataObj['xAxisData'] = xAxisData;
    chartDataObj['data'] = data;
    
    chartOptions = ChartOptionsService.getLoginDurationColumnChart(chartDataObj, "Tenure before Churn", "Time spent as a subscriber before churn", 300);
	chartOBJ = chartsService.columnChart.call($('#activeColChartRet'),chartOptions, $scope);
	//chart data and options for access donut chart
    var xAxisData = ['0-15 days', '15-30 days', '1-3 months', '3-6 months', '6-12 months', '>1 year'];
    var data = [{
    	name: "Inactive days",
    	data:[25, 22, 10, 5, 23, 15],
    	color:"#EE7E34"
    }];
    var chartDataObj = {};
    chartDataObj['xAxisData'] = xAxisData;
    chartDataObj['data'] = data;
    
    chartOptions = ChartOptionsService.getLoginDurationColumnChart(chartDataObj, "Inactive days before Churn", "Time spent as a subscriber before churn", 300);
	chartOBJ = chartsService.columnChart.call($('#inactiveColChartRet'),chartOptions, $scope);
	
})