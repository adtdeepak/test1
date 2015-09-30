angular.module('Tracking')

.service("DataService",function(RequestConstantsFactory, DataConversionService, NetworkService, StorageService, $rootScope, $q, $timeout, UtilitiesService) {
	
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
				RequestConstantsFactory['TRAC_URL'].GET_ACQ_TREND_DATA, 
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
	
	/*---------------------Business Impact page-------------------------*/
	this.getTrackSummaryDataBI = function(reqData, success, fail) {

		var cacheKey = "BIM" + JSON.stringify(reqData);
		var requestWS = postRequestWS(
				//RequestConstantsFactory['TRAC_URL'].GET_SUMMARY, 
				RequestConstantsFactory['TRAC_URL'].GET_FAKE_BI_SUMMARY,
				reqData,
				success, 
				fail,
				function(result) {
					var cData = DataConversionService.toGetTrackSummaryDataBI(result);
						StorageService.put(cacheKey, cData, StorageService.getCache("business-impactCache"));
					return cData;
				}
		);
		sendRequest(cacheKey, "business-impactCache", success, requestWS);
	};

	this.getBusinessImpactTrendData = function(reqData, success, fail) {
		var cacheKey = "BITrend" + JSON.stringify(reqData);
		
		var requestWS = postRequestWS(
				RequestConstantsFactory['TRAC_URL'].GET_BI_DATE_BY_TIME +"/"+reqData.groupBy, 
				reqData,
				success, 
				fail,
				function(result) {
					var cData = DataConversionService.toBusinessImpactTrend(result);
					//StorageService.put(cacheKey, cData, StorageService.getCache("business-impactCache"));
					return cData;
				}
		);
		requestWS();
		//sendRequest(cacheKey, "business-impactCache", success, requestWS);
	};

	this.getBusinessImpactDeepDiveTableData = function(reqData, success, fail) {
		var cacheKey = "BID" + JSON.stringify(reqData);
		var defered = $q.defer();
		var converted = false;
		var cacheKey = "BIM" + JSON.stringify(reqData);
		var requestWS = postRequestWS(
				RequestConstantsFactory['TRAC_URL'].GET_BI_DATA_USER, 
				reqData,
				success, 
				fail,
				function(result) {
					cData = DataConversionService.toGetBusinessImpactDeepDiveTableData(result);
					StorageService.put(cacheKey, cData, StorageService.getCache("business-impactCache"));
					return cData;
				}
		);
		sendRequest(cacheKey, "business-impactCache", success, requestWS);
	};
		

	/*---------------------Engagement Activity page-------------------------*/
	
	this.getEngagementActivityScoreData = function(reqData, success, fail) {

		var cacheKey = "EAScore" + JSON.stringify(reqData);

		var requestWS = postRequestWS(
				RequestConstantsFactory['TRAC_URL'].GET_EA_SCORE, 
				reqData,
				success, 
				fail,
				function(result) {
					//var cData = DataConversionService.toGetEngagementActivityScoreData(result);
					var cData = DataConversionService.toGetEAScoreTrend(result);
					//StorageService.put(cacheKey, cData, StorageService.getCache("engagement-activityCache"));
					return cData;
				}
		);
		sendRequest(cacheKey, "engagement-activityCache", success, requestWS);
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

	this.getEngagementActivityTrendData = function(reqData, success, fail) {
		var cacheKey = "EATrend" + JSON.stringify(reqData);
		var requestWS = postRequestWS(
				'http://jsonstub.com/track/getEATrend/'+reqData.groupBy, 
				reqData,
				success, 
				fail,
				function(result) {
					//var cData = DataConversionService.toGetEngagementActivityTrendData(result);
					//StorageService.put(cacheKey, cData, StorageService.getCache("engagement-activityCache"));
					var cData = DataConversionService.toGetEAScoreTrend(result);
					return cData;
				}
		);
		sendRequest(cacheKey, "engagement-activityCache", success, requestWS);
	};

	this.getEngagementActivityDeepDiveData = function(reqData, success, fail) {
		
		var cacheKey = "EADD" + JSON.stringify(reqData);
		var requestWS = postRequestWS(
				RequestConstantsFactory['TRAC_URL'].GET_EA_HEAT_MAP, 
				reqData,
				success, 
				fail,
				function(result) {
                    StorageService.put(cacheKey, result, StorageService.getCache("engagement-activityCache"));
					return result;
				}
		);
		sendRequest(cacheKey, "engagement-activityCache", success, requestWS);
	};
	
	this.getTrackModuleEngagementTableData = function(reqData, success, fail) {
		var cacheKey = "EAMC" + JSON.stringify(reqData);
		var converted = false;
		var requestWS = postRequestWS(
				RequestConstantsFactory['TRAC_URL'].GET_EA_DATA_MODULE, 
				reqData,
				success, 
				fail,
				function(result) {
					var cData = DataConversionService.toGetTrackModuleEngagementTableData(result);
					StorageService.put(cacheKey, cData, StorageService.getCache("engagement-activityCache"));
					return cData;
				}
		);
		sendRequest(cacheKey, "engagement-activityCache", success, requestWS);
	};
	
	/*---------------------User Engagement page-------------------------*/
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


	this.getUserGroupTrendData = function(reqData, success, fail) {
		var cacheKey = "UGTrend" + JSON.stringify(reqData);
		
		var requestWS = postRequestWS(
				//RequestConstantsFactory['TRAC_URL'].GET_GRP_ACQUISITION_TREND,
				'http://jsonstub.com/track/getUGTrend/'+reqData.groupBy,
				reqData,
				success, 
				fail,
				function(result) {
					//var cData = DataConversionService.toGetUserGroupTrendData(result);
					var cData = DataConversionService.toUGTrend(result);
					StorageService.put(cacheKey, cData, StorageService.getCache("user-group-engagementCache"));
					return cData;
				}
		);
		sendRequest(cacheKey, "user-group-engagementCache", success, requestWS);
	};
	
	this.getUserGroupDeepDiveData = function(reqData , success, fail) {
		var cacheKey = "UGDD" + JSON.stringify(reqData);
		var converted = false;
		var selectedPeriodData;
		var requestWS = function() {
			NetworkService.post(RequestConstantsFactory['TRAC_URL'].GET_GRP_DETAILS, reqData).then(function(result){
				if(!result)
					throw {message: "No Response from Server!", type: "internal"};
					var cData = result;
					StorageService.put(cacheKey+reqData.groupBy, cData, StorageService.getCache("user-group-engagementCache"));
					$.each(result.timeRanges, function(key, obj) {
						if(obj.periodName == $rootScope.selectedPeriod){
							console.log('timerange',$rootScope.selectedPeriod)
							selectedPeriodData = DataConversionService.toGetDeepDiveTableData(obj.data[0].groupDetails);
							if(reqData.groupBy == 'cmpgnView'){
								$rootScope.$broadcast('CampaignData',obj);
							}
							converted = true;
						}
					});
					if(!converted){
						//throw {message: "No Data for selected time period!", type: "internal"}
						fail(RequestConstantsFactory['ERROR_MSGS'].NETWORK_ERR);
					}
					if(success instanceof Function)
						success(selectedPeriodData);
			}, function(response) {
				if(fail instanceof Function) {
			    	fail(response);
                }
			}).catch(function(e){
				fail(RequestConstantsFactory['ERROR_MSGS'].DATA_ERR);
				//UtilitiesService.throwError(e);
			});

		}
		try{
			var dataInfo = StorageService.info(cacheKey+reqData.groupBy, StorageService.getCache("user-group-engagementCache"));
			var data = StorageService.getCache("user-group-engagementCache").get(cacheKey+reqData.groupBy);
			if(!dataInfo) {
				requestWS();
			}
			else{
				$.each(data.timeRanges, function(key, obj) {
					if(obj.periodName == $rootScope.selectedPeriod){
						selectedPeriodData = DataConversionService.toGetDeepDiveTableData(obj.data[0].groupDetails);
						if(reqData.groupBy == 'cmpgnView'){
							$rootScope.$broadcast('CampaignData',obj);
						}
						converted = true;
					}
				});
				if(!converted){
					//throw {message: "No Data for selected time period!", type: "internal"}
					fail(RequestConstantsFactory['ERROR_MSGS'].NETWORK_ERR);
				}
				if(success instanceof Function) {
					success(selectedPeriodData);
				}
			}
		} catch(e) {
			fail(RequestConstantsFactory['ERROR_MSGS'].DATA_ERR);
			//UtilitiesService.throwError({message: "Not found in Cache!", type: "internal"});
			$timeout(requestWS, 1000);
		}

	};

});