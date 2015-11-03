angular.module('DecisionWorkbench')
	
.controller("customFilterController", function ($scope, $element, $location, RequestConstantsFactory, DataService, $rootScope, CustomService, UtilitiesService, sharedProperties) {
	$scope.showoptions = "false";
	$scope.showtokens = "false";
	$scope.UserGroup = [{"key":"All Users","selected":false,"index":0},{"key":"Project Managers","selected": false,"index":1},{"key":"Creative Agencies","selected": false,"index":2},
	                        {"key":"Finance Executives","selected": false,"index":3},{"key":"Musicians","selected": false,"index":4},{"key":"Photographers","selected": false,"index":5}];
	
	$scope.Feature = [{"key":"3rd Party Integration API","selected":false},{"key":"Collaborate","selected": false},{"key":"eSign","selected": false},
	                        {"key":"Full Text Search","selected": false},{"key":"Microsoft 365 Integration","selected": false},{"key":"Mobile App","selected": false},
	                        {"key":"Storage Space","selected": false},{"key":"Version History","selected": false},{"key":"Workspace Share","selected": false}];
	$scope.engagementimpact = [{"key":"1%","selected": false},{"key":"2%","selected": false},{"key":"3%","selected": false},{"key":"4%","selected": false},{"key":"5%","selected": false},{"key":"6%","selected": false},{"key":"7%","selected": false},{"key":"8%","selected": false},{"key":"9%","selected": false},{"key":"10%","selected": false},{"key":"11%","selected": false},{"key":"12%","selected": false},{"key":"13%","selected": false},{"key":"14%","selected": false},{"key":"15%","selected": false}];                       
	$scope.campaignId = [{"key":1,"selected": false},{"key":2,"selected": false},{"key":3,"selected": false},{"key":4,"selected": false},{"key":5,"selected": false},{"key":6,"selected": false},{"key":7,"selected": false},{"key":8,"selected": false},{"key":9,"selected": false},{"key":10,"selected": false},{"key":11,"selected": false},{"key":12,"selected": false},{"key":13,"selected": false},{"key":14,"selected": false},{"key":15,"selected": false},{"key":16,"selected": false},{"key":17,"selected": false},{"key":18,"selected": false},{"key":19,"selected": false},{"key":20,"selected": false},{"key":21,"selected": false},{"key":22,"selected": false},{"key":23,"selected": false},{"key":24,"selected": false},{"key":25,"selected": false},{"key":26,"selected": false},{"key":27,"selected": false},{"key":28,"selected": false},{"key":29,"selected": false},{"key":30,"selected": false},{"key":31,"selected": false},{"key":32,"selected": false},{"key":33,"selected": false},{"key":34,"selected": false},{"key":35,"selected": false},{"key":36,"selected": false},{"key":37,"selected": false},{"key":38,"selected": false},{"key":39,"selected": false},{"key":40,"selected": false},{"key":41,"selected": false},{"key":42,"selected": false},{"key":43,"selected": false},{"key":44,"selected": false},{"key":45,"selected": false},{"key":46,"selected": false},{"key":47,"selected": false},{"key":48,"selected": false},{"key":49,"selected": false},{"key":50,"selected": false},{"key":51,"selected": false},{"key":52,"selected": false},{"key":53,"selected": false},{"key":54,"selected": false},{"key":55,"selected": false},{"key":56,"selected": false},{"key":57,"selected": false},{"key":58,"selected": false},{"key":59,"selected": false},{"key":60,"selected": false},{"key":61,"selected": false},{"key":62,"selected": false},{"key":63,"selected": false},{"key":64,"selected": false},{"key":65,"selected": false},{"key":66,"selected": false},{"key":67,"selected": false},{"key":68,"selected": false},{"key":69,"selected": false},{"key":70,"selected": false},{"key":71,"selected": false},{"key":72,"selected": false},{"key":73,"selected": false},{"key":74,"selected": false},{"key":75,"selected": false},{"key":76,"selected": false},{"key":77,"selected": false},{"key":78,"selected": false},{"key":79,"selected": false},{"key":80,"selected": false},{"key":81,"selected": false},{"key":82,"selected": false},{"key":83,"selected": false},{"key":84,"selected": false},{"key":85,"selected": false},{"key":86,"selected": false},{"key":87,"selected": false},{"key":88,"selected": false},{"key":89,"selected": false},{"key":90,"selected": false},{"key":91,"selected": false},{"key":92,"selected": false},{"key":93,"selected": false},{"key":94,"selected": false},{"key":95,"selected": false},{"key":96,"selected": false},{"key":97,"selected": false},{"key":98,"selected": false},{"key":99,"selected": false},{"key":100,"selected": false}];
	$scope.engagementscore = [{"key":"10%","selected": false},{"key":"20%","selected": false},{"key":"30%","selected": false},{"key":"40%","selected": false},{"key":"50%","selected": false},{"key":"60%","selected": false},{"key":"70%","selected": false},{"key":"80%","selected": false},{"key":"90%","selected": false},{"key":"100%","selected": false}];
	$scope.showtable = 'false';

	var usergroupoptions = [];
	var featureoptions = [];
	var campaignidoptions = [];
	var impactoptions = [];
	var scoreoptions = [];
	var tokenlist =[];
	$scope.showslider = 'true';

	$scope.groupselected = function (option) {
		$('#sliderrange').css("display", 'none');

		if(option == "User Group"){
			$scope.optionselected = $scope.UserGroup ;
			$scope.group = "User Group";
			$scope.selectedTab = "User Group";


		}
		if(option == "Features"){
			$scope.optionselected = $scope.Feature;
			$scope.group = "Features";
			$scope.selectedTab = "Features";

		}	
		if(option == "Campaign Id"){
			$scope.optionselected = $scope.campaignId;
			$scope.group = "Campaign Id";
			$scope.selectedTab = "Campaign Id";
		}
		if(option == "Score"){
			$scope.optionselected = $scope.engagementscore;
			$scope.group = "score";
			$scope.selectedTab = "Score";
		}
		if(option == "Impact"){
			
			$('#sliderrange').css("display", 'block');
			$scope.optionselected ='';
			$scope.showslider = 'true';
			$scope.group = "impact";
			$scope.selectedTab = "Impact";
		}
		// angular.forEach($scope.tokenlist,function  (value) {
		// 	if(value.group == option){
		// 		$("#selectFilterCustom li").each(function (item) {
		// 			// $(this).find('span.state-icon').removeClass("glyphicon-unchecked");
		// 			console.log($(this));
		// 			var tokenname = $(this).find('span.tokenname').text();
		// 			console.log(tokenname);
		// 		})
		// 	}
		// })
		$scope.showoptions = "true";
	};
	$scope.sliderchange = function(){

		$scope.change = true;
		$scope.showtokens = "true";
	}
	$scope.removeimpact = function(){
		$scope.change = false;

		if(tokenlist.length == 0){
			$scope.showtokens = "false";
			$scope.showtable = "false";
		}

	}
	$scope.optionclicked = function (group , name ,event) {
		var item = {"group":group,"name":name,"id":event.currentTarget.id,"selected":true};
		
		console.log(item);
		
		// $scope.tokenlist = tokenlist;
		$scope.showtokens = "true";
		if($(event.currentTarget).children('span').hasClass('glyphicon-check')){
			$(event.currentTarget).children('span').addClass('glyphicon-unchecked');
			$(event.currentTarget).children('span').removeClass('glyphicon-check');
			if(group == "User Group"){
				angular.forEach($scope.UserGroup,function(value){
		         	if(value.key == name){
		         		value.selected =true;
		         	}
		        })
			}
			if(group == "Feature"){
				angular.forEach($scope.Feature,function(value){
		         	if(value.key == name){
		         		value.selected =true;
		         	}
		        })
			}
			if(group == "Campaign Id"){
				angular.forEach($scope.campaignId,function(value){
		         	if(value.key == name){
		         		value.selected =true;
		         	}
		        })
			}
			if(group == "impact"){
				angular.forEach($scope.engagementimpact,function(value){
		         	if(value.key == name){
		         		value.selected =true;
		         	}
		        })
			}
			if(group == "score"){
				angular.forEach($scope.engagementscore,function(value){
		         	if(value.key == name){
		         		value.selected =true;
		         	}
		        })
			}
			// if(group == "Campaign Id"){
			// 	value.selected =false;
			// }
			angular.forEach($scope.tokenlist ,function (value , index) {
				if(value.name == name){
					
					$scope.removeItem(index ,group , name);
				}
			})

			
		}
		else{
			if(group == "User Group"){
			if (usergroupoptions.indexOf(name) == -1) {
				 usergroupoptions.push(name);
		         tokenlist.push(item);
		         angular.forEach($scope.UserGroup,function(value){
		         	if(value.key == name){
		         		value.selected =true;
		         	}
		         })
		     }
		}
		if(group == "Features"){
			if (featureoptions.indexOf(name) == -1) {
				 featureoptions.push(name);
		         tokenlist.push(item);
		         angular.forEach($scope.Feature,function(value){
		         	if(value.key == name){
		         		value.selected =true;
		         	}
		         })
		     }
		}	
		if(group == "Campaign Id"){
			if (campaignidoptions.indexOf(name) == -1) {
				 campaignidoptions.push(name);
		         tokenlist.push(item);
		         angular.forEach($scope.campaignId,function(value){
		         	if(value.key == name){
		         		value.selected =true;
		         	}
		         })
		     }
		}
		if(group == "impact"){
			if (impactoptions.indexOf(name) == -1) {
				 impactoptions.push(name);
		         tokenlist.push(item);
		         angular.forEach($scope.engagementimpact,function(value){
		         	if(value.key == name){
		         		value.selected =true;
		         	}
		         })
		     }
		}
		if(group == "score"){
			if (scoreoptions.indexOf(name) == -1) {
				 scoreoptions.push(name);
		         tokenlist.push(item);
		         angular.forEach($scope.engagementscore,function(value){
		         	if(value.key == name){
		         		value.selected =true;
		         	}
		         })
		     }
		}
		$scope.tokenlist = tokenlist;
		$(event.currentTarget).children('span').removeClass('glyphicon-unchecked');
		$(event.currentTarget).children('span').addClass('glyphicon-check');
		}
		
	}
	
	$scope.removeItem = function (index , group , name , id) {
		$scope.tokenlist.splice(index, 1);
		tokenlist = $scope.tokenlist;
		if(group == "User Group"){
			
			usergroupoptions.splice($.inArray(name,usergroupoptions),1);
			angular.forEach($scope.UserGroup ,function (value ) {

				if(value.key == name){
					value.selected = false;
				}
			})
		}
		if(group == "Features"){
			featureoptions.splice($.inArray(name,featureoptions),1);
			angular.forEach($scope.Feature ,function (value ) {
				if(value.key == name){
					value.selected = false;
				}
			})
		}	
		if(group == "Campaign Id"){
			campaignidoptions.splice($.inArray(name,campaignidoptions),1);
			angular.forEach($scope.campaignId ,function (value ) {
				if(value.key == name){
					value.selected = false;
				}
			})
		}
		if(group == "impact"){
			impactoptions.splice($.inArray(name,impactoptions),1);
			angular.forEach($scope.engagementimpact ,function (value ) {
				if(value.key == name){
					value.selected = false;
				}
			})
		}
		if(group == "score"){
			scoreoptions.splice($.inArray(name,scoreoptions),1);
			angular.forEach($scope.engagementscore ,function (value ) {
				if(value.key == name){
					value.selected = false;
				}
			})
		}	
		if(tokenlist.length == 0 && $scope.change == false){
			$scope.showtokens = "false";
			$scope.showtable = "false";
		}

	};
	$scope.applyfilter = function () {
			getInnerPageData();
			getAllUserTableData();
			$scope.showtable = 'true';
	};
	var parsed_result_usergroup;
	var parsed_result_featuregroup;
	$scope.apply = function (argument) {
		// var usergroups = $scope.selectedusers;
		// var featuregroups = $scope.selectedfeatures;
		// if(usergroups)
		// 	parsed_result_usergroup = angular.fromJson(usergroups);
		// if(featuregroups)
		// 	 parsed_result_featuregroup = angular.fromJson(featuregroups);
		// getInnerPageData();
		// getAllUserTableData();
		

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
		$scope.overallResponse = response.data.bestCampaignOptions;
		var merged_usergroup = [];
		var merged_featuregroup = [];
		var campaignIdlist = [];
		var impactlist = [];
		var scorelist = [];
		var finaldata = [];

		angular.forEach(usergroupoptions,function(value) {
			// console.log(response.data.bestCampaignOptions[value]);
			$.merge(merged_usergroup, response.data.bestCampaignOptions[value]);

		})
		angular.forEach(featureoptions,function(value) {
			// console.log(response.data.bestCampaignOptions[value]);
			$.merge(merged_featuregroup, response.data.bestCampaignOptions[value]);
		})
		var merged = $.merge(merged_usergroup, merged_featuregroup);
		angular.forEach(campaignidoptions,function(value) {
			// console.log(response.data.bestCampaignOptions[value]);
			angular.forEach(response.data.bestCampaignOptions["All Users"],function (values) {
						if(values.id == parseInt(value)){

							campaignIdlist.push(values);
						}
					})
		})
		merged = $.merge(merged, campaignIdlist);
		// angular.forEach(impactoptions,function(value) {
		// 	// console.log(response.data.bestCampaignOptions[value]);
		// 	angular.forEach(response.data.bestCampaignOptions["All Users"],function (values) {
		// 				if(values.engagementimpact == value){

		// 					impactlist.push(values);
		// 				}
		// 			})
		// })
		if($scope.change == true){
			// alert($scope.minrange);
			angular.forEach(response.data.bestCampaignOptions["All Users"],function (values) {
				if(values.engagementimpact >= $scope.minrange && values.engagementimpact <= $scope.maxrange){

					impactlist.push(values);
				}
			})
		}
		 merged = $.merge(merged, impactlist);
		 angular.forEach(scoreoptions,function(value) {
			// console.log(response.data.bestCampaignOptions[value]);
			angular.forEach(response.data.bestCampaignOptions["All Users"],function (values) {
						if(values.engagementscore == value){

							scorelist.push(values);
						}
					})
		})
		 merged = $.merge(merged, scorelist);
		 // if(merged.length == 0){
		 // 	finaldata = [{"description":"No data to display"}];
		 // }
		 // else{
		 	finaldata = merged;
		 // }
		 
		
		// var merged = $.merge(merged_usergroup, merged_featuregroup);
		// finaldata = merged;
		// if(campaignidoptions.length != 0){

		// 	if(finaldata.length == 0){
		// 		angular.forEach(campaignidoptions,function (value) {
		// 			angular.forEach(response.data.bestCampaignOptions["All Users"],function (values) {
		// 				if(values.id == parseInt(value)){

		// 					campaignIdlist.push(values);
		// 				}
		// 			})
		// 		})
		// 	}
		// 	else{
		// 		angular.forEach(campaignidoptions,function (value) {
		// 			angular.forEach(merged,function (values) {
		// 				if(values.id == parseInt(value)){
		// 					campaignIdlist.push(values);
		// 				}
		// 			})
		// 		})
		// 	}
		// }
		// finaldata = $.merge(finaldata, campaignIdlist);
		
		
		$scope.addData(finaldata);
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
		// console.log(data);
	    $rootScope.builddoLoad = true;
		$scope.dataLoaded = true;
		if (!data)
			throw "noDataError";
		try {
			$scope.error = false;
			$scope.options.aaData = [];
			if(data.length == 0){
				$scope.options.aaData.push([, , ,  "No Records Found"]);
			}
			else{
				$.each(data, function(key, obj) {
				var executeSection = "<a href='resources/selected_campaign_info.xlsx' download><div class='execute-unselected'></div></a>";
					$scope.options.aaData.push([obj.id, obj.userGroup, obj.featurePromoted,  obj.description, obj.impact,
					                           "<div class='wishlist-unselected'></div>" , executeSection, obj.campaignType]);
				})
			}
			
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
    	DataService.getOverviewDetailsData(requestData, func, $scope.fail); 
	
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
	