angular.module('Home')

.controller( "loginInit", function($scope, CustomService) {
	//Clearing the local storage
	localStorage.clear();
	setTimeout(function(){CustomService.appInit();},1);

})

.controller('loginController', function($scope, DataService, UtilitiesService, RequestConstantsFactory, $location, $window ) {

	//Constants needed for requests
	var requestConstants = RequestConstantsFactory['LOGIN'];
	//Constants needed for response
	var responseConstants = RequestConstantsFactory['RESPONSE'];
	//Request Initialization
	var requestData ={};
	$scope.loadingLoginResult = false;
	
	//Function to be executed after response from the server
	$scope.success = function(data){
		$scope.loadingLoginResult = false;
		
		if(data.status==responseConstants.STATUS_OKAY){
			$scope.showNetworkError = false;
			if(data.loginSuccess == true){
				$scope.loginError = false;
				$window.location="home.htm";
			}else{
				$scope.loginError = true;
			}
		}else{
			$scope.showNetworkError = true;
		}
	}

	//function executed when 'login' is clicked
	$scope.signIn = function(){
		$scope.loginError = false;
		$scope.loadingLoginResult = true;
		//request
		requestData[requestConstants.USER_NAME] = $scope.userName;
		requestData[requestConstants.PASSWORD] = $scope.password;
		//Setting username in local storage
		localStorage.setItem('userName', $scope.userName);
		if($scope.password == window.appConstants['password']){
			$window.location="home.htm";
		}else{
			$scope.loginError = true;
			$scope.loadingLoginResult = false;
		}
		//DataService call
		//DataService.getLoginDetails(requestData, $scope.success, $scope);
	}
})

