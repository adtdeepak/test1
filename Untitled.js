<head>
<title>D-ASSIST $ CONVERTER</title>
<link rel="shortcut icon" href="images/logo.ico" />
</head>


<div class="container" id="analysis-cl">
    
    <div style="width:100%; padding:0px; border:1px solid #ccc; border-radius:4px;" class="col-md-6">
            <div class="panel">
              <ul id="myTab2" class="nav nav-tabs nav-justified">
                <li class="active"><a class="analysis-tab-button" href="#Compairson" data-toggle="tab">Compairson</a></li>
                   <li class="dropdown">
                  <a class="analysis-tab-button" href="#" id="myTabDrop1-1" class="dropdown-toggle" data-toggle="dropdown">Trends <b class="caret"></b></a>
                  <ul class="dropdown-menu" role="menu" aria-labelledby="myTabDrop1">
                    <li><a href="#Freshers" tabindex="-1" data-toggle="tab">Freshers</a></li>
                    <li><a href="#Finance-Execs" tabindex="-1" data-toggle="tab">Finance Execs</a></li>
                    <li><a href="#Senior-Mngt" tabindex="-1" data-toggle="tab">Senior Mngt</a></li>
                    <li><a href="#Recruiters" tabindex="-1" data-toggle="tab">Recruiters</a></li>
                  </ul>
                </li>
               <li><a class="analysis-tab-button" href="#Trends" data-toggle="tab">Trends</a></li>
              </ul>
              <div id="myTabContent2" style="padding:0px;" class="tab-content">
                  
                  <!--compairson section start-->
                  <div class="tab-pane fade active in" id="Compairson">
                  <div class="row acquisition-panel nopadding" id="comparison-div"
		style="margin-top: 20px !important; border:none;"
		ng-controller="comparisonController">
		<div class="panel panel-default">
			
		</div>
		<div class="row nopadding">
			<div style="text-align:center;" class="col-sm-3 col-md-3 col-lg-3 clearfix">
            <h1 style="color: #fa965a;
    font-size: 80px;">
                4
                </h1>
                <p>
                    No. of User Groups
</p>
                </p>
            </div>
			<div class="col-sm-9 col-md-9 col-lg-9">
				<div class="half-width">
					<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
						<div class="brdr-red" style="height: 150px">
							<h2 class="titleLikeChart">Freshers</h2>
						</div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
						<div class="brdr-red" style="height: 150px">
							<h2 class="titleLikeChart">Finance Executives</h2>
						</div>
					</div>
				</div>
				<div class="half-width">
					<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
						<div class="brdr-red" style="height: 150px">
							<h2 class="titleLikeChart">Senior</h2>
						</div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
						<div class="brdr-red" style="height: 150px">
							<h2 class="titleLikeChart">Freshers</h2>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row nopadding" style="margin-top: 25px !important">
			<div class=" white-bg col-sm-3 col-md-3 col-lg-3 clearfix">
				<div class="acqChart" id="revenuePieChart"></div>
				<div class="acqChart" id="subsPieChart"></div>
				<div class="acqChart" id="newSubsPieChart"></div>
				<div class="acqChart" id="cancelPieChart"></div>
			</div>
			<div class="col-sm-9 col-md-9 col-lg-9">
				<div class=" half-left-div-border col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="stageBarChart"></div>
				</div>
				<div class=" half-right-div-border col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="churnBarChart"></div>
				</div>
			</div>
		</div>

		<div class="row-fluid">
			<div>
				<table class="table borderless smSubsTable noMarginBtm">
					<colgroup>
						<col width="20%">
						<col width="20%">
						<col width="15%">
						<col width="15%">
						<col width="15%">
						<col width="15%">
					</colgroup>
					<tbody>
						<tr ng-repeat="data in overallTableData">
							<td class="headingCell">{{data.heading}}</td>
							<td class="headingCell">{{data.subHeading}}</td>
							<td>{{data.value1}}</td>
							<td>{{data.value2}}</td>
							<td>{{data.value3}}</td>
							<td>{{data.value4}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="row-fluid">
			<div class="collapseDiv">
				<div class="panel-heading">Business Impact
					<div class="pull-right xclose"></div>
				</div>
			</div>
			<div class="collapse">
				<table class="table borderless smSubsTable noMarginBtm">
					<colgroup>
						<col width="20%">
						<col width="20%">
						<col width="15%">
						<col width="15%">
						<col width="15%">
						<col width="15%">
					</colgroup>
					<tbody>
						<tr ng-repeat="data in busniessImpactTableData">
							<td class="headingCell">{{data.heading}}</td>
							<td class="headingCell">{{data.subHeading}}</td>
							<td>{{data.value1}}</td>
							<td>{{data.value2}}</td>
							<td>{{data.value3}}</td>
							<td>{{data.value4}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="row-fluid">
			<div class="collapseDiv">
				<div class="panel-heading">Customer Profile
					<div class="pull-right xclose"></div>
				</div>
			</div>
			<div class="collapse">
				<table class="table borderless smSubsTable noMarginBtm">
					<colgroup>
						<col width="20%">
						<col width="20%">
						<col width="15%">
						<col width="15%">
						<col width="15%">
						<col width="15%">
					</colgroup>
					<tbody>
						<tr ng-repeat="data in customerProfileTableData">
							<td class="headingCell">{{data.heading}}</td>
							<td class="headingCell">{{data.subHeading}}</td>
							<td>{{data.value1}}</td>
							<td>{{data.value2}}</td>
							<td>{{data.value3}}</td>
							<td>{{data.value4}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="row-fluid">
			<div class="collapseDiv">
				<div class="panel-heading">Product Usage
					<div class="pull-right xclose"></div>
				</div>
			</div>
			<div class="collapse">
				<table class="table borderless smSubsTable noMarginBtm">
					<colgroup>
						<col width="20%">
						<col width="20%">
						<col width="15%">
						<col width="15%">
						<col width="15%">
						<col width="15%">
					</colgroup>
					<tbody>
						<tr ng-repeat="data in productUsageTableData">
							<td class="headingCell">{{data.heading}}</td>
							<td class="headingCell">{{data.subHeading}}</td>
							<td>{{data.value1}}</td>
							<td>{{data.value2}}</td>
							<td>{{data.value3}}</td>
							<td>{{data.value4}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="row-fluid">
			<div class="collapseDiv">
				<div class="panel-heading">
					Retention
					<div class="pull-right xclose"></div>
				</div>
			</div>
			<div class="collapse">
				<table class="table borderless smSubsTable noMarginBtm">
					<colgroup>
						<col width="20%">
						<col width="20%">
						<col width="15%">
						<col width="15%">
						<col width="15%">
						<col width="15%">
					</colgroup>
					<tbody>
						<tr ng-repeat="data in retentionTableData">
							<td class="headingCell">{{data.heading}}</td>
							<td class="headingCell">{{data.subHeading}}</td>
							<td>{{data.value1}}</td>
							<td>{{data.value2}}</td>
							<td>{{data.value3}}</td>
							<td>{{data.value4}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	
                   
                    
                </div>
                
                  <!--Compairson section end-->
                  
                  
                  <!--trends dropdown section start-->  
                  <!--fresher start-->
                  
                <div class="tab-pane fade" id="Freshers">
                    <div style="width:100%; padding:0px; border-top:1px solid #ccc; border-radius:4px;" class="col-md-6">
                        <div class="panel">
                            <ul id="myTab3" class="nav nav-tabs nav-justified">
                                <li class="active"><a class="analysis-tab-button orange-bg" href="#overview" data-toggle="tab">Database Overview</a></li>
                                <li><a class="analysis-tab-button orange-bg" href="#profile" data-toggle="tab">Demographic profile</a></li>
                                <li><a class="analysis-tab-button orange-bg"  href="#engagement" data-toggle="tab">Engagement</a></li>
                                <li><a class="analysis-tab-button orange-bg" href="#retention" data-toggle="tab">Retention</a></li>
                                <li class="dropdown">
                                    <a class="analysis-tab-button orange-bg" href="#" id="myTabDrop1-1" class="dropdown-toggle" data-toggle="dropdown">Trends <b class="caret"></b></a>
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="myTabDrop1">
                                        <li><a href="#dropdown1-1" tabindex="-1" data-toggle="tab">@fat</a></li>
                                        <li><a href="#dropdown1-2" tabindex="-1" data-toggle="tab">@mdo</a></li>
                                    </ul>
                                </li>
                            </ul>
              <div id="myTabContent3" class="tab-content">
                  <!--overview section start-->
                <div class="tab-pane fade active in" id="overview">
                  <div class="row acquisition-panel nopadding no-border" id="overview-div" ng-controller="overviewController">
		          <div class="row nopadding">
				    <div class="panel panel-default">
					<!--<div class="panel-heading gray-panel">Database Overview</div>-->
				    </div>
			     <div class="half-width">
				    <div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
					<div class=" white-bg darkblue-border">
						<div class="">
							<div class="panel-heading darkblue-analysis-tab" style="font-weight:600;">{{overallData.totalSubs.groupName}}
							</div>
						</div>
						<div class="widget-content metric-widgets">
							<div class="row-fluid">
								<div class="actual-value dark-blue-text">
									<span>{{overallData.totalSubs.value}}</span>
								</div>
							</div>
							<div class="box-content-bottom">
								<ul>
									<li class="down">{{overallData.totalSubs.vsLastWeek}} Vs Last week</li>
									<li class="up">{{overallData.totalSubs.yoY}} YoY</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
					<div class="white-bg lightblue-border">
						<div class="">
							<div class="panel-heading lightblue-analysis-tab" style="font-weight:600;">{{overallData.newSubs.groupName}}
							</div>
						</div>
						<div class="widget-content metric-widgets">
							<div class="row-fluid">
								<div class="actual-value light-blue-text"><span>{{overallData.newSubs.value}}</span></div>
							</div>
							<div class="box-content-bottom">
								<ul>
									<li class="down">{{overallData.newSubs.vsLastWeek}} Vs Last week</li>
									<li class="up">{{overallData.newSubs.yoY}} YoY</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				</div>
			<div class="half-width">
				<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
					<div class="white-bg darkblue-border">
						<div class="">
							<div class="panel-heading darkblue-analysis-tab" style="font-weight:600;">{{overallData.recurringSubs.groupName}}
							</div>
						</div>
						<div class="widget-content metric-widgets">
							<div class="row-fluid">
								<div class="actual-value dark-blue-text"><span>{{overallData.recurringSubs.value}}</span></div>
							</div>
							<div class="box-content-bottom">
								<ul>
									<li class="down">{{overallData.recurringSubs.vsLastWeek}} Vs Last week</li>
									<li class="up">{{overallData.recurringSubs.yoY}} YoY</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
					<div class="white-bg lightblue-border">
						<div class="">
							<div class="panel-heading lightblue-analysis-tab" style="font-weight:600;">{{overallData.lifeTimeValue.groupName}}
							</div>
						</div>
						<div class="widget-content metric-widgets">
							<div class="row-fluid">
								<div class="actual-value light-blue-text"><span>{{overallData.lifeTimeValue.value}}</span></div>
							</div>
							<div class="box-content-bottom">
								<ul>
									<li class="down">{{overallData.lifeTimeValue.vsLastWeek}} Vs Last week</li>
									<li class="up">{{overallData.lifeTimeValue.yoY}} YoY</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				</div>
		</div>
		<div class="row nopadding">
			<div class="col-sm-3 col-md-3 col-lg-3 clearfix">
					<div class="donut-score" style="height:100px;">
						<div id="overallSubscribers" class="donut-score-value">
							</div>
						<p>Subscribers as a %age of all users</p>
					</div>
					<div class="donut-score" style="height:100px;">
						<div id="activeSubscribers" class="donut-score-value">
							</div>
						<p>Active Subscribers</p>
					</div>
					<div class="donut-score" style="height:100px;">
						<div id="dormantSubscribers" class="donut-score-value">
							</div>
						<p>Dormant Subscribers</p>
					</div>
			</div>
			<div class="col-sm-9 col-md-9 col-lg-9">
				<div class=" white-bg revenue-box">
					<div class="acqChart" id="revenueTrendChart"></div>
				</div>
			</div>
		</div>
	</div>
                     <!--overview section end-->
                    <!-- profile section start-->
                </div>
                <div class="tab-pane fade" id="profile">
                 <div class="row acquisition-panel nopadding no-border" id="profile-div" ng-controller="profileController">
		<div class="row nopadding">
				<div class="panel panel-default">
					<!--<div class="panel-heading">Demographic profile</div>-->
				</div>

			<div class="panel-heading"><span>User Profile</span></div>
			<div class="half-width no-bg">
				<div class=" profile-tab col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="genderPieChart"></div>
				</div>
				<div class=" profile-tab col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="agePieChart"></div>
				</div>
			</div>

			<div class="half-width no-bg">
				<div class=" profile-tab col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="locationPieChart"></div>
				</div>
				<div class=" profile-tab col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="signupPieChart"></div>
				</div>
			</div>
		</div>
		<div class="row nopadding">
		<div class="panel-heading"><span>Product Profile</span></div>
			<div class="half-width half-left-div-border">
				<div class="col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="accessDonutChart"></div>
				</div>
				<div class="col-sm-6 col-md-6 col-lg-6 square-full-box">
				<h2 class="titleLikeChart">Product Plan</h2>
				<h3 class="subtitle">% of all subscribers</h3>
					<div>
						<div class="row-fluid square-box">
							<div class="col-sm-6 col-md-6 col-lg-6" style="height:100%;background:#FFF2CD;"><h3>Basic</h3><span>35%</span></div>
							<div class="col-sm-6 col-md-6 col-lg-6" style="height:100%;background:#FEE895;"><h3>Professional</h3><span>25%</span></div>
						</div>
						<div class="square-box">
							<div class="col-sm-6 col-md-6 col-lg-6" style="height:100%;background:#FFDA65;"><h3>Professional Plus</h3><span>12%</span></div>
							<div class="col-sm-6 col-md-6 col-lg-6" style="height:100%;background:#BE9100;"><h3>Enterprise</h3><span>28%</span></div>
						</div>
					</div>
				</div>
			</div>

			<div class="half-width half-right-div-border">
				<div class="col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="loginBarChart"></div>
				</div>
				<div class="col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="platformDonutChart"></div>
				</div>
			</div>
		</div>
	</div>
                   
                </div> <!-- profile section end-->
                  
                   <!-- engagement section start -->
                  
                <div class="tab-pane fade" id="engagement">
                    <div class="row acquisition-panel nopadding no-border" id="engagement-div" ng-controller="engagmentController">
		<div class="panel panel-default">
			<!--<div class="panel-heading">Engagement</div>-->
		</div>
		<div class="panel-heading brdr-btm-blue"><span>Active Vs Dormant</span></div>
		<div class=" engagement-tab row nopadding">
			<div class="col-sm-3 col-md-3 col-lg-3">
				<div class="acqChart" id="subsDonutChart"></div>
			</div>
			<div class="col-sm-9 col-md-9 col-lg-9">
					<div class="acqChart" id="subsAreaChart"></div>
			</div>
		</div>
		<div class="row nopadding bkgd-lightbrown">
			<div class="panel-heading brdr-btm-blue"><span>Product Usage</span></div>
			<div class="row-fluid">
				<div class="half-white-box margin-right col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="trendActBarChart"></div>
				</div>
				<div class="half-white-box margin-left col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="trendSecBarChart"></div>
				</div>
			</div>
		</div>
		<div class="row nopadding bkgd-lightbrown" style="margin-top:10px !important;">
			<div class="panel-heading brdr-btm-blue"><span>Login Trends</span></div>
			<div class="row-fluid white-box-border">
				<div class="col-sm-3 col-md-3 col-lg-3">
					<div class="acqChart" id="loginBarChart1"></div>
				</div>
				<div class="col-sm-9 col-md-9 col-lg-9">
					<div class="acqChart" id="loginDurationColChart"></div>
				</div>
			</div>
		</div>
		<div class="row nopadding bkgd-lightbrown" style="margin-top:10px !important;">
			<div class="panel-heading brdr-btm-blue"><span>Adoption Trend</span></div>
			<div style="margin-left:13px;">How many users have completed the set out activities</div>
			<div class="row-fluid analysis-table">      
			  <table class="table borderless clSubsTable">
			    <thead>
			      <tr class="table-gray-heading">
			        <th></th>
			        <th class="white-text">Onboarding</th>
			        <th class="white-text">Basic</th>
			        <th class="white-text">Advanced</th>
			      </tr>
			    </thead>
			    <tbody>
			      <tr class="table-bottom-border">
			        <td><h3>Stage completion rate</h3><p>%age of users of overall who have completed the stage</p></td>
			        <td><div class="box">{{adoptionTrendData.onBoarding.completionRate}}</div></td>
			        <td><div class="box">{{adoptionTrendData.basic.completionRate}}</div></td>
			        <td><div class="box">{{adoptionTrendData.advanced.completionRate}}</div></td>
			      </tr>
			      <tr class="table-bottom-border">
			        <td><h3>No. of Subscribers in the Stage</h3><p>%age of users of overall who have completed the stage</p></td>
			        <td><div class="highlightValue">{{adoptionTrendData.onBoarding.noOfSubscribers}}</div></td>
			        <td><div class="highlightValue">{{adoptionTrendData.basic.noOfSubscribers}}</div></td>
			        <td><div class="highlightValue">{{adoptionTrendData.advanced.noOfSubscribers}}</div></td>
			      </tr>
			      <tr>
			        <td><h3>Trends</h3><p>%age of users of overall who have completed the stage</p></td>
			        <td class="metric-widgets">
							<div class="box-content-bottom">
								<ul>
									<li class="up">{{adoptionTrendData.onBoarding.vsLastWeek}} Vs Last week</li>
									<li class="down">{{adoptionTrendData.onBoarding.yoY}} YoY</li>
								</ul>
							</div>
					</td>
			        <td class="metric-widgets">
							<div class="box-content-bottom">
								<ul>
									<li class="up">{{adoptionTrendData.basic.vsLastWeek}} Vs Last week</li>
									<li class="down">{{adoptionTrendData.basic.yoY}} YoY</li>
								</ul>
                                </div>
					</td>
			        <td class="metric-widgets">
							<div class="box-content-bottom">
								<ul>
									<li class="up">{{adoptionTrendData.advanced.vsLastWeek}} Vs Last week</li>
									<li class="down">{{adoptionTrendData.advanced.yoY}} YoY</li>
								</ul>
							</div>
					</td>
			      </tr>
			    </tbody>
			  </table>
			</div>
		</div>
	</div>                    
                </div>
                  
                  <!-- engagement section end-->
                  
                   <!-- retention section start-->
                <div class="tab-pane fade" id="retention">
                    <div class="row acquisition-panel nopadding no-border" id="retention-div" ng-controller="retentionController">
				<div class="panel panel-default">
					<!--<div class="panel-heading">Retention Summary</div>-->
				</div>
				<div class="row nopadding">
			<div class="half-width">
				<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
					<div class="churn-box">
						<div><h2 class="white-text big-fontSize" style="padding-top:30px;">Churn Rate</h2></div>
						<div><h2 class="white-text big-fontSize">36%</h2></div>
						<div><span ng-hide="true">.</span></div>
					</div>
				</div>
				<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
					<div class=" lightblue-border" >
                        <div class="panel-heading lightblue-analysis-tab ng-binding" style="font-weight:600;">Low Risk</div>
						<div><h2 class="titleLikeChart big-fontSize">36%</h2></div>
						<div><span>% of total subscribers</span></div>
						<div><h2 class="titleLikeChart big-fontSize">1,291,234</h2></div>
						<div><span>Subscribers</span></div>
					</div>
				</div>
				</div>
			<div class="half-width">
				<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
					<div class=" darkblue-border" >
                        <div class="panel-heading darkblue-analysis-tab ng-binding" style="font-weight:600;">Medium Risk</div>
						<div><h2 class="titleLikeChart big-fontSize">36%</h2></div>
						<div><span>% of total subscribers</span></div>
						<div><h2 class="titleLikeChart big-fontSize">1,291,234</h2></div>
						<div><span>Subscribers</span></div>
					</div>
				</div>
				<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
					<div class=" lightblue-border" >
                        <div class="panel-heading lightblue-analysis-tab ng-binding" style="font-weight:600;">High Risk</div>
						<div><h2 class="titleLikeChart big-fontSize">36%</h2></div>
						<div><span>% of total subscribers</span></div>
						<div><h2 class="titleLikeChart big-fontSize">1,291,234</h2></div>
						<div><span>Subscribers</span></div>
					</div>
				</div>
				</div>
		</div>
			<div class="row nopadding" style="margin-top:10px !important">
				<div class="col-sm-3 col-md-3 col-lg-3">
					<div class="retention-widgets light-green-bg">
						<div><h2 class="titleLikeChart">Dormant</h2></div>
						<div><h2 class="titleLikeChart">64%</h2></div>
					</div>
					<div class="retention-widgets topMargin  light-green-bg">
						<div><h2 class="titleLikeChart">Active</h2></div>
						<div><h2 class="titleLikeChart">36%</h2></div>
					</div>
					<div class="retention-widgets topMargin  light-green-bg">
						<div><h2 class="titleLikeChart ">Avg Lifetime</h2></div>
						<div><h2 class="titleLikeChart">13 months</h2></div>
					</div>
					
				</div>
				<div class="col-sm-9 col-md-9 col-lg-9">
					<div class="acqChart white-bg" id="cancelColChartRet"></div>
				</div>
			</div>
		<div class="row nopadding">
			<div class="panel-heading"><span>User Profile</span></div>
			<div class="half-width bkgd-lightbrown">
				<div class=" profile-tab col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="genderPieChartRet"></div>
				</div>
				<div class=" profile-tab col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="agePieChartRet"></div>
				</div>
			</div>

			<div class="half-width bkgd-lightbrown">
				<div class=" profile-tab col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="locationPieChartRet"></div>
				</div>
				<div class=" profile-tab col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="signupPieChartRet"></div>
				</div>
			</div>
		</div>
		<div class="row nopadding">
		<div class="panel-heading"><span>Product Profile</span></div>
			<div class="half-width half-left-div-border">
				<div class="col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="accessDonutChartRet"></div>
				</div>
				<div class="col-sm-6 col-md-6 col-lg-6 square-full-box">
				<h2 class="titleLikeChart">Product Plan</h2>
				<h3 class="subtitle">% of all subscribers</h3>
					<div>
						<div class="row-fluid square-box">
							<div class="col-sm-6 col-md-6 col-lg-6" style="height:100%;background:#FFF2CD;"><h3>Basic</h3><span>35%</span></div>
							<div class="col-sm-6 col-md-6 col-lg-6" style="height:100%;background:#FEE895;"><h3>Professional</h3><span>25%</span></div>
						</div>
						<div class="square-box">
							<div class="col-sm-6 col-md-6 col-lg-6" style="height:100%;background:#FFDA65;"><h3>Professional Plus</h3><span>12%</span></div>
							<div class="col-sm-6 col-md-6 col-lg-6" style="height:100%;background:#BE9100;"><h3>Enterprise</h3><span>28%</span></div>
						</div>
					</div>
				</div>
			</div>

			<div class="half-width half-right-div-border">
				<div class="col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="loginBarChartRet"></div>
				</div>
				<div class="col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="platformDonutChartRet"></div>
				</div>
			</div>
		</div>
		<div class="row nopadding" style="margin-top:10px !important;">
			<div class="panel-heading"><span>Activity</span></div>
			<div class="row-fluid">
				<div class="half-white-box margin-right col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="trendActBarChartRet"></div>
				</div>
				<div class="half-white-box margin-left col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="trendSecBarChartRet"></div>
				</div>
			</div>
		</div>
		
		<div class="row nopadding " style="margin-top:10px !important;">
			<div class="row-fluid">
				<div class="half-white-box margin-right col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="activeColChartRet"></div>
				</div>
				<div class="half-white-box margin-left col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="inactiveColChartRet"></div>
				</div>
			</div>
		</div>
	</div>
                    
                </div>
                   <!-- retention section end-->
                  
                <div class="tab-pane fade" id="dropdown1-1">
                 <div class="row acquisition-panel nopadding" id="trends-div">
				<div class="panel panel-default">
					<div class="panel-heading">Trends</div>
				</div>
		<div class="row-fluid" style="height: 200px;">
		</div>
	</div>
                </div>
                <div class="tab-pane fade" id="dropdown1-2">
                  <p>Demo</p>
                </div>
              </div>
            </div>
          </div>
                 
                </div>
                <!--fresher end-->
                 
                
                <div class="tab-pane fade" id="Finance-Execs">
                <div style="width:100%; padding:0px; border-top:1px solid #ccc; border-radius:4px;" class="col-md-6">
                        <div class="panel">
                            <ul id="myTab4" class="nav nav-tabs nav-justified">
                                <li class="active"><a class="analysis-tab-button-2" href="#overview" data-toggle="tab">Database Overview</a></li>
                                <li><a style="color:#333;" class="analysis-tab-button-2" href="#profile" data-toggle="tab">Demographic profile</a></li>
                                <li><a style="color:#333;" class="analysis-tab-button-2"  href="#engagement" data-toggle="tab">Engagement</a></li>
                                <li><a style="color:#333;" class="analysis-tab-button-2" href="#retention" data-toggle="tab">Retention</a></li>
                                <li class="dropdown">
                                    <a style="color:#333;" class="analysis-tab-button-2" href="#" id="myTabDrop1-1" class="dropdown-toggle" data-toggle="dropdown">Trends <b class="caret"></b></a>
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="myTabDrop1">
                                        <li><a href="#dropdown1-1" tabindex="-1" data-toggle="tab">@fat</a></li>
                                        <li><a href="#dropdown1-2" tabindex="-1" data-toggle="tab">@mdo</a></li>
                                    </ul>
                                </li>
                            </ul>
              <div id="myTabContent4" class="tab-content">
                  <!--overview section start-->
                <div class="tab-pane fade active in" id="overview">
                  <div class="row acquisition-panel nopadding no-border" id="overview-div" ng-controller="overviewController">
		          <div class="row nopadding">
				    <div class="panel panel-default">
					<!--<div class="panel-heading gray-panel">Database Overview</div>-->
				    </div>
			     <div class="half-width">
				    <div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
					<div class=" white-bg darkblue-border">
						<div class="">
							<div class="panel-heading darkblue-analysis-tab" style="font-weight:600;">{{overallData.totalSubs.groupName}}
							</div>
						</div>
						<div class="widget-content metric-widgets">
							<div class="row-fluid">
								<div class="actual-value dark-blue-text">
									<span>{{overallData.totalSubs.value}}</span>
								</div>
							</div>
							<div class="box-content-bottom">
								<ul>
									<li class="down">{{overallData.totalSubs.vsLastWeek}} Vs Last week</li>
									<li class="up">{{overallData.totalSubs.yoY}} YoY</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
					<div class="white-bg lightblue-border">
						<div class="">
							<div class="panel-heading lightblue-analysis-tab" style="font-weight:600;">{{overallData.newSubs.groupName}}
							</div>
						</div>
						<div class="widget-content metric-widgets">
							<div class="row-fluid">
								<div class="actual-value light-blue-text"><span>{{overallData.newSubs.value}}</span></div>
							</div>
							<div class="box-content-bottom">
								<ul>
									<li class="down">{{overallData.newSubs.vsLastWeek}} Vs Last week</li>
									<li class="up">{{overallData.newSubs.yoY}} YoY</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				</div>
			<div class="half-width">
				<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
					<div class="white-bg darkblue-border">
						<div class="">
							<div class="panel-heading darkblue-analysis-tab" style="font-weight:600;">{{overallData.recurringSubs.groupName}}
							</div>
						</div>
						<div class="widget-content metric-widgets">
							<div class="row-fluid">
								<div class="actual-value dark-blue-text"><span>{{overallData.recurringSubs.value}}</span></div>
							</div>
							<div class="box-content-bottom">
								<ul>
									<li class="down">{{overallData.recurringSubs.vsLastWeek}} Vs Last week</li>
									<li class="up">{{overallData.recurringSubs.yoY}} YoY</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
					<div class="white-bg lightblue-border">
						<div class="">
							<div class="panel-heading lightblue-analysis-tab" style="font-weight:600;">{{overallData.lifeTimeValue.groupName}}
							</div>
						</div>
						<div class="widget-content metric-widgets">
							<div class="row-fluid">
								<div class="actual-value light-blue-text"><span>{{overallData.lifeTimeValue.value}}</span></div>
							</div>
							<div class="box-content-bottom">
								<ul>
									<li class="down">{{overallData.lifeTimeValue.vsLastWeek}} Vs Last week</li>
									<li class="up">{{overallData.lifeTimeValue.yoY}} YoY</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				</div>
		</div>
		<div class="row nopadding">
			<div class="col-sm-3 col-md-3 col-lg-3 clearfix">
					<div class="donut-score" style="height:100px;">
						<div id="overallSubscribers" class="donut-score-value">
							</div>
						<p>Subscribers as a %age of all users</p>
					</div>
					<div class="donut-score" style="height:100px;">
						<div id="activeSubscribers" class="donut-score-value">
							</div>
						<p>Active Subscribers</p>
					</div>
					<div class="donut-score" style="height:100px;">
						<div id="dormantSubscribers" class="donut-score-value">
							</div>
						<p>Dormant Subscribers</p>
					</div>
			</div>
			<div class="col-sm-9 col-md-9 col-lg-9">
				<div class=" white-bg revenue-box">
					<div class="acqChart" id="revenueTrendChart"></div>
				</div>
			</div>
		</div>
	</div>
                     <!--overview section end-->
                    <!-- profile section start-->
                </div>
                <div class="tab-pane fade" id="profile">
                 <div class="row acquisition-panel nopadding no-border" id="profile-div" ng-controller="profileController">
		<div class="row nopadding">
				<div class="panel panel-default">
					<!--<div class="panel-heading">Demographic profile</div>-->
				</div>

			<div class="panel-heading"><span>User Profile</span></div>
			<div class="half-width no-bg">
				<div class=" profile-tab col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="genderPieChart"></div>
				</div>
				<div class=" profile-tab col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="agePieChart"></div>
				</div>
			</div>

			<div class="half-width no-bg">
				<div class=" profile-tab col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="locationPieChart"></div>
				</div>
				<div class=" profile-tab col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="signupPieChart"></div>
				</div>
			</div>
		</div>
		<div class="row nopadding">
		<div class="panel-heading"><span>Product Profile</span></div>
			<div class="half-width half-left-div-border">
				<div class="col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="accessDonutChart"></div>
				</div>
				<div class="col-sm-6 col-md-6 col-lg-6 square-full-box">
				<h2 class="titleLikeChart">Product Plan</h2>
				<h3 class="subtitle">% of all subscribers</h3>
					<div>
						<div class="row-fluid square-box">
							<div class="col-sm-6 col-md-6 col-lg-6" style="height:100%;background:#FFF2CD;"><h3>Basic</h3><span>35%</span></div>
							<div class="col-sm-6 col-md-6 col-lg-6" style="height:100%;background:#FEE895;"><h3>Professional</h3><span>25%</span></div>
						</div>
						<div class="square-box">
							<div class="col-sm-6 col-md-6 col-lg-6" style="height:100%;background:#FFDA65;"><h3>Professional Plus</h3><span>12%</span></div>
							<div class="col-sm-6 col-md-6 col-lg-6" style="height:100%;background:#BE9100;"><h3>Enterprise</h3><span>28%</span></div>
						</div>
					</div>
				</div>
			</div>

			<div class="half-width half-right-div-border">
				<div class="col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="loginBarChart"></div>
				</div>
				<div class="col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="platformDonutChart"></div>
				</div>
			</div>
		</div>
	</div>
                   
                </div> <!-- profile section end-->
                  
                   <!-- engagement section start -->
                  
                <div class="tab-pane fade" id="engagement">
                    <div class="row acquisition-panel nopadding no-border" id="engagement-div" ng-controller="engagmentController">
		<div class="panel panel-default">
			<!--<div class="panel-heading">Engagement</div>-->
		</div>
		<div class="panel-heading brdr-btm-blue"><span>Active Vs Dormant</span></div>
		<div class=" engagement-tab row nopadding">
			<div class="col-sm-3 col-md-3 col-lg-3">
				<div class="acqChart" id="subsDonutChart"></div>
			</div>
			<div class="col-sm-9 col-md-9 col-lg-9">
					<div class="acqChart" id="subsAreaChart"></div>
			</div>
		</div>
		<div class="row nopadding bkgd-lightbrown">
			<div class="panel-heading brdr-btm-blue"><span>Product Usage</span></div>
			<div class="row-fluid">
				<div class="half-white-box margin-right col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="trendActBarChart"></div>
				</div>
				<div class="half-white-box margin-left col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="trendSecBarChart"></div>
				</div>
			</div>
		</div>
		<div class="row nopadding bkgd-lightbrown" style="margin-top:10px !important;">
			<div class="panel-heading brdr-btm-blue"><span>Login Trends</span></div>
			<div class="row-fluid white-box-border">
				<div class="col-sm-3 col-md-3 col-lg-3">
					<div class="acqChart" id="loginBarChart1"></div>
				</div>
				<div class="col-sm-9 col-md-9 col-lg-9">
					<div class="acqChart" id="loginDurationColChart"></div>
				</div>
			</div>
		</div>
		<div class="row nopadding bkgd-lightbrown" style="margin-top:10px !important;">
			<div class="panel-heading brdr-btm-blue"><span>Adoption Trend</span></div>
			<div style="margin-left:13px;">How many users have completed the set out activities</div>
			<div class="row-fluid analysis-table">      
			  <table class="table borderless clSubsTable">
			    <thead>
			      <tr class="table-gray-heading">
			        <th></th>
			        <th class="white-text">Onboarding</th>
			        <th class="white-text">Basic</th>
			        <th class="white-text">Advanced</th>
			      </tr>
			    </thead>
			    <tbody>
			      <tr class="table-bottom-border">
			        <td><h3>Stage completion rate</h3><p>%age of users of overall who have completed the stage</p></td>
			        <td><div class="box">{{adoptionTrendData.onBoarding.completionRate}}</div></td>
			        <td><div class="box">{{adoptionTrendData.basic.completionRate}}</div></td>
			        <td><div class="box">{{adoptionTrendData.advanced.completionRate}}</div></td>
			      </tr>
			      <tr class="table-bottom-border">
			        <td><h3>No. of Subscribers in the Stage</h3><p>%age of users of overall who have completed the stage</p></td>
			        <td><div class="highlightValue">{{adoptionTrendData.onBoarding.noOfSubscribers}}</div></td>
			        <td><div class="highlightValue">{{adoptionTrendData.basic.noOfSubscribers}}</div></td>
			        <td><div class="highlightValue">{{adoptionTrendData.advanced.noOfSubscribers}}</div></td>
			      </tr>
			      <tr>
			        <td><h3>Trends</h3><p>%age of users of overall who have completed the stage</p></td>
			        <td class="metric-widgets">
							<div class="box-content-bottom">
								<ul>
									<li class="up">{{adoptionTrendData.onBoarding.vsLastWeek}} Vs Last week</li>
									<li class="down">{{adoptionTrendData.onBoarding.yoY}} YoY</li>
								</ul>
							</div>
					</td>
			        <td class="metric-widgets">
							<div class="box-content-bottom">
								<ul>
									<li class="up">{{adoptionTrendData.basic.vsLastWeek}} Vs Last week</li>
									<li class="down">{{adoptionTrendData.basic.yoY}} YoY</li>
								</ul>
                                </div>
					</td>
			        <td class="metric-widgets">
							<div class="box-content-bottom">
								<ul>
									<li class="up">{{adoptionTrendData.advanced.vsLastWeek}} Vs Last week</li>
									<li class="down">{{adoptionTrendData.advanced.yoY}} YoY</li>
								</ul>
							</div>
					</td>
			      </tr>
			    </tbody>
			  </table>
			</div>
		</div>
	</div>                    
                </div>
                  
                  <!-- engagement section end-->
                  
                   <!-- retention section start-->
                <div class="tab-pane fade" id="retention">
                    <div class="row acquisition-panel nopadding no-border" id="retention-div" ng-controller="retentionController">
				<div class="panel panel-default">
					<!--<div class="panel-heading">Retention Summary</div>-->
				</div>
				<div class="row nopadding">
			<div class="half-width">
				<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
					<div class="churn-box">
						<div><h2 class="white-text big-fontSize" style="padding-top:30px;">Churn Rate</h2></div>
						<div><h2 class="white-text big-fontSize">36%</h2></div>
						<div><span ng-hide="true">.</span></div>
					</div>
				</div>
				<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
					<div class=" lightblue-border" >
                        <div class="panel-heading lightblue-analysis-tab ng-binding" style="font-weight:600;">Low Risk</div>
						<div><h2 class="titleLikeChart big-fontSize">36%</h2></div>
						<div><span>% of total subscribers</span></div>
						<div><h2 class="titleLikeChart big-fontSize">1,291,234</h2></div>
						<div><span>Subscribers</span></div>
					</div>
				</div>
				</div>
			<div class="half-width">
				<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
					<div class=" darkblue-border" >
                        <div class="panel-heading darkblue-analysis-tab ng-binding" style="font-weight:600;">Medium Risk</div>
						<div><h2 class="titleLikeChart big-fontSize">36%</h2></div>
						<div><span>% of total subscribers</span></div>
						<div><h2 class="titleLikeChart big-fontSize">1,291,234</h2></div>
						<div><span>Subscribers</span></div>
					</div>
				</div>
				<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
					<div class=" lightblue-border" >
                        <div class="panel-heading lightblue-analysis-tab ng-binding" style="font-weight:600;">High Risk</div>
						<div><h2 class="titleLikeChart big-fontSize">36%</h2></div>
						<div><span>% of total subscribers</span></div>
						<div><h2 class="titleLikeChart big-fontSize">1,291,234</h2></div>
						<div><span>Subscribers</span></div>
					</div>
				</div>
				</div>
		</div>
			<div class="row nopadding" style="margin-top:10px !important">
				<div class="col-sm-3 col-md-3 col-lg-3">
					<div class="retention-widgets light-green-bg">
						<div><h2 class="titleLikeChart">Dormant</h2></div>
						<div><h2 class="titleLikeChart">64%</h2></div>
					</div>
					<div class="retention-widgets topMargin  light-green-bg">
						<div><h2 class="titleLikeChart">Active</h2></div>
						<div><h2 class="titleLikeChart">36%</h2></div>
					</div>
					<div class="retention-widgets topMargin  light-green-bg">
						<div><h2 class="titleLikeChart ">Avg Lifetime</h2></div>
						<div><h2 class="titleLikeChart">13 months</h2></div>
					</div>
					
				</div>
				<div class="col-sm-9 col-md-9 col-lg-9">
					<div class="acqChart white-bg" id="cancelColChartRet"></div>
				</div>
			</div>
		<div class="row nopadding">
			<div class="panel-heading"><span>User Profile</span></div>
			<div class="half-width bkgd-lightbrown">
				<div class=" profile-tab col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="genderPieChartRet"></div>
				</div>
				<div class=" profile-tab col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="agePieChartRet"></div>
				</div>
			</div>

			<div class="half-width bkgd-lightbrown">
				<div class=" profile-tab col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="locationPieChartRet"></div>
				</div>
				<div class=" profile-tab col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="signupPieChartRet"></div>
				</div>
			</div>
		</div>
		<div class="row nopadding">
		<div class="panel-heading"><span>Product Profile</span></div>
			<div class="half-width half-left-div-border">
				<div class="col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="accessDonutChartRet"></div>
				</div>
				<div class="col-sm-6 col-md-6 col-lg-6 square-full-box">
				<h2 class="titleLikeChart">Product Plan</h2>
				<h3 class="subtitle">% of all subscribers</h3>
					<div>
						<div class="row-fluid square-box">
							<div class="col-sm-6 col-md-6 col-lg-6" style="height:100%;background:#FFF2CD;"><h3>Basic</h3><span>35%</span></div>
							<div class="col-sm-6 col-md-6 col-lg-6" style="height:100%;background:#FEE895;"><h3>Professional</h3><span>25%</span></div>
						</div>
						<div class="square-box">
							<div class="col-sm-6 col-md-6 col-lg-6" style="height:100%;background:#FFDA65;"><h3>Professional Plus</h3><span>12%</span></div>
							<div class="col-sm-6 col-md-6 col-lg-6" style="height:100%;background:#BE9100;"><h3>Enterprise</h3><span>28%</span></div>
						</div>
					</div>
				</div>
			</div>

			<div class="half-width half-right-div-border">
				<div class="col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="loginBarChartRet"></div>
				</div>
				<div class="col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="platformDonutChartRet"></div>
				</div>
			</div>
		</div>
		<div class="row nopadding" style="margin-top:10px !important;">
			<div class="panel-heading"><span>Activity</span></div>
			<div class="row-fluid">
				<div class="half-white-box margin-right col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="trendActBarChartRet"></div>
				</div>
				<div class="half-white-box margin-left col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="trendSecBarChartRet"></div>
				</div>
			</div>
		</div>
		
		<div class="row nopadding " style="margin-top:10px !important;">
			<div class="row-fluid">
				<div class="half-white-box margin-right col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="activeColChartRet"></div>
				</div>
				<div class="half-white-box margin-left col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="inactiveColChartRet"></div>
				</div>
			</div>
		</div>
	</div>
                    
                </div>
                   <!-- retention section end-->
                  
                <div class="tab-pane fade" id="dropdown1-1">
                 <div class="row acquisition-panel nopadding" id="trends-div">
				<div class="panel panel-default">
					<div class="panel-heading">Trends</div>
				</div>
		<div class="row-fluid" style="height: 200px;">
		</div>
	</div>
                </div>
                <div class="tab-pane fade" id="dropdown1-2">
                  <p>Demo</p>
                </div>
              </div>
            </div>
          </div>   
        </div>     
                 <!--trends dropdown section end-->  
                <!-- profile section start-->
                <div class="tab-pane fade" id="Senior-Mngt">
               <div class="row acquisition-panel nopadding" id="trends-div">
		<div ng-controller="deepDiveSummaryController">
			<div class="row nopadding bkgd-mediumbrown">
				<div class="panel panel-default">
					<div class="panel-heading">Deep Dive</div>
				</div>
				<div class="row nopadding">
					<div class="btn-group">
						<button type="button" class="btn btn-style">Freshers</button>
						<button type="button" class="btn btn-style">Finance Execs</button>
						<button type="button" class="btn btn-style">Senior Mngt</button>
						<button type="button" class="btn btn-style">Recruiters</button>
					</div>
				</div>
				<div class="row nopadding" style="margin-bottom: 15px !important;">
					<div class="half-width">
						<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
							<div class="">
								<div class="">
									<div class="panel-heading" style="font-weight: 600;">Freshers
									</div>
								</div>
								<div class="widget-content metric-widgets" ng-hide="true">
									<div class="row-fluid">
										<div class="actual-value">
											<span>{{overallData.totalSubs.value}}</span>
										</div>
									</div>
									<div class="box-content-bottom">
										<ul>
											<li class="down">{{overallData.totalSubs.vsLastWeek}} Vs
												Last week</li>
											<li class="up">{{overallData.totalSubs.yoY}} YoY</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
							<div class="brdr-white brdr-left bkgd-lightbrown">
								<div class="">
									<div class="panel-heading" style="font-weight: 600;">{{overallData.newSubs.groupName}}
									</div>
								</div>
								<div class="widget-content metric-widgets">
									<div class="row-fluid">
										<div class="actual-value">
											<span>{{overallData.newSubs.value}}</span>
										</div>
									</div>
									<div class="box-content-bottom">
										<ul>
											<li class="down">{{overallData.newSubs.vsLastWeek}} Vs
												Last week</li>
											<li class="up">{{overallData.newSubs.yoY}} YoY</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="half-width">
						<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
							<div class="brdr-white brdr-left bkgd-lightbrown">
								<div class="">
									<div class="panel-heading" style="font-weight: 600;">{{overallData.recurringSubs.groupName}}
									</div>
								</div>
								<div class="widget-content metric-widgets">
									<div class="row-fluid">
										<div class="actual-value">
											<span>{{overallData.recurringSubs.value}}</span>
										</div>
									</div>
									<div class="box-content-bottom">
										<ul>
											<li class="down">{{overallData.recurringSubs.vsLastWeek}}
												Vs Last week</li>
											<li class="up">{{overallData.recurringSubs.yoY}} YoY</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
							<div class="brdr-white brdr-left bkgd-lightbrown">
								<div class="">
									<div class="panel-heading" style="font-weight: 600;">{{overallData.lifeTimeValue.groupName}}
									</div>
								</div>
								<div class="widget-content metric-widgets">
									<div class="row-fluid">
										<div class="actual-value">
											<span>{{overallData.lifeTimeValue.value}}</span>
										</div>
									</div>
									<div class="box-content-bottom">
										<ul>
											<li class="down">{{overallData.lifeTimeValue.vsLastWeek}}
												Vs Last week</li>
											<li class="up">{{overallData.lifeTimeValue.yoY}} YoY</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row nopadding topMargin">
				<div class="col-sm-3 col-md-3 col-lg-3 clearfix">
					<div class="donut-score" style="height: 100px;">
						<div id="overallSubscribers" class="donut-score-value"></div>
						<p>Subscribers as a %age of all users</p>
					</div>
					<div class="donut-score" style="height: 100px;">
						<div id="activeSubscribers" class="donut-score-value"></div>
						<p>Active Subscribers</p>
					</div>
					<div class="donut-score" style="height: 100px;">
						<div id="dormantSubscribers" class="donut-score-value"></div>
						<p>Dormant Subscribers</p>
					</div>
				</div>
				<div class="col-sm-9 col-md-9 col-lg-9">
					<div class="brdr-left"
						style="background: #f5f5f5; height: 300px; margin-bottom: 20px">
						<div class="acqChart" id="revenueTrendChart"></div>
					</div>
				</div>
			</div>
		</div>

		<div ng-controller="deepDiveProfileController">
			<div class="row nopadding">
				<div class="panel-heading">
					<span>User Profile</span>
				</div>
				<div class="half-width">
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="genderPieChart"></div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="agePieChart"></div>
					</div>
				</div>

				<div class="half-width">
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="locationPieChart"></div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="signupPieChart"></div>
					</div>
				</div>
			</div>

			<div class="row nopadding">
				<div class="panel-heading">
					<span>Product Profile</span>
				</div>
				<div class="half-width">
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="accessDonutChart"></div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6 square-full-box">
						<h2 class="titleLikeChart">Product Plan</h2>
						<h3 class="subtitle">% of all subscribers</h3>
						<div>
							<div class="row-fluid square-box">
								<div class="col-sm-6 col-md-6 col-lg-6"
									style="height: 100%; background: #FFF2CD;">
									<h3>Basic</h3>
									<span>35%</span>
								</div>
								<div class="col-sm-6 col-md-6 col-lg-6"
									style="height: 100%; background: #FEE895;">
									<h3>Professional</h3>
									<span>25%</span>
								</div>
							</div>
							<div class="square-box">
								<div class="col-sm-6 col-md-6 col-lg-6"
									style="height: 100%; background: #FFDA65;">
									<h3>Professional Plus</h3>
									<span>12%</span>
								</div>
								<div class="col-sm-6 col-md-6 col-lg-6"
									style="height: 100%; background: #BE9100;">
									<h3>Enterprise</h3>
									<span>28%</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="half-width">
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="loginBarChart"></div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="platformDonutChart"></div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="row acquisition-panel nopadding" id="engagement-div" ng-controller="deepDiveEngagmentController">
		<div class="panel panel-default">
			<div class="panel-heading">Engagement</div>
		</div>
		<div class="panel-heading brdr-btm-blue"><span>Active Vs Dormant</span></div>
		<div class="row nopadding">
			<div class="col-sm-3 col-md-3 col-lg-3">
				<div class="acqChart" id="subsDonutChart"></div>
			</div>
			<div class="col-sm-9 col-md-9 col-lg-9">
					<div class="acqChart" id="subsAreaChart"></div>
			</div>
		</div>
		<div class="row nopadding bkgd-lightbrown">
			<div class="titleLikeChart" style="margin-left:13px;">Product Usage</div>
			<div class="row-fluid">
				<div class="col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="trendActBarChart"></div>
				</div>
				<div class="col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="trendSecBarChart"></div>
				</div>
			</div>
		</div>
		<div class="row nopadding bkgd-lightbrown" style="margin-top:10px !important;">
			<div class="titleLikeChart" style="margin-left:13px;">Login Trends</div>
			<div class="row-fluid">
				<div class="col-sm-3 col-md-3 col-lg-3">
					<div class="acqChart" id="loginBarChart1"></div>
				</div>
				<div class="col-sm-9 col-md-9 col-lg-9">
					<div class="acqChart" id="loginDurationColChart"></div>
				</div>
			</div>
		</div>
		<div class="row nopadding bkgd-lightbrown" style="margin-top:10px !important;">
			<div class="titleLikeChart" style="margin-left:13px;">Adoption Trend</div>
			<div style="margin-left:13px;">How many users have completed the set out activities</div>
			<div class="row-fluid" style="margin-left:5%;margin-right:5%;">      
			  <table class="table borderless clSubsTable">
			    <thead>
			      <tr>
			        <th></th>
			        <th>Onboarding</th>
			        <th>Basic</th>
			        <th>Advanced</th>
			      </tr>
			    </thead>
			    <tbody>
			      <tr>
			        <td><h3>Stage completion rate</h3><p>%age of users of overall who have completed the stage</p></td>
			        <td><div class="box">36%</div></td>
			        <td><div class="box">41%</div></td>
			        <td><div class="box">35%</div></td>
			      </tr>
			      <tr>
			        <td><h3>No. of Subscribers in the Stage</h3><p>%age of users of overall who have completed the stage</p></td>
			        <td><div class="highlightValue">3,126,982</div></td>
			        <td><div class="highlightValue">521,999</div></td>
			        <td><div class="highlightValue">256,982</div></td>
			      </tr>
			      <tr>
			        <td><h3>Trends</h3><p>%age of users of overall who have completed the stage</p></td>
			        <td class="metric-widgets">
							<div class="box-content-bottom">
								<ul>
									<li class="up">+10% Vs Last week</li>
									<li class="down">-5% YoY</li>
								</ul>
							</div>
					</td>
			        <td class="metric-widgets">
							<div class="box-content-bottom">
								<ul>
									<li class="up">+10% Vs Last week</li>
									<li class="down">-5% YoY</li>
								</ul>
                                </div>
					</td>
			        <td class="metric-widgets">
							<div class="box-content-bottom">
								<ul>
									<li class="up">+10% Vs Last week</li>
									<li class="down">-5% YoY</li>
								</ul>
							</div>
					</td>
			      </tr>
			    </tbody>
			  </table>
			</div>
		</div>
	</div>

		<div class="row acquisition-panel nopadding" id="retention-div"
			ng-controller="deepDiveRetentionController">
			<div class="panel panel-default">
				<div class="panel-heading">Retention Summary</div>
			</div>
			<div class="row nopadding">
				<div class="half-width">
					<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
						<div class="" style="background: #EE7E34;">
							<div>
								<h2 class="titleLikeChart big-fontSize"
									style="padding-top: 30px;">Churn Rate</h2>
							</div>
							<div>
								<h2 class="titleLikeChart big-fontSize">36%</h2>
							</div>
							<div>
								<span ng-hide="true">.</span>
							</div>
						</div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
						<div class="" style="background: #A8D18D;">
							<div>
								<h2 class="titleLikeChart big-fontSize">36%</h2>
							</div>
							<div>
								<span>% of total subscribers</span>
							</div>
							<div>
								<h2 class="titleLikeChart big-fontSize">1,291,234</h2>
							</div>
							<div>
								<span>Subscribers</span>
							</div>
						</div>
					</div>
				</div>
				<div class="half-width">
					<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
						<div class="" style="background: #FFE699;">
							<div>
								<h2 class="titleLikeChart big-fontSize">36%</h2>
							</div>
							<div>
								<span>% of total subscribers</span>
							</div>
							<div>
								<h2 class="titleLikeChart big-fontSize">1,291,234</h2>
							</div>
							<div>
								<span>Subscribers</span>
							</div>
						</div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
						<div class="" style="background: #F8CBAC;">
							<div>
								<h2 class="titleLikeChart big-fontSize">36%</h2>
							</div>
							<div>
								<span>% of total subscribers</span>
							</div>
							<div>
								<h2 class="titleLikeChart big-fontSize">1,291,234</h2>
							</div>
							<div>
								<span>Subscribers</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row nopadding" style="margin-top: 10px !important">
				<div class="col-sm-3 col-md-3 col-lg-3">
					<div class="retention-widgets  bkgd-lightbrown">
						<div>
							<h2 class="titleLikeChart">Dormant</h2>
						</div>
						<div>
							<h2 class="titleLikeChart">64%</h2>
						</div>
					</div>
					<div class="retention-widgets topMargin  bkgd-lightbrown">
						<div>
							<h2 class="titleLikeChart">Active</h2>
						</div>
						<div>
							<h2 class="titleLikeChart">36%</h2>
						</div>
					</div>
					<div class="retention-widgets topMargin  bkgd-lightbrown">
						<div>
							<h2 class="titleLikeChart ">Avg Lifetime</h2>
						</div>
						<div>
							<h2 class="titleLikeChart">13 months</h2>
						</div>
					</div>

				</div>
				<div class="col-sm-9 col-md-9 col-lg-9">
					<div class="acqChart" id="cancelColChartRet"></div>
				</div>
			</div>
			<div class="row nopadding">
				<div class="panel-heading">
					<span>User Profile</span>
				</div>
				<div class="half-width bkgd-lightbrown">
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="genderPieChartRet"></div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="agePieChartRet"></div>
					</div>
				</div>

				<div class="half-width bkgd-lightbrown">
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="locationPieChartRet"></div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="signupPieChartRet"></div>
					</div>
				</div>
			</div>
			<div class="row nopadding">
				<div class="panel-heading">
					<span>Product Profile</span>
				</div>
				<div class="half-width bkgd-lightbrown">
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="accessDonutChartRet"></div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6 square-full-box">
						<h2 class="titleLikeChart">Product Plan</h2>
						<h3 class="subtitle">% of all subscribers</h3>
						<div>
							<div class="row-fluid square-box">
								<div class="col-sm-6 col-md-6 col-lg-6"
									style="height: 100%; background: #FFF2CD;">
									<h3>Basic</h3>
									<span>35%</span>
								</div>
								<div class="col-sm-6 col-md-6 col-lg-6"
									style="height: 100%; background: #FEE895;">
									<h3>Professional</h3>
									<span>25%</span>
								</div>
							</div>
							<div class="square-box">
								<div class="col-sm-6 col-md-6 col-lg-6"
									style="height: 100%; background: #FFDA65;">
									<h3>Professional Plus</h3>
									<span>12%</span>
								</div>
								<div class="col-sm-6 col-md-6 col-lg-6"
									style="height: 100%; background: #BE9100;">
									<h3>Enterprise</h3>
									<span>28%</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="half-width bkgd-lightbrown">
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="loginBarChartRet"></div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="platformDonutChartRet"></div>
					</div>
				</div>
			</div>
			<div class="row nopadding bkgd-lightbrown"
				style="margin-top: 10px !important;">
				<div class="titleLikeChart" style="margin-left: 13px;">Activity</div>
				<div class="row-fluid">
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="trendActBarChartRet"></div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="trendSecBarChartRet"></div>
					</div>
				</div>
			</div>

			<div class="row nopadding bkgd-lightbrown"
				style="margin-top: 10px !important;">
				<div class="row-fluid">
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="activeColChartRet"></div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="inactiveColChartRet"></div>
					</div>
				</div>
			</div>
		</div>


	</div>
                   
                </div> <!-- profile section end-->
                
                 <div class="tab-pane fade" id="Trends">
                <div class="row acquisition-panel nopadding" id="trends-div">
		<div ng-controller="deepDiveSummaryController">
			<div class="row nopadding bkgd-mediumbrown">
				<div class="panel panel-default">
					<div class="panel-heading">Deep Dive</div>
				</div>
				<div class="row nopadding">
					<div class="btn-group">
						<button type="button" class="btn btn-style">Freshers</button>
						<button type="button" class="btn btn-style">Finance Execs</button>
						<button type="button" class="btn btn-style">Senior Mngt</button>
						<button type="button" class="btn btn-style">Recruiters</button>
					</div>
				</div>
				<div class="row nopadding" style="margin-bottom: 15px !important;">
					<div class="half-width">
						<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
							<div class="">
								<div class="">
									<div class="panel-heading" style="font-weight: 600;">Freshers
									</div>
								</div>
								<div class="widget-content metric-widgets" ng-hide="true">
									<div class="row-fluid">
										<div class="actual-value">
											<span>{{overallData.totalSubs.value}}</span>
										</div>
									</div>
									<div class="box-content-bottom">
										<ul>
											<li class="down">{{overallData.totalSubs.vsLastWeek}} Vs
												Last week</li>
											<li class="up">{{overallData.totalSubs.yoY}} YoY</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
							<div class="brdr-white brdr-left bkgd-lightbrown">
								<div class="">
									<div class="panel-heading" style="font-weight: 600;">{{overallData.newSubs.groupName}}
									</div>
								</div>
								<div class="widget-content metric-widgets">
									<div class="row-fluid">
										<div class="actual-value">
											<span>{{overallData.newSubs.value}}</span>
										</div>
									</div>
									<div class="box-content-bottom">
										<ul>
											<li class="down">{{overallData.newSubs.vsLastWeek}} Vs
												Last week</li>
											<li class="up">{{overallData.newSubs.yoY}} YoY</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="half-width">
						<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
							<div class="brdr-white brdr-left bkgd-lightbrown">
								<div class="">
									<div class="panel-heading" style="font-weight: 600;">{{overallData.recurringSubs.groupName}}
									</div>
								</div>
								<div class="widget-content metric-widgets">
									<div class="row-fluid">
										<div class="actual-value">
											<span>{{overallData.recurringSubs.value}}</span>
										</div>
									</div>
									<div class="box-content-bottom">
										<ul>
											<li class="down">{{overallData.recurringSubs.vsLastWeek}}
												Vs Last week</li>
											<li class="up">{{overallData.recurringSubs.yoY}} YoY</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
							<div class="brdr-white brdr-left bkgd-lightbrown">
								<div class="">
									<div class="panel-heading" style="font-weight: 600;">{{overallData.lifeTimeValue.groupName}}
									</div>
								</div>
								<div class="widget-content metric-widgets">
									<div class="row-fluid">
										<div class="actual-value">
											<span>{{overallData.lifeTimeValue.value}}</span>
										</div>
									</div>
									<div class="box-content-bottom">
										<ul>
											<li class="down">{{overallData.lifeTimeValue.vsLastWeek}}
												Vs Last week</li>
											<li class="up">{{overallData.lifeTimeValue.yoY}} YoY</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row nopadding topMargin">
				<div class="col-sm-3 col-md-3 col-lg-3 clearfix">
					<div class="donut-score" style="height: 100px;">
						<div id="overallSubscribers" class="donut-score-value"></div>
						<p>Subscribers as a %age of all users</p>
					</div>
					<div class="donut-score" style="height: 100px;">
						<div id="activeSubscribers" class="donut-score-value"></div>
						<p>Active Subscribers</p>
					</div>
					<div class="donut-score" style="height: 100px;">
						<div id="dormantSubscribers" class="donut-score-value"></div>
						<p>Dormant Subscribers</p>
					</div>
				</div>
				<div class="col-sm-9 col-md-9 col-lg-9">
					<div class="brdr-left"
						style="background: #f5f5f5; height: 300px; margin-bottom: 20px">
						<div class="acqChart" id="revenueTrendChart"></div>
					</div>
				</div>
			</div>
		</div>

		<div ng-controller="deepDiveProfileController">
			<div class="row nopadding">
				<div class="panel-heading">
					<span>User Profile</span>
				</div>
				<div class="half-width">
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="genderPieChart"></div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="agePieChart"></div>
					</div>
				</div>

				<div class="half-width">
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="locationPieChart"></div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="signupPieChart"></div>
					</div>
				</div>
			</div>

			<div class="row nopadding">
				<div class="panel-heading">
					<span>Product Profile</span>
				</div>
				<div class="half-width">
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="accessDonutChart"></div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6 square-full-box">
						<h2 class="titleLikeChart">Product Plan</h2>
						<h3 class="subtitle">% of all subscribers</h3>
						<div>
							<div class="row-fluid square-box">
								<div class="col-sm-6 col-md-6 col-lg-6"
									style="height: 100%; background: #FFF2CD;">
									<h3>Basic</h3>
									<span>35%</span>
								</div>
								<div class="col-sm-6 col-md-6 col-lg-6"
									style="height: 100%; background: #FEE895;">
									<h3>Professional</h3>
									<span>25%</span>
								</div>
							</div>
							<div class="square-box">
								<div class="col-sm-6 col-md-6 col-lg-6"
									style="height: 100%; background: #FFDA65;">
									<h3>Professional Plus</h3>
									<span>12%</span>
								</div>
								<div class="col-sm-6 col-md-6 col-lg-6"
									style="height: 100%; background: #BE9100;">
									<h3>Enterprise</h3>
									<span>28%</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="half-width">
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="loginBarChart"></div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="platformDonutChart"></div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="row acquisition-panel nopadding" id="engagement-div" ng-controller="deepDiveEngagmentController">
		<div class="panel panel-default">
			<div class="panel-heading">Engagement</div>
		</div>
		<div class="panel-heading brdr-btm-blue"><span>Active Vs Dormant</span></div>
		<div class="row nopadding">
			<div class="col-sm-3 col-md-3 col-lg-3">
				<div class="acqChart" id="subsDonutChart"></div>
			</div>
			<div class="col-sm-9 col-md-9 col-lg-9">
					<div class="acqChart" id="subsAreaChart"></div>
			</div>
		</div>
		<div class="row nopadding bkgd-lightbrown">
			<div class="titleLikeChart" style="margin-left:13px;">Product Usage</div>
			<div class="row-fluid">
				<div class="col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="trendActBarChart"></div>
				</div>
				<div class="col-sm-6 col-md-6 col-lg-6">
					<div class="acqChart" id="trendSecBarChart"></div>
				</div>
			</div>
		</div>
		<div class="row nopadding bkgd-lightbrown" style="margin-top:10px !important;">
			<div class="titleLikeChart" style="margin-left:13px;">Login Trends</div>
			<div class="row-fluid">
				<div class="col-sm-3 col-md-3 col-lg-3">
					<div class="acqChart" id="loginBarChart1"></div>
				</div>
				<div class="col-sm-9 col-md-9 col-lg-9">
					<div class="acqChart" id="loginDurationColChart"></div>
				</div>
			</div>
		</div>
		<div class="row nopadding bkgd-lightbrown" style="margin-top:10px !important;">
			<div class="titleLikeChart" style="margin-left:13px;">Adoption Trend</div>
			<div style="margin-left:13px;">How many users have completed the set out activities</div>
			<div class="row-fluid" style="margin-left:5%;margin-right:5%;">      
			  <table class="table borderless clSubsTable">
			    <thead>
			      <tr>
			        <th></th>
			        <th>Onboarding</th>
			        <th>Basic</th>
			        <th>Advanced</th>
			      </tr>
			    </thead>
			    <tbody>
			      <tr>
			        <td><h3>Stage completion rate</h3><p>%age of users of overall who have completed the stage</p></td>
			        <td><div class="box">36%</div></td>
			        <td><div class="box">41%</div></td>
			        <td><div class="box">35%</div></td>
			      </tr>
			      <tr>
			        <td><h3>No. of Subscribers in the Stage</h3><p>%age of users of overall who have completed the stage</p></td>
			        <td><div class="highlightValue">3,126,982</div></td>
			        <td><div class="highlightValue">521,999</div></td>
			        <td><div class="highlightValue">256,982</div></td>
			      </tr>
			      <tr>
			        <td><h3>Trends</h3><p>%age of users of overall who have completed the stage</p></td>
			        <td class="metric-widgets">
							<div class="box-content-bottom">
								<ul>
									<li class="up">+10% Vs Last week</li>
									<li class="down">-5% YoY</li>
								</ul>
							</div>
					</td>
			        <td class="metric-widgets">
							<div class="box-content-bottom">
								<ul>
									<li class="up">+10% Vs Last week</li>
									<li class="down">-5% YoY</li>
								</ul>
					</td>
			        <td class="metric-widgets">
							<div class="box-content-bottom">
								<ul>
									<li class="up">+10% Vs Last week</li>
									<li class="down">-5% YoY</li>
								</ul>
							</div>
					</td>
			      </tr>
			    </tbody>
			  </table>
			</div>
		</div>
	</div>

		<div class="row acquisition-panel nopadding" id="retention-div"
			ng-controller="deepDiveRetentionController">
			<div class="panel panel-default">
				<div class="panel-heading">Retention Summary</div>
			</div>
			<div class="row nopadding">
				<div class="half-width">
					<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
						<div class="" style="background: #EE7E34;">
							<div>
								<h2 class="titleLikeChart big-fontSize"
									style="padding-top: 30px;">Churn Rate</h2>
							</div>
							<div>
								<h2 class="titleLikeChart big-fontSize">36%</h2>
							</div>
							<div>
								<span ng-hide="true">.</span>
							</div>
						</div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
						<div class="" style="background: #A8D18D;">
							<div>
								<h2 class="titleLikeChart big-fontSize">36%</h2>
							</div>
							<div>
								<span>% of total subscribers</span>
							</div>
							<div>
								<h2 class="titleLikeChart big-fontSize">1,291,234</h2>
							</div>
							<div>
								<span>Subscribers</span>
							</div>
						</div>
					</div>
				</div>
				<div class="half-width">
					<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
						<div class="" style="background: #FFE699;">
							<div>
								<h2 class="titleLikeChart big-fontSize">36%</h2>
							</div>
							<div>
								<span>% of total subscribers</span>
							</div>
							<div>
								<h2 class="titleLikeChart big-fontSize">1,291,234</h2>
							</div>
							<div>
								<span>Subscribers</span>
							</div>
						</div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6 wdgt-hgt">
						<div class="" style="background: #F8CBAC;">
							<div>
								<h2 class="titleLikeChart big-fontSize">36%</h2>
							</div>
							<div>
								<span>% of total subscribers</span>
							</div>
							<div>
								<h2 class="titleLikeChart big-fontSize">1,291,234</h2>
							</div>
							<div>
								<span>Subscribers</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row nopadding" style="margin-top: 10px !important">
				<div class="col-sm-3 col-md-3 col-lg-3">
					<div class="retention-widgets  bkgd-lightbrown">
						<div>
							<h2 class="titleLikeChart">Dormant</h2>
						</div>
						<div>
							<h2 class="titleLikeChart">64%</h2>
						</div>
					</div>
					<div class="retention-widgets topMargin  bkgd-lightbrown">
						<div>
							<h2 class="titleLikeChart">Active</h2>
						</div>
						<div>
							<h2 class="titleLikeChart">36%</h2>
						</div>
					</div>
					<div class="retention-widgets topMargin  bkgd-lightbrown">
						<div>
							<h2 class="titleLikeChart ">Avg Lifetime</h2>
						</div>
						<div>
							<h2 class="titleLikeChart">13 months</h2>
						</div>
					</div>

				</div>
				<div class="col-sm-9 col-md-9 col-lg-9">
					<div class="acqChart" id="cancelColChartRet"></div>
				</div>
			</div>
			<div class="row nopadding">
				<div class="panel-heading">
					<span>User Profile</span>
				</div>
				<div class="half-width bkgd-lightbrown">
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="genderPieChartRet"></div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="agePieChartRet"></div>
					</div>
				</div>

				<div class="half-width bkgd-lightbrown">
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="locationPieChartRet"></div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="signupPieChartRet"></div>
					</div>
				</div>
			</div>
			<div class="row nopadding">
				<div class="panel-heading">
					<span>Product Profile</span>
				</div>
				<div class="half-width bkgd-lightbrown">
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="accessDonutChartRet"></div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6 square-full-box">
						<h2 class="titleLikeChart">Product Plan</h2>
						<h3 class="subtitle">% of all subscribers</h3>
						<div>
							<div class="row-fluid square-box">
								<div class="col-sm-6 col-md-6 col-lg-6"
									style="height: 100%; background: #FFF2CD;">
									<h3>Basic</h3>
									<span>35%</span>
								</div>
								<div class="col-sm-6 col-md-6 col-lg-6"
									style="height: 100%; background: #FEE895;">
									<h3>Professional</h3>
									<span>25%</span>
								</div>
							</div>
							<div class="square-box">
								<div class="col-sm-6 col-md-6 col-lg-6"
									style="height: 100%; background: #FFDA65;">
									<h3>Professional Plus</h3>
									<span>12%</span>
								</div>
								<div class="col-sm-6 col-md-6 col-lg-6"
									style="height: 100%; background: #BE9100;">
									<h3>Enterprise</h3>
									<span>28%</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="half-width bkgd-lightbrown">
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="loginBarChartRet"></div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="platformDonutChartRet"></div>
					</div>
				</div>
			</div>
			<div class="row nopadding bkgd-lightbrown"
				style="margin-top: 10px !important;">
				<div class="titleLikeChart" style="margin-left: 13px;">Activity</div>
				<div class="row-fluid">
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="trendActBarChartRet"></div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="trendSecBarChartRet"></div>
					</div>
				</div>
			</div>

			<div class="row nopadding bkgd-lightbrown"
				style="margin-top: 10px !important;">
				<div class="row-fluid">
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="activeColChartRet"></div>
					</div>
					<div class="col-sm-6 col-md-6 col-lg-6">
						<div class="acqChart" id="inactiveColChartRet"></div>
					</div>
				</div>
			</div>
		</div>


	</div>
                   
                </div>
      
</div>
