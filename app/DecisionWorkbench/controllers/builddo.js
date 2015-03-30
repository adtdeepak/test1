angular.module('DecisionWorkbench')

.controller( "buildDoInit",['$scope','DataService','CustomService','ChartOptionsService','$rootScope',
                            function($scope, DataService, CustomService, ChartOptionsService, $rootScope) {
	//In utilities.js - DWPageChange
	$rootScope.$broadcast('DWPageChange', "changed");
	angular.element(document).ready(function () {
		setTimeout(function(){CustomService.appInit()},1);
	});

}])
.controller("modalController",['$scope','$rootScope','RequestConstantsFactory','DataService','DataConversionService','UtilitiesService','$element',
                               '$timeout',function($scope,$rootScope,RequestConstantsFactory, DataService,DataConversionService, UtilitiesService, $element, $timeout){

	var dOptionId;
	var currentData;
	$scope.dataLoaded = false;
	$scope.radioValue = 'selected';
	$scope.savingDO = false;
	var requestConstants = RequestConstantsFactory['NOTIFICATION'];
	var errorConstants = RequestConstantsFactory['ERROR_MSGS'];

	$rootScope.$on('TableData', function(obj, data){
		currentData = data;
	});
	$scope.options = UtilitiesService.getDataTableOptions();
	
	//Success function for getting the available channels
	$scope.channelSuccess = function(data){
		//This will get the channels in an array
		$scope.availableChannelsList = DataConversionService.toGetChannelsList(data);
		loadEditDODetails();
	}
	
	//edit DO Action success
	$scope.editDODetailsSuccess = function (data) {
		try {
			$scope.dataLoaded = true;
			$scope.error = false;
			$scope.modifyTableData = data;

			$scope.isChannelAvailable = true;
			if($scope.modifyTableData.doDetails.channelList.length == 0 || $scope.modifyTableData.doDetails.channelList[0].channelId == "na"){
				$scope.isChannelAvailable = false;
			}
			$scope.modifyData = $scope.modifyTableData.doDetails;
			//This is for selecting channel in the channel list drop down
			$scope.modifyData.channelList[0].selected = true;
			var allChannels = [];
			//Merging the channels list
			$.each($scope.availableChannelsList, function(key, eachChannel){
				if(eachChannel.channelId == $scope.modifyData.channelList[0].channelId){
					allChannels.push($scope.modifyData.channelList[0]);
				}else{
					allChannels.push(eachChannel);
				}
			})
			//This will contains the channel list
			$scope.modifyData.channelList = allChannels;
			dOptionId = data['doDetails'].doId;	
			$("select").trigger('change');
		} catch (e) {
			$scope.fail(errorConstants.DATA_ERR);
		}
	}

	//When editDO popoup is clicked
	$scope.$on('decisionModify',function(object,index){
		$scope.showError = false;
		$scope.dataLoaded = false;
		$scope.$apply();
		$scope.currentIndex = index;
		$scope.requestData = {
				"doId": index,
				"periodName":$rootScope.selectedPeriod
		};
		//Get the available channels list
		getChannelList();
	});

	//This will execute when validate DO modal dialog icon is clicked
	$scope.$on('decisionValidate',function(object,index){
		$scope.showError = false;
		$scope.error = false;
		$scope.$apply();
		//Index is the selected Doid
		$scope.validateIndex = index;
		//getCurrentData();
	});

	//This function will be used in validate do model
	function getCurrentData(){
		$.each(currentData, function(key, obj){
			$.each(obj.doId, function(doIdKey, eachDoId){
				if(obj.doId[doIdKey] == $scope.validateIndex){
					$scope.currentData  = obj;
					//Setting the current data with doIdKey - so that only it will differentiate original and edited DO
					var tempConvList = obj.targetconvList[doIdKey];
					var tempUserGroup = obj.userGroup[doIdKey]; 
					//Replacing <br> with ',' - will be displayed in current filter selection of validate DO dialog
					$scope.currentData.targetconvList = tempConvList.replace(/<br>/g, ",").replace(/\,$/g, "");
					$scope.currentData.doId =  obj.doId[doIdKey];
					$scope.currentData.convAct =  obj.convAct[doIdKey];
					$scope.currentData.convUplift = obj.convUplift[doIdKey];
					$scope.currentData.expectedNewSub = obj.expectedNewSub[doIdKey];
					$scope.currentData.userGroup = tempUserGroup.replace(/<br>/g, ",").replace(/\,$/g, "");
					$scope.$apply();
				}
			})
		})

	}
	$scope.fail = function (msg) {
		$scope.savingDO = false;
		$scope.error = true;
		$scope.hasErrorMsg = true;
		if(msg){
			if(msg instanceof Object){
				$scope.errorMsg = (msg.message == "" ? errorConstants.NETWORK_ERR  : msg.status+" : "+msg.message);
			} else {
				$scope.errorMsg = msg;
			}
		}
	}

	$scope.addValidateData = function (data) {
		if(data.status == 'OK'){
			$scope.options.aaData = [];
			$.each(data, function(key, obj){
				obj.convUpliftAchieved.trend == '+ve' ? $scope.img = "<img  src='images/arrow-up-green.png'/>"
					: $scope.img = "<img  src='images/arrow-red.png' />";
				$scope.options.aaData.push([key+1,obj.convActivityList,obj.channel,obj.tenure,obj.startDate,$scope.img+obj.convUpliftAchieved.value,$scope.img+obj.convUpliftExpected.value,obj.newSubs.subsAchieved,obj.newSubs.subsExpected]);
				$scope.error = false;
			});
			$timeout(function(){
				$(window).trigger('resize');
			},1);
			$scope.showError = false;
			$scope.dataLoaded = true;
		}
		else{
			$scope.showError = true;
			$scope.dataLoaded = true;
		}

	};
	$scope.showTable = function(){
		$scope.show = false;
	}
	
	//validateDO - will execute when "filter" in validate DO modal dialog is clicked
	$scope.validateFilter = function(fromDate, toDate){
		var fromDate =  moment(fromDate).format(window.appConstants.DATE_FORMAT);
		var toDate =  moment(toDate).format(window.appConstants.DATE_FORMAT);
		$scope.show = true;
		var convActivityList = [];
		var allCombination;
		$.each($scope.currentData.convAct, function(key, convAct){
			var tempObj = {
					"convActivityId": convAct.convActivityId,
			};
			convActivityList.push(tempObj);
		});
		allCombination = ("$scope.radioValue=='all'"?true:false);
		$scope.validateRequestData = {
				"doId": $scope.validateIndex,
				"periodName":$rootScope.selectedPeriod,
				"filter" : {
					"convActivityList" :convActivityList,
					//"convActivityAllCombination":allCombination,
					"execDtUpperBound" : fromDate,
					"execDtLowerBound" : toDate
				}
		};
		loadDecisionOptionsTableValidate();
	}

	//To save the DO, after it is edited -- editDOSaveAction -  Save
	$scope.saveDecisionOptions = function(){
		if(!userGroupForm.checkValidity()){
			$scope.savingDO = false;
			return false;
		}
		else{
			$scope.savingDO = true;
			var requestDoSave = {};
			var userGroup = [];
			$.each( $('#modifyDialog [type="number"]'), function(key, text){
				var tempObj = {
						"groupId" : text.id,
						"userCount" : text.value
				};
				userGroup.push(tempObj);
			});
			var channelId = $scope.selectChannel;
			if($scope.selectChannel == null){
				channelId = "na";
			}
			var requestDoSave = {
					"doId": dOptionId,
					"channelId": channelId,
					"userGroupList" : userGroup,
					"periodName": $rootScope.selectedPeriod
			};
			loadReviewDecisionOptionsTable(requestDoSave);
		}
	};

	//Success function for edit DO save - after edited and saved
	$scope.editDoSaveSuccess = function(result) {
		UtilitiesService.getNotifyMessage("DO Saved Successfully",requestConstants.SUCCESS);
		$scope.savingDO = false;
		if(result.status == 'OK'){
			$scope.showError= true;
			//Broadcasting - so that it could be watched and updated in builddoTableController
			$rootScope.$broadcast('loadBuilddoTable');
			$('#mask, .window').hide();
		}
		else{
			$scope.showError= true;
		}
	}

	function loadDecisionOptionsTableValidate() {
		var func = $scope.addValidateData; 
		var cacheKey = "DWDecisionTableValidate" + JSON.stringify($scope.validateRequestData);
		if (arguments[1]) { 
			if (arguments[1].key == cacheKey) { 
				func = null; 
			} else { 
				return false; 
			} 
		}
		DataService.getDecisionOptionsValidateData($scope.validateRequestData, func, $scope.fail);
	}
	
	//For populating the edit DO popup
	function loadEditDODetails() {
		var func = $scope.editDODetailsSuccess; 
		var cacheKey = "DWDecisionTableModify" + JSON.stringify($scope.requestData);
		if (arguments[1]) { 
			if (arguments[1].key == cacheKey) { 
				func = null; 
			} else { 
				return false; 
			} 
		}
		DataService.getDecisionOptionsModifyData($scope.requestData, func, $scope.fail);
	}

	//To get the available channels for the editDo popup
	function getChannelList(){
		var requestData = {};
	var cacheKey = "channelsInfo" + JSON.stringify(requestData);
		var func = $scope.channelSuccess; 
		if (arguments[1]) { 
			if (arguments[1].key == cacheKey) { 
				func = null; 
			} else { 
				return false; 
			} 
		}
		DataService.getChannelInfoData(requestData, func, $scope.fail);
	}
	
	function loadReviewDecisionOptionsTable(requestData) {
		var func = $scope.editDoSaveSuccess; 
		if (arguments[1]) { 
			if (arguments[1].key == cacheKey) { 
				func = null; 
			} else { 
				return false; 
			} 
		}
		DataService.editDOSaveAction(requestData, func, $scope.fail);
	}
}])


.controller( "achievementUpliftController",['$scope','DataService','chartsService','$rootScope','CustomService','ChartOptionsService','DataConversionService','UtilitiesService','RequestConstantsFactory',
                                  	function($scope, DataService, chartsService, $rootScope,CustomService,ChartOptionsService,DataConversionService,UtilitiesService,RequestConstantsFactory) {
	//This will check session is valid or not
	UtilitiesService.checkValidSession(location, $scope);
	var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
	$scope.dataLoaded = false;
	$rootScope.chartError = false;
	var selectedDOForUpift = [];
	var requestData = {
			"groupBy" : "cmpgnView",
	};
	var utilData = UtilitiesService.getRequestData();
	requestData = angular.extend({}, utilData, requestData);
	
	$rootScope.$on('builddoTableError', function(){
		$scope.error = true;
	})
	
	$scope.showChart = false;
	var buildDoChartOptions = ChartOptionsService.getBuildDoData();
	$scope.success = function (builddoChart) {
		$rootScope.chartError = false;
		$scope.currentAchievableChart = builddoChart;
		try {
			$scope.dataLoaded = true;
			var buildDoChartOptions = ChartOptionsService.getBuildDoData();
			$scope.$on('doInitialSelected',function(index, data ,selectedIndex){
				$scope.error = false;
				$scope.showChart = true;
				var achievableUplift = DataConversionService.toGetAchievableUplift(data, selectedIndex, $scope.currentAchievableChart['paidUsers']);
				buildDoChartOptions.xAxis.categories[4] = "Conv Uplift "+ selectedIndex;
				if(achievableUplift.data)
					chartsService.waterfall.call($("#buildDoChart"), achievableUplift,buildDoChartOptions, $scope);	
				else
					$scope.error = true;
			});
			setTimeout(function(){
				$rootScope.$broadcast('chartLoaded')
			},1);
		} catch (e) {
			$scope.fail(errorConstants.DATA_ERR);
		}
	}
	$scope.fail = function (msg) {
		$rootScope.chartError = true;
		//for enable check box in builddo table
		$rootScope.chartLoading = false;
		$scope.error = true;
		$scope.hasErrorMsg = true;
		$rootScope.$emit('chartError');
		if(msg){
			if(msg instanceof Object){
				$scope.errorMsg = (msg.message == "" ? errorConstants.NETWORK_ERR  : msg.status+" : "+msg.message);
			} else {
				$scope.errorMsg = msg;
			}
		}
	}
	function loadData() {
		var func = $scope.success; 
		DataService.getBuildDoChartData(requestData, func,$scope.fail);
	}
	loadData();

	$scope.$on('doSelected',loadCombinedDO);
	$scope.addChart = function(data){
		$rootScope.selectedDODetails = data;
		$scope.dataLoaded = true;
		$scope.error = false;
		$rootScope.chartLoading = false;
		$scope.showChart = true;
		$scope.currentData =  data;
		var achievableUplift = DataConversionService.toGetChartFromCombinedDO($scope.currentData, $scope.currentAchievableChart['paidUsers']);
		buildDoChartOptions.xAxis.categories[4] = "Conv Uplift "+ selectedDOForUpift;
		
		if(achievableUplift.data){
            $rootScope.chartError = false;
			chartsService.waterfall.call($("#buildDoChart"), achievableUplift, buildDoChartOptions, $scope);	
		}
        else{
            $scope.error = true;
			$rootScope.chartError = true;
		}
	}
	
	var combinedDOLength = 0;
	function loadCombinedDO(event, selectedIndex){
		if(selectedIndex.length != combinedDOLength){
			console.log("ppp getCombinedDO", selectedIndex)
			$scope.dataLoaded = false;
			$scope.error = false;
			combinedDOLength = selectedIndex.length;
			selectedDOForUpift = selectedIndex;
			$rootScope.selectedIndexIds = selectedIndex;
			var requestData = {
					"doIdList":selectedIndex
			};
			var func = $scope.addChart; 
			//If no DO is selected
			if(selectedIndex.length == 0){
				var result = {};
				var convUplift = {
						"value":"0",
						"trend":"+ve"
				};
				result['convUplift'] = convUplift;
				$scope.addChart(result);
			}else{
				DataService.getCombinedDO(requestData, func,$scope.fail);
			}
		}
	}
}])

.controller( "reviewPanel", ['$scope','$rootScope','RequestConstantsFactory','DataService','UtilitiesService','$compile','$element','$location','sharedProperties',
                             	function($scope, $rootScope, RequestConstantsFactory, DataService, UtilitiesService, $compile, $element, $location, sharedProperties) {

	var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
	$scope.dataLoaded = false;
	$scope.reviewPaneloptions = {
			"columns": [
			            { "width": "30px" },
			            { "width": "80px" },
			            null
			            ],
			            sScrollY : '60px',
			            bPaginate: false,
			            bScrollCollapse: true,
			            dom: '<"dataTableContainer"t><"dataTablePaginateContainer"p>'
	};
	$scope.isDataInReviewPanelTable = false;
	$scope.options = UtilitiesService.getDataTableOptions();
	$.extend(true,$scope.options,$scope.reviewPaneloptions);
	$scope.addData = function (data) {
		try{
			var obj = data;
			$scope.options.aaData = [];
			if(data.length == 0){
				$scope.options.aaData.push(['','','']);
			}
			if(data.length){
				$scope.isDataInReviewPanelTable = true;
				$.each(data, function(key, obj){
					$scope.options.aaData.push(["<input type='checkbox' ng-model='tableData["+key+"].selected'>",
					                            obj.number,
					                            "<img  src='images/arrow-up-green.png'/>"+obj.uplift+" / "+obj.newSubs]);
				})
			}
			$scope.dataLoaded = true;
		}
		catch(e){
			$scope.fail(errorConstants.DATA_ERR);
		}
	};

	$scope.reviewTableData = [];
	$scope.addData($scope.reviewTableData);
	$scope.removeSelected = function() {
		$scope.isDataInReviewPanelTable = false;
		var reviewTableData = [];
		angular.forEach($scope.reviewTableData, function(eachRow) {
			if(eachRow.selected == false) {
				reviewTableData.push(eachRow);
			}
		});
		$scope.reviewTableData = reviewTableData;
		$scope.addData(reviewTableData);
	};
	$scope.fail = function (msg) {
		$scope.isDataInReviewPanelTable = false;
		$scope.error = true;
		$scope.hasErrorMsg = true;
		if(msg){
			if(msg instanceof Object){
				$scope.errorMsg = (msg.message == "" ? errorConstants.NETWORK_ERR  : msg.status+" : "+msg.message);
			} else {
				$scope.errorMsg = msg;
			}
		}
	}
	//adds the selected dos to the review panel
	$scope.addSelectedDOs = function() {
		//Checking whether the chart is loaded or not
		if($rootScope.chartError == true){
			return false;
		}
		var expectedNewSub;
		if($rootScope.selectedDODetails) {
			var selectedDO = {
					"number" : "",
					"uplift" : 0,
					"newSubs" : 0,
					"selected" : true
			};
			
			selectedDO.number = $rootScope.selectedIndexIds;
			selectedDO.uplift = $rootScope.selectedDODetails.convUplift.value;
			selectedDO.newSubs = $rootScope.selectedDODetails.expectedNewSub;
			//adds the selected DOs to the review panel
			var hasDO = false;
			//This to avoid the duplication entry in the table
			angular.forEach($scope.reviewTableData, function(DO) {
				var selectedNumber = selectedDO.number;
				var doNumber = DO.number;
				if(UtilitiesService.containsAll(selectedNumber, doNumber)){
					hasDO = true;
				}
			});
			//If there is no duplicate entry
			if(!hasDO && $rootScope.selectedIndexIds.length!=0) {
				//Then update the table - review panel
				$scope.reviewTableData.push(selectedDO);
				$scope.addData($scope.reviewTableData);
			}
		}
	};

	function onSaveSuccess() {
		$scope.dataLoaded = true;
		$location.path("/review-do");
	}

	//Save and view review panel function
	$scope.save = function() {
		$scope.dataLoaded = false;
		var request = {
				"doIdList": [        
				             ],
				             "filter": "executed"
		}
		//Looping the review panel table datas
		$scope.reviewTableData.forEach(function(doObj){
			var singleDOArray = [];
			//Getting through each doId in each row
			doObj.number.forEach(function(doNumber) {
				var reviewedDOObj = {};
				//Putting doId as an object
				reviewedDOObj["doId"] = doNumber;
				singleDOArray.push(reviewedDOObj);
			});
			request.doIdList.push(singleDOArray);
		});
		//Setting the request in shared Properties - it will be used in reviewdo page
		sharedProperties.setReviewDORequest(request);
		console.log("ppp getReviewDORequest:", sharedProperties.getReviewDORequest())
		//This will redirect to the reviewdo page
		onSaveSuccess();
		//DataService.saveSelectedDO(request, $scope, onSaveSuccess);
	}

}])

.controller("buildDoTableController",['$scope', '$element','$rootScope','$location','RequestConstantsFactory','DataService','sharedProperties','UtilitiesService','DataConversionService',
                                      function($scope, $element, $rootScope, $location, RequestConstantsFactory, DataService, sharedProperties, UtilitiesService, DataConversionService) {
	sharedProperties.setRequestDO("");
	var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
	var notifyRequestConstants = RequestConstantsFactory['NOTIFICATION'];
	$scope.dataLoaded = false;
	$scope.options = UtilitiesService.getDataTableOptions();
    //Sort by expected new subs default
    $scope.options.aaSorting = [[ 4, "desc" ]];
	$scope.fail = function (msg) {
		$scope.error = true;
		$scope.hasErrorMsg = true;
		if(msg){
			if(msg instanceof Object){
				$scope.errorMsg = (msg.message == "" ? errorConstants.NETWORK_ERR  : msg.status+" : "+msg.message);
			} else {
				$scope.errorMsg = msg;
			}
		}
	}
	$scope.$on('chartLoaded', function () {
		$rootScope.chartLoading = false;
		var selectedIndex = [];
		var actualData = [];
		$rootScope.selectDOs = [];
		$rootScope.$on('builddoTableData', function (event, tableData) {
			$scope.addData(tableData);
		});
		//If the user selects "show best decision options"
		$rootScope.$on('loadDOWithoutFilters', loadData);

		$scope.addData = function (data, tableReloadInternalCall) {
			try {
				$scope.dataLoaded = true;
				$rootScope.$broadcast('TableData', data);
				actualData = data;
				console.log('actualData:', actualData)
				$scope.error = false;
				$scope.options.aaData = [];
				selectedIndex = [];
				$rootScope.selectDOs = [];
				//If there is no data in builddo table
				if(data.length == 0){
					$scope.error = true;
					$rootScope.$emit('builddoTableError');
					throw "noDataError";
				}
				$.each(data, function(key, obj){
					var convActListText = '';
					var userGroupListText = '';
					var channelListText = '';
					var doIdListText = '';
					var actionSection = '';
					var actionSectionText = '';
					var newSubsText = '';
					var usersTargetedText = '';
					var convUpliftText = '';
					
					//For splitting the rows if more then DO is found - generally Original and edited DO
					$.each(obj.doId, function(key, eachconvAct){
						var doId = obj.doId[key];
						var editSection = "<a href='#' data-modal='#modifyDialog' name='modal' data-id='"+obj.doId[key]+"' class='edit' title='Edit'></a>";
						convActListText += "<div class='rowSplit'>"+obj.targetconvList[key]+"</div>";
						userGroupListText += "<div class='rowSplit'>"+obj.userGroup[key]+"</div>";
						channelListText += "<div class='rowSplit'>"+obj.channelList[key]+"</div>";
						//Key will be 1 - only if the DO is an edited DO
						if(key == 1){
							doId += '<br>(Edited)';
							//Disabling the modify button
							editSection = "<a href='#' data-id='"+obj.doId[key]+"' class='edit img-disable' title='cannot be edited'></a>";
						}
						doIdListText += "<div class='rowSplit'>"+doId+"</div>";
						newSubsText += "<div class='rowSplit'>"+obj.expectedNewSub[key]+"</div>";
						usersTargetedText += "<div class='rowSplit'>"+obj.usersTargetted[key]+"</div>";
						
						obj.convUplift[key].trend == '+ve' ? $scope.img = "<img  src='images/arrow-up-green.png'/>"
							: $scope.img = "<img  src='images/arrow-red.png' />";
						
						
						convUpliftText += "<div class='rowSplit'>"+($scope.img+obj.convUplift[key].value)+"</div>";
						
						actionSection = editSection +"<a title='Validate' href='#' data-modal='#dialog' data-id='"+obj.doId[key]+"'"
	                    +"name='modal' class='save'> </a> <input type='checkbox' ng-model='DORow_"+obj.doId[key]+"' id='DORow_"+obj.doId[key]+"' ng-checked='"+obj.checked[key]+"' ng-disabled='otherData' data-id='"+obj.doId[key]+"' ng-click=\"tableData('"+obj.doId[key]+","+key+"')\"/>";						
						actionSectionText += "<div class='rowSplit'>"+actionSection+"</div>";
						
						if(obj.checked[key]) {
							//$rootScope.selectDOs.push(obj);
							selectedIndex.push(obj.doId[key]);
						}
					})
					
					
					$scope.options.aaData.push([doIdListText,convActListText,channelListText,userGroupListText,newSubsText,usersTargetedText,convUpliftText,actionSectionText]);
				})
				//To notify only after the table load from API response - if it is internal reload, it should not notify
				if(tableReloadInternalCall != true){
					//Initial broadcast should be done only if the response is from API
//					$rootScope.$broadcast('doInitialSelected', data, selectedIndex);
					$rootScope.$broadcast('doSelected', selectedIndex);
				}
			} catch (e) {
				$scope.fail(errorConstants.DATA_ERR);
			}
		};

		var isEditedDoAlreadySelected = false;
		//when the checkbox in the row is checked or unchecked
		$scope.getDONumber = function(doIdWithInfo) {
			var doId = doIdWithInfo.split(',')[0];
			var isEdited = doIdWithInfo.split(',')[1] == 1?true:false;
			
			if(isEditedDoAlreadySelected && !($('#DORow_'+ doId).is(':checked'))){
				//This if will leave only one selected editedDO - make it unchecked
			}else if(($('#DORow_'+ doId).is(':checked') && isEdited && selectedIndex.length>0) || isEditedDoAlreadySelected) {
				$('#DORow_'+ doId).prop('checked', false);
				UtilitiesService.getNotifyMessage("Edited DO combinations are not allowed",notifyRequestConstants.FAILURE);
				return false;
			}
			if($('#DORow_'+ doId).is(':checked') && isEdited){
				isEditedDoAlreadySelected = true;
			}else{
				isEditedDoAlreadySelected = false;
			}
			actualData.forEach(function(data){
				$.each(data.doId, function(key, value){
					if(doId == data.doId[key]) {
						if($('#DORow_'+ doId).is(':checked')) {
							/*
							 * (data.checked[key] = true) - To be remembered even after user goes to the next page in table
							 * Generally the table content reloads when user goes to the next page
							 * This should be done to prevent any loss of checked/unchecked row that is made after API response
							 * */
							data.checked[key] = true;
							//$rootScope.selectDOs.push(data.doId[key]);
							selectedIndex.push(doId);
						} else {
							data.checked[key] = false;
							selectedIndex = [];
							//This is for adding the checked DO's in the 'selectedIndex' array - retrieving from the table DO data 
							actualData.forEach(function(data){
								$.each(data.doId, function(key, value){
									if(data.checked[key]) {
										//Pushing into selected Index
										selectedIndex.push(data.doId[key]);
									}
								})
							})
						}
					}
				})
			});
			
			$rootScope.chartLoading = true;
			$rootScope.$broadcast('doSelected', selectedIndex);
			//To reload the contents of the table after change is made (checked/ unchecked row) and sending "tableReloadInternalCall" as "true".
			$scope.addData(actualData, true);
			return true;
		}
		
		$scope.$watch(
				function () {
				    return sharedProperties.getRequestDO();
				},
				function (newValue) {
					//Check and proceed after newValue is not empty 
					if(!UtilitiesService.isObjectEmpty(newValue)){
					    loadData();
					}
				}
			);
		
		function loadData() {
			var urlIndex = $location.search();
			if(!UtilitiesService.isObjectEmpty(sharedProperties.getRequestDO())){
				var requestData = sharedProperties.getRequestDO();
			}else{
				var periodDataObj = {"periodName": $rootScope.selectedPeriod,"reportingInterval":"weekly"};
				console.log('periodDataObj',periodDataObj)
				var requestData = {
						"mode": "freemium",
						"timeRange": UtilitiesService.getSelectedPeriodRequestData(),
						"filter": {
							"listOfUserGroups": [],
							"listOfConvActivity": [],
							"convUplift": {},
						}
				};
			}
			
			
			var func = $scope.addData; 
			if (arguments[1]) { 
				if (arguments[1].key == cacheKey) { 
					func = null; 
				} else { 
					return false; 
				} 
			}
			DataService.getBuilddoDecision(requestData, func, $scope.fail);
		}
		
		//After editDOSave is done - from the $scope.editDoSaveSuccess
		$rootScope.$on('loadBuilddoTable',function(){
			$scope.dataLoaded = false;
			//Triggering builddo update
			loadData();
		})
		loadData();
	});
}])










