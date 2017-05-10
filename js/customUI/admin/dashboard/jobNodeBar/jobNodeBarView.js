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
        'echartjs_round',
        'text!./templates/jobNodeBarTmpl.mustache',
        'utils/constants/urlConstants',
        'utils/eventBus',
        'utils/constants/constants',
        'customUI/admin/dashboard/jobChart/jobChart',
        'i18n!./nls/jobNodeBar',
        'css!./css/jobNodeBar'
        ],
        function(Marionette,  echartjs_round,jobNodeBarTemplate, urlConstants,
        		eventBus, constants, jobChart, nls, jobNodeBarCss) {
	'use strict';
	return Marionette.ItemView.extend({
		className: 'row admin-jobNodeBar',

		templateHelpers: function () {
			return {
				nls: nls
			};
		},

		template: jobNodeBarTemplate,

		onShow: function () {
			var self = this;
			var jobChartView = new jobChart({el: $("#job_chart_admin")});
			jobChartView.render();

			$('#job_submit_start').click(function(){
				
				App.router.navigate('#templateSelect', {trigger: true});
			});
             
			var self = this;

            self.renderNodeChart_compute();

			eventBus.on(constants.refreshJobNodeChart_compute, self.renderNodeChart_compute);	
			eventBus.on(constants.refreshJobNodeChart_login, self.renderNodeChart_login);
			eventBus.on(constants.refreshJobNodeChart_manage, self.renderNodeChart_manage);
			eventBus.on(constants.refreshJobNodeChart_IO, self.renderNodeChart_IO);
			
			
			$("#compute_node").click(function(){
				
				$("#compute_node").css("color","#337ab7");
				$("#login_node").css("color","#666666");
				$("#manage_node").css("color","#666666");
				$("#io_node").css("color","#666666");
				
				$("#compute_node").css("font-weight","700");
				$("#login_node").css("font-weight","400");
				$("#manage_node").css("font-weight","400");
				$("#io_node").css("font-weight","400");
				
				
				$("#compute_node_flag").html("<div id='compute_node_flag_inner' ></div>");
				$("#manage_node_flag").html("<div></div>");
				$("#login_node_flag").html("<div></div>");
				$("#IO_node_flag").html("<div></div>");
				
				self.renderNodeChart_compute();
				
			});
			
			$("#login_node").click(function(){
				
				$("#compute_node").css("color","#666666");
				$("#login_node").css("color","#337ab7");
				$("#manage_node").css("color","#666666");
				$("#io_node").css("color","#666666");
				
				$("#compute_node").css("font-weight","400");
				$("#login_node").css("font-weight","700");
				$("#manage_node").css("font-weight","400");
				$("#io_node").css("font-weight","400");
				
				$("#compute_node_flag").html("<div></div>");
				$("#manage_node_flag").html("<div></div>");
				$("#login_node_flag").html("<div id='login_node_flag_inner'></div>");
				$("#IO_node_flag").html("<div></div>");
				
				self.renderNodeChart_login();
				
			});
			
			
			
			$("#manage_node").click(function(){
				
				$("#compute_node").css("color","#666666");
				$("#login_node").css("color","#666666");
				$("#manage_node").css("color","#337ab7");
				$("#io_node").css("color","#666666");
				
				$("#compute_node").css("font-weight","400");
				$("#login_node").css("font-weight","400");
				$("#manage_node").css("font-weight","700");
				$("#io_node").css("font-weight","400");
				
				$("#compute_node_flag").html("<div></div>");
				$("#manage_node_flag").html("<div id='manage_node_flag_inner'></div>");
				$("#login_node_flag").html("<div></div>");
				$("#IO_node_flag").html("<div></div>");
				
				self.renderNodeChart_manage();
				
			});
			
			
			
			$("#io_node").click(function(){
				
				$("#compute_node").css("color","#666666");
				$("#login_node").css("color","#666666");
				$("#manage_node").css("color","#666666");
				$("#io_node").css("color","#337ab7");
				
				$("#compute_node").css("font-weight","400");
				$("#login_node").css("font-weight","400");
				$("#manage_node").css("font-weight","400");
				$("#io_node").css("font-weight","700");
				
				$("#compute_node_flag").html("<div></div>");
				$("#manage_node_flag").html("<div></div>");
				$("#login_node_flag").html("<div></div>");
				$("#IO_node_flag").html("<div id='IO_node_flag_inner' ></div>");
				
				self.renderNodeChart_IO();
				
			});
			
		},
		
		
//*******************************生成计算节点饼图****************************************		
renderNodeChart_compute: function() {
			
			$.ajax({
				type : "GET",
				url : urlConstants.nodesOverview,
				dataType : "json",
				success : function (data) {
//*******************计算  计算节点总数并赋值*********************************************************************              
                var compoute_busy_number=data.datasets.busy[2]+data.datasets.busy[4];
                    
                var compute_occupied_number=data.datasets.occupied[2]+data.datasets.occupied[4];
                    
                var compute_idle_number=data.datasets.idle[2]+data.datasets.idle[4];

                var compute_off_number=data.datasets.off[2]+data.datasets.off[4];
                
                var compute_totle=compoute_busy_number+compute_occupied_number+compute_idle_number+compute_off_number;
                
                $("#node_chart_admin_up_title_compute").html(" ( "+compute_totle+" ) ");
 //*******************计算  登陆节点总数并赋值********************************************************************* 
                var login_busy_number=data.datasets.busy[1];

                var login_occupied_number=data.datasets.occupied[1];
                 
                var login_idle_number=data.datasets.idle[1];
                    
                var login_off_number=data.datasets.off[1];
               
                var login_totle=login_busy_number+login_occupied_number+login_idle_number+login_off_number;
 
                 $("#node_chart_admin_up_title_login").html(" ( "+login_totle+" ) ");
                 
//*******************计算  管理节点总数并赋值*********************************************************************                 
                var manage_busy_number=data.datasets.busy[0]+data.datasets.busy[5];
                    
                var manage_occupied_number=data.datasets.occupied[0]+data.datasets.occupied[5];
                    
                var manage_idle_number=data.datasets.idle[0]+data.datasets.idle[5];
                    
                var manage_off_number=data.datasets.off[0]+data.datasets.off[5];
                
                var manage_totle=manage_busy_number+manage_occupied_number+manage_idle_number+manage_off_number;
                
                $("#node_chart_admin_up_title_manage").html(" ( "+manage_totle+" ) ");
                
//*******************计算  IO节点总数并赋值********************************************************************* 
                var io_busy_number=data.datasets.busy[3];

                var io_occupied_number=data.datasets.occupied[3];
                 
                var io_idle_number=data.datasets.idle[3];
                    
                var io_off_number=data.datasets.off[3];
                
                var io_title=io_busy_number+io_occupied_number+io_idle_number+io_off_number;
                
                $("#node_chart_admin_up_title_io").html(" ( "+io_title+" ) ");
//**********************************************************************************************************

var myChart_new = echartjs_round.init(document.getElementById('nodesOverview'));

var option_new = {
    title : {
        text: '',
        subtext: '',
        x:'left'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{b} "
    },
    color:['rgb(255,204,0)','rgb(253,241,0)','rgb(143,233,165)','rgb(222,222,222)'],
    series : [
        {
            name: '',
            type: 'pie',
            radius : '60%',
            center: ['50%', '50%'],
            data:[
                {
                  value:compoute_busy_number,
                  name:'忙碌:'+compoute_busy_number
                },
                {
                  value:compute_occupied_number, 
                  name:'已占用:'+compute_occupied_number
                },
                {
                  value:compute_idle_number, 
                  name:'空闲:'+compute_idle_number                
                },
                { 
                  value:compute_off_number, 
                  name:'关机:'+compute_off_number
                }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ],
        textStyle: {
        decoration: 'none',
        fontFamily: '微软雅黑',
        fontFamily2: '微软雅黑',    // IE8- 字体模糊并且不支持不同字体混排，额外指定一份
        fontSize:16,
        fontStyle: 'normal',
        fontWeight: 'normal',
        color:"#333333"
    },
    animation:false

};


myChart_new.setOption(option_new);
          
				
				},
				error : function (jqXHR, textStatus, errorThrown) {
					//console.log(textStatus + errorThrown)
					//console.log(jqXHR);
				}
			});
			

          	          
		},
		
//*******************************生成登陆节点饼图****************************************		
renderNodeChart_login: function() {
			
			$.ajax({
				type : "GET",
				url : urlConstants.nodesOverview,
				dataType : "json",
				success : function (data) {
 //*******************计算  计算节点总数并赋值*********************************************************************              
                var compoute_busy_number=data.datasets.busy[2]+data.datasets.busy[4];
                    
                var compute_occupied_number=data.datasets.occupied[2]+data.datasets.occupied[4];
                    
                var compute_idle_number=data.datasets.idle[2]+data.datasets.idle[4];

                var compute_off_number=data.datasets.off[2]+data.datasets.off[4];
                
                var compute_totle=compoute_busy_number+compute_occupied_number+compute_idle_number+compute_off_number;
                
                $("#node_chart_admin_up_title_compute").html(" ( "+compute_totle+" ) ");
 //*******************计算  登陆节点总数并赋值********************************************************************* 
                var login_busy_number=data.datasets.busy[1];

                var login_occupied_number=data.datasets.occupied[1];
                 
                var login_idle_number=data.datasets.idle[1];
                    
                var login_off_number=data.datasets.off[1];
               
                var login_totle=login_busy_number+login_occupied_number+login_idle_number+login_off_number;
 
                 $("#node_chart_admin_up_title_login").html(" ( "+login_totle+" ) ");
                 
//*******************计算  管理节点总数并赋值*********************************************************************                 
                var manage_busy_number=data.datasets.busy[0]+data.datasets.busy[5];
                    
                var manage_occupied_number=data.datasets.occupied[0]+data.datasets.occupied[5];
                    
                var manage_idle_number=data.datasets.idle[0]+data.datasets.idle[5];
                    
                var manage_off_number=data.datasets.off[0]+data.datasets.off[5];
                
                var manage_totle=manage_busy_number+manage_occupied_number+manage_idle_number+manage_off_number;
                
                $("#node_chart_admin_up_title_manage").html(" ( "+manage_totle+" ) ");
                
//*******************计算  IO节点总数并赋值********************************************************************* 
                var io_busy_number=data.datasets.busy[3];

                var io_occupied_number=data.datasets.occupied[3];
                 
                var io_idle_number=data.datasets.idle[3];
                    
                var io_off_number=data.datasets.off[3];
                
                var io_title=io_busy_number+io_occupied_number+io_idle_number+io_off_number;
                
                $("#node_chart_admin_up_title_io").html(" ( "+io_title+" ) ");
//**********************************************************************************************************

var myChart_new = echartjs_round.init(document.getElementById('nodesOverview'));

var option_new = {
    title : {
        text: '',
        subtext: '',
        x:'left'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{b}"
    },
    color:['rgb(255,204,0)','rgb(253,241,0)','rgb(143,233,165)','rgb(222,222,222)'],
    series : [
        {
            name: '',
            type: 'pie',
            radius : '60%',
            center: ['50%', '50%'],
            data:[
                {
                  value:login_busy_number,
                  name:'忙碌:'+login_busy_number
                },
                {
                  value:login_occupied_number, 
                  name:'已占用:'+login_occupied_number
                },
                {
                  value:login_idle_number, 
                  name:'空闲:'+login_idle_number                },
                { 
                  value:login_off_number, 
                  name:'关机:'+login_off_number
                }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ],
        textStyle: {
        decoration: 'none',
        fontFamily: '微软雅黑',
        fontFamily2: '微软雅黑',    // IE8- 字体模糊并且不支持不同字体混排，额外指定一份
        fontSize:16,
        fontStyle: 'normal',
        fontWeight: 'normal',
        color:"#333333"
    },
    animation:false
};


myChart_new.setOption(option_new);
          
		
				},
				error : function (jqXHR, textStatus, errorThrown) {
					//console.log(textStatus + errorThrown)
					//console.log(jqXHR);
				}
			});
			

          	          
		},
//*******************************生成管理节点饼图****************************************		
renderNodeChart_manage: function() {
			
			$.ajax({
				type : "GET",
				url : urlConstants.nodesOverview,
				dataType : "json",
				success : function (data) {
                
//*******************计算  计算节点总数并赋值*********************************************************************              
                var compoute_busy_number=data.datasets.busy[2]+data.datasets.busy[4];
                    
                var compute_occupied_number=data.datasets.occupied[2]+data.datasets.occupied[4];
                    
                var compute_idle_number=data.datasets.idle[2]+data.datasets.idle[4];

                var compute_off_number=data.datasets.off[2]+data.datasets.off[4];
                
                var compute_totle=compoute_busy_number+compute_occupied_number+compute_idle_number+compute_off_number;
                
                $("#node_chart_admin_up_title_compute").html(" ( "+compute_totle+" ) ");
 //*******************计算  登陆节点总数并赋值********************************************************************* 
                var login_busy_number=data.datasets.busy[1];

                var login_occupied_number=data.datasets.occupied[1];
                 
                var login_idle_number=data.datasets.idle[1];
                    
                var login_off_number=data.datasets.off[1];
               
                var login_totle=login_busy_number+login_occupied_number+login_idle_number+login_off_number;
 
                 $("#node_chart_admin_up_title_login").html(" ( "+login_totle+" ) ");
                 
//*******************计算  管理节点总数并赋值*********************************************************************                 
                var manage_busy_number=data.datasets.busy[0]+data.datasets.busy[5];
                    
                var manage_occupied_number=data.datasets.occupied[0]+data.datasets.occupied[5];
                    
                var manage_idle_number=data.datasets.idle[0]+data.datasets.idle[5];
                    
                var manage_off_number=data.datasets.off[0]+data.datasets.off[5];
                
                var manage_totle=manage_busy_number+manage_occupied_number+manage_idle_number+manage_off_number;
                
                $("#node_chart_admin_up_title_manage").html(" ( "+manage_totle+" ) ");
                
//*******************计算  IO节点总数并赋值********************************************************************* 
                var io_busy_number=data.datasets.busy[3];

                var io_occupied_number=data.datasets.occupied[3];
                 
                var io_idle_number=data.datasets.idle[3];
                    
                var io_off_number=data.datasets.off[3];
                
                var io_title=io_busy_number+io_occupied_number+io_idle_number+io_off_number;
                
                $("#node_chart_admin_up_title_io").html(" ( "+io_title+" ) ");
//**********************************************************************************************************

var myChart_new = echartjs_round.init(document.getElementById('nodesOverview'));

var option_new = {
    title : {
        text: '',
        subtext: '',
        x:'left'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{b}"
    },
    color:['rgb(255,204,0)','rgb(253,241,0)','rgb(143,233,165)','rgb(222,222,222)'],
    series : [
        {
            name: '',
            type: 'pie',
            radius : '60%',
            center: ['50%', '50%'],
            data:[
                {
                  value:manage_busy_number,
                  name:'忙碌:'+manage_busy_number
                },
                {
                  value:manage_occupied_number, 
                  name:'已占用:'+manage_occupied_number
                },
                {
                  value:manage_idle_number, 
                  name:'空闲:'+manage_idle_number                },
                { 
                  value:manage_off_number, 
                  name:'关机:'+manage_off_number
                }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ],
        textStyle: {
        decoration: 'none',
        fontFamily: '微软雅黑',
        fontFamily2: '微软雅黑',    // IE8- 字体模糊并且不支持不同字体混排，额外指定一份
        fontSize:16,
        fontStyle: 'normal',
        fontWeight: 'normal',
        color:"#333333"
    },
    animation:false
};


myChart_new.setOption(option_new);
          
				
				},
				error : function (jqXHR, textStatus, errorThrown) {
					//console.log(textStatus + errorThrown)
					//console.log(jqXHR);
				}
			});
			

          	          
		},
		
//*******************************生成I/O节点饼图****************************************		
renderNodeChart_IO: function() {
			
			$.ajax({
				type : "GET",
				url : urlConstants.nodesOverview,
				dataType : "json",
				success : function (data) {
                
//*******************计算  计算节点总数并赋值*********************************************************************              
                var compoute_busy_number=data.datasets.busy[2]+data.datasets.busy[4];
                    
                var compute_occupied_number=data.datasets.occupied[2]+data.datasets.occupied[4];
                    
                var compute_idle_number=data.datasets.idle[2]+data.datasets.idle[4];

                var compute_off_number=data.datasets.off[2]+data.datasets.off[4];
                
                var compute_totle=compoute_busy_number+compute_occupied_number+compute_idle_number+compute_off_number;
                
                $("#node_chart_admin_up_title_compute").html(" ( "+compute_totle+" ) ");
 //*******************计算  登陆节点总数并赋值********************************************************************* 
                var login_busy_number=data.datasets.busy[1];

                var login_occupied_number=data.datasets.occupied[1];
                 
                var login_idle_number=data.datasets.idle[1];
                    
                var login_off_number=data.datasets.off[1];
               
                var login_totle=login_busy_number+login_occupied_number+login_idle_number+login_off_number;
 
                 $("#node_chart_admin_up_title_login").html(" ( "+login_totle+" ) ");
                 
//*******************计算  管理节点总数并赋值*********************************************************************                 
                var manage_busy_number=data.datasets.busy[0]+data.datasets.busy[5];
                    
                var manage_occupied_number=data.datasets.occupied[0]+data.datasets.occupied[5];
                    
                var manage_idle_number=data.datasets.idle[0]+data.datasets.idle[5];
                    
                var manage_off_number=data.datasets.off[0]+data.datasets.off[5];
                
                var manage_totle=manage_busy_number+manage_occupied_number+manage_idle_number+manage_off_number;
                
                $("#node_chart_admin_up_title_manage").html(" ( "+manage_totle+" ) ");
                
//*******************计算  IO节点总数并赋值********************************************************************* 
                var io_busy_number=data.datasets.busy[3];

                var io_occupied_number=data.datasets.occupied[3];
                 
                var io_idle_number=data.datasets.idle[3];
                    
                var io_off_number=data.datasets.off[3];
                
                var io_title=io_busy_number+io_occupied_number+io_idle_number+io_off_number;
                
                $("#node_chart_admin_up_title_io").html(" ( "+io_title+" ) ");
//**********************************************************************************************************

var myChart_new = echartjs_round.init(document.getElementById('nodesOverview'));

var option_new = {
    title : {
        text: '',
        subtext: '',
        x:'left'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{b}"
    },
    color:['rgb(255,204,0)','rgb(253,241,0)','rgb(143,233,165)','rgb(222,222,222)'],
    series : [
        {
            name: '',
            type: 'pie',
            radius : '60%',
            center: ['50%', '50%'],
            data:[
                {
                  value:io_busy_number,
                  name:'忙碌:'+io_busy_number
                },
                {
                  value:io_occupied_number, 
                  name:'已占用:'+io_occupied_number
                },
                {
                  value:io_idle_number, 
                  name:'空闲:'+io_idle_number                },
                { 
                  value:io_off_number, 
                  name:'关机:'+io_off_number
                }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ],
        textStyle: {
        decoration: 'none',
        fontFamily: '微软雅黑',
        fontFamily2: '微软雅黑',    // IE8- 字体模糊并且不支持不同字体混排，额外指定一份
        fontSize:16,
        fontStyle: 'normal',
        fontWeight: 'normal',
        color:"#333333"
    },
    animation:false
};


myChart_new.setOption(option_new);
          
		
				},
				error : function (jqXHR, textStatus, errorThrown) {
					//console.log(textStatus + errorThrown)
					//console.log(jqXHR);
				}
			});
			

          	          
		}
		
		
		

	});
});