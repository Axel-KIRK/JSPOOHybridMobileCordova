"use strict";
/** Class du manager de l'application. */
class AbstractScreen {
	/**
     * Créér le manager de l'application.
     */
	constructor(pType) {
        this._typeScreen=pType;
    }

    init(){
    	
    }

    get typeScreen(){
        return this._typeScreen;
    }

    removeScreen(){
    	
    }
}