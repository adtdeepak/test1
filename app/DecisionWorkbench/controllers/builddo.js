<h1 class="pull-left">{{labelConstants.dw_builddo_title}}</h1>
<div id="contentContainer">
	<div id="Decision">
		<div class="contentpannel builddo">
			<div class="chartPanel clearfix">
				<div class="chartPanelLeft" ng-controller ="achievementUpliftController">
					<h2 class="charttitle">{{labelConstants.dw_builddo_waterfall_chart_title}}</h2>
					 <div class="progress-loading" ng-if="!error && !dataLoaded"></div>
					<ng-include ng-show="error" src="'partials/error.htm'"></ng-include>
					<a href="#" class="help tooltip-new">
						<figure>
							<img src="images/icon-info.png" />
						</figure> <span><img alt="Tooltip" src="images/tooltip-arrow.png"
							class="callout">{{Tooltip.TOOLTIP_DECISIONWB_ACHIEVABLE_UPLIFT}}</span>
					</a>
					<div id="buildDoChart" ng-hide="error || !dataLoaded" class="clearfix"></div>			
					</div>
				<div ng-controller="reviewPanel">
					<a href="#" class="chartarrow"> <img src="images/chartarrow.png" ng-click="addSelectedDOs()"/>
					</a>
					<div class="chartPanelRight">
						<div class="clearfix right">
							<div class="tab_container">
								<section id="Weekly" class="tab_content">
									<h2>{{labelConstants.dw_builddo_review_panel_title}}</h2>
									 <div class="progress-loading" ng-if="!error"></div>
									<ng-include ng-show="error" src="'partials/error.htm'"></ng-include>
									<a href="#" class="help tooltip-new">
										<figure>
											<img src="images/icon-info.png" />
										</figure> <span><img alt="Tooltip" src="images/tooltip-arrow.png"
											class="callout">{{Tooltip.TOOLTIP_DECISIONWB_REVIEW_PANEL}}</span>
									</a>
									<div ng-hide="error">
										<div class="contentScroll contentScroll2">
											<table id="reviewPanelTable" class="GDtable no-pagination"  my-table options="options" table-data="reviewTableData" id="reviewPanelTable">
													<colgroup>
													<col>
													<col>
													<col>
													</colgroup>
													<thead>
														<tr>
															<th class="no-sorting"></th>
															<th>
																<div class="border div-width" >DO No.</div>
															</th>
															<th>
																<div class="border">Conversion Uplift / New Subs</div>
															</th>
														</tr>
													</thead>
											</table>
										</div>
										<div class="clearfix clearboth buttons">
											<button class="btn btn-org pull-right" 
												ng-disabled="!isDataInReviewPanelTable" ng-class="{spinnerButton: dataLoaded==false}"
												ng-click="save()" href="#/review-do?flow=false">{{labelConstants.dw_builddo_review_panel_save_btn_text}}</button> <a
												class="btn btn-org btn-cancel pull-right" href=""dw_builddo_remove_selection_btn_text
												ng-click="removeSelected()" id="removeSelection">{{labelConstants.dw_builddo_remove_selection_btn_text}}</a>
										</div>
									</div>
								</section>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="ContainerBox decision-option">
				<article class="title_panel clearfix">
					<p class="pull-left">
						<span>{{labelConstants.dw_builddo_decision_options_title}}</span>
					</p>
				</article>
				<div class="contentPanel ">
					<div class="contentPanel-filter" ng-controller="filterOuterController">
						<ng-include src="'app/DecisionWorkbench/filter.htm'"></ng-include>
					</div>
					<div class="tablecontent contentScroll-disabled review-panel"
						ng-controller="buildDoTableController">
						<!-- TODO -->
						<article class="title_part clearfix">
							<p class="pull-left" ng-hide='true'>
								<strong>Review Panel</strong>
							</p>
						</article>
						 <div class="progress-loading" ng-if="!error && !dataLoaded"></div>
						<ng-include ng-show="error" src="'partials/error.htm'"></ng-include>
						<table ng-hide="error || !dataLoaded" class="GDtable" table-data="getDONumber" my-table options="options" other-data='chartLoading'>
							<colgroup>
								<col>
								<col>
								<col>
								<col>
								<col>
								<col>
								<col>
								<col>
							</colgroup>
							<thead>
								<tr>
									<th>DO No.</th>
									<th>Targeted Conversion Activities</th>
									<th>Channels</th>
									<th>User Group</th>
									<th>Expected New Subs</th>
									<th>Users Targeted</th>
									<th>Conversion Uplift</th>
									<th>Actions</th>
								</tr>
							</thead>
						</table>
						<div class="clearfix ChartLegend">
							<span>*</span>Valid upto next 30 days
						</div>
						<a href="#" class="zoomThis"></a>
					</div>
				</div>
			</div>

		</div>
	</div>
</div>

<!----------------------------Modal Window----------------->
<div id="boxes" ng-controller="modalController">
	<div id="dialog" class="window">
		<div class="modalheading">
			<h2>Validate</h2>
			<a href="#" class="close" ng-click ="showTable()"></a>
		</div>
		<div class="modalcontent">
		<ng-include ng-show="error" src="'partials/error.htm'"></ng-include>
		<div ng-if ="!error">
			<section class="current">Current Selection: Decision
				Option: {{currentData.doId}}| Conversion Activity: {{currentData.targetconvList}}|
				User group: {{currentData.userGroup}}| Conversion Uplift:{{currentData.convUplift.value}}| New Subs: {{currentData.expectedNewSub}}</section>
			<section class="filter">
				<div class="filterwrapper">
					<div class="pull-left">
						<div class="filter-label">Filter</div>
						<div class="filter-actions">
							<h3>Convertion Activity</h3>
							<div class="selectiontype">
								 <input type="radio" value="all" name="conversion-activity" ng-model="radioValue"/>All
								Combination
								<input type="radio" value="selected" name="conversion-activity" ng-model="radioValue"/>The Chosen Conversion Activity Only
							</div> 
						</div>
					</div>
					<div class="pull-left">
						<h3>Executed Date</h3>
						<div class="datevalues">
							<div class="lblvalue">Greater than</div>
							<input type="text" placeholder="MM/DD/YYYY" ng-model="fromDate" datepicker />
						</div>
						<div class="datevalues">
							<div class="lblvalue">Less than</div>
							<input type="text" placeholder="MM/DD/YYYY" ng-model="toDate" datepicker />
						</div>
					</div>
					<a href="#" id="clear-filter" ng-click ="validateFilter(fromDate, toDate)"
						class="btn btn-cancel btn-org pull-left" style="margin-top: 26px;">Filter</a>
				</div>
			</section>
			<section class="tablecontent contentScroll-disabled">
			<div class="progress-loading" ng-if="show && !dataLoaded"></div>
				<div>
					<table ng-if=show  ng-hide="error|| !dataLoaded ||showError"  class="GDtable"  my-table options="options" >
						<colgroup>
							<col>
							<col>
							<col>
							<col>
							<col>
							<col>
							<col>
							<col>
							<col>
						</colgroup>
						<thead>
							<tr>
								<th>S. No</th>
								<th>Conversion Activity</th>
								<th>Channel</th>
								<th>Tenure</th>
								<th>Start Date</th>
								<th>Con. Uplift <br /> Achieved
								</th>
								<th>Con. Uplift <br /> Expected
								</th>
								<th>New Subs <br /> Achieved
								</th>
								<th>New Subs <br /> Expected
								</th>
							</tr>
						</thead>
					</table>
				</div>
					<ng-include src="'partials/alertMessage.htm'"></ng-include>
			</section>
		</div>
		</div>
	</div>
	<div id="modifyDialog" class="window" >
	<div class="progress-loading" ng-if="!error && !dataLoaded"></div>
		<div class="modalheading">
			<h2>Modify</h2>
			<a href="#" class="close"></a>
		</div>
		<div class="modalcontent width">
			<ng-include ng-show="error" src="'partials/error.htm'"></ng-include>
			<form ng-hide="error || !dataLoaded" name="userGroupForm" >
			<div class="modifyList">
				<ul>
					<li ng-if="!modifyData.userGroupList.length == 0">Targeted Conversion Activities</li>
					<li ng-if="!modifyData.userGroupList.length == 0"> <p ng-repeat="data in modifyData.targetConvActivityList">{{data.convActivityName}}
						</p></li>
					<li class="clearfix">Channels</li>
					<li ng-if="isChannelAvailable"><select id="Select1" tabindex="1" ng-model="selectChannel">
							<option ng-repeat ="data in modifyData.channelList" value={{data.channelId}} ng-selected={{data.selected}}>{{data.channelName}}</option>
					</select></li>
					<li ng-if="!isChannelAvailable">No Channels Available</li>
				</ul>
				<div id="userGroups">
					<ul>
						<li>
							<h3>User Groups Targeted</h3>
							<h3>Total no. of Users</h3>
							<h3>Targeted No.</h3>
						</li>
						<ng-form>
						<li ng-repeat="data in modifyData.userGroupList">
							<label>{{data.groupName}}</label>
							<label>{{data.userCount}}</label>
							<input name="targetedNumber"  type="number" id={{data.groupId}}>
						</li>
						</ng-form>
					</ul>		
				</div>
			</div>
			
			<div class="modifyListBtn">
				<ng-include src="'partials/alertMessage.htm'"></ng-include>
				<a class="btn btn-org acc_link cancel" rel="filters">Accept Original</a>
				 <input type = "submit" class="btn btn-org" value="Save" rel="filters" ng-disabled="savingDO" ng-class="{spinnerButton: savingDO==true}" 
				 ng-click="saveDecisionOptions()" />
			</div>
			</form>
		</div>
		
	</div>
	<div id="tableZoom" class="window">
		<div class="modalheading">
			<h2>Decision Options</h2>
			<a href="#" class="close"></a>
		</div>
		<div class="modalcontent"></div>
	</div>
	<div id="mask"></div>
	<div ng-hide ng-controller="buildDoInit"></div>
</div>
<!----------------------------Modal Window Ends---------------->