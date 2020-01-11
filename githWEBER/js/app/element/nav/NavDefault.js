"use strict";
/** Class du manager de l'application. */
class NavDefault extends AbstractNav{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType) {
		super(pType);
        this._btBurger=null;
        this._footerContainer=null;
        this._btLogo=null;
        this._footerName=null;

        this._btGeolocalisation=null;
        this._btCheck=null;
        this._btPhoto=null;
        this._btComment=null;
        this._btBack=null;
        this._backScreen=null;
        this._backParameter=null;
        this._btSync=null;
    }

    static get NAV_STEP_GEOLOCALISATION(){
        return "nav-default_footer_step_geolocalisation";
    }

    static get NAV_STEP_CHECK(){
        return "nav-default_footer_step_check";
    }

    static get NAV_STEP_PHOTO(){
        return "nav-default_footer_step_photo";
    }

    static get NAV_STEP_COMMENT(){
        return "nav-default_footer_step_comment";
    }

    init(){
    	super.init();
        this._btBurger=new SimpleButton($("#nav-default_header_burger"), this.btBurgerUpHandler);
        this._btBack=new SimpleButton($("#nav-default_bt-back"), this.btBackUpHandler);
        this._btLogo=new SimpleButton($("#nav-default_header_logo"), this.btLogoUpHandler);
        this._btSync=new SimpleButton($("#nav-default_header_btSync"), this.btSyncUpHandler);
        this._footerContainer=$("#nav-default_footer_container");
        this._footerName=$("#nav-default_footer_name");

        this._btGeolocalisation=new SimpleButton($("#nav-default_footer_step_geolocalisation"), this.btGeolocalisationUpHandler);
        this._btCheck=new SimpleButton($("#nav-default_footer_step_check"), this.btCheckUpHandler);
        this._btPhoto=new SimpleButton($("#nav-default_footer_step_photo"), this.btPhotoUpHandler);
        this._btComment=new SimpleButton($("#nav-default_footer_step_comment"), this.btCommentUpHandler);
    }

    setName(){
        this._footerName.html(main.sessionManager.login.prenom+" "+main.sessionManager.login.nom);
    }

    get backScreen(){
        return this._backScreen;
    }

    get backParameter(){
        return this._backParameter;
    }

    btBackUpHandler(e){
        if(main.screenManager.currentScreen.typeScreen==ScreenManager.SCREEN_STORE_CHECK_1){
            main.screenManager.loadPopin(ScreenManager.POPIN_QUIT, {"nextURL":main.screenManager.currentNav.backScreen, "screenParameter":main.screenManager.currentNav.backParameter, "syncAction":false});
        }else{
            main.screenManager.loadScreen(main.screenManager.currentNav.backScreen, main.screenManager.currentNav.backParameter);
        }
    }

    showBack(pScreen, pParameter){
        this._btBack.element.show();
        this._backScreen=pScreen;
        this._backParameter=pParameter;
    }

    hideBack(pActive){
        this._btBack.element.hide();
    }

    get backButton(){
        return this._btBack.element;
    }

    showFooter(pActive){
        this._footerContainer.show();
        $(".footer_nav").removeClass("active");
        $("#"+pActive).addClass("active");
    }

    hideFooter(pActive){
        this._footerContainer.hide();
    }

    showBurger(pActive){
        if(pActive==true){
            this._btBurger.element.show();
            this._btSync.element.show();
            $("#nav-default_header_sync").show();
        }else{
            this._btBurger.element.hide();
            this._btSync.element.hide();
            $("#nav-default_header_sync").hide();
        }
    }


    btBurgerUpHandler(e){
        main.screenManager.showMenu();
    }

    btLogoUpHandler(e){
        if(main.applicationManager.onSC==true){
            main.screenManager.loadPopin(ScreenManager.POPIN_QUIT, {"nextURL":ScreenManager.SCREEN_GEOLOCALISATION, "syncAction":false});
        }else if(main.screenManager.currentScreen.typeScreen!=ScreenManager.SCREEN_LOGIN){
            main.screenManager.loadScreen(ScreenManager.SCREEN_GEOLOCALISATION);
        }
    }

    btSyncUpHandler(e){
        if(main.applicationManager.onSC==true){
            main.screenManager.loadPopin(ScreenManager.POPIN_QUIT, {"nextURL":ScreenManager.SCREEN_GEOLOCALISATION, "syncAction":true});
        }else if(main.screenManager.currentScreen.typeScreen!=ScreenManager.SCREEN_LOGIN){
            main.screenManager.loadScreen(ScreenManager.SCREEN_GEOLOCALISATION);
            main.updateManager.startUpdate();
        }
    }

    btGeolocalisationUpHandler(e){
        if(main.applicationManager.onSC==true){
            main.screenManager.loadPopin(ScreenManager.POPIN_QUIT, {"nextURL":ScreenManager.SCREEN_GEOLOCALISATION, "syncAction":false});
        }else{
            main.screenManager.loadScreen(ScreenManager.SCREEN_GEOLOCALISATION);
        }
    }

    btCheckUpHandler(e){
        if(main.applicationManager.onSC==true){
            main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CHECK_1);
        }
    }

    btPhotoUpHandler(e){
        if(main.applicationManager.onSC==true){
            main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_PHOTO);
        }
    }

    btCommentUpHandler(e){
        if(main.applicationManager.onSC==true && main.sessionManager.scPhoto.length>=3){
            main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_COMMENT);
        }
    }

    removeNav(){
    	super.removeNav();
    }
}