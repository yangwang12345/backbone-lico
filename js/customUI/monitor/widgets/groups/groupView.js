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
	'bootstrap',
	'echartjs',
	'utils/constants/urlConstants',
	'utils/constants/constants',
	'utils/eventBus',
	'customUI/monitor/widgets/groups/widgets/gListView/gListView',
	'customUI/monitor/widgets/groups/widgets/tendencyView/tendencyView',
	'customUI/monitor/widgets/groups/widgets/heatView/heatView',
	'text!./templates/groupTmpl.mustache',
	'i18n!./nls/group',
	'css!./style/group.css'
], function(Marionette, bootstrap, echartjs, urlConstants, constants,
	eventBus, gListView, tendencyView, heatView, template, nls) {
	return Marionette.ItemView.extend({
		template: template,
		templateHelpers: function() {
			return {
				nls: nls
			};
		},

		onDestroy: function() {
			$("body").css("background-color", "#F6F6F4");
		},

		onShow: function() {
			var id;
			function addActiveClass(currrent) {
				$(".group-title-tab").removeClass('active');
				$(currrent).addClass('active');
				$("#group_body").empty();
			};

			function ajaxGroupItem() {
				$.ajax({
					type: "GET",
					// url : "static/js/customUI/monitor/widgets/groups/data/nodegroups.json",
					url: urlConstants.nodegroups,
					async: false,
					dataType: "json",
					success: function(data) {
						if (data.ret == "success") {
							for (var i = 0; i < data.groups.length; i++) {
								$("#groups_selected_item").append("<option data-id='" + data.groups[i].id + "'>" + data.groups[i].groupname + "</option")
							};
							id=$("select option:selected").attr("data-id");
						} else {
							alert("ret:" + data.ret + "\n" + "msg:" + data.msg)
						}
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log(textStatus + errorThrown)
						console.log(jqXHR);
					}
				});
			};
			ajaxGroupItem();
			if (id) {
	    		$("#groups_selected_item").unbind("change");
				$("#groups_selected_item").on("change",function () {
					$("#group_list").trigger('click');
				});	
				var gList = new gListView({el: "#group_body"});
				var tendency = new tendencyView({el: "#group_body"});
				var heat = new heatView({el: "#group_body"});
				$("#group_list").unbind("click");
				$("#group_list").on("click", function() {
					addActiveClass(this)
					gList.render();
				});

				$("#tendency").unbind("click");
				$("#tendency").on("click", function() {
					addActiveClass(this)
					tendency.render();
				});

				$("#heat").unbind("click");
				$("#heat").on("click", function() {
					addActiveClass(this)
					heat.render();
				});	
				$("#group_list").trigger('click');
			}
		}
	});
});