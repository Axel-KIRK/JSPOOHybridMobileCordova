"use strict";
/** Class du manager de l'application. */
class AbstractPopin {
	/**
     * Créér le manager de l'application.
     */
	constructor(pType) {
        this._typePopin=pType;
    }

    init(){
    	
    }

    get typePopin(){
        return this._typePopin;
    }

    removePopin(){
    	
    }
}