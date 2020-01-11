"use strict";
/** Class du manager de l'application. */
class ScreenGeolocalisationMap extends AbstractScreen{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType) {
		super(pType);
    }

    init(){
    	super.init();
        main.mapManager.activeMap(true);
    }

    removeScreen(){
        main.mapManager.activeMap(false);
    	super.removeScreen();
    }
}