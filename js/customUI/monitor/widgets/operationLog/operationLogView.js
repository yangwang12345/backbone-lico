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
	'utils/constants/urlConstants',
	'utils/constants/constants',
	'utils/eventBus',
	'text!./templates/operationLogViewTmpl.mustache',
	'i18n!./nls/operationLogView',
	'css!./style/operationLogView.css'
	],function(Marionette,bootstrap,datatables, datatables_bootstrap,dataTables_tableTools,
		       urlConstants, constants,eventBus,template,nls){

		return Marionette.ItemView.extend({
			template:template,
			templateHelpers:function(){
				return {
					nls:nls
				};
			},

            onShow:function(){
            
            $("body").css("background-color", "#ffffff");

            $("#operationLogTable").dataTable({
            	    "bSort": true,
            	    "aaSorting": [ [3,'desc'] ],
            	    "serverSide": true,
            	    "searchDelay": 1000,
					serverSide: true, //启动后端分页
					paging: true,
					info: true,
					destory: true,
					stateSave: false,
					"lengthMenu": [ 10, 25,  50, 100 ],
					
					
					
			        bAutoWidth: true,       //是否启用自动适应列宽
					responsive:true,
					bPaginate:true,
					bInfo:true,
					sLengthMenu:'',
					bLengthChange:true,
                   	searching: true,
					language: {
                    "url": require.toUrl('') + "translation/datatables.chinese.json"
                    },

                    columns:[
                    {
                    	'data':'operator','title':nls.user,'className':'dt-center', "sWidth": "20%"
                    },{
                    	'data':'module','title':nls.modular,'className':'dt-center',"sWidth": "20%"
                    },{
                    	'data':'operation','title':nls.operation,'className':'dt-center',"sWidth": "20%"
                    },{
                    	'data':'operate_time','title':nls.time,'className':'dt-center',"sWidth": "20%"
                    },{
                    	'data':'description','title':nls.details,'className':'dt-left',"sWidth": "20%",
                    	"render": function (data) {
                    		
                    		    //console.log(data.length);
                    		    
                    		    if(data.length>20){
                    		   	
                    		   	   data= data.substring(0,20)+"...";
                    		    }
                    		    
		            		return "<span class='log_details' id='log_details' title='" + "点击查看详情" + "'>"+data+"</span>";
		            	}
                    }
                    ],
                    ajax:{
							
	                    'url':"/api/log/", 
						'data': function(args) {
							//console.log(JSON.stringify(args));
							 args.search.translated="false";
							return {
								"args": JSON.stringify(args),
							};
						},
						'dataSrc':function(res){
						   var data=res.data;

						   $.each(data, function(index , item) {

						   });
						 
							return data;
						}
					},

				});
				
//****************************************************************************************************

            // 点击icon
            $('#operationLogTable tbody').on('click', '#log_details', function () {


                var data = $('#operationLogTable').DataTable().row($(this).parents('tr')).data();

                var description = data.description;

                   // console.log(description);
                
                $("#log_details_myModal").modal("toggle");
                
                $(".log_details_myModal_body").html(data.description);


                

            });
//****************************************************************************************************
            eventBus.off(constants.refreshOperationlogs);
            eventBus.on(constants.refreshOperationlogs,this.refreshData); 
            },
            refreshData: function () {
            	
           	if ($(".modal.in").length > 0) {
                return;
            }
           	
            var operationLogTable = $('#operationLogTable').DataTable();
            
           //console.log(operationLogTable);
							
             operationLogTable.ajax.reload();
          
            }

		});
	});
