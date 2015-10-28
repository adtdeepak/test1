angular.module('DecisionWorkbench')
	
.controller("customFilterController", function ($scope, $element, $location, RequestConstantsFactory, DataService, $rootScope, CustomService, UtilitiesService, sharedProperties) {
	var parsed_result_usergroup;
	var parsed_result_featuregroup;
	$scope.apply = function (argument) {
		var usergroups = $scope.selectedusers;
		var featuregroups = $scope.selectedfeatures;
		if(usergroups)
			parsed_result_usergroup = angular.fromJson(usergroups);
		if(featuregroups)
			 parsed_result_featuregroup = angular.fromJson(featuregroups);
		getInnerPageData();
		getAllUserTableData();

	};
	// var params = $location.search();
	// var usergroups = $scope.selectedusers;
	// var featuregroups = $scope.selectedfeatures;
	// if(usergroups)
	// 	var parsed_result_usergroup = angular.fromJson(usergroups);
	// if(featuregroups)
	// 	var parsed_result_featuregroup = angular.fromJson(featuregroups);

// 	setTimeout(function(){
// 		var obj=$('#done');
// 		for (var i in parsed_result_usergroup) {
// 		    var val=parsed_result_usergroup[i];
// 		   obj.find('option[value="'+val+'"]').attr('selected','selected');
// 		}
// 		$("#done").selectpicker("refresh");
// 		var obj1=$('#done1');
// 		for (var i in parsed_result_featuregroup) {
// 		    var val1=parsed_result_featuregroup[i];
// 		   obj1.find('option[value="'+val1+'"]').attr('selected','selected');
// 		}
// 		$("#done1").selectpicker("refresh");
// },500);
	// $scope.featureDropdownText = '3rd Party Integration API';
	$scope.rowClicked = function(attribute){
		console.log("clicked controller:", attribute);
		window.location = "#/overview-details?selectedGroup="+attribute;
	}

	//function to be executed when wishlist is selected
	$scope.wishlistSelected = function(attribute, isSelected){
		console.log("attribute",attribute);
		var selectedId = attribute.split('=')[1];
		selectedId = selectedId.split('&')[0];
		$.each($scope.fullResponse.data.bestCampaignOptions, function(key, value){
			if(key == "All Users"){
				$.each(value, function(index, eachRow){
					if(eachRow.id == selectedId){
						eachRow.wishlist = isSelected;
						selectedGroup = eachRow.userGroup;
					}
				})
			}
		})
		console.log("selectedGroup:", selectedGroup);
		$.each($scope.fullResponse.data.bestCampaignOptions, function(key, value){
			if(key == selectedGroup){
				$.each(value, function(index, eachRow){
					if(eachRow.id == selectedId){
						eachRow.wishlist = isSelected;
						selectedGroup = eachRow.userGroup;
					}
				})
			}
		})
		localStorage.setItem('OverviewDetails', JSON.stringify($scope.fullResponse));
	}
	
	//function to be executed when execute is selected
	$scope.executeSelected = function(attribute, isSelected){
		console.log("attribute executeSelected",attribute, isSelected);
		var selectedId = attribute.split('=')[1];
		selectedId = selectedId.split('&')[0];
		$.each($scope.fullResponse.data.bestCampaignOptions, function(key, value){
			if(key == "All Users"){
				$.each(value, function(index, eachRow){
					if(eachRow.id == selectedId){
						eachRow.selected = isSelected;
						selectedGroup = eachRow.userGroup;
					}
				})
			}
		});
		
		$.each($scope.fullResponse.data.bestCampaignOptions, function(key, value){
			if(key == selectedGroup){
				$.each(value, function(index, eachRow){
					if(eachRow.id == selectedId){
						eachRow.selected = isSelected;
						selectedGroup = eachRow.userGroup;
					}
				})
			}
		})
		localStorage.setItem('OverviewDetails', JSON.stringify($scope.fullResponse));
	}
	

	//Overall campaign data
	$scope.overallDataSuccess = function(response){
		$scope.overallResponse = response.data;
		console.log(parsed_result_usergroup);
		var merged_usergroup = [];
		var merged_featuregroup = [];
		angular.forEach(parsed_result_usergroup,function(value) {
			// console.log(response.data[value]);
			$.merge(merged_usergroup, response.data[value]);
		})
		angular.forEach(parsed_result_featuregroup,function(value) {
			// console.log(response.data[value]);
			$.merge(merged_featuregroup, response.data[value]);
		})
		var merged = $.merge(merged_usergroup, merged_featuregroup);

		console.log(merged);
		$scope.addData(merged);
		// $scope.clickUserGroup($scope.userGroupDropdownText);
		// $scope.clickFeature($scope.featureDropdownText);
		// $scope.addUserGroupsTableData(response.data.jobHoppers);
		// $scope.addFeaturesTableData(response.data.photographers);
	};
	
	//Gettiing inner page data
	$scope.innerPageDataSuccess = function(response){
		$scope.fullResponse = response;
	};
	
	$scope.options = UtilitiesService.getDataTableOptions();
	$.extend(true, $scope.options, columOptions);
	//Table options for overall Table
	var columOptions = {
			"aoColumns" : [ {
				"sClass" : "each-row-details",
				"sWidth" : "100px"
			}, {
				"sClass" : "each-row-details",
				"sWidth" : "180px"
			}, {
				"sClass" : "each-row-details",
				"sWidth" : "110px"
			}, {
				"sClass" : "each-row-details",
				"sWidth" : "200px"
			}, {
				"sClass" : "each-row-details",
				"sWidth" : "180px"
			},{
				"sClass" : "",
				"sWidth" : "100px"
			}, {
				"sClass" : "",
				"sWidth" : "100px"
			}],
			'fnCreatedRow': function (nRow, aData, iDataIndex) {
				  $.each($('td', nRow), function (colIndex) {
					  if(aData){
						  $(this).attr('attr', 'All Users&selectedId='+aData[0]+'&type='+aData[7]);
					  }
			            // For example, adding data-* attributes to the cell
			           /* $(this).attr('attr', "Enterprise users");*/
			        });
		    },
		    "bPaginate":false,
		    "sScrollX": "100%",
			"fnRowCallback" : function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
				if(iDisplayIndex%2 != 0){
					className = "oddRowColor";
				}else{
					className = "evenRowColor";
				}
				$(nRow).addClass(className);
			}
		};
		$.extend(true, $scope.options, columOptions);


		//Populating data for overall table
	$scope.addData = function(data) {

	    $rootScope.builddoLoad = true;
		$scope.dataLoaded = true;
		if (!data)
			throw "noDataError";
		try {
			$scope.error = false;
			$scope.options.aaData = [];
			$.each(data, function(key, obj) {
				var executeSection = "<a href='resources/selected_campaign_info.xlsx' download><div class='execute-unselected'></div></a>";
					$scope.options.aaData.push([obj.id, obj.userGroup, obj.featurePromoted,  obj.description, obj.impact,
					                           "<div class='wishlist-unselected'></div>" , executeSection, obj.campaignType]);
				})
		} catch (e) {
			$scope.fail(errorConstants.DATA_ERR);
		}
	};
	

	//Get all user data
	function getAllUserTableData() {
		var requestData = {};
		var func = $scope.overallDataSuccess; 
    	if (arguments[1]) { 
    		if (arguments[1].key == cacheKey) { 
    			func = null; 
    		} else { 
    			return false; 
    		} 
    	} 
    	DataService.getAllUserData(requestData, func, $scope.fail); 
	
	} 
	//Get inner page data
	function getInnerPageData() {
		var requestData = {};
		var func = $scope.innerPageDataSuccess; 
    	if (arguments[1]) { 
    		if (arguments[1].key == cacheKey) { 
    			func = null; 
    		} else { 
    			return false; 
    		} 
    	} 
    	DataService.getOverviewDetailsData(requestData, func, $scope.fail); 
	
	} 
	getInnerPageData();
	getAllUserTableData();
})


















		// var custom = $location.search();
		// $scope.selectedusers = custom.usergroup;
		// alert(custom. usergroup);

		// var temp;
		// var notifyRequestConstants = RequestConstantsFactory['NOTIFICATION'];
		// $scope.conversionActivities = [];
		// //$scope.filter = 'false';
		// $scope.thisPage = $location.path();
		// $scope.perAmount = 0;
		// $scope.numAmount = 0;
	 //    $scope.uplift = 0;
	 //    //Used to show spinner in search result
	 //    $rootScope.loadingDOSearchResult = false;
	 //    $scope.groupsCleared = false;
	 //    $scope.activitiesCleared = false;
	 //    $scope.dateCleared = false;

	 //    //NEW Drag-drop Plugin code
	 //    $scope.availUG = [];
	 //    $scope.selectedUG = [];
	 //    $scope.availCA = [];
	 //    $scope.selectedCA = [];

	 //    $scope.sliderConfig = {
		// 		min: 0,
		// 		max: 1000,
		// 		step: 1
		// }
		// $scope.value = {
		// 		num: 0,
		// 		per: 0
		// }

		// $scope.closeFilter = function() {
		// 	$('.xclose').trigger('click');
		// 	$('.acc_link').trigger('click');
		// }
	    
	 //    $scope.clearFilterClicked = function(){
		// 	$scope.value.num  = 0;
		// 	$scope.clearActiveDate();
		// 	$rootScope.$broadcast('clearAllFilters');
		// };

		// //For displaying the date values in the filter selection
		// $scope.dateChanged = function(){
		// 	$scope.dateCleared = false;
		// }

		// //Success function for all filters 
		// $scope.success = function (filterData) {
		// 	try {
		// 		$scope.error = false;
		// 		//For user groups
	 //            $.each(filterData['listOfUserGroups'], function(key, item){
	 //                if(item.default == true){
	 //                    $scope.selectedUG.push(item);
	 //                }else{
	 //                    $scope.availUG.push(item);
	 //                }
	 //            });
	 //            //For conversion activities
		// 		$.each(filterData['listOfConvActivity'], function(key, item){
	 //                if(item.default == true){
	 //                    $scope.selectedCA.push(item);
	 //                }else{
	 //                    $scope.availCA.push(item);
	 //                }
	 //            });

	 //            //For the active till date - start and end date
		// 		$scope.fromDate = filterData['activeTillDate'].greaterThanDate;
		// 		$scope.toDate = filterData['activeTillDate'].lessThanDate;
	            
	 //            //For the slider max and min
		// 		$scope.sliderConfig.max = sharedProperties.getMaxValue() * 2;
		// 		//$scope.value.num = filterData['convUplift'].greaterThan;
		// 		$scope.value.num = sharedProperties.getDeficitValue();
		// 	} catch (e) {
		// 		$scope.error = true;
		// 		UtilitiesService.throwError($scope, e);
		// 	}
		// }

	 //    //NEW Drag-Drop plugin implementation



	 //    //for watching slider - percentage & value change 
		// $scope.$watchCollection('value', function (newValue, oldValue) {
		// 	if($('.contentPanel-filter .switch').hasClass('on')){
		// 		$scope.uplift = $scope.value.num;
		// 		$scope.uplift = UtilitiesService.getLocaleString($scope.uplift);
		// 	}else{
		// 		$scope.uplift = $scope.value.per;
		// 	}
		// 	//If percent input has changed
		// 	if ($(':focus').hasClass('perval')) {
		// 		$scope.percent = newValue.per.split('%');
		// 		$scope.value.num = ($scope.percent[0] * $scope.sliderConfig.max) / 100 | 0;
		// 	}
		// 	else {
		// 		$scope.value.per = (((newValue.num / $scope.sliderConfig.max) * 100).toFixed(1)) + '%';
		// 	}
		// });

		// //converting to percentage
		// $scope.toPercent = function (input) {
		// 	return $filter('number')(input * 100) + '%';
		// };

	 //    $scope.filterSearchResults = function() {
	 //    	if($scope.selectedUG.length == 0 || $scope.selectedCA.length == 0){
	 //    		$rootScope.loadingDOSearchResult = false;
	 //    		 $scope.loadingDOSearchResult = false;
	 //    		UtilitiesService.getNotifyMessage(window.notifyConstants.NOTIFY_DW_FILTER_SELECT_ATLEAST,notifyRequestConstants.SUCCESS);
	 //    		return false;
	 //    	}
	 //    console.log("reviewDOFilterClicked");
	 //        $rootScope.$broadcast('reviewDOFilterClicked');
	 //    }

		//  $rootScope.$on('clearAllFilters', function () {
		//    $scope.availUG = $.merge($.merge([],$scope.availUG), $scope.selectedUG);
	 //       $scope.selectedUG = [];
	 //       $scope.availCA = $.merge($.merge([],$scope.availCA), $scope.selectedCA);
	 //       $scope.selectedCA = [];
	       
	 //       //conversion activities
		//    $scope.groupsCleared = true;
	 //       $scope.activitiesCleared = true;
	 //       $scope.uplift = 0;
	 //       $scope.dateCleared = true;
	 //  });
		 
		//  $scope.clearActiveDate = function() {
	 //        $scope.fromDate = "";
	 //        $scope.toDate = "";
	 //        $scope.dateCleared = true;
	 //     }

		// $scope.clearConversionUplift = function() {
		// 	$scope.value.num=0;
		// 	$scope.builddoButtonClicked();
		// };
		// $scope.clearUserGroups = function() {
		// 	$scope.availUG = $.merge($.merge([],$scope.availUG), $scope.selectedUG);
	 //        $scope.selectedUG = [];
	 //        $scope.groupsCleared = true;
		// 	$scope.builddoButtonClicked();
		// };
		// $scope.clearConversionActivities = function() {
		// 	$scope.availCA = $.merge($.merge([],$scope.availCA), $scope.selectedCA);
	 //        $scope.selectedCA = [];
	 //        $scope.activitiesCleared = true;
		// 	$scope.builddoButtonClicked();
		// };

	 //    $scope.$on('showBestDecision', function(){
	 //        $scope.value.num = sharedProperties.getDeficitValue(); 
	 //        $scope.builddoButtonClicked('/builddo', true);
	 //    })

		
		// $(document).off("click", ".filterDecisionOptions").on("click", ".filterDecisionOptions", function(e){
		// 	e.preventDefault();
		// 	$scope.$apply();
		// });
		// $scope.buildDoTable = function(result){
		// 	$rootScope.$broadcast("builddoTableData", result);
		// }
	    
		// //used in review-do filtering
		// $rootScope.filterDataBySelectedOptions = function(data) {
	 //        var _data = [];
	 //        var finalResult = {};
		// 	$.each(data.doList, function(key, record) {
	 //            var validRecord = true;
		// 		var validUserGroup = true;
		// 		var validActivity = true;
				
		// 		//Check if the selected user groups are available in the record
		// 		if($.merge($.merge([],$scope.availUG), $scope.selectedUG).length > 0) {
		// 			$.each($.merge($.merge([],$scope.availUG), $scope.selectedUG), function(key, userGroup){
		// 				if(userGroup.default) {
		// 					var recordFound = false;
	 //                        $.each(record.userGroupList, function(key, userGroupData){
		// 						if(!recordFound) {
		// 							recordFound = userGroup.groupId.indexOf(userGroupData.groupId)>-1;
		// 						}
		// 					});
		// 					validUserGroup = validUserGroup && recordFound;
		// 				}
		// 			});
		// 		}
		// 		validRecord = validUserGroup;
				
		// 		if($.merge($.merge([],$scope.availCA), $scope.selectedCA).length > 0) {
		// 			$.each($.merge($.merge([],$scope.availCA), $scope.selectedCA), function(key, activity){
		// 				if(activity.default) {
		// 					var recordFound = false;
		// 					$.each(record.targetConvActivityList, function(key, activityData){
		// 						if(!recordFound) {
	 //                                recordFound = activity.convActivityId.indexOf(activityData.convActivityId)>-1;
		// 						}
		// 					});
		// 					validRecord = validRecord && recordFound;
		// 				}
		// 			});
		// 		}
				
		// 		var activeEndDate = moment(record.activeEndDate);
		// 		var activeStartDate = moment(record.activeStartDate);
				
		// 		if($scope.fromDate != "") {
		// 			validRecord = validRecord && moment($scope.fromDate).isBefore(activeStartDate);
		// 		}
		// 		if($scope.toDate != ""){
		// 			validRecord = validRecord && moment(activeEndDate).isBefore($scope.toDate);
		// 		}
				
		// 		validRecord = validRecord && (record.expectedNewSub >= $scope.value.num);
				
		// 		if(validRecord) {
		// 			_data.push(record);
		// 		}
		// 	});
		// 	finalResult['doList'] = _data;
	 //        console.log("result:", finalResult);
		// 	return finalResult;
		// }
		// $scope.fail = function () {
	 //        $scope.error = true;
	 //        //$scope.hasErrorMsg = true;
	 //        //$scope.errorMsg = "Network Error !!";
	 //    }

		// $scope.setDOSuccess = function(){
		// 	$scope.loadingDOSearchResult = false;
		// //	UtilitiesService.getNotifyMessage(window.notifyConstants.NOTIFY_DW_DO_UPDATED,notifyRequestConstants.SUCCESS);
		// }
		// $scope.builddoButtonClicked = function(url, isBestDecision){
	 //        $rootScope.loadingDOSearchResult = true;
	 //        $scope.loadingDOSearchResult = true;
	 //        if(!$scope.filterForm.$valid){
	 //        	$scope.loadingDOSearchResult = false;
	 //        	$('form').addClass("formError");
		// 		return false;
		// 	} else {
		// 		$('form').removeClass("formError");
		// 	}
	        
	 //        if(!isBestDecision){
	 //        	if($scope.selectedUG.length == 0 || $scope.selectedCA.length == 0){
	 //        		$rootScope.loadingDOSearchResult = false;
	 //        		 $scope.loadingDOSearchResult = false;
	 //        		UtilitiesService.getNotifyMessage(window.notifyConstants.NOTIFY_DW_FILTER_SELECT_ATLEAST,notifyRequestConstants.SUCCESS);
	 //        		return false;
	 //        	}
	 //        }
		// 	var requestSetDO = {};
		// 	var listOfUserGroups = [];
		// 	var listOfConvActivity = [];
		// 	var filter = {};
			
		// 	requestSetDO['mode'] = $rootScope.selectedUserMode;
		// 	window.appConstants.AVAILABLE_PERIODS.forEach(function(period){
		// 		if(period.periodName == $rootScope.selectedPeriod) {
		// 			requestSetDO['timeRange'] = UtilitiesService.getPeriodData(period); 
		// 		}
		// 	})
		// 	$.each($.merge($.merge([],$scope.availUG), $scope.selectedUG), function(key, userGroup){
		// 		if(userGroup.default) {
		// 			var tempObj = {
		// 					"groupId": userGroup.groupId,
		// 					"groupName": userGroup.groupName
		// 			};
		// 			listOfUserGroups.push(tempObj);
		// 		}
		// 	});
		// 	$.each($.merge($.merge([],$scope.availCA), $scope.selectedCA), function(key, activity){
		// 		if(activity.default) {
		// 			var tempObj = {
		// 					"convActivityId": activity.convActivityId,
		// 					"convActivityName": activity.convActivityName
		// 			};
		// 			listOfConvActivity.push(tempObj);
		// 		}
		// 	});
		// 	filter['activeTillDate'] = {
		// 			"greaterThanDate": $scope.fromDate,
		// 			"lessThanDate": $scope.toDate
		// 	};
		// 	filter['convUplift'] = {
		// 			"greaterThan": $scope.value.num,
		// 			"asPercentage": false
		// 	};
		// 	filter['listOfUserGroups'] = listOfUserGroups;
		// 	filter['listOfConvActivity'] = listOfConvActivity;
		// 	requestSetDO['filter'] = filter;
		// 	function saveDecision() {
		// 		//var requestData = UtilitiesService.getRequestData();
		// 		//requestData = angular.extend({}, requestData, request);
		// 		var requestData = getDOSettingsSaveRequest();
		// 		var func = $scope.setDOSuccess; 
		// 		var cacheKey = "DWIndexSave" + JSON.stringify(requestData);
		// 		if (arguments[1]) { 
		// 			if (arguments[1].key == cacheKey) { 
		// 				func = null; 
		// 			} else { 
		// 				return false; 
		// 			} 
		// 		}
		// 		DataService.setDOSettings(requestData, func, $scope.fail);
		// 	}
			
		// 	function redirect() {
		// 		$rootScope.loadingDOSearchResult = false;
		// 		if(url){
		// 			$location.path(url).search({flow:"false"});
		// 		}
				
		// 	}
			
		// 	function getDOSettingsSaveRequest() {
	 //            console.log("MERGE",$.merge($.merge([],$scope.availUG), $scope.selectedUG), $.merge($.merge([],$scope.availCA), $scope.selectedCA));
		// 		var requestSetDO = {};
		// 	      var listOfUserGroups = [];
		// 	      var listOfConvActivity = [];
		// 	      $.each($.merge($.merge([],$scope.availUG), $scope.selectedUG), function(key, userGroup){
		// 	             var tempObj = {
		// 	                          "groupId": userGroup.groupId,
		// 	                          "groupName": userGroup.groupName,
		// 	                          "selected": userGroup.default
		// 	             };
		// 	             listOfUserGroups.push(tempObj);
		// 	      });
		// 	      $.each($.merge($.merge([],$scope.availCA), $scope.selectedCA), function(key, activity){
		// 	             var tempObj = {
		// 	                          "convActivityId": activity.convActivityId,
		// 	                          "convActivityName": activity.convActivityName,
		// 	                          "selected": activity.default
		// 	             };
		// 	             listOfConvActivity.push(tempObj);
		// 	      });
		// 	      requestSetDO['activeTillDate'] = {
		// 	                   "greaterThanDate": $scope.fromDate,
		// 	              "lessThanDate": $scope.toDate
		// 	      };
		// 	      requestSetDO['convUplift'] = {
		// 	                   "greaterThan": $scope.value.num,
		// 	              "asPercentage": true
		// 	      };
		// 	      requestSetDO['listOfUserGroups'] = listOfUserGroups;
		// 	      requestSetDO['listOfConvActivity'] = listOfConvActivity;
		// 	      return requestSetDO;
		// 	}

		// 	function loadDecisionOptionsTable() {
		// 		//var requestData = UtilitiesService.getRequestData();
		// 		//requestData = angular.extend({}, requestData, request);
		// 		var requestData = requestSetDO;
	 //            console.log("REQQQQ",requestSetDO);
	 //            return false;
		// 		var func = redirect; 
		// 		var cacheKey = "DWDecisionTable" + JSON.stringify(requestData);
		// 		if (arguments[1]) { 
		// 			if (arguments[1].key == cacheKey) { 
		// 				func = null; 
		// 			} else { 
		// 				return false; 
		// 			} 
		// 		}
		// 		DataService.getBuilddoDecision(requestData, func, $scope.fail);
		// 	}
		// 	saveDecision();
		// 	loadDecisionOptionsTable();
		// 	redirect();
		// }

		// var requestData = UtilitiesService.getRequestData();

		// var cacheKey = "DWFilter" + JSON.stringify(requestData);
		// function loadData() {
		// 	var func = $scope.success; 
		// 	if (arguments[1]) { 
		// 		if (arguments[1].key == cacheKey) { 
		// 			func = null; 
		// 		} else { 
		// 			return false; 
		// 		} 
		// 	}
		// 	DataService.getFilterData(requestData, func, $scope.fail);
		// }
		// loadData();
	    
		
		
		
		
		
		
		
		
		
		
		// $scope.overallDataSuccess = function(response){
		// 	console.log("response:", response);
		// 	$scope.campaignData = response.data.allUsers;
		// 	$scope.addData(response.data.allUsers);
			
		// }
		
		// $scope.options = UtilitiesService.getDataTableOptions();
		// var columOptions = {
		// 		"bPaginate":false
		// 	};
		// $.extend(true, $scope.options, columOptions);
		
		// $scope.addData = function(data) {
		// 		$scope.error = false;
		// 		$scope.options.aaData = [];
		// 		$.each(data, function(key, obj) {
		// 				$scope.options.aaData.push([obj.SNo, obj.description, obj.impact, obj.userGroup, 
		// 				     "<div class='wishlist-unselected'></div>" ,"<div class='execute-unselected'></div>"]);
		// 			})
		// };
		
		// function getAllUserTableData() {
		// 	var requestData = {};
		// 	var func = $scope.overallDataSuccess; 
	 //    	if (arguments[1]) { 
	 //    		if (arguments[1].key == cacheKey) { 
	 //    			func = null; 
	 //    		} else { 
	 //    			return false; 
	 //    		} 
	 //    	} 
	 //    	DataService.getAllUserData(requestData, func, $scope.fail); 
		
		// } 
		// getAllUserTableData();
	