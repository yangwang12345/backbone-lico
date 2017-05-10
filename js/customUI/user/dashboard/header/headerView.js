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
    'utils/constants/constants',
    'utils/constants/urlConstants',
    'utils/eventBus',
    'text!./templates/headerTmpl.mustache',
    'i18n!./nls/header',
    'css!./css/headerView'
  ],
  function(Marionette, cookie, constants, urlConstants, eventBus, dashboardHeader, nls) {
    'use strict';
    return Marionette.ItemView.extend({
      className: 'row',
      template: dashboardHeader,

      templateHelpers: function () {
        return {
          nls: nls
        };
      },

      onShow: function () {
        var self = this;
        var noticeXHR = $.ajax({
          url: urlConstants.config,
          dataType: "json",
          contentType: "application/json"});

        noticeXHR.done(function(data){
          var notice = data.notice;
          $("#userNotice").html("<i class='fa fa-info-circle notice-icon'></i><span class='notice-text'>" + data.notice + "</span>");
          $("#userNotice").attr("title", data.notice);
          if (data.notice.length < 40) {
            $("#userNotice").css("float", "right");
          }
        }
        );


        self.balance();

        eventBus.on(constants.refreshUser_balance, self.balance);
      },
      balance :function(){
            $.ajax({
            type:"get",
            url:urlConstants.login,
            success:function(data){
                //console.log(data);
                $("#users-balance-number").html(data.balance+"   "+nls.accountUnit);
            },
            error:function(data){
                //console.log(data);
            }
          });
      }
    });
  });
