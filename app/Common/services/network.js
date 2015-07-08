angular.module('AnalyticsApp')

.service('NetworkService', function($http, UtilitiesService, $q) {
	
	this.get = function(url, scope){
		// $http returns a promise, which has a then function, which also returns a promise

        //Define headers in Options here
        var options = {
            headers: {},
        };
		var deferred = $q.defer();
		var promise = $http.get(url, options).then(function (response) {
        
			// The then function here is an opportunity to modify the response

			
			// The return value gets picked up by the then in the controller.
			if(response.status == 200) {
				deferred.resolve(response.data);
			}else {
				console.info('DATA FETCH IS NOT SUCCESS!!!', response);
				deferred.resolve(response);
			}
		}, function(response){
            deferred.reject(response);
        }).catch(function(e){
            UtilitiesService.throwError(undefined, {message: "Network Error?! [NTWRK-SRVC]", type: "internal"});
        });
      
	  // Return the promise to the data service
      return deferred.promise;
	};
	
	this.post = function(url, data, scope) {
		// $http returns a promise, which has a then function, which also returns a promise
		
        //Define headers in Options here
        var options = {
        		headers: {}
        };
        if(url.indexOf("jsonstub") > 0) {
        	var stubUrl = [];
        	options.headers = {
        		'Content-Type': 'application/json',
        		'JsonStub-User-Key': 'f34ccacf-8a46-4347-be45-7c96a467d48e',
        		'JsonStub-Project-Key': 'a3c3d45f-7c04-44e1-82ec-c7ee398f8d30'
        	};
        		$.each(url.split('/'), function(key, eachSplit){
        			if(key>2){
            			stubUrl +='-'+eachSplit;
        			}
        		})
        		
        		var client = window.appConstants[localStorage.getItem('userName')];
        		if(client == undefined){
            		stubUrl = './app/Common/JSON_stubs/Hightail/'+ stubUrl +'.json';
        		}else{
        			//This will match the user with respective client
        			stubUrl = './app/Common/JSON_stubs/'+client+'/'+ stubUrl +'.json';
        		}
            	var deferred = $q.defer();
        		var promise = $http.get(stubUrl, options).then(function (response) {
                
        			// The then function here is an opportunity to modify the response

        			
        			// The return value gets picked up by the then in the controller.
        			if(response.status == 200) {
        				deferred.resolve(response.data);
        			}else {
        				console.info('DATA FETCH IS NOT SUCCESS!!!', response);
        				deferred.resolve(response);
        			}
        		}, function(response){
                    deferred.reject(response);
                }).catch(function(e){
                    UtilitiesService.throwError(undefined, {message: "Network Error?! [NTWRK-SRVC]", type: "internal"});
                });
              
        	  // Return the promise to the data service
              return deferred.promise;
        }
        var deferred = $q.defer();
		var promise = $http.post(url, data, options).then(function (response) {
			
			// The then function here is an opportunity to modify the response
			
			// The return value gets picked up by the then in the controller.
			if(response.status == 200) {
				deferred.resolve(response.data);
			}else {
				console.info('DATA FETCH IS NOT SUCCESS!!!', response);
				deferred.resolve(response);
			}
		}, function(response){
            deferred.reject(response);
        }).catch(function(e){
            UtilitiesService.throwError(undefined, {message: "Network Error?! [NTWRK-SRVC]", type: "internal"});
        });
		// Return the promise to the data service

		return deferred.promise;
	};
	
})


