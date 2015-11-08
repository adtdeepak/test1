angular.module('Analysis')

.controller("customerLandscapeInitUsergroupController", function ($scope, CustomService) {
	setTimeout(function () { CustomService.appInit(); }, 1000);
})

.controller('segmentDeepDiveController', function($scope, $rootScope, CustomService, chartsService, ChartOptionsService, DataService, DataConversionService, $location) {
	$scope.selectedGroup = [{"name":"All Users","key":"allusers","selected":false},{"name":"Office Goers","key":"officegoers","selected": false},{"name":"Teachers","key":"teachers","selected": false},
	                        {"name":"Musicians","key":"musicians","selected": false},{"name":"Creative Agencies","key":"creativeagencies", "selected": false},{"name":"Friends And Family","key":"friendsandfamily","selected": false}];
	$rootScope.selectedUserGroup = "allusers";
	function getSelectedGroupFromUrl(){
		var urlIndex = $location.search();
		if(urlIndex.currentlySelected){
			$.each($scope.selectedGroup, function(key, value){
				$scope.selectedGroup[key].selected= false;
				if($scope.selectedGroup[key].name == urlIndex.currentlySelected){
					$scope.selectedGroup[key].selected= true;
					$rootScope.selectedUserGroup = $scope.selectedGroup[key].key;
				}
			})
		}else{
			$scope.selectedGroup[0].selected= true;
		}
	}
	getSelectedGroupFromUrl();
})
.controller('overviewUsergroupController', function($scope, $rootScope, CustomService, chartsService, ChartOptionsService, DataService, DataConversionService) {
		
	 //Profile chart options
    var chartOptions;
    var chartData;
    
	$scope.deepdiveDataSuccess = function(result) {
		var deepdiveData = result.data;
		console.log("deepdiveData:", deepdiveData);
		//chart data and options for signup pie chart
		chartData = DataConversionService.getPieChartData(deepdiveData.overall.userTrend);
	    chartOptions = ChartOptionsService.getPieChart(chartData, "Paid VS Free", "", 300);
		chartOBJ = chartsService.donutChart.call($('#userPieChart'),chartOptions, $scope);
		
		$scope.overviewData = deepdiveData.overall.data;
		console.log("overviewData:", $scope.overviewData);
		
	}
	
	var requestData = {};
	function loadUsergroupDeepdiveData() {
		var func = $scope.deepdiveDataSuccess; 
		if (arguments[1]) { 
			if (arguments[1].key == cacheKey) { 
				func = null; 
			} else { 
				return false; 
			} 
		} 
		DataService.getSegmentDeepdiveData(requestData,$rootScope.selectedUserGroup, func, $scope.fail); 
	} 
	loadUsergroupDeepdiveData();
})

.controller('profileUsergroupController', function($scope, $rootScope, CustomService, chartsService, ChartOptionsService, DataConversionService, DataService) {
    
	 //Profile chart options
    var chartOptions;
    var chartData;
    
	$scope.deepdiveDataSuccess = function(result) {
		var deepdiveData = result.data;
		
		chartData = DataConversionService.getPieChartData(deepdiveData.productProfile.users);
	    chartOptions = ChartOptionsService.getPieChartLeftLegend(chartData, "Product Plan", "Percentage of users", 300);
		chartOBJ = chartsService.donutChart.call($('#userProfileTrend'),chartOptions, $scope);
		//chart data and options for signup pie chart
		chartData = DataConversionService.getPieChartData(deepdiveData.productProfile.revenueTrend);
	    chartOptions = ChartOptionsService.getPieChartLeftLegend(chartData, "Product Plan", "Percentage of revenue", 300);
		chartOBJ = chartsService.donutChart.call($('#revenueProfileTrend'),chartOptions, $scope);
		
		chartData = DataConversionService.getPieChartData(deepdiveData.demographicProfile.gender);
	    chartOptions = ChartOptionsService.getPieChartFixedLegend(chartData, "Gender", "Percentage of users", 300);
		chartOBJ = chartsService.donutChart.call($('#genderProfileChart'),chartOptions, $scope);
		//chart data and options for signup pie chart
		chartData = DataConversionService.getPieChartData(deepdiveData.demographicProfile.age);
	    chartOptions = ChartOptionsService.getPieChartFixedLegend(chartData, "Age distribution", "Percentage of total users", 300);
		chartOBJ = chartsService.donutChart.call($('#ageProfileChart'),chartOptions, $scope);
		//chart data and options for signup pie chart
		chartData = DataConversionService.getPieChartData(deepdiveData.demographicProfile.location);
	    chartOptions = ChartOptionsService.getPieChartFixedLegend(chartData, "Location", "Percentage of total users", 300);
		chartOBJ = chartsService.donutChart.call($('#locationProfileChart'),chartOptions, $scope);
		
		
	}
	
	var requestData = {};
	function loadUsergroupDeepdiveData() {
		var func = $scope.deepdiveDataSuccess; 
		if (arguments[1]) { 
			if (arguments[1].key == cacheKey) { 
				func = null; 
			} else { 
				return false; 
			} 
		} 
		DataService.getSegmentDeepdiveData(requestData,$rootScope.selectedUserGroup, func, $scope.fail); 

	} 
	loadUsergroupDeepdiveData();
	
})

.controller('engagmentUsergroupController', function($scope, $rootScope, CustomService, chartsService, ChartOptionsService, DataService, DataConversionService) {

	 //Profile chart options
   var chartOptions;
   var chartData;
   var chartDataObj = {};
   
	$scope.deepdiveDataSuccess = function(result) {
		var deepdiveData = result.data;
		
		chartData = DataConversionService.getHorizontalBarChartData(deepdiveData.productUsage.login);
		console.log("chartData login", chartData)
		chartOptions = ChartOptionsService.getLoginBarChart(chartData, "Logins", "Avg logins per week", 300);
		chartOBJ = chartsService.basicBar.call($('#loginUsageChart'),chartOptions, $scope);
		
		chartData = DataConversionService.getPieChartData(deepdiveData.productUsage.status);
	    chartOptions = ChartOptionsService.getProfilePieChart(chartData, "Profile Status", "Percentage of users", 300);
		chartOBJ = chartsService.donutChart.call($('#statusChart'),chartOptions, $scope);
		
		
		chartData = DataConversionService.getHorizontalBarChartData(deepdiveData.productUsage.loginDuration);
		console.log("chartData login duration", chartData)
		chartOptions = ChartOptionsService.getLoginBarChart(chartData, "Login Duration", "Avg time spend per login", 300);
		chartOBJ = chartsService.basicBar.call($('#loginDurationColEng'),chartOptions, $scope);
		
		chartData = DataConversionService.getHorizontalBarChartData(deepdiveData.productUsage.trendingFeatures);
	    chartOptions = ChartOptionsService.getTrendingBarChart(chartData, "Trending Features", "", 300, "#EE7E34");
		chartOBJ = chartsService.basicBar.call($('#trendActProChart'),chartOptions, $scope);
		
		chartData = DataConversionService.getHorizontalBarChartData(deepdiveData.productUsage.trendingActivities);
	    chartOptions = ChartOptionsService.getTrendingBarChart(chartData, "Trending Activities", "", 300, "#5F5F84");
		chartOBJ = chartsService.basicBar.call($('#trendSecProChart'),chartOptions, $scope);
		
		
	}
	
	var requestData = {};
	function loadUsergroupDeepdiveData() {
		var func = $scope.deepdiveDataSuccess; 
		if (arguments[1]) { 
			if (arguments[1].key == cacheKey) { 
				func = null; 
			} else { 
				return false; 
			} 
		} 
		DataService.getSegmentDeepdiveData(requestData,$rootScope.selectedUserGroup, func, $scope.fail); 

	} 
	loadUsergroupDeepdiveData();
	
})

.controller('engagmentBehaviourController', function($scope, $rootScope, CustomService, chartsService, ChartOptionsService, DataService, DataConversionService) {

	 //Profile chart options
  var chartOptions;
  var chartData;
  var chartDataObj = {};
  var deepdiveData;
  $scope.behaviourWidgets =[{"name":"activeUsersTrendRevenue","displayName":"Total Revenue","selected":true}, 
	                          {"name":"activeUsersTrendPaidusers","displayName":"Paid Users","selected":false},
							  {"name":"activeUsersTrendF2P","displayName":"Free to Paid Conversion","selected":false},
							  {"name":"activeUsersTrendEngagementScore","displayName":"Engagement Score","selected":false}];
  
	$scope.deepdiveDataSuccess = function(result) {
		deepdiveData = result.data;
		$scope.behaviourData = deepdiveData.engagementBehaviour.data;
		$scope.selectedBehaviour('activeUsersTrendRevenue');
		
	}
	$scope.selectedBehaviour = function(trendName){
		var displayName = "";
		$.each($scope.behaviourWidgets, function(key, value){
			value.selected = false;
			if(value.name == trendName){
				value.selected = true;
				displayName = value.displayName;
			}
		})
		chartData = DataConversionService.getHorizontalBarChartData(deepdiveData.engagementBehaviour[trendName]);
		var legendName = deepdiveData.engagementBehaviour[trendName].legend;
	    chartOptions = ChartOptionsService.analysisTrendLineChart(chartData, legendName, displayName, "", 300);
		chartOBJ = chartsService.areaChart.call($('#subsAreaChart'),chartOptions, $scope);
		
	}
	
	var requestData = {};
	function loadUsergroupDeepdiveData() {
		var func = $scope.deepdiveDataSuccess; 
		if (arguments[1]) { 
			if (arguments[1].key == cacheKey) { 
				func = null; 
			} else { 
				return false; 
			} 
		} 
		DataService.getSegmentDeepdiveData(requestData,$rootScope.selectedUserGroup, func, $scope.fail); 

	} 
	loadUsergroupDeepdiveData();
	
})

.controller('campaignCalenderController', function($scope, $rootScope, CustomService, chartsService, ChartOptionsService, DataService, DataConversionService, UtilitiesService) {
	
	$scope.options = UtilitiesService.getDataTableOptions();
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
	//Profile chart options
	var chartOptions;
	var chartData;
	var chartDataObj = {};
	var deepdiveData;
	$scope.deepdiveDataSuccess = function(result) {
		deepdiveData = result.data;
		$scope.addData(deepdiveData.campaignCalender.tableData);
	}

	$scope.addData = function(data) {
		$scope.dataLoaded = true;
		if (!data)
			throw "noDataError";
		try {
			$scope.error = false;
			$scope.options.aaData = [];
			console.log(data);
			$.each(data, function(key, obj) {
					$scope.options.aaData.push([obj.CampaignID, obj.userGroup,  obj.description, obj.targetUsers,
					                            obj.response, obj.Impact,  obj.startDate, obj.endDate]);
				})
		} catch (e) {
			$scope.fail(errorConstants.DATA_ERR);
		}
	};
	
	var requestData = {};
	function loadUsergroupDeepdiveData() {
		var func = $scope.deepdiveDataSuccess; 
		if (arguments[1]) { 
			if (arguments[1].key == cacheKey) { 
				func = null; 
			} else { 
				return false; 
			} 
		} 
		DataService.getSegmentDeepdiveData(requestData,$rootScope.selectedUserGroup,  func, $scope.fail); 

	} 
	loadUsergroupDeepdiveData();
})

.controller('customInsightsController', function($scope, $rootScope, CustomService, chartsService, ChartOptionsService, DataService, DataConversionService, UtilitiesService) {
	
	var deepdiveData;
	$scope.deepdiveDataSuccess = function(result) {
		deepdiveData = result.data;
		$scope.customPoints = deepdiveData.customInsights.data;
		console.log("$scope.customPoints:", $scope.customPoints);
	}

	
	var requestData = {};
	function loadUsergroupDeepdiveData() {
		var func = $scope.deepdiveDataSuccess; 
		if (arguments[1]) { 
			if (arguments[1].key == cacheKey) { 
				func = null; 
			} else { 
				return false; 
			} 
		} 
		DataService.getSegmentDeepdiveData(requestData,$rootScope.selectedUserGroup,  func, $scope.fail); 

	} 
	loadUsergroupDeepdiveData();
})