angular.module('Analysis')

.controller('comparisonController', function($scope, CustomService, chartsService, ChartOptionsService) {
    //chart options
    var chartOptions;
    var chartData;
    //chart data and options for gender pie chart
    chartData = [{
    	name: "Senior Mngt",
    	y: 10,
    	color:"#5097D7"
    }, {	
    	name: "Finance Execs",
    	y: 22,
    	color:"#EE7F30"
    },{
    	name: "Freshers",
    	y: 32,
    	color:"#B6B3AC"
    }, {	
    	name: "Recruiters",
    	y: 36,
    	color:"#FFC000"
    }];
    chartOptions = ChartOptionsService.getPieChartWithNoLegend(chartData, "", "Revenue ($mn)", 150);
	chartOBJ = chartsService.pieChart.call($('#revenuePieChart'),chartOptions, $scope);
	
	chartOptions = ChartOptionsService.getPieChartWithNoLegend(chartData, "", "Subscribers (No. of users)", 150);
	chartOBJ = chartsService.pieChart.call($('#subsPieChart'),chartOptions, $scope);
	
	chartOptions = ChartOptionsService.getPieChartWithNoLegend(chartData, "", "New Subscribers(No. of users)", 150);
	chartOBJ = chartsService.pieChart.call($('#newSubsPieChart'),chartOptions, $scope);
	
	chartOptions = ChartOptionsService.getPieChartWithNoLegend(chartData, "", "Cancels (No. of users)", 150);
	chartOBJ = chartsService.pieChart.call($('#cancelPieChart'),chartOptions, $scope);
     
	
	//chart data and options for trending activities bar chart
    var xAxisData = ['Freshers', 'Finance Execs', 'Senior Mngt', 'Recruiters'];
    var series = [{
        name: 'Advanced',
        data: [12, 24, 19, 14],
        color:"#A6A6A6"
    }, {
        name: 'Basic',
        data: [23, 30, 28, 25],
        color:"#EF7C3D"
    }, {
        name: 'Onboarding',
        data: [36, 34, 26, 33],
        color:"#5C99D0"
    }];
    var chartDataObj = {};
    chartDataObj['xAxisData'] = xAxisData;
    chartDataObj['series'] = series;
    
    chartOptions = ChartOptionsService.getTrendingBarChartSeries(chartDataObj, "Stage Completion", "% users who have completed target activities per stage", 600, "#EE7E34");
	chartOBJ = chartsService.basicBar.call($('#stageBarChart'),chartOptions, $scope);
	
	 var xAxisData = ['Freshers', 'Finance Execs', 'Senior Mngt', 'Recruiters'];
	    var series = [{
	        name: 'High',
	        data: [12, 24, 19, 14],
	        color:"#A6A6A6"
	    }, {
	        name: 'Medium',
	        data: [23, 30, 28, 25],
	        color:"#EF7C3D"
	    }, {
	        name: 'Low',
	        data: [36, 34, 26, 33],
	        color:"#5C99D0"
	    }];
	    var chartDataObj = {};
	    chartDataObj['xAxisData'] = xAxisData;
	    chartDataObj['series'] = series;
    
    chartOptions = ChartOptionsService.getTrendingBarChartSeries(chartDataObj, "Churn Risk", "Probability of users churning", 600, "#EE7E34");
	chartOBJ = chartsService.basicBar.call($('#churnBarChart'),chartOptions, $scope);
})