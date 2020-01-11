"use strict";
/** Class du manager de l'application. */
class AbstractMenu {
	/**
     * Créér le manager de l'application.
     */
	constructor(pType) {
        this._typeMenu=pType;
    }

    init(){
    	
    }

    get typeMenu(){
        return this._typeMenu;
    }

    removeMenu(){
    	
    }
}