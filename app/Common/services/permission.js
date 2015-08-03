angular.module('AnalyticsApp')

.service("Permission", function (RequestConstantsFactory) {
	var permissionConstants = RequestConstantsFactory['PERMISSIONS'];
	
	this.hasPermission = function(permInternalName) {
		return true;
	}

	/*---------Tracking - Summary--------*/
	//Funnel chart
	this.canViewTrackFunnel = function() {
		return this.hasPermission(permissionConstants.TRACK_SUMMARY_FUNNEL);
	}
	//Trend chart
	this.canViewTrackTrend = function() {
		return (this.hasPermission(permissionConstants.TRACK_SUMMARY_TREND_REVENUE) || this.hasPermission(permissionConstants.TRACK_SUMMARY_TREND_PAID_USERS));
		
	}
	//Trend chart - paid users only
	this.canViewTrackTrendPaidUsers = function() {
		return this.hasPermission(permissionConstants.TRACK_SUMMARY_TREND_PAID_USERS);
	}
	//Trend chart - revenue only
	this.canViewTrackTrendRevenue = function() {
		return this.hasPermission(permissionConstants.TRACK_SUMMARY_TREND_REVENUE);
	}
	this.canViewTrackBusinessImpact = function() {
		return (this.hasPermission(permissionConstants.BI_REVENUE)|| this.hasPermission(permissionConstants.BI_ARPU) || this.hasPermission(permissionConstants.BI_NEW_PAID_USERS)||
				this.hasPermission(permissionConstants.BI_NEW_SIGN_UPS) || this.hasPermission(permissionConstants.BI_PAGE_VIEWS) || this.hasPermission(permissionConstants.BI_COST_PER_DAY)||
				this.hasPermission(permissionConstants.BI_COST_ESTIMATES));
	}
	this.canViewTrackEngagementMetrics = function() {
		return (this.hasPermission(permissionConstants.EA_ENGAGEMENT_SCORE) || this.hasPermission(permissionConstants.EA_VIDEO_UPLOADS) || this.hasPermission(permissionConstants.EA_PROFILE_BUILDER) || 
				this.hasPermission(permissionConstants.EA_MESSAGES) || this.hasPermission(permissionConstants.EA_BLOGS) || this.hasPermission(permissionConstants.EA_JOBS) || 
				this.hasPermission(permissionConstants.EA_FRIENDS_LIST) || this.hasPermission(permissionConstants.EA_SENT_EMAIL) || this.hasPermission(permissionConstants.EA_VIEW_RESUME) || 
				this.hasPermission(permissionConstants.EA_APPLY_JOB) || this.hasPermission(permissionConstants.EA_ADD_PEOPLE) || this.hasPermission(permissionConstants.EA_ADD_BLOGS) ||
				this.hasPermission(permissionConstants.EA_CREATE_RESUME) || this.hasPermission(permissionConstants.EA_SAVE_RESUME));
	}
	this.canViewUserGroup = function() {
		return (this.hasPermission(permissionConstants.UG_ONE) ||  this.hasPermission(permissionConstants.UG_TWO) ||  this.hasPermission(permissionConstants.UG_THREE) ||
				this.hasPermission(permissionConstants.UG_FOUR) || this.hasPermission(permissionConstants.UG_FIVE));
	}


	/*----------Decision Workbench - Set goals and builddo--------*/
	//both set goals and builddo page
	this.canEditSetGoals= function() {
		return this.hasPermission(permissionConstants.DW_SET_GOALS);
	}

	/*----------Decision Workbench - Review DO--------*/
	//Review DO page
	this.canViewReviewDO= function() {
		return this.hasPermission(permissionConstants.DW_REVIEW_DO);
	}
	//Review DO table except Approval workflow columns (Activate, Responsibility, Approval Status) i.e.DO Cost
	this.canEditDOCost= function() {
		return this.hasPermission(permissionConstants.DW_REVIEW_DO_TABLE_COST);
	}
	//Review DO table for Approval workflow columns (Activate, Responsibility, Approval Status) i.e.Responsibilty column
	this.canEditDOResponsibility= function() {
		return this.hasPermission(permissionConstants.DW_REVIEW_DO_TABLE_RESPONSIBITY);
	}

	this.getBusinessImpactWidgetsPermissions = function (){
		var widgetConstants = RequestConstantsFactory['WIDGETS'];
		var data = {};
		data[widgetConstants.BI_REVENUE] = this.hasPermission(permissionConstants.BI_REVENUE);
		data[widgetConstants.BI_ARPU] = this.hasPermission(permissionConstants.BI_ARPU);
		data[widgetConstants.BI_NEW_PAID_USERS] = this.hasPermission(permissionConstants.BI_NEW_PAID_USERS);
		data[widgetConstants.BI_NEW_SIGN_UPS] = this.hasPermission(permissionConstants.BI_NEW_SIGN_UPS);
		data[widgetConstants.BI_PAGE_VIEWS] = this.hasPermission(permissionConstants.BI_PAGE_VIEWS);
		data[widgetConstants.BI_COST_PER_DAY] = this.hasPermission(permissionConstants.BI_COST_PER_DAY);
		data[widgetConstants.BI_COST_ESTIMATES] = this.hasPermission(permissionConstants.BI_COST_ESTIMATES);
		data[widgetConstants.BI_CONVERSION_RATE] = this.hasPermission(permissionConstants.BI_CONVERSION_RATE);
		return data;
	}
	
	this.getEngagementActivityWidgetsPermissions = function (){
		var widgetConstants = RequestConstantsFactory['WIDGETS'];
		var data = {};
		data[widgetConstants.EA_ENGAGEMENT_SCORE] = this.hasPermission(permissionConstants.EA_ENGAGEMENT_SCORE);
		data[widgetConstants.EA_VIDEO_UPLOADS] = this.hasPermission(permissionConstants.EA_VIDEO_UPLOADS);
		data[widgetConstants.EA_PROFILE_BUILDER] = this.hasPermission(permissionConstants.EA_PROFILE_BUILDER);
		data[widgetConstants.EA_MESSAGES] = this.hasPermission(permissionConstants.EA_MESSAGES);
		data[widgetConstants.EA_BLOGS] = this.hasPermission(permissionConstants.EA_BLOGS);
		data[widgetConstants.EA_JOBS] = this.hasPermission(permissionConstants.EA_JOBS);
		data[widgetConstants.EA_FRIENDS_LIST] = this.hasPermission(permissionConstants.EA_FRIENDS_LIST);
		data[widgetConstants.EA_SENT_EMAIL] = this.hasPermission(permissionConstants.EA_SENT_EMAIL);
		data[widgetConstants.EA_VIEW_RESUME] = this.hasPermission(permissionConstants.EA_VIEW_RESUME);
		data[widgetConstants.EA_APPLY_JOB] = this.hasPermission(permissionConstants.EA_APPLY_JOB);
		data[widgetConstants.EA_ADD_PEOPLE] = this.hasPermission(permissionConstants.EA_ADD_PEOPLE);
		data[widgetConstants.EA_ADD_BLOGS] = this.hasPermission(permissionConstants.EA_ADD_BLOGS);
		data[widgetConstants.EA_CREATE_RESUME] = this.hasPermission(permissionConstants.EA_CREATE_RESUME);
		data[widgetConstants.EA_SAVE_RESUME] = this.hasPermission(permissionConstants.EA_SAVE_RESUME);
		return data;
	}
	
	this.getUserGroupWidgetsPermissions = function (){
		var widgetConstants = RequestConstantsFactory['WIDGETS'];
		var data = {};
		data[widgetConstants.UG_ONE] = this.hasPermission(permissionConstants.UG_ONE);
		data[widgetConstants.UG_TWO] = this.hasPermission(permissionConstants.UG_TWO);
		data[widgetConstants.UG_THREE] = this.hasPermission(permissionConstants.UG_THREE);
		data[widgetConstants.UG_FOUR] = this.hasPermission(permissionConstants.UG_FOUR);
		data[widgetConstants.UG_FIVE] = this.hasPermission(permissionConstants.UG_FIVE);
		return data;
	}



	/*-----------------------Settings---------------------*/
	//---------Data Sync Page
	//data Sync page view permission
	this.canDataSyncViewable = function(){
		return this.hasPermission(permissionConstants.SETTINGS_DATA_SYNC);
	}

	//--------Channels Page
	//channels page view permission
	this.canChannelsViewable = function(){
		return this.hasPermission(permissionConstants.SETTINGS_CHANNELS_VIEW);
	}
	//channels page edit permission
	this.canChannelsEditable = function(){
		return this.hasPermission(permissionConstants.SETTINGS_CHANNELS_EDIT);
	}

	//--------Models Page
	//Models page view permission
	this.canModelsViewable = function(){
		return this.hasPermission(permissionConstants.SETTINGS_MODELS_VIEW);
	}
	//Models page edit permission
	this.canModelsEditable = function(){
		return this.hasPermission(permissionConstants.SETTINGS_MODELS_EDIT);
	}

	//--------Goals Page
	//Goals page view permission
	this.canGoalsViewable = function(){
		return this.hasPermission(permissionConstants.SETTINGS_GOALS_VIEW);
	}
	//Goals page edit permission
	this.canGoalsEditable = function(){
		return this.hasPermission(permissionConstants.SETTINGS_GOALS_EDIT);
	}

	//--------Users Page
	//Users page view permission
	this.canUsersViewable = function(){
		return this.hasPermission(permissionConstants.SETTINGS_USERS_VIEW);
	}
	//Users page edit permission
	this.canUsersEditable = function(){
		return this.hasPermission(permissionConstants.SETTINGS_USERS_EDIT);
	}

	//--------Audit Trail Page
	//Audit Trail view permission
	this.canAuditTrailViewable = function(){
		return this.hasPermission(permissionConstants.SETTINGS_AUDIT_TRAIL_VIEW);
	}
	//Audit Trail edit permission
	this.canAuditTrailEditable = function(){
		return this.hasPermission(permissionConstants.SETTINGS_AUDIT_TRAIL_EDIT);
	}
});