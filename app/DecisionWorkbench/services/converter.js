angular.module('DecisionWorkbench')

.service('DataConversionService', function ( ChartOptionsService, UtilitiesService,$rootScope,RequestConstantsFactory) {

	this.toReviewDODeepDrive  = function(data) {
		$.each(data.doList, function(key, obj) {
			var targetConvActivityListText = [];
			var status;
			obj.targetConvActivityList.forEach(function(activity) {
				//targetConvActivityListText.push(activity.convActivityName+'<br>');
				targetConvActivityListText = targetConvActivityListText + activity.convActivityName+'<br>';
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
							label: tenure,
							name : data[key].doId
					};
					_data.push(_decision);
				}
			});

		})
		console.log('_data',_data)
		return _data;
	}
	this.toGetAchievableUplift = function (data,index,chartData){

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
		$.each(index,function(object,selected){
		if(selected == data[key].doId){
		expectedNewSub = UtilitiesService.getIntFromString(data[key].expectedNewSub);
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
		value.y = upLift;
		//value.y = deficit;
		}
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
		var _decision = {};
		var actList ;
		var userGroupList ;
		var channel;

		$.each(data.doList, function(index, doList) {
			console.log("data.doList", data.doList)
			actList = "";
			userGroupList ="";
			channel ="";
			selected = false;

			$.each(doList.userGroupList, function(key, activities) {
				userGroupList = userGroupList.concat(doList.userGroupList[key].groupName);
			});
			$.each(doList.targetConvActivityList, function(key, activities) {
				actList = actList.concat(doList.targetConvActivityList[key].convActivityName+"<br>");
			});
			$.each(doList.channelList, function(key, activities) {
				channel = channel.concat(doList.channelList[key].channelName+"<br>");
			});
			$.each(data.bestDOList, function(key, bestDO) {
				$.each(bestDO.doId, function(key, eachBestDO) {
					if(eachBestDO == doList.doId) {
						selected = true;
					}
				})
			});

			_decision = {
					targetconvList : actList,
					userGroup : userGroupList,
					channelList : channel,
					convUplift : doList.convUplift,
					expectedNewSub : doList.expectedNewSub,
					usersTargetted : doList.usersTargeted,
					doId : doList.doId,
					checked : selected,
					convAct : doList.targetConvActivityList,
					regions :doList.regions

			};
			_data.push(_decision);
		});
		_data['status'] = data.status;
		console.log('CONVERET',_data)
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
	
	this.toGetBuildDoChartData = function(data) {
		var requestConstants = RequestConstantsFactory['BUILDDO'];
		var resultData = {};
		var BuildDoChartData = {};
		$.each(data.timeRanges, function(key, timeRange){
			var chartData = [];
			var periodData = [];
			var engagedUserGroups = [];
			var engagedActivities =[];
			$.each(timeRange.data, function(key, eachData){

				//for set goals chart Data
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
					//y : parseInt(eachData.paidUsers.valueTillDate) + parseInt(eachData.paidUsers.valueExpected),
					color : '#1B6395'
				} );

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
			$.each(timeRange.data, function(key, eachData){

				//for set goals chart Data
				chartData.push({
					id : requestConstants.WATERFALL_CURRENT,
					name:requestConstants.WATERFALL_CURRENT,
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
					//y : parseInt(eachData.paidUsers.valueTarget),
					isSum : true,
					color : '#149ae3'
				});

				//data of the selected period 
				periodData.push({
					name :"Goal",
					value : parseInt(eachData.paidUsers.valueTarget)
				},{
					name :"Deficit",
					value : parseInt(eachData.paidUsers.valueDeficit)
				},{
					name :"Maximum Uplift",
					value : parseInt(eachData.paidUsers.uplift)
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
	};
	
	this.getHorizontalBarChartData = function(data){
	    var resultData = {};
	    var xAxisData = data.name;
	    var values = data.values;
	    resultData['xAxisData'] = xAxisData;
	    resultData['data'] = values;
	    resultData['color'] = data.color;
	    
		return resultData;
	};

});