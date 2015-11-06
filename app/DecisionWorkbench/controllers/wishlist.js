angular.module('DecisionWorkbench')

.controller( "wishlistController", function($scope, DataService,$timeout, CustomService, ChartOptionsService, $rootScope, UtilitiesService, chartsService, $location, DataConversionService ) {	
	
	$scope.selectedGroup = [{"key":"All Users","selected":false,"index":0},{"key":"Office Goers","selected": false,"index":1},{"key":"Teachers","selected": false,"index":2},
	                        {"key":"Musicians","selected": false,"index":3},{"key":"Creative Agencies","selected": false,"index":4},{"key":"Family And Friends","selected": false,"index":5}];

	var initialExpand  = true;
	var urlSelectedRowId = '';
	function setSelectedAsAllUsers(){
		var urlIndex = $location.search();
		$.each($scope.selectedGroup, function(key, value){
			$scope.selectedGroup[key].selected= false;
			if($scope.selectedGroup[key].key == "All Users"){
				$scope.selectedGroup[key].selected= true;
			}
		})
		$scope.groupHeading = "All Users";
		$scope.selectedRowId = urlIndex.selectedId;
		urlSelectedRowId = urlIndex.selectedId;
		$scope.addData($scope.overallResponse["All Users"]);
		
	}
	
	$scope.wishlistSelected = function(attribute, isSelected){
		var selectedGroup;
		$.each($scope.overallResponse, function(key, value){
			if(key == "All Users"){
				$.each(value, function(index, eachRow){
					if(eachRow.id == attribute){
						eachRow.wishlist = isSelected;
						selectedGroup = eachRow.userGroup;
					}
				})
			}
		})
		$.each($scope.overallResponse, function(key, value){
			if(key == selectedGroup){
				$.each(value, function(index, eachRow){
					if(eachRow.id == attribute){
						eachRow.wishlist = isSelected;
						selectedGroup = eachRow.userGroup;
					}
				})
			}
		})
		localStorage.setItem('OverviewDetails', JSON.stringify($scope.fullResponse));
	}
	
	$scope.executeSelected = function(attribute, isSelected){
		var selectedGroup;
		$.each($scope.overallResponse, function(key, value){
			if(key == "All Users"){
				$.each(value, function(index, eachRow){
					if(eachRow.id == attribute){
						eachRow.selected = isSelected;
						selectedGroup = eachRow.userGroup;
					}
				})
			}
		})
		$.each($scope.overallResponse, function(key, value){
			if(key == selectedGroup){
				$.each(value, function(index, eachRow){
					if(eachRow.id == attribute){
						eachRow.selected = isSelected;
						selectedGroup = eachRow.userGroup;
					}
				})
			}
		})
		localStorage.setItem('OverviewDetails', JSON.stringify($scope.fullResponse));
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
		$scope.fullResponse = response;
		$scope.overallResponse = response.data.bestCampaignOptions;
		$scope.campaignData = response.data.bestCampaignOptions.allUsers;
		$scope.otherAccordianData = response.data.otherData;
		$scope.activityEngagementOverallData = response.data.activityEngagementData;
		setSelectedAsAllUsers();
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
			"aoColumns" : [ null, null ,null, null,null, null, null],
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
		$scope.isWishlistThere = true;
	    $rootScope.builddoLoad = true;
		$scope.dataLoaded = true;
		if (!data)
			throw "noDataError";
		try {
			$scope.error = false;
			$scope.options.aaData = [];
			$.each(data, function(key, obj) {
				if(obj.wishlist == "yes"){
					var executeSection = "<div class='execute-unselected'></div>";
					if(obj.selected == "yes"){
						var executeSection = "<div class='execute-unselected execute-selected'></div>";
					}
					$scope.options.aaData.push([obj.id, obj.userGroup, obj.featurePromoted,  obj.description, obj.impact,
					   "<div class='wishlist-unselected wishlist-selected'></div>", executeSection]);
				}
					
				})
			if($scope.options.aaData.length == 0){
				$scope.isWishlistThere = false;
			}
		} catch (e) {
			$scope.fail(errorConstants.DATA_ERR);
		}
	};
	
	function getAllUserTableData() {
		if(localStorage.getItem('OverviewDetails')){
			$scope.overallDataSuccess(JSON.parse(localStorage.getItem('OverviewDetails'))); 
		}
	
	} 
	getAllUserTableData()
	
	

})

