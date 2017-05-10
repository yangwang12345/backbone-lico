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
        'echartjs_bar',
        'text!./templates/resourceBarTmpl.mustache',
        'utils/constants/urlConstants',
        'utils/eventBus',
        'utils/constants/constants',
        'i18n!./nls/resourceBar',
        'css!./css/resourceBar'
        ],
        function(Marionette,  echartjs_bar, resourceBarTemplate, urlConstants,
        		eventBus, constants, nls, resourceBarCss) {
	'use strict';
	return Marionette.ItemView.extend({
		className: 'row admin-resourcebar dashboard-shadow',

		templateHelpers: function () {
			return {
				nls: nls
			};
		},

		template: resourceBarTemplate,

		onShow: function () {
			var self = this;
			
			self.createEChart();
			self.createChart();
			
             //调用eventBus,启动自动刷新
			eventBus.on(constants.refreshAdmin, self.createChart);
             //调用eventBus,启动自动刷新
			eventBus.on(constants.refreshAdmin, self.createEChart);
			
	
		},
		createEChart: function(){
			
			$.ajax({
				type : "GET",
				url : urlConstants.clusterOverview,
				dataType : "json",
				success : function (clusterData, textStatus) {
					
					
          var throughput_in=parseInt(clusterData.throughput.in);
         
          var head_ad;
          
          head_ad="M/S";
          
          throughput_in=(throughput_in/1048576).toFixed(1);
          
          var throughput_out=parseInt(clusterData.throughput.out);
          
          throughput_out=(throughput_out/1048576).toFixed(1);

//          console.log(throughput_in);
//          
//          if(throughput_in<1024){
//          	
//              head_ad_in="B/S"
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
//          	throughput_in=(throughput_in/1073741824).toFixed(0);
//          	
//          	head_ad="GB/S";
//          }
//          
//          console.log(throughput_in);
//         
//          var throughput_out=parseInt(clusterData.throughput.out);
            
//          console.log(throughput_out);
//           
//          if(throughput_out<1024){
//          	
//              head_ad_out="B/S";
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
//          
//          console.log(throughput_out);
      
			
var node_on=clusterData.nodes.on;
var node_off=clusterData.nodes.off;
var job_waiting=parseInt(clusterData.jobs.waiting);
var job_running=parseInt(clusterData.jobs.running);
//****************************************************************************************************************
var myChart_new = echartjs_bar.init(document.getElementById('io-window-container3'));
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
                        formatter: '{c}'+ head_ad,
                        textStyle:{
                    	    color:"#000000",
                    	    fontSize:14
                      }
                    },
                    
                }
            },
            data: [throughput_in,throughput_out ],
            barWidth:12,

        }
    ],
    animation:false
};

myChart_new.setOption(option);
//****************************************************************************************************************

//****************************************************************************************************************
var myChart_new_node = echartjs_bar.init(document.getElementById('io-window-container2'));
var option_node = {
    title: {
        x: 'center',
        text: nls.node,
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
            data: [nls.on, nls.off],
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
            name: nls.node,
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
                        formatter: '{c}',
                        textStyle:{
                    	    color:"#000000",
                    	    fontSize:14
                      }
                    },
                    
                }
            },
            data: [node_on, node_off],
            barWidth:12,

        }
    ],
    animation:false
};

myChart_new_node.setOption(option_node);
//****************************************************************************************************************

//****************************************************************************************************************
var myChart_new_job = echartjs_bar.init(document.getElementById('io-window-container1'));
var option_job = {
    title: {
        x: 'center',
        text: nls.job,
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
            data: [ nls.waiting,nls.running],
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
            name: nls.job,
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
                        formatter: '{c}',
                        textStyle:{
                    	    color:"#000000",
                    	    fontSize:14
                      }
                    },
                    
                }
            },
            data: [job_waiting,job_running ],
            barWidth:12,

        }
    ],
    animation:false
};

myChart_new_job.setOption(option_job);
//****************************************************************************************************************
			
//*****************************************************************************************************************
				},
				error : function (jqXHR, textStatus, errorThrown) {
					//console.log(textStatus + errorThrown)
					//console.log(jqXHR);
				}
			});
		
			
		},
createChart: function(){
			
			$.ajax({
				type : "GET",
				url : urlConstants.clusterOverview,
				dataType : "json",
				success : function (data, textStatus) {
//**************************************************************************************************
			var clusterData = data;
			
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
			var diskTotalValue = (clusterData.diskspace.total-clusterData.diskspace.used).toFixed(1);
			
			var diskTotalColor = "#EDEDED";

			var clusterDiskData = [
			                       {
			                    	   value: diskUsedValue,
			                    	   color: diskUsedColor,
			                    	   highlight: "#00FFFF",
			                    	   label: nls.used
			                       },
			                       {
			                    	   value: diskTotalValue,
			                    	   color: diskTotalColor,
			                    	   highlight: "#5AD3D1",
			                    	   label: nls.remaining
			                       }
			                       ];


			$('#admin-clusterCPU-holder').doughnut(clusterCPUData, "clusterCPU-area", {
				// These are the defaults.
				nls: nls,
				header: nls.clusterCPU,
				amount: nls.core,
				animation: false
			});
			$('#admin-clusterMemory-holder').doughnut(clusterMemoryData, "clusterMemory-area", {
				// These are the defaults.
				nls: nls,
				header: nls.clusterMemory,
				amount: nls.G,
				animation: false
			});
			
			$('#admin-storage-holder').doughnut(clusterDiskData, "storage-area", {
				// These are the defaults.
				nls: nls,
				header: nls.clusterStorage,
				amount: nls.G,
				animation: false
			});
			
//**************************************************************************************************
				},
				error: function(data){}
					
			});
		}

		


	});
});