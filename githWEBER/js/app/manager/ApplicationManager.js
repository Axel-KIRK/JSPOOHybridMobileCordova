"use strict";
/** Class du manager de l'application. */
class ApplicationManager {
	/**
     * Créér le manager de l'application.
     */
	constructor() {
		this._mobileDetect=null;
		this._isMobile=null;
        this._onDevice=false;
        this._srcImage=null;
    }

    get ON_DEVICE(){
        return this._onDevice;
    }

    get onSC(){
        return this._onSC;
    }

    set onSC(pBoolean){
        this._onSC=pBoolean;
    }

    set ON_DEVICE(pBoolean){
        this._onDevice=pBoolean;
    }

    get IS_MOBILE(){
    	return this._isMobile;
    }
    
    init(){
    	this._mobileDetect = new MobileDetect(window.navigator.userAgent);
    	if(this._mobileDetect.tablet()==null && this._mobileDetect.mobile()==null){
    		this._isMobile=false;
    	}else{
    		this._isMobile=true;
    	}
    	main.eventManager.setEventType(this._isMobile);
    }

}