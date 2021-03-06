angular.module('DecisionWorkbench')

.service('DataConversionService',['ChartOptionsService','UtilitiesService','$rootScope','RequestConstantsFactory', function ( ChartOptionsService, UtilitiesService,$rootScope,RequestConstantsFactory) {

	this.toReviewDODeepDrive  = function(data) {
		$.each(data.doList, function(key, obj) {
			var targetConvActivityListText = [];
			var status;
			obj.targetConvActivityList.forEach(function(activity) {
				targetConvActivityListText.push(activity.convActivityName);
			});
			obj['targetConvActivityListText'] = targetConvActivityListText;
			var channelListText = [];
			obj.channelList.forEach(function(channel) {
				channelListText.push(channel.channelName);
			});
			obj['channelListText'] = channelListText;
			var userGroupListText = [];
			obj.userGroupList.forEach(function(userGroup) {
				userGroupListText.push(" "+userGroup.groupName);
			});
			obj['userGroupListText'] = userGroupListText;
			var cost = [];
			obj.cost.forEach(function(eachCost) {
				cost.push(eachCost.value);
			});
			obj['cost'] = cost;
			var usersTargeted = [];
			obj.usersTargeted.forEach(function(eachUsersTargeted) {
				usersTargeted.push(eachUsersTargeted.value);
			});
			obj['usersTargeted'] = usersTargeted;
			var campaignDuration = [];
			obj.campaignDuration.forEach(function(eachCampaignDuration) {
				campaignDuration.push(eachCampaignDuration.value);
			});
			obj['campaignDuration'] = campaignDuration;
			$.each(obj.approvalStatus, function(key, approval){
				if(approval.currentStatus == 'completed'){
					status = true;
				}
				else{
					obj['approval'] = 'No';
					return false;
				}
			});
			if(status){
				obj['approval'] = 'Yes';
			}
		});
		return data;
	}

	this.toGetTopLeastEngagedData = function ( data ){
		var _data = [];
		$.each(data, function(key, obj){

			var tempObj = {
					name : obj.name,
					data : [ [ 0, obj.value, obj.value ] ],
			}
			_data.push(tempObj);
		});

		return _data;
	}
	
	this.toGetReviewDoBubble = function (data,index){
		var _data = [];
		var _decision ={};
		var selectedPeriod = $rootScope.selectedPeriod;
		var newSubs = 0;
		var cost = 0;
		var tenure = 0;
		var _data = [];
		$.each(data, function(key, value) {
			$.each(index,function(object,selected){
				if(selected == data[key].doId){
					cost =value.cost.replace(/,/g , "")
					newSubs = value.expectedNewSub;
					tenure = value.tenure;
					_decision = {
							cost : parseInt(cost),
							subs : parseInt(newSubs),
							time : parseInt(tenure),
							label: tenure
					};
					_data.push(_decision);
				}
			});

		})
		console.log('_data',_data)
		return _data;
	}
	this.toGetAchievableUplift = function (data, index, chartData){
		
		var requestConstants = RequestConstantsFactory['BUILDDO'];
		var selectedPeriod = $rootScope.selectedPeriod;
		var upLift ="0";
		var deficit;
		var current;
		var baseExpected;
		var actualUplift;
		var expectedNewSub;
		var _data = [];
		$.each(data, function(key, value) {
			$.each(index,function(object, selected){
				if(selected == data[key].doId){
					expectedNewSub  = UtilitiesService.getIntFromString(data[key].expectedNewSub);
					upLift = parseInt(upLift) + expectedNewSub;
				}
			});
		})
		_data['actualUplift'] = upLift;
		if(chartData[selectedPeriod]){
			$.each(chartData[selectedPeriod], function(key, value) {
					if(value.id == requestConstants.WATERFALL_DEFICIT){
						deficit = parseInt(upLift)-parseInt(value.y);
					}
					if(value.id == requestConstants.WATERFALL_CURRENT){
						current = parseInt(value.y);
					}
					if(value.id == requestConstants.WATERFALL_BASE_EXPECTED){
						baseExpected = parseInt(value.y);
					}
					achievable = current + baseExpected;
					if(value.id == requestConstants.WATERFALL_CONVERSION_UPLIFT){
						if(index.length == 0){
							value.y = 0;
						}
						else{
							value.y = deficit;
						}
					}
					if(value.id == requestConstants.WATERFALL_ACHIEVABLE){
						value.y = achievable + parseInt(upLift);
					}
			})
		}
		_data['data']= chartData[selectedPeriod];
		return _data;
	}
	
	this.toGetChartFromCombinedDO = function (data, chartData){

		var requestConstants = RequestConstantsFactory['BUILDDO'];
		var selectedPeriod = $rootScope.selectedPeriod;
		var upLift ="0";
		var deficit;
		var current;
		var baseExpected;
		var actualUplift;
		var expectedNewSub;
		var _data = [];
		upLift = data.convUplift.value;
		_data['actualUplift'] = upLift;
		if(chartData[selectedPeriod]){
			$.each(chartData[selectedPeriod], function(key, value) {
				if(value.id == requestConstants.WATERFALL_DEFICIT){
					deficit = parseInt(upLift)-parseInt(value.y);
				}
				if(value.id == requestConstants.WATERFALL_CURRENT){
					current = parseInt(value.y);
				}
				if(value.id == requestConstants.WATERFALL_BASE_EXPECTED){
					baseExpected = parseInt(value.y);
				}
				achievable = current + baseExpected;
				if(value.id == requestConstants.WATERFALL_CONVERSION_UPLIFT){
						value.y = deficit;
				}
				if(value.id == requestConstants.WATERFALL_ACHIEVABLE){
					value.y = achievable + parseInt(upLift);
				}
				console.log("value.y",value.y, deficit);

			})
		}
		_data['data']= chartData[selectedPeriod];
		return _data;
	}
	
	this.toGetBuildDoDecision = function (data){

		var _data = [];

		$.each(data.doList, function(index, doList) {
			var _decision = {};
			var actListString ='';
			//convList - will be used for validate DO dialog
			var convList = [];
			var actList =[];
			var userGroupListString = '';
			var userGroupList =[];
			var channel = [];
			var doId = [];
			var isChecked = [];
			var expectedNewSub = [];
			var usersTargeted = [];
			var convUplift = [];
			
			doId.push(doList.doId);
			expectedNewSub.push(doList.expectedNewSub);
			usersTargeted.push(doList.usersTargeted);
			convUplift.push(doList.convUplift);
			
			$.each(doList.userGroupList, function(key, activities) {
				userGroupListString += doList.userGroupList[key].groupName.trim().substring(10)+"<br>";
			});
			userGroupList.push(userGroupListString);
			
			$.each(doList.targetConvActivityList, function(key, activities) {
				actListString += doList.targetConvActivityList[key].convActivityName+"<br>";
				//convListString += doList.targetConvActivityList[key];
			});
			actList.push(actListString);
			convList.push(doList.targetConvActivityList);
			//If there is no channel list
			if(doList.channelList){
				$.each(doList.channelList, function(key, activities) {
					channel.push(doList.channelList[key].channelName);
				});
			}else{
				channel.push("No Channels Available");
			}
			$.each(data.bestDOList, function(key, bestDO) {
				selected = false;
				if(bestDO.doId == doList.doId) {
					selected = true;
				}
				isChecked.push(selected);
			});
			
			
			if(doList.editedDoList && doList.editedDoList.length > 0){
				actListString = '';
				userGroupListString = '';
				var editedDoList = doList.editedDoList[0];
				
				doId.push(editedDoList.doId);
				expectedNewSub.push(editedDoList.expectedNewSub);
				usersTargeted.push(editedDoList.usersTargeted);
				convUplift.push(editedDoList.convUplift);
				
				$.each(editedDoList.userGroupList, function(key, activities) {
					userGroupListString += editedDoList.userGroupList[key].groupName.trim().substring(10)+"<br>";
				});
				userGroupList.push(userGroupListString);
				
				$.each(editedDoList.targetConvActivityList, function(key, activities) {
					actListString += editedDoList.targetConvActivityList[key].convActivityName+"<br>";
				});
				actList.push(actListString);
				convList.push(editedDoList.targetConvActivityList);
				//If there is no channel list
				if(editedDoList.channelList){
					$.each(editedDoList.channelList, function(key, activities) {
						channel.push(editedDoList.channelList[key].channelName);
					});
				}else{
					channel.push("No Channels Available");
				}
				$.each(data.bestDOList, function(key, bestDO) {
					selected = false;
					if(bestDO.doId == editedDoList.doId) {
						selected = true;
					}
					isChecked.push(selected);
				});
			}

			_decision = {
					targetconvList : actList,
					userGroup : userGroupList,
					channelList : channel,
					convUplift : convUplift,
					expectedNewSub : expectedNewSub,
					usersTargetted : usersTargeted,
					doId : doId,
					checked : isChecked,
					convAct : convList

			};
			_data.push(_decision);
		});
		_data['status'] = data.status;
		console.log("_data:", _data)
		return _data;
	}
	this.toGetCommaSeparated = function(data) {
		var _data=[];
		$.each(data, function(key, obj){
			_data.push(obj);
			$.each(obj, function(index, column){
				obj[index] = UtilitiesService.getLocaleString(obj[index]);

			});
		});
		return _data;
	}
	
	this.toGetCommaSeparatedForDO = function(data) {
		var _data=[];
		$.each(data, function(key, obj){
			_data.push(obj);
			$.each(obj, function(index, column){
				if(index != 'doId'){
					obj[index] = UtilitiesService.getLocaleString(obj[index]);
				}
			});
		});
		return _data;
	}

	this.toGetBuildDoDecisionValidateData = function (data){

		var _data = [];
		var _decision = {};
		var convActivityList;
		var channel;
		$.each(data.doList, function(index, doList) {
			convActivityList = "";
			channel ="";
			$.each(data.doList[index].convActivityList, function(key, activities) {
				convActivityList = convActivityList.concat(doList.convActivityList[key].convActivityName+",");
			});
			$.each(data.doList[index].channelList, function(key, activities) {
				channel = channel.concat(doList.channelList[key].channelName+",");
			});
			_decision ={
					doId:doList.doId.trim().substring(2),
					convActivityList :convActivityList.substring(0, convActivityList.length-1),
					channel :channel.substring(0, channel.length-1),
					tenure : doList.tenure,
					startDate: doList.startDate,
					convUpliftExpected : doList.convUpliftExpected,
					convUpliftAchieved :doList.convUpliftAchieved,
					newSubs : doList.newSubs,
			};
			_data.push(_decision);
		});
		_data['status'] = data.status;
		return _data;
	}
	this.toGetTopLeastEngagedUserData = function ( data ){
		var _data = [];

		$.each(data, function(key, obj){
			var tempObj = {
					name : obj.name,
					data : [ [ 0, obj.value, obj.value ] ],
			}
			_data.push(tempObj);
		});

		return _data;
	}
	
	//To get the channels array from the channel list response
	this.toGetChannelsList = function(data){
		var channelList = [];
		$.each(data.channelList, function(key, eachChannel){
			var tempObj = {
					"channelId":eachChannel.channelId,
					"channelName":eachChannel.channelType,
					"selected":false
			};
			channelList.push(tempObj);
		})
		return channelList;
	}
	
	this.toGetBuildDoChartData = function(data) {
		var requestConstants = RequestConstantsFactory['BUILDDO'];
		var resultData = {};
		var BuildDoChartData = {};
		$.each(data.timeRanges, function(key, timeRange){
			var chartData = [];
			var isValueTargetApplicable = true;
			var isValueTillDateApplicable = true;
			var isValueDeficitApplicable = true;
			var isValueExpectedApplicable = true;
			$.each(timeRange.data, function(key, eachData){
				if(eachData.paidUsers.valueTarget == "na"){
					eachData.paidUsers.valueTarget = 0.0;
					isValueTargetApplicable = false;
				}
				if(eachData.paidUsers.valueTillDate == "na"){
					eachData.paidUsers.valueTillDate = 0.0;
					isValueTillDateApplicable = false;
				}
				if(eachData.paidUsers.valueDeficit == "na"){
					eachData.paidUsers.valueDeficit = 0.0;
					isValueDeficitApplicable = false;
				}
				if(eachData.paidUsers.valueExpected == "na"){
					eachData.paidUsers.valueExpected = 0.0;
					isValueExpectedApplicable = false;
				}
				//for set goals chart Data
				chartData.push({
					id : requestConstants.WATERFALL_CURRENT,
					name:requestConstants.WATERFALL_CURRENT,
					y : parseInt(eachData.paidUsers.valueTillDate),
					color : '#149ae3',
					isApplicable : isValueTillDateApplicable
				}, {
					id : requestConstants.WATERFALL_BASE_EXPECTED,
					y : parseInt(eachData.paidUsers.valueExpected),
					color : '#149ae3',
					isApplicable : isValueExpectedApplicable
				}, {
					id : requestConstants.WATERFALL_DEFICIT,
					y : parseInt(eachData.paidUsers.valueDeficit),
					color : '#fb7d7d',
					isApplicable : isValueDeficitApplicable
				}, {
					id : requestConstants.WATERFALL_TARGET,
					y : parseInt(eachData.paidUsers.valueTarget),
					//isSum : true,
					color : '#149ae3',
					isApplicable : isValueTargetApplicable
				}, {
					id : requestConstants.WATERFALL_ACHIEVABLE,
					isSum:true,
					y : parseInt(eachData.paidUsers.valueTillDate) + parseInt(eachData.paidUsers.valueExpected),
					color : '#1B6395'
				},{
					id : requestConstants.WATERFALL_TARGET,
					isSum : true,
					color : '#149ae3'
				});

				
				/*//for set goals chart Data
				chartData.push({
					id : requestConstants.WATERFALL_CURRENT,
					y : parseInt(eachData.paidUsers.valueTillDate),
					color : '#149ae3'
				}, {
					id : requestConstants.WATERFALL_BASE_EXPECTED,
					y : parseInt(eachData.paidUsers.valueExpected),
					color : '#149ae3'
				}, {
					id : requestConstants.WATERFALL_DEFICIT,
					y : parseInt(eachData.paidUsers.valueDeficit),
					color : '#fb7d7d'
				}, {
					id : requestConstants.WATERFALL_TARGET,
					isSum : true,
					color : '#149ae3'
				},{
					id : requestConstants.WATERFALL_CONVERSION_UPLIFT,
					y :0,
					color : '#32cabb'
				}, {
					id : requestConstants.WATERFALL_ACHIEVABLE,
					isSum:true,
					y : parseInt(eachData.paidUsers.valueTillDate) + parseInt(eachData.paidUsers.valueExpected),
					color : '#1B6395'
				} );*/

			})
			BuildDoChartData[timeRange.periodName]= chartData;

		});
		resultData['paidUsers'] = BuildDoChartData;
		return resultData;
	}

	this.toGetSetGoalsChartData = function(data) {
		var requestConstants = RequestConstantsFactory['BUILDDO'];
		var resultData = {};
		var setGoalsChartData = {};
		var showingPeriodData = {};
		var engagedUserGroupsData = {};
		var engagedActivitiesData = {};
		$.each(data.timeRanges, function(key, timeRange){
			var chartData = [];
			var periodData = [];
			var engagedUserGroups = [];
			var engagedActivities =[];
			//Variable used for checking 'is Applicable'
			var isValueTargetApplicable = true;
			var isValueTillDateApplicable = true;
			var isValueDeficitApplicable = true;
			var isValueExpectedApplicable = true;
			
			$.each(timeRange.data, function(key, eachData){
				if(eachData.paidUsers.valueTarget == "na"){
					eachData.paidUsers.valueTarget = 0.0;
					isValueTargetApplicable = false;
				}
				if(eachData.paidUsers.valueTillDate == "na"){
					eachData.paidUsers.valueTillDate = 0.0;
					isValueTillDateApplicable = false;
				}
				if(eachData.paidUsers.valueDeficit == "na"){
					eachData.paidUsers.valueDeficit = 0.0;
					isValueDeficitApplicable = false;
				}
				if(eachData.paidUsers.valueExpected == "na"){
					eachData.paidUsers.valueExpected = 0.0;
					isValueExpectedApplicable = false;
				}
				//for set goals chart Data
				chartData.push({
					id : requestConstants.WATERFALL_CURRENT,
					name:requestConstants.WATERFALL_CURRENT,
					y : parseInt(eachData.paidUsers.valueTillDate),
					color : '#149ae3',
					isApplicable : isValueTillDateApplicable
				}, {
					id : requestConstants.WATERFALL_BASE_EXPECTED,
					y : parseInt(eachData.paidUsers.valueExpected),
					color : '#149ae3',
					isApplicable : isValueExpectedApplicable
				}, {
					id : requestConstants.WATERFALL_DEFICIT,
					y : parseInt(eachData.paidUsers.valueDeficit),
					color : '#fb7d7d',
					isApplicable : isValueDeficitApplicable
				}, {
					id : requestConstants.WATERFALL_TARGET,
					y : parseInt(eachData.paidUsers.valueTarget),
					//isSum : true,
					color : '#149ae3',
					isApplicable : isValueTargetApplicable
				});

				//data of the selected period 
				if(isValueTargetApplicable){
					var targetValue = UtilitiesService.getLocaleString(parseInt(eachData.paidUsers.valueTarget));
				}else{
					var targetValue = "Not Applicable";
				}
				if(isValueDeficitApplicable){
					var deficitValue = UtilitiesService.getLocaleString(parseInt(eachData.paidUsers.valueDeficit));
				}else{
					var deficitValue = "Not Applicable";
				}
				periodData.push({
					name :"Target",
					value : targetValue
				},{
					name :"Deficit",
					value : deficitValue
				},{
					name :"Maximum Uplift",
					value : parseFloat("0" + eachData.paidUsers.covUplift).toFixed(10)
				});

				//datas of top and least engaged activities
				$.each(eachData.engagedActivities , function(key, eachActivity){
					var tempObj = {
							name : eachActivity.activityName ,
							data : [ [ 0, parseInt(eachActivity.value), parseInt(eachActivity.value) ] ],
					}
					engagedActivities.push(tempObj);
				});

				//datas of top and least engaged user groups
				$.each(eachData.engagedUserGroups, function(key, eachUserGroup){
					var tempObj = {
							name : eachUserGroup.groupName ,
							data : [ [ 0, parseInt(eachUserGroup.value), parseInt(eachUserGroup.value) ] ],
					}
					engagedUserGroups.push(tempObj);
				});

			})
			setGoalsChartData[timeRange.periodName]= chartData;
			showingPeriodData[timeRange.periodName]= periodData;
			engagedUserGroupsData[timeRange.periodName]= engagedUserGroups;
			engagedActivitiesData[timeRange.periodName]= engagedActivities;

		});
		resultData['paidUsers'] = setGoalsChartData;
		resultData['showingPeriodData'] = showingPeriodData;
		resultData['engagedUserGroups'] = engagedUserGroupsData;
		resultData['engagedActivities'] = engagedActivitiesData;
		return resultData;
	}

}]);