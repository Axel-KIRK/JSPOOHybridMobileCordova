"use strict";
/** Class du manager de l'application. */
class PopinSave extends AbstractPopin{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType, pParameter) {
		super(pType);
        this._parameter=pParameter;
    }

    get parameter(){
        return this._parameter;
    }

    init(){
    	super.init();
    }

    removePopin(){
    	super.removePopin();
    }
}