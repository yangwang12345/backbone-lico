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
             
           // console.log(window.location.hostname);
         
            $("#jobsWaitingTable").dataTable({
            	    "aaSorting": [ [0,'desc'] ],
          	    "serverSide": true,
          	    "searchDelay": 1000,
					responsive:true,
					bPaginate:true,
					bInfo:true,
					sLengthMenu:'',
					bLengthChange:true,
                   	searching: true,
                   	
//                   	processing: true, //启动后端数据处理
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
                     targets:[5]   //指定的列
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
                    	'data':'walltime','title':nls.waitingtime,'className':'dt-center'
                    },{
                    	'data':'status','title':nls.condition,'className':'dt-center'
                    }
                    ],
                    ajax:{
						'url':"/api/jobs/?status=waitforrun&role=admin",
				//'url':"/static/js/customUI/monitor/widgets/jobMonitor/widgets/waiting_jobMonitor/style/data.js/",
						'data': function(args) {
							
							var search_value=args.search.value;
							    args.search.translated="false";
							if(search_value=="等待"){
								args.search.value="waiting";
								args.search.translated="true";
							}else if(search_value=="挂起"){
								args.search.value="suspending";
								args.search.translated="true";
							}else if(search_value=="保留"){
								args.search.value="holding";
								args.search.translated="true";
							}else if(search_value=="排队"){
								args.search.value="queueing";
								args.search.translated="true";
							}
							
							return {
								"args": JSON.stringify(args),
							};
						},
						'dataSrc':function(res){
							
							var data=res.data;
						    
						   // console.log(data);
						    
						    $.each(data, function(index , item) {
						    	
						    	
		                        var deltaTime=item.currtime-item.qtime;

		                        var currentHour=parseInt(deltaTime/3600);
		                      
		                        var currentMinute=parseInt((deltaTime-currentHour*3600)/60);
		                            
		                        var currentSecond=parseInt((deltaTime-currentHour*3600)%60);
		                        
		                        item.walltime=currentHour+"时"+currentMinute+"分"+currentSecond+"秒";
		                        

						   		var timeThis = new Date(item.qtime*1000);	 
						   	    var qtime_year = timeThis.getFullYear()+"-";  
						   	    
	                            var qtime_month = timeThis.getMonth()+1+"-";
	                                
	                                if((timeThis.getMonth()+1)<10){
	                                	
	                                	qtime_month ="0"+(timeThis.getMonth()+1)+"-";
	                                }
	                                
	                            var qtime_date = timeThis.getDate()+"   ";
	                            
	                                if(timeThis.getDate()<10){
	                                	
	                                	qtime_date = "0"+timeThis.getDate()+"   ";
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
		                        
						   	   	var _timeThis = new Date(item.endtime*1000);	 
						   	    var _qtime_year = _timeThis.getFullYear()+"-";  
						   	    
	                            var _qtime_month = _timeThis.getMonth()+1+"-";
	                            
	                                if((_timeThis.getMonth()+1)<10){
	                                	
	                                	 _qtime_month ="0"+(_timeThis.getMonth()+1)+"-";
	                                }
	                                
	                            var _qtime_date = _timeThis.getDate()+"   ";
	                            
	                                if(_timeThis.getDate()<10){
	                                	
	                                	_qtime_date = "0"+_timeThis.getDate()+"   ";
	                                }
	                                
	                            var _qtime_hour = _timeThis.getHours()+":";
	                                 
	                                 if(_timeThis.getHours()<10){
	                                 	
	                                 	_qtime_hour = "0"+_timeThis.getHours()+":";
	                                 }
	                                 
		                        var _qtime_minute = _timeThis.getMinutes()+":";
		                        
		                            if(_timeThis.getMinutes()<10){
		                            	
		                            	_qtime_minute ="0"+ _timeThis.getMinutes()+":";
		                            }
		                            
		                        var _qtime_seconds=_timeThis.getSeconds()+"";
		                            
		                            if(_timeThis.getSeconds()<10){
		                            	
		                            	_qtime_seconds="0"+_timeThis.getSeconds()+"";
		                            }
		                            
		                        item.endtime= _qtime_year+_qtime_month+_qtime_date+_qtime_hour+_qtime_minute+_qtime_seconds;
		                            
		                       if(item.status=="waiting"){
		                       	   
		                       	   item.status=nls.waiting;
		                       	   
		                       }else if(item.status=="suspending"){
		                       	
		                       	//"挂起"
		                       	    item.status=nls.suspending;
		                       	    
		                       }else if(item.status=="holding"){
		                       	
		                       	//"保留"
		                       	    item.status=nls.holding;
		                       	    
		                       }else if(item.status=="queueing"){
		                       	
		                       	//"排队"
		                       	    item.status=nls.queueing;
		                       	    
		                       }
		                       //currtime


		                        
						   });
						 
							return data;
						}
					}
				});
       
       

              

                eventBus.off(constants.refreshNumber_finished);
                eventBus.off(constants.refreshNumber_running);
                eventBus.off(constants.refreshNumber_waiting);
                eventBus.on(constants.refreshNumber_waiting,this.refreshData); 
               
           },
           refreshData: function () {
           	
            var jobsWaitingTable = $('#jobsWaitingTable').DataTable();
            
            jobsWaitingTable.ajax.reload();
               
            //   console.log("jobsWaitingTable.ajax.reload();");
          
            }

		});
	});