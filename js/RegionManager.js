/*
 * © Copyright Lenovo 2015.
 *
 * LIMITED AND RESTRICTED RIGHTS NOTICE:
 *
 * If data or software is delivered pursuant a General Services Administration
 * "GSA" contract, use, reproduction, or disclosure is subject to
 * restrictions set forth in Contract No. GS-35F-05925.
*/
define([
		'marionette',
		'core/layout/header/headerView',
		'core/layout/welcome/welcomeView',
		'core/layout/footer/footerView',
		'customUI/nodeList/nodeListView',
		'customUI/user/dashboard/job/jobView',
		'customUI/userManagement/userManagementView',
		'customUI/groupManagement/userGroupView',
		'customUI/accountingManagement/accountingMgtView',
		'customUI/user/fileManagement/fileManagementView',
		'customUI/admin/dashboard/jobChart/jobChart',   	
    	'customUI/session/sessionView',
    	'customUI/user/sessionInfo/sessionInfoView',
    	'customUI/user/showTemplateSelect/showTemplateSelectView',
        'customUI/monitor/widgets/listView/listView',
        'customUI/monitor/widgets/groups/groupView',
        'customUI/monitor/widgets/physicals/physical/physicalView',
		'customUI/monitor/widgets/physicals/rack/rackView',
        'customUI/monitor/widgets/alarm/alarmView',
		'customUI/report/reportView',
		'customUI/monitor/widgets/operationLog/operationLogView',
		'customUI/monitor/widgets/jobMonitor/jobMonitorView',
		'customUI/strategy/strategyView',
	],
	function (Marionette, headerView, welcomeView, footerView,
		nodeListView, jobView, userManagementView, userGroupView,
		accountingMgtView, fileManagementView, jobChart,
		sessionView,sessionInfoView,showTemplateSelectView,listView,groupView,
		physicalView,rackView,alarmView,reportView,operationLogView,jobMonitorView,strategyView) {
		'use strict';

		var rm = new Marionette.RegionManager();

		var regions = rm.addRegions({
			header: "#header",
			navigation: "#navigation",
			body: '#body',
			dialogregion: '#dialog-region',
			footer: '#footer'
		});

		return {
			showIndex: function () {
				regions.header.show(new headerView());
				//regions.navigation.show(new navigationView());
				regions.body.show(new welcomeView());
			},

			showFileManagement: function (){
				regions.body.show(new fileManagementView());
			},

			showSessionInfo: function (){
				regions.body.show(new sessionInfoView());
			},
			
			
			showHeader: function (options) {
				regions.header.show(new headerView(options));
			},

			showFooter: function() {
				regions.footer.show(new footerView());
			},

			showNavigation: function () {
				//regions.navigation.show(new navigationView());
			},

			showContent: function (contentView) {
				regions.body.show(contentView);
			},

			showAbout: function () {
				//rm.emptyRegions();
				regions.login.show(new loginView())
			},
            
			showJobMonitor:function(){
				
				regions.body.show(new jobMonitorView());
			},
			showNodeList: function () {
				regions.header.show(new headerView());
				//regions.navigation.show(new navigationView());
				regions.body.show(new nodeListView());
			},

			showJobView: function () {
				regions.header.show(new headerView());
				//regions.navigation.show(new navigationView());
				
				var cc=new jobView();
				
				regions.dialogregion.show(cc);
			//	console.log(cc);
			},
			/*
			showUsers:function(){
				regions.header.show(new headerView());
				regions.navigation.show(new navigationView());
				regions.body.show(new userManagementView());
			},

			showGroup:function(){
				regions.header.show(new headerView());
				regions.navigation.show(new navigationView());
				regions.body.show(new userGroupView());
			},

			showAccounting:function(){
				regions.header.show(new headerView());
				regions.navigation.show(new navigationView());
				regions.body.show(new accountingMgtView());
			},
			*/

			showJobChart: function () {
				regions.header.show(new headerView());
				//regions.navigation.show(new navigationView());
				regions.body.show(new jobChart());
			},
			
			showAllVncSessions:function(){
				regions.body.show(new sessionView());
			},
			
			showTemplateSelect:function(){
				
				regions.body.show(new showTemplateSelectView());
				
			},
			showAllMonitorList:function(){
				
				regions.body.show(new listView());
			},
			adminMonitorPhysical:function(){

				regions.body.show(new physicalView());
			},
			adminMonitorPhysicalRacks:function(){
				
				var num = Number(window.location.hash.lastIndexOf('/')) + 1;
				var id = Number(window.location.hash.substr(num));
				var name="Rack" + id;
				var rack=new rackView({el:"#body",name:name,id:id});
				rack.render();
			},
			adminMonitorGroup:function(){
				
				regions.body.show(new groupView());
			},
			showUserGroupsManagement:function(){
				regions.body.show(new userGroupView() );
			},
			showUserManagement:function(){
				regions.body.show(new userManagementView());
			},
			showAcountingManagement:function(){
				regions.body.show(new accountingMgtView() );
			},
			showMonitorAlarm:function(){
				regions.body.show(new alarmView());
			},
			showReport:function(){
				regions.body.show(new reportView());
			},
			showLog:function(){

				regions.body.show(new operationLogView());

			},
			showStrategy:function(){
				regions.body.show(new strategyView());
			},
		};

	});
