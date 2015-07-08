angular.module('AnalyticsApp')

.factory('RequestConstantsFactory', function(){
	var CONSTANTS = {};
	var RESPONSE = [];
	var LOGIN = [];
	var CHANGE_PASSWORD = [];
	//TRACKING
	var WIDGETS = [];
	//Decision WorkBench module
	var BUILDDO = [];
	//Settings module
	var DATASYNC = [];
	var CHANNELS = [];
	var MODELS = [];
	var GOALS = [];
	var USERS = [];
	var AUDIT_TRAIL = [];
	var NOTIFICATION = [];
	var ERROR_MSGS = [];
	var DATE = [];
	var DECISION_URL = [];
	var TRAC_URL = [];
	var SETTINGS_URL = [];
	var PERMISSIONS = [];
	var CHART_CONSTANTS = [];
	/*---------------------Permission constants---------------------------*/
	PERMISSIONS.TRACK_FUNNEL = "track_funnel";
	PERMISSIONS.TRACK_BI = "business_impact";
	PERMISSIONS.TRACK_EA = "engagement_activity";
	PERMISSIONS.TRACK_UG = "user_groups";
	
	PERMISSIONS.BI_REVENUE = "revenue";
	PERMISSIONS.BI_ARPU = "arpu";
	PERMISSIONS.BI_NEW_PAID_USERS = "new_paid_users";
	PERMISSIONS.BI_NEW_SIGN_UPS = "new_sign-ups";
	PERMISSIONS.BI_PAGE_VIEWS = "pageViews";
	PERMISSIONS.BI_COST_PER_DAY = "cost_per_day";
	PERMISSIONS.BI_COST_ESTIMATES = "cost-estimates";
	PERMISSIONS.BI_CONVERSION_RATE = "convRate";
	
	//For demo
	PERMISSIONS.BI_REVENUE = "Revenue";
	PERMISSIONS.BI_ARPU = "ARPU";
	PERMISSIONS.BI_REGISTRATIONS = "Registrations";
	PERMISSIONS.BI_COST_OF_ACQUISITION = "CostofAcqusition";
	PERMISSIONS.BI_NEW_PAID_USERS = "NewPaidUsers";
	PERMISSIONS.BI_COST_PER_DAY = "cost_per_day";
	PERMISSIONS.BI_COST_ESTIMATES = "cost-estimates";
	PERMISSIONS.BI_CONVERSION_RATE = "convRate";
	
	
	
	PERMISSIONS.EA_ENGAGEMENT_SCORE = "engagement_score";
	PERMISSIONS.EA_VIDEO_UPLOADS = "video_uploads";
	PERMISSIONS.EA_PROFILE_BUILDER = "profile_builder";
	PERMISSIONS.EA_MESSAGES = "messages";
	PERMISSIONS.EA_BLOGS = "blogs";
	PERMISSIONS.EA_JOBS = "jobs";
	PERMISSIONS.EA_FRIENDS_LIST = "friends_list";
	PERMISSIONS.EA_SENT_EMAIL = "sent_email";
	PERMISSIONS.EA_VIEW_RESUME = "view_resume";
	PERMISSIONS.EA_APPLY_JOB = "apply_job";
	PERMISSIONS.EA_ADD_PEOPLE = "add_people";
	PERMISSIONS.EA_ADD_BLOGS = "add_blogs";
	PERMISSIONS.EA_CREATE_RESUME= "create_resume";
	PERMISSIONS.EA_SAVE_RESUME= "save_resume";
	
	PERMISSIONS.UG_ONE = "usergroup1";
	PERMISSIONS.UG_TWO = "usergroup2";
	PERMISSIONS.UG_THREE = "usergroup3"
	PERMISSIONS.UG_FOUR = "usergroup4";
	PERMISSIONS.UG_FIVE = "usergroup5";
	PERMISSIONS.SUMMARY_TREND_PAID_USERS = "newSubs_cancellations";
	PERMISSIONS.SUMMARY_TREND_REVENUE = "revenue_mrr";
	CONSTANTS['PERMISSIONS'] = PERMISSIONS;
	/*---------------------Chart constants---------------------------*/
	CHART_CONSTANTS.TREND_TYPE = ['column','column','line','line'];
	CHART_CONSTANTS.TREND_YAXIS = [0,0,1,1];
	CHART_CONSTANTS.TREND_COLORS = ['#32cabb','#26a48e','#149ae3','#1b6395'];
	CHART_CONSTANTS.TREND_ID = ['newRevenue','mrr','Actual','Target'];
	CHART_CONSTANTS.TREND_NAME = ['New Revenue ($)','MRR ($)','Cancellations','New Subs'];
	CHART_CONSTANTS.TREND_TOOLTIP_SUFFIX = ['Mn','Mn','K','K'];
	CONSTANTS['CHART_CONSTANTS'] = CHART_CONSTANTS;
	/*---------------------Date function constants---------------------------*/
	DATE.WEEK_LABLES = ['a','b','c','d','e','f'];
	CONSTANTS['DATE'] = DATE;
	/*---------------------Notify message---------------------------*/
	NOTIFICATION.SUCCESS = "success";
	NOTIFICATION.FAILURE = "failure"; 
	CONSTANTS['NOTIFICATION'] = NOTIFICATION;
	/*----------------------Error Messages------------------------------*/ 
	ERROR_MSGS.DATA_ERR = "No Data Available !!";
	ERROR_MSGS.NETWORK_ERR = "Network Error !!";
	CONSTANTS['ERROR_MSGS'] = ERROR_MSGS;
	/*---------------------Decision Workbench---------------------------*/
	BUILDDO.WATERFALL_CURRENT = "current";
	BUILDDO.WATERFALL_DEFICIT = "deficit";
	BUILDDO.WATERFALL_CONVERSION_UPLIFT = "conversionUplift";
	BUILDDO.WATERFALL_BASE_EXPECTED = "baseExpected";
	BUILDDO.WATERFALL_TARGET = "target";
	BUILDDO.WATERFALL_ACHIEVABLE = "achievable";
	BUILDDO.PERIOD_DATA_MAX_UPLIFT = "maximumUplift";
	
	CONSTANTS['BUILDDO'] = BUILDDO;
	
	/*-------------------------Response--------------------------*/
	RESPONSE.STATUS_OKAY = "OK";
	RESPONSE.STATUS = "status";
	RESPONSE.LOGIN_SUCCESS = "loginSuccess";
	
	CONSTANTS['RESPONSE'] = RESPONSE;
	
	/*------------------------Home-----------------------------*/
	
	//For Login Page
	LOGIN.USER_NAME = "username";
	LOGIN.PASSWORD = "password";
	
	//For Change Password page Page
	CHANGE_PASSWORD.OLD_PASSWORD = "oldpass";
	CHANGE_PASSWORD.NEW_PASSWORD = "newpass";
	CHANGE_PASSWORD.CONFIRM_PASSWORD = "newpass2";
	
	
	CONSTANTS['LOGIN'] = LOGIN;
	CONSTANTS['CHANGE_PASSWORD'] = CHANGE_PASSWORD;
	
	/*---------------------Track---------------------------*/
	WIDGETS.BI_REVENUE = "revenue";
	WIDGETS.BI_ARPU = "arpu";
	WIDGETS.BI_NEW_PAID_USERS = "newPaidUsers";
	WIDGETS.BI_NEW_SIGN_UPS = "newSubs";
	WIDGETS.BI_PAGE_VIEWS = "pageViews";
	WIDGETS.BI_COST_PER_DAY = "costPerDay";
	WIDGETS.BI_COST_ESTIMATES = "costEstimates";
	WIDGETS.BI_CONVERSION_RATE = "convRate";
	
	WIDGETS.EA_ENGAGEMENT_SCORE = "engmtScore";
	WIDGETS.EA_VIDEO_UPLOADS = "vidUpldr";
	WIDGETS.EA_PROFILE_BUILDER = "profBldr";
	WIDGETS.EA_MESSAGES = "messages";
	WIDGETS.EA_BLOGS = "commBlog";
	WIDGETS.EA_JOBS = "jobs";
	WIDGETS.EA_FRIENDS_LIST = "friendsList";
	WIDGETS.EA_SENT_EMAIL = "sentEmail";
	WIDGETS.EA_VIEW_RESUME = "viewResume";
	WIDGETS.EA_APPLY_JOB = "applyJob";
	WIDGETS.EA_ADD_PEOPLE = "addPeople";
	WIDGETS.EA_ADD_BLOGS = "addBlogs";
	WIDGETS.EA_CREATE_RESUME= "createResume";
	WIDGETS.EA_SAVE_RESUME= "saveResume";
	
	
	WIDGETS.UG_ONE = "usrGrp1";
	WIDGETS.UG_TWO = "usrGrp2";
	WIDGETS.UG_THREE = "usrGrp3"
	WIDGETS.UG_FOUR = "usrGrp4";
	WIDGETS.UG_FIVE = "usrGrp5";
	CONSTANTS['WIDGETS'] = WIDGETS;
	
	/*---------------------Settings---------------------------*/
	
	//for dataSync Page
	DATASYNC.DATA_SOURCE_ID = "dataSourceId";
	DATASYNC.FROM_DATE = "periodFrom";
	DATASYNC.TO_DATE = "periodTo";
	DATASYNC.REPORTING_INTERVAL = "reportingInterval";
	DATASYNC.PERIOD_NAME = "periodName";
	DATASYNC.TIME_RANGE = "timeRange";
	
	//for Channels Page
	CHANNELS.CHANNEL_ID = "channelId";
	CHANNELS.CHANNEL_TYPE = "channelType";
	CHANNELS.ESTIMATE_COST = "estimateCost";
	CHANNELS.ESTIMATE_TIME = "estimateTime";
	CHANNELS.LAST_MODIFIED_DATE = "lastModifiedDate";
	CHANNELS.LAST_MODIFIED_BY = "lastModifiedBy";
	CHANNELS.DEFAULT_CHANNEL = "defaultChannel";
	
	//for Models Page
	MODELS.MODEL_ID = "modelId";
	MODELS.MODEL_DETAILS = "modelDetails";
	MODELS.MODEL_FILE = "modelFile";
	MODELS.MODEL_VERSION = "modelVersion";
	
	//for Goals Page
	GOALS.FROM_DATE = "periodFrom";
	GOALS.TO_DATE = "periodTo";
	GOALS.TIME_RANGE = "timeRange";
	GOALS.GOAL_ID = "goalId";
	GOALS.GOAL_PERIOD = "goalPeriod";
	GOALS.REVENUE = "revenue";
	GOALS.NPU = "npu";
	GOALS.CONV_RATE = "convRate";
	GOALS.NEW_SIGNUPS = "newSignUps";
	GOALS.PAGE_VIEWS = "pageViews";
	GOALS.CHILDREN = "children";
	//for Users Page
	USERS.USER_ID = "userId";
	USERS.USER_NAME = "userName";
	USERS.FIRST_NAME = "fName";
	USERS.LAST_NAME = "lName";
	USERS.EMAIL_ID = "emailId";
	USERS.DEPARTMENT = "dept";
	USERS.ROLE = "role";
	USERS.ROLE_ID = "roleId";
	USERS.ROLE_NAME = "roleName";
	USERS.ROLE_ENTITY_ID = "entityId";
	USERS.ROLE_ENTITY_NAME = "entityName";
	USERS.ROLE_DESCRIPTION = "roleDescription";
	USERS.ROLE_READ_PERMISSION = "readPermission";
	USERS.ROLE_WRITE_PERMISSION = "writePermission";
	USERS.ROLE_PERMISSIONS = "permissions";
	USERS.ROLE_PERMISSION_LIST = "permissionsList";
	
	//for Audit Trail Page
	AUDIT_TRAIL.LIST_OF_MODULES = "listOfModules";
	AUDIT_TRAIL.FROM_DATE = "periodFrom";
	AUDIT_TRAIL.LIST_OF_ACTIVITIES = "listOfActivities";
	AUDIT_TRAIL.TO_DATE = "periodTo";
	AUDIT_TRAIL.CHANGED_BY = "changedBy";
	AUDIT_TRAIL.TIME_RANGE = "timeRange";
	
	
	
	CONSTANTS['DATASYNC'] = DATASYNC;
	CONSTANTS['CHANNELS'] = CHANNELS;
	CONSTANTS['MODELS'] = MODELS;
	CONSTANTS['USERS'] = USERS;
	CONSTANTS['GOALS'] = GOALS;
	CONSTANTS['AUDIT_TRAIL'] = AUDIT_TRAIL;
	
	
	/*----------------------base url------------------------------*/
	//var BASE_URL = "http://199.223.234.202:8080/absolutdata";
	
	/*---------------------url version------------------------------*/
	var BASE_URL_VERSION = appConstants.API_BASE_URL + "/v0.1"
	
	/*-----------------------login-----------------------------*/
	var LOGIN_URL = BASE_URL_VERSION + "/login"
	var CHANGE_PASS_URL = BASE_URL_VERSION + "/changepass"
	
	/*-----------------Decision Workbench module------------------*/
	var BASE_FAKE_STUB = "http://jsonstub.com";
	
	var DECISION_BASE_URL = BASE_URL_VERSION + "/decisionWorkbench/";
	var DECISION_FAKE_BASE_URL = BASE_FAKE_STUB + "/decisionWorkbench/";
	
	DECISION_URL.DO_SETTINGS = DECISION_BASE_URL + "setDOSettings";
	DECISION_URL.VALIDATE_DO = DECISION_FAKE_BASE_URL + "validateDO";
	DECISION_URL.EDIT_DO = DECISION_BASE_URL + "editDOAction";
	DECISION_URL.GET_DO_SETTINGS = DECISION_FAKE_BASE_URL + "getDOSettings";
	DECISION_URL.NEW_DECISION_OPTION = DECISION_FAKE_BASE_URL + "getNewDecisionOptions";
	DECISION_URL.REVIEW_DO = DECISION_FAKE_BASE_URL + "reviewDO";
	DECISION_URL.UPDATE_DO = DECISION_BASE_URL + "updateDO";
	DECISION_URL.EDIT_DO_SAVE = DECISION_BASE_URL + "editDOSaveAction";
	DECISION_URL.GET_DECISION_FILTERS = DECISION_FAKE_BASE_URL + "getDecisionOptionsWithFilters";
	
	/*------------------Tracking module---------------------*/
	var TRAC_BASE_URL = BASE_URL_VERSION + "/track/";
	var TRAC_FAKE_BASE_URL = BASE_FAKE_STUB + "/track/";
	
	TRAC_URL.GET_SUMMARY = TRAC_BASE_URL + "getTrackSummary";
	TRAC_URL.GET_BI_DATA_USER = TRAC_FAKE_BASE_URL + "getBIDataByUserGroup";
	TRAC_URL.GET_GRP_SUMMARY = TRAC_FAKE_BASE_URL + "getGrpSummary";
	
	TRAC_URL.GET_ACQ_TREND_DATA = TRAC_FAKE_BASE_URL + "getAcqTrendData";
	TRAC_URL.GET_ACQ_FUNNEL_DATA = TRAC_FAKE_BASE_URL + "getAcqFunnelData";
	TRAC_URL.GET_BI_DATE_BY_TIME = TRAC_FAKE_BASE_URL + "getBIDataByTime";
	TRAC_URL.GET_EA_DATA_MODULE = TRAC_FAKE_BASE_URL + "getEADataByModule";
	TRAC_URL.GET_EA_HEAT_MAP = TRAC_FAKE_BASE_URL + "getEAHeatMap";
	TRAC_URL.GET_USER_SETTINGS = TRAC_FAKE_BASE_URL + "getUserSettings";
	TRAC_URL.POST_USER_SETTINGS = TRAC_BASE_URL + "postUserSettings";
	TRAC_URL.GET_EA_SCORE = TRAC_FAKE_BASE_URL + "getEAScore";
	TRAC_URL.GET_GRP_ACQUISITION_TREND = TRAC_FAKE_BASE_URL + "getGrpAcquisitionTrend";
	TRAC_URL.GET_EA_TREND = TRAC_FAKE_BASE_URL + "getEATrend";
	TRAC_URL.GET_GRP_DETAILS = TRAC_FAKE_BASE_URL + "getGrpDetails";
	
	TRAC_URL.GET_FAKE_BI_SUMMARY = TRAC_FAKE_BASE_URL + "BI";
	TRAC_URL.GET_FAKE_EA_SUMMARY = TRAC_FAKE_BASE_URL + "EA";
	
	
	/*-----------------Settings module------------------*/
	var SETTINGS_BASE_URL = BASE_URL_VERSION + "/settings/";
	
	SETTINGS_URL.DATA_SYNC_STATUS = SETTINGS_BASE_URL + "getDataSyncStatus";
	SETTINGS_URL.DATA_SYNC_HISTORY = SETTINGS_BASE_URL + "getDataSyncHistory";
	
	SETTINGS_URL.CHANNELS_LIST = SETTINGS_BASE_URL + "getChannelList";
	SETTINGS_URL.CHANNELS_ADD = SETTINGS_BASE_URL + "addChannel";
	SETTINGS_URL.CHANNELS_EDIT = SETTINGS_BASE_URL + "editChannel";
	SETTINGS_URL.CHANNELS_DELETE = SETTINGS_BASE_URL + "deleteChannel";
	
	SETTINGS_URL.MODELS_LIST = SETTINGS_BASE_URL + "getModelList";
	SETTINGS_URL.MODELS_HISTORY_LIST = SETTINGS_BASE_URL + "getModelVersionHistory";
	SETTINGS_URL.ADD_MODELS = SETTINGS_BASE_URL + "addModel";
	SETTINGS_URL.MODEL_DETAILS = SETTINGS_BASE_URL + "getModelMeta";
	
	SETTINGS_URL.GOALS_LIST = SETTINGS_BASE_URL + "listGoals";
	SETTINGS_URL.GOALS_EDIT = SETTINGS_BASE_URL + "editGoal";
	SETTINGS_URL.GOALS_UPLOAD = SETTINGS_BASE_URL + "uploadGoal";
	
	SETTINGS_URL.USERS_LIST = SETTINGS_BASE_URL + "listUsers";
	SETTINGS_URL.USERS_EDIT = SETTINGS_BASE_URL + "editUser";
	SETTINGS_URL.ROLES_LIST = SETTINGS_BASE_URL + "listRoles";
	SETTINGS_URL.ROLE_ADD = SETTINGS_BASE_URL + "addRole";
	SETTINGS_URL.ROLE_EDIT = SETTINGS_BASE_URL + "editRole";
	SETTINGS_URL.USERS_DELETE = SETTINGS_BASE_URL + "deleteUser";
	SETTINGS_URL.ROLE_DELETE = SETTINGS_BASE_URL + "deleteRole";
	SETTINGS_URL.USERS_ADD = SETTINGS_BASE_URL + "createUser";
	SETTINGS_URL.USERS_PERMISSION_ROLES = SETTINGS_BASE_URL + "listPermissionForRole";
	SETTINGS_URL.USERS_UPATE_PERMISSION_ROLES = SETTINGS_BASE_URL + "updatePermissionForRole";
	
	SETTINGS_URL.AUDIT_TRAIL_SETUP = SETTINGS_BASE_URL + "getAuditTrailMeta";
	SETTINGS_URL.AUDIT_TRAIL_LIST = SETTINGS_BASE_URL + "getAuditTrail";
	
	CONSTANTS['DECISION_URL'] = DECISION_URL;
	CONSTANTS['TRAC_URL'] = TRAC_URL;
	CONSTANTS['SETTINGS_URL'] = SETTINGS_URL;
	CONSTANTS['LOGIN_URL'] = LOGIN_URL;
	CONSTANTS['CHANGE_PASS_URL'] = CHANGE_PASS_URL;

	return CONSTANTS;
})

.factory('EnabledCacheInfoFactory', function(){
	var CONSTANTS  = {};
	
	//Settings module
	var DATASYNC = [];
	var CHANNELS = [];
	var MODELS = [];
	var GOALS = [];
	var USERS = [];
	var AUDIT_TRAIL = [];
	
	/*---------------------Settings---------------------------*/
	//Data Sync Page
	DATASYNC.DATA_SYNC_STATUS = false;
	DATASYNC.DATA_SYNC_HISTORY = false;
	
	//for Channels Page
	CHANNELS.CHANNEL_INFO_TABLE = false;
	CHANNELS.ADD_CHANNEL = false;
	CHANNELS.EDIT_CHANNEL = false;
	CHANNELS.DELETE_CHANNEL = false;
	
	//for models page
	MODELS.UPDATE_MODEL_TABLE = false;
	MODELS.VIEW_MODEL_TABLE = false;
	MODELS.ADD_MODEL = false;
	MODELS.MODEL_DETAILS = false;//for the add model dialog drop down
	
	//for goals page
	GOALS.GOALS_TABLE = false;
	GOALS.EDIT_GOALS = false;
	
	//for users page - user module
	USERS.USER_LIST_TABLE = false;
	USERS.USER_ADD = false;
	USERS.USER_EDIT = false;
	USERS.USER_DELETE = false;
	//for users page - role module
	USERS.ROLE_LIST_TABLE = false;
	USERS.ROLE_ADD = false;
	USERS.ROLE_EDIT = false;
	USERS.ROLE_DELETE = false;
	USERS.ROLE_PERMISSION = false;
	USERS.ROLE_PERMISSION_UPDATE = false;
	
	//for audit trail page
	AUDIT_TRAIL.AUDIT_TRAIL_SETUP = false;
	AUDIT_TRAIL.AUDIT_TRAIL_USERLIST_SETUP = false;//getting the list of users from users page for setup
	AUDIT_TRAIL.AUDIT_TRAIL_LIST_TABLE = false;
	
	CONSTANTS['DATASYNC'] = DATASYNC;
	CONSTANTS['CHANNELS'] = CHANNELS;
	CONSTANTS['MODELS'] = MODELS;
	CONSTANTS['GOALS'] = GOALS;
	CONSTANTS['USERS'] = USERS;
	CONSTANTS['AUDIT_TRAIL'] = AUDIT_TRAIL;
	return CONSTANTS;
})