angular.module('DecisionWorkbench')

.controller( "overviewDetailsController", function($scope, DataService, CustomService, ChartOptionsService, $rootScope, UtilitiesService, chartsService, $location, DataConversionService ) {	
	
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
		$scope.activityEngagementOverallData = response.data.activityEngagementData;
		getSelectedGroupFromUrl();
		//$scope.addData(response.data.allUsers);
		
	}
	
	$scope.updateExpandData = function(){
		
		var dataSetObject = $scope.activityEngagementOverallData[$scope.groupHeading];
		var dataSet = [];
		
		$.each(dataSetObject, function (key, obj) {
			dataSet.push([obj.moduleName,
			              obj.engagementLevel,
			              obj.engagementScore.score,
			              obj.engagementScore.scoreLastMo,
			              obj.engagementScore.scoreLastQtr,
			              obj.engagementScore.scoreLastYr,
			              obj.noOfUsers.number,
			              obj.noOfUsers.noLastMo,
			              obj.noOfUsers.noLastQtr,
			              obj.noOfUsers.noLastYr]);
		});
		$(document).ready(function() {
		    $('#demo').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="example"></table>' );
		 
		    $('#example').dataTable( {
		    	"bPaginate":false,
		        "data": dataSet,
		        "bFilter": false,
		        "bInfo": false,
		        "columns": [
		            { "title": "Module" },
		            { "title": "Engagement Level" },
		            { "title": "Engagement Score" },
		            { "title": "Last Month", "class": "center" },
		            { "title": "Last Quarter", "class": "center" },
		            { "title": "Last Year", "class": "center" },
		            { "title": "No. of users", "class": "center" },
		            { "title": "Last Month", "class": "center" },
		            { "title": "Last Quarter", "class": "center" },
		            { "title": "Last Year", "class": "center" }
		        ],
            dom: '<"dataTableContainer"t><"dataTablePaginateContainer"p>'
		    } );   
		} );
		
		var chartOptions;
		var chartData;

		var data = {
	        	"activeUsers":{
	        		"name":["", "", ""],
	        		"values":[14, 49, 14],
	        		"color":"#05395d"
	        	}};
		
		var dataHere = {
			"name":["Jan-15", "Feb-15", "Mar-15", "Apr-15","May-15", "Jun-15", "Jul-15", "Aug-15", "Sep-15", "Oct-15", "Nov-15", "Dec-15"],
			"values":[50, 75, 50, 75, 50, 75, 50, 75, 50, 75],
			"color":"#1b6395"
		};
		
		chartData = DataConversionService.getHorizontalBarChartData(data.activeUsers);
		chartOptions = ChartOptionsService.activeUsersAreaChart(chartData, "Engagement", "", 300);
		chartOBJ = chartsService.areaChart.call($('.engagementChart'),chartOptions, $scope);
		
		chartData = DataConversionService.getHorizontalBarChartData(dataHere);
	    chartOptions = ChartOptionsService.getColumnBarChart(chartData, "Month of joining", "", 300, "#BCBCBC");
		chartOBJ = chartsService.basicBar.call($('.monthBarChart'),chartOptions, $scope);
		
		
		
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
			"bPaginate":false,
			"fnRowCallback" : function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
				if(iDisplayIndex%2 != 0){
					className = "oddRowColor";
				}else{
					className = "evenRowColor";
				}
				$(nRow).addClass(className);
			}
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

