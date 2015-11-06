angular.module('Analysis')

.controller("customerLandscapeInitController", function ($scope, CustomService) {
	setTimeout(function () { CustomService.appInit(); }, 1000);
})



.controller('segmentOverviewController', function($scope, CustomService, chartsService, ChartOptionsService, DataConversionService, DataService, UtilitiesService ) {
    //Profile chart options
    var chartOptions;
    var chartData;
    $scope.options = UtilitiesService.getDataTableOptions();
    $scope.productProfileOptions = UtilitiesService.getDataTableOptions();
    $scope.productUsageOptions = UtilitiesService.getDataTableOptions();
    $scope.engagementOptions = UtilitiesService.getDataTableOptions();
    $scope.currentCampaignOptions = UtilitiesService.getDataTableOptions();
    
    $scope.tableOptions = {
    	"bPaginate": false,
    	"bSort":false,
    	"fnRowCallback" : function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
			if(iDisplayIndex%2 != 0){
				className = "oddRowColor";
			}else{
				className = "evenRowColor";
			}
			$(nRow).addClass(className);
		},
		"createdRow": function ( row, data, index ) {
             $('td', row).eq(0).addClass('bold');
             $('td', row).not(':eq(0)').addClass('text-center');
        }
    };
    $.extend(true, $scope.options, $scope.tableOptions);
    $.extend(true, $scope.productProfileOptions, $scope.tableOptions);
    $.extend(true, $scope.productUsageOptions, $scope.tableOptions);
    $.extend(true, $scope.engagementOptions, $scope.tableOptions);
    $.extend(true, $scope.currentCampaignOptions, $scope.tableOptions);
    
    console.log("$scope.options:", $scope.options);
	
	$scope.segmentOverviewSuccess = function(segmentOverviewData) {
		console.log("segmentOverviewData:", segmentOverviewData)

		chartData = DataConversionService.getPieChartData(segmentOverviewData.data.size.allUsers);
	    chartOptions = ChartOptionsService.getPieChart(chartData, "Size", " ", 300);
		chartOBJ = chartsService.donutChart.call($('#sizePieChart'),chartOptions, $scope);
		
		chartData = DataConversionService.getPieChartData(segmentOverviewData.data.revenue.dollars);
	    chartOptions = ChartOptionsService.getPieChart(chartData, "Revenue", " ", 300);
		chartOBJ = chartsService.donutChart.call($('#revenuePieChart'),chartOptions, $scope);
		
		chartData = DataConversionService.getHorizontalBarChartData(segmentOverviewData.data.freeToPaidConversion);
	    chartOptions = ChartOptionsService.getFreeToPaidBarChart(chartData, "Free to Paid Conversion", "", 300, "#EE7E34");
		chartOBJ = chartsService.basicBar.call($('#freeToPaidConvChart'),chartOptions, $scope);
		
		$scope.addData(segmentOverviewData.data.DemographicProfile);
		$scope.productProfileData(segmentOverviewData.data.ProductProfile);
		$scope.productUsageData(segmentOverviewData.data.ProductUsage);
		$scope.engagementData(segmentOverviewData.data.Engagement);
		$scope.currentCampaigns(segmentOverviewData.data.CurrentCampaigns);
	}
	
	//Populating data for overall table
	$scope.addData = function(data) {
		$scope.dataLoaded = true;
		if (!data)
			throw "noDataError";
		try {
			$scope.error = false;
			$scope.options.aaData = [];
			$.each(data, function(key, obj) {
					$scope.options.aaData.push([ obj.name, obj.OfficeGoers, obj.Teachers,  obj.Musicians, obj.CreativeAgencies, obj.FriendsAndFamily]);
				})
		} catch (e) {
			//$scope.fail(errorConstants.DATA_ERR);
		}
	};
	
	$scope.productProfileData = function(productProfileData) {
		$scope.dataLoaded = true;
		if (!productProfileData)
			throw "noDataError";
		try {
			$scope.error = false;
			$scope.productProfileOptions.aaData = [];
			$.each(productProfileData, function(key, obj) {
				$scope.productProfileOptions.aaData.push([ obj.name, obj.OfficeGoers, obj.Teachers,  obj.Musicians, obj.CreativeAgencies, obj.FriendsAndFamily]);
			})
		} catch (e) {
			//$scope.fail(errorConstants.DATA_ERR);
		}
	};
	
	$scope.productUsageData = function(data) {
		$scope.dataLoaded = true;
		if (!data)
			throw "noDataError";
		try {
			$scope.error = false;
			$scope.productUsageOptions.aaData = [];
			$.each(data, function(key, obj) {
					$scope.productUsageOptions.aaData.push([ obj.name, obj.OfficeGoers, obj.Teachers,  obj.Musicians, obj.CreativeAgencies, obj.FriendsAndFamily]);
				})
		} catch (e) {
			//$scope.fail(errorConstants.DATA_ERR);
		}
	};
	
	$scope.engagementData = function(data) {
		$scope.dataLoaded = true;
		if (!data)
			throw "noDataError";
		try {
			$scope.error = false;
			$scope.engagementOptions.aaData = [];
			$.each(data, function(key, obj) {
					$scope.engagementOptions.aaData.push([ obj.name, obj.OfficeGoers, obj.Teachers,  obj.Musicians, obj.CreativeAgencies, obj.FriendsAndFamily]);
				})
		} catch (e) {
			//$scope.fail(errorConstants.DATA_ERR);
		}
	};
	$scope.currentCampaigns = function(data) {
		$scope.dataLoaded = true;
		if (!data)
			throw "noDataError";
		try {
			$scope.error = false;
			$scope.currentCampaignOptions.aaData = [];
			$.each(data, function(key, obj) {
					$scope.currentCampaignOptions.aaData.push([ obj.name, obj.OfficeGoers, obj.Teachers,  obj.Musicians, obj.CreativeAgencies, obj.FriendsAndFamily]);
				})
		} catch (e) {
			//$scope.fail(errorConstants.DATA_ERR);
		}
	};
	
	
	var requestData = {};
	function loadData(){
		var func = $scope.segmentOverviewSuccess; 
		if (arguments[1]) { 
			if (arguments[1].key == cacheKey) { 
				func = null; 
			} else { 
				return false; 
			} 
		} 
		DataService.segmentOverviewData(requestData, func, $scope.fail); 
	}
	
	loadData();
	
})

