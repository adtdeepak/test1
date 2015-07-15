angular.module('Analysis')

.service('DataConversionService', function() {

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
	
	
});
