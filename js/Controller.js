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
		'RegionManager',
		'core/layout/welcome/welcomeView',
		'customUI/nodeList/nodeListView',
		'customUI/user/dashboard/overview/dashboardView',
		'customUI/admin/dashboard/overview/dashboardView'
	],
	function (Marionette, regionManager, welcomeView, nodeListView, dashboardView, adminDashboardView) {
		'use strict';

		return Marionette.Controller.extend({

			// initialize : function() {
			// 	regionManager.showHeader();
			// 	//regionManager.showNavigation();
			// },

			index: function () {
				var _currentLocation=window.location;
				if(window.sessionStorage['lico_role']){
					var dashboard = new dashboardView();
					dashboard.render();
					regionManager.showContent(dashboard);
					regionManager.showHeader({"isAdmin": false});
				} else {
					window.location.href='/login.html'
				}
			},

			role: function () {
				var _currentLocation=window.location;
				if(window.sessionStorage['lico_role']=='staff'){
					var _hash='#staff';
					window.location.href='/'+_hash;
					var dashboard = new dashboardView();
					dashboard.render();
					regionManager.showContent(dashboard);
					regionManager.showHeader({"isAdmin": false});
				} else if(window.sessionStorage['lico_role']=='admin'){
					var _hash='#admin';
					window.location.href='/'+_hash;
					regionManager.showHeader({"isAdmin": true});
					var adminDashboard = new adminDashboardView();
					adminDashboard.render();
					regionManager.showContent(adminDashboard);
				} else {
					window.location.href='/login.html'
				}
			},

			about: function () {
				regionManager.showContent(new welcomeView());
				//regionManager.showAbout();
			},

			user: function () {
				regionManager.showContent(new welcomeView());
				//regionManager.showAbout();
			},

			adminNodes: function () {
				// Prevent normal user logging into admin page
				if (!window.sessionStorage['lico_role'] == "admin") {
					return;
				}
				regionManager.showAllNodes();
			},
            //新增加监控部分开始
            adminMonitor: function(){
            	
            	regionManager.showAllMonitor();
            	
            	
            },
            //新增加监控部分结束 
            adminMonitorList:function(){
            	
            	regionManager.showAllMonitorList();
            	
            },
            adminMonitorPhysical:function(){
            	
            	regionManager.adminMonitorPhysical();
            },
			adminMonitorPhysicalRacks:function(){

				regionManager.adminMonitorPhysicalRacks();
			},
            adminMonitorGroup:function(){
            	
            	regionManager.adminMonitorGroup();
            	
            },
            //用户管理新路由开始
            userGroupsManagement:function(){
            	
            	regionManager.showUserGroupsManagement();
            	
            },
            uerUserManagement:function(){
            	
            	regionManager.showUserManagement();
            	
            },
            userAcountingManagement:function(){
            	
            	regionManager.showAcountingManagement();
            	
            },
            adminJobMonitor:function(){
            	
            	regionManager.showJobMonitor();
            	
            },
            //用户管理新路由结束
			adminUsers: function (view) {
				// Prevent normal user logging into admin page
				if (!window.sessionStorage['lico_role'] == "admin") {
					return;
				}
				//regionManager.showNavigation();
				//regionManager.showContent(new userboardView({"currentView": view}));
			},

			
			
			 
			session: function () {
				if (!window.sessionStorage['lico_role'] == "admin") {
					return;
				}
				regionManager.showAllVncSessions();
			},
			
			jobs: function () {
				regionManager.showJobView();
			},

			/*
			users: function(){
				regionManager.showUsers();
			},

			group: function(){
				regionManager.showGroup();
			},

			accounting: function(){
				regionManager.showAccounting();
			},
			*/

			files: function (){
				regionManager.showFileManagement();
			},
			
			sessionInfo: function (){
				regionManager.showSessionInfo();
			},

			admin: function() {
				// Prevent normal user logging into admin page
				if (window.sessionStorage['lico_role'] == "admin") {
					regionManager.showHeader({"isAdmin": true});
					var adminDashboard = new adminDashboardView();
					adminDashboard.render();
					regionManager.showContent(adminDashboard);
				} else {
					window.location.href='/login.html'
				}
			},

			jobChart: function () {
				
				regionManager.showJobChart();
				
			},

			report:function(){
				regionManager.showReport();
			},

			log:function(){
				regionManager.showLog();
			},
			
			templateSelectInfo:function(){
				
				regionManager.showTemplateSelect();
				
			},

			
			// 报警事件
			adminMonitorAlarm:function(){
				regionManager.showMonitorAlarm();
			},
			// 报警设置
			adminStrategy:function(){
				regionManager.showStrategy();
			}
		});

	});
