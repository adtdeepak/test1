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
	            color:"#ff9900"
	        },{
	            name: 'Recurring',
	            data: data.recurringRevenue,
	            color:"#308BCB"
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
	            color:"#308BCB"
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
	
	this.activeUsersAreaChart = function(data, title, subtitle){
		
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
	            name: 'Active users',
	            data: data.data,
	            color:"#308BCB"
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
		
	}
});