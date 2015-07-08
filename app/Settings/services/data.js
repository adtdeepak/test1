angular.module('Settings')

.service("DataService", function(RequestConstantsFactory, EnabledCacheInfoFactory, DataConversionService, NetworkService, UtilitiesService, StorageService, $timeout){
	/*------------------ Generic ----------------------*/
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
	
	/*------------------ dataSync Page ----------------------*/
	this.getSyncStatusData = function(reqData, success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['DATASYNC'].DATA_SYNC_STATUS;
		var cacheKey = "syncData" + JSON.stringify(reqData);
		var requestWS = getRequestWS(
            RequestConstantsFactory['SETTINGS_URL'].DATA_SYNC_STATUS, 
            success, 
            fail,
			function(result) {
				var cData = result.dataSyncStatusList; 
				if(isCacheEnabled){
					StorageService.put(cacheKey, cData, StorageService.getCache("settingsDataCache"));
				}
				return cData;
			}
		);
		if(isCacheEnabled){
			sendRequest(cacheKey, "settingsDataCache", success, requestWS);
		} else {
			requestWS();
		}
	};

	this.getSyncHistoryData = function(reqData, success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['DATASYNC'].DATA_SYNC_HISTORY;
		var cacheKey = "syncHistoryData" + JSON.stringify(reqData);
		var requestWS = postRequestWS(
	            RequestConstantsFactory['SETTINGS_URL'].DATA_SYNC_HISTORY, 
	            reqData,
	            success, 
	            fail,
				function(result) {
					var cData = result.dataSyncList; 
					if(isCacheEnabled){
						StorageService.put(cacheKey, cData, StorageService.getCache("settingsDataCache"));
					}
					return cData;
				}
			);
		if(isCacheEnabled){
		sendRequest(cacheKey, "settingsDataCache", success, requestWS);
		}else{
			requestWS();
		}
	};

	/*------------------ channels Page ----------------------*/
	this.getChannelInfoData = function(reqData, success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['CHANNELS'].CHANNEL_INFO_TABLE;
		var cacheKey = "channelsInfo";
		var requestWS = getRequestWS(
	            RequestConstantsFactory['SETTINGS_URL'].CHANNELS_LIST, 
	            success, 
	            fail,
				function(result) {
					var cData = result; 
					if(isCacheEnabled){
						StorageService.put(cacheKey, cData, StorageService.getCache("settingsChannelsCache"));
					}
					return cData;
				}
			);
		if(isCacheEnabled){
			sendRequest(cacheKey, "settingsChannelsCache", success, requestWS);
		}else{
			requestWS();
		}

	};

	this.addChannels = function(reqData, success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['CHANNELS'].ADD_CHANNEL;
		var cacheKey = "channelsInfo";
		var requestWS = postRequestWS(
	            RequestConstantsFactory['SETTINGS_URL'].CHANNELS_ADD, 
	            reqData,
	            success, 
	            fail,
				function(result) {
					var cData = result; 
					//isCacheEnabled should not be checked here
						StorageService.put(cacheKey, cData, StorageService.getCache("settingsChannelsCache"));
					return cData;
				}
			);
		if(isCacheEnabled){
			sendRequest(cacheKey, "settingsChannelsCache", success, requestWS);
		}else{
			requestWS();
		}
	};
	this.editChannelsSave = function(reqData, success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['CHANNELS'].EDIT_CHANNEL;
		var cacheKey = "channelsInfo";
		var requestWS = postRequestWS(
            RequestConstantsFactory['SETTINGS_URL'].CHANNELS_EDIT, 
            reqData,
            success, 
            fail,
			function(result) {
				var cData = result; 
				//isCacheEnabled should not be checked here
					StorageService.put(cacheKey, cData, StorageService.getCache("settingsChannelsCache"));
				return cData;
			}
		);
		if(isCacheEnabled){
			sendRequest(cacheKey, "settingsChannelsCache", success, requestWS);
		}else{
			requestWS();
		}
	};

	this.deleteChannels = function(reqData, success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['CHANNELS'].DELETE_CHANNEL;
		var cacheKey = "channelsInfo";
		var requestWS = postRequestWS(
	            RequestConstantsFactory['SETTINGS_URL'].CHANNELS_DELETE, 
	            reqData,
	            success, 
	            fail,
				function(result) {
					var cData = result; 
					//isCacheEnabled should not be checked here
						StorageService.put(cacheKey, cData, StorageService.getCache("settingsChannelsCache"));
					return cData;
				}
			);
		if(isCacheEnabled){
			sendRequest(cacheKey, "settingsChannelsCache", success, requestWS);
		}else{
			requestWS();
		}
	};
	
	/*------------------ models Page ----------------------*/
	this.getUploadModelsData = function(reqData, success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['MODELS'].UPDATE_MODEL_TABLE;
		var cacheKey = "uploadModels" + JSON.stringify(reqData);
		var requestWS = getRequestWS(
	            RequestConstantsFactory['SETTINGS_URL'].MODELS_LIST, 
	            success, 
	            fail,
				function(result) {
					var cData = result.modelList; 
					if(isCacheEnabled){
						StorageService.put(cacheKey, cData, StorageService.getCache("settingsModelsCache"));
					}
					return cData;
				}
			);
		if(isCacheEnabled){
			sendRequest(cacheKey, "settingsModelsCache", success, requestWS);
		}else{
			requestWS();
		}
	};

	this.getViewModelsData = function(reqData, success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['MODELS'].VIEW_MODEL_TABLE;
		var cacheKey = "viewModels" + JSON.stringify(reqData);
		var requestWS = postRequestWS(
	            RequestConstantsFactory['SETTINGS_URL'].MODELS_HISTORY_LIST, 
	            reqData,
	            success, 
	            fail,
				function(result) {
					var cData = result.modelVersionsList; 
					if(isCacheEnabled){
						StorageService.put(cacheKey, cData, StorageService.getCache("settingsModelsCache"));
					}
					return cData;
				}
			);
		if(isCacheEnabled){
			sendRequest(cacheKey, "settingsModelsCache", success, requestWS);
		}else{
			requestWS();
		}
	};

	this.addModel = function(reqData, success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['MODELS'].ADD_MODEL;
		var cacheKey = "addModel" + JSON.stringify(reqData);
		var requestWS = postRequestWS(
	            RequestConstantsFactory['SETTINGS_URL'].ADD_MODELS, 
	            reqData,
	            success, 
	            fail,
				function(result) {
	            	var result = {
							"status": "OK",
							"message": "Request processed successfully",
							"modelId": "mod001",
							"modelName" : "Segmentation",
							"modelDetails" : "xyz",
							"modelVersion" : "0.1"
					};
					var cData = result; 
					if(isCacheEnabled){
						StorageService.put(cacheKey, cData, StorageService.getCache("settingsModelsCache"));
					}
					return cData;
				}
			);
		if(isCacheEnabled){
			sendRequest(cacheKey, "settingsModelsCache", success, requestWS);
		}else{
			requestWS();
		}
	};
	
	this.getModelDetails = function(reqData, success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['MODELS'].MODEL_DETAILS;
		var cacheKey = "modelDetails" + JSON.stringify(reqData);
		var requestWS = getRequestWS(
	            RequestConstantsFactory['SETTINGS_URL'].MODEL_DETAILS, 
	            success, 
	            fail,
				function(result) {
					var cData = result; 
					if(isCacheEnabled){
						StorageService.put(cacheKey, cData, StorageService.getCache("settingsModelsCache"));
					}
					return cData;
				}
			);
		if(isCacheEnabled){
			sendRequest(cacheKey, "settingsModelsCache", success, requestWS);
		}else{
			requestWS();
		}
	};



	/*--------------------- goals Page --------------------------*/
	this.getGoalTableData = function(reqData, success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['GOALS'].GOALS_TABLE;
		var cacheKey = "goalTable";
		var requestWS = postRequestWS(
	            RequestConstantsFactory['SETTINGS_URL'].GOALS_LIST, 
	            reqData,
	            success, 
	            fail,
				function(result) {
					var cData = result.goalsList; 
					if(isCacheEnabled){
						StorageService.put(cacheKey, cData, StorageService.getCache("settingsGoalsCache"));
					}
					return cData;
				}
			);
		if(isCacheEnabled){
			sendRequest(cacheKey, "settingsGoalsCache", success, requestWS, fail);
		}else{
			requestWS();
		}
	};
	this.editGoalsSave = function(reqData, success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['GOALS'].EDIT_GOALS;
		var cacheKey = "goalTable";
		var requestWS = postRequestWS(
	            RequestConstantsFactory['SETTINGS_URL'].GOALS_EDIT, 
	            reqData,
	            success, 
	            fail,
				function(result) {
					var cData = result; 
					//isCacheEnabled should not be checked here
						StorageService.put(cacheKey, cData, StorageService.getCache("settingsGoalsCache"));
					return cData;
				}
			);
		if(isCacheEnabled){
			sendRequest(cacheKey, "settingsGoalsCache", success, requestWS);
		}else{
			requestWS();
		}
	};

	/*------------------ users Page - user module ----------------------*/
	this.getUsersListData = function(reqData, success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['USERS'].USER_LIST_TABLE;
		var cacheKey = "userList";
		var requestWS = getRequestWS(
	            RequestConstantsFactory['SETTINGS_URL'].USERS_LIST, 
	            success, 
	            fail,
				function(result) {
					var cData = result; 
					if(isCacheEnabled){
						StorageService.put(cacheKey, cData, StorageService.getCache("settingsUsersCache"));
					}
					return cData;
				}
			);
		if(isCacheEnabled){
			sendRequest(cacheKey, "settingsUsersCache", success, requestWS);
		}else{
			requestWS();
		}

	};
	
	this.addUsers = function(reqData, success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['USERS'].USER_ADD;
		var cacheKey = "userList";
		var requestWS = postRequestWS(
	            RequestConstantsFactory['SETTINGS_URL'].USERS_ADD, 
	            reqData,
	            success, 
	            fail,
				function(result) {
					var cData = result; 
					//isCacheEnabled should not be checked here
						StorageService.put(cacheKey, cData, StorageService.getCache("settingsUsersCache"));
					return cData;
				}
			);
		if(isCacheEnabled){
			sendRequest(cacheKey, "settingsUsersCache", success, requestWS);
		}else{
			requestWS();
		}
	};

	this.editUsersSave = function(reqData, success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['USERS'].USER_EDIT;
		var cacheKey = "userList";
		var requestWS = postRequestWS(
	            RequestConstantsFactory['SETTINGS_URL'].USERS_EDIT, 
	            reqData,
	            success, 
	            fail,
				function(result) {
					var cData = result; 
					//isCacheEnabled should not be checked here
						StorageService.put(cacheKey, cData, StorageService.getCache("settingsUsersCache"));
					return cData;
				}
			);
		if(isCacheEnabled){
			sendRequest(cacheKey, "settingsUsersCache", success, requestWS);
		}else{
			requestWS();
		}
	};

	
	this.deleteUser = function(reqData, success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['USERS'].USER_DELETE;
		var cacheKey = "userList";
		var requestWS = postRequestWS(
	            RequestConstantsFactory['SETTINGS_URL'].USERS_DELETE, 
	            reqData,
	            success, 
	            fail,
				function(result) {
					var cData = result; 
					//isCacheEnabled should not be checked here
						StorageService.put(cacheKey, cData, StorageService.getCache("settingsUsersCache"));
					return cData;
				}
			);
		if(isCacheEnabled){
			sendRequest(cacheKey, "settingsUsersCache", success, requestWS, fail);
		}else{
			requestWS();
		}
	};
	
	/*----------------users page - role module-----------------*/
	
	this.getRolesListData = function(reqData, success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['USERS'].ROLE_LIST_TABLE;
		var cacheKey = "roleList" ;
		var requestWS = getRequestWS(
	            RequestConstantsFactory['SETTINGS_URL'].ROLES_LIST, 
	            success, 
	            fail,
				function(result) {
					var cData = result; 
					if(isCacheEnabled){
						StorageService.put(cacheKey, cData, StorageService.getCache("settingsUsersCache"));
					}
					return cData;
				}
			);
		if(isCacheEnabled){
			sendRequest(cacheKey, "settingsUsersCache", success, requestWS);
		}else{
			requestWS();
		}

	};
	
	this.addRoles = function(reqData, success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['USERS'].ROLE_ADD;
		var cacheKey = "roleList";
		var requestWS = postRequestWS(
	            RequestConstantsFactory['SETTINGS_URL'].ROLE_ADD, 
	            reqData,
	            success, 
	            fail,
				function(result) {
					var cData = result; 
					//isCacheEnabled should not be checked here
						StorageService.put(cacheKey, cData, StorageService.getCache("settingsUsersCache"));
					return cData;
				}
			);
		if(isCacheEnabled){
			sendRequest(cacheKey, "settingsUsersCache", success, requestWS);
		}else{
			requestWS();
		}
	};
	
	this.editRolesSave = function(reqData, success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['USERS'].ROLE_EDIT;
		var cacheKey = "roleList" ;
		var requestWS = postRequestWS(
	            RequestConstantsFactory['SETTINGS_URL'].ROLE_EDIT, 
	            reqData,
	            success, 
	            fail,
				function(result) {
					var cData = result; 
					//isCacheEnabled should not be checked here
						StorageService.put(cacheKey, cData, StorageService.getCache("settingsUsersCache"));
					return cData;
				}
			);
		if(isCacheEnabled){
			sendRequest(cacheKey, "settingsUsersCache", success, requestWS);
		}else{
			requestWS();
		}
	};
	
	this.deleteRole = function(reqData, success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['USERS'].ROLE_DELETE;
		var cacheKey = "roleList";
		var requestWS = postRequestWS(
	            RequestConstantsFactory['SETTINGS_URL'].ROLE_DELETE, 
	            reqData,
	            success, 
	            fail,
				function(result) {
					var cData = result; 
					//isCacheEnabled should not be checked here
						StorageService.put(cacheKey, cData, StorageService.getCache("settingsUsersCache"));
					return cData;
				}
			);
		if(isCacheEnabled){
			sendRequest(cacheKey, "settingsUsersCache", success, requestWS);
		}else{
			requestWS();
		}
	};
	
	this.getPermissionForRole = function(reqData, success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['USERS'].ROLE_PERMISSION;
		var cacheKey = "permissionRole" + JSON.stringify(reqData);
		var requestWS = postRequestWS(
	            RequestConstantsFactory['SETTINGS_URL'].USERS_PERMISSION_ROLES, 
	            reqData,
	            success, 
	            fail,
				function(result) {
	            	var cData = DataConversionService.toGetPermissionsForRole(result.permissionsList);
	            	if(isCacheEnabled){
						StorageService.put(cacheKey, cData, StorageService.getCache("settingsUsersCache"));
					}
					return cData;
				}
			);
		if(isCacheEnabled){
			sendRequest(cacheKey, "settingsUsersCache", success, requestWS);
		}else{
			requestWS();
		}
	};
	
	this.updatePermissionForRole = function(reqData, success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['USERS'].ROLE_PERMISSION_UPDATE;
		var cacheKey = "updatePermissionForRole";
		var requestWS = postRequestWS(
	            RequestConstantsFactory['SETTINGS_URL'].USERS_UPATE_PERMISSION_ROLES, 
	            reqData,
	            success, 
	            fail,
				function(result) {
	            	var cData = result;
	            	if(isCacheEnabled){
						StorageService.put(cacheKey, cData, StorageService.getCache("settingsUsersCache"));
					}
					return cData;
				}
			);
		if(isCacheEnabled){
			sendRequest(cacheKey, "settingsUsersCache", success, requestWS);
		}else{
			requestWS();
		}

	};
	
	
	
	/*------------------ audit Trail Page ----------------------*/
	//get Filter setup data
	this.getAuditTrailSetUp = function(reqData, success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['AUDIT_TRAIL'].AUDIT_TRAIL_SETUP;
		var cacheKey = "auditTrailSetUp" + JSON.stringify(reqData);
		var requestWS = getRequestWS(
	            RequestConstantsFactory['SETTINGS_URL'].AUDIT_TRAIL_SETUP, 
	            success, 
	            fail,
				function(result) {
	            	var result = {
						    "status": "OK",
						    "message": "Request processed successfully",
						    "moduleList": [
						        {
						            "moduleId": "mod001",
						            "moduleName": "Settings"
						        },
						        {
						            "moduleId": "mod002",
						            "moduleName": "DecisionWorkbench"
						        }
						    ],
						    "activityList": [
						        {
						            "activityId": "act001",
						            "activityName": "modified"
						        },
						        {
						            "activityId": "act002",
						            "activityName": "deleted"
						        }
						    ]
						};
					var cData = result; 
					if(isCacheEnabled){
						StorageService.put(cacheKey, cData, StorageService.getCache("settingsAuditTrailCache"));
					}
					return cData;
				}
			);
		if(isCacheEnabled){
			sendRequest(cacheKey, "settingsAuditTrailCache", success, requestWS);
		}else{
			requestWS();
		}

	};
	//get AuditTrail UserList data for setup 
	this.getUserList = function(success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['AUDIT_TRAIL'].AUDIT_TRAIL_USERLIST_SETUP;
		var cacheKey = "auditTrailUserList";
		reqData = {};
		var requestWS = getRequestWS(
	            RequestConstantsFactory['SETTINGS_URL'].USERS_LIST, 
	            success, 
	            fail,
				function(result) {
	            	var cData = DataConversionService.toGetAuditTrailUserList(result); 
					if(isCacheEnabled){
						StorageService.put(cacheKey, cData, StorageService.getCache("settingsAuditTrailCache"));
					}
					return cData;
				}
			);
		if(isCacheEnabled){
			sendRequest(cacheKey, "settingsAuditTrailCache", success, requestWS);
		}else{
			requestWS();
		}

	};
	//get AuditTrailList data
	this.getAuditTrailList = function(reqData, success, fail){
		var isCacheEnabled = EnabledCacheInfoFactory['AUDIT_TRAIL'].AUDIT_TRAIL_LIST_TABLE;
		var cacheKey = "auditTrailList" + JSON.stringify(reqData);
		reqData = {};
		var requestWS = postRequestWS(
	            RequestConstantsFactory['SETTINGS_URL'].AUDIT_TRAIL_LIST, 
	            reqData,
	            success, 
	            fail,
				function(result) {
					var cData = result; 
					if(isCacheEnabled){
						StorageService.put(cacheKey, cData, StorageService.getCache("settingsAuditTrailCache"));
					}
					return cData;
				}
			);
		if(isCacheEnabled){
			sendRequest(cacheKey, "settingsAuditTrailCache", success, requestWS);
		}else{
			requestWS();
		}

	};

})