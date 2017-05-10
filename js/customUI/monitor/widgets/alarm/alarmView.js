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
    'jquery',
	'marionette',
	'bootstrap',
	'datatables',
	'datatables_bootstrap',
	'utils/constants/urlConstants',
	'utils/constants/constants',
	'utils/eventBus',
	'libs/jquery-ui/ui/i18n/datepicker-zh-CN',
	'text!./templates/alarmTmpl.mustache',
	'i18n!./nls/alarm',
	'css!./style/alarm.css'
], function($,Marionette, bootstrap, dataTable, datatable_bootstrap,
	urlConstants, constants, eventBus, datepicker_CN, template, nls) {
	return Marionette.ItemView.extend({
		template: template,
		templateHelpers: function() {
			return {
				nls: nls
			};
		},
		onShow: function() {
			var flag,
				_this = this,
				begintime = "",
				endtime = "";
			$('body').css("background-color", "#ffffff");
			function setDataPicker() {
				$.datepicker.setDefaults(datepicker_CN);
				$("#alarmHistoryBeginTime").datepicker(
				{
					defaultDate: "+1w",
                    onClose: function( selectedDate ) {
                       $( "#alarmHistoryEndTime" ).datepicker( "option", "minDate", selectedDate );
                    },
                    changeMonth: true,
                    changeYear: true,
                    maxDate: "+0D"
				}
				);
				$("#alarmHistoryEndTime").datepicker(
				{
					defaultDate: "+1w",
                    onClose: function( selectedDate ) {
                       $( "#alarmHistoryBeginTime" ).datepicker( "option", "maxDate", selectedDate );
                    },
                    changeMonth: true,
                    changeYear: true,
                    maxDate: "+0D"
				}
				);
			}

			function setCheckbox(){
				$("#alarmTable input").removeAttr('checked');
				$('.alarm-btn-left .btn').attr('disabled', 'disabled');
			}
			function setTable(target, clickTarget, noClickTarget) {
				flag = target;
				$(clickTarget).addClass('active');
				$(noClickTarget).removeClass('active');
				setCheckbox();
				$("#alarmHistoryBeginTime,#alarmHistoryEndTime,#alarmLevel,#alarmSearchText").val("");

				$("#alarmTable").DataTable({
					//processing: true, //启动后端数据处理
					serverSide: true, //启动后端分页
					paging: true,
					info: true,
					destory: true,
					stateSave: false,
					columns: [{
						data: null,
						"title": "<input id=\"checkbox_id_all\" name=\"checkbox_name_all\" type=\"checkbox\" value=\"\">"
					}, {
						'data': 'id',
						'title': nls.alarm_id
					}, {
						'data': 'policy_name',
						'title': nls.alarm_name
					}, {
						'data': 'policy_level',
						'title': nls.alarm_level
					}, {
						'data': 'status',
						'title': nls.alarm_status
					}, {
						'data': 'create_time',
						'title': nls.alarm_time
					}, {
						'data': 'node',
						'title': nls.alarm_nodes
					}, {
						'data': 'comment',
						'title': nls.alarm_comment
					}],
					ajax: {
						// 'url': 'static/js/customUI/monitor/widgets/alarm/data/'+target+'AlarmData.json',
						'url': urlConstants.alarm + target + '/',
						dataSrc: function(res) {
							$.each(res.data, function(index, item) {
								item["status"] = item["status"].toLowerCase();

							})
							return res.data;
						},
						data: function(args) {
							return {
								"args": JSON.stringify(args),
								"begin": begintime,
								"end": endtime
							};
						}
					},
					language: {
						"url": require.toUrl('') + "translation/datatables.chinese.json"
					},
					order: [
						[5, 'dest']
					],

					columnDefs: [ //设置列的属性，此处设置第一列不排序,
						{
							"orderable": false,
							"targets": 0,
							"data": null,
							"defaultContent": '<input type="checkbox" value="" name="checkname">'
						}
					],
					rowCallback: function(row, data, index) {
						var urlimg = "/static/js/customUI/monitor/widgets/alarm/img/";
						var urlstatus = "",level_title,s_policy_level;
						data.comment =  HtmlEncode(data.comment);
						switch (data.status) {
							case "present":
								$('td:eq(4)', row).html(nls.present);
								break;
							case "confirmed":
								$('td:eq(4)', row).css({
									"color": "#d60000"
								});
								$('td:eq(4)', row).html(nls.confirm);
								break;
							case "resolved":
								$('td:eq(4)', row).css({
									"color": "#48cb5b"
								});
								$('td:eq(4)', row).html(nls.solve);
								urlstatus = "_gray"
								break;
						}
	                    switch (Number(data.policy_level)){
	                        case 50:
	                            s_policy_level="fatal";
                                level_title=nls.fatal;
	                            break;
	                        case 40:
	                            s_policy_level="error";
                                level_title=nls.error;
	                            break;
	                        case 30:
	                            s_policy_level="warn";
                                level_title=nls.warn;
	                            break;
	                        case 20:
	                            s_policy_level="info";
                                level_title=nls.info;
	                            break;
	                    }
						$('td:eq(3)', row).html('<img title='+ level_title +' src=' + urlimg + s_policy_level + urlstatus + '28.png>');
						if (!data.comment) {
							$('td:eq(7)', row).html('<img class="alarm-comment alarm-comment-icon" src=' + urlimg + 'comment20.png>');
						} else {
							$('td:eq(7)', row).html('<div title=' + data.comment + ' class="alarm-comment alarm-comment-hover">' + data.comment + '</div>');
						}
					}
				});
			}

			function clickSearchBtn(table) {
				begintime = "", endtime = "";
				table.column(3).search("");
				table.search("");
				$("#alarmSearchBtn").off();
				$("#alarmSearchBtn").on("click", function() {
						tableSearch();
					})
					//----Enter 触发search事件
				$("#alarmSearchText").focus(function() {
					document.onkeydown = function(e) {
						if (e.keyCode == 13) {
							tableSearch();
						} 
					}
				});

				$("#alarmSearchText").blur(function() {
					document.onkeydown = function(e) {
						if (e.keyCode == 13) {
							return false
						} 
					}
				})

				function tableSearch() {
					setCheckbox();
					if(flag=="history" && $("#alarmHistoryBeginTime").val()){
						 begintime = (new Date($("#alarmHistoryBeginTime").val()+" 00:00:00")).valueOf() / 1000
					}else{
 						begintime =""
					}
					if(flag=="history" && $("#alarmHistoryEndTime").val()){
						endtime= (new Date($("#alarmHistoryEndTime").val()+" 23:59:59")).valueOf() / 1000 
					}else{
 						endtime =""
					}
					table.search($.trim($("#alarmSearchText").val())).draw();
				}
			}

			function destroy() {
				$("#alarmTable").DataTable().destroy();
				$('#alarmTable').empty();
			}
            // 翻页取消选中状态和排序
			$('#alarmTable').on('page.dt order.dt',function() {
				setCheckbox()
	        });
			$("#currentAlarm").click(function() {
				if ($("#alarmTable").html()) {
					destroy();
				}
				setTable('current', "#currentAlarm", "#historyAlarm");
				var table = $("#alarmTable").DataTable();
				$(".alarm-select-type, .current-confirm, .current-all-confirm").css({
					"display": "inline-block"
				});
				$(".alarm-time-range").css({
					"display": "none"
				});

				$("#alarmLevel").unbind("change");
				$("#alarmLevel").on("change", function() {
					table.column(3).search(Number(this.value)).draw();
				});
				clickSearchBtn(table);
			});
			$("#historyAlarm").click(function() {
				if ($("#alarmTable").html()) {
					destroy();
				}
				setTable('history', "#historyAlarm", "#currentAlarm");
				var table = $("#alarmTable").DataTable();
				$(".alarm-select-type, .current-confirm, .current-all-confirm").css({
					"display": "none"
				});
				$(".alarm-time-range").css({
					"display": "inline-block"
				});
				$("#alarmHistoryBeginTime,#alarmHistoryEndTime").focus(function() {
					document.onkeydown = function(e) {
						if (e.keyCode != 8 && e.keyCode != 17 && e.keyCode != 65 && e.keyCode != 46) {
							return false
						}
					}
				})
				$("#alarmHistoryBeginTime,#alarmHistoryEndTime").blur(function() {
					document.onkeydown = function() {
						return true
					}
				})
				clickSearchBtn(table);
			});
			$("#currentAlarm").trigger('click');
			setDataPicker();
			eventBus.off(constants.refreshAlarmTable);
			eventBus.on(constants.refreshAlarmTable, this.refresh);

			function tableLoad(tabledata, tableUrl) {
				$.ajax({
					type: "POST",
					url: tableUrl,
					data: JSON.stringify(tabledata),
					contentType: "application/json",
					dataType: "json",
					success: function(data) {
						if (data.ret == "success") {
							$("#remarks_modal").modal("hide");
							$("#delete_all_modal").modal("hide");
							$("input[type='checkbox']").removeAttr("checked");
							_this.refresh(null, false);
						}
					},
					error: function(err) {

					}
				});
			}


            //编码
            function HtmlEncode(str) {
                var s = "";
                if (str.length == 0) return "";
                s = str.replace(/</g, "&lt;");
                s = s.replace(/>/g, "&gt;");
                s = s.replace(/ /g, "&nbsp;");
                s = s.replace(/'/g, "&prime;");
                s = s.replace(/"/g, "&Prime;");
                return s;
            }
            function htmlDecode(str) {
                var s = "";
                if (str.length == 0) return "";
                s = str.replace(/&lt;/g, "<");
                s = s.replace(/&gt;/g, ">");
                s = s.replace(/&nbsp;/g, " ");
                s = s.replace(/&prime;/g, "\'");
                s = s.replace(/&Prime;/g, "\"");
                return s;
            }


            $('#alarmTable').on('click', '.alarm-comment', function() {
				var id = $('#alarmTable').DataTable().row($(this).parents('tr')).data().id;
				var comment = $('#alarmTable').DataTable().row($(this).parents('tr')).data().comment
				$("#remarks_modal").modal("show");
				$("body").removeClass("modal-open");
				$("#remarks_text").val(htmlDecode(comment));
				$("#remarks_modal .modal-title").text(nls.remarks_title + id);
				$("#remarks_confirm").off();
				$("#remarks_confirm").on('click', function() {
					var data = {
						"comment": $.trim($("#remarks_text").val())
					}
					var url = urlConstants.alarm + id + "/comment/";
					tableLoad(data, url);
				})
			})

			//----------全选，取消全选
			$("#alarmTable.table").on("click", "input[type='checkbox']", function() {
					//var input = $("#alarmTable.table").find('input');
					var input = $("input:not(#checkbox_id_all)");
					var key = false;
					//console.log($(this).find(input));
					if ($(this).attr('id') == "checkbox_id_all") {
						if ($("#checkbox_id_all").attr('checked') == 'checked') {
							$("#alarmTable input").removeAttr('checked', false);
						} else {
							$("#alarmTable input").prop('checked', true);
							$("#checkbox_id_all").attr('checked', 'checked');
						}

					}
					for (var i = 0; i < input.length; i++) {
						if (input[i].checked) {
							key = true;
						}
					}
					if (key) {
						$(".alarm-btn-left .btn").removeAttr('disabled');
					} else {
						$(".alarm-btn-left .btn").attr('disabled', 'disabled');
					}
				})
				//----------确认，解决，删除及对应全部事件
			$(".alarm-btn-left .btn,.alarm-btn-right .btn").on("click", function() {
				var temp = $("#alarmTable.table tr");
				var id_alarm = [],
					operation, data, tableUrl;
				operation = $(this).attr('default');

				if ($(this).parent().parent().hasClass("alarm-btn-left")) {
					for (var i = 0; i < temp.length - 1; i++) {
						if ($(temp[i + 1]).find("input").prop('checked')) {
							id_alarm.push(parseInt($(temp[i + 1]).children(1).text()));
						}
					}
				}

				if (flag == "current") {
					data = {
						"id": id_alarm,
						"level": Number($("#alarmLevel").val()),
						"search": $("#alarmSearchText").val(),
						"operation": operation
					}
					tableUrl = urlConstants.alarm + 'current/'
				} else {
					data = {
						"id": id_alarm,
						"begin": String(begintime),
						"end": String(endtime),
						"search": $("#alarmSearchText").val(),
						"operation": operation
					}
					tableUrl = urlConstants.alarm + 'history/';
				}

				if ($(this).parent().parent().hasClass("alarm-btn-right")) {
					$("#delete_all_modal").modal("show");
					var alarmStr;
					switch (operation){
						case "delete":
							alarmStr = nls.alarmdelete
							break;
						case "confirm":
							alarmStr = nls.remarks_confirm
							break;
						case "solve":
							alarmStr = nls.solvebtn
							break;
					}
					$("#g_off_id").text(nls.alarm_remarks + alarmStr + nls.alarmText);
					$("#delete_all").text(alarmStr);
					$("body").removeClass("modal-open");
				} else {
					tableLoad(data, tableUrl);
				}

				$("#delete_all").off();
				$("#delete_all").on('click', function() {
					tableLoad(data, tableUrl);
				});
			})
		},
		refresh: function(a,b) {
			var _checkedLen = $("input:checked:not(#checkbox_id_all)").length;
			if (_checkedLen > 0) {
				return
			};
			$('.alarm-btn-left .btn').attr('disabled', 'disabled');
			$("#checkbox_id_all").removeAttr("checked");
			if ($(".modal.in").length > 0) {
				return;
			};
			a=(a==null?undefined:null);
			b=(b==false?undefined:false);
			var table = $('#alarmTable').DataTable();
			table.ajax.reload(a, b);
            $.ajax({
                type: "GET",
                url: urlConstants.alarm + "sound/",
                contentType: "application/json",
                dataType: "json",
                success: function (data) {
                    if(data.count>999){
                        $("#sound-count-length").text(data.count +"+");
                    }else{
                        $("#sound-count-length").text(data.count);
                    }
                },
                error: function (err) {
                }
            });
		}
	});
});