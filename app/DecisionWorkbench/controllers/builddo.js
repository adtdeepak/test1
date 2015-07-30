angular
		.module('DecisionWorkbench')

		.controller(
				"buildDoInit",
				function($scope, DataService, CustomService,
						ChartOptionsService, $rootScope) {
					// In utilities.js - DWPageChange
					$rootScope.$broadcast('DWPageChange', "changed");
					angular.element(document).ready(function() {
						setTimeout(function() {
							CustomService.appInit()
						}, 1);
					});

				})
				

		.controller(
				"modalController",
				function($scope, $rootScope, RequestConstantsFactory,
						DataService, DataConversionService, UtilitiesService,
						$element, $timeout) {

					var dOptionId;
					var currentData;
				    $rootScope.builddoLoad = false;
					$scope.dataLoaded = false;
					$scope.radioValue = 'selected';
					$scope.savingDO = false;
					var requestConstants = RequestConstantsFactory['NOTIFICATION'];
					var errorConstants = RequestConstantsFactory['ERROR_MSGS'];

					$rootScope.$on('TableData', function(obj, data) {
						currentData = data;
					});
					$scope.options = UtilitiesService.getDataTableOptions();
					$scope.success = function(data) {
						try {
							$scope.dataLoaded = true;
							$scope.error = false;
							$scope.modifyTableData = data;
							if ($scope.modifyTableData.doDetails.doId.trim()
									.substring(2) == $scope.currentIndex) {
								$scope.modifyData = $scope.modifyTableData.doDetails;
								dOptionId = data['doDetails'].doId;
							} else {
								$scope.modifyData = "";
								dOptionId = "";
							}
							$("select").trigger('change');
						} catch (e) {
							$scope.fail(errorConstants.DATA_ERR);
						}
					}

					$scope.$on('decisionModify', function(object, index) {
						$scope.showError = false;
						$scope.$apply();
						$scope.currentIndex = index;
						$scope.requestData = {
							"doId" : index,
							"periodName" : $rootScope.selectedPeriod
						};
						loadDecisionOptionsTable();
					});

					$scope.$on('decisionValidate', function(object, index) {
						$scope.showError = false;
						$scope.error = false;
						$scope.$apply();
						$scope.validateIndex = index;
						getCurrentData();
					});

					function getCurrentData() {
						$.each(currentData, function(key, obj) {
							if (obj.doId == $scope.validateIndex) {
								$scope.currentData = obj;
								var temp = obj.targetconvList;
								$scope.currentData.targetconvList = temp
										.replace(/<br>/g, ",").replace(/\,$/g,
												"");
								$scope.$apply();
							}
						})

					}
					$scope.fail = function(msg) {
						$scope.error = true;
						$scope.hasErrorMsg = true;
						if (msg) {
							if (msg instanceof Object) {
								$scope.errorMsg = (msg.statusText == "" ? errorConstants.NETWORK_ERR
										: msg.statusText);
							} else {
								$scope.errorMsg = msg;
							}
						}
					}

					$scope.addValidateData = function(data) {
						if (data.status == 'OK') {
							$scope.options.aaData = [];
							$
									.each(
											data,
											function(key, obj) {
												console.log(obj);
												obj.convUpliftAchieved.trend == '+ve' ? $scope.img = "<img  src='images/arrow-up-green.png'/>"
														: $scope.img = "<img  src='images/arrow-red.png' />";
												$scope.options.aaData
														.push([
																key + 1,
																obj.convActivityList,
																obj.channel,
																obj.tenure,
																obj.startDate,
																$scope.img
																		+ obj.convUpliftAchieved.value,
																$scope.img
																		+ obj.convUpliftExpected.value,
																obj.newSubs.subsAchieved,
																obj.newSubs.subsExpected ]);
												$scope.error = false;
											});
							$timeout(function() {
								$(window).trigger('resize');
							}, 1);
							$scope.showError = false;
							$scope.dataLoaded = true;
						} else {
							$scope.showError = true;
							$scope.dataLoaded = true;
						}

					};
					$scope.showTable = function() {
						$scope.show = false;
					}
					$scope.validateFilter = function() {
						$scope.show = true;
						var convActivityList = [];
						var allCombination;
						$.each($scope.currentData.convAct, function(key,
								convAct) {
							var tempObj = {
								"convActivityId" : convAct.convActivityId,
							};
							convActivityList.push(tempObj);
						});
						allCombination = ("$scope.radioValue=='all'" ? true
								: false);
						$scope.validateRequestData = {
							"doId" : $scope.validateIndex,
							"periodName" : $rootScope.selectedPeriod,
							"filter" : {
								"convActivityList" : convActivityList,
								// "convActivityAllCombination":allCombination,
								"execDtUpperBound" : $scope.fromDate,
								"execDtLowerBound" : $scope.toDate
							}
						};
						loadDecisionOptionsTableValidate();
					}

					$scope.saveDecisionOptions = function() {
						if (!userGroupForm.checkValidity()) {
							$scope.savingDO = false;
							return false;
						} else {
							$scope.savingDO = true;
							var requestDoSave = {};
							var userGroup = [];
							$.each($('#modifyDialog [type="text"]'), function(
									key, text) {
								var tempObj = {
									"groupId" : text.id,
									"targetUserCount" : text.value
								};
								userGroup.push(tempObj);
							});

							var requestDoSave = {
								"doId" : dOptionId,
								"channelId" : $scope.selectChannel,
								"userGroupList" : userGroup,
								"periodName" : $rootScope.selectedPeriod
							};
							loadReviewDecisionOptionsTable(requestDoSave);
						}
					};

					$scope.buildDoTable = function(result) {
						UtilitiesService.getNotifyMessage(
								"DO Saved Successfully",
								requestConstants.SUCCESS);
						$scope.savingDO = false;
						if (result.status == 'OK') {
							$scope.showError = true;
							// $rootScope.$broadcast("builddoTableData",
							// result);
							$('#mask, .window').hide();
						} else {
							$scope.showError = true;
						}

					}

					function loadDecisionOptionsTableValidate() {
						var func = $scope.addValidateData;
						var cacheKey = "DWDecisionTableValidate"
								+ JSON.stringify($scope.validateRequestData);
						if (arguments[1]) {
							if (arguments[1].key == cacheKey) {
								func = null;
							} else {
								return false;
							}
						}
						DataService.getDecisionOptionsValidateData(
								$scope.validateRequestData, func, $scope.fail);
					}
					function loadDecisionOptionsTable() {
						var func = $scope.success;
						var cacheKey = "DWDecisionTableModify"
								+ JSON.stringify($scope.requestData);
						if (arguments[1]) {
							if (arguments[1].key == cacheKey) {
								func = null;
							} else {
								return false;
							}
						}
						DataService.getDecisionOptionsModifyData(
								$scope.requestData, func, $scope.fail);
					}

					function loadReviewDecisionOptionsTable(requestData) {
						var rEG = UtilitiesService.getRequestData();
						var func = $scope.buildDoTable;
						if (arguments[1]) {
							if (arguments[1].key == cacheKey) {
								func = null;
							} else {
								return false;
							}
						}
						DataService.editDOSaveAction(requestData, func,
								$scope.fail);
					}
				})

		.controller(
				"achievementUplift",
				function($scope, DataService, chartsService, $rootScope,
						CustomService, ChartOptionsService,
						DataConversionService, UtilitiesService,
						RequestConstantsFactory) {
					var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
					$scope.dataLoaded = false;
					var requestData = {
						"groupBy" : "cmpgnView",
					};
					var utilData = UtilitiesService.getRequestData();

					requestData = angular.extend({}, utilData, requestData);
					$scope.showChart = false;
					var buildDoChartOptions = ChartOptionsService
							.getBuildDoData();
					$scope.success = function(builddoChart) {
						$scope.currentAchievableChart = builddoChart;
						try {
							$scope.dataLoaded = true;
							var buildDoChartOptions = ChartOptionsService
									.getBuildDoData();
							$scope
									.$on(
											'doInitialSelected',
											function(index, data, selectedIndex) {
												$scope.showChart = true;
												var achievableUplift = DataConversionService
														.toGetAchievableUplift(
																data,
																selectedIndex,
																$scope.currentAchievableChart['paidUsers']);
												buildDoChartOptions.xAxis.categories[4] = "New subscription due to camp "
														+ selectedIndex;
												if (achievableUplift.data)
													chartsService.waterfall
															.call(
																	$("#buildDoChart"),
																	achievableUplift,
																	buildDoChartOptions,
																	$scope);
												else
													$scope.error = true;
											});
							setTimeout(function() {
								$rootScope.$broadcast('chartLoaded')
							}, 1);
						} catch (e) {
							$scope.fail(errorConstants.DATA_ERR);
						}
					}
					$scope.fail = function(msg) {
						$scope.error = true;
						$scope.hasErrorMsg = true;
						$rootScope.$emit('chartError');
						if (msg) {
							if (msg instanceof Object) {
								$scope.errorMsg = (msg.statusText == "" ? errorConstants.NETWORK_ERR
										: msg.statusText);
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
					function add(index, data, selectedIndex) {
						$scope.showChart = true;
						$scope.currentData = data;
						var selectedIndex = selectedIndex;
						var selectedPeriod = $rootScope.selectedPeriod;
						var achievableUplift = DataConversionService
								.toGetAchievableUplift(
										$scope.currentData,
										selectedIndex,
										$scope.currentAchievableChart['paidUsers']);
						buildDoChartOptions.xAxis.categories[4] = "New subscription due to camp "
								+ selectedIndex;
						if (achievableUplift.data)
							chartsService.waterfall.call($("#buildDoChart"),
									achievableUplift, buildDoChartOptions,
									$scope);
						else
							$scope.error = true;
					}
				})

		.controller(
				"reviewPanel",
				function($scope, $rootScope, RequestConstantsFactory,
						DataService, UtilitiesService, $compile, $element,
						$location) {

					var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
					$scope.dataLoaded = false;
					$scope.reviewPaneloptions = {
						"columns" : [ {
							"width" : "80px"
						}, {
							"width" : "120px"
						}, null ],
						sScrollY : '110px',
						bPaginate : false,
						bScrollCollapse : true,
						dom : '<"dataTableContainer"t><"dataTablePaginateContainer"p>'
					};
					$scope.isDataInReviewPanelTable = false;
					$scope.options = UtilitiesService.getDataTableOptions();
					$.extend(true, $scope.options, $scope.reviewPaneloptions);
					$scope.addData = function(data) {
						console.log('data', data)
						try {
							var obj = data;
							$scope.options.aaData = [];
							if (data.length == 0) {
								$scope.options.aaData.push([ '', '', '' ]);
							}
							if (data.length) {
								$scope.isDataInReviewPanelTable = true;
								$.each(data, function(key, obj) {
									$scope.options.aaData.push([
											"<input type='checkbox' ng-model='tableData["
													+ key + "].selected'>",
											obj.number,
											"<img  src='images/arrow-up-green.png'/>"
													+ obj.uplift + " / "
													+ obj.newSubs ]);
								})
							}
							$scope.dataLoaded = true;
						} catch (e) {
							$scope.fail(errorConstants.DATA_ERR);
						}

					};
					$rootScope.$on('doInitialSelected', function() {
						$scope.addSelectedDOs("1");
						// for initial load
						$scope.addSelectedDOs();
					});

					$scope.reviewTableData = [];
					$scope.addData($scope.reviewTableData);
					$scope.removeSelected = function() {
						$scope.isDataInReviewPanelTable = false;
						var reviewTableData = [];
						angular.forEach($scope.reviewTableData, function(
								eachRow) {
							if (eachRow.selected == false) {
								reviewTableData.push(eachRow);
							}
						});
						$scope.reviewTableData = reviewTableData;
						$scope.addData(reviewTableData);
					};
					$scope.fail = function(msg) {
						$scope.error = true;
						$scope.hasErrorMsg = true;
						if (msg) {
							if (msg instanceof Object) {
								$scope.errorMsg = (msg.statusText == "" ? errorConstants.NETWORK_ERR
										: msg.statusText);
							} else {
								$scope.errorMsg = msg;
							}
						}
					}
					// adds the selected dos to the review panel
					$scope.addSelectedDOs = function(firstDO) {
						if(firstDO){
							var DO = {
							        "targetconvList": "Send Archives<br> Multi app available<br> Send Audio<br> Send PDF<br>",
							        "userGroup": "Project Managers",
							        "channelList": "Recipient Page<br>",
							        "convUplift": {
							            "value": "46.6%",
							            "trend": "+ve"
							        },
							        "expectedNewSub": "305",
							        "usersTargetted": "885",
							        "doId": "1",
							        "checked": true,
							        "convAct": [
							            {
							                "convActivityId": "Send Archives",
							                "convActivityName": "Send Archives"
							            },
							            {
							                "convActivityId": " Multi app available",
							                "convActivityName": " Multi app available"
							            },
							            {
							                "convActivityId": " Send Audio",
							                "convActivityName": " Send Audio"
							            },
							            {
							                "convActivityId": " Send PDF",
							                "convActivityName": " Send PDF"
							            }
							        ],
							        "regions": "Global"
							    };
								var selectedDO = {
									"number" : "",
									"uplift" : 0,
									"newSubs" : 0,
									"selected" : true,
									"usersCovered":0
								};

								if (selectedDO.number == "") {
									selectedDO.number = selectedDO.number
									+ DO.doId;
								} else {
									selectedDO.number = selectedDO.number
									+ ", " + DO.doId;
								}
								/*selectedDO.uplift = (parseInt(selectedDO.uplift) + parseInt(DO.convUplift.value))
															+ "%";*/
								expectedNewSub = UtilitiesService
								.getIntFromString(DO.expectedNewSub);
								selectedDO.newSubs = selectedDO.newSubs
								+ expectedNewSub;
								selectedDO.usersCovered = selectedDO.usersCovered
								+ parseInt(DO.usersTargetted);
								selectedDO.uplift = ((selectedDO.newSubs/selectedDO.usersCovered)*100).toFixed(1) + "%";
								selectedDO.newSubs = UtilitiesService
								.getLocaleString(selectedDO.newSubs)
								// adds the selected DOs to the review panel
								var hasDO = false;
								angular.forEach($scope.reviewTableData,
										function(DO) {
											var selectedNumber = selectedDO.number
													.split(", ");
											var doNumber = DO.number.split(", ");
											if (UtilitiesService.containsAll(
													selectedNumber, doNumber)) {
												hasDO = true;
											}
										});
								if (!hasDO) {
									$scope.reviewTableData.push(selectedDO);
									$scope.addData($scope.reviewTableData);
								}
						}else{
							var expectedNewSub;
							if ($rootScope.selectDOs.length > 0) {
								var selectedDO = {
									"number" : "",
									"uplift" : 0,
									"newSubs" : 0,
									"selected" : true,
									"usersCovered":0
								};
								angular
										.forEach(
												$rootScope.selectDOs,
												function(DO) {

													if (selectedDO.number == "") {
														selectedDO.number = selectedDO.number
																+ DO.doId;
													} else {
														selectedDO.number = selectedDO.number
																+ ", " + DO.doId;
													}
													/*selectedDO.uplift = (parseInt(selectedDO.uplift) + parseInt(DO.convUplift.value))
															+ "%";*/
													expectedNewSub = UtilitiesService
															.getIntFromString(DO.expectedNewSub);
													selectedDO.newSubs = selectedDO.newSubs
															+ expectedNewSub;
													selectedDO.usersCovered = selectedDO.usersCovered
													+ parseInt(DO.usersTargetted);
												});
								selectedDO.uplift = ((selectedDO.newSubs/selectedDO.usersCovered)*100).toFixed(1) + "%";
								selectedDO.newSubs = UtilitiesService
										.getLocaleString(selectedDO.newSubs)
								// adds the selected DOs to the review panel
								var hasDO = false;
								angular.forEach($scope.reviewTableData,
										function(DO) {
											var selectedNumber = selectedDO.number
													.split(", ");
											var doNumber = DO.number.split(", ");
											if (UtilitiesService.containsAll(
													selectedNumber, doNumber)) {
												hasDO = true;
											}
										});
								if (!hasDO) {
									$scope.reviewTableData.push(selectedDO);
									$scope.addData($scope.reviewTableData);
								}
							}
						}
					};

					function onSaveSuccess() {
						$scope.dataLoaded = true;
						$location.path("/review-do");
					}

					$scope.save = function() {
						$scope.dataLoaded = false;
						var request = {
							"doIdList" : [],
							"filter" : "executed"
						}
						$scope.reviewTableData.forEach(function(doObj) {
							var singleDOArray = [];
							doObj.number.split(",").forEach(function(doNumber) {
								var reviewedDOObj = {};
								reviewedDOObj["doId"] = doNumber.trim();
								singleDOArray.push(reviewedDOObj);
							});
							request.doIdList.push(singleDOArray);
						});
						DataService.saveSelectedDO(request, $scope,
								onSaveSuccess);
					}

				})

		.controller(
				"buildDoTableController",
				function($scope, $element, $rootScope, $location,
						RequestConstantsFactory, DataService, sharedProperties,
						UtilitiesService, DataConversionService) {

					var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
					var notifyRequestConstants = RequestConstantsFactory['NOTIFICATION'];
					$scope.dataLoaded = false;
					$scope.accordionData = [];
					$scope.options = UtilitiesService.getDataTableOptions();
					var columOptions = {
						"aoColumns" : [ {
							"sClass" : "details-control",
						}, {
							"sClass" : "details-control",
						}, {
							"sClass" : "details-control",
						}, {
							"sClass" : "details-control",
						}, {
							"sClass" : "details-control",
						}, {

						} ],
						"fnRowCallback" : function(nRow, aData, iDisplayIndex,
								iDisplayIndexFull) {
							var channel, className;
							if (aData.length != 0) {
								channel = aData[1].split('<span>')[1]
										.split('<br>');
							} else {
								return;
							}
							switch (channel[0]) {
							case 'Recipient Page':
								className = "recipientPage";
								break;
							case 'Email':
								className = "email";
								break;
							case 'House Ad 2':
								className = "house";
								break;
							}
							$(nRow).addClass(className);
							console.log('ROW CRWEATED', nRow, className)
						}
					};
					$.extend(true, $scope.options, columOptions);
					console.log("$scope.options:", $scope.options)
					$scope.fail = function(msg) {
						$scope.error = true;
						$scope.hasErrorMsg = true;
						if (msg) {
							if (msg instanceof Object) {
								$scope.errorMsg = (msg.statusText == "" ? errorConstants.NETWORK_ERR
										: msg.statusText);
							} else {
								$scope.errorMsg = msg;
							}
						}
					}
					$rootScope.$on('chartError', function() {
						$scope.fail(errorConstants.DATA_ERR);
					})

					$scope
							.$on(
									'chartLoaded',
									function() {
										var selectedIndex = [];
										var actualData = [];
										$rootScope.selectDOs = [];
										$rootScope.$on('builddoTableData',
												function(event, tableData) {
													$scope.addData(tableData);
												});
										$scope.addData = function(data) {
										    $rootScope.builddoLoad = true;
											$scope.dataLoaded = true;
											if (!data)
												throw "noDataError";
											$rootScope.$broadcast('TableData',
													data);
											actualData = data;
											$scope.accordionData = data;
											try {
												$scope.error = false;
												$scope.options.aaData = [];
												selectedIndex = [];
												$rootScope.selectDOs = [];
												$
														.each(
																data,
																function(key,
																		obj) {
																	if (obj.checked) {
																		$rootScope.selectDOs
																				.push(obj);
																		selectedIndex
																				.push(obj.doId);
																	}
																	obj.convUplift.trend == '+ve' ? $scope.img = "+"
																			: $scope.img = "-";
																	$scope.options.aaData
																			.push([
																					obj.doId,
																					'<span>'
																							+ obj.channelList
																							+ '</span><label>Channel</label>',
																					'<span>'
																							+ obj.userGroup
																							+ '</span><br><label>Target Group<label>',
																					$scope.img
																							+ '<span>'
																							+ obj.convUplift.value
																							+ '</span><br><label>Incremental Conversion Uplift<label>',
																					'<span>'
																							+ obj.expectedNewSub
																							+ '</span><br><label>New Subscriptions</label>',
																					"<a href='#' data-modal='#modifyDialog' name='modal' data-id='"
																							+ obj.doId
																							+ "' class='edit'"
																							+ "title='Edit'></a><a title='Validate' href='#' data-modal='#dialog' data-id='"
																							+ obj.doId
																							+ "'"
																							+ "name='modal' class='save'> </a> <input type='checkbox' id='DORow_"
																							+ obj.doId
																							+ "' ng-checked='"
																							+ obj.checked
																							+ "' data-id='"
																							+ obj.doId
																							+ "' ng-click=\"tableData('"
																							+ obj.doId
																							+ "')\"/>" ]);
																})
												$rootScope.$broadcast(
														'doInitialSelected',
														data, selectedIndex);
												UtilitiesService.getNotifyMessage($scope.decisionOptionsText+" Generated",notifyRequestConstants.SUCCESS);
											    $rootScope.$apply();
											} catch (e) {
												$scope
														.fail(errorConstants.DATA_ERR);
											}
										};
										// $scope.addData = function (data) {
										// $scope.dataLoaded = true;
										// if(!data)
										// throw "noDataError";
										// $rootScope.$broadcast('TableData',
										// data);
										// actualData = data;
										// try {
										// $scope.error = false;
										// $scope.options.aaData = [];
										// selectedIndex = [];
										// $rootScope.selectDOs = [];
										// $.each(data, function(key, obj){
										// if(obj.checked) {
										// $rootScope.selectDOs.push(obj);
										// selectedIndex.push(obj.doId);
										// }
										// obj.convUplift.trend == '+ve' ?
										// $scope.img = "<img
										// src='images/arrow-up-green.png'/>"
										// : $scope.img = "<img
										// src='images/arrow-red.png' />";
										// $scope.options.aaData.push([obj.doId,obj.targetconvList,obj.channelList,obj.userGroup,obj.expectedNewSub,obj.usersTargetted,$scope.img+obj.convUplift.value,"<a
										// href='#' data-modal='#modifyDialog'
										// name='modal' data-id='"+obj.doId+"'
										// class='edit'"
										// +"title='Edit'></a><a
										// title='Validate' href='#'
										// data-modal='#dialog'
										// data-id='"+obj.doId+"'"
										// +"name='modal' class='save'> </a>
										// <input type='checkbox'
										// id='DORow_"+obj.doId+"'
										// ng-checked='"+obj.checked+"'
										// data-id='"+obj.doId+"'
										// ng-click=\"tableData('"+obj.doId+"')\"/>"]);
										// })
										// $rootScope.$broadcast('doInitialSelected',
										// data, selectedIndex);
										// } catch (e) {
										// $scope.fail(errorConstants.DATA_ERR);
										// }
										// };
										var oldDOid = 0;
										$scope.getDONumber = function(doId) {
											$rootScope.dosUpdated = true;
											actualData.forEach(function(data){
												if(doId == data.doId) {
													if($('#DORow_'+ doId).is(':checked')) {
														$rootScope.selectDOs.push(data);
														selectedIndex.push(doId);
													} else {
														$rootScope.selectDOs = $rootScope.selectDOs.filter(function( obj ) {
															return obj.doId != doId;
														});
														selectedIndex = [];
														$rootScope.selectDOs.forEach(function(DO){
															selectedIndex.push(DO.doId);
														});
													}
												}
											});
											$rootScope.chartLoading = true;
											selectedIndex = unique(selectedIndex);
											$rootScope.$broadcast('doSelected',actualData, selectedIndex);
											return true;
										}
										
										//Removing duplicates in an array
										function unique(list) {
											  var result = [];
											  $.each(list, function(i, e) {
											    if ($.inArray(e, result) == -1) result.push(e);
											  });
											  return result;
											}
										function loadBuilddoTableData() {
													$( "#startLoop" ).trigger( "click" );
													var urlIndex = $location.search();
													var requestData = {};
													var func = $scope.addData;
													if (arguments[1]) {
														if (arguments[1].key == cacheKey) {
															func = null;
														} else {
															return false;
														}
													}
													//Delay 5 seconds
													setTimeout(function(){
														DataService.getBuilddoDecision(
																requestData, func,
																$scope.fail); }, 5000);
										};
										loadBuilddoTableData();
										// function loadData() {
										// var urlIndex = $location.search();
										// var requestData = {
										// "mode": "freemium",
										// "timeRange":
										// {
										// "periodName": "weekly",
										// "reportingInterval": "daily",
										// "periodFrom": "10-05-2014",
										// "periodTo": "10-11-2014"
										// },
										// "filter": {
										// "listOfUserGroups": [
										// {
										// "groupId": "",
										// "groupName": ""
										// },
										// {
										// "groupId": "",
										// "groupName": ""
										// },
										// {
										// "groupId": "",
										// "groupName": ""
										// }
										// ],
										// "listOfConvActivity": [
										// {
										// "convActivityId": "",
										// "convActivityName": ""
										// },
										// {
										// "convActivityId": "",
										// "convActivityName": ""
										// }
										// ],
										// "convUplift": {
										// "greaterThan":
										// parseInt(urlIndex.deficit),
										// "asPercentage": false
										// },
										// "activeTillDate": {
										// "greaterThanDate": "",
										// "lessThanDate": ""
										// }
										// }
										// };
										// var func = $scope.addData;
										// if (arguments[1]) {
										// if (arguments[1].key == cacheKey) {
										// func = null;
										// } else {
										// return false;
										// }
										// }
										// DataService.getBuilddoDecision(requestData,
										// func, $scope.fail);
										// }
										// loadData();
									});

					
					

					function onClick() {
				        console.log("Clicked: " + this.index);
				        return true;
				    }
				    
				    function beforeEntry() {
				        console.log("Before entry: " + this.index);
				        return true;
				    }

				    function afterEntry() {
				        console.log("After entry: " + this.index);
				    }

				    function beforeExit() {
				        console.log("Before exit: " + this.index);
				        return true;
				    }

				    function afterExit() {
				        console.log("After exit: " + this.index);
				        if(this.index==4){
				        	$( "#stopLoop" ).trigger( "click" );
				        }
				    }

				    $(document).ready(function () {
				        var $progressDiv = $("#progressBar");
				        var $progressBar = $progressDiv.progressStep();
		                $progressBar.addStep("Initiated");
		                $progressBar.addStep("Thinking");
		                $progressBar.addStep("Analysing");
		                $progressBar.addStep("Filtering");
		                $progressBar.addStep("Generated");
				        
				        for (var stepCounter = 0; stepCounter < 5; stepCounter++) {
				            var currentStep = $progressBar.getStep(stepCounter);
				            currentStep.onClick = onClick;
				            currentStep.beforeEntry = beforeEntry;
				            currentStep.afterEntry = afterEntry;
				            currentStep.beforeExit = beforeExit;
				            currentStep.afterExit = afterExit;
				        }
				        
				        $progressBar.setCurrentStep(0);
				        $progressBar.refreshLayout();
				        
				        function resetVisited() {
				            for (var counter = 0; counter < 5; counter++) {
				                var currentStep = $progressBar.getStep(counter);
				                currentStep.setVisited(false);
				            }
				        }
				        
				        var counter = 1;
				        var intervalId = null;
				        function startLoop() {
				            if (intervalId) {
				                // continue
				            }
				            else {
				                intervalId = setInterval(function () {
				                    if (counter == 0) {
				                        resetVisited();
				                    }
				                    $progressBar.setCurrentStep(counter);
				                    counter++;
				                    if (counter > 4) {
				                        counter = 0;
				                    }
				                }, 1000);
				            }
				        }
				        
				        function stopLoop() {
				            if (intervalId) {
				                clearInterval(intervalId);
				                intervalId = null;
				            }
				        }
				        
				        $("#startLoop").click(startLoop);
				        $("#stopLoop").click(stopLoop);
				        $("#resetVisited").click(resetVisited);
				    });
				})
