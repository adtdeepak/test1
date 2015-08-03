Highcharts.theme = {
    colors: ['#132D52', '#336699', '#6699CC', '#94BCE4', '#BDD7F0', '#E4EFF9', '#777F8D', '#C1392D', 
             '#BEC3C7'],
    chart: {
        backgroundColor: "transparent",
		/*backgroundColor: {
            linearGradient: [0, 0, 0, 300],
            stops: [
                [0, 'rgb(255, 255, 255)'],
                //[1, 'rgb(255, 255, 255)'],
                [1, 'rgb(238, 238, 238)']
            ]
        },*/
    },
    title: {
        style: {
            color: '#308BCB',
            font: 'bold 18px "Open Sans", sans-serif'
        },
		align: "left"
    },
    subtitle: {
        style: {
            color: '#4B91C5',
            font: 'bold 12px "Open Sans", sans-serif'
        }
    },

    legend: {
        itemStyle: {
            font: '11pt "Open Sans", sans-serif',
            color: 'black'
        },
        itemHoverStyle:{
            color: '#4B91C5'
        }   
    }
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);