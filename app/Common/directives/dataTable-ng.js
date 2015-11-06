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
            });
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
            	console.log("$(this)", $(this))
            	e.stopPropagation();
            	var selected = "yes";
            	if($(this).hasClass('execute-selected')){
            		selected = "no";
            	}
            	scope.executeData($(this).closest('td').attr('attr'), selected);
            	$(this).toggleClass('execute-selected');
            	});
            
            $('.dataTableContainer').on('click', 'td.each-row-details', function () {
            	scope.tableData($(this).attr('attr'));
            });
            
            var previous = "";var previousRow = -1;var previousRowCollapse="";var previousThis = "";
            $('.dataTableContainer').on('click', 'td.row-expand-details', function (event) {
            	console.log("check open occured")
            	  event.stopImmediatePropagation();
                var tr = $(this).closest('tr');
                var row = tableObj.row( tr );
                var currentRow = row[0][0];;
               /* if(previous){
                	console.log("closeprevious")
                	previous.child.hide();
                }
                console.log("check row", row)
                previous = row;*/
              	  if (row.child.isShown() ) {
              		console.log("check close")
                      // This row is already open - close it
                      row.child.hide();
                      tr.removeClass('shown');
                  }
                  else {
                	  if(previous){
                      	console.log("closeprevious");
                      	previous.child.hide();
                      	previousThis.closest('tr').removeClass('shown');
                      }
                      previous = row;
                      previousThis = $(this);
                    	  console.log("check open")
                          // Open this row
                        var rowCount = $('.campaign-overview-details').find('tr[role="row"]').index($(this).closest('tr'))-1;
                    	console.log("scope:", scope.otherData['All Users'][$(this).attr('attr')])
                        row.child(formatHtml(scope.otherData['All Users'][$(this).attr('attr')])).show();
                    	console.log("scope.otherData['All Users'][$(this).attr('attr')]):", scope.otherData['All Users'][$(this).attr('attr')]);
                        $compile(element.contents())(scope);
                        if($(this).attr('attr')){
                            scope.functionCall($(this).attr('attr'));
                        }
                        scope.tableData();
                        tr.addClass('shown');
                        previousRow = currentRow;
                  }
            });
            
            //This will be executed only once - to open the selected accordian only.
            $('.dataTableContainer').one('openSelectedAccordian', '.expandRow td.row-expand-details', function (event) {
            	event.stopImmediatePropagation();
            	var tr = $(this).closest('tr');
            	var row = tableObj.row( tr );
            	previous = row;
                previousThis = $(this);
            	// Open this row
            	row.child(formatHtml(scope.otherData['All Users'][$(this).attr('attr')])).show();
            	$compile(element.contents())(scope);
            	if($(this).attr('attr')){
            		scope.functionCall($(this).attr('attr'));
            	}
            	scope.tableData();
            	tr.addClass('shown');
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
            
            function formatHtml(data) {
        		// `d` is the original data object for the row
        		return '<div class="tableAccOuterContainer">'+
        		'<div class="row nopadding">'+
    			'<div style=" border-bottom: 3px double #666;  font-size: 16px; margin: 0 15px;" class="heading-overview">'+'Incremental Impact'+'</div>'+
                    '<div style="float:left; width:100%;">'+
                   '<div style=" padding-bottom: 25px;" class="half-width">'+
                    '<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">'+
					'<div style="border:1px solid  #adadad; " class="brdr-left ">'+
						'<div class="">'+
							'<div class="panel-heading" style="font-weight:600; text-align:center; background:#adadad none repeat scroll 0 0; color: #fff;padding:5px; margin-bottom:10px;">'+'Revenue'+'</div>'+
						'</div>'+
						'<div  style="padding:20px !important;" class="widget-content metric-widgets">'+
							'<div class="row-fluid">'+
								'<div style="background-position:25px" class="actual-value upArrow">'+'<span  style="color: #adadad;">$'+data.userGroup.incrementalImpact[0].revenue+'</span>'+'</div>'+
							'</div>'+							
						'</div>'+
					'</div>'+
				'</div>'+
                    
                    '<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">'+
					'<div style="border:1px solid  #555;" class="brdr-left ">'+
						'<div class="">'+
							'<div class="panel-heading" style="font-weight:600; text-align:center; background:#555 none repeat scroll 0 0; color: #fff;padding:5px; margin-bottom:10px;">'+'New Users Converted'+'</div>'+
						'</div>'+
						'<div  style="padding:20px !important;" class="widget-content metric-widgets">'+
							'<div class="row-fluid">'+
								'<div class="actual-value">'+'<span  style="color: #555;">'+data.userGroup.incrementalImpact[0].paidUsers+'</span>'+'</div>'+
							'</div>'+							
						'</div>'+
					'</div>'+
				'</div>'+
				                   
				'</div>'+
                    
                     '<div  style=" padding-bottom: 25px;" class="half-width">'+
                    '<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">'+
					'<div style="border:1px solid  #adadad; " class="brdr-left ">'+
						'<div class="">'+
							'<div class="panel-heading " style="font-weight:600; text-align:center; background:#adadad none repeat scroll 0 0; color: #fff;padding:5px; margin-bottom:10px;">'+'Conversion Percentage'+'</div>'+
						'</div>'+
						'<div  style="padding:20px !important;" class="widget-content metric-widgets">'+
							'<div class="row-fluid">'+
								'<div class="actual-value upArrow">'+'<span  style="color: #adadad; ">'+data.userGroup.incrementalImpact[0].F2PconversionRate+'</span>'+'</div>'+
							'</div>'+							
						'</div>'+
					'</div>'+
				'</div>'+
                    
				'<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">'+
					'<div style="border:1px solid  #555;" class="brdr-left ">'+
						'<div class="">'+
							'<div class="panel-heading" style="font-weight:600; text-align:center; background:#555 none repeat scroll 0 0; color: #fff;padding:5px; margin-bottom:10px;">'+'Engagement Score'+'</div>'+
						'</div>'+
						'<div  style="padding:20px !important;" class="widget-content metric-widgets">'+
							'<div class="row-fluid">'+
								'<div class="actual-value upArrow">'+'<span  style="color: #555;">'+data.userGroup.incrementalImpact[0].EGScore+'</span>'+'</div>'+
							'</div>'+							
						'</div>'+
					'</div>'+
				'</div>'+ 
				
				
				'</div>'+
                    '<div  style="padding:15px;">'+
                    '<div style="width:100%; float:left;">'+
                    '<p style="border: 1px solid #ccc; font-size: 14px;   padding: 10px;    width: 100%;">'+'<b>Reasons</b><br/>'+data.userGroup.reasons[0]+'<br/>'+data.userGroup.reasons[1]+'</p>'+
                    '</div>'+                   
                    '</div>'+
                    '</div>'+
                    
    			
    			'<div style="margin: 0 15px; " class="row ">'+
    				'<div class="row nopadding">'+'</div>'+
                    '<div style=" border-bottom: 3px double #666;  font-size: 16px; margin: 15px 0px;" class="heading-overview">'+'Description of User Group'+'</div>'+
    					'<div class="half-width">'+
                    '<div style="border: 1px solid #666;  float: left;     width: 100%;">'+
    						'<div style=" margin: 0px 15px 0; padding: 0; "  class="col-sm-4 col-md-4 col-lg-4-1">'+
                    
    							'<div class="icon-widget '+data.userGroup.targetedUsers[0].imageClass+'">'+'</div>'+
    							'<div class="text-bold" style="text-align:center;">'+data.userGroup.targetedUsers[0].size+'</div>'+
    							'<div class="icon-widget-text text-bold bkgd-none">'+data.userGroup.targetedUsers[0].name+'</div>'+
    						'</div>'+
    						'<div style="margin: 0px 8px 0; padding: 0; "  class="col-sm-4 col-md-4 col-lg-4-1">'+
                    '<div class="icon-widget Mobile-image">'+'</div>'+
                    '<div class="text-bold" style="text-align:center;">'+data.userGroup.targetedUsers[0].appUsers+'</div>'+
    							'<div class="text-bold" style="text-align:center;">'+'App users '+data.userGroup.targetedUsers[0].appUsersPercentage+'</div>'+
    							
    						
    							'<div class="text-bold" style="text-align:center;">'+'Active users '+data.userGroup.targetedUsers[0].activeUsers+'</div>'+
    							
    						'</div>'+
    						'<div style="margin: 0px 8px 0; padding: 0; "  class="col-sm-4 col-md-4 col-lg-4-1">'+
                    
    							
                    	'<div class="icon-widget" style="padding-top:30px;">'+
                    				'<div class="acqChart genderInnerDonutChart" style="margin-top:-35px">'+'</div>'+
    								'<div class="text-bold" style="text-align:center;margin-top: -10px;;">'+data.userGroup.targetedUsers[0].male+' Male'+'</div>'+
    								'<div class="text-bold" style="text-align:center;padding-top:5px;">'+data.userGroup.targetedUsers[0].female+' Female'+'</div>'+
    							'</div>'+
    							
    						'</div>'+
                    '</div>'+
    					'</div>'+
    					'<div class="half-width">'+
    						'<div style="padding-right:0px;" class="col-sm-12 col-md-12 col-lg-12">'+
    							'<div style="border:1px solid #666;" class="acqChart monthBarChart">'+'</div>'+
    						'</div>'+
    					'</div>'+
    				'<div class="row nopadding">'+
    					'<div class="col-sm-12 col-md-12 col-lg-12">'+
    						'<div style="display:none;" class="acqChart engagementChart">'+'</div>'+
    					'</div>'+
    				'</div>'+
    			'</div>'+
                    
    			'<div style=" border-bottom: 3px double #666;  font-size: 16px; margin: 15px 15px;" class="heading-overview">'+'Description of Product Usage'+'</div>'+
    			'<div style="margin: 15px 15px;" id="demo">'+
					'<div  id="productUsageTable">'+'</div>'+
				'</div>'+
                    '<div class="half-width">'+
                     '<div style="border-bottom: 3px double #666;    float: left;    font-size: 16px;    margin: 15px 4px 15px 15px;    width: 95%;" class="heading-overview">'+'On-Going Campaign'+'</div>'+
    						'<div class="col-sm-12 col-md-12 col-lg-12">'+
                     '<div style="float:left;">'+
                     '<div id="table2">'+
	 					'<div id="onGoingCampaignTable">'+'</div>'+
	 				'</div>'+
                        '</div>'+
                    '</div>'+
                    '</div>'+
                    '<div class="half-width">'+
                       '<div style="border-bottom: 3px double #666;    float: left;    font-size: 16px;    margin: 15px 4px 15px 15px;    width: 95%;" class="heading-overview">'+'Past Campaign'+'</div>'+
    			
    						'<div class="col-sm-12 col-md-12 col-lg-12">'+
                     '<div class="acord" style="float:left;">'+
                     '<div id="table3">'+
	 					'<div id="pastCampaignTable">'+'</div>'+
	 				'</div>'+
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
            tableData:"=",
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