angular
.module('DecisionWorkbench')

.controller("reviewDoInit", function($scope, DataService, CustomService,ChartOptionsService, $rootScope) {
	// In common.js - DWPageChange
	$rootScope.$broadcast('DWPageChange', "changed");

	angular.element(document).ready(function() {
		var chartOBJ = {};
		CustomService.appInit();
		setTimeout(function() {
			CustomService.appInit();
		}, 1);
	});

})
.controller("reviewChartController", function($scope, DataService, UtilitiesService, CustomService, chartsService,
		ChartOptionsService, RequestConstantsFactory, $rootScope, DataConversionService) {
	var errorConstants = RequestConstantsFactory['ERROR_MSGS'];

	var requestData = {
			"groupBy" : "cmpgnView",
	};
	var plotLine = [];
	var plotValues = {};
	var plotLinesOptions = {};
	var tooltip = {};
	var utilData = UtilitiesService.getRequestData();
	requestData = angular.extend({}, utilData, requestData);
	$scope.showReviewChart = false;
	var buildDoChartOptions = ChartOptionsService
	.getBuildDoData();
	var reviewDoBubbleChart = ChartOptionsService
	.getReviewDoBubbleData();
	$scope.success = function(builddoChart) {
		$scope.currentAchievableChart = builddoChart;
		try {
			$scope.error = false;
			var buildDoChartOptions = ChartOptionsService
			.getBuildDoData();
			chartsService.waterfall.call($("#reviewChart"),
					builddoChart['paidUsers'][$rootScope.selectedPeriod],
					buildDoChartOptions, $scope);
			$scope.$on('doInitialSelected',function(index, data, selectedIndex, dIndex){
				var reviewDoBubbleChart = ChartOptionsService
				.getReviewDoBubbleData(dIndex);
				console.log("doInitialSelected")
				$scope.showReviewChart = true;
				$scope.currentData = data.doList;
				window.selectedIndex = selectedIndex;
				var selectedPeriod = $rootScope.selectedPeriod;
				var bubbleData = DataConversionService
				.toGetReviewDoBubble($scope.currentData,
						selectedIndex);
				var sampleTooltip = [];
				$.each(bubbleData, function(key, effort) {
					if (key != 'category') {
						plotValues = {
								color : '#6B7B93',
								dashStyle : 'longdashdot',
								value : effort.time,
								width : '1'
						}
					}
					var doTooltip = $scope.reviewDOAcronymText+" "+ effort.name;
					var timeTooltip = effort.time +" week";
					var costTooltip =  effort.cost +" $";
					var tempobj = {
							"name":[doTooltip, effort.subs, timeTooltip, costTooltip]
					};
					sampleTooltip.push(tempobj);
					plotLine.push(plotValues);
				});
				plotLinesOptions['xAxis'] = {
						plotLines : plotLine
				};
				tooltip['series'] = sampleTooltip;
				$.extend(true, reviewDoBubbleChart, plotLinesOptions);
				$.extend(true, reviewDoBubbleChart, tooltip);
				var achievableUplift = DataConversionService
				.toGetAchievableUplift(
						$scope.currentData,
						selectedIndex,
						$scope.currentAchievableChart['paidUsers']);
				buildDoChartOptions.xAxis.categories[4] = "New Subscritions due to Camp "
					+ dIndex;
				var chartOBJ = chartsService.waterfall.call($("#reviewChart"), achievableUplift,
						buildDoChartOptions, $scope);
				var bubbleOBJ = chartsService.bubbleChart.call($("#reviewBubbleChart"), bubbleData, reviewDoBubbleChart, $scope);
				setTimeout(function(){
	                $rootScope.$broadcast('chartLoaded')
	            },1);
			})
            setTimeout(function(){
                $rootScope.$broadcast('reviewChartLoaded')
            },1);
			
		} catch (e) {
			$scope.fail(errorConstants.DATA_ERR);
		}
	}
	$scope.fail = function (msg) {
		$scope.error = true;
		$scope.hasErrorMsg = true;
		if(msg){
			if(msg instanceof Object){
				$scope.errorMsg = (msg.statusText == "" ? errorConstants.NETWORK_ERR  : msg.statusText);
			} else {
				$scope.errorMsg = msg;
			}
		}
	}
	function loadData() {
		var func = $scope.success;
		DataService.getBuildDoChartData(requestData, func,
				$scope.fail);
	}
	loadData();
	$scope.$on('doSelected', add);
	function add(index, data, selectedIndex, dIndex) {
		var reviewDoBubbleChart = ChartOptionsService
		.getReviewDoBubbleData(dIndex);
		console.log("inside",data,selectedIndex)
		$scope.showReviewChart = true;
		$scope.currentData = data.doList;
		window.selectedIndex = selectedIndex;
		var selectedPeriod = $rootScope.selectedPeriod;
		var bubbleData = DataConversionService
		.toGetReviewDoBubble($scope.currentData,
				selectedIndex);
		var sampleTooltip = [];
		$.each(bubbleData, function(key, effort) {
			if (key != 'category') {
				plotValues = {
						color : '#6B7B93',
						dashStyle : 'longdashdot',
						value : effort.time,
						width : '1'
				}
				var doTooltip = $scope.reviewDOAcronymText+" "+ effort.name;
				var timeTooltip = effort.time +" week";
				var costTooltip =  effort.cost +" $";
				var tempobj = {
						"name":[doTooltip, effort.subs, timeTooltip, costTooltip]
				};
				sampleTooltip.push(tempobj);
			}
			plotLine.push(plotValues);
		});
		plotLinesOptions['xAxis'] = {
				plotLines : plotLine
		};
		tooltip['series'] = sampleTooltip;
		$.extend(true, reviewDoBubbleChart, plotLinesOptions);
		$.extend(true, reviewDoBubbleChart, tooltip);
		console.log("reviewDoBubbleChart", reviewDoBubbleChart)
		var achievableUplift = DataConversionService
		.toGetAchievableUplift(
				$scope.currentData,
				selectedIndex,
				$scope.currentAchievableChart['paidUsers']);
		buildDoChartOptions.xAxis.categories[4] = "New Subscritions due to Camp "
			+ dIndex;
		var chartOBJ = chartsService.waterfall.call($("#reviewChart"), achievableUplift,
				buildDoChartOptions, $scope);
		var bubbleOBJ = chartsService.bubbleChart.call($("#reviewBubbleChart"), bubbleData, reviewDoBubbleChart, $scope);
	}
})

.controller(
		"reviewDoTableController",
		function($scope, $element, $rootScope, DataService,	UtilitiesService, RequestConstantsFactory, DataConversionService) {
			$scope.options = UtilitiesService.getDataTableOptions();
			$scope.reviewTableOptions = 
			{aoColumnDefs: [{
                "bSortable": false,
                "aTargets": [0, 1]

            }]};
			$.extend(true, $scope.options, $scope.reviewTableOptions);
            $scope.classOptions = {
					"aoColumns" : [
						            {"sTitle":$scope.reviewDOAcronym+" No."},
						            null,
						            null,
						            null,
						            null,
						            null,
						            null,
						            null,/*
						            null,
						            null,
						            {
						            	"sClass" : "",
						            	"fnCreatedCell" : function(nTd, sData, oData, iRow, iCol) {  
                                            $(nTd).attr('user-data', 'userData').attr('my-tooltip', '');  
                                        }
						            },*/ {
						            	"sClass" : ""
						            } ]
	
			};
            $rootScope.$on('updateDO', function(event, tableData) {
				$scope.addData(tableData);
			});
			$.extend(true, $scope.options, $scope.classOptions);
			$scope.$on('reviewChartLoaded', function () {
                console.log("CHART LOADEED 111");
                var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
				$scope.dataLoaded = false;
				var actualData = [];
				window.selectedIndex = [];
				window.waterfallIndex = [];
				
                $scope.addData = function(data) {
					$scope.dataLoaded = true;
					actualData = data;
					prepareTableData(data);
				};
				$scope.fail = function (msg) {
					$scope.error = true;
					$scope.hasErrorMsg = true;
					if(msg){
						if(msg instanceof Object){
							$scope.errorMsg = (msg.statusText == "" ? errorConstants.NETWORK_ERR  : msg.statusText);
						} else {
							$scope.errorMsg = msg;
						}
					}
				}
				function prepareTableData(data) {
					try {
						$scope.error = false;
						$scope.options.aaData = [];
						var defaultIndex = [];
						$.each(
								data.doList,
								function(key, obj) {
									if(obj.doId == data.doList[0].doId || obj.doId == data.doList[1].doId || obj.doId == data.doList[2].doId){
										 $scope.actionChecked = true;
									}
									else{
										$scope.actionChecked = false;
									}
									//var activateClass = obj.activate ? "'switch actBtnSwitch on '": "'switch actBtnSwitch'";
									
									if(obj.doId == "1,3" || obj.doId == "2,3"){
										var activateClass = "'switch actBtnSwitch'";
									}
									else{
										var activateClass = "'switch actBtnSwitch on'";
									}
									
									//Permission check for editing Activate column
									if($scope.isDOResponsibilityEditable){
										var activateColumn = "<div class="
											+ activateClass
											+ "><a href='#' data-modal='responsibiltyModal' ng-click=\"tableData.activateClicked('"
											+ obj.doId
											+ "')\" data-id='"
											+ obj.doId
											+ "'  rel='activateBtn'></a><span class='num'>Yes</span>"
											+ "<span class='per'>No</span></div>";
									}else{
										//No value will make the column empty
										var activateColumn = '';
									}
									
									//Permission check for editing DO Cost
									if($scope.isDOResponsibilityEditable){
										var costEditClass = "editleft";
									}else{
										//No class name will make the edit icon disappear
										var costEditClass = '';
									}
									
									// should be removed once
									// approval image is shown
									obj.approval = "No";
									$scope.reviewData = obj.approvalStatus;
									//Pushing the data into the table
                                    $scope.options.aaData
									.push([
									       obj.doId,
									       obj.targetConvActivityListText,
									       obj.channelListText,
									       obj.userGroupListText,
									       "<img src='images/arrow-up-green.png' />"
									       + obj.expectedNewSub
									       + ","
									       + obj.convUplift.value,
									       obj.usersTargeted,
									       obj.campaignDuration,
									       obj.cost,/*
									       activateColumn,
									       obj.responsibility,
									       obj.approval,*/
									       "<a href='#' data-modal='#modifyReviewdoDialog' data-id='"
									       + obj.doId
									       + "'  name='modal' class="+costEditClass+" title='Edit'></a> <input type='checkbox'  id='DOReview_"
									       + obj.doId
									       + "' data-id='"
									       + obj.doId 
									       + "' ng-checked='"+$scope.actionChecked+"' ng-click=\"tableData.getReviewDONumber('"
									       + obj.doId
									       + "')\"/>" ]);
								})
						defaultIndex.push(data.doList[0].doId);
						defaultIndex.push(data.doList[1].doId);
						defaultIndex.push(data.doList[2].doId);
						waterfallIndex = data.doList[0].doId + "|"+ data.doList[1].doId + "|"+ data.doList[2].doId;
						console.log('DEFAULT INDX',data.doList)
						$rootScope.$broadcast('doInitialSelected',actualData,defaultIndex, waterfallIndex);
					} catch (e) {
						$scope.fail(errorConstants.DATA_ERR);
					}
	
				}
	
				$scope.activateClicked = function(id) {
					$rootScope.$broadcast('activated', id);
					var element = $('[data-id="' + id + '"]');
					if (element.closest('div').hasClass('deactivated')) {
						e.preventDefault();
						return false;
					}
					if (!element.closest('div').hasClass('on')) {
						// Get the screen height and width
						var maskHeight = $(document).height();
						var maskWidth = $(window).width();
	
						// Set height and width to mask to fill up the whole
						// screen
						$('#mask').css({
							'width' : maskWidth,
							'height' : maskHeight
						});
	
						// transition effect
						$('#mask').fadeIn(1000);
						$('#mask').fadeTo("slow", 0.8);
	
						// Get the window height and width
						var winH = $(window).height();
						var winW = $(window).width();
	
						var responsibiltyModal = $('#responsibiltyModal');
						// Set the popup window to center
						responsibiltyModal.css('top', winH / 2
								- responsibiltyModal.height() / 2);
						responsibiltyModal.css('left', winW / 2
								- responsibiltyModal.width() / 2);
	
						// transition effect
						responsibiltyModal.fadeIn(2000);
					}
				}

				var oldDOid = 0;
				var selectedIndexWaterfall;
				$scope.getReviewDONumber = function(doId) {
					if (oldDOid != doId) {
					$.each(actualData.doList, function(key, data) {
						if (doId == data.doId) {
							if ($('[id="DOReview_'+doId+'"]').is(':checked')) {
								selectedIndexWaterfall = selectedIndexWaterfall ?(selectedIndexWaterfall +"|"+ doId):(waterfallIndex +"|"+doId) ;
								selectedIndex.push(doId);
								console.log(selectedIndex);
							} else {
								var count = 0;
								selectedIndex.forEach(function(index) {
									if (index == doId)
										selectedIndex.splice(count);
	
									count++;
								});
	
							}
						}
					});
					}
					oldDOid = doId;
					
					$rootScope.$broadcast('doSelected', actualData,
							selectedIndex, selectedIndexWaterfall);
				}
				$scope.tableFunctions = {
						activateClicked : $scope.activateClicked,
						getReviewDONumber : $scope.getReviewDONumber
				}

                $rootScope.$on('reviewDOFilterClicked', function(){
                        $scope.filterSearchResults();
                });

				$scope.filterSearchResults = function() {
					prepareTableData($rootScope
							.filterDataBySelectedOptions(actualData));
				}
	
				var requestData = {
						"doIdList" : [],
						"filter" : "executed",
						"periodName" : $rootScope.selectedPeriod
				};
				var cacheKey = "ReviewDoTable"
					+ JSON.stringify(requestData);
				function loadDecisionOptionsTable() {
					var func = $scope.addData;
					if (arguments[1]) {
						if (arguments[1].key == cacheKey) {
							func = null;
						} else {
							return false;
						}
					}
					DataService.getDecisionOptionsTableData(requestData,
							func, $scope.fail);
				}
	
				loadDecisionOptionsTable();
				$scope.$on('periodChange', function(event, period) {
					loadDecisionOptionsTable(actualData);
				});
			});
		})

		.controller(
				"reviewdoModalController",
				function($scope, $rootScope, DataService,
						RequestConstantsFactory, DataConversionService,
						UtilitiesService) {

					var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
					$scope.MAX_APPROVERS = [ 1, 2, 3, 4, 5 ];
					$scope.noOfApprovers = 3;
					$scope.savingDO = false;
					var requestConstants = RequestConstantsFactory['NOTIFICATION'];

					var decisionId = 5;
					$rootScope.$on('reviewdoModify', function(object, doId) {
						$scope.error = false;
						$scope.showError = false;
						$scope.savingDO = false;
						decisionId = doId;
						loadModalData();
					})

					$scope.$on('activated', function(object, doId) {
						$scope.activateId = doId;
						loadModalData();
					})

					$scope.success = function(reviewModalData) {
						try{
							$.each(reviewModalData.doList, function(key, eachData) {
								if (eachData.doId == decisionId) {
									$scope.doId = decisionId;
									$scope.cost = UtilitiesService
									.getIntFromString(eachData.cost);
								}
							});
							$scope.$apply();
						}
						catch(e){
							$scope.fail(errorConstants.DATA_ERR);
						}
					}
					$scope.fail = function (msg) {
						$scope.error = true;
						$scope.hasErrorMsg = true;
						if(msg){
							if(msg instanceof Object){
								$scope.errorMsg = (msg.statusText == "" ? errorConstants.NETWORK_ERR  : msg.statusText);
							} else {
								$scope.errorMsg = msg;
							}
						}
					}
					$scope.saveReviewCost = function() {
						$scope.savingDO = true;
						if (!modifyReviewDoForm.checkValidity()) {
							$scope.savingDO = false;
							return false;
						}

						var cost = 0;
						$.each($('#modifyReviewdoDialog [type="number"]'),
								function(key, text) {
							cost = text.value;
						});
						var reqDoSaveCost = {
								"doId" : decisionId,
								"cost" : cost,
								"periodName" : $rootScope.selectedPeriod
						};

						updateDO(reqDoSaveCost);
					};
					$scope.saveApprovers = function() {
						var requestData = {};
						var listOfApprovers = [];
						var responsibility;
						var noOfApprovers;

						$.each($('#responsibiltyModal #responsibility'),
								function(key, text) {
							responsibility = text.value;
						});
						$.each($('#responsibiltyModal .approver'), function(
								key, text) {
							var tempObj = {
									"approverId" : text.id,
									"approverName" : text.value,
									"periodName" : $rootScope.selectedPeriod
							};
							listOfApprovers.push(tempObj);

						});
						$.each($('#responsibiltyModal #approversCount'),
								function(key, text) {
							noOfApprovers = text.value;
						});
						requestData['doId'] = $scope.activateId;
						requestData['responsibility'] = responsibility;
						requestData['noOfApprovers'] = noOfApprovers;
						requestData['listOfApprovers'] = listOfApprovers;
						updateDO(requestData);
					};
					$scope.updateSuccess = function(reviewdoTableData) {
						if (reviewdoTableData.status == 'OK') {
							UtilitiesService.getNotifyMessage(
									"Activated Successfully",
									requestConstants.SUCCESS);
							$scope.savingDO = false;
//							$rootScope
//							.$broadcast('updateDO', reviewdoTableData);
							$scope.showError = false;
							$('#mask, .window').hide();
						} else {
							$scope.showError = true;
						}

					}
					function updateDO(requestData) {

						var requestData = {};
						var func = $scope.updateSuccess;
						if (arguments[1]) {
							if (arguments[1].key == cacheKey) {
								func = null;
							} else {
								return false;
							}
						}
						DataService.updateDO(requestData, func, $scope.fail);
					}

					function loadModalData() {
						var requestData = {};
						var func = $scope.success;
						if (arguments[1]) {
							if (arguments[1].key == cacheKey) {
								func = null;
							} else {
								return false;
							}
						}
						DataService.getDecisionOptionsTableData(requestData,
								func, $scope.fail);
					}
				})
