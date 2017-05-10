/*
 * © Copyright Lenovo 2015.
 *
 * LIMITED AND RESTRICTED RIGHTS NOTICE:
 *
 * If data or software is delivered pursuant a General Services Administration
 * "GSA" contract, use, reproduction, or disclosure is subject to
 * restrictions set forth in Contract No. GS-35F-05925.
 */
/*jshint -W031 */
define([
		'marionette',
		'backbone',
		'hogan',
		'util',
		'Router',
		'RegionManager',
		'utils/utils',
		'utils/constants/urlConstants'
	],
	function(Marionette, Backbone, Hogan, util, Router, RegionManager, utils, urlConstants) {
		'use strict';

		var router;

		var App = new Marionette.Application({
			initialize: function() {
				router = new Router();
				var open = XMLHttpRequest.prototype.open;
				XMLHttpRequest.prototype.open = function(method, url) {
					// Only include the headers if this is a request that we want to include them in based on the url
					var send = this.send;

					this.send = function() {
						if ($.cookie("confluentsessionid")) {
							this.setRequestHeader("confluentsessionid", $.cookie("confluentsessionid"));
						}
						this.setRequestHeader("Authorization", 'Token ' + window.sessionStorage['lico_token']);
						if (url === urlConstants.files) {
							this.setRequestHeader("Accept", "application/json");
						}
						send.apply(this, arguments);
					}
					open.apply(this, arguments);
				};
				$.ajaxSetup({
					cache: false
				});
				// 一分钟发送一次loginin的请求，防止token过期
				function loginRefresh(){
		            $.ajax({
		                type: "GET",
		                url:urlConstants.login,
		                contentType: "application/json",
		                dataType: "json",
		                success: function (data) {
		                },
		                error: function (res) {
							if (res.status==403||res.status==401) {
           			 			window.sessionStorage.clear();
								window.location.href='/login.html';
							}
		                }
		            });
				}
				setInterval(function() {
					loginRefresh();
				}, 30000);
			}
		});

		App.on('before:start', function() {
			Marionette.Renderer.render = function(template, data) {
				return Hogan.compile(template).render(data);
			};
			if (!window.localStorage.videoState) window.localStorage.videoState = "on";
		});

		App.on('start', function() {


			Backbone.history.start();


			//启动async请求开始      
			function async_running() {
				console.log("async请求已经启动");
			}

			startAsync(async_running.bind({
				username: 'demouser'
			}));
			//启动async请求结束      

			var isAdmin = false;
			if (window.location.hash.indexOf("admin") !== -1) {
				if (window.sessionStorage.getItem('lico_role') === "admin") {
					isAdmin = true;
				}
			}
			RegionManager.showHeader({
				"isAdmin": isAdmin
			});
			RegionManager.showFooter();
			//window.eventBus = _.extend({}, Backbone.Events);
			utils.startRefreshing();
		});

		App.router = router;
		window.App = App;
		window.contact_time = [];
		return App;
	});