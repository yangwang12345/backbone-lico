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
    'utils/utils',
    'utils/constants/urlConstants',
    'utils/constants/constants',
    'utils/eventBus',
    'text!./templates/strategyCtrlTmpl.mustache',
    'i18n!./nls/strategy',
    'css!./style/strategy.css'
], function ($, Marionette, bootstrap, dataTable, datatable_bootstrap,
             utils, urlConstants, constants, eventBus, template, nls) {
    return Marionette.ItemView.extend({
        template: template,
        templateHelpers: function () {
            return {
                nls: nls
            };
        },
        onRender: function () {
            var __this = this;
            var modal_flag;
            var policy_name_array=[];
            var alarmurlimg = "/static/js/customUI/strategy/img/";
            //-----------------cj
            var submitBtn = new Object;
            $('body').css("background-color", "#ffffff")
            $("#strategyTable").DataTable({
                // processing: true, //启动后端数据处理
                serverSide: true, //启动后端分页
                paging: true,
                info: true,
                searching:false,
                columns: [{
                    'data': 'id',
                    'title': nls.policy_id
                },{
                    'data': 'policy_name',
                    'title': nls.policy_name
                }, {
                    'data': 'policy_level',
                    'title': nls.policy_level
                }, {
                    'data': 'status',
                    'title': nls.status
                }, {
                    'data': null,
                    'title': nls.operation
                }],
                ajax: {
                    // url: 'static/js/customUI/strategy/data/strategy.json',
                    url: '/api/alarm/policy/',
                    dataSrc: function(res) {
                        $.each(res.data,function(index,item){
                            policy_name_array.push(item.policy_name)
                        })
                        return res.data;
                    },
                    data: function (args) {
                        return {
                            "args": JSON.stringify(args)
                        };
                    }
                },
                language: {
                    "url": require.toUrl('') + "translation/datatables.chinese.json"
                },
                rowCallback: function (row, data, index) {
                    var urlimg = "/static/js/customUI/monitor/widgets/alarm/img/";
                    var urlstatus = "",level_title,s_policy_level;
                    switch (data.status.toLowerCase()) {
                        case "on":
                            $('td:eq(3)', row).css({
                                "color": "#48cb5b"
                            });
                            $('td:eq(3)', row).html(nls.enabled);
                            break;
                        case "off":
                            $('td:eq(3)', row).css({
                                "color": "#d60000"
                            });
                            $('td:eq(3)', row).html(nls.unabled);
                            break;
                    }
                        switch (Number(data.policy_level)){
                        case 50:
                            s_policy_level="fatal";
                            break;
                        case 40:
                            s_policy_level="error";
                            break;
                        case 30:
                            s_policy_level="warn";
                            break;
                        case 20:
                            s_policy_level="info";
                            break;
                    }
                    level_title=nls["alarm_"+ s_policy_level];
                    $('td:eq(2)', row).html('<img title='+ level_title +' src=' + urlimg + s_policy_level + '28.png>');
                },
                columnDefs: [{
                    "orderable": false,
                    "targets": 4,
                    "data": null,
                    "defaultContent": "<i class='' id='strategy_edit' title='" + nls.alarm_edit
                                    + "'></i><i class='' id='strategy_delete' title='" + nls.alarmdelete
                                    + "'></i>"
                }]
            });
            $("#alarm_policy_metric").change(function(){
                if($(this).val() == "NODE_ACTIVE"){
                    $("#alarm_policy_condition").val("$eq").attr("disabled","disabled");
                    $("#alarm_threshold").val(0).attr("disabled","disabled");
                    $("#alarm_continued_time").attr("disabled",false);
                }else if($(this).val() == "HARDWARE"){
                    $("#alarm_policy_condition").val("$eq").attr("disabled","disabled");
                    $("#alarm_threshold").val(0).attr("disabled","disabled");
                    $("#alarm_continued_time").val(0).attr("disabled","disabled");
                }else  {
                    $("#alarm_policy_condition").val("$gt").attr("disabled",false);
                    $("#alarm_threshold").val("").attr("disabled",false);
                    $("#alarm_continued_time").val("").attr("disabled",false);
                }
            });
            // 添加
            $("#strategy_add").unbind("click");
            $("#strategy_add").on("click", function () {
                modal_flag = true;
                $("input[name='policy_name'],select[name='policy_metric']").attr("readonly", false);
                $("input[name='policy_name'],select[name='policy_metric']").attr("disabled", false);
                $(".strategy-modal-title").text(nls.add_title);
                ($("#strategy_modal_form"))[0].reset();
                $("#input_on").prop("checked",true);
                $("input[name='policy_name'],select[name='policy_metric']").attr("readonly", false);
                $("#strategy_modal").modal("show");
                submitFormBtn();
            });
			// 删除
			$('#strategyTable').on('click', '#strategy_delete', function() {
			    var id=$('#strategyTable').DataTable().row($(this).parents('tr')).data().id;
                $("#delete_alarmpolicy_modal").modal("show");
                $("#delete_alarm_policy").off("click");
                $("#delete_alarm_policy").on("click", function () {
                    modifyAlarmPolicy(id, "delete")
                })
            })
            // 编辑
            $('#strategyTable').on('click', '#strategy_edit', function () {
                modal_flag = false;
                var _this = this,
                data = $('#strategyTable').DataTable().row($(_this).parents('tr')).data();
                $("input[name='policy_name'],select[name='policy_metric']").attr("readonly", true);
                $("input[name='policy_name'],select[name='policy_metric']").attr("disabled", true);
                $(".strategy-modal-title").text(nls.edit_title);
                $("input,textarea,select", "#strategy_modal_form").each(function (i) {
                    var $this = $(this);
                    $("input[name='policy_name'],select[name='policy_metric']").attr("readonly", true);
                    $.each(data, function (index, item) {
                        if ($this.attr("name") == index) {
                            if ($this.attr("name") == "portal") {
                                $.each(item, function (i, v) {
                                    $this.val(i);
                                    $("#alarm_threshold").val(v)
                                    if($("#alarm_policy_metric").val() == "CPUSAGE" || $("#alarm_policy_metric").val() == "DISK"){
                                        $("#alarm_threshold").val(parseInt(v*100))
                                    }
                                })
                            } else if ($this.attr("name") == "nodes" || $this.attr("name") == "policy_sms" || $this.attr("name") == "policy_email") {
                                if(item.length > 0){
                                    $this.val(item.join(","))
                                } else{
                                    $this.val("")
                                }
                            } else if($this.attr("name") == "policy_script"){
                                if(item == ""){
                                    //$this.val(nls.alarm_policy_please);
                                    $this.children("option")[0].selected = true;
                                }else
                                    $this.val(item);
                            } else if($this.attr("name") == "policy_wechat" || $this.attr("name") == "policy_sound"){
                                if(item){
                                    $this.prop("checked",true);
                                }else {
                                    $this.removeAttr("checked",false);
                                }
                            } else if($this.attr("name") == "status"){
                                if( item == "OFF"){
                                    $("#input_on").removeAttr("checked",false);
                                    $("#input_off").prop("checked",true);
                                } else {
                                   $("#input_on").prop("checked",true);
                                   $("#input_off").removeAttr("checked",false);
                                }
                            } else {
                                $this.val(item)
                            }
                        }
                    })
                });
                $("#strategy_modal").modal("show");
                submitFormBtn(data.id)
            });
            // 确认按钮
            function submitFormBtn(id) {
                if($("#alarm_policy_metric").val() == "NODE_ACTIVE"){
                    $("#alarm_policy_condition").attr("disabled","disabled");
                    $("#alarm_threshold").attr("disabled","disabled");
                    $("#alarm_continued_time").attr("disabled",false);
                }else if($("#alarm_policy_metric").val() == "HARDWARE"){
                    $("#alarm_policy_condition").attr("disabled","disabled");
                    $("#alarm_threshold").attr("disabled","disabled");
                    $("#alarm_continued_time").attr("disabled","disabled");
                }else {
                    $("#alarm_policy_condition").attr("disabled",false);
                    $("#alarm_threshold").attr("disabled",false);
                    $("#alarm_continued_time").attr("disabled",false);
                }

                utils.hideMessageOnSpot("#alarm_policy_name");
                utils.hideMessageOnSpot("#alarm_threshold");
                utils.hideMessageOnSpot("#alarm_continued_time");
                utils.hideMessageOnSpot("#alarm_policy_email");
                utils.hideMessageOnSpot("#alarm_policy_phone");
                $("#alarm_policy_name,#alarm_threshold,#alarm_continued_time,#alarm_policy_email,#alarm_policy_phone").off("change")

                $("#alarm_policy_name").on("change", function () {
                    submitBtn.verificationfun("#alarm_policy_name", "name")
                })
                $("#alarm_threshold").on("change", function () {
                    submitBtn.verificationfun("#alarm_threshold", "threshold");
                })
                $("#alarm_continued_time").on("change", function () {
                    submitBtn.verificationfun("#alarm_continued_time", "time");
                })
                $("#alarm_policy_email").on("change", function () {
                    submitBtn.verificationEP("#alarm_policy_email", "mail");
                })
                $("#alarm_policy_phone").on("change", function () {
                    submitBtn.verificationEP("#alarm_policy_phone", "phone");
                })

                $("#add_edit_confirm").off("click");
                $("#add_edit_confirm").on("click", function () {
                    var verificationPname;
                    if (!id) {
                        verificationPname=submitBtn.verificationfun("#alarm_policy_name", "name")
                    } else {
                        verificationPname=true;
                    }
                    if (verificationPname &&
                        submitBtn.verificationfun("#alarm_threshold", "threshold") &&
                        submitBtn.verificationfun("#alarm_continued_time", "time") &&
                        submitBtn.verificationEP("#alarm_policy_email", "mail") &&
                        submitBtn.verificationEP("#alarm_policy_phone", "phone")
                    ) {
                        var type = "modify";
                        if (!id) {
                            id = "";
                            type = "add";
                        }
                        modifyAlarmPolicy(id, type)
                    } else {
                        if (!id) {
                            verificationPname;
                        }
                        submitBtn.verificationfun("#alarm_threshold", "threshold");
                        submitBtn.verificationfun("#alarm_continued_time", "time");
                    }
                });
            }
            //----------- mail or phone 验证
            submitBtn.verificationEP = function (thisID, type) {
                var isValid = true;
                var value = $.trim($(thisID).val());
                var errMsgEmpty = "";
                if (type == "mail") {
                    errMsgEmpty = nls.alarm_mail_mul
                } else {
                    errMsgEmpty = nls.alarm_phone
                }
                if (value != "") {
                    //---------去除末尾多余的分号
                    if (/[,]$/.test(value)) {
                        value = value.substr(-0, value.length - 1);
                        $(thisID).val(value);
                    }
                    //分析是否有多个value
                    if (/\,/.test(value)) {
                        var arr = value.split(",");
                        for (var i = 0; i < arr.length; i++) {
                            if(arr[i].length>250){
                                utils.showMessageOnSpot(thisID, errMsgEmpty);
                                isValid = false;
                                break;
                            } else {
                                if (!submitBtn.verificationfun("", type, arr[i])) {
                                    utils.showMessageOnSpot(thisID, errMsgEmpty);
                                    isValid = false;
                                    break;
                                }
                            }
                        }
                        if(isValid){
                            utils.hideMessageOnSpot(thisID);
                        }
                    } else {
                        if(value.length<250){
                            if(!submitBtn.verificationfun(thisID, type, value)){
                                isValid = false;
                            }
                        } else {
                            utils.showMessageOnSpot(thisID, errMsgEmpty);
                        }
                    }
                } else {
                    utils.hideMessageOnSpot(thisID);
                }
                return isValid;
            }
            //----------- 验证
            submitBtn.verificationfun = function (thisID, type, value) {
                var isValid = false;
                var reg = /^\w*$/;
                var errMsgEmpty = "";
                var value;
                if (type == "mail" || type == "phone") {
                    value = value;
                } else {
                    value = $.trim($(thisID).val());
                }

                switch (type) {
                    case "textareaLen":
                        errMsgEmpty = nls.alarm_textareaLen;
                        break;
                    case "name":
                        reg = /^[a-zA-z\u3007\u4E00-\u9FCB\uE815-\uE864][\S\s?]{3,15}$/;
                        errMsgEmpty = nls.alarm_name;
                        break;
                    case "threshold":
                        reg = /^[0-9]{1,5}$/
                        errMsgEmpty = nls.alarm_threshold;
                        break;
                    case "time":
                        reg = /^[0-9]{1,15}$/
                        errMsgEmpty = nls.alarm_time;
                        break;
                    case "mail":
                        reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                        errMsgEmpty = nls.alarm_mail_mul;
                        break;
                    case "phone":
                        reg = /^[1][3-8]\d{9}$/
                        errMsgEmpty = nls.alarm_phone;
                        break;

                }
                if(type=="textareaLen"){
                    if (value.length>250) {
                        utils.showMessageOnSpot(thisID, errMsgEmpty);
                    } else {
                        utils.hideMessageOnSpot(thisID);
                        isValid = true;
                    }
                } else {
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
                }
                return isValid;
            }

            function modifyVal(value, type) {
                var arr = []
                if (value == "") {
                    if (type == "nodes") {
                        arr.push("all")
                    }
                } else {
                    if (/[,]$/.test(value)) {
                        value = value.substr(-0, value.length - 1);
                    }
                    if (/\,/.test(value)) {
                        arr = value.split(",")
                    } else {
                        arr.push(value)
                    }
                }
                return arr
            }

            //----------- add and modify or delete
            function modifyAlarmPolicy(id, type) {
                var nodes = modifyVal($.trim($("#alarm_policy_nodes").val()), "nodes"),
                    policy_sms = modifyVal($.trim($("#alarm_policy_phone").val())),
                    policy_email = modifyVal($.trim($("#alarm_policy_email").val()));

                var porta = {}, data = {};
                var portas = Number($.trim($("#alarm_threshold").val()))
                var policy_wechat = false;
                var policy_sound = false;
                if($("#input_chat").get(0).checked){
                    policy_wechat = true;
                }
                if($("#input_voice").get(0).checked){
                    policy_sound = true;
                }
                if (($("#alarm_policy_metric").val() == "CPUSAGE" || $("#alarm_policy_metric").val() == "DISK")&& portas >= 1){
                    portas = portas/100;
                }
                if ($("#alarm_policy_condition").val() == "$gt") {
                    porta = {
                        "$gt": portas
                    }
                } else if ($("#alarm_policy_condition").val() == "$lt") {
                    porta = {
                        "$lt": portas
                    }
                } else {
                    porta = {
                        "$eq": portas
                    }
                }
                if (type != "delete" ) {
                    data = {
                        "policy_name": $.trim($("#alarm_policy_name").val()),
                        "policy_metric": $("#alarm_policy_metric").val(),
                        "duration": Number($.trim($("#alarm_continued_time").val())),
                        "portal": porta,
                        "nodes": nodes,
                        "policy_level": Number($("#alarm_policy_level").val()),
                        "policy_sms": policy_sms,
                        "policy_email": policy_email,
                        "status": $("input[name='status']:checked").val(),
                        "operation": type,
                        "policy_wechat": policy_wechat,
                        "policy_sound": policy_sound,
                        "policy_script": $("#alarm_policy_script").val()
                    };
                    if(type == "modify"){
                        data.id = id;
                    }
                } else {
                    data = {
                        "id": id,
                        "operation": type
                    }
                }
                $.ajax({
                    type: "POST",
                    url: urlConstants.alarm +"policy/",
                    data: JSON.stringify(data),
                    contentType: "application/json",
                    dataType: "json",
                    success: function (data) {
                        if (data.ret == "success") {
	                        $("#strategy_modal").modal("hide");
	                        $("#delete_alarmpolicy_modal").modal("hide");
                            __this.refresh(__this);
                        } else {
                            $(".layui-layer-move").show();
                            setTimeout(function(){
                                $(".layui-layer-move").hide();
                            }, 2000);
                        }
                    },
                    error: function (err) {
                        $(".layui-layer-move").show();
                        setTimeout(function(){
                            $(".layui-layer-move").hide();
                        }, 2000);
                    }
                });
            }

            __this.modle_sctipt_list();
        },
        modle_sctipt_list:function(){
            $.ajax({
                type: "GET",
                url: urlConstants.alarm +"scripts/",
                contentType: "application/json",
                dataType: "json",
                success: function (data) {
                    if (data.data.length >= 0) {
                        var str = "<option value=''>" + nls.alarm_policy_please + "</option>";
                        for(var i=0;i<data.data.length;i++){
                            str += "<option value='"+ data.data[i].name +"'>"+ data.data[i].name +"</option>"
                        }
                        $("#alarm_policy_script").html(str);
                    }
                },
                error: function (err) {

                }
            });
        },
        refresh: function (thisViewObj) {
            var table = $('#strategyTable').DataTable();
            table.ajax.reload(null, false);
        }
    });
});
