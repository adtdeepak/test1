angular.module('DecisionWorkbench')

.controller( "overviewDetailsController", function($scope, DataService, CustomService, ChartOptionsService, $rootScope, UtilitiesService, chartsService, $location) {	
	
	$scope.selectedGroup = [{"key":"All Users","selected":false},{"key":"Project Managers","selected": false},{"key":"Enterprise users","selected": false},
	                        {"key":"Finance executives","selected": false},{"key":"Musicians","selected": false},{"key":"Photographers","selected": false},
	                        {"key":"videographers","selected": false}];

	function getSelectedGroupFromUrl(){
		var urlIndex = $location.search();
		$.each($scope.selectedGroup, function(key, value){
			$scope.selectedGroup[key].selected= false;
			if($scope.selectedGroup[key].key == urlIndex.selectedGroup){
				$scope.selectedGroup[key].selected= true;
			}
		})
		$scope.groupHeading = urlIndex.selectedGroup;
		$scope.addData($scope.overallResponse[urlIndex.selectedGroup]);
		
	}
	$scope.broadcastselectedGroup = function (selectedGroup, index) {
		console.log("selectedGroup",selectedGroup)
		$.each($scope.selectedGroup, function(key, value){
			$scope.selectedGroup[key].selected= false;
			if(key == index){
				$scope.selectedGroup[index].selected= true;
			}
		});
		$scope.groupHeading = selectedGroup;
		$scope.addData($scope.overallResponse[selectedGroup]);
	};
	
	$scope.expand = function(item)
	{
	    item.showfull = !item.showfull;
	    for (var i = 0; i < $scope.campaignData.length; i++)
	    {
	        var currentItem = $scope.campaignData[i];
	        if (currentItem != item)
	        {
	            currentItem .showfull = false;
	        } 
	    }
	}
	
	
	$scope.overallDataSuccess = function(response){
		$scope.overallResponse = response.data.bestCampaignOptions;
		$scope.campaignData = response.data.bestCampaignOptions.allUsers;
		getSelectedGroupFromUrl();
		//$scope.addData(response.data.allUsers);
		
	}
	
	$scope.updateExpandData = function(){
		var chartOptions;
		var chartData; var xAxisData = [' ', ' '];
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
		chartOBJ = chartsService.columnChart.call($('.conversionChart'),chartOptions, $scope);
		
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
		chartOBJ = chartsService.columnChart.call($('.convertedUserChart'),chartOptions, $scope);
		
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
			chartOBJ = chartsService.columnChart.call($('.revenueChart'),chartOptions, $scope);
	}
	$scope.options = UtilitiesService.getDataTableOptions();
	var columOptions = {
			"aoColumns" : [ null, null ,null, null,null, null,
			{
				"sClass" : "row-expand-details"
			}],
			"bPaginate":false
		};
		$.extend(true, $scope.options, columOptions);
	
	
	$scope.addData = function(data) {
	    $rootScope.builddoLoad = true;
		$scope.dataLoaded = true;
		if (!data)
			throw "noDataError";
		try {
			$scope.error = false;
			$scope.options.aaData = [];
			$.each(data, function(key, obj) {
					$scope.options.aaData.push([obj.SNo, obj.userGroup,  obj.description, obj.impact,
					     "<div class='wishlist-unselected'></div>" ,"<div class='execute-unselected'></div>","<div class='xclose'></div>"]);
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
    	DataService.getOverviewDetailsData(requestData, func, $scope.fail); 
	
	} 
	getAllUserTableData();
})

