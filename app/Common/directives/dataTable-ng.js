angular.module('AnalyticsApp')

.directive('myTable', function ($compile, $timeout, $location) {
    console.log("in directive")
    return {
        restrict: 'E, A, C',
        replace: true,
        link: function (scope, element, attrs, controller) {
        	var accordion = [];
        	var dataTable = element.dataTable(scope.options);
        	var tableObj = $(element).DataTable();
            scope.options = scope.options;
            scope.$watch('options.aaData', handleModelUpdates, true);
            $(element).on('page.dt', function () {
                $timeout(function () { $compile(element.contents())(scope); }, 10);
            });

            $('.dataTableContainer').on('click', 'td.details-control', function () {
            	
                var tr = $(this).closest('tr');
                var row = tableObj.row( tr );
                if ( row.child.isShown() ) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                }
                else {
                    // Open this row
                	var rowCount = $('.accordionTable').find('tr[role="row"]').index($(this).closest('tr'))-1;
                    row.child(format(scope.otherData[rowCount])).show();
                    tr.addClass('shown');
                }
            } );
            
            $('.dataTableContainer').on('click', 'td.each-row-details', function () {
            	scope.tableData($(this).attr('attr'));
            });
            
            var previous = "";var previousRow = -1;var previousRowCollapse="";
            $('.dataTableContainer').on('click', 'td.row-expand-details', function () {
            	$(this).find('.xclose').addClass("expandclose");
            	if(previousRowCollapse){
            		previousRowCollapse.find('.xclose').removeClass("expandclose");
            	}
                var tr = $(this).closest('tr');
                var row = tableObj.row( tr );
                var currentRow = row[0][0];;
                previousRowCollapse = $(this);
                if(previous){
                	previous.child.hide();
                }
                if(previousRow != currentRow){
              	  if ( row.child.isShown() ) {
                      // This row is already open - close it
                      row.child.hide();
                      tr.removeClass('shown');
                  }
                  else {
                      // Open this row
                    var rowCount = $('.accordionTable1').find('tr[role="row"]').index($(this).closest('tr'))-1;
                    row.child(formatHtml()).show();
                    scope.tableData();
                    tr.addClass('shown');
                    previousRow = currentRow;
                  }
                }else{
                	previousRow = -1;
                	previousRowCollapse="";
                }
                previous = row
              
            });
            
            function handleModelUpdates(newData) {
                scope.userData = scope.otherData;
                var data = newData || null;
                if (data) {
                    dataTable.fnClearTable();
                    dataTable.fnAddData(data);
                }
                $timeout(function () { $compile(element.contents())(scope); }, 100);
            }
            $compile(element.contents())(scope);
            function format ( data ) {
            	console.log('FORMAT',data)
        		// `d` is the original data object for the row
        		return '<div class="tableAccOuterContainer">'+
        		'<div class="tableAccInnerContainer">'+
        		'<h3>'+
        		'Campaign Highlights'+
        		'</h3>'+
        		'<div class="container">'+
        		'<div class="col">'+
        		'<h4>Users Covered</h4>'+
        		'<span>'+data.usersTargetted+'</span>'+
        		'<h4>Message</h4>'+
        		'<ul>'+
        		'<li ng-repeat="data in data">'+data.targetconvList+'</li>'+
        		'</ul>'+
        		'</div>'+
        		'<div class="col">'+
        		'<h4>Launch By</h4>'+
        		'<span>Active for 30 days</span>'+
        		'<h4>Region</h4>'+
        		'<span>'+data.regions+'</span>'+
        		'</div>'+
        		'<div class="clearfix"></div>'+
        		'</div>'+
        		'</div>'+
        		'<div class="tableAccInnerContainer">'+
        		'</div>'+
        		'<div class="tableAccInnerContainer">'+
        		'<h3>'+
        		'Expected Outcomes'+
        		'</h3>'+
        		'<div class="container">'+
        		'<div class="col centered">'+
        		'<h4>'+data.expectedNewSub+'</h4>'+
        		'<span>New Paid Users</span>'+
        		'<h4>+'+data.convUplift.value+'</h4>'+
        		'<span>Conversion Uplift</span>'+
        		'</div>'+
        		'<div class="clearfix"></div>'+
        		'</div>'+
        		'</div>'+
        		'</div>';

        	}
            
            function formatHtml() {
        		// `d` is the original data object for the row
        		return '<div class="tableAccOuterContainer">'+
        		'<div class="row nopadding">'+
    			'<div class="heading-overview">'+'Incremental Impact'+'</div>'+
    			'<div class="row brdr-dashed">'+
    				'<div class="col-sm-4 col-md-4 col-lg-4">'+
    					'<div class="acqChart conversionChart">'+'</div>'+
    				'</div>'+
    				'<div class="col-sm-4 col-md-4 col-lg-4">'+
    					'<div class="acqChart convertedUserChart">'+'</div>'+
    				'</div>'+
    				'<div class="col-sm-4 col-md-4 col-lg-4">'+
    					'<div class="acqChart revenueChart">'+'</div>'+
    				'</div>'+
    			'</div>'+
    			'<div class="heading-overview">'+'Description of user group'+'</div>'+
    			'<div class="row brdr-dashed">'+
    				'<div class="row nopadding">'+'</div>'+
    					'<div class="half-width">'+
    						'<div class="col-sm-4 col-md-4 col-lg-4">'+
    							'<div class="icon-widget all-user-image">'+'</div>'+
    							'<div class="text-bold" style="text-align:center;">'+'678,457'+'</div>'+
    							'<div class="icon-widget-text text-bold bkgd-none">'+'Young Job Hoppers'+'</div>'+
    						'</div>'+
    						'<div class="col-sm-4 col-md-4 col-lg-4">'+
    							'<div class="icon-widget" style="padding-top:30px;">'+
    								'<div class="text-bold" style="text-align:center;padding-top:5px;">'+'65% Male'+'</div>'+
    								'<div class="text-bold" style="text-align:center;padding-top:5px;">'+'35% Female'+'</div>'+
    							'</div>'+
    							'<div class="text-bold" style="text-align:center;">'+'Active users 40%'+'</div>'+
    							'<div class="icon-widget-text text-bold bkgd-none">'+'</div>'+
    						'</div>'+
    						'<div class="col-sm-4 col-md-4 col-lg-4">'+
    							'<div class="icon-widget">'+'</div>'+
    							'<div class="text-bold" style="text-align:center;">'+'257,645'+'</div>'+
    							'<div class="text-bold" style="text-align:center;">'+'App users 40%'+'</div>'+
    							'<div class="icon-widget-text text-bold bkgd-none">'+'</div>'+
    						'</div>'+
    					'</div>'+
    					'<div class="half-width">'+
    						'<div class="col-sm-12 col-md-12 col-lg-12">'+
    							'<div class="acqChart monthBarChart">'+'</div>'+
    						'</div>'+
    					'</div>'+
    				'<div class="row nopadding">'+
    					'<div class="col-sm-12 col-md-12 col-lg-12">'+
    						'<div class="acqChart engagementChart">'+'</div>'+
    					'</div>'+
    				'</div>'+
    			'</div>'+
    			'<div class="heading-overview">'+'Activity Engagement'+'</div>'+
    			'<div id="demo">'+
    				'<div id="example">'+'</div>'+
    			'</div>'+
    		'</div>'+
    	'</div>'
        	};
           /* $timeout(function () { $compile(element.contents())(scope); }, 100);*/
        },
        scope: {
            options: "=",
            tableData: '=',
            otherData: '='
        }
    };
})

.controller('highController', function($scope){
	console.log("highController")
})