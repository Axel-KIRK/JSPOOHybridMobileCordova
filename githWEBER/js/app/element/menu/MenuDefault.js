"use strict";
/** Class du manager de l'application. */
class MenuDefault extends AbstractMenu{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType) {
		super(pType);
        this._link=null;
        this._btDisconnect=null;
        this._btStart=null;
        this._btCheck=null;
        this._btSearch=null;
        this._btPhoto=null;
    }

    init(){
    	super.init();
        this._link=$("#menu-default_link");
        this._link.css("top",((667-this._link.height())/2)+"px");

        this._btDisconnect=new SimpleButton($("#menu-default_link_disconnect"), this.btDisconnectUpHandler);
        this._btStart=new SimpleButton($("#menu-default_link_start"), this.btStartUpHandler);
        this._btCheck=new SimpleButton($("#menu-default_link_history"), this.btCheckUpHandler);
        this._btSearch=new SimpleButton($("#menu-default_link_photos"), this.btSearchUpHandler);
        this._btPhoto=new SimpleButton($("#menu-default_link_photouser"), this.btPhotoUpHandler);
    }

    btDisconnectUpHandler(e){
        main.screenManager.hideMenu();
        if(main.applicationManager.onSC==true){
            main.screenManager.loadPopin(ScreenManager.POPIN_QUIT, {"nextURL":ScreenManager.SCREEN_LOGIN, "syncAction":false});
        }else{
            main.sessionManager.destroyLogin();
            main.screenManager.loadScreen(ScreenManager.SCREEN_LOGIN);
        }
    }

    btStartUpHandler(e){
        main.screenManager.hideMenu();
        if(main.applicationManager.onSC==true){
            main.screenManager.loadPopin(ScreenManager.POPIN_QUIT, {"nextURL":ScreenManager.SCREEN_GEOLOCALISATION, "syncAction":false});
        }else{
            main.screenManager.loadScreen(ScreenManager.SCREEN_GEOLOCALISATION);
        }
    }

    btCheckUpHandler(e){
        main.screenManager.hideMenu();
        if(main.applicationManager.onSC==true){
            main.screenManager.loadPopin(ScreenManager.POPIN_QUIT, {"nextURL":ScreenManager.SCREEN_MY_CHECK, "syncAction":false});
        }else{
            main.screenManager.currentMenu.searchPDV();
        }
        
    }

    btSearchUpHandler(e){
        main.screenManager.hideMenu();
        if(main.applicationManager.onSC==true){
            main.screenManager.loadPopin(ScreenManager.POPIN_QUIT, {"nextURL":ScreenManager.SCREEN_SEARCH, "syncAction":false});
        }else{
            main.screenManager.loadScreen(ScreenManager.SCREEN_SEARCH);
        }
        
    }

    btPhotoUpHandler(e){
        main.screenManager.hideMenu();
        if(main.applicationManager.onSC==true){
            main.screenManager.loadPopin(ScreenManager.POPIN_QUIT, {"nextURL":ScreenManager.SCREEN_PHOTOUSER, "syncAction":false});
        }else{
            main.screenManager.loadScreen(ScreenManager.SCREEN_PHOTOUSER);
        }
        
    }

    searchPDV(){
        main.screenManager.loadPopin(ScreenManager.POPIN_SAVE);
        /*var data={
            action:"getMySC",
            variable:{
                id_user: main.sessionManager.login.id
            },
            success: main.screenManager.currentMenu.searchSuccessHandler,
            fail: main.screenManager.currentMenu.searchErrorHandler
        }

        main.dataManager.request(data);*/
        main.sqliteManager.getMySCgetMySC({id_user: main.sessionManager.login.id});
    }

    searchSuccessHandler(pData){ 
        main.screenManager.hideMenu();
        main.sessionManager.searchMyPDV=pData.result;
        main.screenManager.removePopin()
        main.screenManager.loadScreen(ScreenManager.SCREEN_MY_CHECK);
    }

    searchErrorHandler(){
        main.screenManager.removePopin()
    }


    removeMenu(){
    	super.removeMenu();
    }
}