angular.module('DecisionWorkbench')

.controller( "overviewController", function($scope, DataService, CustomService, ChartOptionsService, $rootScope, UtilitiesService, $location) {

	$scope.rowClicked = function(attribute){
		console.log("clicked controller:", attribute);
		window.location = "#/overview-details?selectedGroup="+attribute;
	}
	
	$scope.wishlistSelected = function(attribute, isSelected){
		var wishlistRow = attribute.split('=')[1];
		var rowTopic = attribute.split('&')[0];
		console.log("attribute:", attribute);
		console.log("wishlistSelected:", isSelected, wishlistRow, rowTopic);
		$.each($scope.overallResponse, function(key, value){
			if(key == rowTopic){
				$.each(value, function(index, eachRow){
					if(eachRow.SNo == wishlistRow){
						eachRow.wishlist = isSelected;
					}
				})
			}
		})
		console.log("overallResponse after updated:", $scope.overallResponse);
		localStorage.setItem('campaignOptions', JSON.stringify($scope.overallResponse));
	}
	
	$scope.overallDataSuccess = function(response){
		$scope.overallResponse = response.data;
		$scope.addData(response.data['All Users']);
		$scope.addUserGroupsTableData(response.data.jobHoppers);
		$scope.addFeaturesTableData(response.data.photographers);
	}
	$scope.options = UtilitiesService.getDataTableOptions();
	$scope.userTableOptions = UtilitiesService.getDataTableOptions();
	$scope.featuresOptions = UtilitiesService.getDataTableOptions();
	var columOptions = {
			"aoColumns" : [ {
				"sClass" : "each-row-details"
			}, {
				"sClass" : "each-row-details"
			}, {
				"sClass" : "each-row-details"
			}, {
				"sClass" : "each-row-details"
			},null, null],
			'fnCreatedRow': function (nRow, aData, iDataIndex) {
				  $.each($('td', nRow), function (colIndex) {
					  if(aData){
						  $(this).attr('attr', 'All Users&selectedId='+aData[0]);
					  }
			            // For example, adding data-* attributes to the cell
			           /* $(this).attr('attr', "Enterprise users");*/
			        });
		    },
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
		var columOptionsAttr = {
				"aoColumns" : [ {
					"sClass" : "each-row-details"
				}, {
					"sClass" : "each-row-details"
				}, {
					"sClass" : "each-row-details"
				}, {
					"sClass" : "each-row-details"
				},null, null],
				'fnCreatedRow': function (nRow, aData, iDataIndex) {
					  $.each($('td', nRow), function (colIndex) {
						  if(aData){
							  $(this).attr('attr', aData[1]+'&selectedId='+aData[0]);
						  }
				            // For example, adding data-* attributes to the cell
				           /* $(this).attr('attr', "Enterprise users");*/
				        });
			    },
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
		$.extend(true, $scope.userTableOptions, columOptionsAttr);
		$.extend(true, $scope.featuresOptions, columOptionsAttr);

	
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
					                           "<div class='wishlist-unselected'></div>" ,"<div class='execute-unselected'></div>" ]);
				})
		} catch (e) {
			$scope.fail(errorConstants.DATA_ERR);
		}
	};
	$scope.clickUserGroup = function(selectedUserGroup){
		$scope.addUserGroupsTableData($scope.overallResponse[selectedUserGroup]);
	}
	
	$scope.addUserGroupsTableData = function(data) {
	    $rootScope.builddoLoad = true;
		$scope.dataLoaded = true;
		if (!data)
			throw "noDataError";
		try {
			$scope.error = false;
			$scope.userTableOptions.aaData = [];
			$.each(data, function(key, obj) {
					$scope.userTableOptions.aaData.push([obj.SNo, obj.userGroup,  obj.description, obj.impact,
					                           "<div class='wishlist-unselected'></div>" ,"<div class='execute-unselected'></div>" ]);
				})
		} catch (e) {
			$scope.fail(errorConstants.DATA_ERR);
		}
	};
	

	$scope.clickFeature = function(selectedFeature){
		$scope.addFeaturesTableData($scope.overallResponse[selectedFeature]);
	}
	$scope.addFeaturesTableData = function(data) {
	    $rootScope.builddoLoad = true;
		$scope.dataLoaded = true;
		if (!data)
			throw "noDataError";
		try {
			$scope.error = false;
			$scope.featuresOptions.aaData = [];
			$.each(data, function(key, obj) {
					$scope.featuresOptions.aaData.push([obj.SNo, obj.userGroup,  obj.description, obj.impact,
					                           "<div class='wishlist-unselected'></div>" ,"<div class='execute-unselected'></div>" ]);
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


	