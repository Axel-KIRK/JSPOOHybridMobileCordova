"use strict";
/** Class du manager de l'application. */
class ScreenNoresult extends AbstractScreen{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType) {
		super(pType);
		this._btIdentifie=null;
    }

    init(){
    	super.init();
    	//this._btIdentifie=new ActionButton($("#screen_game_button_play_gesa"),ScreenManager.SCREEN_GESA,false);
    }

    removeScreen(){
    	super.removeScreen();
    }
}