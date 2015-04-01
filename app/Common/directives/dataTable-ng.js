angular.module('AnalyticsApp')

.directive('myTable',[ '$compile','$timeout',function ($compile, $timeout) {
    console.log("in directive")
    return {
        restrict: 'E, A, C',
        replace: true,
        link: function (scope, element, attrs, controller) {
            var dataTable = element.dataTable(scope.options);
            scope.options = scope.options;
            scope.$watch('options.aaData', handleModelUpdates, true);
            
            //To compile after sorting in table
            $(element).on('click', 'th' ,function () {        
            	$timeout(function () { $compile(element.contents())(scope); }, 10);
            });
            //To compile table at pagination i.e., the user goes to the next page
            $(element).on('page.dt', function () {
                $timeout(function () { $compile(element.contents())(scope); }, 10);
            });

            function handleModelUpdates(newData) {
                scope.userData = scope.otherData;
                var data = newData || null;
                if (data) {
                    dataTable.fnClearTable();
                    dataTable.fnAddData(data);
                }
                $compile(element.contents())(scope);
            }
 
        },
        scope: {
            options: "=",
            tableData: '=',
            otherData: '='
        }
    };
}]);