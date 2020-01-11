"use strict";
/** Class du manager de l'application. */
class ScreenLogged extends AbstractScreen{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType) {
		super(pType);
		this._timeoutLogged=null;
        this._helloName=null;
    }

    static get DELAY_TIMEOUT_LOGGED(){
        return 3000;
    }

    init(){
    	super.init();
        this._helloName=$("#screen-logged_hello_text-name");
        this._helloName.html(main.sessionManager.login.prenom);
    	this._timeoutLogged=setTimeout(this.timeoutLoggedHandler,ScreenLogged.DELAY_TIMEOUT_LOGGED);
    }

    timeoutLoggedHandler(e){
        main.screenManager.loadScreen(ScreenManager.SCREEN_GEOLOCALISATION);
    }

    removeScreen(){
    	super.removeScreen();
        clearTimeout(this._timeoutLogged);
    }
}