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
    'cookie',
    'bootstrap',
    '../../../Router',
    'utils/constants/urlConstants',
    'utils/utils',
    'utils/constants/constants',
    'utils/eventBus',
    'core/widgets/changePwdModal/PasswordMgtView',
    'text!./templates/headerTmpl.mustache',
    'i18n!./nls/header',
    'css!./style/header'
  ],
  function(Marionette, cookie, bootstrap, Router, urlConstants, utils, constants, eventBus, PasswordMgtView, header, nls) {
    'use strict';
    return Marionette.ItemView.extend({
      template: header,

      initialize: function(options){
         this.isAdmin = options.isAdmin;
      },

      templateHelpers: function () {
        return {
          nls: nls
        };
      },

      onShow:function(){
        function alarm_sound() {
            $.ajax({
                type: "GET",
                url: urlConstants.alarm + "sound/",
                contentType: "application/json",
                dataType: "json",
                success: function (data) {
                    if(data.count>999){
                        $("#sound-count-length").text(data.count +"+");
                    }else{
                        $("#sound-count-length").text(data.count);
                    }
                    if(data.sound==true&&window.localStorage.videoState=="on") {
                        $("#myVideo")[0].play();
                        $("#alarm-video").attr("src","/static/js/core/layout/header/img/voice_gif.gif");
                        setTimeout(function(){
                            $("#alarm-video").attr("src","/static/js/core/layout/header/img/voice_on_30x30.png");
                        },2000)
                    }
                },
                error: function (err) {

                }
            });
        }
          eventBus.off(constants.refreshAlarmSound);
        if (this.isAdmin) {
          $("#user-file-management-wrapper").css("display", "none");          
          $("#user-session-info-wrapper").css("display", "none");
          $("#ui-header-brand").attr("href","/#admin");
          // eventBus.off(constants.refreshAlarmTable);
          // eventBus.on(constants.refreshAlarmTable, this.refresh);
            alarm_sound();
            eventBus.on(constants.refreshAlarmSound, alarm_sound);
          $("#alarm-video").attr("src","/static/js/core/layout/header/img/voice_"+window.localStorage.videoState+"_30x30.png");
        }
        else {
          $("#ui-header-home,#admin-alarm-tootip").css("display", "none");
          $("#ui-header-resource").css("display", "none");
          $("#ui-header-users").css("display", "none");
          $("#ui-header-sessions").css("display", "none");
          $("#admin-links-wrapper").css("display", "none");
          $("#ui-header-brand").attr("href","/#");
          $("#ui-header-monitor").css("display", "none");
          $("#alarm-sound-count,#alarm-video-set").css("display", "none");
          // eventBus.off(constants.refreshAlarmTable);
        }
        

        
        this.bindEvents();
        $('#personalCenter').popover({
          html:true,
          placement:'bottom',
          content:$('#popoverContent').html(),
          trigger:'click manual',
          animation:false
        });

        $('#admin-links').popover({
          html:true,
          placement:'bottom',
          content:$('#linkPopoverContent').html(),
          trigger:'click manual',
          animation:false
        });

        $('body').click(function(e){
          var evt=e.srcElement?e.srcElement:e.target;
          if($.inArray('personalInfoCard',evt.classList)!=-1){
            $('#admin-links').popover('hide');
          } else if($.inArray('admin-links-area',evt.classList)!=-1){
            $('#personalCenter').popover('hide');
          } else {
            $('#personalCenter').popover('hide');
            $('#admin-links').popover('hide');
          }
        });

        $("#alarm-video-set").click(function(event) {

            if(window.localStorage.videoState=="on"){
                window.localStorage.videoState = "off"
            } else {
                window.localStorage.videoState = "on"
            }
            $("#alarm-video").attr("src","/static/js/core/layout/header/img/voice_"+window.localStorage.videoState+"_30x30.png");
        });

        $('#admin-links').on('shown.bs.popover',function(){
          $('#linkforGanglia').click(function(){
            var _location=window.location;
            window.open('http://'+_location.hostname+'/ganglia/','_blank');
          });
          $('#returntoUser').click(function(){
             var _location=window.location;
              window.open(_location.protocol+'//'+_location.host+'/#staff','_blank');
          });
          $('#linkforNagios').click(function(){
              var _location=window.location;
              window.open('http://'+_location.hostname+'/nagios/','_blank');
          });
          // add part of AwesomeManager
          // $('#AwesomeManager').click(function(){
          	
          // 	 var _location=window.location;
          	 
          //    //window.open('https://taurus.labs.lenovo.com/confluent-dev/','_blank'); 
             
          //    //alert($.cookie('dataOfLogin_cookie'));
          //    var obj=JSON.parse($.cookie('dataOfLogin_cookie'));
          //      //var a=$.cookie('dataOfLogin_cookie').username;
          //      //alert(obj);
          //      //alert(obj.username);
          //      //alert(obj.password);
          //    window.open('https://hpcopa.labs.lenovo.com/confluent-web/?username='+obj.username+'&password='+obj.password,'_blank');
          //  });

             
            });
//      });        
      // 点击日志收集
        $("#log-collect").on('click',function(){
           window.location='/api/log/weblog.tar.gz'
        })
        var _this=this;
        $('#personalCenter').on('shown.bs.popover',function(){
          _this.initUserData();
          $('#changePwd').click(function(){
            $('#personalCenter').popover('hide');
            var pwdview=new PasswordMgtView({
              el:"#dialog-region"
            });
            pwdview.render();
          });

          $("#logout").click(function(){
            $('#personalCenter').popover('hide');
            $('#confirm-logout').modal('show');
            $('#confirm-logout').on('shown.bs.modal',function(){
              $('#confirmLogoutBtn').click(function(){
                _this.doLogout();
              });
            })
          });
        });
      },

      initUserData:function(){
        var _currentUser=window.sessionStorage['lico_username'];

        $('#currentUserName').text(_currentUser);

        $.ajax({
          type:'GET',
          url: urlConstants.login,
          success:function(res){
            if(res.os_group){
              $('#userOSGroup').text(res.os_group);
            }
            if(res.bill_group){
              $('#accountingGroup').text(res.bill_group);
            }
          },
          error:function(res){
            //console.log(res);
          }
        });
      },

      doLogout:function(){
        $.ajax({
          type:'DELETE',
          url: urlConstants.login,

          success:function(res){
            //console.log("logged out");
            utils.removeRefreshing();
            window.sessionStorage.clear()
            window.location.href='/login.html';
          },
          error:function(res){
            //console.log(res);
          },
          complete:function(e,res){
            //console.log("logged out");
          }
        });
      },

      bindFileManagement: function() {
        $('#user-file-management').click(function(event) {
          //Router.navigate('#files');
          App.router.navigate('#files', {trigger: true});
        });
      },

      bindEvents: function(){
        this.bindFileManagement();
        this.bindSessionInfo();
        
     },
      
      
      bindSessionInfo: function() {
      $('#user-session-info').click(function(event) {
          App.router.navigate('#sessions', {trigger: true});
        });
      }

    });
  });