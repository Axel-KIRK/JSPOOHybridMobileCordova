"use strict";
/** Class du manager de l'application. */
class SimpleButton extends AbstractButton{
	/**
     * Créér le manager de l'application.
     */
	constructor(pElement, pUpFunction) {
		super(pElement);
        this._upFunction=pUpFunction;
        this.activeButton();
    }

    activeButton(){
    	super.activeButton();
        this._element.on(main.eventManager.EVENT_UP+".simplebutton", this._upFunction);
    }

    desactiveButton(){
        super.desactiveButton();
        this._element.off(".simplebutton");
    }

    removeButton(){
    	super.removeButton();
    }
}