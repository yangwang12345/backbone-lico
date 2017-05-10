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
	'customUI/strategy/strategyCtrlView',
	'customUI/strategy/strategyContactView',
	'customUI/strategy/strategyScriptView',
	'utils/constants/urlConstants',
	'utils/constants/constants',
	'utils/eventBus',
	'text!./templates/strategyTmpl.mustache',
	'i18n!./nls/strategy',
	'css!./style/strategy.css'
], function(Marionette, bootstrap,strategyCtrlView,strategyContactView,strategyScriptView,
	urlConstants, constants, eventBus, template, nls) {
	return Marionette.ItemView.extend({
		template: template,
		templateHelpers: function() {
			return {
				nls: nls
			};
		},
		onShow: function() {
        	var strategyCtrl=new strategyCtrlView({el:"#strategy-content"});
        	var strategyContact=new strategyContactView({el:"#strategy-content"});
			var strategyScript=new strategyScriptView({el:"#strategy-content"});
        	function classActive(current){
				$(".strategyBtn").removeClass('active');
				if($(current).attr("id") == "strategyContact"){
                    $(current).addClass('activegray')
				}else {
                    $("#strategyContact").removeClass('activegray');
                    $(current).addClass('active');
				}

				$('body').css("background-color", "#ffffff");
        	}
			$("#strategyCtrl").click(function() {
				classActive(this);
				strategyCtrl.render();
			});
			$("#strategyContact").click(function() {
				classActive(this);
				$('body').css("background-color", "#f6f6f4");
				strategyContact.render();
			});
			$("#strategyScript").click(function() {
				classActive(this);
				strategyScript.render();
			});
			$("#strategyCtrl").trigger('click')
		}
	});
});