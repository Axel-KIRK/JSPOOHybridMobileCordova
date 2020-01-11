"use strict";
/** Class du manager de l'application. */
class PopinQuit extends AbstractPopin{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType, pParameter) {
		super(pType);
        this._parameter=pParameter;
        this._btContinue=null;
        this._btQuit=null;
    }

    get parameter(){
        return this._parameter;
    }

    init(){
    	super.init();
        this._btContinue=new SimpleButton($("#popin-quit_bloc_inset_bt-continue"), this.btContinueUpHandler);
        this._btQuit=new SimpleButton($("#popin-quit_bloc_inset_bt-cancel"), this.btQuitUpHandler);
    }

    btContinueUpHandler(e){
        if(main.screenManager.currentPopin.parameter.nextURL!=ScreenManager.SCREEN_MY_CHECK){
            main.screenManager.loadScreen(main.screenManager.currentPopin.parameter.nextURL);
            main.applicationManager.onSC=false;
            main.screenManager.removePopin();
            if(main.screenManager.currentPopin.parameter.syncAction==true){
                main.updateManager.startUpdate();
            }
        }else{
            main.applicationManager.onSC=false;
            main.screenManager.removePopin();
            main.screenManager.currentPopin.searchPDV();
        }
    }

    searchPDV(){
        main.screenManager.loadPopin(ScreenManager.POPIN_SAVE);
        /*var data={
            action:"getMySC",
            variable:{
                id_user: main.sessionManager.login.id
            },
            success: main.screenManager.currentMenu.searchSuccessHandler,
            fail: main.screenManager.currentMenu.searchErrorHandler
        }

        main.dataManager.request(data);*/
        main.sqliteManager.getMySCgetMySC({id_user: main.sessionManager.login.id});
    }

    searchSuccessHandler(pData){ 
        main.sessionManager.searchMyPDV=pData.result;
        main.screenManager.removePopin();
        main.screenManager.loadScreen(ScreenManager.SCREEN_MY_CHECK);
    }

    searchErrorHandler(){
        main.screenManager.removePopin()
    }

    btQuitUpHandler(e){
        main.screenManager.removePopin();
    }

    removePopin(){
    	super.removePopin();
    }
}