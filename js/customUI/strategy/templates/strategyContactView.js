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
	'utils/utils',
	'utils/constants/urlConstants',
	'utils/constants/constants',
	'utils/eventBus',
	'text!./templates/strategyContactTmpl.mustache',
	'i18n!./nls/strategy',
	'css!./style/strategy.css'
], function($,Marionette, bootstrap, utils,
	urlConstants, constants, eventBus, template, nls) {
	return Marionette.ItemView.extend({
		template: template,
		templateHelpers: function() {
			return {
				nls: nls
			};
		},
		onRender: function() {
			var contact_type,
				_this = this;
			// 短信和定时器60s之内无法点击
			if(window.contact_time && window.contact_time.length > 0){
				$.each(window.contact_time,function(index,item){
					$(item).attr('disabled', 'disabled');
				})
			}
			// contact页面第一次未获取到数据，点击box再次加载
			$(".s-contact-left-box,.s-contact-center-box,.s-contact-right-box").unbind('click');
			$(".s-contact-left-box").on('click',function(){
				ajaxGetData("/api/alarm/email/","email");
			})
			$(".s-contact-center-box").on('click',function(){
				ajaxGetData("/api/alarm/sms/","sms");
			})
			$(".s-contact-right-box").on('click',function(){
				ajaxGetData("/api/alarm/wechat/","chat");
			})
			ajaxGetData("/api/alarm/email/","email");
			ajaxGetData("/api/alarm/sms/","sms");
			ajaxGetData("/api/alarm/wechat/","chat");
			function setInputChecked (bool,name){
				if(bool == true){
					$("input[name='"+ name +"']").eq(0).prop("checked",true);
					$("input[name='"+ name +"']").eq(1).removeAttr("checked",false);
				} else {
					$("input[name='"+ name +"']").eq(1).prop("checked",true);
					$("input[name='"+ name +"']").eq(0).removeAttr("checked",false);
				}	
			}
			function ajaxGetData(url, type){
				$.ajax({
					url:url,
					type:"get",
					success:function(data){
						$(".s-contact-left-box,.s-contact-center-box,.s-contact-right-box").show();
						if(type == "email"){
							if(data.ret=="success"){
								$(".s-contact-left-box").unbind('click');
								$(".s-contact-left-box").css("cursor","text");
				                $("input,select", ".s-contact-left").each(function (i) {
				                    var $this = $(this);
				                    $.each(data, function (index, item) {
				                    	if ($this.attr("name") == index) {
					                        if ($this.attr("name") == "ssl") {
												if($this.val() == item) {
													$this.prop("checked", true);
												}
					                        } else {
					                        	$this.val(item)
					                        }
				                    	} else if (index == "enabled" && $this.attr("name") == "e_status") {	
				                    		setInputChecked (item,"e_status")				
				                    	}
				                    })
				                });
							} else {
			                	$("input,select", ".s-contact-left").each(function (i) {
			                		$(this).attr('disabled', 'disabled');
			                		$(this).val('')
			                	})
		                		$("#email_test,#email_confirm").attr('disabled', 'disabled');
							}
		                }else if(type == "sms"){
							if(data.ret=="success"){
								$(".s-contact-center-box").unbind('click');
				                $("input,select", ".s-contact-center").each(function (i) {
				                    var $this = $(this);
				                    $.each(data, function (index, item) {
				                    	if ($this.attr("name") == index) {
											if (index == "serial_port"){
												var available_ports = data.available_ports,str  = "";
												for (var i= 0;i<available_ports.length;i++) {
													str += "<option value="
														+ available_ports[i] + ">"
														+ available_ports[i] + "</option>"
												}
												$("#port").html(str)
											}
				                        	$this.val(item)
				                   	 	} else if (index == "enabled" && $this.attr("name") == "p_status"){
											setInputChecked(item,"p_status")	
				                   	 	}
				                    })
				                }); 
				                $("#sended").text(data.sended);
			                } else {
			                	$("input,select", ".s-contact-center").each(function (i) {
			                		$(this).val('')
			                		$(this).attr('disabled', 'disabled');
			                	})
		                		$("#phone_test,#phone_confirm").attr('disabled', 'disabled');
			                }	
		                }else{
							if(data.ret=="success"){
								$(".s-contact-right-box").unbind('click');
				                $("input", ".s-contact-right").each(function (i) {
				                    var $this = $(this);
				                    $.each(data, function (index, item) {
				                    	if ($this.attr("name") == index) {
				                        	$this.val(item)
				                   	 	} else if (index == "enabled" && $this.attr("name") == "c_status"){
											setInputChecked(item,"c_status")	
				                   	 	}
				                    })
				                }); 
				                ajaxGetQR("/api/alarm/wechat/operation/");
			                } else {
			                	$("input,select", ".s-contact-right").each(function (i) {
			                		$(this).attr('disabled', 'disabled');
			                		$(this).val('')
			                	})
		                		$("#chat_test,#chat_confirm").attr('disabled', 'disabled');
			                }	
		                }
					},
					error: function(err) {
						$(".s-contact-left-box,.s-contact-center-box,.s-contact-right-box").show();
						switch (type){
							case "email":
			                	$("input,select", ".s-contact-left").each(function (i) {
			                		$(this).attr('disabled', 'disabled');
			                		$(this).val('')
			                	})
		                		$("#email_test,#email_confirm").attr('disabled', 'disabled');
								break;
							case "sms":
			                	$("input,select", ".s-contact-center").each(function (i) {
			                		$(this).val('')
			                		$(this).attr('disabled', 'disabled');
			                	})
		                		$("#phone_test,#phone_confirm").attr('disabled', 'disabled');
								break;
							case "chat":
			                	$("input,select", ".s-contact-right").each(function (i) {
			                		$(this).attr('disabled', 'disabled');
			                		$(this).val('')
			                	})
		                		$("#chat_test,#chat_confirm").attr('disabled', 'disabled');
								break;
						}
					}
				})
			}
			function ajaxGetQR(url){
				$(".qr-error-box,.qr-loading-box").hide();
				$(".qr-success-box").empty();
				$(".qr-loading-box").show();
				$.ajax({
					url:url,
					type:"get",
					success:function(data){
						$(".qr-loading-box").hide();
						$(".qr-success-box").html('<img class="qr-img qr-img-success" src='+url+' id="qr-img" />'+
				'<div class="qr-success-bottom">'+nls.qr_focus+'</div>')
					},	
					error: function(err) {
						$(".qr-loading-box").hide();
						$(".qr-success-box").empty();
						$(".qr-error-box").show();
					}
				})
			}
			$("#qr-box").unbind("click");
			$("#qr-box").on("click",function(e){
				e.stopPropagation();
				ajaxGetQR("/api/alarm/wechat/operation/");
			})
			function setInterval(targetID,countdown,contact_time){
				if (countdown == 0) { 
					window.contact_time.splice(window.contact_time.indexOf(targetID),1);
					$(targetID).removeAttr('disabled'); 
					$(targetID).find("#setinterval").text("");
					return ; 
				} else { 
					$(targetID).find("#setinterval").text(countdown+"s"); 
					countdown--; 
				} 
				setTimeout(function() { 
					setInterval(targetID,countdown) 
				},1000) 
			}
			function sendContactAjax(data, url ,thisDOM, thisID) {
				function errorDisplayHtml(){
					$(thisDOM).find(".layui-layer-move").show();
					setTimeout(function(){
						$(".layui-layer-move").hide();
					}, 2000);
				}
				$.ajax({
					type: "POST",
					url:url,
					data: JSON.stringify(data),
					contentType: "application/json",
					dataType: "json",
					success: function(data) {
						if (data.ret == "success") {
							$(thisID).attr('disabled', 'disabled');
							// 存在thisID说明是测试
							if (thisID) {
								if (thisID != "c_chat") {
									window.contact_time.push(thisID);
									setInterval(thisID, 60, contact_time);
									$(".layui-layer-move").css({
										"position": "fixed",
										"top": "30%"
									});
									$(thisDOM).find(".layui-layer-content").text(nls.send_success);
								} else {
									$(".layui-layer-move").css({
										"position": "absolute",
										"top": "50%"
									});
									$(thisDOM).find(".layui-layer-content").text(nls.send_success);
								}
							} else {
								$(".layui-layer-move").css({
									"position": "absolute",
									"top": "50%"
								});
								$(thisDOM).find(".layui-layer-content").text(nls.save_success)
							}
						} else {
							if (thisID) {
								if (thisID != "c_chat") {
									$(".layui-layer-move").css({
										"position": "fixed",
										"top": "30%"
									});
									$(thisDOM).find(".layui-layer-content").text(nls.send_error);
								} else {
									$(".layui-layer-move").css({
										"position": "absolute",
										"top": "50%"
									});
									$(thisDOM).find(".layui-layer-content").text(nls.send_error);
								}
							} else {
								$(".layui-layer-move").css({
									"position": "absolute",
									"top": "50%"
								});
								$(thisDOM).find(".layui-layer-content").text(nls.save_error)
							}
						}
						errorDisplayHtml()
					},
					error: function(err) {
						if(thisID){
							$(".layui-layer-move").css({"position":"fixed","top":"30%"});
						$(thisDOM).find(".layui-layer-content").text(nls.send_error);
						}else{
					      	$(".layui-layer-move").css({"position":"absolute","top":"50%"});
					      	$(thisDOM).find(".layui-layer-content").text(nls.save_error)
						}
						errorDisplayHtml()
					}
				});
			}
			var datas = {
				'datas': _.clone(nls, true)
			};
			$("#user,#require_smtp,#send_email,#password").off("change");
			$("#user").on("change", function() {
				_this.verificationfun("#user", "name");
			})
			$("#password").on("change", function() {
				_this.verificationfun("#password", "name");
			})
			$("#require_smtp").on("change", function() {
				_this.verificationfun("#require_smtp", "name");
			})
			$("#send_port").on("change", function() {
				_this.verificationfun("#send_port", "port");
			})
			$("#send_email").on("change", function() {
				_this.verificationfun("#send_email", "mail");
			})
			// 测试邮件点击
			$("#email_test").click(function() {
				contact_type = "email";
				$(".contact-modal-title").text(nls.email_title);
				datas.datas.type = 'email';
				testEmailInput("e_test");
			})
			// 测试短信点击
			$("#phone_test").click(function() {
				contact_type = "phone";
				$(".contact-modal-title").text(nls.phone_title);
				datas.datas.type = 'phone';
				testPhoneInput("p_test");
			});
			// 测试微信点击
			$("#chat_test").click(function() {
				testChatInput("c_test");
			});
			// 邮箱确认
			$("#email_confirm").unbind("click");
			$("#email_confirm").on("click", function() {
				testEmailInput("confirm_email")
			});

			// 短信确认
			$("#phone_confirm").unbind("click");
			$("#phone_confirm").on("click", function() {
				testPhoneInput("confirm_phone")
			});
			// 微信确认
			$("#chat_confirm").unbind("click");
			$("#chat_confirm").on("click", function() {
				testChatInput("confirm_chat")
			});

			$("#contact_miss").click(function(){
				$("#e_test_confirm, #p_test_confirm").hide();
			})
			function testEmailInput(type){
				if (_this.verificationfun("#user", "name") &&
					_this.verificationfun("#password", "name") &&
					_this.verificationfun("#require_smtp", "name") &&
					_this.verificationfun("#send_email", "mail") &&
					_this.verificationfun("#send_port", "port")
				) {
					var data = {
						"username": $.trim($("#user").val()),
						"password": $("#password").val(),
						"server_address": $("#require_smtp").val(),
						"sender_address": $("#send_email").val(),
						"server_port": Number($.trim($("#send_port").val())),
						"ssl":$("input[name='ssl']:checked").val(),
						"enabled": $("input[name='e_status']").prop("checked")
					}
					if(type=="e_test"){
						testConfirm("email",data)
					} else {
						sendContactAjax(data, urlConstants.alarm+"email/",".s-contact-left")
					}
				} else {
					_this.verificationfun("#user", "name");
					_this.verificationfun("#password", "name");
					_this.verificationfun("#send_email", "mail");
					_this.verificationfun("#require_smtp", "name");
					_this.verificationfun("#send_port", "port")
				}
			}
			function testPhoneInput(type){
				var data = {
					"serial_port": $("#port").val(),
					"modem": $("#modem").val(),
					"daily_limit": Number($("#num_max").val()),
					"enabled": $("input[name='p_status']").prop("checked")
				}
				if(type=="p_test"){
					testConfirm("phone",data)
				} else {
					sendContactAjax(data, urlConstants.alarm+"sms/",".s-contact-center")
				}
			}
			function testChatInput(type){
				var d={
					"enabled": $("input[name='c_status']").prop("checked")
				}
				if(type=="c_test"){
					// 邮件测试
					var data = {
						"type": "wechat",
						"config":d
					}
					sendContactAjax(data, urlConstants.alarm+'test/',".s-contact-right","c_chat");	
				} else {
					sendContactAjax(d, urlConstants.alarm+"wechat/",".s-contact-right")
				}
			}
			function testConfirm(type,d) {
				// 点击测试，要隐藏其他方式的提示框
				utils.hideMessageOnSpot("#user");
				utils.hideMessageOnSpot("#require_smtp");
				utils.hideMessageOnSpot("#send_email");
				utils.hideMessageOnSpot("#send_port");
				utils.hideMessageOnSpot("#password");
				$('#strategy_modal_body').html(_.template($('#test_modal_body').html())(datas));
				if(type == "email"){
					$("#e_test_confirm").show();
					$("#test_modal").modal("show");
				} else {
					$("#p_test_confirm").show();
					$("#test_modal").modal("show");
				} 
				$("#receive_email,#receive_phone").off("change");
				$("#receive_email").on("change", function() {
					_this.verificationfun("#receive_email", "mail");
				});
				$("#receive_phone").on("change", function() {
					_this.verificationfun("#receive_phone", "phone");
				});
				// 测试确认
				$("#e_test_confirm, #p_test_confirm").unbind("click");
				$("#e_test_confirm, #p_test_confirm").on("click", function() {
					var data={},
						url = urlConstants.alarm+"test/";
					if (type == "email") {
						data = {
							"type": "email",
							"target": $("#receive_email").val(),
							"config":d
						}
						if (_this.verificationfun("#receive_email", "mail")) {
							sendContactAjax(data, url,".s-contact-left","#e_test_confirm")
						} else{
							_this.verificationfun("#receive_email", "mail")
						}
					} else {
						data = {
							"type": "sms",
							"target": $("#receive_phone").val(),
							"config":d
						}
						if (_this.verificationfun("#receive_phone", "phone")) {
							sendContactAjax(data, url,".s-contact-center","#p_test_confirm")
						} else{
							_this.verificationfun("#receive_phone", "phone")
						}
					} 
				});
			}
		},
		//验证
		verificationfun: function(thisID, type ) {
			// console.log($(thisID).val())
			var isValid = false;
			var reg = /^\w*$/;
			var errMsgEmpty = "";
			var value = $.trim($(thisID).val());
			switch (type) {
				case "name":
					errMsgEmpty = nls.empty;
					reg = /\S/;
					break;
				case "port":
                    reg = /^[0-9]{1,5}$/
                    errMsgEmpty = nls.alarm_threshold;
					break;
				case "mail":
					reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
					errMsgEmpty = nls.alarm_mail;
					break;
				case "phone":
					reg = /^[1][3-8]\d{9}$/
					errMsgEmpty = nls.alarm_phone;
					break;

			}
			if (value == "") {
				utils.showMessageOnSpot(thisID, errMsgEmpty);
			} else {
				if (!reg.test(value)) {
					utils.showMessageOnSpot(thisID, errMsgEmpty);
				} else {
					utils.hideMessageOnSpot(thisID);
					isValid = true;
				}
			}
			return isValid;
		}
	});
});
