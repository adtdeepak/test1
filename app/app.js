//
//This module contains all common Services lik Data service,
//Utilities, filters. This module will be injected in to 
//other modules.
//
angular.module('AnalyticsApp',['ngRoute', 'jmdobry.angular-cache'])
.controller('mainAppContent', function($scope, $rootScope, $angularCacheFactory, UtilitiesService, Permission, NetworkService){

	$scope.labelConstantsSuccess = function(labelConstants){
	    //Labels for clients
	    $scope.decisionWorkbenchTab = labelConstants.cig.tabName;
	    $scope.decisionWorkbenchHtmlName = labelConstants.cig.htmName;
	    //This will be used in home page
	    $scope.home_dw_text = labelConstants.home.cig;
	    $scope.home_track_text = labelConstants.home.track;
	    $scope.home_settings_text = labelConstants.home.settings;
	    
	    //Tracking
	    $scope.track_tab_name = labelConstants.track.tabName; 
	    $scope.trackingHtmlName = labelConstants.track.htmName;
	    
	    //Analysis
	    $scope.analysis_tab_name = labelConstants.analysis.tabName;
	    $scope.analysisHtmlname = labelConstants.analysis.htmName;  
	    
	    //This is used in index - button, filter - buttons
	    $scope.dw_index_tabText = labelConstants.cig.fn.tabName;
	    $scope.decisionOptionsText = labelConstants.cig.fn.label;
	    $scope.buildDOHeading = labelConstants.cig.bp.heading;
	    $scope.dw_builddo_reviewPanel_heading = labelConstants.cig.bp.reviewPanelHeading; 
	    $scope.dw_builddo_reviewPanel_tableHeadingCol_1 = labelConstants.cig.bp.reviewPanelTableHeadingCol_1;
	    $scope.dw_builddo_reviewPanel_tableHeadingCol_2 = labelConstants.cig.bp.reviewPanelTableHeadingCol_2;
	    $scope.dw_builddo_reviewPanel_button = labelConstants.cig.bp.reviewPanelBtn; 
	    $scope.dw_builddo_removeSelection_button = labelConstants.cig.bp.removeSelectionBtn;
	    $scope.buildDOText = labelConstants.cig.bp.label;
	    $scope.dw_reviewdo_tabText = labelConstants.cig.rp.tabName;
	    $scope.dw_reviewdo_heading = labelConstants.cig.rp.heading;
	    $scope.reviewDOText = labelConstants.cig.rp.label;
	    $scope.reviewDO_table_heading = labelConstants.cig.rp.tableHeading;
	    $scope.reviewDOAcronym = labelConstants.cig.rp.acronymLabel; 
	    $scope.reviewDOAcronymText = labelConstants.cig.rp.acronym; 
	}
	
	//Exporting to pdf
	$scope.pdfExport = function(){
		 var pdf = new jsPDF('p', 'pt', 'letter');
		 pdf.addHTML($('.mainContainer')[0], function () {
		     pdf.save('Test.pdf');
		 });

	}
	var labelConstants = {};
	var reqData = {};
	NetworkService.post("http://jsonstub.com/labels", reqData, $scope).then(function(result){
		$scope.labelConstantsSuccess(result);
	}).catch(function(e){
				UtilitiesService.throwError($scope,e);
	});
	//Synchronously loading the Constants file from server
	//Request file based on tenant ID (params) set on the current domain.
	//If userName is in local Storage
	if(localStorage.getItem('userName')){
		//This will be the username
		$scope.userName = localStorage.getItem('userName');
	};
	var params = "";
	var url = "js/config.js" + params;
	$.ajax({
		async:false,
		type:'GET',
		url:"js/config.js",
		dataType:'script',
		error: function() {
			console.log('Error Loading Constants!!', arguments);
		}
	});
	
	//Tenant Management configured key/value
	
	$scope.Constants = window.appConstants;
	
	//Tooltip Constant for Funnel
	
	$scope.Tooltip = window.appTooltipConstants;
	
	//Tenant Theme selection
	//Webservice call to get the theme name for tenant
	//Here hardcoded theme name as "red".
	
	$('<link/>', {
	   rel: 'stylesheet',
	   type: 'text/css',
	   //href: 'css/themes/red.css'
	}).appendTo('head');
	
	UtilitiesService.initStorage();
	
	//To show the selected section in segment landscape page
	$scope.selectedDiv = "";
	//Resizing the window
	$scope.resizeWindow = function(selectedDiv){
		if(selectedDiv)
			$scope.selectedDiv = selectedDiv;
		setTimeout(function(){$(window).trigger('resize');}, 500);
		
	}

	/*-------------------Permissions Starts Here-------------------*/
	$scope.isHomePageVisible = true;
	//-----Tracking Module
	//Summary
	$scope.isFunnelViewable = Permission.canViewTrackFunnel();
	$scope.isTrendViewable = Permission.canViewTrackTrend();
	//Business Impact
	$scope.isBusinessImpactViewable = Permission.canViewTrackBusinessImpact();
	//Engagement Metrics
	$scope.isEngagementMetricsViewable = Permission.canViewTrackEngagementMetrics();
	//User Group Engagement
	$scope.isUserGroupViewable =  Permission.canViewUserGroup();
	
	//-----Decision Workbench Module
	//Set Goals
	$scope.isSetGoalsEditable = Permission.canEditSetGoals();
	//Review DO
	$scope.isReviewDOViewable = Permission.canViewReviewDO();
	$scope.isDOCostEditable = Permission.canEditDOCost();
	$scope.isDOResponsibilityEditable = Permission.canEditDOResponsibility();
	
	//-----Settings Module
	//Data Sync Page
	$scope.isDataSyncViewable = Permission.canDataSyncViewable();
	//Channels Page
	$scope.isChannelsViewable = Permission.canChannelsViewable();
	$scope.isChannelsEditable = Permission.canChannelsEditable();
	//Models page
	$scope.isModelsViewable = Permission.canModelsViewable();
	$scope.isModelsEditable = Permission.canModelsEditable();
	//Goals page
	$scope.isGoalsViewable = Permission.canGoalsViewable();
	$scope.isGoalsEditable = Permission.canGoalsEditable();
	//Users page
	$scope.isUsersViewable = Permission.canUsersViewable();
	$scope.isUsersEditable = Permission.canUsersEditable();
	//Audit Trail page
	$scope.isAuditTrailViewable = Permission.canAuditTrailViewable();
	$scope.isAuditTrailEditable = Permission.canAuditTrailEditable();
	
	
	/*-------------------Permissions Ends Here---------------------*/
	
	/*--------------------Tab visibility starts here-----------------*/
	//For Tracking Module
	$scope.isBusinessImpactTabVisible = Permission.canViewTrackBusinessImpact();
	$scope.isEngagementTabVisible = Permission.canViewTrackEngagementMetrics();
	$scope.isUserGroupTabVisible = Permission.canViewUserGroup();

	//For Decision Workbench Module
	$scope.isDecisionWorkbenchTabVisible = !(!$scope.isSetGoalsEditable && !$scope.isReviewDOViewable);
	
	//-----Settings Module
	$scope.isSettingsTabVisible = !(!$scope.isDataSyncViewable && !$scope.isChannelsViewable && !$scope.isModelsViewable && !$scope.isGoalsViewable && !$scope.isUsersViewable && !$scope.isAuditTrailViewable);
	
	/*--------------------Tab visibility ends here-----------------*/
	
})
.controller("navLinkController",function($rootScope, $scope, DataService, $location, Permission){
	$rootScope.$on('$routeChangeSuccess', function(evt, cur, prev) {
		$scope.thisPage = $location.path();
	});
})

.controller("navigationController",function($scope){
	var locationUrl = location.href;
	$scope.mainHtml = location.href.split("/")[4].split(".")[0];
	console.log($scope.mainHtml);
	console.log("locationUrl:", location.href.split("/")[4].split(".")[0]);
	
});

angular.module('Home',['ngRoute', 'AnalyticsApp','highcharts-ng'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/:page', {
		templateUrl: function(params){ return 'app/Home/' + params.page + '.htm';}
	}).otherwise({
        redirectTo: '/login'
    });
}]);

angular.module('DecisionWorkbench',['ngRoute', 'AnalyticsApp', 'ngDragDrop'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/:page', {
		templateUrl: function(params){ return 'app/DecisionWorkbench/' + params.page + '.htm';}
	}).otherwise({
        redirectTo: '/index'
    });
}]);

angular.module('Tracking',['ngRoute', 'AnalyticsApp'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/:page', {
		templateUrl: function(params){ return 'app/Tracking/' + params.page + '.htm';}
	}).otherwise({
        redirectTo: '/summary'
    });
}]);

angular.module('Analysis',['ngRoute', 'AnalyticsApp'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/:page', {
		templateUrl: function(params){ return 'app/Analysis/' + params.page + '.htm';}
	}).otherwise({
        redirectTo: '/segment-overview'
    });
}]);


angular.module('Settings',['ngRoute','AnalyticsApp','ngTreetable','blueimp.fileupload','taiPlaceholder'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/:page', {
		templateUrl: function(params){ return 'app/Settings/' + params.page + '.htm';}
	}).otherwise({
		redirectTo: '/dataSync'
	})
}]);


//Factory - returns data
//Service - returns functions/objects
//directives - functions to modify or interact with DOM