angular.module('DecisionWorkbench')

.controller( "overviewDetailsController", function($scope, DataService,$timeout, CustomService, ChartOptionsService, $rootScope, UtilitiesService, chartsService, $location, DataConversionService ) {	
	
	$scope.campaignType = [{"name":"Features","selected":false},{"name":"User Groups","selected":true}];
	
	$scope.selectedGroup = [{"key":"All Users","selected":false,"index":0},{"key":"Office Goers","selected": false,"index":1},{"key":"Teachers","selected": false,"index":2},
	                        {"key":"Musicians","selected": false,"index":3},{"key":"Creative Agencies","selected": false,"index":4},{"key":"Family And Friends","selected": false,"index":5}];
	
	$scope.selectedFeature = [{"key":"Online streaming","selected":false},{"key":"Collaborate","selected": false},{"key":"Automatic Backup","selected": false},
	                        {"key":"Mobile App","selected": false},{"key":"eSign","selected": false}, {"key":"Microsoft 365 Integration","selected": false},{"key":"Version Control","selected": false},{"key":"Workspace Share","selected": false},
	                        {"key":"Full Text Search","selected": false},{"key":"Storage Space","selected": false},{"key":"All Features","selected": false}];

	var initialExpand  = true;
	var urlSelectedRowId = '';
	var urlIndex = $location.search();
	function getSelectedGroupFromUrl(){
		urlIndex = $location.search();
		$scope.campaignTypeSelected(urlIndex.selectedGroup);
			// alert(urlIndex.selectedGroup);
		$.each($scope.selectedGroup, function(key, value){
			$scope.selectedGroup[key].selected= false;
			if($scope.selectedGroup[key].key == urlIndex.group){
				$scope.selectedGroup[key].selected= true;
			}
		})
		$.each($scope.selectedFeature, function(key, value){
			$scope.selectedFeature[key].selected= false;
			if($scope.selectedFeature[key].key == urlIndex.group){
				$scope.selectedFeature[key].selected= true;
			}
		})
		$scope.groupHeading = urlIndex.selectedGroup;
		$scope.selectedRowId = urlIndex.selectedId;
		urlSelectedRowId = urlIndex.selectedId;
		$scope.addData($scope.overallResponse[urlIndex.selectedGroup]);
	}
	
	$scope.campaignTypeSelected = function(name){
		$.each($scope.campaignType, function(key, value){
			value.selected = false;
			if(value.name == name){
				value.selected = true;
			};
			if($scope.campaignType[1].selected){
				$.each($scope.selectedGroup, function(key, value){
					if($scope.selectedGroup[key].key == urlIndex.group){
						var index = $scope.selectedGroup[key].index;
						$scope.broadcastselectedGroup(urlIndex.group, index);
					};
				})
			}else{
				$.each($scope.selectedFeature, function(key, value){
					if($scope.selectedFeature[key].key == urlIndex.group){
						var index = $scope.selectedFeature[key].index;
						$scope.broadcastselectedFeature(urlIndex.group, index);
					};
				
				})
			}
		})
		
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
	
	$scope.broadcastselectedFeature = function (selectedFeature, index) {
		console.log("selectedFeature", selectedFeature, index)
		$.each($scope.selectedFeature, function(key, value){
			$scope.selectedFeature[key].selected= false;
			if(key == index){
				$scope.selectedFeature[index].selected= true;
			}
		});
		$scope.groupHeading = selectedFeature;
		$scope.addData($scope.overallResponse[selectedFeature]);
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
		$scope.productUsageTableData = response.data.otherData;
		getSelectedGroupFromUrl();
		//$scope.addData(response.data.allUsers);
		
	}
	
	$scope.selectRow = function(attribute){
		$scope.selectedRowId = attribute;
	}
	$scope.updateExpandData = function(){
		var dataSetObjProduct = $scope.productUsageTableData['All Users'][$scope.selectedRowId].tableData.productUsage;
		var dataSetObjOnGoingCampaign = $scope.productUsageTableData['All Users'][$scope.selectedRowId].tableData.onGoingCampaign;
		var dataSetObjPastCampaign = $scope.productUsageTableData['All Users'][$scope.selectedRowId].tableData.pastCampaign;
		
		var dataSet = [];
		var dataSet1 = [];
		var accordianTrendData = $scope.otherAccordianData["All Users"][$scope.selectedRowId];
		$scope.userGroupData =  $scope.otherAccordianData["All Users"][$scope.selectedRowId].userGroup.targetedUsers[0];
		console.log("$scope.userGroupData:", $scope.userGroupData);
		$.each(dataSetObjProduct, function (key, obj) {
			dataSet.push([obj.feature,
			              obj.currentUsageLevel,
			              obj.ideaUsagelevel,
			              obj.impactOnEGScore]);
		});
		$(document).ready(function() {
		    $('#demo').html( '<table style="text-align:center;" cellpadding="0" cellspacing="0" border="0" class="display" id="productUsageTable"></table>' );
		 
		    $('#productUsageTable').dataTable( {
		    	"bPaginate":false,
		        "data": dataSet,
		        "bFilter": false,
		        "bInfo": false,
		        "bSort": false,
		        "columns": [
		            { "title": "Feature" },
		            { "title": "Current Usage Level" },
		            { "title": "Ideal Usage Level" },
		            { "title": "Impact on Engagement Score"}
		        ],
            dom: '<"dataTableContainer"t><"dataTablePaginateContainer"p>'
		    } );   
		    dataSet = [];
		    $.each(dataSetObjOnGoingCampaign, function (key, obj) {
				dataSet.push([obj.campaignID,
				              obj.campaignDescription,
				              obj.Impact,
				              obj.Channel,
				              obj.startDate]);
			});
		    
		    $('#table2').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="onGoingCampaignTable"></table>' );
			
		    $('#onGoingCampaignTable').dataTable( {
		    	"bPaginate":false,
		        "data": dataSet,
		        "bFilter": false,
		        "bInfo": false,
		        "bSort": false,
		        "columns": [
		            { "title": "Campaign ID" },
		            { "title": "Campaign Description" },
		            { "title": "Impact" },
		            { "title": "Channel" },
		            { "title": "Start Date" }
		        ],
            dom: '<"dataTableContainer"t><"dataTablePaginateContainer"p>'
		    } );
		    
		    dataSet = [];
		    $.each(dataSetObjPastCampaign, function (key, obj) {
				dataSet.push([obj.campaignID,
				              obj.campaignDescription,
				              obj.Impact,
				              obj.Channel,
				              obj.endDate]);
			});
		    
		    $('#table3').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="pastCampaignTable"></table>' );
			
		    $('#pastCampaignTable').dataTable( {
		    	"bPaginate":false,
		        "data": dataSet,
		        "bFilter": false,
		        "bInfo": false,
		        "bSort": false,
		        "columns": [
		            { "title": "Campaign ID" },
		            { "title": "Campaign Description" },
		            { "title": "Impact" },
		            { "title": "Channel" },
		            { "title": "End Date" }
		        ],
            dom: '<"dataTableContainer"t><"dataTablePaginateContainer"p>'
		    } );
		    
		} );
		
		var chartOptions;
		var chartData;
		chartData = DataConversionService.getHorizontalBarChartData(accordianTrendData.userGroup.trend);
	    chartOptions = ChartOptionsService.getColumnBarChart(chartData, "New Registrants added per month", "Month of joining", 220, "#F5874F");
		chartOBJ = chartsService.basicBar.call($('.monthBarChart'),chartOptions, $scope);
		
		
		chartData = DataConversionService.getPieChartData($scope.userGroupData.gender);
	    chartOptions = ChartOptionsService.getPieChart(chartData, "", "", 150);
		chartOBJ = chartsService.donutChart.call($('.genderInnerDonutChart'),chartOptions, $scope);
	}
	$scope.options = UtilitiesService.getDataTableOptions();
	var columOptions = {
			"aoColumns" : [{
				"sClass" : "row-expand-details"
			},{
				"sClass" : "row-expand-details"
			},{
				"sClass" : "row-expand-details"
			},{
				"sClass" : "row-expand-details"
			},{
				"sClass" : "row-expand-details"
			},{
				"sClass" : "row-expand-details"
			},{
				"sClass" : "row-expand-details"
			}],
            "order": [],
            "columnDefs": [ {
                    "targets"  : 'no-sort',
                    "orderable": false
            }],
			"bPaginate":true,
            "bSortable": false,
            "aSortable" : false,
            "orderable": false,
			"iDisplayLength": 10,
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
		console.log("data:", $scope.productUsageTableData);
	    $rootScope.builddoLoad = true;
		$scope.dataLoaded = true;
		if (!data)
			throw "noDataError";
		try {
			$scope.error = false;
			$scope.options.aaData = [];
			$.each(data, function(key, obj) {
				var wishlistSection = "<div class='wishlist-unselected'></div>"
				//var executeSection = "<div class='execute-unselected'></div>";
				var executeSection = "<a href='resources/selected_campaign_info.xlsx' download><div class='execute-unselected'></div></a>";
				if(obj.wishlist == "yes"){
					wishlistSection = "<div class='wishlist-unselected wishlist-selected'></div>"
				}
				if(obj.selected == "yes"){
					executeSection = "<a href='resources/selected_campaign_info.xlsx' download><div class='execute-unselected execute-selected'></div></a>";
					//executeSection = "<div class='execute-unselected execute-selected'></div>"
				}
					$scope.options.aaData.push([obj.id, obj.userGroup, obj.featurePromoted,  obj.description, obj.impact,
					   wishlistSection , executeSection]);
				})
		} catch (e) {
			$scope.fail(errorConstants.DATA_ERR);
		}
		$timeout(function () {
			$(".dataTableContainer .expandRow td.row-expand-details").trigger('openSelectedAccordian');
			  $("body, html").animate({ 
			        scrollTop: $('#campaign-inner-table tbody tr.shown').offset().top 
			    }, 1000);	
		}, 200);
	
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
