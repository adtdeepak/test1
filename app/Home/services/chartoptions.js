angular.module('Home')

.service('ChartOptionsService', function() {
	
	
	this.getHomeGauge = function(data) {
		return {
	        options: {
	            chart: {
	                type: 'solidgauge'
	            },
	            pane: {
	                center: ['50%', '85%'],
	                size: '100%',
	                startAngle: -90,
	                endAngle: 90,
	                background: {
	                    backgroundColor:'#EEE',
	                    innerRadius: '60%',
	                    outerRadius: '100%',
	                    shape: 'arc'
	                }
	            },
	            solidgauge: {
	                dataLabels: {
	                    y: -30,
	                    borderWidth: 0,
	                    useHTML: true
	                }
	            }
	        },
	        series: [{
	            data: [5],
	            dataLabels: {
                    borderWidth: 0,
		        	format: '<div style="text-align:center"><span style="font-size:25px;color:black">{y}Mn</span><br/>' + 
	                   	'<span style="font-size:12px;color:silver">Target</span></div>'
		        }
	        }],
	        title: {
	            text: '',
	            y: 50
	        },
	        yAxis: {
	            currentMin: 0,
	            currentMax: 9,
	            title: {
	                y: 140
	            },      
				stops: [
	                [0.1, '#DF5353'], // red
		        	[0.5, '#DDDF0D'], // yellow
		        	[0.9, '#55BF3B'] // green
				],
				lineWidth: 0,
	            tickInterval: 9,
	            tickPixelInterval: 400,
	            tickWidth: 0,
	            labels: {
	            	formatter: function(){
					var val = this.value;
					return val+ ' Mn';
				},
	                y: 15
	            }   
	        },
	        loading: false
	    };
	};
	
	this.getTrackSummaryAcqTrend = function(data) {

		return {
			chart:{
				spacingRight : 100,
				spacingLeft : 15,
				spacingTop : 30
			},
			legend: {
				align: "right",
				symbolPadding:20,
				layout: "vertical",
				itemMarginTop:20,
				itemMarginBottom:15,
				//padding: 50,
				verticalAlign: 'middle',
				itemStyle: {
					color: '#000000',
					font: '10pt Carrois Gothic, sans-serif'
				},
				//fill:'none',
				itemWidth: 100,
				symbolWidth: 20,
				symbolHeight:18,
				height: 250	,
				y:1,
				x:-50
			},

	        navigation: {
	            buttonOptions: {
                    symbolFill:'#32CABB',
                    x: 80,
                    y:-32,
	                theme: {
	                    states: {
	                        hover: {
	                            fill: '#FFFFFF'
	                        },
	                        select: {
	                            stroke: '#039',
	                            fill: '#FFFFFF'
	                        }
	                    }
	                }
	            }
	        }
		};
	};	
})