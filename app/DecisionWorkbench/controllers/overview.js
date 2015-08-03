angular.module('DecisionWorkbench')

.controller( "overviewController", function($scope, DataService, CustomService, ChartOptionsService, $rootScope, UtilitiesService, $location) {

	$scope.rowClicked = function(attribute){
		console.log("clicked controller:", attribute);
		window.location = "#/overview-details?selectedGroup="+attribute;
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
						  $(this).attr('attr', aData[1]);
					  }
			            // For example, adding data-* attributes to the cell
			           /* $(this).attr('attr', "Enterprise users");*/
			        });
		    },
		    "bPaginate":false
		};
		$.extend(true, $scope.options, columOptions);
		$.extend(true, $scope.userTableOptions, columOptions);
		$.extend(true, $scope.featuresOptions, columOptions);

	
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


	