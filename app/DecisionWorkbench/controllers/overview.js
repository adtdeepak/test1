angular.module('DecisionWorkbench')

.controller( "overviewController", function($scope, DataService, CustomService, ChartOptionsService, $rootScope, UtilitiesService, $location) {

	$scope.rowClicked = function(attribute){
		console.log("clicked controller:", attribute);
		window.location = "#/overview-details?"+attribute;
	}
	
	$scope.overallDataSuccess = function(response){
		$scope.addData(response.data.allUsers);
	}
	$scope.options = UtilitiesService.getDataTableOptions();
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
			            // For example, adding data-* attributes to the cell
			            $(this).attr('attr', "allUsers");
			        });
		    }
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


	