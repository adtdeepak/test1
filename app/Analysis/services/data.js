angular.module('Analysis')

.service("DataService",function(NetworkService) {
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

});