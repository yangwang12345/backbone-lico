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
    '../footer/footerView',
    '../header/headerView',
    '../jobBar/jobBarView'
  ],
  function(Marionette, dashboard ,resourceBarView,footerView, headerView, jobBarView) {
    'use strict';
    return Marionette.LayoutView.extend({
      template: dashboard,

      regions: {
        userDashboardHeader : '#header-wrapper',
        userResource : '#resource-wrapper',
        userJob : '#job-wrapper',
        userDashboardFooter : '#footer-wrapper'
        
        //firstResource:'#resource-wrapper'
      },

      onShow: function () {
function getBrowserInfo(){
	
var agent = navigator.userAgent.toLowerCase() ;

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

        var agent=navigator.userAgent.toLowerCase();
      	if(agent.indexOf("chrome/30")>0){
      		
      	//alert("this is for low version  firefox Brower");	
      	//this.getRegion('userResource').show(new firstView());	
      	this.getRegion('userResource').show(new resourceBarView());
      	this.getRegion('userDashboardHeader').show(new headerView());
      	this.getRegion('userJob').show(new jobBarView());
        
        }else if(verinfo==17){
      		
      	//alert("this is for low version  firefox Brower");	
      	//this.getRegion('userResource').show(new firstView());	
      	this.getRegion('userResource').show(new resourceBarView());
      	this.getRegion('userDashboardHeader').show(new headerView());
      	this.getRegion('userJob').show(new jobBarView());
        
       }else if(navigator.userAgent.indexOf("Trident") > -1){
      		
      	//alert("this is IE Brower");
      	//this.getRegion('userResource').show(new firstView());	
      	this.getRegion('userResource').show(new resourceBarView());
      	this.getRegion('userDashboardHeader').show(new headerView());
      	this.getRegion('userJob').show(new jobBarView());
      	
      	}else{
      		
      	//alert("this is chrome or firefox");
      	this.getRegion('userDashboardHeader').show(new headerView());
        this.getRegion('userResource').show(new resourceBarView());
        this.getRegion('userJob').show(new jobBarView());
        
      	}
      
        
      }
    });
  });