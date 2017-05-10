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
    'text!./templates/dashboardTmpl.mustache',
    '../resourceBar/resourceBarView',
    '../clusterBar/clusterBarView',
    '../jobNodeBar/jobNodeBarView',
    'css!./css/dashboardView'
  ],
  function(Marionette, dashboard,resourceBarView,clusterBarView, jobNodeBarView) {
    'use strict';
    return Marionette.LayoutView.extend({
      template: dashboard,

      regions: {
        adminDashboardCluster : '#admin-cluster-wrapper',
        adminDashboardResource : '#admin-resource-wrapper',
        adminDashboardJobNode : '#admin-job-node-wrapper',
        //adjust IE brower.
        origin_adminDashboardResource:'#admin-resource-wrapper',
      },

      onShow: function () {
//*******************************************************************************************************
function getBrowserInfo(){
	
var agent = navigator.userAgent.toLowerCase() ;
//console.log(agent);
var regStr_ie = /msie [\d.]+;/gi ;
var regStr_ff = /firefox\/[\d.]+/gi
var regStr_chrome = /chrome\/[\d.]+/gi ;
var regStr_saf = /safari\/[\d.]+/gi ;
//IE
if(agent.indexOf("msie") > 0){
	
return agent.match(regStr_ie) ;
}

//firefox
if(agent.indexOf("firefox") > 0){
	
return agent.match(regStr_ff) ;
}

//Chrome
if(agent.indexOf("chrome") > 0){
	
return agent.match(regStr_chrome) ;
}

//Safari
if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0){
	
return agent.match(regStr_saf) ;
}

}

var browser = getBrowserInfo() ;
//alert(browser); 
var verinfo = (browser+"").replace(/[^0-9.]/ig,""); 


//console.log(verinfo);
//*******************************************************************************************************
      	var agent=navigator.userAgent.toLowerCase();
      	if(agent.indexOf("chrome/30")>0){
      		
      	//console.log("it include chrome 30");	
      	//this.getRegion('origin_adminDashboardResource').show(new origin_resourceBarView());
      	this.getRegion('adminDashboardResource').show(new resourceBarView());
        this.getRegion('adminDashboardJobNode').show(new jobNodeBarView());
        this.getRegion('adminDashboardCluster').show(new clusterBarView());
      	
      	}else if(verinfo==17){
      		
      	//alert("this is for low version  firefox Brower");	
      	//this.getRegion('origin_adminDashboardResource').show(new origin_resourceBarView());
      	this.getRegion('adminDashboardResource').show(new resourceBarView());
        this.getRegion('adminDashboardJobNode').show(new jobNodeBarView());
        this.getRegion('adminDashboardCluster').show(new clusterBarView());
      	
      	}else if(navigator.userAgent.indexOf("Trident") > -1){
      	//alert("this is IE Brower");
      	//adjust IE brower.
        //this.getRegion('origin_adminDashboardResource').show(new origin_resourceBarView());
        this.getRegion('adminDashboardResource').show(new resourceBarView());
        this.getRegion('adminDashboardJobNode').show(new jobNodeBarView());
        this.getRegion('adminDashboardCluster').show(new clusterBarView());
        
      	}else{
      		//alert("this is chrome or firefox");
      		
      	this.getRegion('adminDashboardCluster').show(new clusterBarView());
        this.getRegion('adminDashboardResource').show(new resourceBarView());
        this.getRegion('adminDashboardJobNode').show(new jobNodeBarView());
        
      	}
        

         
      }
    });
  });