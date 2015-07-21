angular.module('Analysis')

.service('DataConversionService', function(ChartOptionsService,UtilitiesService,Permission,RequestConstantsFactory) {

	this.getPieChartData = function(data){
		var resultData = [];
		$.each(data.name, function(key, value){
			var tempObj = {
					name: data.name[key],
					y: data.values[key],
					color: data.color[key]
			};
			resultData.push(tempObj);
		})
		return resultData;
	};
	
	this.getHorizontalBarChartData = function(data){
	    var resultData = {};
	    var xAxisData = data.name;
	    var values = data.values;
	    resultData['xAxisData'] = xAxisData;
	    resultData['data'] = values;
	    resultData['color'] = data.color;
	    
		return resultData;
	};
	
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

	};
	
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
	
});
