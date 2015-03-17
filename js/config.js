/* This file will be dynamically generated by JSP.
 * 
 * 
*/
window.appConstants = {
	
	DEFAULT_USER_MODE:	"freemium",
	
	TIME_PERIODS : [
		           	   {"value" : "Weekly", "key":"byWeek"},
		           	   {"value" : "Monthly", "key":"byMonth"},
		           	   {"value" : "Quarterly", "key":"byQuarter"},
		           	   {"value" : "Yearly", "key":"byYear"}
		           	],

	//DEVNOTE this should be removed
	AVAILABLE_PERIODS : [{
		periodName : "byWeek",
		reportingInterval:"weekly"
	},{
		periodName : "byMonth",
		reportingInterval:"monthly"
	},{
		periodName : "byQuarter",
		reportingInterval:"quarterly"
	},{
		periodName : "byYear",
		reportingInterval:"yearly"
	}],
	
	PERIOD_NAME_WEEK : "byWeek",
	PERIOD_NAME_MONTH : "byMonth",
	PERIOD_NAME_QUARTER: "byQuarter",
	PERIOD_NAME_YEAR : "byYear",
	
	IS_ENABLE_GLOBAL_CACHE : true,
	
	DATE_FORMAT : "MM-DD-YYYY",
	CHART_LABEL_DATE_FORMAT : "MM/DD/YYYY",
	//Session timeout
	IDLE_TIMEOUT : 30, //in minute(s)
	CACHE_MAX_AGE : 60, //in minute(s)
	
	//Grid table in  target page - read only columns - column index starts from 1
	TARGET_GRID_READONLY_COLUMNS : 3, 
	
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

//Track

//Summary
window.appConstants["track_Summary_Title_"+window.appConstants.PERIOD_NAME_MONTH] = "Month To Date Actual";
window.appConstants["track_Summary_Title_"+window.appConstants.PERIOD_NAME_WEEK] = "Week To Date Actual";
window.appConstants["track_Summary_Title_"+window.appConstants.PERIOD_NAME_QUARTER] ="Quarter To Date Actual";
window.appConstants["track_Summary_Title_"+window.appConstants.PERIOD_NAME_YEAR] ="Year To Date Actual";

//BI Constants
//Metrics
window.appConstants["track_BI_forecast_"+window.appConstants.PERIOD_NAME_MONTH] = "Monthly Forecast";
window.appConstants["track_BI_vsLast_"+window.appConstants.PERIOD_NAME_MONTH] = "vs. Last Month";
window.appConstants["track_BI_vsLastYear_"+window.appConstants.PERIOD_NAME_MONTH] = "vs. same Month LY";

window.appConstants["track_BI_forecast_"+window.appConstants.PERIOD_NAME_WEEK] = "Weekly Forecast";
window.appConstants["track_BI_vsLast_"+window.appConstants.PERIOD_NAME_WEEK] = "vs. Last Week";
window.appConstants["track_BI_vsLastYear_"+window.appConstants.PERIOD_NAME_WEEK] = "vs. same Week LY";

window.appConstants["track_BI_forecast_"+window.appConstants.PERIOD_NAME_QUARTER] = "Quarterly Forecast";
window.appConstants["track_BI_vsLast_"+window.appConstants.PERIOD_NAME_QUARTER] = "vs. Last Quarter";
window.appConstants["track_BI_vsLastYear_"+window.appConstants.PERIOD_NAME_QUARTER] = "vs. same quarter LY";

window.appConstants["track_BI_forecast_"+window.appConstants.PERIOD_NAME_YEAR] = "Yearly Forecast";
window.appConstants["track_BI_vsLast_"+window.appConstants.PERIOD_NAME_YEAR] = "vs. Last Year";
window.appConstants["track_BI_vsLastYear_"+window.appConstants.PERIOD_NAME_YEAR] = "vs. Last Year";


//summary
window.appConstants["track_BI_summary_forecast_"+window.appConstants.PERIOD_NAME_MONTH] = "Forecast for this month";
window.appConstants["track_BI_comparedLast_"+window.appConstants.PERIOD_NAME_MONTH] = "Compared to last month";
window.appConstants["track_BI_comparedLastYear_"+window.appConstants.PERIOD_NAME_MONTH] = "Compared to same month last year";

window.appConstants["track_BI_summary_forecast_"+window.appConstants.PERIOD_NAME_WEEK] = "Forecast for this week";
window.appConstants["track_BI_comparedLast_"+window.appConstants.PERIOD_NAME_WEEK] = "Compared to last week";
window.appConstants["track_BI_comparedLastYear_"+window.appConstants.PERIOD_NAME_WEEK] = "Compared to same week last year";

window.appConstants["track_BI_summary_forecast_"+window.appConstants.PERIOD_NAME_QUARTER] = "Forecast for this quarter";
window.appConstants["track_BI_comparedLast_"+window.appConstants.PERIOD_NAME_QUARTER] = "Compared to last quarter";
window.appConstants["track_BI_comparedLastYear_"+window.appConstants.PERIOD_NAME_QUARTER] = "Compared to same quarter last year";

window.appConstants["track_BI_summary_forecast_"+window.appConstants.PERIOD_NAME_YEAR] = "Forecast for this year";
window.appConstants["track_BI_comparedLast_"+window.appConstants.PERIOD_NAME_YEAR] = "Compared to last year";
window.appConstants["track_BI_comparedLastYear_"+window.appConstants.PERIOD_NAME_YEAR] = "Compared to last year";

//Engagement activity constants
//summary
window.appConstants["track_EA_summary_forecast_"+window.appConstants.PERIOD_NAME_MONTH] = "Forecast for this month";
window.appConstants["track_EA_comparedLast_"+window.appConstants.PERIOD_NAME_MONTH] = "Compared to last month";
window.appConstants["track_EA_comparedLastYear_"+window.appConstants.PERIOD_NAME_MONTH] = "Compared to same month last year";

window.appConstants["track_EA_summary_forecast_"+window.appConstants.PERIOD_NAME_WEEK] = "Forecast for this week";
window.appConstants["track_EA_comparedLast_"+window.appConstants.PERIOD_NAME_WEEK] = "Compared to last week";
window.appConstants["track_EA_comparedLastYear_"+window.appConstants.PERIOD_NAME_WEEK] = "Compared to same week last year";

window.appConstants["track_EA_summary_forecast_"+window.appConstants.PERIOD_NAME_QUARTER] = "Forecast for this quarter";
window.appConstants["track_EA_comparedLast_"+window.appConstants.PERIOD_NAME_QUARTER] = "Compared to last quarter";
window.appConstants["track_EA_comparedLastYear_"+window.appConstants.PERIOD_NAME_QUARTER] = "Compared to same quarter last year";

window.appConstants["track_EA_summary_forecast_"+window.appConstants.PERIOD_NAME_YEAR] = "Forecast for this year";
window.appConstants["track_EA_comparedLast_"+window.appConstants.PERIOD_NAME_YEAR] = "Compared to last year";
window.appConstants["track_EA_comparedLastYear_"+window.appConstants.PERIOD_NAME_YEAR] = "Compared to last year";

//User Group
//summary
window.appConstants["track_UG_activeUsers_"+window.appConstants.PERIOD_NAME_MONTH] = "Active Users Per Week";
window.appConstants["track_UG_activeUsers_"+window.appConstants.PERIOD_NAME_WEEK] = "Active Users Per Month";
window.appConstants["track_UG_activeUsers_"+window.appConstants.PERIOD_NAME_QUARTER] ="Active Users Per Quater";
window.appConstants["track_UG_activeUsers_"+window.appConstants.PERIOD_NAME_YEAR] ="Active Users Per Year";

window.appConstants["track_UG_avgLogin_"+window.appConstants.PERIOD_NAME_MONTH] = "Active Login Per Week";
window.appConstants["track_UG_avgLogin_"+window.appConstants.PERIOD_NAME_WEEK] = "Active Login Per Month";
window.appConstants["track_UG_avgLogin_"+window.appConstants.PERIOD_NAME_QUARTER] ="Active Login Per Quater";
window.appConstants["track_UG_avgLogin_"+window.appConstants.PERIOD_NAME_YEAR] ="Active Login Per Year";

//Business Impact 
//Deep Dive
window.appConstants["track_BI_DeepDive_"+window.appConstants.PERIOD_NAME_MONTH] = "month";
window.appConstants["track_BI_DeepDive_"+window.appConstants.PERIOD_NAME_WEEK] = "week";
window.appConstants["track_BI_DeepDive_"+window.appConstants.PERIOD_NAME_QUARTER] ="quarter";
window.appConstants["track_BI_DeepDive_"+window.appConstants.PERIOD_NAME_YEAR] ="year";

window.appConstants["track_BI_sameLastYearText_"+window.appConstants.PERIOD_NAME_MONTH] = "month Last year";
window.appConstants["track_BI_sameLastYearText_"+window.appConstants.PERIOD_NAME_WEEK] = "week Last year";
window.appConstants["track_BI_sameLastYearText_"+window.appConstants.PERIOD_NAME_QUARTER] ="quarter Last year";
window.appConstants["track_BI_sameLastYearText_"+window.appConstants.PERIOD_NAME_YEAR] ="Last year";


window.appTooltipConstants = {
		
		TOOLTIP_TRAC_SUMMARY_FUNNEL:	"Tool tip text goes here",
		
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
		
		TOOLTIP_DECISIONWB_DECISIONOPT_ACQUISITION : "Tool tip text goes here for Paid user acquisition",

		TOOLTIP_DECISIONWB_DECISIONOPT_DATA : "Tool tip text goes here for Data for the Week",
		
		TOOLTIP_DECISIONWB_DECISIONOPT_ENGACTIVITIES : "Tool tip text goes here for Engaged Activities",
		
		TOOLTIP_DECISIONWB_DECISIONOPT_USERGRP : "Tool tip text goes here for Engaged User Group",
		
		TOOLTIP_DECISIONWB_REVPANEL_ACIVEUPLIFT : "Tool tip text goes here for Achievable Uplift",
		
		TOOLTIP_DECISIONWB_REVPANEL_TIMECOSTCOMP : "Tool tip text goes here for Time & Cost Comparison",
		
		TOOLTIP_DECISIONWB_ACHIEVABLE_UPLIFT : "Tool tip text goes here for ACHIEVABLE_UPLIFT",
		
		TOOLTIP_DECISIONWB_REVIEW_PANEL : "Tool tip text goes here for REVIEW_PANEL"
}

window.notifyConstants = {
		NOTIFY_DW_FILTER_SELECT_ATLEAST : "Select atleast one User Group and Conversion Activity",
			NOTIFY_DW_DO_UPDATED	: "Decision Options Updated Successfully"
}

window.labelConstants =  [

                          { 
                        	  "key":"track_tab",
                        	  "value": "Track",
                        	  "path":"" 
                           },
                          {
                        	   "key":"summary_tab",
                        	   "value":"Summary",
                        	   "path":""
                          },
                          {
                       	   "key":"business_impact_tab",
                       	   "value":"Business Impact",
                       	   "path":""
                         },
                         {
                         	   "key":"engagement_activity_tab",
                         	   "value":"Engagement Activity",
                         	   "path":""
                           },
                           {
                         	   "key":"user_group_tab",
                         	   "value":"User Group",
                         	   "path":""
                           },
                           {
                         	   "key":"home_tab",
                         	   "value":"Home",
                         	   "path":""
                           },
                           {
                         	   "key":"decision_workbench_tab",
                         	   "value":"Decision Workbench",
                         	   "path":""
                           },
                           {
                         	   "key":"index_tab",
                         	   "value":"Find New Decision Options",
                         	   "path":""
                           },
                           {
                         	   "key":"reviewdo_tab",
                         	   "value":"Review Panel",
                         	   "path":""
                           },
                           {
                         	   "key":"settings_tab",
                         	   "value":"Settings",
                         	   "path":""
                           },
                           {
                         	   "key":"track_summary_funnel_title",
                         	   "value":"Funnel",
                         	   "path":"Section header, 1st section"
                           },
                           {
                         	   "key":"track_summary_trend_title",
                         	   "value":"Trend",
                         	   "path":"Section header, 2nd section"
                           },
                           {
                         	   "key":"track_summary_funnel_visitors",
                         	   "value":"Visitors",
                         	   "path":"Section 1 widget 1, widget title"
                           },
                           {
                         	   "key":"track_summary_funnel_registrations",
                         	   "value":"Registrations",
                         	   "path":"Section 1 widget 2, widget title"
                           },
                           {
                         	   "key":"track_summary_metrics_title",
                         	   "value":"Metrics",
                         	   "path":"Section header, 3rd section "
                           },
                           {
                         	   "key":"track_summary_funnel_subscriptions",
                         	   "value":"Subscriptions",
                         	   "path":"Section 1 widget 3, widget title"
                           },
                           {
                         	   "key":"track_summary_funnel_cancellations",
                         	   "value":"Cancellations",
                         	   "path":"Section 1 widget 4, widget title"
                           },
                           {
                         	   "key":"track_summary_metrics_businessImpact",
                         	   "value":"Business Impact",
                         	   "path":"Section 3, sub section 1 title"
                           },
                           {
                         	   "key":"track_summary_metrics_engagementMetrics",
                         	   "value":"Engagement Metrics",
                         	   "path":"Section 3, sub section 2 title"
                           },
                           {
                         	   "key":"track_summary_metrics_userGroup",
                         	   "value":"User Group",
                         	   "path":"Section 3, sub section 3 title"
                           },
                           {
                         	   "key":"track_summary_funnel_acquisistionRate",
                         	   "value":"Acquisition Rate",
                         	   "path":"Section 1 widget 2, metric title"
                           },
                           {
                         	   "key":"track_summary_funnel_conversionRate",
                         	   "value":"Conversion Rate",
                         	   "path":"Section 1 widget 3, metric title"
                           },
                           {
                         	   "key":"track_summary_funnel_churnRate",
                         	   "value":"Churn Rate",
                         	   "path":"Section 1 widget 4, metric title"
                           },
                           {
                         	   "key":"track_summary_trend_chart_title",
                         	   "value":"Revenues vs. Subcriptions/Cancellations",
                         	   "path":"Section 2, chart title"
                           },
                           {
                         	   "key":"track_summary_trend_chart_left_title",
                         	   "value":"Revenue ($)",
                         	   "path":"Section 2, column chart Y-axis 1 title"
                           },
                           {
                         	   "key":"track_summary_trend_chart_right_title",
                         	   "value":"New Paid Users",
                         	   "path":"Section 2, line chart Y-axis 2 title"
                           },
                           {
                         	   "key":"track_BI_key_business_metrics_title",
                         	   "value":"Key Business Metrics",
                         	   "path":"Section title, section 1"
                           },
                           {
                         	   "key":"track_BI_summary_title",
                         	   "value":"Summary",
                         	   "path":"Section title, section 2"
                           },
                           {
                         	   "key":"track_BI_trend_title",
                         	   "value":"Trend",
                         	   "path":"Section title, section 3"
                           },
                           {
                         	   "key":"track_BI_deep_dive_title",
                         	   "value":"Deep Dive",
                         	   "path":"Section title, section 4"
                           },
                           {
                         	   "key":"track_BI_deep_dive_user_group_column",
                         	   "value":"User Group",
                         	   "path":"Section 4 table, column 1 title"
                           },
                           {
                         	   "key":"track_BI_deep_dive_wtd_actual_column",
                         	   "value":"Actuals Till Date",
                         	   "path":"Section 4 table, column 2 title "
                           },
                           {
                         	   "key":"track_BI_trend_chart_title",
                         	   "value":"Number of Users",
                         	   "path":"Section 4 table, column 3 title "
                           },
                           {
                         	   "key":"track_EA_engagement_score_title",
                         	   "value":"Engagement Score",
                         	   "path":"Section 1, Donut chart title"
                           },
                           {
                         	   "key":"track_EA_engagement_score_trend_title",
                         	   "value":"Engagement Score Trend",
                         	   "path":"Section 1, Chart title"
                           },
                           {
                         	   "key":"track_EA_key_engagement_activity_matrices_title",
                         	   "value":"Key Engagement Activity Matrices",
                         	   "path":"Section title, Section 2"
                           },
                           {
                         	   "key":"track_EA_summary_title",
                         	   "value":"Summary",
                         	   "path":"Section title, Section 3"
                           },
                           {
                         	   "key":"track_EA_trend_title",
                         	   "value":"Trend",
                         	   "path":"Section title, Section 4"
                           },
                           {
                         	   "key":"track_EA_deep_dive_title",
                         	   "value":"Deep Dive",
                         	   "path":"Section title, Section 5"
                           },
                           {
                         	   "key":"track_EA_deep_dive_moduleEngagement",
                         	   "value":"Module Engagement",
                         	   "path":"Section 5, sub section 2 title"
                           },
                           {
                         	   "key":"track_EA_deep_dive_conversionWeightage",
                         	   "value":"Conversion Weightage",
                         	   "path":"Section 5, sub section 1 title"
                           },
                           {
                         	   "key":"track_EA_deep_dive_moduleEngagement_user_group_column",
                         	   "value":"UserGroup",
                         	   "path":"Section 5, sub section 2, table Column 1 title "
                           },
                           {
                         	   "key":"track_EA_deep_dive_moduleEngagement_actual",
                         	   "value":"Actual",
                         	   "path":"Section 5, sub section 2, table Column 3 title "
                           },
                           {
                         	   "key":"track_EA_deep_dive_moduleEngagement_no_of_users",
                         	   "value":"No Of Unique Users",
                         	   "path":"Section 5, sub section 2, table Column 2 title "
                           },
                           {
                         	   "key":"track_UG_trend_chart_title",
                         	   "value":"Number of Users",
                         	   "path":"Section 1, widgets description"
                           },
                           {
                         	   "key":"track_UG_usergroup_metrics_title",
                         	   "value":"User Group Metrics",
                         	   "path":"Section title, Section 1"
                           },
                           {
                         	   "key":"track_UG_summary_title",
                         	   "value":"Summary",
                         	   "path":"Section title, Section 2"
                           },
                           {
                         	   "key":"track_UG_trend_title",
                         	   "value":"User Group Acquisition Trend",
                         	   "path":"Section title, Section 3"
                           },
                           {
                         	   "key":"track_UG_deep_dive_title",
                         	   "value":"Deep Dive",
                         	   "path":"Section title, Section 4"
                           },
                           {
                         	   "key":"track_UG_deep_dive_engagement_view_user_group_column",
                         	   "value":"User Groups",
                         	   "path":"Section 4 table, column 1 title "
                           },
                           {
                         	   "key":"track_UG_deep_dive_engagement_view_active_users_column",
                         	   "value":"Active Users",
                         	   "path":"Section 4 table, column 2 title "
                           },
                           {
                         	   "key":"track_UG_deep_dive_engagement_view_average_login_column",
                         	   "value":"Average Logins",
                         	   "path":"Section 4 table, column 3 title "
                           },
                           {
                         	   "key":"track_UG_deep_dive_engagement_view_recurring_booking_column",
                         	   "value":"Recurring Booking",
                         	   "path":"Section 4 table, column 4 title "
                           },
                           {
                         	   "key":"track_UG_deep_dive_engagement_view_arpu_column",
                         	   "value":"ARPU",
                         	   "path":"Section 4 table, column 5 title"
                           },
                           {
                         	   "key":"track_UG_deep_dive_engagement_view_engagement_level_column",
                         	   "value":"Engagement Level",
                         	   "path":"Section 4 table, column 6 title "
                           },
                           {
                         	   "key":"track_UG_deep_dive_engagement_view_engagement_score_column",
                         	   "value":"Engagement Score",
                         	   "path":"Section 4 table, column 7 title "
                           },
                           {
                         	   "key":"track_UG_deep_dive_campaign_view_user_group_column",
                         	   "value":"User Groups",
                         	   "path":"Section 4 campaign view table, column 1 title"
                           },
                           {
                         	   "key":"track_UG_deep_dive_campaign_view_no_of_users_column",
                         	   "value":"No. Of Users",
                         	   "path":"Section 4 campaign view table, column 2 title"
                           },
                           {
                         	   "key":"track_UG_deep_dive_campaign_view_base_expected_conversion_column",
                         	   "value":"Base Expected Conversion",
                         	   "path":"Section 4 campaign view table, column 3 title"
                           },
                           {
                         	   "key":"track_UG_deep_dive_campaign_view_campaign_impact_column",
                         	   "value":"Campaign Impact",
                         	   "path":"Section 4 campaign view table, column 5 title"
                           },
                           {
                         	   "key":"track_UG_deep_dive_campaign_view_new_users_achieved",
                         	   "value":"New Users Achieved",
                         	   "path":"Section 4 campaign view table, column 6 title"
                           },
                           {
                         	   "key":"track_UG_deep_dive_campaign_view_compared_to_column",
                         	   "value":"Compared to This",
                         	   "path":"Section 4 campaign view table, column 7 title"
                           },
                           {
                         	   "key":"track_UG_deep_dive_campaign_view_target_column",
                         	   "value":"Target",
                         	   "path":"Section 4 campaign view table, column 8 title"
                           },
                           {
                         	   "key":"track_UG_deep_dive_campaign_view_conversion_uplift_column",
                         	   "value":"Conversion Uplift",
                         	   "path":"Section 4 campaign view table, column 9 title"
                           },
                           {
                         	   "key":"track_UG_deep_dive_campaign_view_time_remaining_column",
                         	   "value":"Time Remaining",
                         	   "path":"Section 4 campaign view table, column 10 title"
                           },
                           {
                         	   "key":"dw_index_title",
                         	   "value":"Set Goals",
                         	   "path":"page title"
                           },
                           {
                         	   "key":"dw_index_waterfall_chart_title",
                         	   "value":"Paid User Acquisition",
                         	   "path":"Section title, Section 1"
                           },
                           {
                         	   "key":"dw_index_showing_data_title",
                         	   "value":"Showing data for the",
                         	   "path":"Section title, Section 2"
                           },
                           {
                         	   "key":"dw_index_bubblechart_1_title",
                         	   "value":"Top and Least Engaged Activities",
                         	   "path":"Section title, Section 3"
                           },
                           {
                         	   "key":"dw_index_bubblechart_2_title",
                         	   "value":"Top and Least Engaged User Group",
                         	   "path":"Section title, Section 4"
                           },
                           {
                         	   "key":"dw_index_show_best_do_button_text",
                         	   "value":"Show Best Decision Options",
                         	   "path":"Button text ,button 1"
                           },
                           {
                         	   "key":"dw_index_set_filters_button_text",
                         	   "value":"Set Filters",
                         	   "path":"Button text ,button 2"
                           },
                           {
                         	   "key":"dw_builddo_title",
                         	   "value":"Build Decision Options",
                         	   "path":"page title"
                           },
                           {
                         	   "key":"dw_builddo_waterfall_chart_title",
                         	   "value":"Achievable Uplift",
                         	   "path":"Section title, Section 1"
                           },
                           {
                         	   "key":"dw_builddo_review_panel_title",
                         	   "value":"Review Panel",
                         	   "path":"Section title, Section 2"
                           },
                           {
                         	   "key":"dw_builddo_decision_options_title",
                         	   "value":"Decision Options",
                         	   "path":"Section title, Section 3"
                           },
                           {
                         	   "key":"dw_builddo_remove_selection_btn_text",
                         	   "value":"Remove Selection",
                         	   "path":"Button text ,button 2"
                           },
                           {
                         	   "key":"dw_builddo_review_panel_save_btn_text",
                         	   "value":"Save & View Review Panel",
                         	   "path":"Button text ,button 1"
                           },
                           {
                         	   "key":"dw_reviewdo_title",
                         	   "value":"Review Decision Options",
                         	   "path":"page title"
                           },
                           {
                         	   "key":"dw_reviewdo_waterfall_chart_title",
                         	   "value":"Achievable Uplift",
                         	   "path":"Section title, Section 1"
                           },
                           {
                         	   "key":"dw_reviewdo_bubble_chart_title",
                         	   "value":"Time & Cost Comparison",
                         	   "path":"Section title, Section 2"
                           },
                           {
                         	   "key":"dw_reviewdo_decision_options_title",
                         	   "value":"Decision Options",
                         	   "path":"Section title, Section 3"
                           },
                           {
                         	   "key":"dw_filters_title",
                         	   "value":"Filters",
                         	   "path":"page title"
                           },
                           {
                         	   "key":"dw_filters_user_group_title",
                         	   "value":"User Group",
                         	   "path":"Section title, Section 1"
                           },
                           {
                         	   "key":"dw_filters_conversion_activity_title",
                         	   "value":"Conversion Activity",
                         	   "path":"Section title, Section 2"
                           },
                           {
                         	   "key":"dw_filters_conversion_uplift_title",
                         	   "value":"Conversion Uplift",
                         	   "path":"Section title, Section 3"
                           },
                           {
                         	   "key":"dw_filters_active_till_date_title",
                         	   "value":"Active Till Date",
                         	   "path":"Section title, Section 4"
                           },
                           {
                         	   "key":"dw_filters_show_do_button_text",
                         	   "value":"Show Decision Options",
                         	   "path":"Button text ,button 1"
                           },
                           {
                         	   "key":"dw_filters_clear_filter_button_text",
                         	   "value":"Clear Filter",
                         	   "path":"Button text ,button 2"
                           },
                           {
                         	   "key":"dw_filters_close_filter_button_text",
                         	   "value":"Close Filter",
                         	   "path":"Button text ,button 2"
                           },
                           {
                         	   "key":"dw_filters_builddo_text",
                         	   "value":"Current Selection",
                         	   "path":"Button text ,button 2"
                           }
                      ]