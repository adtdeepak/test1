angular.module('Analysis')

.service('ChartOptionsService', function() {

	this.getRevenueSubsTrend = function(data) {

		return {
	        chart: {
	            type: 'column',
	            height:300
	        },
	        title: {
	            text: 'Revenue',
	            align:'left',
	            style: {
	                color: '#686868',
	                fontWeight: 'bold'
	            }
	        },
	        subtitle: {
	            text: 'Past 6 months',
	            align:'left',
	            style: {
	                color: '#686868',
	                fontWeight: 'bold'
	            }
	        },
	        xAxis: {
	            categories: data.months
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: 'USD Mn'
	            },
	            stackLabels: {
	                enabled: true,
	                style: {
	                    fontWeight: 'bold',
	                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
	                }
	            }
	        },
	        legend: {
	            align: 'right',
	            x: -30,
	            verticalAlign: 'top',
	            y: 25,
	            floating: true,
	            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
	            borderColor: '#CCC',
	            borderWidth: 1,
	            shadow: false
	        },
	        tooltip: {
	            formatter: function () {
	                return '<b>' + this.x + '</b><br/>' +
	                    this.series.name + ': ' + this.y + '<br/>' +
	                    'Total: ' + this.point.stackTotal;
	            }
	        },
	        plotOptions: {
	            column: {
	                stacking: 'normal',
	                dataLabels: {
	                    enabled: true,
	                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
	                    style: {
	                        textShadow: '0 0 3px black'
	                    }
	                }
	            }
	        },
	        series: [{
	            name: 'New',
	            data: data.newRevenue,
	            color: data.color[0]
	        },{
	            name: 'Recurring',
	            data: data.recurringRevenue,
	            color: data.color[1]
	        }]
		};
	};	
	
	this.getProfilePieChart = function(data, title, subtitle, height){
		return {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height:height
            },
            title: {
                text: title,
	            align:'center',
	            style: {
	                color: '#686868',
	                fontWeight: 'bold'
	            }
            },
            subtitle: {
            	text:subtitle,
	            align:'center',
	            style: {
	                color: '#686868',
	                fontWeight: 'bold'
	            }
            },
            legend: {
                itemMarginTop: 10
          },
            tooltip: {
                pointFormat: '<b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: "",
                colorByPoint: true,
                data: data
            }]
		}
	};
	
	this.getPieChart = function(data, title, subtitle, height){
		return {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height:height
            },
            title: {
                text: title,
	            align:'center',
	            style: {
	                color: '#686868',
	                fontWeight: 'bold'
	            }
            },
            subtitle: {
            	text:subtitle,
	            align:'center',
	            style: {
	                color: '#686868',
	                fontWeight: 'bold'
	            }
            },
            legend: {
                itemStyle: {
                    fontSize:'10px',
                    font: '10pt Trebuchet MS, Verdana, sans-serif',
                   color: '#A0A0A0'
                }
          },
            tooltip: {
                pointFormat: '<b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: "",
                colorByPoint: true,
                data: data
            }]
		}
	};
	
	this.getPieChartWithNoLegend = function(data, title, subtitle, height){
		return {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height:height
            },
            title: {
                text: title,
	            align:'center',
	            style: {
	                color: '#686868',
	                fontWeight: 'bold'
	            }
            },
            subtitle: {
            	text:subtitle,
	            align:'center',
	            style: {
	                color: '#686868',
	                fontWeight: 'bold'
	            }
            },
            legend: {
            	enabled: false
          },
            tooltip: {
                pointFormat: '<b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: "",
                colorByPoint: true,
                data: data
            }]
		}
	};
	
	this.getLoginBarChart = function(data, title, subtitle){
		
		return {
	        chart: {
	            type: 'bar',
                height:300
	        },
	        title: {
	            text: title,
	            align:'center',
	            style: {
	                color: '#686868',
	                fontWeight: 'bold'
	            }
	        },
	        subtitle: {
	            text: subtitle,
	            align:'center',
	            style: {
	                color: '#686868',
	                fontWeight: 'bold'
	            }
	        },
	        xAxis: {
	        	//x-axis data
	            categories: data.xAxisData,
	            title: {
	                text: null
	            }
	        },
	        yAxis: {
	            min: 0,
	            max:100,
	            title: {
	            },
	            labels: {
	                overflow: 'justify'
	            }
	        },
	        tooltip: {
	            valueSuffix: '%'
	        },
	        plotOptions: {
	            bar: {
	                dataLabels: {
	                    enabled: true
	                }
	            }
	        },
	        legend: {
	            enabled:false
	        },
	        series: [{
	            name: 'Percentage',
	            data: data.data,
	            color:data.color
	        }]
		}
	};
	
this.getFreeToPaidBarChart = function(data, title, subtitle, height, color){
		
		return {
	        chart: {
	            type: 'bar',
                height:height
	        },
	        title: {
	            text: title,
	            align:'left',
	            style: {
	                color: '#686868',
	                fontWeight: 'bold'
	            }
	        },
	        subtitle: {
	            text: subtitle,
	            align:'left',
	            style: {
	                color: '#686868',
	                fontWeight: 'bold'
	            }
	        },
	        xAxis: {
	        	//x-axis data
	            categories: data.xAxisData,
	            title: {
	                text: null
	            }
	        },
	        yAxis: {
	            title: {
	            },
	            labels: {
	                overflow: 'justify'
	            }
	        },
	        tooltip: {
	            valueSuffix: '%'
	        },
	        plotOptions: {
	            bar: {
	                dataLabels: {
	                    enabled: true
	                }
	            }
	        },
	        legend: {
	            enabled:false
	        },
	        series: [{
	            name: 'Percentage',
	            data: data.data,
	            color:color
	        }]
		}
	};
	
	
this.getTrendingBarChart = function(data, title, subtitle, height, color){
		
		return {
	        chart: {
	            type: 'bar',
                height:height
	        },
	        title: {
	            text: title,
	            align:'left',
	            style: {
	                color: '#686868',
	                fontWeight: 'bold'
	            }
	        },
	        subtitle: {
	            text: subtitle,
	            align:'left',
	            style: {
	                color: '#686868',
	                fontWeight: 'bold'
	            }
	        },
	        xAxis: {
	        	//x-axis data
	            categories: data.xAxisData,
	            title: {
	                text: null
	            }
	        },
	        yAxis: {
	            min: 0,
	            max:100,
	            title: {
	            },
	            labels: {
	                overflow: 'justify'
	            }
	        },
	        tooltip: {
	            valueSuffix: '%'
	        },
	        plotOptions: {
	            bar: {
	                dataLabels: {
	                    enabled: true
	                }
	            }
	        },
	        legend: {
	            enabled:false
	        },
	        series: [{
	            name: 'Percentage',
	            data: data.data,
	            color:color
	        }]
		}
	};
	
this.getTrendingBarChartSeries = function(data, title, subtitle, height, color){
		
		return {
	        chart: {
	            type: 'bar',
                height:height
	        },
	        title: {
	            text: title,
	            align:'left',
	            style: {
	                color: '#686868',
	                fontWeight: 'bold'
	            }
	        },
	        subtitle: {
	            text: subtitle,
	            align:'left',
	            style: {
	                color: '#686868',
	                fontWeight: 'bold'
	            }
	        },
	        xAxis: {
	        	//x-axis data
	            categories: data.xAxisData,
	            title: {
	                text: null
	            }
	        },
	        yAxis: {
	            min: 0,
	            max:60,
	            title: {
	            },
	            labels: {
	                overflow: 'justify'
	            }
	        },
	        tooltip: {
	            valueSuffix: '%'
	        },
	        plotOptions: {
	            bar: {
	                dataLabels: {
	                    enabled: true
	                }
	            }
	        },
	        legend: {
	            enabled:true,
	            align:"center",
	            borderWidth: 0,
	            floating: false
	        },
	        series: data.series
		}
	};
	
	this.activeUsersAreaChart = function(data,legendName, title, subtitle){
		console.log("data:", data);
		return {
	        chart: {
	            type: 'area',
                height:300
	        },
	        title: {
	            text: title,
	            align:'left'
	        },
	        subtitle: {
	            text: subtitle,
	            align:'left',
	            style: {
	                color: '#686868',
	                fontWeight: 'bold'
	            }
	        },
	        tooltip: {
	            valueSuffix: '%'
	        },
	        xAxis: {
	        	//x-axis data
	            categories: data.xAxisData,
	            title: {
	                text: null
	            }
	        },
	        series: [{
	            name: legendName,
	            data: data.data,
	            color:data.color
	        }]
		}
		
	};
	
this.getLoginDurationColumnChart = function(data, title, subtitle){
		
		return {
	        chart: {
	            type: 'column',
                height:300
	        },
	        title: {
	            text: title,
	            align:'left',
	            style: {
	                color: '#686868',
	                fontWeight: 'bold'
	            }
	        },
	        tooltip: {
	            valueSuffix: '%'
	        },
	        subtitle: {
	            text: subtitle,
	            align:'left',
	            style: {
	                color: '#686868',
	                fontWeight: 'bold'
	            }
	        },
	        xAxis: {
	        	//x-axis data
	            categories: data.xAxisData,
	            title: {
	                text: null
	            }
	        },
	        series: data.data
		}
		
	};
this.getColumnChartWithoutPercentage = function(data, title, subtitle){
		
		return {
	        chart: {
	            type: 'column',
                height:300
	        },
	        title: {
	            text: title,
	            align:'left',
	            style: {
	                color: '#686868',
	                fontWeight: 'bold'
	            }
	        },
	        tooltip: {
	            valueSuffix: ''
	        },
	        subtitle: {
	            text: subtitle,
	            align:'left',
	            style: {
	                color: '#686868',
	                fontWeight: 'bold'
	            }
	        },
	        xAxis: {
	        	//x-axis data
	            categories: data.xAxisData,
	            title: {
	                text: null
	            }
	        },
	        series: data.data
		}
		
	};
	
	this.getBasicLineChart = function(data, title, subtitle){
		
		return {
	        title: {
	            text: title
	        },
	        subtitle: {
	            text: subtitle,
	            x: -20
	        },
	        xAxis: {
	            categories: data.categories
	        },
	        yAxis: {
	            title: {
	                text: 'Mn'
	            },
	            min:100,
	            max:115,
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        tooltip: {
	            valueSuffix: '°C'
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            borderWidth: 0
	        },
	        series: data.data
		}
		
	};
	
	this.getBusinessImpactTrend = function() {	
		return {	
			chart:{
				//width:1024,
				height:300,
				spacingRight : 80,
				spacingLeft : 15
			},
			legend: {
				align: "right",
				symbolPadding:20,
				layout: "vertical",
				itemMarginTop:28,
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
			yAxis: {
				gridLineWidth: 0,
				min: 0,
				title: {
					text: 'Revenue ($)',
					style:{
						color: '#000000',
						font: '12pt arial, sans-serif',
						fontWeight:'bold'
					}
				},
				labels:{
					formatter: function(){
						var val = this.value;
						return (parseInt(val) / 1000).toLocaleString()+' K';
					},
					style:{
						color: '#000000',
						font: '10pt arial, sans-serif'
					}
				}
			},

	        navigation: {
	            buttonOptions: {
                    symbolFill:'#32CABB',
                    x: 80,
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
});