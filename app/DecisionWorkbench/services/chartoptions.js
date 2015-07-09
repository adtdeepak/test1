angular.module('DecisionWorkbench')

.service('ChartOptionsService', function( UtilitiesService ) {

this.getSetGoalsData = function(data) {	
		return {
			chart:{
				spacingRight:30,
				spacingLeft:30,
				spacingTop:15
			},
			title : {
			floating : true,
			align : 'left',
			style : {
				fontSize : '16px',
				color : '#0070c0',
				fontWeight : '400',
				fontFamily : 'Arial, sans-serif'
			}

		},
		xAxis : {
			categories : [ 'New Subscribers', 'Expected New Subscribers',
					'Deficit', 'Goal' ],
			labels : {
				
					style : {
						fontFamily : 'Arial, sans-serif',
						color : 'black',
						fontSize : '10pt'
				
				}
			}
		},yAxis: {
			title: {
				text:'New Paid Users',
				style: {
					color: '#000000',
					font: '11pt Arial, sans-serif',
					fontWeight:'bold'
				}
			},
			labels : {
				enabled : false
			},
			gridLineWidth:0
		},
		 plotOptions: {
	            series: {
	                dataLabels: {
	                    enabled: true,
	                    formatter: function(){
	                    	yVal = this.y;
	    					if(yVal < 0){
	    						yVal = -(yVal);
	    					}else if(yVal == 0){
	    						yVal = 'Zero Deficit';
	    					}
	    					return UtilitiesService.getLocaleString(yVal);
	    				
	                    }
	                }
	            }
	        },
		
		legend : {
			enabled : false
		},

        navigation: {
            buttonOptions: {
                symbolFill:'#32CABB',
                x:20,
                y:-10,
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
	}
	};
	
	this.getTopLeastEngagedData = function(data) {	
		return {	

			title : {
				text : ""
			}

		}
	};
	
	this.getTopLeastEngagedUserData = function(data) {	
		return {

			title : {
				text : ""
			}
		}
	};
	
	this.getBuildDoData = function(data) {	
		return {
			chart:{
				spacingRight:30,
				spacingLeft:30,
				spacingTop:15
			},
	
		title : {
			floating : true,
			align : 'left',
			style : {
				fontSize : '16px',
				color : '#0070c0',
				fontWeight : '400',
				fontFamily : 'Carrois Gothic, sans-serif'
			}
		},
		xAxis : {
			categories : [ 'New Subscribers', 'Expected Subscribers',
					'Deficit', 'Goal', 'New subscription due to camp',
					'Achievable' ],
			labels : {
				style : {
					fontFamily : 'Arial, sans-serif',
					color : 'black',
					fontSize : '10tpx'
				}
			}
		},yAxis: {
			title: {
				text:'New Paid Users',
				style: {
					color: '#000000',
					font: '11pt Arial, sans-serif',
					fontWeight:'bold'
				}
			},
			labels : {
				enabled : false
			},
			gridLineWidth:0
		},
		legend : {
			enabled : false
		},

        navigation: {
            buttonOptions: {
                x:20,
                y:-10,
                symbolFill:'#32CABB',
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
		}
	};
	
	this.getReviewDoBubbleData = function(data) {	
		return {
			chart:{
				spacingRight:45,
				spacingLeft:30,
				spacingTop:30,
				spacingBottom:40
			},
		title : {
			
			// floating: true,
			align : 'left',
			style : {
				fontSize : '16px',
				color : '#0070c0',
				fontWeight : '400',
				fontFamily : 'Open Sans,sans-serif'
			}
		},
		legend : {
			enabled : false
		},
		tooltip : {
            formatter: function () {
                return "Selected :"+this.series.name[0]
	    							+"<br></br>"+"New Users :"+this.series.name[1]
					            	+"<br></br>"+"Time :"+this.series.name[2]
					            	+"<br></br>"+"Cost :"+this.series.name[3];
            }
		},

        navigation: {
            buttonOptions: {
                y:-15,
                x:20,
                symbolFill:'#32CABB',
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
		}
	};
	
	this.getReviewDoWaterfallData= function(data) {	
		return {
			
				title : {
				
					floating : true,
					align : 'left',
					style : {
						fontSize : '16px',
						color : '#0070c0',
						fontWeight : '400',
						fontFamily : 'Arial, sans-serif'
					}
				},
				
				legend : {
					enabled : false
				},
				tooltip : {
					enabled : false
				},
				xAxis : {
				
					
					categories : [ 'Current', 'Base Expected',
							'Deficit', 'Target', 'Conv Uplift DO1,2,5',
							'Achievable' ],
					labels : {
						style : {
							fontFamily : 'Arial, sans-serif',
							color : 'black',
							fontSize : '10pt'
						}
					}
				},

		        navigation: {
		            buttonOptions: {
		                text: 'Export1',
		                symbolFill:'#32CABB',
		                y:-50,
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
		
	
		}
	};
	
});