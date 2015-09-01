angular.module('Analysis')

.service("DataService",function(RequestConstantsFactory, DataConversionService, NetworkService, StorageService, $rootScope, $q, $timeout, UtilitiesService ) {
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
	
	this.getUsergroupDeepdiveData = function(reqData, success, fail) {
		var requestWS = postRequestWS(
				'http://jsonstub.com/analysis/usergroup/deepdive', 
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
	
	
	this.getOverviewData = function(reqData, success, fail) {
		var requestWS = postRequestWS(
				'http://jsonstub.com/analysis/subs/cl/overview', 
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
	
	this.getProfileData = function(reqData, success, fail) {
		var requestWS = postRequestWS(
				'http://jsonstub.com/analysis/subs/cl/profile', 
				reqData,
				success, 
				fail,
				function(result) {
					return result;
				}
		);
		requestWS();
		
	};
	this.segmentOverviewData = function(reqData, success, fail) {
		var requestWS = postRequestWS(
				'http://jsonstub.com/segment/overview', 
				reqData,
				success, 
				fail,
				function(result) {
					return result;
				}
		);
		requestWS();
		
	};
	
	this.getEngagementData = function(reqData, success, fail) {
		var requestWS = postRequestWS(
				'http://jsonstub.com/analysis/subs/cl/engagement', 
				reqData,
				success, 
				fail,
				function(result) {
					return result;
				}
		);
		requestWS();
		
	};
	
	this.getRetentionData = function(reqData, success, fail) {
		var requestWS = postRequestWS(
				'http://jsonstub.com/analysis/subs/cl/retention', 
				reqData,
				success, 
				fail,
				function(result) {
					return result;
				}
		);
		requestWS();
		
	};
	
	this.getComparisonData = function(reqData, success, fail) {
		var requestWS = postRequestWS(
				'http://jsonstub.com/analysis/subs/sm/comparison', 
				reqData,
				success, 
				fail,
				function(result) {
					return result;
				}
		);
		requestWS();
		
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

	this.getBusinessImpactTrendData = function(reqData, success, fail) {
		console.log("reqData:", reqData)
		var cacheKey = "BITrend" + JSON.stringify(reqData);
		
		var requestWS = postRequestWS(
				RequestConstantsFactory['TRAC_URL'].GET_BI_DATE_BY_TIME +"/"+reqData.groupBy, 
				reqData,
				success, 
				fail,
				function(result) {
					var cData = DataConversionService.toBusinessImpactTrend(result);
					StorageService.put(cacheKey, cData, StorageService.getCache("business-impactCache"));
					return cData;
				}
		);
		sendRequest(cacheKey, "business-impactCache", success, requestWS);
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
	
	this.getSegmentationOverviewData = function(reqData, success, fail) {
		var requestWS = postRequestWS(
				'http://jsonstub.com/analysis/subs/segmentation/overview', 
				reqData,
				success, 
				fail,
				function(result) {
					return result;
				}
		);
		requestWS();
	};
	
	this.getSegmentationProfileData = function(reqData, success, fail) {
		var requestWS = postRequestWS(
				'http://jsonstub.com/analysis/subs/segmentation/profile', 
				reqData,
				success, 
				fail,
				function(result) {
					return result;
				}
		);
		requestWS();
	};
	
	this.getSegmentationEngagementData = function(reqData, success, fail) {
		var requestWS = postRequestWS(
				'http://jsonstub.com/analysis/subs/segmentation/engagement', 
				reqData,
				success, 
				fail,
				function(result) {
					return result;
				}
		);
		requestWS();
	};
	

});