angular.module('AnalyticsApp')

.directive('a', function () {
    return {
        restrict: 'E',
        link: function (scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function (e) {
                    e.preventDefault();
                });
            }
        }
    };
})

.directive('ngDynBindModel', function ($compile) {
    return {
        compile: function (tEl, tAtr) {
            tEl[0].removeAttribute('ng-dyn-bind-model')
            return function (scope) {
                tEl[0].setAttribute('ng-model', tAtr.ngDynBindModel)
                $compile(tEl[0])(scope)
            }
        }
    }
})

.directive("selectMultiple", function($compile) {
	
	return {
		restrict : 'A',
		scope : {
			values : "=values",
			heading: "@heading"
		},
		template : 	'<h2 class="fieldHeading">{{heading}}</h2>'+
					'<div class="ui-controlgroup-controls">'+
						'<div class="ui-checkbox" ng-repeat="value in values">'+
						'	<label for=\'{{value[entityName+"Id"]}}\'><input type="checkbox"  id=\'{{value[entityName+"Id"]}}\' class="custom" ng-model="values[$index].selected" ><span>{{value[entityName+"Name"]}}</span></label>'+
						'</div>'+
					'</div>',
		link : function(scope, elem, attrs) {
			scope.entityName = attrs.values.split('List')[0];
			elem.find('.ui-controlgroup-controls').mCustomScrollbar()
			$compile(elem.contents())(scope);
			
		}
	}
})

