angular.module('DecisionWorkbench')

.controller( "overviewDetailsController", function($scope, DataService,$timeout, CustomService, ChartOptionsService, $rootScope, UtilitiesService, chartsService, $location, DataConversionService ) {	
	
	$scope.selectedGroup = [{"key":"All Users","selected":false},{"key":"Project Managers","selected": false},{"key":"Enterprise users","selected": false},
	                        {"key":"Finance executives","selected": false},{"key":"Musicians","selected": false},{"key":"Photographers","selected": false},
	                        {"key":"videographers","selected": false}];

	var initialExpand  = true;
	var urlSelectedRowId = '';
	function getSelectedGroupFromUrl(){
		var urlIndex = $location.search();
		$.each($scope.selectedGroup, function(key, value){
			$scope.selectedGroup[key].selected= false;
			if($scope.selectedGroup[key].key == urlIndex.selectedGroup){
				$scope.selectedGroup[key].selected= true;
			}
		})
		$scope.groupHeading = urlIndex.selectedGroup;
		$scope.selectedRowId = urlIndex.selectedId;
		urlSelectedRowId = urlIndex.selectedId;
		$scope.addData($scope.overallResponse[urlIndex.selectedGroup]);
		
	}
	$scope.broadcastselectedGroup = function (selectedGroup, index) {
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
		$scope.otherAccordianData = response.data.otherData;
		$scope.activityEngagementOverallData = response.data.activityEngagementData;
		getSelectedGroupFromUrl();
		//$scope.addData(response.data.allUsers);
		
	}
	
	$scope.selectRow = function(attribute){
		$scope.selectedRowId = attribute;
	}
	$scope.updateExpandData = function(){
		var dataSetObject = $scope.activityEngagementOverallData[$scope.groupHeading][$scope.selectedRowId];
		var dataSet = [];
		var accordianTrendData = $scope.otherAccordianData[$scope.groupHeading][$scope.selectedRowId];
		$scope.userGroupData =  $scope.otherAccordianData[$scope.groupHeading][$scope.selectedRowId].userGroup.otherData;
		
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
		
		chartData = DataConversionService.getHorizontalBarChartData(accordianTrendData.engagement.trend);
		chartOptions = ChartOptionsService.activeUsersAreaChart(chartData, "Engagement", "", 300);
		chartOBJ = chartsService.areaChart.call($('.engagementChart'),chartOptions, $scope);
		
		chartData = DataConversionService.getHorizontalBarChartData(accordianTrendData.userGroup.trend);
	    chartOptions = ChartOptionsService.getColumnBarChart(chartData, "Month of joining", "", 300, "#BCBCBC");
		chartOBJ = chartsService.basicBar.call($('.monthBarChart'),chartOptions, $scope);
		
		var xAxisData = [' ', ' '];
	    var chartDataObj = {};
	    chartDataObj['xAxisData'] = xAxisData;
	    chartDataObj['data'] = accordianTrendData.impact.conversion.data;

	    
	    chartOptions = ChartOptionsService.getOverviewColumnChart(chartDataObj, " ", "Increase in % Conversion", 300);
		chartOBJ = chartsService.columnChart.call($('.conversionChart'),chartOptions, $scope);
		
	    var chartDataObj = {};
	    chartDataObj['xAxisData'] = xAxisData;
	    chartDataObj['data'] = accordianTrendData.impact.userConverted.data;
	    
	    chartOptions = ChartOptionsService.getOverviewColumnChart(chartDataObj, " ", "Increase in # of user converted", 300);
		chartOBJ = chartsService.columnChart.call($('.convertedUserChart'),chartOptions, $scope);
		
		    var chartDataObj = {};
		    chartDataObj['xAxisData'] = xAxisData;
		    chartDataObj['data'] = accordianTrendData.impact.revenue.data;
		    
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
			'fnCreatedRow': function (nRow, aData, iDataIndex) {
				  $.each($('td', nRow), function (colIndex) {
					  if(aData){
						  $(this).attr('attr', aData[0]);
					  }
			            // For example, adding data-* attributes to the cell
			           /* $(this).attr('attr', "Enterprise users");*/
			        });
		    },
			"fnRowCallback" : function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
				var className = "";
				
				if(aData[0] == urlSelectedRowId){
					className = "expandRow";
				}
				if(iDisplayIndex%2 != 0){
					className += " oddRowColor";
				}else{
					className += " evenRowColor";
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
		$timeout(function () {$(".dataTableContainer .expandRow td.row-expand-details .xclose").trigger('click');}, 200);
		/*if(initialExpand){
			$timeout(function () {$(".dataTableContainer .expandRow td.row-expand-details .xclose").trigger('click');}, 200);
			initialExpand = false;
		}*/
	
		
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

