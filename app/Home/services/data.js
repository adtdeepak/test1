angular.module('Home')

.service("DataService", function(RequestConstantsFactory, NetworkService, UtilitiesService, StorageService, $timeout, DataConversionService) {
	
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
	
	/*------------------ login Page ----------------------*/
	this.getLoginDetails = function(reqData, success, scope){
		var requestWS = function() {
			NetworkService.post(RequestConstantsFactory['LOGIN_URL'], reqData, scope).then(function(result){
				console.log("result:", result)
				if(!result)
					throw {message: "No Response from Server!", type: "internal"};
				if(success instanceof Function)
					success(result);
			}).catch(function(e){

				UtilitiesService.throwError(scope,e);
			});
		}
		requestWS()
	};
	
	/*------------------ change password Page ----------------------*/
	this.getChangePasswordDetails = function(reqData, success, scope){
		var requestWS = function() {
			NetworkService.post(RequestConstantsFactory['CHANGE_PASS_URL'], reqData, scope).then(function(result){
				console.log("result:", result)
				if(!result)
					throw {message: "No Response from Server!", type: "internal"};
				if(success instanceof Function)
					success(result);
			}).catch(function(e){

				UtilitiesService.throwError(scope,e);
			});
		}
		requestWS()
	};
	
	/*---------------------Summary page-------------------------*/
	this.getTrackSummaryFunnelData = function(reqData, success, fail) {
		var cacheKey = "summaryFunnel" + JSON.stringify(reqData);
		var requestWS = postRequestWS(
				RequestConstantsFactory['TRAC_URL'].GET_ACQ_FUNNEL_DATA, 
				reqData,
				success, 
				fail,
				function(result) {
					var data = DataConversionService.toTrackSummaryAcqFunnelData(result);
					var cData = DataConversionService.toTrackSummaryAcqFunnel(data);
					StorageService.put(cacheKey, cData, StorageService.getCache("summaryCache"));
					return cData;
				}
		);
		sendRequest(cacheKey, "summaryCache", success, requestWS);
		
	};
	
	this.getTrackSummaryAcqTrend = function(reqData, success, fail) {
		var cacheKey = "summaryTrend" + JSON.stringify(reqData);
		var requestWS = postRequestWS(
				//RequestConstantsFactory['TRAC_URL'].GET_ACQ_TREND_DATA, 
				'http://jsonstub.com/home/trend/Visitors',
				reqData,
				success, 
				fail,
				function(result) {
					var cData = DataConversionService.toTrackSummaryAcqTrend(result);
					StorageService.put(cacheKey, cData, StorageService.getCache("summaryCache"));
					return cData;
				}
		);
		sendRequest(cacheKey, "summaryCache", success, requestWS);
	};
	
	this.getTrackSummaryDataBI = function(reqData, success, fail) {

		var cacheKey = "BIM" + JSON.stringify(reqData);
		var requestWS = postRequestWS(
				//RequestConstantsFactory['TRAC_URL'].GET_SUMMARY, 
				RequestConstantsFactory['TRAC_URL'].GET_FAKE_BI_SUMMARY,
				reqData,
				success, 
				fail,
				function(result) {
					console.log("BI Result:", result)
					var cData = DataConversionService.toGetTrackSummaryDataBI(result);
						StorageService.put(cacheKey, cData, StorageService.getCache("business-impactCache"));
					return cData;
				}
		);
		sendRequest(cacheKey, "business-impactCache", success, requestWS);
	};
	
	this.getTrackSummaryEngagementActivity = function(reqData, success, fail) {
		var cacheKey = "EAM" + JSON.stringify(reqData);
		
		var requestWS = postRequestWS(
				RequestConstantsFactory['TRAC_URL'].GET_FAKE_EA_SUMMARY, 
				//RequestConstantsFactory['TRAC_URL'].GET_FAKE_EA_SUMMARY, 
				reqData,
				success, 
				fail,
				function(result) {
					var cData = DataConversionService.toGetTrackSummaryEngagementActivity(result);
					StorageService.put(cacheKey, cData, StorageService.getCache("engagement-activityCache"));
					return cData;
				}
		);
		sendRequest(cacheKey, "engagement-activityCache", success, requestWS);
	};
	

	
		this.getTrackSummaryUserGroup = function(reqData, success, fail) {
		var cacheKey = "UGS" + JSON.stringify(reqData);

		var requestWS = postRequestWS(
				RequestConstantsFactory['TRAC_URL'].GET_GRP_SUMMARY, 
				reqData,
				success, 
				fail,
				function(result) {
					var cData = DataConversionService.toUserGroupSummary(result);
					StorageService.put(cacheKey, cData, StorageService.getCache("user-group-engagementCache"));
					return cData;
				}
		);
		sendRequest(cacheKey, "user-group-engagementCache", success, requestWS);
	};
	
	this.getUserSettings = function(groupBy, success, fail) {
		var reqData = {
				"mode":"free",
		};
		reqData["groupBy"] = groupBy;
		//not using request as key on purpose
		var cacheKey = groupBy + "userSettings";
		console.log("rsrsrs:", reqData)
		var requestWS = postRequestWS(
				RequestConstantsFactory['TRAC_URL'].GET_USER_SETTINGS +"/"+groupBy, 
				reqData,
				success, 
				fail,
				function(result) {
					console.log("rrrrrrrr:", result)
					var cData = result;
					StorageService.put(cacheKey, cData, StorageService.getCache("user-settingsCache"));
					return cData;
				}
		);
		sendRequest(cacheKey, "user-settingsCache", success, requestWS);
	}

	this.saveUserSettings = function(groupBy, data, success,fail) {
		var cacheKey = groupBy + "userSettings";
		//clear out the cache on save. so that data get updated on reload
		StorageService.remove(cacheKey, StorageService.getCache("user-settingsCache"));
		NetworkService.post(RequestConstantsFactory['TRAC_URL'].POST_USER_SETTINGS, data).then(function(result) {
			success(result);
		}, function(response) {
			if(fail instanceof Function) {
		    	fail(response);
            }
		});
	}
})