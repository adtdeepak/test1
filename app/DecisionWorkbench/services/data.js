angular.module('DecisionWorkbench')

.service("DataService", function(RequestConstantsFactory, NetworkService, UtilitiesService, $timeout, StorageService, DataConversionService,$rootScope) {

	function sendRequest(cacheKey, cacheName, success, requestWS) {
		try {
			var dataInfo = StorageService.info(cacheKey, StorageService.getCache(cacheName));
			var data = StorageService.get(cacheKey, StorageService.getCache(cacheName));
			if(!dataInfo) {
				requestWS();
			} else {
				if(success instanceof Function) {
					success(data);
				}
			}
		} catch(e) {
			UtilitiesService.throwError({message: "Not found in Cache!", type: "internal"});
			$timeout(requestWS, 1);
		}
	}
	
	function getRequestWS(url, success, fail, beforeSuccess) {
		var requestWS = function() {
			NetworkService.get(url).then(function(result){
				var data = beforeSuccess(result);
				if(success instanceof Function) {
					success(data);
				}
			}, function(response) {
				if(fail instanceof Function) {
			    	fail(response);
                }
			});
		}
		return requestWS;
	}
	
	function postRequestWS(url, reqData, success, fail, beforeSuccess) {
		var requestWS = function() {
			NetworkService.post(url, reqData).then(function(result){
				var data = beforeSuccess(result);
				if(success instanceof Function) {
					success(data);
				}
			}, function(response) {
				if(fail instanceof Function) {
			    	fail(response);
                }
			});
		}
		return requestWS;
	}
	
	this.setDOSettings = function(reqData, success, fail) {
		NetworkService.post(RequestConstantsFactory['DECISION_URL'].DO_SETTINGS, reqData).then(function(result){
			UtilitiesService.validateResponse(result);
			success(result);
		},function(response){
			fail(response);
		}).catch(function(e){
			UtilitiesService.throwError(e);
		});

	};

	this.getDecisionOptionsValidateData = function(reqData, success, fail) {
		var cacheKey = $rootScope.selectedPeriod + "DWDecisionTableValidate" + JSON.stringify(reqData);
		var requestWS = postRequestWS(
				RequestConstantsFactory['DECISION_URL'].VALIDATE_DO + "/" + $rootScope.selectedPeriod, 
				reqData,
				success, 
				fail,
				function(result) {
					var cData = DataConversionService.toGetBuildDoDecisionValidateData(result);
						StorageService.put(cacheKey, cData, StorageService.getCache("decision-workbench-builddoCache"));
					return cData;
				}
		);
		requestWS();
	};



	this.getDecisionOptionsModifyData = function(reqData, success, fail) {
		var cacheKey = "DWDecisionTableModify" + JSON.stringify(reqData);
		var requestWS = postRequestWS(
				RequestConstantsFactory['DECISION_URL'].EDIT_DO, 
				reqData,
				success, 
				fail,
				function(result) {
					var cData = result;
						StorageService.put(cacheKey, cData, StorageService.getCache("decision-workbench-builddoCache"));
					return cData;
				}
		);
		sendRequest(cacheKey, "decision-workbench-builddoCache", success, requestWS);
	};

	this.getFilterData = function(reqData, success, fail) {

		var cacheKey = "DWFilter" + JSON.stringify(reqData);
		var requestWS = postRequestWS(
				RequestConstantsFactory['DECISION_URL'].GET_DO_SETTINGS, 
				reqData,
				success, 
				fail,
				function(result) {
					var cData = result;
						StorageService.put(cacheKey, cData, StorageService.getCache("decision-workbench-indexCache"));
					return cData;
				}
		);
		sendRequest(cacheKey, "decision-workbench-indexCache", success, requestWS);
	};

	this.getSetGoalsChartData = function(reqData, success, fail) {

		var cacheKey = "DWIndex" + JSON.stringify(reqData);
		var requestWS = postRequestWS(
				RequestConstantsFactory['DECISION_URL'].NEW_DECISION_OPTION, 
				reqData,
				success, 
				fail,
				function(result) {
					var cData = DataConversionService.toGetSetGoalsChartData(result);
						StorageService.put(cacheKey, cData, StorageService.getCache("decision-workbench-indexCache"));
					return cData;
				}
		);
		sendRequest(cacheKey, "decision-workbench-indexCache", success, requestWS);
	};
	this.getBuildDoChartData = function(reqData, success, fail) {
		
		var cacheKey = "DWAchievementUplift" + JSON.stringify(reqData);
		var requestWS = postRequestWS(
				RequestConstantsFactory['DECISION_URL'].NEW_DECISION_OPTION, 
				reqData,
				success, 
				fail,
				function(result) {
					var cData = DataConversionService.toGetBuildDoChartData(result);
						StorageService.put(cacheKey, cData, StorageService.getCache("decision-workbench-builddoCache"));
					return cData;
				}
		);
		sendRequest(cacheKey, "decision-workbench-builddoCache", success, requestWS);
	};
	
	this.getDecisionOptionsTableData = function(reqData, success, fail) {
		var cacheKey = $rootScope.selectedPeriod+"ReviewDoTable" + JSON.stringify(reqData);
		var finalData = {};
		var requestWS = postRequestWS(
				RequestConstantsFactory['DECISION_URL'].REVIEW_DO+"/"+$rootScope.selectedPeriod, 
				reqData,
				success, 
				fail,
				function(result) {
					console.log("result:", result)
					var cData = result;
					cData = DataConversionService.toReviewDODeepDrive(result);
	                cData = DataConversionService.toGetCommaSeparated(cData.doList);
	                finalData['doList'] = cData;
						StorageService.put(cacheKey, finalData, StorageService.getCache("decision-workbench-reviewdoCache"));
					return finalData;
				}
		);
		sendRequest(cacheKey, "decision-workbench-reviewdoCache", success, requestWS);
	};
	
	this.updateDO = function(reqData, success, fail) {
		
		var cacheKey = "updateDO" + JSON.stringify(reqData);
		var requestWS = postRequestWS(
			RequestConstantsFactory['DECISION_URL'].UPDATE_DO, 
			reqData,
			success, 
			fail,
			function(result) {
				var cData = result;
					StorageService.put(cacheKey, cData, StorageService.getCache("decision-workbench-indexCache"));
					cData = DataConversionService.toReviewDODeepDrive(result);
				return cData;
			}
		);
		try {
			var dataInfo = StorageService.info(cacheKey, StorageService.getCache("decision-workbench-indexCache"));
			var data = StorageService.get(cacheKey, StorageService.getCache("decision-workbench-indexCache"));
			if(true) {
				requestWS();
			}
			else{
				cData = DataConversionService.toReviewDODeepDrive(data[$rootScope.selectedPeriod].data);
				if(success instanceof Function)
					success(cData);
			}
		} catch(e) {
			console.log(e);
			UtilitiesService.throwError(fail, {message: "Not found in Cache!", type: "internal"});
		}
	};
	this.editDOSaveAction = function(reqData, success, fail) {
		var cacheKey = "DWDecisionTable" + JSON.stringify(reqData);
		var requestWS = postRequestWS(
				RequestConstantsFactory['DECISION_URL'].EDIT_DO_SAVE, 
				reqData,
				success, 
				fail,
				function(result) {
					var cData = DataConversionService.toGetBuildDoDecision(result);
					//StorageService.put(cacheKey, cData, StorageService.getCache("decision-workbench-builddoCache"));
					return cData;
				}
		);
		requestWS();
	};

	this.saveSelectedDO = function(reqData, fail, successFunction) {
		NetworkService.post(RequestConstantsFactory['DECISION_URL'].REVIEW_DO +"/"+ $rootScope.selectedPeriod,reqData, fail).then(function(result) {
			UtilitiesService.validateResponse(result);
			successFunction();
		}).catch(function(e){
			UtilitiesService.throwError(fail, e);
		});
	}
	
	this.getBuilddoDecision = function(reqData, success, fail) {
		var cacheKey = $rootScope.selectedPeriod + "DWDecisionTable" + JSON.stringify(reqData);
		var requestWS = postRequestWS(
				RequestConstantsFactory['DECISION_URL'].GET_DECISION_FILTERS + "/" + $rootScope.selectedPeriod, 
				reqData,
				success, 
				fail,
				function(result) {
					console.log($rootScope.selectedPeriod)
					if($rootScope.selectedPeriod == "yearly") {
						result = {
						    "status": "OK",
						    "message": "Request Processed Successfully",
						    "timeRange": {
						        "periodFrom": "11/01/2014",
						        "periodTo": "11/30/2014",
						        "reportingInterval": "monthly",
						        "periodName": "byMonth"
						    },
						    "doList": [
						        {
						            "doId": "1",
									"regions":"Global",
						            "targetConvActivityList": [
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
						            "channelList": [
						                {
						                    "channelId": "Recipient Page",
						                    "channelName": "Recipient Page"
						                }
						            ],
						            "userGroupList": [
						                {
						                    "groupId": "Project Managers",
						                    "groupName": "Project Managers"
						                }
						            ],
						            "expectedNewSub": "15866",
						            "usersTargeted": "46916",
						            "convUplift": {
						                "value": "46.6%",
						                "trend": "+ve"
						            },
						            "activeStartDate": "05/11/2014",
						            "activeEndDate": "05/11/2014"
						        },{
						            "doId": "2",
									"regions":"Global",
						            "targetConvActivityList": [
						                {
						                    "convActivityId": "Send Archives",
						                    "convActivityName": "Send Archives"
						                },
						                {
						                    "convActivityId": " Send Video",
						                    "convActivityName": " Send Video"
						                },
						                {
						                    "convActivityId": " Multi app available",
						                    "convActivityName": " Multi app available"
						                },
						                {
						                    "convActivityId": "Share your workspace",
						                    "convActivityName": "Share your workspace"
						                },
						                {
						                    "convActivityId": " Send PDF",
						                    "convActivityName": " Send PDF"
						                }
						            ],
						            "channelList": [
						                {
						                    "channelId": "Email",
						                    "channelName": "Email"
						                }
						            ],
						            "userGroupList": [
						                {
						                    "groupId": "Professionals",
						                    "groupName": "Professionals"
						                }
						            ],
						            "expectedNewSub": "14909",
						            "usersTargeted": "45325",
						            "convUplift": {
						                "value": "32.9%",
						                "trend": "+ve"
						            },
						            "activeStartDate": "05/11/2014",
						            "activeEndDate": "05/11/2014"
						        },{
						            "doId": "3",
									"regions":"Global",
						            "targetConvActivityList": [
						                {
						                    "convActivityId": "Collabrate workspace",
						                    "convActivityName": "Collabrate workspace"
						                },
						                {
						                    "convActivityId": "Send Archives",
						                    "convActivityName": "Send Archives"
						                },
						                {
						                    "convActivityId": "Premium Delivery",
						                    "convActivityName": "Premium Delivery"
						                }
						            ],
						            "channelList": [
						                {
						                    "channelId": "Recipient Page",
						                    "channelName": "Recipient Page"
						                }
						            ],
						            "userGroupList": [
						                {
						                    "groupId": "Finance Executives",
						                    "groupName": "Finance Executives"
						                }
						            ],
						            "expectedNewSub": "10299",
						            "usersTargeted": "31392",
						            "convUplift": {
						                "value": "32.8%",
						                "trend": "+ve"
						            },
						            "activeStartDate": "05/11/2014",
						            "activeEndDate": "05/11/2014"
						        },{
						            "doId": "4",
									"regions":"Global",
						            "targetConvActivityList": [
						                {
						                    "convActivityId": "Share your workspace",
						                    "convActivityName": "Share your workspace"
						                },
						                {
						                    "convActivityId": "Send Archives",
						                    "convActivityName": "Send Archives"
						                },
						                {
						                    "convActivityId": "Record Audio",
						                    "convActivityName": "Record Audio"
						                },
						                {
						                    "convActivityId": "Share Audio",
						                    "convActivityName": "Share Audio"
						                },
						                {
						                    "convActivityId": "Secure Send",
						                    "convActivityName": "Secure Send"
						                }
						            ],
						            "channelList": [
						                {
						                    "channelId": "Email",
						                    "channelName": "Email"
						                }
						            ],
						            "userGroupList": [
						                {
						                    "groupId": "Musicians",
						                    "groupName": "Musicians"
						                }
						            ],
						            "expectedNewSub": "9208",
						            "usersTargeted": "28120",
						            "convUplift": {
						                "value": "32.7%",
						                "trend": "+ve"
						            },
						            "activeStartDate": "05/11/2014",
						            "activeEndDate": "05/11/2014"
						        },{
						            "doId": "5",
									"regions":"Global",
						            "targetConvActivityList": [
						                {
						                    "convActivityId": "premium delivery",
						                    "convActivityName": "premium delivery"
						                },
						                {
						                    "convActivityId": "Secure Send",
						                    "convActivityName": "Secure Send"
						                },
						                {
						                    "convActivityId": " Multi app available",
						                    "convActivityName": " Multi app available"
						                },
						                {
						                    "convActivityId": "Send Images",
						                    "convActivityName": "Send Images"
						                }
						            ],
						            "channelList": [
						                {
						                    "channelId": "Email",
						                    "channelName": "Email"
						                }
						            ],
						            "userGroupList": [
						                {
						                    "groupId": "Photographers",
						                    "groupName": "Photographers"
						                }
						            ],
						            "expectedNewSub": "14084",
						            "usersTargeted": "43904",
						            "convUplift": {
						                "value": "32.1%",
						                "trend": "+ve"
						            },
						            "activeStartDate": "05/11/2014",
						            "activeEndDate": "05/11/2014"
						        },{
						            "doId": "6",
									"regions":"Global",
						            "targetConvActivityList": [
						                {
						                    "convActivityId": "premium delivery",
						                    "convActivityName": "premium delivery"
						                },
						                {
						                    "convActivityId": "Send Archives",
						                    "convActivityName": "Send Archives"
						                },
						                {
						                    "convActivityId": "Send Video",
						                    "convActivityName": "Send Video"
						                },
						                {
						                    "convActivityId": "Send Audio",
						                    "convActivityName": "Send Audio"
						                }
						            ],
						            "channelList": [
						                {
						                    "channelId": "House Ad 2",
						                    "channelName": "House Ad 2"
						                }
						            ],
						            "userGroupList": [
						                {
						                    "groupId": "Video Graphers",
						                    "groupName": "Video Graphers"
						                }
						            ],
						            "expectedNewSub": "13541",
						            "usersTargeted": "42324",
						            "convUplift": {
						                "value": "32.0%",
						                "trend": "+ve"
						            },
						            "activeStartDate": "05/11/2014",
						            "activeEndDate": "05/11/2014"
						        },{
						            "doId": "7",
									"regions":"USA",
						            "targetConvActivityList": [
						                {
						                    "convActivityId": "Record Audio",
						                    "convActivityName": "Record Audio"
						                },
						                {
						                    "convActivityId": "Record video",
						                    "convActivityName": "Record video"
						                },
						                {
						                    "convActivityId": "Collabrate workspace",
						                    "convActivityName": "Collabrate workspace"
						                }
						            ],
						            "channelList": [
						                {
						                    "channelId": "Email",
						                    "channelName": "Email"
						                }
						            ],
						            "userGroupList": [
						                {
						                    "groupId": "Musicians",
						                    "groupName": "Musicians"
						                }
						            ],
						            "expectedNewSub": "10063",
						            "usersTargeted": "31513",
						            "convUplift": {
						                "value": "31.9%",
						                "trend": "+ve"
						            },
						            "activeStartDate": "05/11/2014",
						            "activeEndDate": "05/11/2014"
						        },{
						            "doId": "8",
									"regions":"USA",
						            "targetConvActivityList": [
						                {
						                    "convActivityId": "Send Audio",
						                    "convActivityName": "Send Audio"
						                },
						                {
						                    "convActivityId": "Send PDF",
						                    "convActivityName": "Send PDF"
						                }
						            ],
						            "channelList": [
						                {
						                    "channelId": "Recipient Page",
						                    "channelName": "Recipient Page"
						                }
						            ],
						            "userGroupList": [
						                {
						                    "groupId": "Musicians",
						                    "groupName": "Musicians"
						                }
						            ],
						            "expectedNewSub": "8705",
						            "usersTargeted": "35171",
						            "convUplift": {
						                "value": "24.7%",
						                "trend": "+ve"
						            },
						            "activeStartDate": "05/11/2014",
						            "activeEndDate": "05/11/2014"
						        }
						    ],
						    "bestDOList": [
						        {
						            "doId": "1"
						        }
						    ]
						};
					} else if($rootScope.selectedPeriod == "monthly") {
						result = {
							    "status": "OK",
							    "message": "Request Processed Successfully",
							    "timeRange": {
							        "periodFrom": "11/01/2014",
							        "periodTo": "11/30/2014",
							        "reportingInterval": "monthly",
							        "periodName": "byMonth"
							    },
							    "doList": [
							        {
							            "doId": "1",
							            "regions": "Global",
							            "targetConvActivityList": [
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
							            "channelList": [
							                {
							                    "channelId": "Recipient Page",
							                    "channelName": "Recipient Page"
							                }
							            ],
							            "userGroupList": [
							                {
							                    "groupId": "Project Managers",
							                    "groupName": "Project Managers"
							                }
							            ],
							            "expectedNewSub": "1332",
							            "usersTargeted": "3909",
							            "convUplift": {
							                "value": "46.6%",
							                "trend": "+ve"
							            },
							            "activeStartDate": "05/11/2014",
							            "activeEndDate": "05/11/2014"
							        },
							        {
							            "doId": "2",
							            "regions": "Global",
							            "targetConvActivityList": [
							                {
							                    "convActivityId": "Send Archives",
							                    "convActivityName": "Send Archives"
							                },
							                {
							                    "convActivityId": " Send Video",
							                    "convActivityName": " Send Video"
							                },
							                {
							                    "convActivityId": " Multi app available",
							                    "convActivityName": " Multi app available"
							                },
							                {
							                    "convActivityId": "Share your workspace",
							                    "convActivityName": "Share your workspace"
							                },
							                {
							                    "convActivityId": " Send PDF",
							                    "convActivityName": " Send PDF"
							                }
							            ],
							            "channelList": [
							                {
							                    "channelId": "Email",
							                    "channelName": "Email"
							                }
							            ],
							            "userGroupList": [
							                {
							                    "groupId": "Professionals",
							                    "groupName": "Professionals"
							                }
							            ],
							            "expectedNewSub": "1242",
							            "usersTargeted": "3777",
							            "convUplift": {
							                "value": "32.9%",
							                "trend": "+ve"
							            },
							            "activeStartDate": "05/11/2014",
							            "activeEndDate": "05/11/2014"
							        },
							        {
							            "doId": "3",
							            "regions": "Global",
							            "targetConvActivityList": [
							                {
							                    "convActivityId": "Collabrate workspace",
							                    "convActivityName": "Collabrate workspace"
							                },
							                {
							                    "convActivityId": "Send Archives",
							                    "convActivityName": "Send Archives"
							                },
							                {
							                    "convActivityId": "Premium Delivery",
							                    "convActivityName": "Premium Delivery"
							                }
							            ],
							            "channelList": [
							                {
							                    "channelId": "Recipient Page",
							                    "channelName": "Recipient Page"
							                }
							            ],
							            "userGroupList": [
							                {
							                    "groupId": "Finance Executives",
							                    "groupName": "Finance Executives"
							                }
							            ],
							            "expectedNewSub": "858",
							            "usersTargeted": "2616",
							            "convUplift": {
							                "value": "32.8%",
							                "trend": "+ve"
							            },
							            "activeStartDate": "05/11/2014",
							            "activeEndDate": "05/11/2014"
							        },
							        {
							            "doId": "4",
							            "regions": "Global",
							            "targetConvActivityList": [
							                {
							                    "convActivityId": "Share your workspace",
							                    "convActivityName": "Share your workspace"
							                },
							                {
							                    "convActivityId": "Send Archives",
							                    "convActivityName": "Send Archives"
							                },
							                {
							                    "convActivityId": "Record Audio",
							                    "convActivityName": "Record Audio"
							                },
							                {
							                    "convActivityId": "Share Audio",
							                    "convActivityName": "Share Audio"
							                },
							                {
							                    "convActivityId": "Secure Send",
							                    "convActivityName": "Secure Send"
							                }
							            ],
							            "channelList": [
							                {
							                    "channelId": "Email",
							                    "channelName": "Email"
							                }
							            ],
							            "userGroupList": [
							                {
							                    "groupId": "Musicians",
							                    "groupName": "Musicians"
							                }
							            ],
							            "expectedNewSub": "767",
							            "usersTargeted": "2343",
							            "convUplift": {
							                "value": "32.7%",
							                "trend": "+ve"
							            },
							            "activeStartDate": "05/11/2014",
							            "activeEndDate": "05/11/2014"
							        },
							        {
							            "doId": "5",
							            "regions": "Global",
							            "targetConvActivityList": [
							                {
							                    "convActivityId": "premium delivery",
							                    "convActivityName": "premium delivery"
							                },
							                {
							                    "convActivityId": "Secure Send",
							                    "convActivityName": "Secure Send"
							                },
							                {
							                    "convActivityId": " Multi app available",
							                    "convActivityName": " Multi app available"
							                },
							                {
							                    "convActivityId": "Send Images",
							                    "convActivityName": "Send Images"
							                }
							            ],
							            "channelList": [
							                {
							                    "channelId": "Email",
							                    "channelName": "Email"
							                }
							            ],
							            "userGroupList": [
							                {
							                    "groupId": "Photographers",
							                    "groupName": "Photographers"
							                }
							            ],
							            "expectedNewSub": "1173",
							            "usersTargeted": "3658",
							            "convUplift": {
							                "value": "32.1%",
							                "trend": "+ve"
							            },
							            "activeStartDate": "05/11/2014",
							            "activeEndDate": "05/11/2014"
							        },
							        {
							            "doId": "6",
							            "regions": "Global",
							            "targetConvActivityList": [
							                {
							                    "convActivityId": "premium delivery",
							                    "convActivityName": "premium delivery"
							                },
							                {
							                    "convActivityId": "Send Archives",
							                    "convActivityName": "Send Archives"
							                },
							                {
							                    "convActivityId": "Send Video",
							                    "convActivityName": "Send Video"
							                },
							                {
							                    "convActivityId": "Send Audio",
							                    "convActivityName": "Send Audio"
							                }
							            ],
							            "channelList": [
							                {
							                    "channelId": "House Ad 2",
							                    "channelName": "House Ad 2"
							                }
							            ],
							            "userGroupList": [
							                {
							                    "groupId": "Video Graphers",
							                    "groupName": "Video Graphers"
							                }
							            ],
							            "expectedNewSub": "1128",
							            "usersTargeted": "3527",
							            "convUplift": {
							                "value": "32.0%",
							                "trend": "+ve"
							            },
							            "activeStartDate": "05/11/2014",
							            "activeEndDate": "05/11/2014"
							        },
							        {
							            "doId": "7",
							            "regions": "USA",
							            "targetConvActivityList": [
							                {
							                    "convActivityId": "Record Audio",
							                    "convActivityName": "Record Audio"
							                },
							                {
							                    "convActivityId": "Record video",
							                    "convActivityName": "Record video"
							                },
							                {
							                    "convActivityId": "Collabrate workspace",
							                    "convActivityName": "Collabrate workspace"
							                }
							            ],
							            "channelList": [
							                {
							                    "channelId": "Email",
							                    "channelName": "Email"
							                }
							            ],
							            "userGroupList": [
							                {
							                    "groupId": "Musicians",
							                    "groupName": "Musicians"
							                }
							            ],
							            "expectedNewSub": "838",
							            "usersTargeted": "2626",
							            "convUplift": {
							                "value": "31.9%",
							                "trend": "+ve"
							            },
							            "activeStartDate": "05/11/2014",
							            "activeEndDate": "05/11/2014"
							        },
							        {
							            "doId": "8",
							            "regions": "USA",
							            "targetConvActivityList": [
							                {
							                    "convActivityId": "Send Audio",
							                    "convActivityName": "Send Audio"
							                },
							                {
							                    "convActivityId": "Send PDF",
							                    "convActivityName": "Send PDF"
							                }
							            ],
							            "channelList": [
							                {
							                    "channelId": "Recipient Page",
							                    "channelName": "Recipient Page"
							                }
							            ],
							            "userGroupList": [
							                {
							                    "groupId": "Musicians",
							                    "groupName": "Musicians"
							                }
							            ],
							            "expectedNewSub": "725",
							            "usersTargeted": "2930",
							            "convUplift": {
							                "value": "24.7%",
							                "trend": "+ve"
							            },
							            "activeStartDate": "05/11/2014",
							            "activeEndDate": "05/11/2014"
							        }
							    ],
							    "bestDOList": [
							        {
							            "doId": "1"
							        }
							    ]
							};
					} else if($rootScope.selectedPeriod == "quarterly") {
						result = {
						    "status": "OK",
						    "message": "Request Processed Successfully",
						    "timeRange": {
						        "periodFrom": "11/01/2014",
						        "periodTo": "11/30/2014",
						        "reportingInterval": "monthly",
						        "periodName": "byMonth"
						    },
						    "doList": [
						        {
						            "doId": "1",
						            "regions": "Global",
						            "targetConvActivityList": [
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
						            "channelList": [
						                {
						                    "channelId": "Recipient Page",
						                    "channelName": "Recipient Page"
						                }
						            ],
						            "userGroupList": [
						                {
						                    "groupId": "Project Managers",
						                    "groupName": "Project Managers"
						                }
						            ],
						            "expectedNewSub": "3966",
						            "usersTargeted": "15638",
						            "convUplift": {
						                "value": "46.6%",
						                "trend": "+ve"
						            },
						            "activeStartDate": "05/11/2014",
						            "activeEndDate": "05/11/2014"
						        },
						        {
						            "doId": "2",
						            "regions": "Global",
						            "targetConvActivityList": [
						                {
						                    "convActivityId": "Send Archives",
						                    "convActivityName": "Send Archives"
						                },
						                {
						                    "convActivityId": " Send Video",
						                    "convActivityName": " Send Video"
						                },
						                {
						                    "convActivityId": " Multi app available",
						                    "convActivityName": " Multi app available"
						                },
						                {
						                    "convActivityId": "Share your workspace",
						                    "convActivityName": "Share your workspace"
						                },
						                {
						                    "convActivityId": " Send PDF",
						                    "convActivityName": " Send PDF"
						                }
						            ],
						            "channelList": [
						                {
						                    "channelId": "Email",
						                    "channelName": "Email"
						                }
						            ],
						            "userGroupList": [
						                {
						                    "groupId": "Professionals",
						                    "groupName": "Professionals"
						                }
						            ],
						            "expectedNewSub": "4969",
						            "usersTargeted": "15108",
						            "convUplift": {
						                "value": "32.9%",
						                "trend": "+ve"
						            },
						            "activeStartDate": "05/11/2014",
						            "activeEndDate": "05/11/2014"
						        },
						        {
						            "doId": "3",
						            "regions": "Global",
						            "targetConvActivityList": [
						                {
						                    "convActivityId": "Collabrate workspace",
						                    "convActivityName": "Collabrate workspace"
						                },
						                {
						                    "convActivityId": "Send Archives",
						                    "convActivityName": "Send Archives"
						                },
						                {
						                    "convActivityId": "Premium Delivery",
						                    "convActivityName": "Premium Delivery"
						                }
						            ],
						            "channelList": [
						                {
						                    "channelId": "Recipient Page",
						                    "channelName": "Recipient Page"
						                }
						            ],
						            "userGroupList": [
						                {
						                    "groupId": "Finance Executives",
						                    "groupName": "Finance Executives"
						                }
						            ],
						            "expectedNewSub": "3433",
						            "usersTargeted": "10468",
						            "convUplift": {
						                "value": "32.8%",
						                "trend": "+ve"
						            },
						            "activeStartDate": "05/11/2014",
						            "activeEndDate": "05/11/2014"
						        },
						        {
						            "doId": "4",
						            "regions": "Global",
						            "targetConvActivityList": [
						                {
						                    "convActivityId": "Share your workspace",
						                    "convActivityName": "Share your workspace"
						                },
						                {
						                    "convActivityId": "Send Archives",
						                    "convActivityName": "Send Archives"
						                },
						                {
						                    "convActivityId": "Record Audio",
						                    "convActivityName": "Record Audio"
						                },
						                {
						                    "convActivityId": "Share Audio",
						                    "convActivityName": "Share Audio"
						                },
						                {
						                    "convActivityId": "Secure Send",
						                    "convActivityName": "Secure Send"
						                }
						            ],
						            "channelList": [
						                {
						                    "channelId": "Email",
						                    "channelName": "Email"
						                }
						            ],
						            "userGroupList": [
						                {
						                    "groupId": "Musicians",
						                    "groupName": "Musicians"
						                }
						            ],
						            "expectedNewSub": "3069",
						            "usersTargeted": "9373",
						            "convUplift": {
						                "value": "32.7%",
						                "trend": "+ve"
						            },
						            "activeStartDate": "05/11/2014",
						            "activeEndDate": "05/11/2014"
						        },
						        {
						            "doId": "5",
						            "regions": "Global",
						            "targetConvActivityList": [
						                {
						                    "convActivityId": "premium delivery",
						                    "convActivityName": "premium delivery"
						                },
						                {
						                    "convActivityId": "Secure Send",
						                    "convActivityName": "Secure Send"
						                },
						                {
						                    "convActivityId": " Multi app available",
						                    "convActivityName": " Multi app available"
						                },
						                {
						                    "convActivityId": "Send Images",
						                    "convActivityName": "Send Images"
						                }
						            ],
						            "channelList": [
						                {
						                    "channelId": "Email",
						                    "channelName": "Email"
						                }
						            ],
						            "userGroupList": [
						                {
						                    "groupId": "Photographers",
						                    "groupName": "Photographers"
						                }
						            ],
						            "expectedNewSub": "4694",
						            "usersTargeted": "14634",
						            "convUplift": {
						                "value": "32.1%",
						                "trend": "+ve"
						            },
						            "activeStartDate": "05/11/2014",
						            "activeEndDate": "05/11/2014"
						        },
						        {
						            "doId": "6",
						            "regions": "Global",
						            "targetConvActivityList": [
						                {
						                    "convActivityId": "premium delivery",
						                    "convActivityName": "premium delivery"
						                },
						                {
						                    "convActivityId": "Send Archives",
						                    "convActivityName": "Send Archives"
						                },
						                {
						                    "convActivityId": "Send Video",
						                    "convActivityName": "Send Video"
						                },
						                {
						                    "convActivityId": "Send Audio",
						                    "convActivityName": "Send Audio"
						                }
						            ],
						            "channelList": [
						                {
						                    "channelId": "House Ad 2",
						                    "channelName": "House Ad 2"
						                }
						            ],
						            "userGroupList": [
						                {
						                    "groupId": "Video Graphers",
						                    "groupName": "Video Graphers"
						                }
						            ],
						            "expectedNewSub": "4513",
						            "usersTargeted": "14108",
						            "convUplift": {
						                "value": "32.0%",
						                "trend": "+ve"
						            },
						            "activeStartDate": "05/11/2014",
						            "activeEndDate": "05/11/2014"
						        },
						        {
						            "doId": "7",
						            "regions": "USA",
						            "targetConvActivityList": [
						                {
						                    "convActivityId": "Record Audio",
						                    "convActivityName": "Record Audio"
						                },
						                {
						                    "convActivityId": "Record video",
						                    "convActivityName": "Record video"
						                },
						                {
						                    "convActivityId": "Collabrate workspace",
						                    "convActivityName": "Collabrate workspace"
						                }
						            ],
						            "channelList": [
						                {
						                    "channelId": "Email",
						                    "channelName": "Email"
						                }
						            ],
						            "userGroupList": [
						                {
						                    "groupId": "Musicians",
						                    "groupName": "Musicians"
						                }
						            ],
						            "expectedNewSub": "3354",
						            "usersTargeted": "10504",
						            "convUplift": {
						                "value": "31.9%",
						                "trend": "+ve"
						            },
						            "activeStartDate": "05/11/2014",
						            "activeEndDate": "05/11/2014"
						        },
						        {
						            "doId": "8",
						            "regions": "USA",
						            "targetConvActivityList": [
						                {
						                    "convActivityId": "Send Audio",
						                    "convActivityName": "Send Audio"
						                },
						                {
						                    "convActivityId": "Send PDF",
						                    "convActivityName": "Send PDF"
						                }
						            ],
						            "channelList": [
						                {
						                    "channelId": "Recipient Page",
						                    "channelName": "Recipient Page"
						                }
						            ],
						            "userGroupList": [
						                {
						                    "groupId": "Musicians",
						                    "groupName": "Musicians"
						                }
						            ],
						            "expectedNewSub": "2901",
						            "usersTargeted": "11723",
						            "convUplift": {
						                "value": "24.7%",
						                "trend": "+ve"
						            },
						            "activeStartDate": "05/11/2014",
						            "activeEndDate": "05/11/2014"
						        }
						    ],
						    "bestDOList": [
						        {
						            "doId": "1"
						        }
						    ]
						};

					} else if($rootScope.selectedPeriod == "weekly") {
						result = {
							    "status": "OK",
							    "message": "Request Processed Successfully",
							    "timeRange": {
							        "periodFrom": "11/01/2014",
							        "periodTo": "11/30/2014",
							        "reportingInterval": "monthly",
							        "periodName": "byMonth"
							    },
							    "doList": [
							        {
							            "doId": "1",
							            "regions": "Global",
							            "targetConvActivityList": [
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
							            "channelList": [
							                {
							                    "channelId": "Recipient Page",
							                    "channelName": "Recipient Page"
							                }
							            ],
							            "userGroupList": [
							                {
							                    "groupId": "Project Managers",
							                    "groupName": "Project Managers"
							                }
							            ],
							            "expectedNewSub": "305",
							            "usersTargeted": "885",
							            "convUplift": {
							                "value": "46.6%",
							                "trend": "+ve"
							            },
							            "activeStartDate": "05/11/2014",
							            "activeEndDate": "05/11/2014"
							        },
							        {
							            "doId": "2",
							            "regions": "Global",
							            "targetConvActivityList": [
							                {
							                    "convActivityId": "Send Archives",
							                    "convActivityName": "Send Archives"
							                },
							                {
							                    "convActivityId": " Send Video",
							                    "convActivityName": " Send Video"
							                },
							                {
							                    "convActivityId": " Multi app available",
							                    "convActivityName": " Multi app available"
							                },
							                {
							                    "convActivityId": "Share your workspace",
							                    "convActivityName": "Share your workspace"
							                },
							                {
							                    "convActivityId": " Send PDF",
							                    "convActivityName": " Send PDF"
							                }
							            ],
							            "channelList": [
							                {
							                    "channelId": "Email",
							                    "channelName": "Email"
							                }
							            ],
							            "userGroupList": [
							                {
							                    "groupId": "Professionals",
							                    "groupName": "Professionals"
							                }
							            ],
							            "expectedNewSub": "281",
							            "usersTargeted": "855",
							            "convUplift": {
							                "value": "32.9%",
							                "trend": "+ve"
							            },
							            "activeStartDate": "05/11/2014",
							            "activeEndDate": "05/11/2014"
							        },
							        {
							            "doId": "3",
							            "regions": "Global",
							            "targetConvActivityList": [
							                {
							                    "convActivityId": "Collabrate workspace",
							                    "convActivityName": "Collabrate workspace"
							                },
							                {
							                    "convActivityId": "Send Archives",
							                    "convActivityName": "Send Archives"
							                },
							                {
							                    "convActivityId": "Premium Delivery",
							                    "convActivityName": "Premium Delivery"
							                }
							            ],
							            "channelList": [
							                {
							                    "channelId": "Recipient Page",
							                    "channelName": "Recipient Page"
							                }
							            ],
							            "userGroupList": [
							                {
							                    "groupId": "Finance Executives",
							                    "groupName": "Finance Executives"
							                }
							            ],
							            "expectedNewSub": "194",
							            "usersTargeted": "592",
							            "convUplift": {
							                "value": "32.8%",
							                "trend": "+ve"
							            },
							            "activeStartDate": "05/11/2014",
							            "activeEndDate": "05/11/2014"
							        },
							        {
							            "doId": "4",
							            "regions": "Global",
							            "targetConvActivityList": [
							                {
							                    "convActivityId": "Share your workspace",
							                    "convActivityName": "Share your workspace"
							                },
							                {
							                    "convActivityId": "Send Archives",
							                    "convActivityName": "Send Archives"
							                },
							                {
							                    "convActivityId": "Record Audio",
							                    "convActivityName": "Record Audio"
							                },
							                {
							                    "convActivityId": "Share Audio",
							                    "convActivityName": "Share Audio"
							                },
							                {
							                    "convActivityId": "Secure Send",
							                    "convActivityName": "Secure Send"
							                }
							            ],
							            "channelList": [
							                {
							                    "channelId": "Email",
							                    "channelName": "Email"
							                }
							            ],
							            "userGroupList": [
							                {
							                    "groupId": "Musicians",
							                    "groupName": "Musicians"
							                }
							            ],
							            "expectedNewSub": "173",
							            "usersTargeted": "530",
							            "convUplift": {
							                "value": "32.7%",
							                "trend": "+ve"
							            },
							            "activeStartDate": "05/11/2014",
							            "activeEndDate": "05/11/2014"
							        },
							        {
							            "doId": "5",
							            "regions": "Global",
							            "targetConvActivityList": [
							                {
							                    "convActivityId": "premium delivery",
							                    "convActivityName": "premium delivery"
							                },
							                {
							                    "convActivityId": "Secure Send",
							                    "convActivityName": "Secure Send"
							                },
							                {
							                    "convActivityId": " Multi app available",
							                    "convActivityName": " Multi app available"
							                },
							                {
							                    "convActivityId": "Send Images",
							                    "convActivityName": "Send Images"
							                }
							            ],
							            "channelList": [
							                {
							                    "channelId": "Email",
							                    "channelName": "Email"
							                }
							            ],
							            "userGroupList": [
							                {
							                    "groupId": "Photographers",
							                    "groupName": "Photographers"
							                }
							            ],
							            "expectedNewSub": "265",
							            "usersTargeted": "828",
							            "convUplift": {
							                "value": "32.1%",
							                "trend": "+ve"
							            },
							            "activeStartDate": "05/11/2014",
							            "activeEndDate": "05/11/2014"
							        },
							        {
							            "doId": "6",
							            "regions": "Global",
							            "targetConvActivityList": [
							                {
							                    "convActivityId": "premium delivery",
							                    "convActivityName": "premium delivery"
							                },
							                {
							                    "convActivityId": "Send Archives",
							                    "convActivityName": "Send Archives"
							                },
							                {
							                    "convActivityId": "Send Video",
							                    "convActivityName": "Send Video"
							                },
							                {
							                    "convActivityId": "Send Audio",
							                    "convActivityName": "Send Audio"
							                }
							            ],
							            "channelList": [
							                {
							                    "channelId": "House Ad 2",
							                    "channelName": "House Ad 2"
							                }
							            ],
							            "userGroupList": [
							                {
							                    "groupId": "Video Graphers",
							                    "groupName": "Video Graphers"
							                }
							            ],
							            "expectedNewSub": "255",
							            "usersTargeted": "789",
							            "convUplift": {
							                "value": "32.0%",
							                "trend": "+ve"
							            },
							            "activeStartDate": "05/11/2014",
							            "activeEndDate": "05/11/2014"
							        },
							        {
							            "doId": "7",
							            "regions": "USA",
							            "targetConvActivityList": [
							                {
							                    "convActivityId": "Record Audio",
							                    "convActivityName": "Record Audio"
							                },
							                {
							                    "convActivityId": "Record video",
							                    "convActivityName": "Record video"
							                },
							                {
							                    "convActivityId": "Collabrate workspace",
							                    "convActivityName": "Collabrate workspace"
							                }
							            ],
							            "channelList": [
							                {
							                    "channelId": "Email",
							                    "channelName": "Email"
							                }
							            ],
							            "userGroupList": [
							                {
							                    "groupId": "Musicians",
							                    "groupName": "Musicians"
							                }
							            ],
							            "expectedNewSub": "189",
							            "usersTargeted": "594",
							            "convUplift": {
							                "value": "31.9%",
							                "trend": "+ve"
							            },
							           "activeStartDate": "05/11/2014",
							            "activeEndDate": "05/11/2014"
							        },
							        {
							            "doId": "8",
							            "regions": "USA",
							            "targetConvActivityList": [
							                {
							                    "convActivityId": "Send Audio",
							                    "convActivityName": "Send Audio"
							                },
							                {
							                    "convActivityId": "Send PDF",
							                    "convActivityName": "Send PDF"
							                }
							            ],
							            "channelList": [
							                {
							                    "channelId": "Recipient Page",
							                    "channelName": "Recipient Page"
							                }
							            ],
							            "userGroupList": [
							                {
							                    "groupId": "Musicians",
							                    "groupName": "Musicians"
							                }
							            ],
							            "expectedNewSub": "164",
							            "usersTargeted": "663",
							            "convUplift": {
							                "value": "24.7%",
							                "trend": "+ve"
							            },
							            "activeStartDate": "05/11/2014",
							            "activeEndDate": "05/11/2014"
							        }
							    ],
							    "bestDOList": [
							        {
							            "doId": ["1","2"]
							        }
							    ]
							};
					}
					var cData = DataConversionService.toGetBuildDoDecision(result);
					cData = DataConversionService.toGetCommaSeparated(cData);
					StorageService.put(cacheKey, cData, StorageService.getCache("decision-workbench-builddoCache"));
					return cData;
				}
		);
		sendRequest(cacheKey, "decision-workbench-builddoCache", success, requestWS);

	};
	
	this.getAllUserData = function(reqData, success, fail) {
		var requestWS = postRequestWS(
				'http://jsonstub.com/campaign-options/overview', 
				reqData,
				success, 
				fail,
				function(result) {
					return result;
				}
		);
		requestWS();
		//sendRequest(cacheKey, "summaryCache", success, requestWS);
		
	};
	
	this.getOverviewDetailsData = function(reqData, success, fail) {
		var requestWS = postRequestWS(
				'http://jsonstub.com/campaign-options/overview/details', 
				reqData,
				success, 
				fail,
				function(result) {
					return result;
				}
		);
		requestWS();
		//sendRequest(cacheKey, "summaryCache", success, requestWS);
		
	};

})