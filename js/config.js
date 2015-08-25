/* This file will be dynamically generated by JSP.
 * 
 * 
*/
window.appConstants = {
	
	//Add the username and client here
	sukhi:"Hightail",
	harsh:"Soundcloud",
	edison:"Hightail",
	password:"abs0lutd@ta",
	DEFAULT_USER_MODE:	"freemium",
	
	TIME_PERIODS : [
		           	   {"value" : "Weekly", "key":"weekly"},
		           	   {"value" : "Monthly", "key":"monthly"},
		           	   {"value" : "Quarterly", "key":"quarterly"},
		           	   {"value" : "Yearly", "key":"yearly"}
		           	],

	//DEVNOTE this should be removed
	AVAILABLE_PERIODS : [{
		periodName : "weekly",
		reportingInterval:"daily"
	},{
		periodName : "monthly",
		reportingInterval:"weekly"
	},{
		periodName : "quarterly",
		reportingInterval:"monthly"
	},{
		periodName : "yearly",
		reportingInterval:"monthly"
	}],
	
	DATE_FORMAT : "MM/DD/YYYY",
	
	API_BASE_URL : "http://130.211.181.21:8080/absolutdata",
	
	BI_Prefix : "track_BI_",
	EA_Prefix : "track_EA_",
	SUMMARY_Prefix : "track_Summary_",
	UG_Prefix : "track_UG_",
	
	//API
	BI_SUMMARY : false,
	BI_COHORT : false,
	BI_COHORT_DEEP_DRIVE : false,
	BI_DEEP_DIVE : false,
	BI_TREND : false,

	EA_SUMMARY : false,
	EA_SCORE : false,
	EA_USER_SETTINGS : false,

	UG_SUMMARY : true,
	
	TRACK_SUMMARY_ACQ_TREND : false,
	
	//Track
	
	//Summary
	track_Summary_Title_monthly : "Month To Date Actual",
	track_Summary_Title_weekly : "Week To Date Actual",
	track_Summary_Title_quarterly : "Quarter To Date Actual",
	track_Summary_Title_yearly : "Year To Date Actual",
	
	//BI Constants
	//Metrics
	track_BI_forecast_monthly: "Monthly Forecast",
	track_BI_vsLast_monthly : "vs. Last Month",
	track_BI_vsLastYear_monthly : "vs. same Month LY",
	
	track_BI_forecast_weekly: "Weekly Forecast",
	track_BI_vsLast_weekly : "vs. Last Week",
	track_BI_vsLastYear_weekly : "vs. same Week LY",
	
	track_BI_forecast_quarterly: "Quarterly Forecast",
	track_BI_vsLast_quarterly : "vs. Last Quarter",
	track_BI_vsLastYear_quarterly : "vs. same quarter LY",

	track_BI_forecast_yearly: "Yearly Forecast",
	track_BI_vsLast_yearly : "vs. Last Year",
	track_BI_vsLastYear_yearly : "vs. Last Year",
	
	
	//summary
	track_BI_summary_forecast_monthly: "Forecast for this month",
	track_BI_comparedLast_monthly : "Compared to last month",
	track_BI_comparedLastYear_monthly : "Compared to same week last month",
	
	track_BI_summary_forecast_weekly: "Forecast for this week",
	track_BI_comparedLast_weekly : "Compared to last week",
	track_BI_comparedLastYear_weekly : "Compared to same week last year",
	
	track_BI_summary_forecast_quarterly : "Forecast for this quarter",
	track_BI_comparedLast_quarterly : "Compared to last quarter",
	track_BI_comparedLastYear_quarterly : "Compared to same quarter last year",
	
	track_BI_summary_forecast_yearly : "Forecast for this year",
	track_BI_comparedLast_yearly : "Compared to last year",
	track_BI_comparedLastYear_yearly : "Compared to last year",
	
	//Engagement activity constants
	//summary
	track_EA_summary_forecast_monthly: "Forecast for this month",
	track_EA_comparedLast_monthly : "Compared to last month",
	track_EA_comparedLastYear_monthly : "Compared to same week last month",
	
	track_EA_summary_forecast_weekly: "Forecast for this week",
	track_EA_comparedLast_weekly : "Compared to last week",
	track_EA_comparedLastYear_weekly : "Compared to same week last year",
	
	track_EA_summary_forecast_quarterly : "Forecast for this quarter",
	track_EA_comparedLast_quarterly : "Compared to last quarter",
	track_EA_comparedLastYear_quarterly : "Compared to same quarter last year",
	
	track_EA_summary_forecast_yearly : "Forecast for this year",
	track_EA_comparedLast_yearly : "Compared to last year",
	track_EA_comparedLastYear_yearly : "Compared to last year",
	
	track_EA_averagePeriod_weekly : "4 weeks Average",
	track_EA_averagePeriod_monthly : "4 months Average",
	track_EA_averagePeriod_quarterly : "4 quarters Average",
	track_EA_averagePeriod_yearly : "4 years Average",
	
	//User Group
	//summary
	track_UG_activeUsers_weekly : "Active Users Per Week",
	track_UG_activeUsers_monthly : "Active Users Per Month",
	track_UG_activeUsers_quaterly : "Active Users Per Quater",
	track_UG_activeUsers_yearly : "Active Users Per Year",
	
	track_UG_avgLogin_weekly : "Average Login Per Week",
	track_UG_avgLogin_monthly : "Average Login Per Month",
	track_UG_avgLogin_quaterly : "Average Login Per Quater",
	track_UG_avgLogin_yearly : "Average Login Per Year",
	
	//Business Impact 
	//Deep Dive
	track_BI_DeepDive_weekly : "week",
	track_BI_DeepDive_monthly : "month",
	track_BI_DeepDive_quarterly : "quarter",
	track_BI_DeepDive_yearly : "year",
	
	track_BI_sameLastYearText_weekly : "week Last year",
	track_BI_sameLastYearText_monthly : "month Last year",
	track_BI_sameLastYearText_quarterly : "quarter Last year",
	track_BI_sameLastYearText_yearly : "Last year",
	//DW
	//set goals
	SETGOALS:{
		weekly:"Week",
		monthly: "Month",
		quarterly: "Quarter",
		yearly: "Year"
	},
	buildDO_window_name : "Build Decision Options"
}

window.appTooltipConstants = {
		
		TOOLTIP_TRAC_SUMMARY_FUNNEL:	"Tool tip text goes here",
		TOOLTIP_TRAC_SUMMARY_TREND:	"Graph helps analyse revenue, subscription and cancellations trend. Highlighted area shows forecast",
		TOOLTIP_TRAC_BI_TREND : "Graph helps analyse revenue trend. Highlighted area shows forecast",
		TOOLTIP_TRAC__ENGAGEMENTSCORE_TREND:"Graph helps analyse overall platform engagement trend. Highlighted area shows forecast",
		TOOLTIP_TRAC__ENGAGEMENT_TREND:"Graph helps analyse activity usage trend. Highlighted area shows forecast",
		TOOLTIP_TRAC__UG_TREND:"Graph helps analyse group membership over time. Highlighted area shows forecast ",
		
		TOOLTIP_TRAC_SUMMARY_BUSINESSIMPACT : {
			revenue : "Tool tip text goes here for revenue",
			newSubs : "Tool tip text goes here for newSubs",
			covRate : "Tool tip text goes here for covRate",
			reg : "Tool tip text goes here for reg",
			arpu : "Tool tip text goes here for arpu"
		},
		
		TOOLTIP_TRAC_SUMMARY_ENGAGEMENT : {
			engmtScore : "Tool tip text goes here for engmtscore",
			homePage : "Tool tip text goes here for homePage",
			vidUpldr : "Tool tip text goes here for vidUpldr",
			commBlog : "Tool tip text goes here for commBlog",
			profBldr : "Tool tip text goes here for profBldr"
		},
		
		TOOLTIP_TRAC_SUMMARY_USERGROUP : {
			usrGrp1 : "Tool tip text goes here for usrGrp1"
		},
		
		TOOLTIP_DECISIONWB_DECISIONOPT_ACQUISITION : "Graph provides a summary on the deficit from goals",

		TOOLTIP_DECISIONWB_DECISIONOPT_DATA : "Tool tip text goes here for Data for the Week",
		
		TOOLTIP_DECISIONWB_DECISIONOPT_ENGACTIVITIES : "Tool tip text goes here for Engaged Activities",
		
		TOOLTIP_DECISIONWB_DECISIONOPT_USERGRP : "Tool tip text goes here for Engaged User Group",
		
		TOOLTIP_DECISIONWB_REVPANEL_ACIVEUPLIFT : "Graph helps compare impact due to selection of campaign options and compare achievable new subscription during the month",
		
		TOOLTIP_DECISIONWB_REVPANEL_TIMECOSTCOMP : "Tool tip text goes here for Time & Cost Comparison",
		
		TOOLTIP_DECISIONWB_ACHIEVABLE_UPLIFT : "Graph helps compare impact due to selection of campaign options and compare achievable new subscription during the month",
		
		TOOLTIP_DECISIONWB_REVIEW_PANEL : "Tool tip text goes here for REVIEW_PANEL"
}

window.notifyConstants = {
		NOTIFY_DW_FILTER_SELECT_ATLEAST : "Select atleast one User Group and Conversion Activity",
			NOTIFY_DW_DO_UPDATED	: "Decision Options Updated Successfully"
}

