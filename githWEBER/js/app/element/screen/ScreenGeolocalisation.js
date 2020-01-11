"use strict";
/** Class du manager de l'application. */
class ScreenGeolocalisation extends AbstractScreen{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType) {
		super(pType);
		this._btGeolocalisation=null;
        this._btGeolocalisationManual=null;
    }

    init(){
    	super.init();
        main.sessionManager.currentPDV=null;
        this._btGeolocalisation=new SimpleButton($("#screen-geolocalisation_bt-geolocalisation"), this.btGeolocalisationUpHandler);
        this._btGeolocalisationManual=new SimpleButton($("#screen-geolocalisation_bt-geolocalisation-manual"), this.btGeolocalisationManualUpHandler);
    }

    btGeolocalisationUpHandler(e){
        main.screenManager.loadScreen(ScreenManager.SCREEN_GEOLOCALISATION_MAP);
    }

    btGeolocalisationManualUpHandler(e){
        main.sqliteManager.getDistributeurs();
    }

    removeScreen(){
    	super.removeScreen();
    }
}