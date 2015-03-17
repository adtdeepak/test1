angular.module('AnalyticsApp')

.controller("commonController", ['$scope','$rootScope','$location','$window','UtilitiesService',
                                 function ($scope, $rootScope, $location, $window, UtilitiesService) {
	
	// code for 401 and unauthorised entry
	if(!localStorage.getItem('token') || !localStorage.getItem('permissionList')) {
		UtilitiesService.unauthorisedRedirect(location);
	}
    window.requestStack = {};
    
    //Getting the time of session timeout
    var idleTimeout = window.appConstants.IDLE_TIMEOUT * 60 * 1000;
	var date = new Date();
	$scope.sessionEndTime = date.getTime() + idleTimeout;
	
	//Watching each time the page loads
	$scope.$on('$routeChangeStart', function(){
		//Here the page loads
		var date = new Date();
		var milliSeconds = date.getTime();
		if(milliSeconds > $scope.sessionEndTime){
			//Redirecting to login page when session is timed out
			UtilitiesService.unauthorisedRedirect(location);
		}
		//Incrementing the sessionEndTime as the user is not idle - session timeout should be done only if user is idle
		$scope.sessionEndTime = date.getTime() + idleTimeout;
	});
	
    $scope.periods = window.appConstants.TIME_PERIODS;
    $scope.selected = $scope.periods[0];
    $rootScope.selectedUserMode = window.appConstants.DEFAULT_USER_MODE;
    // This selectedPeriod will be used across the app
    $rootScope.selectedPeriod = $scope.selected.key;
    // default selected date as current date
    var defaultDate = new Date();
    defaultDate = moment(defaultDate).format('MM/DD/YYYY')
    //$rootScope.selectedDate = defaultDate; 
    $rootScope.selectedDate = "04/24/2014"; 
	// broadcast periodChange when filter is clicked
	$scope.broadcastTimeFilterValues = function() {
		$rootScope.selectedPeriod = $scope.selected.key;
		$rootScope.selectedDate = $scope.selectedDate;
		$rootScope.$broadcast('periodChange');
	}
	
    $scope.userModeSelected = function (selectedUserMode) {
        angular.element('.freeMode').each(function () {
            if (angular.element(this).parent().hasClass('active')) {
                angular.element(this).parent().removeClass('active');
            } else {
                angular.element(this).parent().addClass('active');
            }
        });
        $rootScope.selectedUserMode = selectedUserMode;
        $rootScope.$broadcast('periodChange');
    }

    //Watching the page load in decision workbench pages
    $rootScope.$on('DWPageChange', function (event, period) {
        setTabsEnable();
    });

    //Function for setting the free trail/ freemium tabs enable or disable
    var setTabsEnable = function () {
        $scope.urlIndex = $location.search();
        if ($scope.urlIndex.flow == "false") {
            $scope.enable = false;
        } else {
            $scope.enable = true;
        }
    }
    setTabsEnable();
}]);
