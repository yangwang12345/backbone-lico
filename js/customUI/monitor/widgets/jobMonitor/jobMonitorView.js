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
	'customUI/monitor/widgets/jobMonitor/widgets/finished_jobMonitor/finished_jobMonitorView',
	'customUI/monitor/widgets/jobMonitor/widgets/running_jobMonitor/running_jobMonitorView',
	'customUI/monitor/widgets/jobMonitor/widgets/waiting_jobMonitor/waiting_jobMonitorView',
	'customUI/monitor/widgets/jobMonitor/widgets/jobBar/jobBarView',
	'text!./templates/jobMonitorTmpl.mustache',
	'i18n!./nls/jobMonitor',
	'css!./style/jobMonitor.css'
	],function(Marionette,bootstrap,datatables,echartjs, 
		       datatables_bootstrap,dataTables_tableTools,
		       urlConstants,constants,eventBus,
		       finished_jobMonitorView,
		       running_jobMonitorView,
		       waiting_jobMonitorView,
		       jobBarView,
		       template,nls){
		       	
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


            onShow:function(){
            
            $("body").css("background-color", "#ffffff");
         
            var running_job= new running_jobMonitorView({el: $('#listNodesTable_wrapper_only_jobs')});
            	
            	running_job.render();
            	    
            var job_bar= new jobBarView({el: $('#alarm_jobMonitor_chart')});    
            	    
            	job_bar.render();
            	
            	this.refreshNumber();
            	
            	eventBus.off(constants.refreshNumber);
            	eventBus.on(constants.refreshNumber,this.refreshNumber);
  //*********************************************************************************************************        
            $("#running_job_btn").click(function(){
            	
            	    eventBus.off(constants.refreshNumber_chart);
            	    
            	var running_job= new running_jobMonitorView({el: $('#listNodesTable_wrapper_only_jobs')});
            	
            	    running_job.render();
            	    
            	    $("#finished_history_btn").css("color","rgb(51, 122, 183)");
            	    $("#running_job_btn").css("color","#000000");
            	    $("#waiting_job_btn").css("color","rgb(51, 122, 183)");
            	    
            	var job_bar= new jobBarView({el: $('#alarm_jobMonitor_chart')});    
            	    
            	    job_bar.render();
            	    
            	    $.ajax({
            		type:"get",
            		url:"/api/jobs/?status=running&role=admin",
            		async:true,
            		success:function(res){
            			
            			var totle=res.length;
            			
            			$("#totle_running").html(totle);
            			
            		},
            		error:function(){
            			//console.log("ajax error!");
            		}
            	    
            	    });
            	
            });  
 //*********************************************************************************************************            
            $("#waiting_job_btn").click(function(){
            	
            	   eventBus.off(constants.refreshNumber_chart);
            	
                var waiting_job= new waiting_jobMonitorView({el: $('#listNodesTable_wrapper_only_jobs')});
            	
            	    waiting_job.render();
            	
            	var job_bar= new jobBarView({el: $('#alarm_jobMonitor_chart')});    
            	    
            	    job_bar.render();
            	   
            	   $("#finished_history_btn").css("color","rgb(51, 122, 183)");
            	   $("#running_job_btn").css("color","rgb(51, 122, 183)");
            	   $("#waiting_job_btn").css("color","#000000");
            	   
            	   $.ajax({
            		type:"get",
            		url:"/api/jobs/?status=waitforrun&role=admin",
            		async:true,
            		success:function(res){
            			var totle=res.length;
            			
            			$("#totle_waiting").html(totle);
            		},
            		error:function(){
            			//console.log("ajax error!");
            		}
            	   });
               
            });
  //*********************************************************************************************************           
            $("#finished_history_btn").click(function(){
            	
            	    eventBus.off(constants.refreshNumber_chart);
            	
            	var finished_job= new finished_jobMonitorView({el: $('#listNodesTable_wrapper_only_jobs')});
            	
            	    finished_job.render();
            	    
            	var job_bar= new jobBarView({el: $('#alarm_jobMonitor_chart')});    
            	    
            	    job_bar.render();
            	     
            	    $("#finished_history_btn").css("color","#000000");
            	    $("#running_job_btn").css("color","rgb(51, 122, 183)");
            	    $("#waiting_job_btn").css("color","rgb(51, 122, 183)");
            	    
            	    $.ajax({
            		type:"get",
            		url:"/api/jobs/?status=finished&role=admin",
            		async:true,
            		success:function(res){
            			
            			
            			var totle=res.length;
            			
            			$("#totle_finishing").html(totle);
            		},
            		error:function(){
            			//console.log("ajax error!");
            		}
            	    });
            	    
            });
 
 //*********************************************************************************************************
 //*********************************************************************************************************

          

            },
            
            refreshNumber:function(){
            	
            	$.ajax({
            		type:"get",
            		url:"/api/jobs/?status=running&role=admin",
            		async:true,
            		success:function(res){
            			
            			var totle=res.length;
            			
            			$("#totle_running").html(totle);
            			
            		},
            		error:function(){
            			//console.log("ajax error!");
            		}
            	});
            	
            	$.ajax({
            		type:"get",
            		url:"/api/jobs/?status=waitforrun&role=admin",
            		async:true,
            		success:function(res){
            			
            			var totle=res.length;
            			
            			$("#totle_waiting").html(totle);
            		},
            		error:function(){
            			//console.log("ajax error!");
            		}
            	});
            	
            	$.ajax({
            		type:"get",
            		url:"/api/jobs/?status=finished&role=admin",
            		async:true,
            		success:function(res){
            			
            			var totle=res.length;
            			
            			$("#totle_finishing").html(totle);
            		},
            		error:function(){
            			//console.log("ajax error!");
            		}
            	});
            	
            	
            	
            }
            
           

		});
	});