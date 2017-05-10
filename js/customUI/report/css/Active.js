function interActive(){
	       
	        $("body").css("background","#ffffff");
	        $(".overall-heading").css("font-family","微软雅黑");
	        $("h3").css("font-family","微软雅黑");
	        $(".reportViewTplHead jobs_select_templates_period_inner_title").css("font-family","微软雅黑");
	        
	        var userAgent = navigator.userAgent


//          alert(userAgent);
            
	         if ( userAgent.indexOf("Firefox") > -1   ) {  
	         	
//*****************************************火狐浏览器样式修复开始************************************************************************************************************

               	
            $("li[name='jobReportStat']").css("background","#f5f5f5");
            $("li[name='jobReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            $("#headingOne").css("background","-webkit-gradient(linear, 0% 0%, 0% 100%,from(#b0d4f5), to(#7ba8d1))");

            $("li[name='jobReportStat']").css("background","#f5f5f5");
            $("#headingOne").css("background","#7ba8d1");
            
            $("#headingOne").css("color","#ffffff");
            $("#headingTwo").css("background","-webkit-gradient(linear, 0% 0%, 0% 100%,from(#ffffff), to(#ffffff))");
           	$("#headingTwo").css("color","#000000");
           	$("#headingThree").css("background","-webkit-gradient(linear, 0% 0%, 0% 100%,from(#ffffff), to(#ffffff))");
           	$("#headingThree").css("color","#000000");
            $(".panel_icon_job").css("background-image","url('/static/js/customUI/report/resource/job_active.png')");
            $(".icon_of_open_job").css("background-image","url('/static/js/customUI/report/resource/select_part_open.png')");
            
            $("#headingOne").click(function(){
           	
           	   $("#headingOne").css("background","#7ba8d1");
           	   
           	   $("#headingOne").css("color","#ffffff");
           	   $("#headingTwo").css("background","#ffffff");
               $("#headingTwo").css("color","#000000");
           	   $("#headingThree").css("background","#ffffff");
               $("#headingThree").css("color","#000000");
               
           	   $(".list-group-item").css("background","#ffffff");
           	   $(".panel_icon_job").css("background-image","url('/static/js/customUI/report/resource/job_active.png')");
               $(".panel_icon_alarm").css("background-image","url('/static/js/customUI/report/resource/alarm.png')");
               $(".panel_icon_log").css("background-image","url('/static/js/customUI/report/resource/log.png')");
               
               $(".icon_of_open_job").css("background-image","url('/static/js/customUI/report/resource/select_part_open.png')");
               $(".icon_of_open_alarm").css("background-image","url('/static/js/customUI/report/resource/select_part_close.png')");
               $(".icon_of_open_log").css("background-image","url('/static/js/customUI/report/resource/select_part_close.png')");
            
               $(".icon_of_open_job").toggleClass("turnRound");
               $(".icon_of_open_alarm").css("background-color","url('/static/js/customUI/report/resource/select_part_close.png') !important");
               $(".icon_of_open_log").css("background-color","url('/static/js/customUI/report/resource/select_part_close.png') !important");
               

            });
            
            $("#headingTwo").click(function(){
            	
            	$("#headingTwo").css("background","#7ba8d1");
           	    $("#headingTwo").css("color","#ffffff");
           	    $("#headingOne").css("background","#ffffff");
                $("#headingOne").css("color","#000000");
           	    $("#headingThree").css("background","#ffffff");
                $("#headingThree").css("color","#000000");
                
                $(".list-group-item").css("background","#ffffff");
           	    $(".panel_icon_job").css("background-image","url('/static/js/customUI/report/resource/job.png')");
           	    $(".panel_icon_alarm").css("background-image","url('/static/js/customUI/report/resource/alarm_active.png')");
           	    $(".panel_icon_log").css("background-image","url('/static/js/customUI/report/resource/log.png')");
           	    
           	   $(".icon_of_open_job").css("background-image","url('/static/js/customUI/report/resource/select_part_close.png')");
               $(".icon_of_open_alarm").css("background-image","url('/static/js/customUI/report/resource/select_part_open.png')");
               $(".icon_of_open_log").css("background-image","url('/static/js/customUI/report/resource/select_part_close.png')");
            
                $(".icon_of_open_alarm").toggleClass("turnRound");
                $(".icon_of_open_job").css("background-color","url('/static/js/customUI/report/resource/select_part_close.png') !important");
                $(".icon_of_open_log").css("background-color","url('/static/js/customUI/report/resource/select_part_close.png') !important");
                
            });
            
            $("#headingThree").click(function(){
            	
            	$("#headingThree").css("background","#7ba8d1");
           	    $("#headingThree").css("color","#ffffff");
           	    $("#headingTwo").css("background","#ffffff");
                $("#headingTwo").css("color","#000000");
           	    $("#headingOne").css("background","#ffffff");
                $("#headingOne").css("color","#000000");
                
                $(".list-group-item").css("background","#ffffff");
                $(".panel_icon_job").css("background-image","url('/static/js/customUI/report/resource/job.png')");
           	    $(".panel_icon_log").css("background-image","url('/static/js/customUI/report/resource/log_active.png')");
           	    $(".panel_icon_alarm").css("background-image","url('/static/js/customUI/report/resource/alarm.png')");
           	    
           	    $(".icon_of_open_job").css("background-image","url('/static/js/customUI/report/resource/select_part_close.png')");
                $(".icon_of_open_alarm").css("background-image","url('/static/js/customUI/report/resource/select_part_close.png')");
                $(".icon_of_open_log").css("background-image","url('/static/js/customUI/report/resource/select_part_open.png')");
            
                $(".icon_of_open_log").toggleClass("turnRound");//
                $(".icon_of_open_alarm").css("background-color","url('/static/js/customUI/report/resource/select_part_close.png') !important");
                $(".icon_of_open_job").css("background-color","url('/static/js/customUI/report/resource/select_part_close.png') !important");
                

            });
   
//****************************************************************************************************************************         
            $("li[name='logReportDetail']").click(function(){
            	
            	$("li[name='user_storageReportStat']").css("background","#ffffff");
            	$("li[name='user_loginReportStat']").css("background","#ffffff");
            	$("li[name='node_userReportStat']").css("background","#ffffff");
            	$("li[name='node_runningReportStat']").css("background","#ffffff");
            	$("li[name='logReportDetail']").css("background","#f2f2f2");

            	
            	$("li[name='user_storageReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='user_loginReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='node_userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='node_runningReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='logReportDetail'] .part_panel_icon").addClass("part_panel_icon_bg");
            });
            
            $("li[name='node_runningReportStat']").click(function(){
            	
            	$("li[name='user_storageReportStat']").css("background","#ffffff");
            	$("li[name='user_loginReportStat']").css("background","#ffffff");
            	$("li[name='node_userReportStat']").css("background","#ffffff");
            	$("li[name='node_runningReportStat']").css("background","#f5f5f5");
            	$("li[name='logReportDetail']").css("background","#ffffff");

            	
            	$("li[name='user_storageReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='user_loginReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='node_userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='node_runningReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            	$("li[name='logReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            });
            
            $("li[name='node_userReportStat']").click(function(){
            	
            	$("li[name='user_storageReportStat']").css("background","#ffffff");
            	$("li[name='user_loginReportStat']").css("background","#ffffff");
            	$("li[name='node_userReportStat']").css("background","#f5f5f5");
            	$("li[name='node_runningReportStat']").css("background","#ffffff");
            	$("li[name='logReportDetail']").css("background","#ffffff");

            	
            	$("li[name='user_storageReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='user_loginReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='node_userReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            	$("li[name='node_runningReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='logReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            });
            
            $("li[name='user_loginReportStat']").click(function(){
            	
            	$("li[name='user_storageReportStat']").css("background","#ffffff");
            	$("li[name='user_loginReportStat']").css("background","#f5f5f5");
            	$("li[name='node_userReportStat']").css("background","#ffffff");
            	$("li[name='node_runningReportStat']").css("background","#ffffff");
            	$("li[name='logReportDetail']").css("background","#ffffff");

            	
            	$("li[name='user_storageReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='user_loginReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            	$("li[name='node_userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='node_runningReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='logReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            });
            
            $("li[name='user_storageReportStat']").click(function(){
            	
            	$("li[name='user_storageReportStat']").css("background","#f5f5f5");
            	$("li[name='user_loginReportStat']").css("background","#ffffff");
            	$("li[name='node_userReportStat']").css("background","#ffffff");
            	$("li[name='node_runningReportStat']").css("background","#ffffff");
            	$("li[name='logReportDetail']").css("background","#ffffff");

            	
            	$("li[name='user_storageReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            	$("li[name='user_loginReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='node_userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='node_runningReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='logReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");

            });
 //***************************************************************************************************************************
         
            
            $("li[name='alarmReportStat']").click(function(){
            	$("li[name='alarmReportStat']").css("background","#f5f5f5");
            	$("li[name='alarmReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            	$("li[name='alarmReportDetail']").css("background","#ffffff");
            	$("li[name='alarmReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            });
            
            $("li[name='alarmReportDetail']").click(function(){
            	$("li[name='alarmReportDetail']").css("background","#f5f5f5");
            	$("li[name='alarmReportDetail'] .part_panel_icon").addClass("part_panel_icon_bg");
            	
            	$("li[name='alarmReportStat']").css("background","#ffffff");
            	$("li[name='alarmReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("#reportViewSubmit").css("bottom","-10px");
            });
 //*****************************************************************************
 //*****************************************************************************
            $("li[name='jobReportStat']").click(function(){
            	$("li[name='jobReportStat']").css("background","#f5f5f5");
            	$("li[name='jobReportDetail']").css("background","#ffffff");
            	
            	$("li[name='nodeReportStat']").css("background","#ffffff");
            	$("li[name='nodeReportDetail']").css("background","#ffffff");
            	
            	$("li[name='userReportStat']").css("background","#ffffff");
            	$("li[name='userReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportStat']").css("background","#ffffff");
            	$("li[name='billReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='jobReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='jobReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            	
            	$("li[name='nodeReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='nodeReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='userReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='billReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            });
           
            $("li[name='jobReportDetail']").click(function(){
            	$("li[name='jobReportDetail']").css("background","#f5f5f5");
            	$("li[name='jobReportStat']").css("background","#ffffff");
            	
            	$("li[name='nodeReportStat']").css("background","#ffffff");
            	$("li[name='nodeReportDetail']").css("background","#ffffff");
            	
            	$("li[name='userReportStat']").css("background","#ffffff");
            	$("li[name='userReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportStat']").css("background","#ffffff");
            	$("li[name='billReportDetail']").css("background","#ffffff");
            	
            	 $("li[name='billReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='jobReportDetail'] .part_panel_icon").addClass("part_panel_icon_bg");
            	
            	$("li[name='jobReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='nodeReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='nodeReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='userReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='billReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            });       

           $("li[name='nodeReportStat']").click(function(){
            	$("li[name='jobReportDetail']").css("background","#ffffff");
            	$("li[name='jobReportStat']").css("background","#ffffff");
            	
            	$("li[name='nodeReportStat']").css("background","#f5f5f5");
            	$("li[name='nodeReportDetail']").css("background","#ffffff");
            	
            	$("li[name='userReportStat']").css("background","#ffffff");
            	$("li[name='userReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportStat']").css("background","#ffffff");
            	$("li[name='billReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='jobReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='jobReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='nodeReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            	$("li[name='nodeReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='userReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='billReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            }); 
            
            $("li[name='nodeReportDetail']").click(function(){
            	$("li[name='jobReportDetail']").css("background","#ffffff");
            	$("li[name='jobReportStat']").css("background","#ffffff");
            	
            	$("li[name='nodeReportStat']").css("background","#ffffff");
            	$("li[name='nodeReportDetail']").css("background","#f5f5f5");
            	
            	$("li[name='userReportStat']").css("background","#ffffff");
            	$("li[name='userReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportStat']").css("background","#ffffff");
            	$("li[name='billReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='jobReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='jobReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='nodeReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='nodeReportDetail'] .part_panel_icon").addClass("part_panel_icon_bg");
            	
            	$("li[name='userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='userReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='billReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            }); 
            
            $("li[name='userReportStat']").click(function(){
            	$("li[name='jobReportDetail']").css("background","#ffffff");
            	$("li[name='jobReportStat']").css("background","#ffffff");
            	
            	$("li[name='nodeReportStat']").css("background","#ffffff");
            	$("li[name='nodeReportDetail']").css("background","#ffffff");
            	
            	$("li[name='userReportStat']").css("background","#f5f5f5");
            	$("li[name='userReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportStat']").css("background","#ffffff");
            	$("li[name='billReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='jobReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='jobReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='nodeReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='nodeReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='userReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            	$("li[name='userReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='billReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            }); 
            
            $("li[name='userReportDetail']").click(function(){
            	$("li[name='jobReportDetail']").css("background","#ffffff");
            	$("li[name='jobReportStat']").css("background","#ffffff");
            	
            	$("li[name='nodeReportStat']").css("background","#ffffff");
            	$("li[name='nodeReportDetail']").css("background","#ffffff");
            	
            	$("li[name='userReportStat']").css("background","#ffffff");
            	$("li[name='userReportDetail']").css("background","#f5f5f5");
            	
            	$("li[name='billReportStat']").css("background","#ffffff");
            	$("li[name='billReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='jobReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='jobReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='nodeReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='nodeReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='userReportDetail'] .part_panel_icon").addClass("part_panel_icon_bg");
            	
            	$("li[name='billReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            }); 
            
            $("li[name='billReportStat']").click(function(){
            	$("li[name='jobReportDetail']").css("background","#ffffff");
            	$("li[name='jobReportStat']").css("background","#ffffff");
            	
            	$("li[name='nodeReportStat']").css("background","#ffffff");
            	$("li[name='nodeReportDetail']").css("background","#ffffff");
            	
            	$("li[name='userReportStat']").css("background","#ffffff");
            	$("li[name='userReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportStat']").css("background","#f5f5f5");
            	$("li[name='billReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='jobReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='jobReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='nodeReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='nodeReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='userReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='billReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            }); 
            
            $("li[name='billReportDetail']").click(function(){
            	$("li[name='jobReportDetail']").css("background","#ffffff");
            	$("li[name='jobReportStat']").css("background","#ffffff");
            	
            	$("li[name='nodeReportStat']").css("background","#ffffff");
            	$("li[name='nodeReportDetail']").css("background","#ffffff");
            	
            	$("li[name='userReportStat']").css("background","#ffffff");
            	$("li[name='userReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportStat']").css("background","#ffffff");
            	$("li[name='billReportDetail']").css("background","#f5f5f5");
            	
            	$("li[name='billReportDetail'] .part_panel_icon").addClass("part_panel_icon_bg");
            	$("li[name='jobReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='jobReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='nodeReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='nodeReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='userReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='billReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            }); 
 //*****************************************************************************
 //*****************************************************************************  
         
    
           
           
//*************************************************火狐浏览器样式修复结束****************************************************************************************************
            
              }else if(userAgent.indexOf("Trident") > -1){
              	
             $("li[name='jobReportStat']").css("background","#f5f5f5");
            $("li[name='jobReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            $("#headingOne").css("background","-webkit-gradient(linear, 0% 0%, 0% 100%,from(#b0d4f5), to(#7ba8d1))");

            $("li[name='jobReportStat']").css("background","#f5f5f5");
            $("#headingOne").css("background","#7ba8d1");
            
            $("#headingOne").css("color","#ffffff");
            $("#headingTwo").css("background","-webkit-gradient(linear, 0% 0%, 0% 100%,from(#ffffff), to(#ffffff))");
           	$("#headingTwo").css("color","#000000");
           	$("#headingThree").css("background","-webkit-gradient(linear, 0% 0%, 0% 100%,from(#ffffff), to(#ffffff))");
           	$("#headingThree").css("color","#000000");
            $(".panel_icon_job").css("background-image","url('/static/js/customUI/report/resource/job_active.png')");
            $(".icon_of_open_job").css("background-image","url('/static/js/customUI/report/resource/select_part_open.png')");
            
            $("#headingOne").click(function(){
           	
           	   $("#headingOne").css("background","#7ba8d1");
           	   
           	   $("#headingOne").css("color","#ffffff");
           	   $("#headingTwo").css("background","#ffffff");
               $("#headingTwo").css("color","#000000");
           	   $("#headingThree").css("background","#ffffff");
               $("#headingThree").css("color","#000000");
               
           	   $(".list-group-item").css("background","#ffffff");
           	   $(".panel_icon_job").css("background-image","url('/static/js/customUI/report/resource/job_active.png')");
               $(".panel_icon_alarm").css("background-image","url('/static/js/customUI/report/resource/alarm.png')");
               $(".panel_icon_log").css("background-image","url('/static/js/customUI/report/resource/log.png')");
               
               $(".icon_of_open_job").css("background-image","url('/static/js/customUI/report/resource/select_part_open.png')");
               $(".icon_of_open_alarm").css("background-image","url('/static/js/customUI/report/resource/select_part_close.png')");
               $(".icon_of_open_log").css("background-image","url('/static/js/customUI/report/resource/select_part_close.png')");
            
               $(".icon_of_open_job").toggleClass("turnRound");
               $(".icon_of_open_alarm").css("background-color","url('/static/js/customUI/report/resource/select_part_close.png') !important");
               $(".icon_of_open_log").css("background-color","url('/static/js/customUI/report/resource/select_part_close.png') !important");
               

            });
            
            $("#headingTwo").click(function(){
            	
            	$("#headingTwo").css("background","#7ba8d1");
           	    $("#headingTwo").css("color","#ffffff");
           	    $("#headingOne").css("background","#ffffff");
                $("#headingOne").css("color","#000000");
           	    $("#headingThree").css("background","#ffffff");
                $("#headingThree").css("color","#000000");
                
                $(".list-group-item").css("background","#ffffff");
           	    $(".panel_icon_job").css("background-image","url('/static/js/customUI/report/resource/job.png')");
           	    $(".panel_icon_alarm").css("background-image","url('/static/js/customUI/report/resource/alarm_active.png')");
           	    $(".panel_icon_log").css("background-image","url('/static/js/customUI/report/resource/log.png')");
           	    
           	   $(".icon_of_open_job").css("background-image","url('/static/js/customUI/report/resource/select_part_close.png')");
               $(".icon_of_open_alarm").css("background-image","url('/static/js/customUI/report/resource/select_part_open.png')");
               $(".icon_of_open_log").css("background-image","url('/static/js/customUI/report/resource/select_part_close.png')");
            
                $(".icon_of_open_alarm").toggleClass("turnRound");
                $(".icon_of_open_job").css("background-color","url('/static/js/customUI/report/resource/select_part_close.png') !important");
                $(".icon_of_open_log").css("background-color","url('/static/js/customUI/report/resource/select_part_close.png') !important");
                
            });
            
            $("#headingThree").click(function(){
            	
            	$("#headingThree").css("background","#7ba8d1");
           	    $("#headingThree").css("color","#ffffff");
           	    $("#headingTwo").css("background","#ffffff");
                $("#headingTwo").css("color","#000000");
           	    $("#headingOne").css("background","#ffffff");
                $("#headingOne").css("color","#000000");
                
                $(".list-group-item").css("background","#ffffff");
                $(".panel_icon_job").css("background-image","url('/static/js/customUI/report/resource/job.png')");
           	    $(".panel_icon_log").css("background-image","url('/static/js/customUI/report/resource/log_active.png')");
           	    $(".panel_icon_alarm").css("background-image","url('/static/js/customUI/report/resource/alarm.png')");
           	    
           	    $(".icon_of_open_job").css("background-image","url('/static/js/customUI/report/resource/select_part_close.png')");
                $(".icon_of_open_alarm").css("background-image","url('/static/js/customUI/report/resource/select_part_close.png')");
                $(".icon_of_open_log").css("background-image","url('/static/js/customUI/report/resource/select_part_open.png')");
            
                $(".icon_of_open_log").toggleClass("turnRound");//
                $(".icon_of_open_alarm").css("background-color","url('/static/js/customUI/report/resource/select_part_close.png') !important");
                $(".icon_of_open_job").css("background-color","url('/static/js/customUI/report/resource/select_part_close.png') !important");
                

            });
   
//****************************************************************************************************************************         
            $("li[name='logReportDetail']").click(function(){
            	
            	$("li[name='user_storageReportStat']").css("background","#ffffff");
            	$("li[name='user_loginReportStat']").css("background","#ffffff");
            	$("li[name='node_userReportStat']").css("background","#ffffff");
            	$("li[name='node_runningReportStat']").css("background","#ffffff");
            	$("li[name='logReportDetail']").css("background","#f2f2f2");

            	
            	$("li[name='user_storageReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='user_loginReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='node_userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='node_runningReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='logReportDetail'] .part_panel_icon").addClass("part_panel_icon_bg");
            });
            
            $("li[name='node_runningReportStat']").click(function(){
            	
            	$("li[name='user_storageReportStat']").css("background","#ffffff");
            	$("li[name='user_loginReportStat']").css("background","#ffffff");
            	$("li[name='node_userReportStat']").css("background","#ffffff");
            	$("li[name='node_runningReportStat']").css("background","#f5f5f5");
            	$("li[name='logReportDetail']").css("background","#ffffff");

            	
            	$("li[name='user_storageReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='user_loginReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='node_userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='node_runningReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            	$("li[name='logReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            });
            
            $("li[name='node_userReportStat']").click(function(){
            	
            	$("li[name='user_storageReportStat']").css("background","#ffffff");
            	$("li[name='user_loginReportStat']").css("background","#ffffff");
            	$("li[name='node_userReportStat']").css("background","#f5f5f5");
            	$("li[name='node_runningReportStat']").css("background","#ffffff");
            	$("li[name='logReportDetail']").css("background","#ffffff");

            	
            	$("li[name='user_storageReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='user_loginReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='node_userReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            	$("li[name='node_runningReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='logReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            });
            
            $("li[name='user_loginReportStat']").click(function(){
            	
            	$("li[name='user_storageReportStat']").css("background","#ffffff");
            	$("li[name='user_loginReportStat']").css("background","#f5f5f5");
            	$("li[name='node_userReportStat']").css("background","#ffffff");
            	$("li[name='node_runningReportStat']").css("background","#ffffff");
            	$("li[name='logReportDetail']").css("background","#ffffff");

            	
            	$("li[name='user_storageReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='user_loginReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            	$("li[name='node_userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='node_runningReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='logReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            });
            
            $("li[name='user_storageReportStat']").click(function(){
            	
            	$("li[name='user_storageReportStat']").css("background","#f5f5f5");
            	$("li[name='user_loginReportStat']").css("background","#ffffff");
            	$("li[name='node_userReportStat']").css("background","#ffffff");
            	$("li[name='node_runningReportStat']").css("background","#ffffff");
            	$("li[name='logReportDetail']").css("background","#ffffff");

            	
            	$("li[name='user_storageReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            	$("li[name='user_loginReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='node_userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='node_runningReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='logReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");

            });
 //***************************************************************************************************************************
         
            
            $("li[name='alarmReportStat']").click(function(){
            	$("li[name='alarmReportStat']").css("background","#f5f5f5");
            	$("li[name='alarmReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            	$("li[name='alarmReportDetail']").css("background","#ffffff");
            	$("li[name='alarmReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            });
            
            $("li[name='alarmReportDetail']").click(function(){
            	$("li[name='alarmReportDetail']").css("background","#f5f5f5");
            	$("li[name='alarmReportDetail'] .part_panel_icon").addClass("part_panel_icon_bg");
            	
            	$("li[name='alarmReportStat']").css("background","#ffffff");
            	$("li[name='alarmReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("#reportViewSubmit").css("bottom","-10px");
            });
 //*****************************************************************************
 //*****************************************************************************
            $("li[name='jobReportStat']").click(function(){
            	$("li[name='jobReportStat']").css("background","#f5f5f5");
            	$("li[name='jobReportDetail']").css("background","#ffffff");
            	
            	$("li[name='nodeReportStat']").css("background","#ffffff");
            	$("li[name='nodeReportDetail']").css("background","#ffffff");
            	
            	$("li[name='userReportStat']").css("background","#ffffff");
            	$("li[name='userReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportStat']").css("background","#ffffff");
            	$("li[name='billReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='jobReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='jobReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            	
            	$("li[name='nodeReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='nodeReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='userReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='billReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            });
           
            $("li[name='jobReportDetail']").click(function(){
            	$("li[name='jobReportDetail']").css("background","#f5f5f5");
            	$("li[name='jobReportStat']").css("background","#ffffff");
            	
            	$("li[name='nodeReportStat']").css("background","#ffffff");
            	$("li[name='nodeReportDetail']").css("background","#ffffff");
            	
            	$("li[name='userReportStat']").css("background","#ffffff");
            	$("li[name='userReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportStat']").css("background","#ffffff");
            	$("li[name='billReportDetail']").css("background","#ffffff");
            	
            	 $("li[name='billReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='jobReportDetail'] .part_panel_icon").addClass("part_panel_icon_bg");
            	
            	$("li[name='jobReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='nodeReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='nodeReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='userReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='billReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            });       

           $("li[name='nodeReportStat']").click(function(){
            	$("li[name='jobReportDetail']").css("background","#ffffff");
            	$("li[name='jobReportStat']").css("background","#ffffff");
            	
            	$("li[name='nodeReportStat']").css("background","#f5f5f5");
            	$("li[name='nodeReportDetail']").css("background","#ffffff");
            	
            	$("li[name='userReportStat']").css("background","#ffffff");
            	$("li[name='userReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportStat']").css("background","#ffffff");
            	$("li[name='billReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='jobReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='jobReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='nodeReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            	$("li[name='nodeReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='userReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='billReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            }); 
            
            $("li[name='nodeReportDetail']").click(function(){
            	$("li[name='jobReportDetail']").css("background","#ffffff");
            	$("li[name='jobReportStat']").css("background","#ffffff");
            	
            	$("li[name='nodeReportStat']").css("background","#ffffff");
            	$("li[name='nodeReportDetail']").css("background","#f5f5f5");
            	
            	$("li[name='userReportStat']").css("background","#ffffff");
            	$("li[name='userReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportStat']").css("background","#ffffff");
            	$("li[name='billReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='jobReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='jobReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='nodeReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='nodeReportDetail'] .part_panel_icon").addClass("part_panel_icon_bg");
            	
            	$("li[name='userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='userReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='billReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            }); 
            
            $("li[name='userReportStat']").click(function(){
            	$("li[name='jobReportDetail']").css("background","#ffffff");
            	$("li[name='jobReportStat']").css("background","#ffffff");
            	
            	$("li[name='nodeReportStat']").css("background","#ffffff");
            	$("li[name='nodeReportDetail']").css("background","#ffffff");
            	
            	$("li[name='userReportStat']").css("background","#f5f5f5");
            	$("li[name='userReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportStat']").css("background","#ffffff");
            	$("li[name='billReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='jobReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='jobReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='nodeReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='nodeReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='userReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            	$("li[name='userReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='billReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            }); 
            
            $("li[name='userReportDetail']").click(function(){
            	$("li[name='jobReportDetail']").css("background","#ffffff");
            	$("li[name='jobReportStat']").css("background","#ffffff");
            	
            	$("li[name='nodeReportStat']").css("background","#ffffff");
            	$("li[name='nodeReportDetail']").css("background","#ffffff");
            	
            	$("li[name='userReportStat']").css("background","#ffffff");
            	$("li[name='userReportDetail']").css("background","#f5f5f5");
            	
            	$("li[name='billReportStat']").css("background","#ffffff");
            	$("li[name='billReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='jobReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='jobReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='nodeReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='nodeReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='userReportDetail'] .part_panel_icon").addClass("part_panel_icon_bg");
            	
            	$("li[name='billReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            }); 
            
            $("li[name='billReportStat']").click(function(){
            	$("li[name='jobReportDetail']").css("background","#ffffff");
            	$("li[name='jobReportStat']").css("background","#ffffff");
            	
            	$("li[name='nodeReportStat']").css("background","#ffffff");
            	$("li[name='nodeReportDetail']").css("background","#ffffff");
            	
            	$("li[name='userReportStat']").css("background","#ffffff");
            	$("li[name='userReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportStat']").css("background","#f5f5f5");
            	$("li[name='billReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='jobReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='jobReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='nodeReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='nodeReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='userReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='billReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            }); 
            
            $("li[name='billReportDetail']").click(function(){
            	$("li[name='jobReportDetail']").css("background","#ffffff");
            	$("li[name='jobReportStat']").css("background","#ffffff");
            	
            	$("li[name='nodeReportStat']").css("background","#ffffff");
            	$("li[name='nodeReportDetail']").css("background","#ffffff");
            	
            	$("li[name='userReportStat']").css("background","#ffffff");
            	$("li[name='userReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportStat']").css("background","#ffffff");
            	$("li[name='billReportDetail']").css("background","#f5f5f5");
            	
            	$("li[name='billReportDetail'] .part_panel_icon").addClass("part_panel_icon_bg");
            	$("li[name='jobReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='jobReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='nodeReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='nodeReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='userReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='billReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            });              	
              	
              	
              	
              	
              	
              }else{
               	
            $("li[name='jobReportStat']").css("background","#f5f5f5");
            $("li[name='jobReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            $("#headingOne").css("background","-webkit-gradient(linear, 0% 0%, 0% 100%,from(#b0d4f5), to(#7ba8d1))");

            $("li[name='jobReportStat']").css("background","#f5f5f5");
            $("#headingOne").css("background","-webkit-gradient(linear, 0% 0%, 0% 100%,from(#b0d4f5), to(#7ba8d1))");
            $("#headingOne").css("color","#ffffff");
            $("#headingTwo").css("background","-webkit-gradient(linear, 0% 0%, 0% 100%,from(#ffffff), to(#ffffff))");
           	$("#headingTwo").css("color","#000000");
           	$("#headingThree").css("background","-webkit-gradient(linear, 0% 0%, 0% 100%,from(#ffffff), to(#ffffff))");
           	$("#headingThree").css("color","#000000");
            $(".panel_icon_job").css("background-image","url('/static/js/customUI/report/resource/job_active.png')");
            $(".icon_of_open_job").css("background-image","url('/static/js/customUI/report/resource/select_part_open.png')");
            
            $("#headingOne").click(function(){
           	
           	   $("#headingOne").css("background","-webkit-gradient(linear, 0% 0%, 0% 100%,from(#b0d4f5), to(#7ba8d1))");
           	   $("#headingOne").css("color","#ffffff");
           	   $("#headingTwo").css("background","#ffffff");
               $("#headingTwo").css("color","#000000");
           	   $("#headingThree").css("background","#ffffff");
               $("#headingThree").css("color","#000000");
               
           	   $(".list-group-item").css("background","#ffffff");
           	   $(".panel_icon_job").css("background-image","url('/static/js/customUI/report/resource/job_active.png')");
               $(".panel_icon_alarm").css("background-image","url('/static/js/customUI/report/resource/alarm.png')");
               $(".panel_icon_log").css("background-image","url('/static/js/customUI/report/resource/log.png')");
               
               $(".icon_of_open_job").css("background-image","url('/static/js/customUI/report/resource/select_part_open.png')");
               $(".icon_of_open_alarm").css("background-image","url('/static/js/customUI/report/resource/select_part_close.png')");
               $(".icon_of_open_log").css("background-image","url('/static/js/customUI/report/resource/select_part_close.png')");
            
               $(".icon_of_open_job").toggleClass("turnRound");
               $(".icon_of_open_alarm").css("background-color","url('/static/js/customUI/report/resource/select_part_close.png') !important");
               $(".icon_of_open_log").css("background-color","url('/static/js/customUI/report/resource/select_part_close.png') !important");
               
            });
            
            $("#headingTwo").click(function(){
            	
            	$("#headingTwo").css("background","-webkit-gradient(linear, 0% 0%, 0% 100%,from(#b0d4f5), to(#7ba8d1))");
           	    $("#headingTwo").css("color","#ffffff");
           	    $("#headingOne").css("background","#ffffff");
                $("#headingOne").css("color","#000000");
           	    $("#headingThree").css("background","#ffffff");
                $("#headingThree").css("color","#000000");
                
                $(".list-group-item").css("background","#ffffff");
           	    $(".panel_icon_job").css("background-image","url('/static/js/customUI/report/resource/job.png')");
           	    $(".panel_icon_alarm").css("background-image","url('/static/js/customUI/report/resource/alarm_active.png')");
           	    $(".panel_icon_log").css("background-image","url('/static/js/customUI/report/resource/log.png')");
           	    
           	   $(".icon_of_open_job").css("background-image","url('/static/js/customUI/report/resource/select_part_close.png')");
               $(".icon_of_open_alarm").css("background-image","url('/static/js/customUI/report/resource/select_part_open.png')");
               $(".icon_of_open_log").css("background-image","url('/static/js/customUI/report/resource/select_part_close.png')");
            
                $(".icon_of_open_alarm").toggleClass("turnRound");
                $(".icon_of_open_job").css("background-color","url('/static/js/customUI/report/resource/select_part_close.png') !important");
                $(".icon_of_open_log").css("background-color","url('/static/js/customUI/report/resource/select_part_close.png') !important");
                
            });
            
            $("#headingThree").click(function(){
            	
            	$("#headingThree").css("background","-webkit-gradient(linear, 0% 0%, 0% 100%,from(#b0d4f5), to(#7ba8d1))");
           	    $("#headingThree").css("color","#ffffff");
           	    $("#headingTwo").css("background","#ffffff");
                $("#headingTwo").css("color","#000000");
           	    $("#headingOne").css("background","#ffffff");
                $("#headingOne").css("color","#000000");
                
                $(".list-group-item").css("background","#ffffff");
                $(".panel_icon_job").css("background-image","url('/static/js/customUI/report/resource/job.png')");
           	    $(".panel_icon_log").css("background-image","url('/static/js/customUI/report/resource/log_active.png')");
           	    $(".panel_icon_alarm").css("background-image","url('/static/js/customUI/report/resource/alarm.png')");
           	    
           	    $(".icon_of_open_job").css("background-image","url('/static/js/customUI/report/resource/select_part_close.png')");
                $(".icon_of_open_alarm").css("background-image","url('/static/js/customUI/report/resource/select_part_close.png')");
                $(".icon_of_open_log").css("background-image","url('/static/js/customUI/report/resource/select_part_open.png')");
            
                $(".icon_of_open_log").toggleClass("turnRound");//
                $(".icon_of_open_alarm").css("background-color","url('/static/js/customUI/report/resource/select_part_close.png') !important");
                $(".icon_of_open_job").css("background-color","url('/static/js/customUI/report/resource/select_part_close.png') !important");
                
            });
   
//****************************************************************************************************************************         
            $("li[name='logReportDetail']").click(function(){
            	
            	$("li[name='user_storageReportStat']").css("background","#ffffff");
            	$("li[name='user_loginReportStat']").css("background","#ffffff");
            	$("li[name='node_userReportStat']").css("background","#ffffff");
            	$("li[name='node_runningReportStat']").css("background","#ffffff");
            	$("li[name='logReportDetail']").css("background","#f2f2f2");

            	
            	$("li[name='user_storageReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='user_loginReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='node_userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='node_runningReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='logReportDetail'] .part_panel_icon").addClass("part_panel_icon_bg");
            });
            
            $("li[name='node_runningReportStat']").click(function(){
            	
            	$("li[name='user_storageReportStat']").css("background","#ffffff");
            	$("li[name='user_loginReportStat']").css("background","#ffffff");
            	$("li[name='node_userReportStat']").css("background","#ffffff");
            	$("li[name='node_runningReportStat']").css("background","#f5f5f5");
            	$("li[name='logReportDetail']").css("background","#ffffff");

            	
            	$("li[name='user_storageReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='user_loginReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='node_userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='node_runningReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            	$("li[name='logReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            });
            
            $("li[name='node_userReportStat']").click(function(){
            	
            	$("li[name='user_storageReportStat']").css("background","#ffffff");
            	$("li[name='user_loginReportStat']").css("background","#ffffff");
            	$("li[name='node_userReportStat']").css("background","#f5f5f5");
            	$("li[name='node_runningReportStat']").css("background","#ffffff");
            	$("li[name='logReportDetail']").css("background","#ffffff");

            	
            	$("li[name='user_storageReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='user_loginReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='node_userReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            	$("li[name='node_runningReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='logReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            });
            
            $("li[name='user_loginReportStat']").click(function(){
            	
            	$("li[name='user_storageReportStat']").css("background","#ffffff");
            	$("li[name='user_loginReportStat']").css("background","#f5f5f5");
            	$("li[name='node_userReportStat']").css("background","#ffffff");
            	$("li[name='node_runningReportStat']").css("background","#ffffff");
            	$("li[name='logReportDetail']").css("background","#ffffff");

            	
            	$("li[name='user_storageReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='user_loginReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            	$("li[name='node_userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='node_runningReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='logReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            });
            
            $("li[name='user_storageReportStat']").click(function(){
            	
            	$("li[name='user_storageReportStat']").css("background","#f5f5f5");
            	$("li[name='user_loginReportStat']").css("background","#ffffff");
            	$("li[name='node_userReportStat']").css("background","#ffffff");
            	$("li[name='node_runningReportStat']").css("background","#ffffff");
            	$("li[name='logReportDetail']").css("background","#ffffff");

            	
            	$("li[name='user_storageReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            	$("li[name='user_loginReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='node_userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='node_runningReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='logReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");

            });
 //***************************************************************************************************************************
         
            
            $("li[name='alarmReportStat']").click(function(){
            	$("li[name='alarmReportStat']").css("background","#f5f5f5");
            	$("li[name='alarmReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            	$("li[name='alarmReportDetail']").css("background","#ffffff");
            	$("li[name='alarmReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            });
            
            $("li[name='alarmReportDetail']").click(function(){
            	$("li[name='alarmReportDetail']").css("background","#f5f5f5");
            	$("li[name='alarmReportDetail'] .part_panel_icon").addClass("part_panel_icon_bg");
            	
            	$("li[name='alarmReportStat']").css("background","#ffffff");
            	$("li[name='alarmReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("#reportViewSubmit").css("bottom","-10px");
            });
 //*****************************************************************************
 //*****************************************************************************
            $("li[name='jobReportStat']").click(function(){
            	$("li[name='jobReportStat']").css("background","#f5f5f5");
            	$("li[name='jobReportDetail']").css("background","#ffffff");
            	
            	$("li[name='nodeReportStat']").css("background","#ffffff");
            	$("li[name='nodeReportDetail']").css("background","#ffffff");
            	
            	$("li[name='userReportStat']").css("background","#ffffff");
            	$("li[name='userReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportStat']").css("background","#ffffff");
            	$("li[name='billReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='jobReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='jobReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            	
            	$("li[name='nodeReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='nodeReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='userReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='billReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            });
           
            $("li[name='jobReportDetail']").click(function(){
            	$("li[name='jobReportDetail']").css("background","#f5f5f5");
            	$("li[name='jobReportStat']").css("background","#ffffff");
            	
            	$("li[name='nodeReportStat']").css("background","#ffffff");
            	$("li[name='nodeReportDetail']").css("background","#ffffff");
            	
            	$("li[name='userReportStat']").css("background","#ffffff");
            	$("li[name='userReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportStat']").css("background","#ffffff");
            	$("li[name='billReportDetail']").css("background","#ffffff");
            	
            	 $("li[name='billReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='jobReportDetail'] .part_panel_icon").addClass("part_panel_icon_bg");
            	
            	$("li[name='jobReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='nodeReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='nodeReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='userReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='billReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            });       

           $("li[name='nodeReportStat']").click(function(){
            	$("li[name='jobReportDetail']").css("background","#ffffff");
            	$("li[name='jobReportStat']").css("background","#ffffff");
            	
            	$("li[name='nodeReportStat']").css("background","#f5f5f5");
            	$("li[name='nodeReportDetail']").css("background","#ffffff");
            	
            	$("li[name='userReportStat']").css("background","#ffffff");
            	$("li[name='userReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportStat']").css("background","#ffffff");
            	$("li[name='billReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='jobReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='jobReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='nodeReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            	$("li[name='nodeReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='userReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='billReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            }); 
            
            $("li[name='nodeReportDetail']").click(function(){
            	$("li[name='jobReportDetail']").css("background","#ffffff");
            	$("li[name='jobReportStat']").css("background","#ffffff");
            	
            	$("li[name='nodeReportStat']").css("background","#ffffff");
            	$("li[name='nodeReportDetail']").css("background","#f5f5f5");
            	
            	$("li[name='userReportStat']").css("background","#ffffff");
            	$("li[name='userReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportStat']").css("background","#ffffff");
            	$("li[name='billReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='jobReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='jobReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='nodeReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='nodeReportDetail'] .part_panel_icon").addClass("part_panel_icon_bg");
            	
            	$("li[name='userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='userReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='billReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            }); 
            
            $("li[name='userReportStat']").click(function(){
            	$("li[name='jobReportDetail']").css("background","#ffffff");
            	$("li[name='jobReportStat']").css("background","#ffffff");
            	
            	$("li[name='nodeReportStat']").css("background","#ffffff");
            	$("li[name='nodeReportDetail']").css("background","#ffffff");
            	
            	$("li[name='userReportStat']").css("background","#f5f5f5");
            	$("li[name='userReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportStat']").css("background","#ffffff");
            	$("li[name='billReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='jobReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='jobReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='nodeReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='nodeReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='userReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            	$("li[name='userReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='billReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            }); 
            
            $("li[name='userReportDetail']").click(function(){
            	$("li[name='jobReportDetail']").css("background","#ffffff");
            	$("li[name='jobReportStat']").css("background","#ffffff");
            	
            	$("li[name='nodeReportStat']").css("background","#ffffff");
            	$("li[name='nodeReportDetail']").css("background","#ffffff");
            	
            	$("li[name='userReportStat']").css("background","#ffffff");
            	$("li[name='userReportDetail']").css("background","#f5f5f5");
            	
            	$("li[name='billReportStat']").css("background","#ffffff");
            	$("li[name='billReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='jobReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='jobReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='nodeReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='nodeReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='userReportDetail'] .part_panel_icon").addClass("part_panel_icon_bg");
            	
            	$("li[name='billReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            }); 
            
            $("li[name='billReportStat']").click(function(){
            	$("li[name='jobReportDetail']").css("background","#ffffff");
            	$("li[name='jobReportStat']").css("background","#ffffff");
            	
            	$("li[name='nodeReportStat']").css("background","#ffffff");
            	$("li[name='nodeReportDetail']").css("background","#ffffff");
            	
            	$("li[name='userReportStat']").css("background","#ffffff");
            	$("li[name='userReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportStat']").css("background","#f5f5f5");
            	$("li[name='billReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='jobReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='jobReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='nodeReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='nodeReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='userReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='billReportStat'] .part_panel_icon").addClass("part_panel_icon_bg");
            }); 
            
            $("li[name='billReportDetail']").click(function(){
            	$("li[name='jobReportDetail']").css("background","#ffffff");
            	$("li[name='jobReportStat']").css("background","#ffffff");
            	
            	$("li[name='nodeReportStat']").css("background","#ffffff");
            	$("li[name='nodeReportDetail']").css("background","#ffffff");
            	
            	$("li[name='userReportStat']").css("background","#ffffff");
            	$("li[name='userReportDetail']").css("background","#ffffff");
            	
            	$("li[name='billReportStat']").css("background","#ffffff");
            	$("li[name='billReportDetail']").css("background","#f5f5f5");
            	
            	$("li[name='billReportDetail'] .part_panel_icon").addClass("part_panel_icon_bg");
            	$("li[name='jobReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='jobReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='nodeReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='nodeReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='userReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	$("li[name='userReportDetail'] .part_panel_icon").removeClass("part_panel_icon_bg");
            	
            	$("li[name='billReportStat'] .part_panel_icon").removeClass("part_panel_icon_bg");
            }); 
 //*****************************************************************************
 //*****************************************************************************  
         
    
           
           }
	          
          
          
        
        
        
         }
           
           
           
           
           
           
           
           
           
