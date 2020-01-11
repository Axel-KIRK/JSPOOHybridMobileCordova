"use strict";
/** Class du manager de l'application. */
class PopinComplete extends AbstractPopin{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType, pParameter) {
		super(pType);
        this._parameter=pParameter;
        this._timeoutComplete=null;
    }

    static get DELAY_TIMEOUT_COMPLETE(){
        return 3000;
    }

    get parameter(){
        return this._parameter;
    }

    init(){
    	super.init();
        this._timeoutComplete=setTimeout(this.timeoutCompleteHandler,PopinComplete.DELAY_TIMEOUT_COMPLETE);
        $("#popin-complete_background").on(main.eventManager.EVENT_DOWN, this.popinDownHandler)
    }

    popinDownHandler(e){
        main.screenManager.removePopin();
    }

    timeoutCompleteHandler(e){
        main.screenManager.removePopin();
    }
        
    removePopin(){
    	super.removePopin();
        clearTimeout(this._timeoutComplete);
    }
}