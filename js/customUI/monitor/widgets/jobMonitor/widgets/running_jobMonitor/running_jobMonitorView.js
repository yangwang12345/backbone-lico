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
	'echartjs',
	'utils/constants/urlConstants',
	'utils/constants/constants',
	'utils/eventBus',
	'text!./templates/allNodesTmpl.mustache',
	'i18n!./nls/allNodes',
	'css!./style/allNodes.css'
	],function(Marionette,bootstrap,datatables,echartjs, 
		       datatables_bootstrap,dataTables_tableTools,
		       urlConstants,constants,eventBus,template,nls){
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
            
            $("body").css("background-color", "#ffffff");
             
            //console.log("operation log view");
         
            $("#jobsRunningTable").dataTable({
            	    "aaSorting": [ [0,'desc'] ],
            	    "serverSide": true,
            	    "searchDelay": 1000,
					responsive:true,
					bPaginate:true,
					bInfo:true,
					sLengthMenu:'',
					bLengthChange:true,
                   	searching: true,
                   	
 //                  	processing: true, //启动后端数据处理
					serverSide: true, //启动后端分页
					paging: true,
					info: true,
					destory: true,
					stateSave: false,
					
					language: {
                    "url": require.toUrl('') + "translation/datatables.chinese.json"
                    },
                    columnDefs:[{
                     orderable:false,//禁用排序
                     targets:[6]   //指定的列
                    }],
                   columns:[
                   {
                    	'data':'id','title':nls.primary_id,'className':'dt-center'
                   },{
                    	'data':'jobid','title':nls.id,'className':'dt-center'
                    },{
                    	'data':'submiter','title':nls.submiter,'className':'dt-center'
                    },{
                    	'data':'jobname','title':nls.jobName,'className':'dt-center'
                    },{
                    	'data':'queue','title':nls.queue,'className':'dt-center'
                    },{
                    	'data':'qtime','title':nls.qtime,'className':'dt-center'
                    },{
                    	'data':'starttime','title':nls.starttime,'className':'dt-center'
                    },{
                    	'data':'currtime','title':nls.running_time,'className':'dt-center'
                    }
                    ],
                    ajax:{
						'url':"/api/jobs/?status=running&role=admin",
						'data': function(args) {
							return {
								"args": JSON.stringify(args),
							};
						},
						'dataSrc':function(res){
							
							var data=res.data;
						    
						    $.each(data, function(index , item) {
						    	
						    	var deltaTime=item.currtime-item.starttime;
		                       
		                        var currentHour=parseInt(deltaTime/3600);
		                      
		                        var currentMinute=parseInt((deltaTime-currentHour*3600)/60);
		                            
		                        var currentSecond=parseInt((deltaTime-currentHour*3600)%60);
		                        
		                        item.currtime=currentHour+"时"+currentMinute+"分"+currentSecond+"秒";
		                        

						   		var timeThis = new Date(item.qtime*1000);	
						   		
						   	    var qtime_year = timeThis.getFullYear()+"-";  
						   	    
	                            var qtime_month = timeThis.getMonth()+1+"-";
	                            
	                                if((timeThis.getMonth()+1)<10){
	                                	
	                                	qtime_month="0"+(timeThis.getMonth()+1)+"-";
	                                	
	                                }
	                                
	                            var qtime_date = timeThis.getDate()+"   ";
	                            
	                                if(timeThis.getDate()<10){
	                                	
	                                	qtime_date ="0"+timeThis.getDate()+"   "
	                                	
	                                }
	                                
	                            var qtime_hour = timeThis.getHours()+":";
	                            
	                                if(timeThis.getHours()<10){
	                                	
	                                	qtime_hour ="0"+timeThis.getHours()+":";
	                                }
	                                
		                        var qtime_minute = timeThis.getMinutes()+":";
		                        
		                            if(timeThis.getMinutes()<10){
		                            	
		                            	qtime_minute = "0"+timeThis.getMinutes()+":";
		                            }
		                            
		                        var qtime_seconds=timeThis.getSeconds()+"";
		                            
		                            if(timeThis.getSeconds()<10){
		                            	
		                            	qtime_seconds="0"+timeThis.getSeconds()+"";
		                            }
		                            
		                        item.qtime= qtime_year+qtime_month+qtime_date+qtime_hour+qtime_minute+qtime_seconds;
		                        
		                        
		                        
                                var s_timeThis = new Date(item.starttime*1000);	 
						   	    var s_qtime_year = s_timeThis.getFullYear()+"-"; 
						   	    
	                            var s_qtime_month = s_timeThis.getMonth()+1+"-";
	                            
	                                 if((s_timeThis.getMonth()+1)<10){
	                                 	
	                                 	s_qtime_month ="0"+(s_timeThis.getMonth()+1)+"-";
	                                 }
	                                 
	                            var s_qtime_date = s_timeThis.getDate()+"   ";
	                            
	                                 if(s_timeThis.getDate()<10){
	                                 	
	                                 	s_qtime_date = "0"+s_timeThis.getDate()+"   ";
	                                 	
	                                 }
	                            var s_qtime_hour = s_timeThis.getHours()+":";
	                            
	                                if(s_timeThis.getHours()<10){
	                                	
	                                	s_qtime_hour = "0"+s_timeThis.getHours()+":";
	                                }
	                                
		                        var s_qtime_minute = s_timeThis.getMinutes()+":";
		                        
		                            if(s_timeThis.getMinutes()<10){
		                            	
		                            	s_qtime_minute ="0"+s_timeThis.getMinutes()+":";
		                            }
		                            
		                        var s_qtime_seconds=s_timeThis.getSeconds()+"";
		                             
		                            if(s_timeThis.getSeconds()<10){
		                            	
		                            	s_qtime_seconds="0"+s_timeThis.getSeconds()+"";
		                            	
		                            }
		                        
		                        item.starttime=s_qtime_year+s_qtime_month+s_qtime_date+s_qtime_hour+s_qtime_minute+s_qtime_seconds;
		                        

		                       

		                            
						   });
						 
							return data;
						}
					}
					
				});
       
       

              

              eventBus.off(constants.refreshNumber_waiting);
              eventBus.off(constants.refreshNumber_finished);
              eventBus.off(constants.refreshNumber_running);
              eventBus.on(constants.refreshNumber_running,this.refreshData); 
               
            },
            refreshData: function () {
            	
            var jobsRunningTable = $('#jobsRunningTable').DataTable();
            
            jobsRunningTable.ajax.reload();
               
            //   console.log("jobsRunningTable.ajax.reload();");
          
            }

		});
	});