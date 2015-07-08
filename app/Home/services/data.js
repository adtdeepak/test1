angular.module('Home')

.service("DataService", function(RequestConstantsFactory, NetworkService, UtilitiesService, StorageService, $timeout) {
	
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
	
})