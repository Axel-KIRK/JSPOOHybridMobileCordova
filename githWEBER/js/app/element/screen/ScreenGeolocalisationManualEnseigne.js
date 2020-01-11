"use strict";
/** Class du manager de l'application. */
class ScreenGeolocalisationManualEnseigne extends AbstractScreen{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType, pParameter) {
		super(pType);
        this._parameter=pParameter;
        this._deltaY=false;
    }

    get parameter(){
        return this._parameter;
    }

    get deltaY(){
        return this._deltaY;
    }

    set deltaY(pValue){
        this._deltaY=pValue;
    }

    init(){
    	super.init();

        $("#screen-geolocalisation-manual-enseigne_bloc-enseigne_list_elements").empty();

        for(var i=0; i<main.sessionManager.distributeur.length;i++){
            var dist=$('<div class="screen-geolocalisation-manual-enseigne_bloc-enseigne_list_element"><img src="'+AppConfiguration.SERVER_URL+'/app/distributeur/'+main.sessionManager.distributeur[i].picto+'" /></div>')
            dist.data().enseigne=main.sessionManager.distributeur[i];
            $("#screen-geolocalisation-manual-enseigne_bloc-enseigne_list_elements").append(dist)
        }


        $(".screen-geolocalisation-manual-enseigne_bloc-enseigne_list_element").each(function( index ) {
          var enseigne=new SimpleButton($(this), main.screenManager.currentScreen.enseigneUpHandler);
        });

        $("#screen-geolocalisation-manual-enseigne_bloc-enseigne").on(main.eventManager.EVENT_MOVE, this.containerMoveHandler)
    }

    containerMoveHandler(e){
        //main.screenManager.currentScreen.deltaY=$("#screen-store-gallery_bloc-photos-container").scrollTop()
        main.screenManager.currentScreen.deltaY=true;
    }

    enseigneUpHandler(e){
        if(main.screenManager.currentScreen.deltaY==false){
            main.sessionManager.enseigneSelect=$(this).data().enseigne;
            main.screenManager.currentScreen.searchPDV();
        }
        main.screenManager.currentScreen.deltaY=false;
    }

    searchPDV(){
        main.screenManager.loadPopin(ScreenManager.POPIN_SAVE);
        /*var data={
            action:"searchPDV",
            variable:{
                cp: main.sessionManager.cpSelect,
                enseigne: main.sessionManager.enseigneSelect.id
            },
            success: this.searchSuccessHandler,
            fail: this.searchErrorHandler
        }

        main.dataManager.request(data);*/
        main.sqliteManager.searchPDV({cp: main.sessionManager.cpSelect,enseigne: main.sessionManager.enseigneSelect.id});
    }

    searchSuccessHandler(pData){
        main.sessionManager.searchPDV=pData.result;
        main.screenManager.removePopin()
        main.screenManager.loadScreen(ScreenManager.SCREEN_GEOLOCALISATION_MANUAL_RESULT);
    }

    searchErrorHandler(){
        main.screenManager.removePopin()
    }

    removeScreen(){
    	super.removeScreen();
    }
}