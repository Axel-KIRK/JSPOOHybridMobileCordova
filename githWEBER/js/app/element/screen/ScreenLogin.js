"use strict";
/** Class du manager de l'application. */
class ScreenLogin extends AbstractScreen{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType) {
		super(pType);
		this._btIdentifie=null;
        this._blocIdentifie=null;
        this._inputLogin=null;
        this._inputPassword=null;
        this._btValider=null;
        this._msgError=null;
        this._msgWifi=null;
    }

    init(){
    	super.init();
        this._msgError=$("#screen-login_error");
        this._msgError.hide();
        this._msgWifi=$("#screen-login_wifi");
        this._blocIdentifie=$("#screen-login_bloc_identifie");
    	this._btIdentifie=new SimpleButton($("#screen-login_bloc_identifie_text-identifie"), this.btIdentifieUpHandler);
        this._btValider=new SimpleButton($("#screen-login_bloc_identifie_bt-validate"), this.btValiderUpHandler);
        this._btValider.element.addClass("desactiver");
        this._inputLogin=$("#screen-login_bloc_identifie_input-login");
        this._inputPassword=$("#screen-login_bloc_identifie_input-password");
        this._inputLogin.change(function() {
            main.screenManager.currentScreen.keyPressHandler();
        });
        this._inputPassword.change(function() {
            main.screenManager.currentScreen.keyPressHandler();
        });
    }

    keyPressHandler(){
        if(main.screenManager.currentScreen.inputLogin.val()!="" && main.screenManager.currentScreen.inputPassword.val()!=""){
            this._btValider.element.removeClass("desactiver");
        }else{
            this._btValider.element.addClass("desactiver");
        }
    }

    get blocIdentifie(){
        return this._blocIdentifie;
    }

    get inputLogin(){
        return this._inputLogin;
    }

    get inputPassword(){
        return this._inputPassword;
    }

    btIdentifieUpHandler(e){
        main.screenManager.currentScreen.inputLogin.blur();
        main.screenManager.currentScreen.inputPassword.blur();
        main.screenManager.currentScreen.blocIdentifie.addClass("maximize");
        
    }

    btValiderUpHandler(e){
        if(main.screenManager.currentScreen.inputLogin.val()!="" && main.screenManager.currentScreen.inputPassword.val()!=""){
            main.screenManager.currentScreen.checkUserValid();
        }
    }

    checkUserValid(){   
        main.screenManager.loadPopin(ScreenManager.POPIN_SAVE);

        var data={
            action:"checkLogin",
            variable:{
                login: this._inputLogin.val(),
                password: this._inputPassword.val()
            },
            success: this.userValidAction,
            fail:this.userValidActionError
        }
        main.dataManager.request(data);
    }

    userValidAction(pData){
        if(pData.result=="found"){
            main.sessionManager.tempLogin=pData;
            main.screenManager.currentScreen.inputLogin.blur();
            main.screenManager.currentScreen.inputPassword.blur();
            if(main.updateManager.contentTimestamp==0){
                //main.updateManager.startUpdate();
                main.sqliteManager.truncateBDD();
            }else{
                main.sessionManager.saveLogin(main.sessionManager.tempLogin);
                main.screenManager.removePopin();
                main.screenManager.loadScreen(ScreenManager.SCREEN_LOGGED);
            }
        }else{
            main.screenManager.removePopin();
            main.screenManager.currentScreen.msgError.show();
        }
    }

    get msgError(){
        return this._msgError;
    }

    userValidActionError(){
        main.screenManager.removePopin();
        main.screenManager.currentScreen.msgError.show();
    }

    removeScreen(){
    	super.removeScreen();
    }
}