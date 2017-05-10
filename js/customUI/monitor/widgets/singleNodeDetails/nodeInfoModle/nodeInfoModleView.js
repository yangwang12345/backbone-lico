/*
 * ? Copyright Lenovo 2015.
 *
 * LIMITED AND RESTRICTED RIGHTS NOTICE:
 *
 * If data or software is delivered pursuant a General Services Administration
 * "GSA" contract, use, reproduction, or disclosure is subject to
 * restrictions set forth in Contract No. GS-35F-05925.
*/
define([
	'marionette',
	'datatables',
	'datatables_bootstrap',
	'utils/constants/urlConstants',
	'utils/constants/constants',
	'utils/eventBus',
	
	'customUI/monitor/widgets/singleNodeDetails/nodeJobsData/nodeJobsDataView',
	
	'customUI/monitor/widgets/singleNodeDetails/nodeData/nodeDataView',
	
	'customUI/monitor/widgets/singleNodeDetails/singleNodeHistoryChart/oneHourHistory/oneHourHistoryView',
	'customUI/monitor/widgets/singleNodeDetails/singleNodeHistoryChart/oneHourHistoryMax/cpuMaxView',

	'customUI/monitor/widgets/singleNodeDetails/singleNodeHistoryChart/oneDayHistory/oneDayHistoryView',
	'customUI/monitor/widgets/singleNodeDetails/singleNodeHistoryChart/oneDayHistoryMax/oneDaycpuMaxView',

	'customUI/monitor/widgets/singleNodeDetails/singleNodeHistoryChart/oneWeekHistory/oneWeekHistoryView',
	'customUI/monitor/widgets/singleNodeDetails/singleNodeHistoryChart/oneWeekHistoryMax/oneWeekcpuMaxView',

	'customUI/monitor/widgets/singleNodeDetails/singleNodeHistoryChart/oneMonthHistory/oneMonthHistoryView',
	'customUI/monitor/widgets/singleNodeDetails/singleNodeHistoryChart/oneMonthHistoryMax/oneMonthcpuMaxView',
	
	'text!./templates/allNodesTmpl.mustache',
	'i18n!./nls/allNodes',
	'css!./style/allNodes.css'
	],function(Marionette,
			   datatables,
			   datatables_bootstrap,
			   urlConstants,
			   constants,
			   eventBus,
			   nodeJobsDataView,
			   nodeDataView,
			   oneHourHistoryView,
			   cpuMaxView,
			   oneDayHistoryView,
			   oneDaycpuMaxView,
			   oneWeekHistoryView,
			   oneWeekcpuMaxView,
			   oneMonthHistoryView,
			   oneMonthcpuMaxView,
			   template,
			   nls){
		return Marionette.ItemView.extend({
			template:template,
			templateHelpers:function(){
				return {
					nls:nls
				};
			},

			
			onDestroy: function(){
		    // custom cleanup or destroying code, here
		    $("body").css("background-color", "#F6F6F4");
		    },

			onRender:function(){
//				$('#fourth_mymodal').modal({backdrop: 'static', keyboard: false});
				eventBus.off(constants.refreshCpuMaxOneMoreTime);
            	
            	eventBus.off(constants.refreshCpuMax);
            	eventBus.off(constants.refreshCpuMin);
            	eventBus.off(constants.refreshOneDayCpuMax);
            	eventBus.off(constants.refreshOneDayCpuMin);
            	eventBus.off(constants.refreshOneWeekCpuMax);
            	eventBus.off(constants.refreshOneWeekCpuMin);
            	eventBus.off(constants.refreshOneMonthCpuMax);
            	eventBus.off(constants.refreshOneMonthCpuMin);
            	
            	eventBus.off(constants.refreshNodeData);
            	eventBus.off(constants.refreshNodeJobsData);
            	
				var nodeData= new nodeDataView({el: $('#monitor_body_up')});
				nodeData.render();

				var nodeOneHourHistory =new oneHourHistoryView({el: $('#history-tab-panel_up')});
				nodeOneHourHistory.render();

				var cpuMax= new cpuMaxView({el: $('#history-tab-panel_down')});
				cpuMax.render();

                   $("#monitor_body_up_outter").html("<div id='monitor_body_up_flag'></div>");
                   $("#history-tab-panel_down_outter").html("<div id='history-tab-panel_down_flag'></div>");
                   $("#different_time_period").html("<div id='history_past_one_hour'></div>");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//模态框内下拉选择框开始***************************************************************************************************************************************************    
           $("#monitor_the_time_of_choice").on("change",function () {
               
              var id=$("#monitor_the_time_of_choice  option:selected").text();
              
              var data_period=$("#monitor_the_time_of_choice  option:selected").attr("data-period");
              
              //console.log(id);
              
             // console.log(data_period);
              
              if(data_period=="past_hour"){
              	
                    $("#different_time_period").html("<div id='history_past_one_hour'></div>");
                    
                 var cpuMax= new cpuMaxView({el: $('#history-tab-panel_down')});                      
                       
                       cpuMax.render();
                        
                  var nodeOneHourHistory =new oneHourHistoryView({el: $('#history-tab-panel_up')});
                       
                      nodeOneHourHistory.render();
                      
                  
              }else if(data_period=="past_day"){
              	
                    $("#different_time_period").html("<div id='history_past_one_day'></div>");
                       
                  var nodeOneDayHistory = new oneDayHistoryView({el: $('#history-tab-panel_up')});
              
                      nodeOneDayHistory.render();
                  
                  var nodeOneDaycpuMax = new oneDaycpuMaxView({el: $('#history-tab-panel_down')});
                      
                      nodeOneDaycpuMax.render();
                      
                      
              }else if(data_period=="past_week"){
                  
                     $("#different_time_period").html("<div id='history_past_one_week'></div>");
                     
                 var nodeOneWeekHistory = new oneWeekHistoryView({el: $('#history-tab-panel_up')});
              
                      nodeOneWeekHistory.render();
                  
                  var nodeOneWeekcpuMax = new oneWeekcpuMaxView({el: $('#history-tab-panel_down')});
                      
                      nodeOneWeekcpuMax.render();

                
              }else if(data_period=="past_month"){
              	
                      $("#different_time_period").html("<div id='history_past_one_month'></div>");
                      
                  var nodeOneMonthHistory = new oneMonthHistoryView({el: $('#history-tab-panel_up')});
              
                      nodeOneMonthHistory.render();
                  
                  var nodeOneMonthcpuMax = new oneMonthcpuMaxView({el: $('#history-tab-panel_down')});
                      
                      nodeOneMonthcpuMax.render();
                      

              }

           }); 
//模态框内下拉选择框开始***************************************************************************************************************************************************


        
//模态框内Tab页切换开始***************************************************************************************************************************************************                
              
            $("#monitor_history_btn").click(function(){
                
                $(".monitor_history_period").css("display","block");
                $("#history-tab-panel_up").css("display","block");
                $("#history-tab-panel_down").css("display","block");
                $("#history-tab-panel_running_jobs").css("display","none");
                $("#monitor_history_btn").css("color","#000000");
           
                $("#monitor_job_btn").css("color","rgb(51, 122, 183)");
                $("#monitor_alarm_btn").css("color","rgb(51, 122, 183)");
                
                $("#different_part_task").html("<div></div>");
                $("#different_time_period").html("<div id='history_past_one_hour'></div>");
                
                $("#nodes_alarm_tab_content").css("display", "none");
            });
               
   
   
            $("#monitor_job_btn").click(function(){
                
                $(".monitor_history_period").css("display","none");
                $("#history-tab-panel_up").css("display","none");
                $("#history-tab-panel_down").css("display","none");
                $("#history-tab-panel_running_jobs").css("display","block");
                $("#monitor_job_btn").css("color","#000000");
           
                $("#monitor_history_btn").css("color","rgb(51, 122, 183)");
                $("#monitor_alarm_btn").css("color","rgb(51, 122, 183)");
                
               var nodeJobsData= new nodeJobsDataView({el: $('#history-tab-panel_running_jobs')});
                   
                   nodeJobsData.render();
               
               $("#different_time_period").html("<div></div>");
               $("#different_part_task").html("<div id='history-tab-panel_running_jobs_flag'></div>");
           
                $("#nodes_alarm_tab_content").css("display", "none");
            });
                var nodeAlarm ;
                $("#monitor_alarm_btn").click(function(){
                    $(".monitor_history_period").css("display", "none");
                    $("#history-tab-panel_up").css("display", "none");
                    $("#history-tab-panel_down").css("display", "none");
                    $("#history-tab-panel_running_jobs").css("display", "none");
                    $("#monitor_job_btn").css("color", "rgb(51, 122, 183)");

                    $("#monitor_history_btn").css("color", "rgb(51, 122, 183)");

                    //-------------cj
                    $("#nodes_alarm_tab_content").css("display", "block");
                    $("#monitor_alarm_btn").css("color", "#000000");


                    //-------------------cj
                    if(nodeAlarm){
                        nodeAlarm.ajax.reload(null,false);
                    }else {
                        nodeAlarm = $("#nodeslarmTable").DataTable({
                            //processing: true, //启动后端数据处理
                            serverSide: true, //启动后端分页
                            paging: true,
                            info: true,
                            destory: true,
                            searching : false,
                            bInfo: false,
                            columns: [
                                {
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
                                }
                            ],
                            ajax: {
                                //'url': 'static/js/customUI/monitor/widgets/alarm/data/currentAlarmData.json',
                                'url': urlConstants.alarm+  'node/' + $("#body").attr("data-node_id"),
                                dataSrc: function(res) {
                                    $.each(res.data, function(index, item) {
                                        item["status"] = item["status"].toLowerCase();
                                    })
                                    return res.data;
                                },
                                data: function(args) {

                                    return {
                                        "args": JSON.stringify(args),
                                    };
                                }
                            },
                            language: {
                                "url": require.toUrl('') + "translation/datatables.chinese.json"
                            },
                            order: [[4, 'dest']],

                            rowCallback: function( row, data, index ) {
                                var urlimg="/static/js/customUI/monitor/widgets/alarm/img/";
                                var urlstatus="",alarm_level_arr = [,,"info","warn","error","fatal"];
                                var alarm_level = alarm_level_arr[data.policy_level/10];
                                switch (data.status) {
                                    case "present":
                                        $('td:eq(3)', row).html(nls.present);
                                        break;
                                    case "confirmed":
                                        $('td:eq(3)', row).css({"color":"#d60000"});
                                        $('td:eq(3)', row).html(nls.confirm);
                                        break;
                                    case "resolved":
                                        $('td:eq(3)', row).css({"color":"#48cb5b"});
                                        $('td:eq(3)', row).html(nls.solve);
                                        urlstatus="_gray"
                                        break;
                                }
                                $('td:eq(2)', row).html( "<img src='"+ urlimg+alarm_level + urlstatus + "28.png'/>" );
                            }
                        });
                    }
                    $("#different_time_period").html("<div></div>");
                    $("#different_part_task").html("<div></div>");
                });


                //点击关停模态框内所有刷新开始
            $("#monitor_modal_close_button").click(function(){
                
                eventBus.off(constants.refreshCpuMaxOneMoreTime);
                
                eventBus.off(constants.refreshCpuMax);
                eventBus.off(constants.refreshCpuMin);
                eventBus.off(constants.refreshOneDayCpuMax);
                eventBus.off(constants.refreshOneDayCpuMin);
                eventBus.off(constants.refreshOneWeekCpuMax);
                eventBus.off(constants.refreshOneWeekCpuMin);
                eventBus.off(constants.refreshOneMonthCpuMax);
                eventBus.off(constants.refreshOneMonthCpuMin);
                
                eventBus.off(constants.refreshNodeData);
                eventBus.off(constants.refreshNodeJobsData);
                
               $("#monitor_body_up").html("<div></div>");
               $("#history-tab-panel_down").html("<div></div>");
               $("#different_part_task").html("<div></div>");
               $("#different_time_period").html("<div></div>");
                if(nodeAlarm){
                    nodeAlarm = undefined;
                    $("#nodeslarmTable").DataTable().destroy();
                }
            });

			}

		
			
		});
	});