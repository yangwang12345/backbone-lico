define([
	'marionette',
	'jquery',
	'jquery_ui',
	'libs/jquery-ui/ui/i18n/datepicker-zh-CN',
	'customUI/report/css/Active',
	'utils/utils',
	'utils/constants/urlConstants',
	'text!./template/report.mustache',
	'i18n!./nls/report',
	'css!./css/report'
	],function(Marionette,jquery,jquery_ui,datepicker_zh_CN,Active,utils,urlConstants,template,nls){
		return Marionette.ItemView.extend({
			template:template,
			templateHelpers:function(){
				return {
					nls:nls
				};
			},

			cleanDate:function(a){
				var now=new Date(),
					number={'hour':1,'day':24,'week':7*24,'month':30*24};
				return {
						'startTime':Math.floor((now-number[a]*60*60*1000)/1000),
						'endTime':Math.ceil(now.valueOf()/1000)
					}
			},

			emptyAlarm:function(e,n){
				utils.showMessageOnSpot(e,n)
			},

			parseUrl:function(data){
				var target={'alarm':"alarm",'job':"jobs",'log':"operation",'node':"node",'user':"user",'bill':"bill","node_running":"node_running","node_user":"node_user","user_login":"user_login","user_storage":"user_storage"},
					type={'detail':"details",'stat':"statistics"};
				return target[data.target]+'_'+type[data.type]+'.'+data.format;	
			},

			getReport:function(d,e){
				utils.hideMessageOnSpot(e);
				$('#reportProgressDialog').modal('show');
				d['creator']=window.sessionStorage['lico_username'];
				var now=new Date();
				if(d.target.indexOf('_')>0){
					d['start_time']=0;
					d['end_time']=0;
				} else {
					d['start_time']=d.startTime;
					d['end_time']=d.endTime;
				}
				d['create_time']=now.valueOf();
				$.ajax({
					url:urlConstants.report+this.parseUrl(d),
					type:'POST',
					contentType: "application/json",
					dataType:'json',
					data:JSON.stringify(d),
					success:function(e){
						$('#reportProgressDialog').modal('hide');
						if(e.ret == 'failed'){
							$('#reportResult').html(e.msg);
							$('#reportCreateResult').modal('show');
						} else {
							window.open('/api/report/'+e.data);
						}
					},
					error:function(a){
						$('#reportProgressDialog').modal('hide');
						$('#reportResult').html(nls.downLoadError);
						$('#reportCreateResult').modal('show');
					}
				});
			},

			checkInput:function(e){
				if(e.type == 'focusin'){
					utils.showMessageOnSpot(this,nls.inputInfo)
				} else {
					utils.hideMessageOnSpot(this)
				}
			},

			onShow:function(){
				var datas={'datas':_.clone(nls, true)},
					that=this;
				$('#reportViewInput').html(_.template($('#reportViewTpl').html())(datas));
				$('#reportView').on('click','.list-group-item',function(e){
					datas.datas.header=nls[$(this).attr('name')];
					datas.datas.type=$(this).attr('name').split('Report')[0];
					datas.datas.timeFunc='init';
					datas.datas.infos=$(this).attr('name').split('Report')[1];
					$('#reportViewInput').html(_.template($('#reportViewTpl').html())(datas));
				});
				$('#reportView').on({focusin:that.checkInput,focusout:that.checkInput},'input[name="job_user"],#reportViewNode textarea');
				$('#reportView').on('click','input[name="format"]:checked',function(e){
					if($(this).val() == 'pdf'){
						$('#pageDirection').show();
					} else {
						$('#pageDirection').hide();
					}
				});
				$.datepicker.setDefaults({'maxDate':new Date()});
				$('#reportView').on('click','input[name="function"]:checked',function(e){
					if($(this).val() != datas.datas.timeFunc){
						datas.datas.timeFunc=$(this).val();
						$('#reportViewTime').html(_.template($('#reportViewTplTime').html())(datas));
						$("input[name='startTime']").datepicker({
							defaultDate: "+1w",
                            onClose: function( selectedDate ) {
                               $( "input[name='endTime']" ).datepicker( "option", "minDate", selectedDate );
                            },
                            changeMonth: true,
                            changeYear: true,
                            showButtonPanel: true,
                            maxDate: "+0D"
						});
						$("input[name='endTime']").datepicker({
							defaultDate: "+1w",
                            onClose: function( selectedDate ) {
                               $( "input[name='startTime']" ).datepicker( "option","maxDate" , selectedDate );
                            },
                            changeMonth: true,
                            changeYear: true,
                            showButtonPanel: true,
                            maxDate: "+0D"
						});
					}
				});

				$('#reportViewSubmit').click(function(){
					var postData=$('#reportViewData').serializeArray(),
						postJson={
							'target':datas.datas.type.toLowerCase(),
							'type':datas.datas.infos.toLowerCase()
						};
					postData.map(function(a){postJson[a.name]=a.value});
					if(postJson.function=='init'){
						_.extend(postJson,that.cleanDate($('#reportViewTime select').val()));
					} else {
						postJson.startTime?postJson.startTime=Math.floor((new Date(postJson.startTime+" 00:00:00")).valueOf()/1000):'';
						postJson.endTime?postJson.endTime=Math.ceil(((new Date(postJson.endTime+" 23:59:59")).valueOf())/1000):'';
					}
					if(postJson.target == 'alarm'){
						postJson['event_level']=$('#reportViewLevel select').val();
						$('#reportViewNode textarea').val()?$('#reportViewNode textarea').val().trim().length>0?postJson['node']=$('#reportViewNode textarea').val().replace('，',',').split(','):postJson['node']=[]:postJson['node']=[];
					}
					postJson.hasOwnProperty('job_user')?postJson['job_user'].trim().length>0?postJson['job_user']=postJson['job_user'].replace('，',',').split(','):postJson['job_user']=[]:'';
					if(postJson.target == 'bill' || postJson.target.indexOf('_')>0){
						postJson.hasOwnProperty('node')?postJson['node'].trim().length>0?postJson['node']=postJson['node'].replace('，',',').split(','):postJson['node']=[]:'';
						postJson.hasOwnProperty('bill')?postJson['bill'].trim().length>0?postJson['bill']=postJson['bill'].replace('，',',').split(','):postJson['bill']=[]:'';
					}
					if(postJson.target.indexOf('_')>0){
						postJson.startTime=new Date();
						postJson.endTime=new Date();
						if(postJson.target == 'node_running'){
							postJson['monitor_type']=$('#reportViewIndex select').val();
						}
					}
					postJson.startTime*postJson.endTime>0?that.getReport(postJson,'#reportViewTime'):that.emptyAlarm('#reportViewTime',nls.emptyTime);
				});
				
				interActive();
				

			}
		});
});
