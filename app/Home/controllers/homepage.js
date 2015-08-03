angular.module('Home')

.controller('homePageController', function($scope, ChartOptionsService) {
      
	var data = [];
    $scope.chartConfig = ChartOptionsService.getHomeGauge(data);
	var registrationGauge = {
			series: [{
	            data: [25700],
	            dataLabels: {
                    borderWidth: 0,
		        	format: '<div style="text-align:center"><span style="font-size:22px;color:#FAC458">72%</span><br/>' + 
	                   	'<span style="font-size:12px;color:silver"></span></div>'
		        }
	        }],
			yAxis: {
				min: 0,
				max: 35789,
            stops: [
                [0.1, '#FAC458'],
                [0.5, '#FAC458'],
                [0.9, '#FAC458'] 
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
	        tickInterval: 35789,
            tickWidth: 0,
            title: {
                y: -70
            },
	            labels: {
	            	formatter: function(){
					var val = this.value;
					return val;
				},
	                y: 15
	            } 
	        }
	};
	$scope.registrationGauge = Highcharts.merge($scope.chartConfig, registrationGauge);
	var paidUsersGauge = {
			series: [{
	            data: [1674],
	            dataLabels: {
                    borderWidth: 0,
		        	format: '<div style="text-align:center"><span style="font-size:22px;color:#FA965A">46%</span><br/>' + 
	                   	'<span style="font-size:12px;color:silver"></span></div>'
		        }
	        }],
			yAxis: {
				min: 0,
				max: 3579,
            stops: [
                [0.1, '#FA965A'],
                [0.5, '#FA965A'],
                [0.9, '#FA965A'] 
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
	        tickInterval: 3579,
            tickWidth: 0,
            title: {
                y: -70
            },
	            labels: {
	            	formatter: function(){
					var val = this.value;
					return val;
				},
	                y: 15
	            } 
	        }
	};
	$scope.paidUsersGauge = Highcharts.merge($scope.chartConfig, paidUsersGauge);
	var convRateGauge = {
			series: [{
	            data: [7],
	            dataLabels: {
                    borderWidth: 0,
		        	format: '<div style="text-align:center"><span style="font-size:22px;color:#3EA8DC">70%</span><br/>' + 
	                   	'<span style="font-size:12px;color:silver"></span></div>'
		        }
	        }],
			yAxis: {
				min: 0,
				max: 10,
            stops: [
                [0.1, '#3EA8DC'],
                [0.5, '#3EA8DC'],
                [0.9, '#3EA8DC'] 
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
	        tickInterval: 10,
            tickWidth: 0,
            title: {
                y: -70
            },
	            labels: {
	            	formatter: function(){
					var val = this.value;
					return val;
				},
	                y: 15
	            } 
	        }
	};
	$scope.convRateGauge = Highcharts.merge($scope.chartConfig, convRateGauge);
	var engScoreGauge = {
			series: [{
	            data: [57],
	            dataLabels: {
                    borderWidth: 0,
		        	format: '<div style="text-align:center"><span style="font-size:22px;color:#25B578">68%</span><br/>' + 
	                   	'<span style="font-size:12px;color:silver"></span></div>'
		        }
	        }],
			yAxis: {
				min: 0,
				max: 84,
            stops: [
                [0.1, '#25B578'],
                [0.5, '#25B578'],
                [0.9, '#25B578'] 
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
	        tickInterval: 84,
            tickWidth: 0,
            title: {
                y: -70
            },
	            labels: {
	            	formatter: function(){
					var val = this.value;
					return val;
				},
	                y: 15
	            } 
	        }
	};
	$scope.engScoreGauge = Highcharts.merge($scope.chartConfig, engScoreGauge);
      
})