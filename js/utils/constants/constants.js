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
  ],
  function () {
    'use strict';

    var constants = {
      "productName": "Lenovo Intelligent Computing Orchestration",
      "version": "3.1.0",
      "year":"2017",
      "refresh": "refresh",
      "refreshAdmin": "refresh:Admin",
      "refreshUser": "refresh:User",
      
      "refreshUser_chart": "refresh:User_chart",
      "refreshUser_balance": "refresh:User_balance",
      
      "refreshJobNodeChart_compute": "refresh:JobNodeChart_compute",
      "refreshJobNodeChart_login": "refresh:JobNodeChart_login",
      "refreshJobNodeChart_manage": "refresh:JobNodeChart_manage",
      "refreshJobNodeChart_IO": "refresh:JobNodeChart_IO",
      
      "refreshUserProfile": "refresh:UserProfile",
      "refreshResource": "refresh:Resource",
      "refreshNodeData":"refresh:NodeData",
      
      "refreshOperationlogs":"refresh:Operationlogs",
      "refreshNumber":"refresh:Number",
      
      "refreshNumber_running":"refresh:Number_running",
      "refreshNumber_waiting":"refresh:Number_waiting",
      "refreshNumber_finished":"refresh:Number_finished",
      "refreshNumber_chart":"refresh:Number_chart",
      
      "refreshNodeJobsData":"refresh:NodeJobsData",
      "refreshCpuMax":"refresh:CpuMax",
      "refreshCpuMin":"refresh:CpuMin",
      "refreshOneDayCpuMax":"refresh:OneDayCpuMax",
      "refreshOneDayCpuMin":"refresh:OneDayCpuMin",
      "refreshOneWeekCpuMax":"refresh:OneWeekCpuMax",
      "refreshOneWeekCpuMin":"refresh:OneWeekCpuMin",
      "refreshOneMonthCpuMax":"refresh:OneMonthCpuMax",
      "refreshOneMonthCpuMin":"refresh:OneMonthCpuMin",
      "refreshNewResource":"refresh:NewResource",
      "refreshUserGroup": "refresh:UserGroup",
      "refreshAccountGroup": "refresh:AccountGroup",
      "refreshsessionInfo": "refresh:sessionInfo",
      "refreshsession": "refresh:session",
      "refreshTendencyLoad":"refresh:TendencyLoad",
      "refreshTendencyCpu":"refresh:TendencyCpu",
      "refreshTendencyMemory":"refresh:TendencyMemory",
      "refreshTendencyDisk":"refresh:TendencyDisk",
      "refreshTendencyEnergy":"refresh:TendencyEnergy",
      "refreshTendencyTemperature":"refresh:TendencyTemperature",
      "refreshTendencyJob":"refresh:TendencyJob",
      "refreshTendencyNetwork":"refresh:TendencyNetwork",
      "refreshHeat":"refresh:heat",
      "refreshGListTable":"refresh:GListTable",
      "refreshRackAll":"refresh:RackAll",
      "refreshRack":"refresh:Rack",
      "refreshRackPlotly":"refresh:RackPlotly",
      
      "refreshCpuMaxOneMoreTime":"refresh:CpuMaxOneMoreTime",

      "refreshAlarmTable":"refresh:AlarmTable",
      "refreshStrategyTable":"refresh:StrategyTable",
      "refreshAlarmSound":"refreshAlarmSound"
    };

    return constants;
});