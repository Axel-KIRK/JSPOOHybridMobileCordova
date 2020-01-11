"use strict";
/** Class du manager de l'application. */
class PopinSync extends AbstractPopin{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType, pParameter) {
		super(pType);
        this._parameter=pParameter;
        this._btOk=null;
        this._text=null;
        this._onSucess=null;
    }

    get parameter(){
        return this._parameter;
    }

    init(){
    	super.init();
        this._onSucess=false;
        this._text=$("#popin-quit_bloc_inset_text");
        this._text.html("Synchronisation<br />en cours...");
        this._btOk=new SimpleButton($("#popin-quit_bloc_inset_bt-ok"), this.btOkUpHandler);
        this._btOk.element.hide();
    }

    syncSuccess(){
        this._onSucess=true;
        this._text.html("La synchronisation<br />a été effectuée<br />avec succès.");
        this._btOk.element.show();
    }

    syncError(){
        this._onSucess=false;
        this._text.html("Erreur dans la synchronisation.<br />Veuillez vérifier<br />votre connexion internet.");
        this._btOk.element.show();
    }

    btOkUpHandler(e){
        main.screenManager.currentPopin.btOkAction();
    }

    btOkAction(){
        if(this._onSucess==true){
            if(main.updateManager.contentTimestamp==0){
                main.sessionManager.saveLogin(main.sessionManager.tempLogin);
                main.screenManager.removePopin();
                main.screenManager.loadScreen(ScreenManager.SCREEN_LOGGED);
            }else{
                main.screenManager.removePopin();
            }
            main.updateManager.contentTimestamp=parseInt(main.updateManager.updateData.syncTimestamp);
        }else{
            main.screenManager.removePopin();
        }
    }

    removePopin(){
    	super.removePopin();
    }
}