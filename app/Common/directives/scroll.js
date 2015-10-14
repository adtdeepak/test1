angular.module("AnalyticsApp")

.directive("scroll", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
        	window.temp = this;
             if (this.pageYOffset >= 100) {
                 scope.scrolledDown = true;
             } else {
                 scope.scrolledDown = false;
             }
            scope.$apply();
        });
    };
});


