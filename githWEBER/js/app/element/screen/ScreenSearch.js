"use strict";
/** Class du manager de l'application. */
class ScreenSearch extends AbstractScreen{
	/**
     * Créér le manager de l'application.
     */
    constructor(pType) {
        super(pType);
        this._ref=null;
    }

    init(){
        super.init();
        this._ref= cordova.InAppBrowser.open('http://weberplatform.fr/storecheck/photos/'+main.sessionManager.login.id+'/', '_blank', 'location=yes', 'closebuttoncaption=Retour', "disallowoverscroll=yes", "clearsessioncache=yes");
        this._ref.addEventListener('exit', function(){
            main.screenManager.loadScreen(ScreenManager.SCREEN_GEOLOCALISATION);
        });
    }

    removeScreen(){
        super.removeScreen();
    }
}