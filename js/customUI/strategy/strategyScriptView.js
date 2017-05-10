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
    'text!./templates/strategyScriptTmpl.mustache',
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
            $('body').css("background-color", "#ffffff");
            //-------------上传 模态框
            $("#alarm_script_upload").on("click",function(){
                $("#alarm_script_upload_modle").modal("show");
            });
            $("#choose").change(function () {
                $("#upfile").val(this.value.substr(this.value.lastIndexOf("\\")+1));
            })
            //------上传确认
            $("#alarm_upload_confirm").on('click',function(){
                // var file=$('#choose').get(0).files;
                var file=$('#choose').prop('files')
                if(file.length<1){
                    alert(nls.choose);
                } else {
                    var formData = new FormData();
                    formData.append('file',file[0])
                    $.ajax({
                        type: 'POST',
                        url: '/api/alarm/script/',
                        contentType: false,
                        processData: false,
                        data: formData,
                        success: function(data){
                            $("#alarm_script_upload_modle").modal("hide");
                            $("#upfile").val('');
                            __this.refresh();                        
                        }
                    });
                }
            });

            $('#alarm_script_table').on('click', '#script_download', function() {
                var name=$('#alarm_script_table').DataTable().row($(this).parents('tr')).data().name;
                window.location='/api/alarm/script/'+name
            })

            //--------------多行删除
            $("#alarm_script_delete").on('click',function(){
                var input = $("input:not(#checkbox_id_all):checked"),arr = [];
                if (input.length>0){
                    for (var i=0;i<input.length;i++){
                        arr.push(input[i].value)
                    }
                    modifymodle(arr,"delete");
                }
            })
            // 删除
            $('#alarm_script_table').on('click', '#strategy_delete', function() {
                var name=$('#alarm_script_table').DataTable().row($(this).parents('tr')).data().name;
                var arr = []; arr.push(name)
                modifymodle(arr,"delete");

            })

            //---------- 重命名 模态框
            $('#alarm_script_table').on('click', '#strategy_edit', function () {
                var name=$('#alarm_script_table').DataTable().row($(this).parents('tr')).data().name;
                var arr = []; arr.push(name);
                modifymodle(arr,"rename");
            });

            $("#alarm_script_table").DataTable({
                // serverSide: true, //启动后端分页
                paging: true,
                info: true,
                searching:false,
                orderable:true,
                columns: [
                {
                    "data": null,
                    "title": "<input id=\"checkbox_id_all\" name=\"checkbox_name_all\" type=\"checkbox\" value=\"\">",
                    'className':'dt-center'
                }, {
                    'data': null,
                    'orderable': false,
                    'className':'dt-center',
                    'width':"18px",
                    'title': ""
                },{
                    'data': 'name',
                    'className':"dt-left",
                    'title': nls.script_name
                }, {
                    'data': 'size',
                    'title': nls.script_size,
                    'className':'dt-center'
                }, {
                    'data': 'modify_time',
                    'title': nls.script_modifyTime,
                    'className':'dt-center'
                }
                , {
                    "data":null,
                    'title': nls.script_edit,
                    'className':'dt-center'
                }
                ],
                ajax: {
                    //url: 'static/js/customUI/strategy/data/scriptTest.json',
                    url: urlConstants.alarm +"scripts/",
                },
                language: {
                    "url": require.toUrl('') + "translation/datatables.chinese.json"
                },
                rowCallback: function (row, data, index) {
                    var urlimg = "/static/js/customUI/strategy/img/";
                    var name = data.name,img,num = data.size,temp = 1024,conversion_num = 0;
                    var company = ["B","K","M","G","T"]
                    var str = name.substr(name.lastIndexOf(".")+1);
                    switch (str){
                        case "py":
                            img = "PY_18x18.png";
                            break
                        case "pl":
                            img = "PL_18x18.png";
                            break
                        case "sh":
                            img = "SH_18x18.png";
                            break
                        default :
                            img = "unknown_18x18.png";
                            break
                    }
                    Aconversion();
                    function Aconversion(){
                        if(num > temp){
                            Bconversion();
                            conversion_num++;
                        }
                    }
                    function Bconversion(){
                        num = num / temp
                        Aconversion()
                    }
                    num = num.toFixed(2);
                    $('td:eq(0)', row).children("input").val(data.name);
                    $('td:eq(1)', row).html("<img src='" + urlimg + img +"'>");
                    $('td:eq(2)', row).html(data.name).css('padding-left','18px');
                    //$('td:eq(1)', row).html("<img src='" + urlimg + img +"'style='margin-right:27px;'>" + data.name);
                    $('td:eq(3)', row).html(num + company[conversion_num]);
                },
                order: [
                    [1, 'dest']
                ],
                columnDefs: [{
                    "orderable": false,
                    "targets": 0,
                    "data": null,
                    "defaultContent": '<input type="checkbox" value="" name="checkname">'
                },{
                    "orderable": false,
                    "targets": 5,
                    "data": null,
                    "defaultContent": "<i class='' id='script_download' title='" + nls.alarm_script_download
                                    + "'></i><i class='' id='strategy_edit' title='" + nls.alarm_script_rename_title
                                    + "'></i><i class='' id='strategy_delete' title='" + nls.alarmdelete
                                    + "'></i>"
                }]
            });

            //---------全选，取消全选
            $("#alarm_script_table.table").on("click", "input[type='checkbox']", function() {
                //var input = $("#alarmTable.table").find('input');
                var input = $("input:not(#checkbox_id_all)");
                var key = false,temp_num = 0;
                //console.log($(this).find(input));
                if ($(this).attr('id') == "checkbox_id_all") {
                    if ($("#checkbox_id_all").attr('checked') == 'checked') {
                        $("#alarm_script_table input").removeAttr('checked', false);
                    } else {
                        $("#alarm_script_table input").prop('checked', true);
                        $("#checkbox_id_all").attr('checked', 'checked');
                    }
                }
                for (var i = 0; i < input.length; i++) {
                    if (input[i].checked) {
                        temp_num++;
                        key = true;
                    }
                }
                if(temp_num < 1){
                    $("#checkbox_id_all").removeAttr('checked', false)
                }
                if (key) {
                    $("#alarm_script_delete").removeAttr('disabled');
                } else {
                    $("#alarm_script_delete").attr('disabled', 'disabled');
                }
            })

            var num = 0
            function modifymodle(arr,type){
                num = 0
                var modle_id = "",btn_id = ""
                if(type == "delete"){
                    modle_id = "#delete_script_modal";
                    btn_id = "#delete_alarm_policy";
                }else if(type == "rename"){
                    modle_id = "#alarm_script_rename_modle";
                    btn_id = "#alarm_script_rename_btn";
                    $("#alarm_script_rename_text").val(arr[0])
                }
                $(modle_id).modal("show");
                $(btn_id).off();
                $(btn_id).on('click', function () {
                    $.each(arr,function(index,item){
                        var data = {
                            "operation":type,
                            "script":item
                        }
                        if (type == "rename") {
                            data.data = {
                                "rename": $("#alarm_script_rename_text").val()
                            };
                        }
                        scriptModify(data,index,arr.length)
                    })
                });
            }

            function scriptModify(data,index,len){
                var type = data.operation;
                $.ajax({
                    type: "POST",
                    url: "/api/alarm/script/operation/",
                    data: JSON.stringify(data),
                    contentType: "application/json",
                    dataType: "json",
                    success: function (data) {
                        if(len==1||index==len-1) {
                            $("#delete_script_modal").modal("hide");
                            $("#alarm_script_rename_modle").modal("hide");
                            __this.refresh();  
                        }
                    },
                    error: function (err) {
                        if(type == "rename" && err.responseJSON.msg == "FileAlreadyExist: " + data.data.rename){
                            $(".layui-layer-move").show();
                            $(".layui-layer-content").text(data.data.rename + nls.alarm_script_rename_please);
                            setTimeout(function(){
                                $(".layui-layer-move").hide();
                            }, 3000);
                        }
                    }
                })
            }
        },
        refresh: function () {
            var table = $('#alarm_script_table').DataTable();
            table.ajax.reload(null, false);
        }
    });
});
