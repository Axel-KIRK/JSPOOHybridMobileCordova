"use strict";
/** Class du manager de l'application. */
class ScreenManager {
	/**
     * Créér le manager de l'application.
     */
	constructor() {
    this._splashInitialized=false;
		this._currentScreen=null;
    this._currentMenu=null;
    this._currentNav=null;
    this._currentPopin=null;
		this._scaleValue=1;
    this._container=$("#container");
    this._screenContainer=$("#screen-container");
    this._screen=$("#screen");
    this._menu=$("#menu");
    this._nav=$("#nav");
    this._popin=$("#popin");
  }

  get splashInitialized(){
    return this._splashInitialized;
  }

  set splashInitialized(pBoolean){
    this._splashInitialized=pBoolean;
  }

  get currentScreen() {
    return this._currentScreen;
  }

  set currentScreen(pScreen) {
    this._currentScreen=pScreen;
  }

  get popin() {
    return this._popin;
  }

  set popin(pPopin) {
    this._popin=pPopin;
  }

  get currentPopin() {
    return this._currentPopin;
  }

  set currentPopin(pPopin) {
    this._currentPopin=pPopin;
  }

  get currentMenu() {
    return this._currentMenu;
  }

  set currentMenu(pMenu) {
    this._currentMenu=pMenu;
  }

  get currentNav() {
    return this._currentNav;
  }

  set currentNav(pNav) {
    this._currentNav=pNav;
  }

  get scaleValue() {
    return this._scaleValue;
  }

  set scaleValue(pValue) {
    this._scaleValue=pValue;
  }

  get container() {
    return this._container;
  }

  get screenContainer() {
    return this._screenContainer;
  }

  get screen() {
    return this._screen;
  }

  get menu() {
    return this._menu;
  }

  get nav() {
    return this._nav;
  }

  static get MENU_DEFAULT() {
    return "menu_default";
  }


  static get NAV_DEFAULT() {
    return "nav_default";
  }


  static get SCREEN_LOGIN() {
    return "screen_login";
  }

  static get SCREEN_LOGGED() {
    return "screen_logged";
  }

  static get SCREEN_GEOLOCALISATION() {
    return "screen_geolocalisation";
  }

  static get SCREEN_GEOLOCALISATION_MAP() {
    return "screen_geolocalisation_map";
  }

  static get SCREEN_GEOLOCALISATION_MANUAL_CP() {
    return "screen_geolocalisation_manual_cp";
  }

  static get SCREEN_GEOLOCALISATION_MANUAL_ENSEIGNE() {
    return "screen_geolocalisation_manual_enseigne";
  }

  static get SCREEN_GEOLOCALISATION_MANUAL_RESULT() {
    return "screen_geolocalisation_manual_result";
  }

  static get SCREEN_GEOLOCALISATION_NORESULT() {
    return "screen_geolocalisation_noresult";
  }

  static get SCREEN_STORE() {
    return "screen_store";
  }

  static get SCREEN_STORE_CONTACT() {
    return "screen_store_contact";
  }

  static get SCREEN_STORE_CHECK_1() {
    return "screen_store_check_1";
  }

  static get SCREEN_STORE_CHECK_2() {
    return "screen_store_check_2";
  }

  static get SCREEN_STORE_CHECK_3() {
    return "screen_store_check_3";
  }

  static get SCREEN_STORE_CHECK_4() {
    return "screen_store_check_4";
  }

  static get SCREEN_STORE_CHECK_5() {
    return "screen_store_check_5";
  }

  static get SCREEN_STORE_CHECK_6() {
    return "screen_store_check_6";
  }

  static get SCREEN_STORE_PHOTO() {
    return "screen_store_photo";
  }

  static get SCREEN_STORE_SHOOT() {
    return "screen_store_shoot";
  }

  static get SCREEN_STORE_GALLERY() {
    return "screen_store_gallery";
  }

  static get SCREEN_STORE_CONCURRENT_1() {
    return "screen_store_concurrent_1";
  }

  static get SCREEN_STORE_CONCURRENT_2() {
    return "screen_store_concurrent_2";
  }

  static get SCREEN_STORE_COMMENT() {
    return "screen_store_comment";
  }

  static get SCREEN_STORE_SEND() {
    return "screen_store_send";
  }

  static get SCREEN_MY_CHECK() {
    return "screen_my_check";
  }

  static get SCREEN_SEARCH() {
    return "screen_search";
  }

  static get SCREEN_PHOTOUSER() {
    return "screen_photouser";
  }

  static get POPIN_QUIT() {
    return "popin_quit";
  }

  static get POPIN_GPS() {
    return "popin_gps";
  }

  static get POPIN_SAVE() {
    return "popin_save";
  }

  static get POPIN_COMPLETE() {
    return "popin_complete";
  }

  static get POPIN_SYNC(){
    return "popin_sync";
  }

  init(){
    	this.scaleGame();
    	$(window).resize(this.scaleGame);
      main.screenManager.loadMenu(ScreenManager.MENU_DEFAULT);
  }

  scaleGame(){
    main.screenManager.container.css('display','none');

		if($(window).width()/375> $(window).height()/667){
			main.screenManager.scaleValue=$(window).height()/667;
		}else{
			main.screenManager.scaleValue=$(window).width()/375;
		}

		main.screenManager.container.css({
		  '-webkit-transform' : 'scale(' + main.screenManager.scaleValue + ')',
		  '-moz-transform'    : 'scale(' + main.screenManager.scaleValue + ')',
		  '-ms-transform'     : 'scale(' + main.screenManager.scaleValue + ')',
		  '-o-transform'      : 'scale(' + main.screenManager.scaleValue + ')',
		  'transform'         : 'scale(' + main.screenManager.scaleValue + ')',
		  'display':'block',
		  'top' : ($(window).height()-(main.screenManager.scaleValue*667))/2,
		  'left' : ($(window).width()-(main.screenManager.scaleValue*375))/2
		});
	}

  loadMenu(pMenu){
    if(this._currentMenu!=null){
      this._currentMenu.removeMenu();
    }
    switch(pMenu){
      case ScreenManager.MENU_DEFAULT:
        this._currentMenu=new MenuDefault(pMenu);
        this._screenContainer.on(main.eventManager.EVENT_UP, this.screenUpFunction);
      break;
    }

    this._menu.load("html/menu/"+pMenu+".html",this.menuHTMLLoadedHandler)
  }

  screenUpFunction(e){
    if(main.screenManager.screenContainer.css("transform")=="matrix(0.4, 0, 0, 0.4, 0, 0)"){
      main.screenManager.hideMenu();
    }
  }

  menuHTMLLoadedHandler(e){
    main.screenManager.currentMenu.init();
    main.screenManager.loadNav(ScreenManager.NAV_DEFAULT);
  }

  loadNav(pNav){
    if(this._currentNav!=null){
      this._currentNav.removeNav();
    }
    switch(pNav){
      case ScreenManager.NAV_DEFAULT:
        this._currentNav=new NavDefault(pNav);
      break;
    }

    this._nav.load("html/nav/"+pNav+".html",this.navHTMLLoadedHandler)
  }

  navHTMLLoadedHandler(e){
    main.screenManager.currentNav.init();
    if(main.sessionManager.existLogin()==false){
      main.screenManager.loadScreen(ScreenManager.SCREEN_LOGIN);
    }else{
      main.screenManager.loadScreen(ScreenManager.SCREEN_GEOLOCALISATION);
    }
  }

	loadScreen(pScreen, pParameter){
    this._currentNav.hideBack();
    this._currentNav.showBurger(true);
    //alert(pScreen);
    if(this._currentScreen!=null){
      switch(pScreen){
        case ScreenManager.SCREEN_GEOLOCALISATION_MAP:
          //this._currentNav.showBack(ScreenManager.SCREEN_GEOLOCALISATION);
        break;
        case ScreenManager.SCREEN_GEOLOCALISATION_MANUAL_CP:
          this._currentNav.showBack(ScreenManager.SCREEN_GEOLOCALISATION);
        break;
        case ScreenManager.SCREEN_GEOLOCALISATION_MANUAL_ENSEIGNE:
          if(pParameter!=null && pParameter.create==true){
            this._currentNav.showBack(ScreenManager.SCREEN_GEOLOCALISATION, pParameter);
          }else{
            this._currentNav.showBack(ScreenManager.SCREEN_GEOLOCALISATION_MANUAL_CP);
          }
        break;
        case ScreenManager.SCREEN_GEOLOCALISATION_MANUAL_RESULT:
          this._currentNav.showBack(ScreenManager.SCREEN_GEOLOCALISATION_MANUAL_CP);
        break;
        case ScreenManager.SCREEN_GEOLOCALISATION_NORESULT:
          this._currentNav.showBack(ScreenManager.SCREEN_GEOLOCALISATION_MANUAL_CP);
        break;
        case ScreenManager.SCREEN_STORE:
          this._currentNav.showBack(this._currentScreen.typeScreen);
          this._currentNav.showBack(ScreenManager.SCREEN_GEOLOCALISATION);
        break;
        case ScreenManager.SCREEN_STORE_CONTACT:
          if(pParameter!=null && pParameter.create==true){
            this._currentNav.showBack(ScreenManager.SCREEN_GEOLOCALISATION_MANUAL_RESULT, pParameter);
          }else{
            this._currentNav.showBack(ScreenManager.SCREEN_STORE);
          }
        break;
        case ScreenManager.SCREEN_STORE_CHECK_1:
          if(main.sessionManager.editSC==false){
            this._currentNav.showBack(ScreenManager.SCREEN_STORE);
          }
        break;
        case ScreenManager.SCREEN_STORE_CHECK_2:
          if(main.sessionManager.editSC==false){
            this._currentNav.showBack(ScreenManager.SCREEN_STORE_CHECK_1);
          }
        break;
        case ScreenManager.SCREEN_STORE_CHECK_3:
          if(main.sessionManager.editSC==false){
            this._currentNav.showBack(ScreenManager.SCREEN_STORE_CHECK_2);
          }
        break;
        case ScreenManager.SCREEN_STORE_CHECK_4:
          if(main.sessionManager.editSC==false){
            this._currentNav.showBack(ScreenManager.SCREEN_STORE_CHECK_3);
          }
        break;
        case ScreenManager.SCREEN_STORE_CHECK_5:
          if(main.sessionManager.editSC==false){
            this._currentNav.showBack(ScreenManager.SCREEN_STORE_CHECK_4);
          }
        break;
        case ScreenManager.SCREEN_STORE_CHECK_6:
          if(main.sessionManager.editSC==false){
            this._currentNav.showBack(ScreenManager.SCREEN_STORE_CHECK_5);
          }
        break;
        case ScreenManager.SCREEN_STORE_CONCURRENT_1:
          if(main.sessionManager.editSC==false){
            this._currentNav.showBack(ScreenManager.SCREEN_STORE_CHECK_6);
          }
        break;
        case ScreenManager.SCREEN_STORE_CONCURRENT_2:
          if(main.sessionManager.editSC==false){
            this._currentNav.showBack(ScreenManager.SCREEN_STORE_CONCURRENT_1);
          }
        break;
        case ScreenManager.SCREEN_STORE_PHOTO:
          this._currentNav.showBack(ScreenManager.SCREEN_STORE_CONCURRENT_2);
        break;
        case ScreenManager.SCREEN_STORE_GALLERY:
          if(main.sessionManager.editSC==false){
            this._currentNav.showBack(ScreenManager.SCREEN_STORE_PHOTO);
          }
        break;
        case ScreenManager.SCREEN_STORE_COMMENT:
          if(main.sessionManager.editSC==false){
            this._currentNav.showBack(ScreenManager.SCREEN_STORE_GALLERY);
          }
        break;
        case ScreenManager.SCREEN_STORE_SEND:
          this._currentNav.showBack(ScreenManager.SCREEN_STORE_COMMENT);
        break;
      }
      this._currentScreen.removeScreen();
    }

    
		switch(pScreen){
			case ScreenManager.SCREEN_LOGIN:
        this._currentNav.showBurger(false);
        this._currentNav.hideFooter();
        this._currentScreen=new ScreenLogin(pScreen);
			break;
      case ScreenManager.SCREEN_LOGGED:
        this._currentNav.showFooter(NavDefault.NAV_STEP_GEOLOCALISATION);
        this._currentScreen=new ScreenLogged(pScreen);
      break;
      case ScreenManager.SCREEN_GEOLOCALISATION:
        this._currentNav.showFooter(NavDefault.NAV_STEP_GEOLOCALISATION);
        this._currentScreen=new ScreenGeolocalisation(pScreen);
      break;
      case ScreenManager.SCREEN_GEOLOCALISATION_MAP:
        this._currentNav.showFooter(NavDefault.NAV_STEP_GEOLOCALISATION);
        this._currentScreen=new ScreenGeolocalisationMap(pScreen);
      break;
      case ScreenManager.SCREEN_GEOLOCALISATION_MANUAL_CP:
        this._currentNav.showFooter(NavDefault.NAV_STEP_GEOLOCALISATION);
        this._currentScreen=new ScreenGeolocalisationManualCP(pScreen);
      break;
      case ScreenManager.SCREEN_GEOLOCALISATION_MANUAL_ENSEIGNE:
        this._currentNav.showFooter(NavDefault.NAV_STEP_GEOLOCALISATION);
        this._currentScreen=new ScreenGeolocalisationManualEnseigne(pScreen, pParameter);
      break;
      case ScreenManager.SCREEN_GEOLOCALISATION_MANUAL_RESULT:
        this._currentNav.showFooter(NavDefault.NAV_STEP_GEOLOCALISATION);
        this._currentScreen=new ScreenGeolocalisationManualResult(pScreen);
      break;
      case ScreenManager.SCREEN_GEOLOCALISATION_NORESULT:
        this._currentNav.showFooter(NavDefault.NAV_STEP_GEOLOCALISATION);
        this._currentScreen=new ScreenGeolocalisationNoresult(pScreen);
      break;
      case ScreenManager.SCREEN_STORE:
        this._currentNav.showFooter(NavDefault.NAV_STEP_GEOLOCALISATION);
        this._currentScreen=new ScreenStore(pScreen);
      break;
      case ScreenManager.SCREEN_STORE_CONTACT:
        this._currentNav.showFooter(NavDefault.NAV_STEP_GEOLOCALISATION);
        this._currentScreen=new ScreenStoreContact(pScreen, pParameter);
      break;
      case ScreenManager.SCREEN_STORE_CHECK_1:
        this._currentNav.showFooter(NavDefault.NAV_STEP_CHECK);
        this._currentScreen=new ScreenStoreCheck1(pScreen);
      break;
      case ScreenManager.SCREEN_STORE_CHECK_2:
        this._currentNav.showFooter(NavDefault.NAV_STEP_CHECK);
        this._currentScreen=new ScreenStoreCheck2(pScreen);
      break;
      case ScreenManager.SCREEN_STORE_CHECK_3:
        this._currentNav.showFooter(NavDefault.NAV_STEP_CHECK);
        this._currentScreen=new ScreenStoreCheck3(pScreen);
      break;
      case ScreenManager.SCREEN_STORE_CHECK_4:
        this._currentNav.showFooter(NavDefault.NAV_STEP_CHECK);
        this._currentScreen=new ScreenStoreCheck4(pScreen);
      break;
      case ScreenManager.SCREEN_STORE_CHECK_5:
        this._currentNav.showFooter(NavDefault.NAV_STEP_CHECK);
        this._currentScreen=new ScreenStoreCheck5(pScreen);
      break;
      case ScreenManager.SCREEN_STORE_CHECK_6:
        this._currentNav.showFooter(NavDefault.NAV_STEP_CHECK);
        this._currentScreen=new ScreenStoreCheck6(pScreen);
      break;
      case ScreenManager.SCREEN_STORE_PHOTO:
        this._currentNav.showFooter(NavDefault.NAV_STEP_PHOTO);
        this._currentScreen=new ScreenPhoto(pScreen);
      break;
      case ScreenManager.SCREEN_STORE_SHOOT:
        this._currentScreen=new ScreenShoot(pScreen);
      break;
      case ScreenManager.SCREEN_STORE_GALLERY:
        this._currentNav.showFooter(NavDefault.NAV_STEP_PHOTO);
        this._currentScreen=new ScreenGallery(pScreen);
      break;
      case ScreenManager.SCREEN_STORE_CONCURRENT_1:
        this._currentNav.showFooter(NavDefault.NAV_STEP_CHECK);
        this._currentScreen=new ScreenConccurent1(pScreen);
      break;
      case ScreenManager.SCREEN_STORE_CONCURRENT_2:
        this._currentNav.showFooter(NavDefault.NAV_STEP_CHECK);
        this._currentScreen=new ScreenConccurent2(pScreen);
      break;
      case ScreenManager.SCREEN_STORE_COMMENT:
        this._currentNav.showFooter(NavDefault.NAV_STEP_COMMENT);
        this._currentScreen=new ScreenComment(pScreen);
      break;
      case ScreenManager.SCREEN_STORE_SEND:
        this._currentNav.showFooter(NavDefault.NAV_STEP_COMMENT);
        this._currentScreen=new ScreenStoreSend(pScreen);
      break;
      case ScreenManager.SCREEN_MY_CHECK:
        this._currentScreen=new ScreenMyCheck(pScreen);
      break;
      case ScreenManager.SCREEN_SEARCH:
        this._currentScreen=new ScreenSearch(pScreen);
      break;
      case ScreenManager.SCREEN_PHOTOUSER:
        this._currentScreen=new ScreenPhotoUser(pScreen);
      break;
		}

    this._screen.load("html/screen/"+pScreen+".html",this.screenHTMLLoadedHandler)
	}

  screenHTMLLoadedHandler(e){
    main.screenManager.currentScreen.init();

    if(ApplicationManager.ON_DEVICE==true && main.screenManager.splashInitialized==false){
      main.mapManager.init();
    }
  }

  loadPopin(pPopin, pParameter){
    if(this._currentPopin!=null){
      this._currentPopin.removePopin();
    }
    switch(pPopin){
      case ScreenManager.POPIN_QUIT:
        this._currentPopin=new PopinQuit(pPopin, pParameter);
      break;
      case ScreenManager.POPIN_GPS:
        this._currentPopin=new PopinGPS(pPopin, pParameter);
      break;
      case ScreenManager.POPIN_COMPLETE:
        this._currentPopin=new PopinComplete(pPopin, pParameter);
      break;
      case ScreenManager.POPIN_SAVE:
        this._currentPopin=new PopinSave(pPopin, pParameter);
      break;
      case ScreenManager.POPIN_SYNC:
        this._currentPopin=new PopinSync(pPopin, pParameter);
      break;
    }

    //this._popin.addClass("show");
    this._popin.show();
    this._popin.load("html/popin/"+pPopin+".html",this.popinHTMLLoadedHandler)
  }

  popinHTMLLoadedHandler(e){
    main.screenManager.currentPopin.init();

  }

  removePopin(){
    //setTimeout(function(){
      if(main.screenManager.currentPopin!=null){
        main.screenManager.popin.empty();
        //main.screenManager.popin.removeClass("show");
        main.screenManager.popin.hide();
      }
    //}, 1000);
  }

  showMenu(){
    if(this._currentScreen.typeScreen==ScreenManager.SCREEN_GEOLOCALISATION_MAP){
      main.mapManager.gmap.toDataURL(function(imageData){
        main.screenManager.menu.show();
        $("#mapCapture").css("visibility","visible")
        $("#mapCapture").attr("src",imageData);
        main.screenManager.screenContainer.addClass("minimize");
        main.mapManager.activeMap(false);
      })
    }else{
      main.screenManager.screenContainer.addClass("minimize");
    }
  }

  hideMenu(){
    if(this._currentScreen.typeScreen==ScreenManager.SCREEN_GEOLOCALISATION_MAP){
      this._screenContainer.on("transitionend webkitTransitionEnd oTransitionEnd",function(){
        main.screenManager.screenContainer.off("transitionend webkitTransitionEnd oTransitionEnd");
        if(main.screenManager.currentScreen.typeScreen==ScreenManager.SCREEN_GEOLOCALISATION_MAP){
          main.screenManager.menu.hide();
          main.mapManager.activeMap(true);
          setTimeout(function(){
            $("#mapCapture").css("visibility","hidden")
          },100);
        }
      });
    }
    this._screenContainer.removeClass("minimize");
  }
}