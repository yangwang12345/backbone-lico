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
    'datatables',
    'datatables_bootstrap',
    'dataTables_tableTools',
    'term',
    'termwindow',
    'language',
    'util',
    'utils/constants/urlConstants',
    'utils/constants/constants',
    'utils/eventBus',
    'customUI/monitor/widgets/listView/weight/modal/modalView',
    'customUI/monitor/widgets/singleNodeDetails/nodeInfoModle/nodeInfoModleView',
    'text!./templates/listViewTmpl.mustache',
    'i18n!./nls/listView',
    'css!./style/listView.css'
], function (Marionette, bootstrap, datatables, datatables_bootstrap, dataTables_tableTools, term, termwindow,
             language, util, urlConstants, constants, eventBus, modalView, 
             nodeInfoModleView,template, nls) {
    return Marionette.ItemView.extend({
        template: template,
        templateHelpers: function () {
            return {
                nls: nls
            };
        },

        ui: {
            gListTable: '#gListTable'
        },

        nodeStatusArr: [],
        nodeTypeArr: [],

        onDestroy: function () {
            // custom cleanup or destroying code, here
            $("body").css("background-color", "#F6F6F4");

        },


        onShow: function () {

            var modal = new modalView({el: $('#modalShow')});

            modal.render();


            $("body").css("background-color", "#ffffff");

            var _this = this;

            _this.nodeStatusArr = [];

            _this.nodeTypeArr = [];

            var _this = this;
            var id = this.options.id;
            this.ui.gListTable.dataTable({
            	
                "serverSide": true,
          	    "searchDelay": 1000,
//          	    processing: true, //启动后端数据处理
				serverSide: true, //启动后端分页
				paging: true,
				info: true,
				destory: true,
				stateSave: false,
					
                responsive: true,
                bPaginate: true,
                bInfo: true,
                sLengthMenu: '',
                bLengthChange: true,
                language: {
                    "sProcessing": "处理中...",
                    "sLengthMenu": "显示 _MENU_ 项结果",
                    "sZeroRecords": "没有匹配结果",
                    "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                    "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                    "sInfoPostFix": "",
                    "sSearch": "搜索:",
                    "sUrl": "",
                    "sEmptyTable": "表中数据为空",
                    "sLoadingRecords": "载入中...",
                    "sInfoThousands": ",",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "上页",
                        "sNext": "下页",
                        "sLast": "末页"
                    },
                    "oAria": {
                        "sSortAscending": ": 以升序排列此列",
                        "sSortDescending": ": 以降序排列此列"
                    }
                },
                columnDefs:[{
                     orderable:false,//禁用排序
                     targets:[0,8,9]   //指定的列
                    }],
                columns: [
                    {
                        data: null,
                        "title": "<input id=\"checkbox_id_all\" name=\"checkbox_name_all\" type=\"checkbox\" value=\"\">",
                        'className': 'dt-center'
                    },
                    {'data': 'hostname', 'title': nls.nodeName, 'className': 'dt-left',"sWidth": "110px"},
                    {'data': 'status', 'title': nls.nodeStatus, 'className': 'dt-center'},
                    {'data': 'power_status', 'title': nls.monitor_turn_on_off, 'className': 'dt-center'},
                    {'data': 'type', 'title': nls.nodeType, 'className': 'dt-center'},
                    {'data': 'bmc_ipv4', 'title': nls.managementIP, 'className': 'dt-center'},
                    {'data': 'mgt_ipv4', 'title': nls.OSIP, 'className': 'dt-center'},
                    {'data': 'cpuCores', 'title': nls.CPUCores, 'className': 'dt-center'},
                    {'data': 'memoryUsage', 'title': nls.usedMemory + "/" + nls.totalMemory, 'className': 'dt-center'},
                    {
                        'data': 'storageUsage',
                        'title': nls.usedStorage + "/" + nls.totleStorage,
                        'className': 'dt-center'
                    },
                    {'data': 'groups', 'title': nls.groups, 'className': 'dt-center'}
                ],
                aaSorting: [[1, "desc"]],
                aoColumnDefs: [//设置列的属性，此处设置第一列不排序,
                    {
                        "bSortable": false,
                        "targets": 0,
                        "data": null,
                        "defaultContent": '<input type="checkbox" value="" name="checkname">'
                    },
                    {
                        "targets": [1], // 目标列位置，下标从0开始
                        "data": "hostname", // 数据列名
                        "render": function (data, type, full) { // 返回自定义内容
                            return "<div style='float:left;width:105px;word-wrap:break-word;' >" + data + "</div>" + "<span class='g_monitor_node_details' id='g_icon_details' title='" + nls.prompt_node_details + "'></span>";
                        }
                    },
                    {
                        "targets": [3], // 目标列位置，下标从0开始
                        "data": "power_status", // 数据列名
                        "render": function (data, type, full) { // 返回自定义内容
                            if (data.toLowerCase() == "off") {
                                return "<span class='g_list_power_on' id='g_icon_on'  title='" + nls.prompt_power_on + "'></span>";
                            } else {
                                return "<span class='g_list_power_off' id='g_icon_off'  title='" + nls.prompt_power_off + "'></span>";
                            }
                        }
                    },
                    {
                        "targets": [5], // 目标列位置，下标从0开始
                        "data": "bmc_ipv4", // 数据列名
                        "render": function (data, type, full) { // 返回自定义内容
                            if (data != "") {
                                return '<a href="https://' + data + '" target="_blank">' + data + '</a>' + "<span class='g_list_kvm' id='g_icon_kvm' title='" + nls.prompt_kvm + "'></span>"
                            } else {
                                return "<span class='g_list_kvm' id='g_icon_kvm' title='" + nls.prompt_kvm + "'></span>"
                            }
                        }
                    },
                    {
                        "targets": [6], // 目标列位置，下标从0开始
                        "data": "mgt_ipv4", // 数据列名
                        "render": function (data, type, full) { // 返回自定义内容
                            return data + "<span class='g_list_ssh' id='g_icon_ssh' title='" + nls.prompt_ssh + "'></span>"
                        }
                    },
                    {
                        "bSortable": false,
                        "targets": [8]  
                    },{
                        "bSortable": false,
                        "targets": [9]  
                    }
                ],
                ajax: {
                    'url': urlConstants.nodes,
                    // 'url':'/static/js/customUI/monitor/widgets/groups/groupView/widgets/gListView/data/gList.json',
                    'data': function(args) {
                    	
                    	   // console.log(args.search.value);
                    	    
                    	    var search_value=args.search.value;
                    	    
                    	        args.search.translated="false";
                    	        
                    	    if(search_value=="开机"){
                    	    	
                    	    	args.search.value="On";
                    	    	args.search.translated="true";
                    	    	
                    	    }else if(search_value=="关机"){
                    	    	
                    	    	args.search.value="Off";
                    	    	args.search.translated="true";
                    	    	
                    	    }else if(search_value=="忙碌"){
                    	    	
                    	    	args.search.value="Busy";
                    	    	args.search.translated="true";
                    	    	
                    	    }else if(search_value=="已占用"){
                    	    	
                    	    	args.search.value="Used";
                    	    	args.search.translated="true";
                    	    	
                    	    }else if(search_value=="空闲"){
                    	    	
                    	    	args.search.value="Idle";
                    	    	args.search.translated="true";
                    	    	
                    	    }else if(search_value=="管理节点"){
                    	    	
                    	    	args.search.value="head";
                    	    	args.search.translated="true";
                    	    	
                    	    }else if(search_value=="登陆节点"){
                    	    	
                    	    	args.search.value="login";
                    	    	args.search.translated="true";
                    	    	
                    	    }else if(search_value=="计算节点"){
                    	    	
                    	    	args.search.value="compute";
                    	    	args.search.translated="true";
                    	    	
                    	    }else if(search_value=="I/O节点"){
                    	    	
                    	    	args.search.value="io";
                    	    	args.search.translated="true";
                    	    	
                    	    }else if(search_value=="服务节点"){
                    	    	
                    	    	args.search.value="service";
                    	    	args.search.translated="true";
                    	    }
                    	    
							return {
								"args": JSON.stringify(args),
							};
						},
                    
                    'dataSrc': function (res) {

                        //console.log(res);

                        var data = res.nodes,
                            _nodeStatus = [],
                            _nodesType = [];
                        $.each(data, function (index, item) {
                            var _usedMemory = parseInt(item.memory_used / 1024),
                                _totalMemory = parseInt(item.memory_total / 1024),
                                _usedStorage = parseInt(item.disk_used),
                                _totalStorage = parseInt(item.disk_total),
                                _typeArr = item.type.split(',');
                            item['memoryUsage'] = _usedMemory + "GB/" + _totalMemory + "GB";
                            item['storageUsage'] = _usedStorage + "GB/" + _totalStorage + "GB";
                            item['cpuCores'] = item.processors_total + nls.CPUCoreUnit;
                            switch (item.status.toLowerCase()) {
                                case "off":
                                    item.status = nls.offStatus;
                                    break;
                                case "busy":
                                    item.status = nls.busyStatus;
                                    break;
                                case "used":
                                    item.status = nls.workingStatus;
                                    break;
                                case "idle":
                                    item.status = nls.idleStatus;
                                    break;
                            }
                            $.each(_typeArr, function (i, type) {
                                switch (type.toLowerCase()) {
                                    case "head":
                                        _typeArr[i] = nls.headNodeType;
                                        break;
                                    case "compute":
                                        _typeArr[i] = nls.computeNodeType;
                                        break;
                                    case "gpu":
                                        _typeArr[i] = nls.gpuNodeType;
                                    
                                        break;
                                    case "io":
                                        _typeArr[i] = nls.ioNodeType;
                                        break;
                                    case "login":
                                        _typeArr[i] = nls.loginNodeType;
                                        break;
                                    case "service":
                                        _typeArr[i] = nls.serviceNodeType;
                                        break;
                                }
                                if ($.inArray(_typeArr[i], _nodesType) == -1) {
                                    if ($.trim(_typeArr[i]) != '') {
                                        _nodesType.push(_typeArr[i]);
                                    }
                                }
                            });
                            item.type = _typeArr.join(',');
                            if ($.inArray(item.status, _nodeStatus) == -1) {
                                if ($.trim(item.status) != '') {
                                    _nodeStatus.push(item.status);
                                }
                            }
                        });
                        _this.nodeStatusArr = _nodeStatus;
                        _this.nodeTypeArr = _nodesType;
                        return data;
                    }
                }
            });


            $('#gListTable').click(function () {
                var _checkedLen = $("input:checked:not(#checkbox_id_all)").length;
                if (_checkedLen > 0) {
                    $('#g_shutup').removeAttr('disabled');
                    $('#g_shutdown').removeAttr('disabled');
                    $('#g_kvm').removeAttr('disabled');
                    $('#g_ssh').removeAttr('disabled');
                } else {
                    $('#g_node').attr('disabled', 'disabled');
                    $('#g_shutup').attr('disabled', 'disabled');
                    $('#g_shutdown').attr('disabled', 'disabled');
                    $('#g_kvm').attr('disabled', 'disabled');
                    $('#g_ssh').attr('disabled', 'disabled');
                }
                ;
            });
            // 点击单个input框
            $('#gListTable tbody').on('click', 'input[name="checkname"]', function () {
                $(this).parents("tr").toggleClass('selected');
            });

            /**
             * 全选/全不选
             */

            $('#checkbox_id_all').click(function () {
                if (this.checked) {
                    $("input[name='checkname']").prop('checked', true);
                    $('#gListTable tbody tr[role="row"]').addClass('selected');
                } else {
                    $("input[name='checkname']").removeAttr('checked');
                    $('#gListTable tbody tr[role="row"]').removeClass('selected');
                }
            })
            // 翻页取消选中状态和排序
            $('#gListTable').on('page.dt order.dt', function () {
                $('#gListTable tbody tr[role="row"]').removeClass('selected');
                $("input[type='checkbox']").removeAttr("checked");
            });

            // 点击icon
            $('#gListTable tbody').on('click', '#g_icon_details', function () {


                var data = $('#gListTable').DataTable().row($(this).parents('tr')).data();

                var id = data.id;

                $("#body").attr("data-node_id", id);


               
                 
                $("#monitor_history_btn").trigger('click');


                var g_modal_view=new nodeInfoModleView({el:$("#g_mymodal")});
					g_modal_view.render();
                	$("#fourth_mymodal").modal("show");
                	$("body").removeClass('modal-open')



                $("#monitor_body_up_outter").html("<div id='monitor_body_up_flag'></div>");
                $("#history-tab-panel_down_outter").html("<div id='history-tab-panel_down_flag'></div>");
                $("#different_time_period").html("<div id='history_past_one_hour'></div>");
                
           

            });


            $('#gListTable tbody').on('click', '#g_icon_on', function () {

                var data = $('#gListTable').DataTable().row($(this).parents('tr')).data();

                var id = data.id;

                var hostname = data.hostname;

                var shoutOn = urlConstants.node + id;

                $("#g_powonrow_modal_sigle .tips-content").html("<span>" + "节点名称：" + hostname + "</span>");

                $("#g_powonrow_modal_sigle").modal('show');

                $('#confirmPowerOnRow_one_sigle').unbind("click");

                $("#confirmPowerOnRow_one_sigle").click(function () {

                    $("#g_powonrow_modal_sigle").modal('hide');

                    $("#progressDialog").modal('show');

                    $.ajax({
                        type: "put",
                        url: shoutOn,
                        data: {"operation": "turn_on"},
                        async: true,
                        success: function (res) {

                            var data = res;

                            if (data.ret == "success") {

                                $("#progressDialog").modal("hide");

                                $("#the_result_of_operation").html(hostname + "：开机");

                                $("#progressDialog_1").modal("show");

                            } else if (data.ret == "failed") {

                                $("#progressDialog").modal("hide");

                                $("#the_result_of_operation_close").html(hostname + "：开机");

                                $("#progressDialog_4").modal("show");
                            }

                        },
                        error: function () {

                           // console.log("post error!!!");

                        }
                    });

                });

            });


            $('#gListTable tbody').on('click', '#g_icon_off', function () {

                var data = $('#gListTable').DataTable().row($(this).parents('tr')).data();

                var id = data.id;

                var hostname = data.hostname;

                var currentUrl = urlConstants.node + id;

                $("#g_powoffrow_modal_sigle .tips-content").html("<span>" + "节点名称：" + hostname + "</span>");

                $("#g_powoffrow_modal_sigle").modal('show');

                $('#confirmPowerOffRow_one_sigle').unbind("click");

                $("#confirmPowerOffRow_one_sigle").click(function () {

                    $("#g_powoffrow_modal_sigle").modal('hide');

                    $("#progressDialog").modal('show');

                    $.ajax({
                        type: "put",
                        url: currentUrl,
                        data: {"operation": "turn_off"},
                        async: true,
                        success: function (res) {

                            var data = res;

                            if (data.ret == "success") {

                                $("#progressDialog").modal("hide");

                                $("#the_result_of_operation").html(hostname + "：关机");

                                $("#progressDialog_1").modal("show");

                            } else if (data.ret == "failed") {

                                $("#progressDialog").modal("hide");

                                $("#the_result_of_operation_close").html(hostname + "：关机");

                                $("#progressDialog_4").modal("show");
                            }

                        },
                        error: function () {

                            //console.log("post error!!!");

                        }
                    });

                });

            });

            $('#gListTable tbody').on('click', '#g_icon_kvm', function () {

                var data = $('#gListTable').DataTable().row($(this).parents('tr')).data();

                var hostname = data.hostname;

                new TerminalWindow('api/nodes/' + hostname + '/console/sessions/', hostname + "  Console", 0, 60);

            });

            $('#gListTable tbody').on('click', '#g_icon_ssh', function () {

                var data = $('#gListTable').DataTable().row($(this).parents('tr')).data();

                var hostname = data.hostname;

                new TerminalWindow('/api/nodes/' + hostname + '/shell/sessions/', hostname + "  Shell", 0, 60);

            });


            // 多行开机
            $("#g_shutup").unbind("click");

            $("#g_shutup").on("click", function () {
                var _shutup = $('#gListTable').DataTable().rows('.selected').data(),
                    _shutupList = [];
                $.each(_shutup, function (index, item) {
                    _shutupList.push(item.hostname);
                });
                $("#g_powonrow_modal .tips-content").empty();
                $("#g_powonrow_modal .tips-content").append(_shutupList.join("，"));
                if (_shutupList.length > 0) {
                    $("#g_powonrow_modal").modal("show");
                }
            });

            $('#g_powonrow_modal').on('shown.bs.modal', function () {
                $('#confirmPowerOnRow_one').unbind("click");
                $('#confirmPowerOnRow_one').click(function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $("#g_powonrow_modal").modal("hide");
                    var _shutup = $('#gListTable').DataTable().rows('.selected').data(),
                        _shutupList = [];
                    $.each(_shutup, function (index, item) {
                        _shutupList.push({id: item.id, name: item.hostname});
                    });
                    var _shutupLen = _shutupList.length;
                    var _shutupState = [];
                    var _stateup = null;
                    $("#progressDialog_loading").modal('show');
                    $.each(_shutupList, function (index, item) {
                        _this.shutUpRow(index, item.id, item.name, _shutupState);
                    });
                    $("#progressDialog_loading").modal('hide');
                    $("#progressDialog_on").modal("show");
                    $("#progressDialog_on .state_on").empty();
                    $.each(_shutupState, function (index, item) {
                        if (item.ret == "success") {
                            $("#progressDialog_on .state_on").append("<img/><div class='g-state'>" + item.name + nls.success_turn_on + "</div>");
                            $("#progressDialog_on .state_on img").attr("src", "/static/js/customUI/user/dashboard/job/resources/ic_check_green_36x36.png");
                        } else if (item.ret == "failed") {
                            $("#progressDialog_on .state_on").append("<img/><div class='g-state'>" + item.name + nls.error_turn_on + "</div>");
                            $("#progressDialog_on .state_on img").attr("src", "/static/js/customUI/user/dashboard/job/resources/ic_clear_red_36x36.png");
                        }
                    });
                    _this.refreshData();
                });
            });


// 多行关机,开始************************************************************************************************************************
            $("#g_shutdown").unbind("click");

            $("#g_shutdown").on("click", function () {

                var _shutdown = $('#gListTable').DataTable().rows('.selected').data(),

                    _shutdownList = [];

                $.each(_shutdown, function (index, item) {
                    _shutdownList.push(item.hostname);
                });

                $("#g_powoffrow_modal .tips-content").empty();

                $("#g_powoffrow_modal .tips-content").append(_shutdownList.join("，"));

                if (_shutdownList.length > 0) {

                    $("#g_powoffrow_modal").modal("show");

                }
            });


            $('#g_powoffrow_modal').on('shown.bs.modal', function () {

                $('#confirmPowerOffRow_one').unbind("click");

                $('#confirmPowerOffRow_one').click(function (e) {

                    e.preventDefault();
                    e.stopPropagation();

                    $("#g_powoffrow_modal").modal("hide");

                    var _shutdown = $('#gListTable').DataTable().rows('.selected').data(),

                        _shutdownList = [];

                    $.each(_shutdown, function (index, item) {

                        _shutdownList.push({id: item.id, name: item.hostname});

                    });
                    var _shutdownLen = _shutdownList.length;

                    //console.log(JSON.stringify(_shutdownList));


                    var _shutdownState = [];

                    var _statedown = null;

                    $("#progressDialog_loading").modal('show');

                    $.each(_shutdownList, function (index, item) {

                        _this.shutDownRow(index, item.id, item.name, _shutdownState);

                    });

                    $("#progressDialog_loading").modal('hide');

                    $("#progressDialog_off .state_off").empty();

                    $.each(_shutdownState, function (index, item) {
                        if (item.ret == "success") {
                            $("#progressDialog_off .state_off").append("<img/><div class='g-state'>" + item.name + nls.success_turn_off + "</div>");
                            $("#progressDialog_off .state_off img").attr("src", "/static/js/customUI/user/dashboard/job/resources/ic_check_green_36x36.png");
                        } else if (item.ret == "failed") {
                            $("#progressDialog_off .state_off").append("<img/><div class='g-state'>" + item.name + nls.error_turn_off + "</div>");
                            $("#progressDialog_off .state_off img").attr("src", "/static/js/customUI/user/dashboard/job/resources/ic_clear_red_36x36.png");
                        }
                    });

                    $("#progressDialog_off").modal("show");

                    _this.refreshData();

                });
            });
// 多行关机,结束************************************************************************************************************************


            // 多行kvm开始****************************************************************************
            $("#g_kvm").unbind("click");
            $("#g_kvm").on("click", function () {

                var _kvm = $('#gListTable').DataTable().rows('.selected').data();

                _kvmList = [];

                $.each(_kvm, function (index, item) {

                    _kvmList.push(item.hostname);

                });

                $.each(_kvmList, function (index, item) {

                    _this.kvmRow(item, index * 580 + 60);

                });

            });
            //多行kvm结束****************************************************************************


            // 多行ssh开始****************************************************************************
            $("#g_ssh").unbind("click");
            $("#g_ssh").on("click", function () {

                var _ssh = $('#gListTable').DataTable().rows('.selected').data();

                _sshList = [];

                $.each(_ssh, function (index, item) {

                    _sshList.push(item.hostname);

                });

                $.each(_sshList, function (index, item) {

                    _this.sshRow(item, index * 580 + 60);

                });

            });
            //多行ssh结束******************************************************************************


            eventBus.off(constants.refreshNewResource);
            eventBus.on(constants.refreshNewResource, _this.refreshTable);




        },
        shutUpRow: function (index, node_id, node_name, _shutdownState) {

            $.ajax({
                type: "put",
                url: urlConstants.onOrOff + node_id + '/',
                data: {"operation": "turn_on"},
                async: false,
                success: function (res) {
                    var _data = res;
                    // 暂时当后台返回success时当做关机成功,''关机失败
                    if (_data.ret == "success" || _data.ret == "failed") {
                        _statedown = {name: node_name, ret: _data.ret};
                        _shutdownState.push(_statedown);
                    }
                },
                error: function () {
                    //console.log("post error!!!");
                }
            });

        },
        shutDownRow: function (index, node_id, node_name, _shutdownState) {
            $.ajax({
                type: "put",
                url: urlConstants.onOrOff + node_id + '/',
                data: {"operation": "turn_off"},
                async: false,
                success: function (res) {
                    var _data = res;
                    // 暂时当后台返回success时当做关机成功,''关机失败
                    if (_data.ret == "success" || _data.ret == "failed") {
                        _statedown = {name: node_name, ret: _data.ret};
                        _shutdownState.push(_statedown);
                    }
                },
                error: function () {
                   // console.log("post error!!!");
                }
            });
        },
        kvmRow: function (item, num) {

            new TerminalWindow('api/nodes/' + item + '/console/sessions/', item + "  Console", 0, num);

        },

        sshRow: function (item, num) {

            new TerminalWindow('/api/nodes/' + item + '/shell/sessions/', item + "  Shell", 0, num);

        },

        refreshTable: function () {

            if ($(".modal.in").length > 0) {
                return;
            }
            if ($(".termwindow").length > 0) {
                return;
            }
            var _checkedLen = $("input:checked:not(#checkbox_id_all)").length;
            if (_checkedLen > 0) {
                return;
            }
            
            var _table = $('#gListTable').DataTable();

            _table.ajax.reload();

            $("#select_all_btn").removeClass("allChecked");
            $("#select_all_btn").addClass("allCancle");
            $("#monitor_WebSSH").attr({"disabled": "disabled"});
            $("#monitor_WebKVM").attr({"disabled": "disabled"});
            $("#monitor_turn_off").attr({"disabled": "disabled"});
            $("#monitor_turn_on").attr({"disabled": "disabled"});

        },
        refreshData: function () {
            var _gListTable = $('#gListTable').DataTable();
            _gListTable.ajax.reload();
            $('#listTable tbody tr[role="row"]').removeClass('selected');
            $("input[type='checkbox']").removeAttr("checked");
            $('#g_node').attr('disabled', 'disabled');
            $('#g_shutup').attr('disabled', 'disabled');
            $("#g_shutdown").attr("disabled", "disabled");
            $('#g_kvm').attr('disabled', 'disabled');
            $('#g_ssh').attr('disabled', 'disabled');
        }

    });
});