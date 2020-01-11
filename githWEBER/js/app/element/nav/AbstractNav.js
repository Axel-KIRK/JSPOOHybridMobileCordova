"use strict";
/** Class du manager de l'application. */
class AbstractNav {
	/**
     * Créér le manager de l'application.
     */
	constructor(pType) {
        this._typeNav=pType;
    }

    init(){
    	
    }

    get typeNav(){
        return this._typeNav;
    }

    removeNav(){
    	
    }
}