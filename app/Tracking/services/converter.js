angular.module('Tracking')

.service('DataConversionService', function(ChartOptionsService,UtilitiesService,Permission,RequestConstantsFactory) {

	/*---------------------Summary page-------------------------*/

	this.toTrackSummaryAcqFunnelData = function(data) {
		var _data = jQuery.extend(true, {}, data);
		var index = 0;
		//Iterate all the time ranges
		_data.timeRanges.forEach(function(timeEntry) {
			var dataIndex = 0;
			//Then iterate all the record
			timeEntry.data.forEach(function(data) {
				var conTrend = [];
				//Iterate weekly trend and convert and load it to _data
				data.weeklyTrend.forEach(function(trendData){
					//convert to interger and add to the converted data
					conTrend.push(parseInt(trendData.weeklyActual));
				});
				_data.timeRanges[index].data[dataIndex].weeklyTrend = conTrend;
				dataIndex++;
			});
			index++;
		});
		return _data;
	}
	this.toTrackSummaryAcqFunnel = function(data){
		var _data = {};
		$.each(data.timeRanges, function(key, timeRange){
			var dataArray = [];
			$.each(timeRange.data, function(key, obj){
				for(count = 0 ; count < 52 ; count ++){
					if(!obj.weeklyTrend[count]){
						obj.weeklyTrend[count] = 0;
					}
				}
				dataArray.push(obj);
			});
			
			_data[timeRange.periodName] = dataArray;
		});
		
		return _data;
	}

	this.toTrackSummaryAcqTrend= function(data) {
		
		var categoryConstants = RequestConstantsFactory['CHART_CONSTANTS'];
		//method call for checking permissions
		var isPaidUsersVisible = Permission.canViewTrackTrendPaidUsers();
		var isRevenueVisible = Permission.canViewTrackTrendRevenue();
		var resultData = {};
		$.each(data.timeRanges, function(key, obj){
			// Getting Chart options from ChartOptionsService
			var _data = {}
			_data['chartOptions'] = ChartOptionsService.getTrackSummaryAcqTrend();
			var chartData = [];
			var startDate = [];
			var actualData = [];
			var xAxis = [];
			var spline1Data = [];
			var spline22Data = [];
			var column1Data = [];
			var column2Data = [];
			var plotBandRange =[];
			var seriesValues = [];
			var categories = [];
			var seriesCount = 0 ;
			var index = 0;
			$.each(obj.data, function(index, column){
				
				//Always clone the object using .extend() instead of working on the data passed by reference.
				var chartValues = {};
				var _column = jQuery.extend(true, {}, column);
				var date= new Date(UtilitiesService.dateFormatConvertor(obj.data[index].startDate)); 
				var startDate = UtilitiesService.dateFormatConvertor(obj.data[index].startDate);
				var axisLabel = UtilitiesService.getChartLabels(obj.periodName,date);
				var endDate =  UtilitiesService.getChartLabelEndDate(obj.periodName,date);
				var now = moment();
				actualData.push(_column);
				//checking for permissions and pushing the values into data
				if(isPaidUsersVisible){
					chartValues['cancellations'] = parseInt(actualData[actualData.length-1].cancellations);
					chartValues['newSubs'] = parseInt(actualData[actualData.length-1].newSubs);
				}
				if(isRevenueVisible){
					chartValues['revenue'] = parseInt(actualData[actualData.length-1].revenue);
					chartValues['mrr']=parseInt(actualData[actualData.length-1].mrr);
				}
				chartValues['name'] = axisLabel;
				chartValues['endDate'] = endDate;
				chartValues['startDate'] = startDate;
				chartData.push(chartValues);
			});
			//for getting each series data in seperate array
			$.each(chartData,function(key,value){
				xAxis.push(value.name);
				spline1Data.push(value.cancellations);
				spline22Data.push(value.newSubs);
				column1Data.push(value.revenue);
				column2Data.push(value.mrr);
			});
			seriesValues.push(column1Data);
			seriesValues.push(column2Data);
			seriesValues.push(spline1Data);
			seriesValues.push(spline22Data);
			
			// to get the number of series to in charts based on permissions
			if(isPaidUsersVisible && isRevenueVisible){
				index = 0;
				seriesCount = index + 4 ; 
			}else if(isRevenueVisible){
				index = 0;
				seriesCount = index + 2 ;
			}else{
				index = 2;
				seriesCount = index + 2 ;
			}
			//to push the data to get series of charts
			for(count = index  ; count < seriesCount ; count++){
				var seriesData = {};
				var tooltip = {};
				seriesData['name'] = categoryConstants.TREND_NAME[count];
				seriesData['type'] = categoryConstants.TREND_TYPE[count];
				seriesData['yAxis'] = categoryConstants.TREND_YAXIS[count];
				seriesData['id'] = categoryConstants.TREND_ID[count];
				seriesData['color'] = categoryConstants.TREND_COLORS[count];
				seriesData['tooltip'] = tooltip;
				tooltip['valueSuffix'] = categoryConstants.TREND_TOOLTIP_SUFFIX[index];
				seriesData['data'] = seriesValues[count];
				categories.push(seriesData);
			}
			
			// to get plot band values
			plotBandRange.push(UtilitiesService.getPlotBandRange(xAxis));
			_data['data'] = chartData;
			_data['plotBand'] = plotBandRange;
			_data['seriesData'] = categories;
			console.log("PLOTS",obj.periodName,_data)
			resultData[obj.periodName] = _data;
		});
		return resultData;
	}

	/*---------------------Business Impact page-------------------------*/

	this.toGetTrackSummaryDataBI = function(data){
		var _data = {};
		// method call to get individual widgets permission
		var permission = Permission.getBusinessImpactWidgetsPermissions();
		$.each(data.timeRanges, function(key, timeRange) {
			var timeRangeData = [];
			$.each(timeRange.data, function(index, eachData) {
				//checking for individual widgets permission and pushing it into array 
				/*if(permission[eachData.subGroupBy]){
					console.log("1")
					timeRangeData.push(eachData)
				}*/
				timeRangeData.push(eachData);
			});
			_data[timeRange.periodName] = timeRangeData;
		});
		return _data;
	}

	this.toBusinessImpactTrend = function(data) {
		var resultData = {};
		$.each(data.timeRanges, function(key, timeRange) {
			var _data = {};
			var startOfWeek;
			var endOfWeek;
			// Getting Chart options from ChartOptionsService
			_data['chartOptions'] = ChartOptionsService.getBusinessImpactTrend();
			var chartData = [];
			var target = [];
			var actual = [];
			var xAxis = [];
			var startDateArray = [];
			var endDateArray = [];
			var plotBandRange = [];
			$.each(timeRange.data, function(index, column) {
				var date= new Date(UtilitiesService.dateFormatConvertor(column.startDate)); 
				var startDate = UtilitiesService.dateFormatConvertor(column.startDate);
				var axisLabel = UtilitiesService.getChartLabels(timeRange.periodName,date);
				var endDate =  UtilitiesService.getChartLabelEndDate(timeRange.periodName,date);
				
				actual.push(parseInt(column.actual));
				target.push(parseInt(column.target));
				xAxis.push(axisLabel);
				startDateArray.push(startDate);
				endDateArray.push(endDate);
			});
			plotBandRange.push(UtilitiesService.getPlotBandRange(xAxis));
			chartData.push({
				name : 'Actual',
				data : actual,
				color : '#26A48E',

			}, {
				name : 'Target',
				data : target,
				color : '#32CABB',

			});

			_data['data'] = chartData;
			_data['xAxis'] =xAxis;
			_data['plotBand'] = plotBandRange;
			_data['startDate'] = startDateArray;
			_data['endDate'] = endDateArray;
			resultData[timeRange.periodName] = _data;
		});
		return resultData;

	}

	this.toGetBusinessImpactDeepDiveTableData = function(data){
		var resultData = {};
		$.each(data.timeRanges, function(key, timeRange){
			var _data = [];
			$.each(timeRange.data, function(key, obj){
				$.each(obj, function(index, column){
					obj[index] = UtilitiesService.getLocaleString(column);
				});
				_data.push(obj);
			})
			resultData[timeRange.periodName] = _data;
		})
		return resultData;
	}

	/*---------------------Engagement Activity page-------------------------*/

	this.toGetEngagementActivityScoreData = function(data){
		var _data = {};
		var currentScore = data.currentScore;
		var plotBandRange = [];
		$.each(data.timeRanges, function(key, timeRange) {
			if(timeRange.data){
				//temporary periodName used should be deleted when we get periodName from API
				var actualData = [];
				var targetData = [];
				var xAxis = [];
				var startDateArray = [];
				var endDateArray = [];

				$.each(timeRange.data, function(index, column) {
					var date= new Date(UtilitiesService.dateFormatConvertor(timeRange.data[index].startdate)); 
					var startDate = UtilitiesService.dateFormatConvertor(timeRange.data[index].startdate);
					var endDate =  UtilitiesService.getChartLabelEndDate(timeRange.periodName,date);
					
					var axisLabel = UtilitiesService.getChartLabels(timeRange.periodName,date);
					actualData.push(parseInt(column.actual));
					targetData.push(parseInt(column.target));
					xAxis.push(axisLabel);
					startDateArray.push(startDate);
					endDateArray.push(endDate);
				});
				plotBandRange.push(UtilitiesService.getPlotBandRange(xAxis));
				_data[timeRange.periodName] ={
						data: [{
							name: 'Actual',
							data: actualData,
							color:'#149AE3'
						}, {
							name: 'Target',
							data: targetData,
							color:'#1B6395'
						}],
						xAxis : xAxis,
						startDate : startDateArray,
						endDate : endDateArray,
						plotBand :plotBandRange
				}
			}
		});
		_data['engagementScore'] =  currentScore;
		return _data;
	}

	this.toGetTrackSummaryEngagementActivity = function(data){
		var permission = Permission.getEngagementActivityWidgetsPermissions();
		var _data = {};
		$.each(data.timeRanges, function(key, timeRange) {
			var timeRangeData = [];
			$.each(timeRange.data, function(index, eachData) {
				/*if(permission[eachData.subGroupBy]){
					timeRangeData.push(eachData);
				}*/
				timeRangeData.push(eachData);
			});
			_data[timeRange.periodName] = timeRangeData;
		});
		return _data;
	}

	this.toGetEngagementActivityTrendData = function(data){
		var _data = {};
		var currentScore = data.currentScore;
		$.each(data.timeRanges, function(key, timeRange) {
			var startDateArray = [];
			var endDateArray = [];
			if(timeRange.data){
				var actualData = [];
				var targetData = [];
				var xAxis = [];
				var plotBandRange = [];
				$.each(timeRange.data, function(index, column) {
					var date= new Date(UtilitiesService.dateFormatConvertor(timeRange.data[index].startdate)); 
					var startDate = UtilitiesService.dateFormatConvertor(timeRange.data[index].startdate);
					var endDate =  UtilitiesService.getChartLabelEndDate(timeRange.periodName,date);
					
					var axisLabel = UtilitiesService.getChartLabels(timeRange.periodName,date);
					actualData.push(parseInt(column.actual));
					targetData.push(parseInt(column.target));
					xAxis.push(axisLabel);
					startDateArray.push(startDate);
					endDateArray.push(endDate);
				});
				plotBandRange.push(UtilitiesService.getPlotBandRange(xAxis));
				_data[timeRange.periodName] ={
						data: [{
							name: 'Actual',
							data: actualData,
							color:'#26A48E'
						}, {
							name: 'Target',
							data: targetData,
							color:'#32CABB'
						}],
						xAxis : xAxis,
						startDate : startDateArray,
						endDate : endDateArray,
						plotBand :plotBandRange
				}
			}
		});
		_data['engagementScore'] =  currentScore;
		return _data;
	}

	this.toGetEngagementActivityDeepDiveData = function(data, groupBy){
		var groupBy = data.groupBy;
		var _data = {};


		//Normalizing values; i is the iterator
		$.each(data.timeRanges, function(key, timeRange){
			var normalScore = [];
			var normalConv = [];
            var _normalScore = [];
            var _normalConv = [];
			var children = {};
			var moduleData = [];
			var activityData = [];
			$.each(timeRange.data, function(key, obj){
				normalScore.push(parseInt(obj.score));
            	normalConv.push(parseInt(obj.conversionValue));
			});
            
            var scoreMax = d3.max(normalScore);
            var scoreScale = d3.scale.linear().domain([0, scoreMax]).range([100, 1000]);
            
			var convMax = d3.max(normalConv);
            var convScale = d3.scale.linear().domain([0, convMax]).range([100, 1000]);
            
            /*ratioScore = Math.max.apply(this, normalScore) / 10000
			ratioConv = Math.max.apply(this, normalConv) / 10000
			for ( i = 0; i < normalScore.length; i++ ) {
				_normalScore[i] = Math.round( normalScore[i] / ratioScore );
			}
			for ( i = 0; i < normalConv.length; i++ ) {
				_normalConv[i] = Math.round( normalConv[i] / ratioConv );
			}
            */
            for ( i = 0; i < normalScore.length; i++ ) {
				_normalScore[i] = scoreScale(normalScore[i]);
			}
			for ( i = 0; i < normalConv.length; i++ ) {
				_normalConv[i] = convScale(normalConv[i])
			}
            
            $.each(timeRange.data, function(key, obj){
				if(obj.moduleType== "Module Engagement Heat Type"){
					moduleData.push({
						name: obj.moduleName,
						score: _normalScore[key],
                        oScore: normalScore[key],
						level: obj.level,
						conversionValue: _normalConv[key],
						oConversionValue: normalConv[key]
					});
				}
				if(obj.moduleType== "Activity Heat Map"){
					activityData.push({
						name: obj.moduleName,
						score: _normalScore[key],
                        oScore: normalScore[key],
						level: obj.level,
						conversionValue: _normalConv[key],
						oConversionValue: normalConv[key]
					});
				}

			})
			if(groupBy == "enLevel"){
				children = { 
						moduleData:{
							name: "Module Engagement Heatmap",
							children :moduleData
						},
						activityData:{
							name: "Activity Engagement Heatmap",
							children :activityData
						}
				};
			}
			else{
				children = { 
						moduleData:{
							name: "Module Conversion Weightage Heatmap",
							children :moduleData
						},
						activityData:{
							name: "Activity Conversion Weightage Heatmap",
							children :activityData
						}
				};
			}
			_data[timeRange.periodName] = children;
		});
        return _data;
	}

	this.toGetTrackModuleEngagementTableData = function(data){
		var resultData = {};
		$.each(data.timeRanges, function(key, timeRange){
			var _data = [];
			$.each(timeRange.data, function(key, obj){

				$.each(obj, function(index, column){
					obj[index] = UtilitiesService.getLocaleString(column);
				});
				_data.push(obj);
			})
			resultData[timeRange.periodName] = _data;
		})
		return resultData;
	}

	/*---------------------User Engagement page-------------------------*/

	this.toUserGroupSummary = function(data) {
	var permission = Permission.getUserGroupWidgetsPermissions();
		var _data = {};
		$.each(data.timeRanges, function(key, timeRange) {
			var timeRangeData = [];
			$.each(timeRange.data, function(index, eachData) {
				/*if(permission[eachData.groupBy]){
					timeRangeData.push(eachData);
				}*/
				timeRangeData.push(eachData);
			});
			_data[timeRange.periodName] = timeRangeData;
		});
		return _data;
	}

	this.toGetUserGroupTrendData = function(data){
		var _data = {};
		var convertedData = [];
		var xAxis = [];
		var trendData = {};
		var plotBandRange = [];
		var startDateArray = [];
		var endDateArray = [];
		var colors = ['#26A48E','#32CABB','#339966','#00CC66','#00CC99'];
		$.each(data.timeRanges, function(key, obj) {
			convertedData = [];
			
			$.each(obj.groupDetail, function(index, column) {
				var actualData = [];
				var targetData = [];
				
				xAxis = [];
				plotBandRange = [];
				startDateArray = [];
				endDateArray = [];
				$.each(column.data, function(key, value) {

					var date= new Date(UtilitiesService.dateFormatConvertor(value.date));  
					var startDate = UtilitiesService.dateFormatConvertor(value.date);
					var axisLabel = UtilitiesService.getChartLabels(obj.periodName,date);
					var endDate =  UtilitiesService.getChartLabelEndDate(obj.periodName,date);
					
					xAxis.push(axisLabel);
					startDateArray.push(startDate);
					endDateArray.push(endDate);
					actualData.push(parseInt(value.noOfUsers));
					_data ={
							name: column.groupName,
							data: actualData,
							color:colors[index]
					};
				});
				convertedData.push(_data);
			});
			plotBandRange.push(UtilitiesService.getPlotBandRange(xAxis));
			trendData[obj.periodName] ={
					data :convertedData,
					xAxis : xAxis,
					startDate : startDateArray,
					endDate : endDateArray,
					plotBand :plotBandRange
			}
		});
		console.log('trendData',trendData)
		return trendData;
	}

	this.toGetDeepDiveTableData = function(data){
		var _data = [];
		$.each(data, function(key, obj){
			$.each(obj, function(index, column){
				obj[index] = UtilitiesService.getLocaleString(column);
			});
			_data.push(obj);
		});
		return _data;
	}



	/*----------------------------Extra----------------------*/
	//For 2D cohort data
	this.toBICohort = function(data) {
		var _data = {};
		var periodData=[];
		var convertedData = [];
		var innerData = [];
		periodData.push(data.data);
		$.each(periodData, function(key, obj) {
			innerData = obj;
			$.each(innerData, function(key, obj) {
				convertedData.push(obj);
				$.each(obj, function(index, column) {

					convertedData[key][index].value=(typeof(convertedData[key][index].actual)=='undefined')?convertedData[key][index].value:convertedData[key][index].actual;
					//convertedData[index].value=(typeof(convertedData[index].actual)=='undefined')?convertedData[index].value:convertedData[index].actual;
				});
				//to make the unavailable data as 0
				for(index = 0; index < 16; index++) {
					if( typeof(convertedData[key][index]) == 'undefined')
						convertedData[key][index]= { "value" : "0"
					};
				}
			});
		});
		return convertedData;
	};


//	conversion of chart data for engagement Activity score
	this.toEngagementActivityScore = function(data) {

		// Getting Chart options from ChartOptionsService
		var _data = {};
		_data['chartOptions'] = ChartOptionsService
		.getEngagementActivityScoreData();
		var periodData=[];
		periodData.push(data.data);

		$.each(periodData, function(key, obj) {
			var chartData = [];
			var target = [];
			var actual = [];


			$.each(obj, function(index, column) {

				actual.push(parseInt(column.actual));
				target.push(parseInt(column.target));

			});

			chartData.push({
				name : 'Actual',
				data : actual,
				color : '#149AE3',

			}, {
				name : 'Target',
				data : target,
				color : '#1B6395',

			});
			_data[key] = chartData;

		});
		return _data;

	}

	this.toTrackSummaryDataBI = function(data) {

		var _data=[];
		$.each(data, function(key, obj){
			_data.push(obj);
			$.each(obj, function(index, column){
				obj[index] = UtilitiesService.getLocaleString(obj[index]);

			});
		});
		return _data;
	}


	this.toGetTrackUserGroupDeepDive = function(data){
		var _data = [];

		$.each(data, function(key, obj){

			$.each(obj, function(index, column){
				obj[index] = UtilitiesService.getLocaleString(column);

			});
			_data.push(obj);
		});
		return _data;
	}

	this.toGetEngagementViewData = function(data){
		var _data = [];

		$.each(data, function(key, obj){

			$.each(obj, function(index, column){
				obj[index] = UtilitiesService.getLocaleString(column);

			});
			_data.push(obj);
		});
		return _data;
	}
});
