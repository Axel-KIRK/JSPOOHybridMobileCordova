"use strict";
/** Class du manager de l'application. */
class DataManager {
	/**
     * Créér le manager de l'application.
     */
	constructor() {

  }

  init(){

  }

  request(pData){
    if(main.networkManager.isOnline==true){
      $.ajax({
        method: "POST",
        data: pData.variable,
        url: AppConfiguration.SERVER_URL+"/app/service.php?action="+pData.action,
        success: function(dataReturn) { 
          if(pData.success!=null){
            var data=JSON.parse(dataReturn);
            pData.success(data);
          }
        },
        error: function() {
          if(pData.fail!=null){
            pData.fail();
          }
        }
      });
    }else{
      if(pData.fail!=null){
        pData.fail();
      }
    }
  }

  getPiInfo(){
    /*main.screenManager.loadPopin(ScreenManager.POPIN_SAVE);
    var data={
        action:"getPiInfo",
        variable:{id:main.sessionManager.currentPDV.id},
        success: this.getPiInfoSuccess,
        fail:this.getPiInfoError
    }
    main.dataManager.request(data);*/
    main.sqliteManager.getPiInfo({id:main.sessionManager.currentPDV.id});
  }

  getPiInfoSuccess(pData){
    main.screenManager.removePopin()
    main.sessionManager.currentSC=pData.result;
    main.sessionManager.concurrentBBQ=pData.bbq;
    main.sessionManager.concurrentPlancha=pData.plancha;
    main.screenManager.loadScreen(ScreenManager.SCREEN_STORE);
  }

  getPiInfoError(){
    main.screenManager.removePopin()
  }

}