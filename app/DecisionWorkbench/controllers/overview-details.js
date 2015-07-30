angular.module('DecisionWorkbench')

.controller( "overviewDetailsController", function($scope, DataService, CustomService, ChartOptionsService, $rootScope, UtilitiesService, chartsService) {	
	$scope.overallDataSuccess = function(response){
		console.log("response:", response);
		$scope.addData(response.data.allUsers);
		
		
		
	    var xAxisData = [' ', ' '];
	    var data = [{
	    	name: "Conversion",
	    	data:[3],
	    	color:"#999999"
	    },{
	    	name: "Conversion",
	    	data:[5],
	    	color:"#009E0F"
	    }];
	    var chartDataObj = {};
	    chartDataObj['xAxisData'] = xAxisData;
	    chartDataObj['data'] = data;
	    
	    chartOptions = ChartOptionsService.getOverviewColumnChart(chartDataObj, " ", "Increase in % Conversion", 300);
		chartOBJ = chartsService.columnChart.call($('#conversionChart'),chartOptions, $scope);
		
	  var data = [{
	    	name: "Conversion",
	    	data:[20353],
	    	color:"#999999"
	    },{
	    	name: "Conversion",
	    	data:[33922],
	    	color:"#009E0F"
	    }];
	    var chartDataObj = {};
	    chartDataObj['xAxisData'] = xAxisData;
	    chartDataObj['data'] = data;
	    
	    chartOptions = ChartOptionsService.getOverviewColumnChart(chartDataObj, " ", "Increase in # of user converted", 300);
		chartOBJ = chartsService.columnChart.call($('#convertedUserChart'),chartOptions, $scope);
		
		 var data = [{
		    	name: "Conversion",
		    	data:[793],
		    	color:"#999999"
		    },{
		    	name: "Conversion",
		    	data:[1322],
		    	color:"#009E0F"
		    }];
		    var chartDataObj = {};
		    chartDataObj['xAxisData'] = xAxisData;
		    chartDataObj['data'] = data;
		    
		    chartOptions = ChartOptionsService.getOverviewColumnChart(chartDataObj, " ", "Increase in Revenue (LTV = $39)", 300);
			chartOBJ = chartsService.columnChart.call($('#revenueChart'),chartOptions, $scope);
		
		
		
		
		
	}
	
	$scope.updateExpandData = function(){
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
		chartOBJ = chartsService.pieChart.call($('#graph123'),chartOptions, $scope);
	}
	$scope.options = UtilitiesService.getDataTableOptions();
	var columOptions = {
			"aoColumns" : [ {
				"sClass" : "row-expand-details"
			}, {
				"sClass" : "row-expand-details"
			}, {
				"sClass" : "row-expand-details"
			}, {
				"sClass" : "row-expand-details"
			},null, null]
		};
		$.extend(true, $scope.options, columOptions);
	
	
	$scope.addData = function(data) {
	    $rootScope.builddoLoad = true;
		$scope.dataLoaded = true;
			console.log("$scope.options:", $scope.options)
		if (!data)
			throw "noDataError";
		try {
			$scope.error = false;
			$scope.options.aaData = [];
			$.each(data, function(key, obj) {
					$scope.options.aaData.push([obj.SNo, obj.description, obj.impact, obj.userGroup, , ]);
				})
		} catch (e) {
			$scope.fail(errorConstants.DATA_ERR);
		}
	};
	
	
	function getAllUserTableData() {
		var requestData = {};
		var func = $scope.overallDataSuccess; 
    	if (arguments[1]) { 
    		if (arguments[1].key == cacheKey) { 
    			func = null; 
    		} else { 
    			return false; 
    		} 
    	} 
    	DataService.getAllUserData(requestData, func, $scope.fail); 
	
	} 
	getAllUserTableData();
})


	