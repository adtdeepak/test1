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
            $('.dataTableContainer').off('click').on('click', 'td .wishlist-unselected', function (e) {
            	e.stopPropagation();
            	var selected = "yes";
            	if($(this).hasClass('wishlist-selected')){
            		selected = "no";
            	}
            	scope.wishlistData($(this).parent().attr('attr'), selected);
            	$(this).toggleClass('wishlist-selected');
            	});
            
            $('.dataTableContainer').on('click', 'td .execute-unselected', function (e) {
            	e.stopPropagation();
            	var selected = "yes";
            	if($(this).hasClass('execute-selected')){
            		selected = "no";
            	}
            	scope.executeData($(this).parent().attr('attr'), selected);
            	$(this).toggleClass('execute-selected');
            	});
            
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
                    //var rowCount = $('.accordionTable1').find('tr[role="row"]').index($(this).closest('tr'))-1;
                    row.child(formatHtml()).show();
                    $compile(element.contents())(scope);
                    if($(this).attr('attr')){
                        scope.functionCall($(this).attr('attr'));
                    }
                    scope.tableData();
                    tr.addClass('shown');
                    previousRow = currentRow;
                  }
                }else{
                	previousRow = -1;
                	previousRowCollapse="";
                }
                previous = row;
                
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
    			'<div style="margin-left:15px;" class="heading-overview">'+'Incremental Impact'+'</div>'+
                   '<div style="border-bottom:1px dotted #666; padding-bottom: 25px;" class="half-width">'+
				'<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">'+
					'<div style="border:1px solid  #555; " class="brdr-left ">'+
						'<div class="">'+
							'<div class="panel-heading " style="font-weight:600; text-align:center; background:#555 none repeat scroll 0 0; color: #fff;padding:5px; margin-bottom:10px;">'+'Total User'+'</div>'+
						'</div>'+
						'<div  style="padding:20px !important;" class="widget-content metric-widgets">'+
							'<div class="row-fluid">'+
								'<div class="actual-value">'+'<span  style="color: #555; ">'+'9 Million'+'</span>'+'</div>'+
							'</div>'+							
						'</div>'+
					'</div>'+
				'</div>'+
				'<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">'+
					'<div style="border:1px solid  #adadad;" class="brdr-left ">'+
						'<div class="">'+
							'<div class="panel-heading" style="font-weight:600; text-align:center; background:#adadad none repeat scroll 0 0; color: #fff;padding:5px; margin-bottom:10px;">'+'Total User'+'</div>'+
						'</div>'+
						'<div  style="padding:20px !important;" class="widget-content metric-widgets">'+
							'<div class="row-fluid">'+
								'<div class="actual-value">'+'<span  style="color: #adadad;">'+'9 Million'+'</span>'+'</div>'+
							'</div>'+							
						'</div>'+
					'</div>'+
				'</div>'+
				'</div>'+
                     '<div  style="border-bottom:1px dotted #666; padding-bottom: 25px;" class="half-width">'+
				'<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">'+
					'<div style="border:1px solid  #555;" class="brdr-left ">'+
						'<div class="">'+
							'<div class="panel-heading" style="font-weight:600; text-align:center; background:#555 none repeat scroll 0 0; color: #fff;padding:5px; margin-bottom:10px;">'+'Total User'+'</div>'+
						'</div>'+
						'<div  style="padding:20px !important;" class="widget-content metric-widgets">'+
							'<div class="row-fluid">'+
								'<div class="actual-value">'+'<span  style="color: #555;">'+'9 Million'+'</span>'+'</div>'+
							'</div>'+							
						'</div>'+
					'</div>'+
				'</div>'+
				'<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">'+
					'<div style="border:1px solid  #adadad; " class="brdr-left ">'+
						'<div class="">'+
							'<div class="panel-heading" style="font-weight:600; text-align:center; background:#adadad none repeat scroll 0 0; color: #fff;padding:5px; margin-bottom:10px;">'+'Total User'+'</div>'+
						'</div>'+
						'<div  style="padding:20px !important;" class="widget-content metric-widgets">'+
							'<div class="row-fluid">'+
								'<div class="actual-value">'+'<span  style="color: #adadad;">'+'9 Million'+'</span>'+'</div>'+
							'</div>'+							
						'</div>'+
					'</div>'+
				'</div>'+
				'</div>'+
    			
    			'<div style="margin-left:15px; float:left; margin-top:20px;" class="heading-overview">'+'Description of user group'+'</div>'+
    			'<div class="row brdr-dashed">'+
    				'<div class="row nopadding">'+'</div>'+
    					'<div class="half-width">'+
    						'<div style="border: 1px solid #555;   margin: 22px 15px 0; padding: 0; "  class="col-sm-4 col-md-4 col-lg-4-1">'+
                    '<div class="panel-heading" style="font-weight:600; text-align:center; background:#555 none repeat scroll 0 0; color: #fff;padding:5px; margin-bottom:10px;">'+'Total User'+'</div>'+
    							'<div class="icon-widget all-user-image">'+'</div>'+
    							'<div class="text-bold" style="text-align:center;">'+'678,457'+'</div>'+
    							'<div class="icon-widget-text text-bold bkgd-none">'+'Young Job Hoppers'+'</div>'+
    						'</div>'+
    						'<div style="border: 1px solid #a5a5a5;   margin: 22px 8px 0; padding: 0; "  class="col-sm-4 col-md-4 col-lg-4-1">'+'<div class="panel-heading" style="font-weight:600; text-align:center; background:#a5a5a5 none repeat scroll 0 0; color: #fff;padding:5px; margin-bottom:10px;">'+'Total User'+'</div>'+
    							'<div class="icon-widget" style="padding-top:30px;">'+
    								'<div class="text-bold" style="text-align:center;padding-top:5px;">'+'65% Male'+'</div>'+
    								'<div class="text-bold" style="text-align:center;padding-top:5px;">'+'35% Female'+'</div>'+
    							'</div>'+
    							'<div class="text-bold" style="text-align:center;">'+'Active users 40%'+'</div>'+
    							'<div class="icon-widget-text text-bold bkgd-none">'+'</div>'+
    						'</div>'+
    						'<div style="border: 1px solid #555;   margin: 22px 8px 0; padding: 0; "  class="col-sm-4 col-md-4 col-lg-4-1">'+
                    '<div class="panel-heading" style="font-weight:600; text-align:center; background:#555 none repeat scroll 0 0; color: #fff;padding:5px; margin-bottom:10px;">'+'Total User'+'</div>'+
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
    						'<div style="display:none;" class="acqChart engagementChart">'+'</div>'+
    					'</div>'+
    				'</div>'+
    			'</div>'+
                    
    			'<div style="margin-left:15px; float:left; margin-top:20px;" class="heading-overview">'+'Description of Product usage'+'</div>'+
    			'<div id="demo">'+
                    '<div style="float:left; padding:0px 15px;">'+
                    '<table class="table border smSubsTable noMarginBtm">'+
					'<colgroup>'+
						'<col width="25%">'+
						'<col width="25%">'+
						'<col width="25%">'+
						'<col width="25%">'+						
					'</colgroup>'+
					'<thead class="dark-gray-table">'+
				      '<tr>'+
				        '<th class="dark-gray">S.No</th>'+
				        '<th class="dark-gray">User Group</th>'+
				        '<th class="dark-gray">Campaign Description</th>'+
                        '<th class="dark-gray">Target users</th>'+
                        '</tr>'+
				    '</thead>'+
					'<tbody>'+
						'<tr class="gray-table-row">'+
							'<td>1</td>'+
							'<td>Job Hobbers<br>ES between 0-35%</td>'+
							'<td>Nurturing (connecting with)</td>'+
							'<td>Increase engagement by 3%<br>New user to basic user</td>'+
							'</tr>'+
						'<tr class="gray-dark-table-row">'+
							'<td>2</td>'+
							'<td>Job Hobbers<br>ES between 0-35%</td>'+
							'<td>Nurturing (connecting with)</td>'+
							'<td>Increase engagement by 3%<br>New user to basic user</td>'+
							'</tr>'+
                    '<tr class="gray-table-row">'+
							'<td>1</td>'+
							'<td>Job Hobbers<br>ES between 0-35%</td>'+
							'<td>Nurturing (connecting with)</td>'+
							'<td>Increase engagement by 3%<br>New user to basic user</td>'+
							'</tr>'+
						'<tr class="gray-dark-table-row">'+
							'<td>2</td>'+
							'<td>Job Hobbers<br>ES between 0-35%</td>'+
							'<td>Nurturing (connecting with)</td>'+
							'<td>Increase engagement by 3%<br>New user to basic user</td>'+
							'</tr>'+
                  		
						
					'</tbody>'+
				'</table>'+
                        '</div>'+
    				
    			'</div>'+
                   
                    '<div class="half-width">'+
                     '<div style="margin-left:15px; float:left; margin-top:20px; width:100%;" class="heading-overview">'+'On-Going Campaign'+'</div>'+
    						'<div class="col-sm-12 col-md-12 col-lg-12">'+
                     '<div style="float:left;">'+
                    '<table class="table border smSubsTable noMarginBtm">'+
					'<colgroup>'+
						'<col width="25%">'+
						'<col width="25%">'+
						'<col width="25%">'+
						'<col width="25%">'+						
					'</colgroup>'+
					'<thead class="dark-gray-table">'+
				      '<tr>'+
				        '<th>S.No</th>'+
				        '<th>User Group</th>'+
				        '<th>Campaign Description</th>'+
                        '<th>Target users</th>'+
                        '</tr>'+
				    '</thead>'+
					'<tbody>'+
						'<tr class="gray-table-row">'+
							'<td>1</td>'+
							'<td>Job Hobbers<br>ES between 0-35%</td>'+
							'<td>Nurturing (connecting with)</td>'+
							'<td>Increase engagement by 3%<br>New user to basic user</td>'+
							'</tr>'+
						'<tr class="gray-dark-table-row">'+
							'<td>2</td>'+
							'<td>Job Hobbers<br>ES between 0-35%</td>'+
							'<td>Nurturing (connecting with)</td>'+
							'<td>Increase engagement by 3%<br>New user to basic user</td>'+
							'</tr>'+
                   
						
					'</tbody>'+
				'</table>'+
                        '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="half-width">'+
                       '<div style="margin-left:15px; float:left; margin-top:20px; width:100%;" class="heading-overview">'+'Past Campaign'+'</div>'+
    			
    						'<div class="col-sm-12 col-md-12 col-lg-12">'+
                     '<div style="float:left;">'+
                    '<table class="table border smSubsTable noMarginBtm">'+
					'<colgroup>'+
						'<col width="25%">'+
						'<col width="25%">'+
						'<col width="25%">'+
						'<col width="25%">'+						
					'</colgroup>'+
					'<thead class="dark-gray-table">'+
				      '<tr>'+
				        '<th>S.No</th>'+
				        '<th>User Group</th>'+
				        '<th>Campaign Description</th>'+
                        '<th>Target users</th>'+
                        '</tr>'+
				    '</thead>'+
					'<tbody>'+
						'<tr class="gray-table-row">'+
							'<td>1</td>'+
							'<td>Job Hobbers<br>ES between 0-35%</td>'+
							'<td>Nurturing (connecting with)</td>'+
							'<td>Increase engagement by 3%<br>New user to basic user</td>'+
							'</tr>'+
						'<tr class="gray-dark-table-row">'+
							'<td>2</td>'+
							'<td>Job Hobbers<br>ES between 0-35%</td>'+
							'<td>Nurturing (connecting with)</td>'+
							'<td>Increase engagement by 3%<br>New user to basic user</td>'+
							'</tr>'+
                  
                  		
						
					'</tbody>'+
				'</table>'+
                        '</div>'+
                    '</div>'+
                    '</div>'+
    		'</div>'+
    	'</div>'
                
        	};
          /* $timeout(function () { $compile(element.contents())(scope); }, 100);*/
        },
        scope: {
            options: "=",
            tableData: '=',
            otherData: '=',
            functionCall:'=',
            wishlistData:'=',
            executeData:'='
        }
    };
})

.controller('highController', function($scope){
	console.log("highController")
})