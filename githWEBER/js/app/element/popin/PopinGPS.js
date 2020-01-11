"use strict";
/** Class du manager de l'application. */
class PopinGPS extends AbstractPopin{
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
        main.screenManager.removePopin();
        main.screenManager.currentPopin.setGPS();
    }

    setGPS(){
        main.screenManager.loadPopin(ScreenManager.POPIN_SAVE);
        /*var data={
            action:"setPDVGPS",
            variable:{
                id_pdv: main.sessionManager.currentPDV.id,
                clat: main.sessionManager.currentLocation.lat,
                clng: main.sessionManager.currentLocation.lng
            },
            success: main.screenManager.currentScreen.setGPSSuccessHandler,
            fail: main.screenManager.currentScreen.setGPSErrorHandler
        }

        main.dataManager.request(data);*/
        main.sqliteManager.setPDVGPS({id_pdv: main.sessionManager.currentPDV.id, clat: main.sessionManager.currentLocation.lat, clng: main.sessionManager.currentLocation.lng});
    }

    btQuitUpHandler(e){
        main.screenManager.removePopin();
    }

    removePopin(){
    	super.removePopin();
    }
}