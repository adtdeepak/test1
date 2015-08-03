angular.module("Settings")

.controller("goalsInit", function ($scope, CustomService) {

	angular.element(document).ready(function () {
		setTimeout(function () { CustomService.appInit() }, 1);
	});

})

.controller("goalsTableController", function ($scope, $q, ngTreetableParams, DataService, RequestConstantsFactory , $rootScope) {
	 
	$scope.dataLoaded = false;
	//To load the goals table when 'edit' functionality is done
    $rootScope.$on('goalsDataChange', function (event, data) {
        $scope.addData(data);
    });
	//Constants needed for requests
	var requestContants = RequestConstantsFactory['GOALS'];
	var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
	var today = new Date();
	//Getting today's date in needed format
	var toDate = moment(today).endOf('year').format(window.appConstants.DATE_FORMAT);
	var fromDate =  moment(today).startOf('year').format(window.appConstants.DATE_FORMAT);
	
    $scope.addData = function (data) {
        $scope.deferred.resolve(data);
        $scope.error = false;
        $scope.dataLoaded = true;
    };
    $scope.goalValues = new ngTreetableParams({
        getNodes: function (parent) {
            $scope.deferred = $q.defer();
            loadGoalTableData();
            return parent ? parent.children : $scope.deferred.promise;
        },
        getTemplate: function (node) {
            return 'tree_node';
        }

	});
    
    $scope.fail = function (msg) {
        $scope.error = true;
        $scope.hasErrorMsg = true;
        if(msg){
        	if(msg instanceof Object){
        		$scope.errorMsg = (msg.statusText == "" ? errorConstants.NETWORK_ERR  : msg.statusText);
        	} else {
                $scope.errorMsg = msg;
        	}
        }
    }
	var requestData = {};
	var timeRange = {};
	var cacheKey = "goalTable" + JSON.stringify(requestData);
	function loadGoalTableData() {
		//request
		timeRange[requestContants.FROM_DATE] = fromDate;
		timeRange[requestContants.TO_DATE] = toDate;
		requestData[requestContants.TIME_RANGE] = timeRange;
		console.log("requestData", requestData)
		var func = $scope.addData;
		if (arguments[1]) {
			if (arguments[1].key == cacheKey) {
				func = null;
			} else {
				return false;
			}
		}
		DataService.getGoalTableData(requestData, func, $scope.fail);
	}

	loadGoalTableData();
})

.controller("goalsFilterController", function($scope, fileUpload , UtilitiesService, RequestConstantsFactory){

	$scope.options = {
			autoUpload : true,
            url: RequestConstantsFactory['SETTINGS_URL'].GOALS_UPLOAD
    };
	var requestConstants = RequestConstantsFactory['NOTIFICATION'];
	/* Handle all events related to File Uploads here */

	var uploadSuccess = function(){
		UtilitiesService.getNotifyMessage("File Uploaded Successfully",requestConstants.SUCCESS);
		$scope.fileUploadDone = false;
        console.log("File Upload done.!!", arguments);
	},
	uploadProgressing = function(){
		console.log("File Upload processing.!!", arguments);
	},
	uploadFileAdded = function(){
		$scope.fileUploadDone = true;
		console.log("File Added.!!", arguments);
	},
	uploadFail = function (arguments) {
		UtilitiesService.getNotifyMessage("File Upload Failed",requestConstants.FAILURE);
		$scope.fileUploadDone = false;
		console.log("File Upload Failed!!", arguments);
	}

	$scope.$on('fileuploaddone', uploadSuccess);
	$scope.$on('fileuploadprogress', uploadProgressing);
	$scope.$on('fileuploadadd', uploadFileAdded);
	$scope.$on('fileuploadfail', uploadFail);
	$scope.$on('fileuploadprocessfail ', uploadFail);
	$scope.$on('fileuploadchunkfail', uploadFail);


})
.controller("goalsModalController", function ($scope,$rootScope,DataService,UtilitiesService, RequestConstantsFactory ) {
	
	 var constants = RequestConstantsFactory['GOALS'];
	 var requestConstants = RequestConstantsFactory['NOTIFICATION'];
	  var errorConstants = RequestConstantsFactory['ERROR_MSGS'];
	 console.log("CONST",constants.GOAL_ID)
	//When editgoals modal is clicked
	$rootScope.$on('goalEdit', loadEditGoalData);
	$scope.dataLoaded = true;
	$scope.savingGoals = false;
	var goalId;
	var editGoalsSaveRequest = {};
	//sucess function for users
    $scope.success = function (data) {
        try {
        	 $scope.dataLoaded = true;
             $scope.error = false;
            if (!data) {
                throw "noDataError";
            }
            if (data.status == 'OK') {
                $rootScope.$broadcast('goalsDataChange', data);
                $('#mask, .window').hide();
                $scope.savingGoals = false;
                UtilitiesService.getNotifyMessage("Goals Updated Successfully",requestConstants.SUCCESS);
            }
            else{
            	$scope.showError = true;
            	 $scope.savingGoals = false;
            }
        } catch (e) {
        	$scope.fail(errorConstants.DATA_ERR);
        }
    };
    $scope.fail = function (msg) {
        $scope.error = true;
        $scope.hasErrorMsg = true;
        $scope.savingGoals = false;
        if(msg){
        	if(msg instanceof Object){
        		$scope.errorMsg = (msg.statusText == "" ? errorConstants.NETWORK_ERR  : msg.statusText);
        	} else {
                $scope.errorMsg = msg;
        	}
        }
    }


	//Set the datas to scope to populate the edit goals modal
	$scope.editGoalsSuccess = function (goalTableData) {
		try {
			$scope.dataLoaded = true;
			$scope.error = false;
			if (!goalTableData) {
				throw "noDataError";
			}
			//Set the scope variables to show data in editGoal modal
				getGoalValues(goalTableData);
			
		} catch (e) {
			$scope.fail(errorConstants.DATA_ERR);
		}
	};  

	//Creating request when  save button is clicked in 'edit' modal
	$scope.editGoalsSave = function(){
		$scope.savingGoals = true;
		if(!editGoalsForm.checkValidity()){
			$scope.savingGoals = false;
			return false;
		}
		$scope.dataLoaded = false;
        //Request
        editGoalsSaveRequest[constants.GOAL_ID] = goalId;
        editGoalsSaveRequest[constants.GOAL_PERIOD] = $scope.time;
        editGoalsSaveRequest[constants.REVENUE] = $scope.revenue;
        editGoalsSaveRequest[constants.NPU] = $scope.NPU;
        editGoalsSaveRequest[constants.CONV_RATE] = $scope.conversionRate;
        editGoalsSaveRequest[constants.NEW_SIGNUPS] = $scope.newSignUp;
        editGoalsSaveRequest[constants.PAGE_VIEWS] = $scope.pageView;
        //function call
        goalsEditSave(editGoalsSaveRequest);
	}
	 
	// To iterate throw the tree and get the goals row data
	function getGoalValues(goalTableChildData){
		$.each(goalTableChildData, function (index, eachRow) {
			if (eachRow.goalId == goalId) {
				$scope.time = eachRow.goalPeriod;
				$scope.revenue = UtilitiesService.getIntFromString(eachRow.revenue);
				$scope.NPU = UtilitiesService.getIntFromString(eachRow.npu);
				$scope.conversionRate = eachRow.convRate;
				$scope.newSignUp = UtilitiesService.getIntFromString(eachRow.newSignUps);
				$scope.pageView = UtilitiesService.getIntFromString(eachRow.pageViews);
				$scope.$apply();
			}
			else{ 
				if(eachRow.children){
					getGoalValues(eachRow.children);
				}
			}
		});
	}
	/*--------For modal data-------*/
	// To get the data for edit users modal 
	function loadEditGoalData(object, id) {
		$scope.showError = false;
		$scope.savingGoals = false;
		$scope.error = false;
		$scope.$apply();
		var requestData = {};
		goalId = id;
		var func = $scope.editGoalsSuccess;
		DataService.getGoalTableData(requestData, func, $scope.fail);
	}
	//to save the edited goals
    function goalsEditSave(requestData) {
        var func = $scope.success;
        DataService.editGoalsSave(requestData, func, $scope.fail);
    }
})


