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
        'Router',
        'RegionManager',
        'resourceDoughnutWidget',
        'echartjs_bar',
        'text!./templates/resourceBarTmpl.mustache',
        'customUI/user/dashboard/job/jobView',
        'utils/constants/urlConstants',
        'utils/eventBus',
        'utils/constants/constants',
        'i18n!./nls/resourceBar',
        'css!./styles/sliding',
        'css!./styles/resourceDoughnut',
        'css!./styles/submitJob'
        ],
        function(Marionette,Router, RegionManager,resourceDoughnutWidget, echartjs_bar, resourceBarTemplate, jobView,urlConstants, 
        		eventBus, constants, nls, slidingCss, doughnutCss, submitJobCss) {
	'use strict';
	return Marionette.ItemView.extend({
		className: 'row dashboard-shadow',

		templateHelpers: function () {
			return {
				nls: nls
			};
		},

		template: resourceBarTemplate,

		onShow: function () {
//*************************************************************************************
                $.ajax({
				type : "GET",
				url : urlConstants.queues,
				sync:false,
				dataType : "json",
				success : function (data) {

					for(var i=1;i<data.length;i++){
			
						$("#the_panel_carousel_inner").append("<div class='item' id='part_"+i+"'></div>");
						
					}
					
					var first_child=$("#the_panel_carousel_inner").children()[0];
					
					    $(first_child).addClass("active");
					
				},
				error:function(data){
					
				}
				});
//*************************************************************************************			
			var self = this;

            self.renderQueues();
			
			
			self.renderResources();
			


			$('#job_submit_start').click(function(){
				
				App.router.navigate('#templateSelect', {trigger: true});
				
			});
			
			
			eventBus.on(constants.refreshUser_chart, self.renderQueues);
			
			eventBus.on(constants.refreshUser_chart, self.renderResources);
		},
		
		
		renderQueues: function(){
			
			$.ajax({
				type : "GET",
				url : urlConstants.queues,
				dataType : "json",
				success : function (data) {
					
                var id;
                var running;
                var waiting;
                var name;
                
                for(var i=0;i<data.length;i++){
                	 id='part_'+i;
                	 running=data[i].jobs.running;
                	 waiting=data[i].jobs.waiting+data[i].jobs.suspending+data[i].jobs.queueing+data[i].jobs.holding;
                	 name=data[i].name;
//*************************************************************************************************
var myChart_new_for = echartjs_bar.init(document.getElementById(id));

var option_for = {
    title: {
        x: 'center',
        text: name,
        subtext: '',
        link: '',
         textStyle:{
         	        fontWeight: 'normal',
                    color:"#000000",
                    fontSize:18
           }
    },
    tooltip: {
        trigger: 'item'
    },
    grid: {
    	top:'30%',
        left: '20%',
        right: '20%',
        bottom: '15%',
        containLabel: false
    },
    xAxis: [
        {
            type: 'category',
            show: true,
            data: [nls.waiting,nls.running],
            axisLine:{
            	lineStyle:{
            		color:'#000000',
            		opacity:0,
            		
            	}
            },
            axisTick:{
          	show:false,
            	itemStyle: {
            		color:"#ffffff"
            	}
            },
            axisLabel:{
            	textStyle:{
            		fontSize:14
            	}
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            show: false
        }
    ],
    series: [
        {
            name: nls.batch,
            type: 'bar',
            itemStyle: {
                normal: {
                    color: function(params) {
                        // build a color map as your need.
                        var colorList = [
                          '#89B6DE',
                          '#8FE9A5'
                           
                        ];
                        return colorList[params.dataIndex]
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'+'',
                        textStyle:{
                    	    color:"#000000",
                    	    fontSize:14
                      }
                    },
                    
                }
            },
            data: [waiting,running],
            barWidth:12,

        }
    ],
    animation:false
};

myChart_new_for.setOption(option_for);


//************************************************************************************************
                
                	
                }
			    
			


				},
				error : function (jqXHR, textStatus, errorThrown) {
					//console.log(textStatus + errorThrown)
					//console.log(jqXHR);
				}
			});
			
	
			
		},
		
		
		renderResources: function() {
			
			$.ajax({
				type : "GET",
				url : urlConstants.clusterOverview,
				dataType : "json",
				success : function (renderData) {				
//            console.log(renderData);
			var data = renderData;
			if (renderData.clusterOverview) {
				data = renderData.clusterOverview;
			}
			var clusterData = data;
			
		  var throughput_in=parseInt(clusterData.throughput.in);
         
          var head_ad;
          
          head_ad="M/S";
          
          throughput_in=(throughput_in/1048576).toFixed(1);
          
          var throughput_out=parseInt(clusterData.throughput.out);
          
          throughput_out=(throughput_out/1048576).toFixed(1);
          
//          var throughput_in=parseInt(clusterData.throughput.in);
//          
//          var head_ad;
//
//          if(throughput_in<1024){
//          	
//              head_ad="B/S"
//              
//          }else if(throughput_in>=1024&&throughput_in<1048576){
//          	
//	            throughput_in=(throughput_in/1024).toFixed(0);
//	            
//	            head_ad="KB/S";
//	            
//          }else if(throughput_in>=1048576&&throughput_in<1073741824){
//          	
//          	throughput_in=(throughput_in/1048576).toFixed(0);
//          	
//          	head_ad="MB/S";
//          	
//          }else if(throughput_in>=1073741824){
//          	
//          	throughput_in=(throughput_in/1073741824).toFixed(0)+"GB/S";
//          	
//          	head_ad="GB/S";
//          }
//          
//          var throughput_out=parseInt(clusterData.throughput.out);
//          
//          if(throughput_out<1024){
//          	
//              head_ad="B/S";
//              
//          }else if(throughput_out>=1024&&throughput_out<=1048576){
//          	
//	            throughput_out=(throughput_out/1024).toFixed(0);
//	            
//	            head_ad="KB/S";
//	            
//          }else if(throughput_out>=1048576&&throughput_out<1073741824){
//          	
//          	throughput_out=(throughput_out/1048576).toFixed(0);
//          	
//          	head_ad="MB/S";
//          	
//          }else if(throughput_out>=1073741824){
//          	
//          	throughput_out=(throughput_out/1073741824).toFixed(0);
//          	
//          	head_ad="GB/S";
//          }
            
      
			
			
			var ioData = {
					datasets: [{
						"name" : nls.networkIO,
						//"in" : (clusterData.throughput.in).toExponential(1), // MB/s
						//"out" : (clusterData.throughput.out).toExponential(1) // MB/s
						"in" : parseFloat(clusterData.throughput.in), // MB/s
						"out" : parseFloat(clusterData.throughput.out) // MB/s
					}
					]
			};
			var clusterCPUData = [
			                      {
			                    	  value: clusterData.processors.used,
			                    	  color:"#A3A3CA",
			                    	  highlight: "#CC99FF",
			                    	  label: nls.used
			                      },
			                      {
			                    	  value: clusterData.processors.total - clusterData.processors.used,
			                    	  color: "#EDEDED",
			                    	  highlight: "#5AD3D1",
			                    	  label: nls.remaining
			                      }
			                      ];
			var clusterMemoryData = [
			                         {
			                        	 value: (clusterData.memory.used / 1048576).toFixed(0),
			                        	 color: "#8FE9A5",
			                        	 highlight: "#00FF00",
			                        	 label: nls.used
			                         },
			                         {
			                        	 value: ((clusterData.memory.total - clusterData.memory.used) / 1048576).toFixed(0),
			                        	 color: "#EDEDED",
			                        	 highlight: "#5AD3D1",
			                        	 label: nls.remaining
			                         }
			                         ];
			var diskUsedColor = "#89B6DE";
			var diskUsedValue = (clusterData.diskspace.used).toFixed(1);
			var diskTotalValue = (clusterData.diskspace.total).toFixed(1);
			var diskTotalColor = "#EDEDED";
			
			var diskAvailableValue = (clusterData.diskspace.total - clusterData.diskspace.used).toFixed(1);
			
			if (clusterData.diskspace.used == 0) {
				diskUsedColor = "#EDEDED";
				diskUsedValue = 0;
				diskAvailableColor = "#EDEDED";
			}
			
			var clusterDiskData = [
			                       {
			                    	   value: diskUsedValue,
			                    	   color: diskUsedColor,
			                    	   highlight: "#00FFFF",
			                    	   label: nls.used
			                       },
			                       {
			                    	   value: (clusterData.diskspace.total-clusterData.diskspace.used).toFixed(1),
			                    	   color: diskTotalColor,
			                    	   highlight: "#5AD3D1",
			                    	   label: nls.remaining
			                       }
			                       ];
			//$('#io-window-container1').ioWindow(ioData, {readLabel:nls.read, writeLabel: nls.write});
			$('#clusterCPU-holder').doughnut(clusterCPUData, "clusterCPU-area", {
				// These are the defaults.
				nls: nls,
				header: nls.clusterCPU,
				amount: nls.core,
				animation: false
			});
			$('#clusterMemory-holder').doughnut(clusterMemoryData, "clusterMemory-area", {
				// These are the defaults.
				nls: nls,
				header: nls.clusterMemory,
				amount: nls.G,
				animation: false
			});
			$('#storage-holder').doughnut(clusterDiskData, "storage-area", {
				// These are the defaults.
				nls: nls,
				header: nls.clusterStorage,
				amount: nls.G,
				animation: false
			});
//****************************************************************************************************************

var myChart_new = echartjs_bar.init(document.getElementById('io-window-container1_inner'));
var option = {
    title: {
        x: 'center',
        text: nls.networkIO,
        subtext: '',
        link: '',
         textStyle:{
         	        fontWeight: 'normal',
                    color:"#000000",
                    fontSize:18
           }
    },
    tooltip: {
        trigger: 'item'
    },
    grid: {
    	top:'30%',
        left: '20%',
        right: '20%',
        bottom: '20%',
        containLabel: false
    },
    xAxis: [
        {
            type: 'category',
            show: true,
            data: [nls.read, nls.write],
            axisLine:{
            	lineStyle:{
            		color:'#000000',
            		opacity:0,
            		
            	}
            },
            axisTick:{
          	show:false,
            	itemStyle: {
            		color:"#ffffff"
            	}
            },
            axisLabel:{
            	textStyle:{
            		fontSize:14
            	}
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            show: false
        }
    ],
    series: [
        {
            name: nls.networkIO,
            type: 'bar',
            itemStyle: {
                normal: {
                    color: function(params) {
                        // build a color map as your need.
                        var colorList = [
                          '#89B6DE',
                          '#8FE9A5'
                           
                        ];
                        return colorList[params.dataIndex]
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'+head_ad,
                        textStyle:{
                    	    color:"#000000",
                    	    fontSize:14
                      }
                    },
                    
                }
            },
            data: [throughput_in , throughput_out ],
            barWidth:12,

        }
    ],
    animation:false
};

myChart_new.setOption(option);
//****************************************************************************************************************
	
				},
				error : function (jqXHR, textStatus, errorThrown) {
					//console.log(textStatus + errorThrown)
					//console.log(jqXHR);
				}
			});
			

		}

		
		
		
	});
});