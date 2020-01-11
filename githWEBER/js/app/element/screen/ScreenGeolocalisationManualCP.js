"use strict";
/** Class du manager de l'application. */
class ScreenGeolocalisationManualCP extends AbstractScreen{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType) {
		super(pType);
        this._btValidate=null;
        //this._selectDist=null;
    }

    init(){
    	super.init();
        this._btValidate=new SimpleButton($("#screen-geolocalisation-manual_bt-validate"), this.btValidateUpHandler);

        this._btValidate.element.addClass("desactiver");

        /*this._selectDist=$("#screen-geolocalisation-manual_input-dist");
        for(var i=0; i<main.sessionManager.listDistributeur.length; i++){
            var isSelect="";
            if(i==0){
                isSelect="selected";
            }
            var dist=$("<option "+isSelect+">"+main.sessionManager.listDistributeur[i].enseigne+"</option>")
            dist.data().enseigne=main.sessionManager.listDistributeur[i];
            //alert(JSON.stringify(dist.data().enseigne))
            this._selectDist.append(dist);
        }*/
        $("#screen-geolocalisation-manual_input-cp").change(function() {
            main.screenManager.currentScreen.keyPressHandler();
        });
    }

    keyPressHandler(){
        if($("#screen-geolocalisation-manual_input-cp").val()!=""){
            this._btValidate.element.removeClass("desactiver");
        }else{
            this._btValidate.element.addClass("desactiver");
        }
    }

    btValidateUpHandler(e){
        if($("#screen-geolocalisation-manual_input-cp").val()!=""){
            main.sessionManager.cpSelect=$("#screen-geolocalisation-manual_input-cp").val();
            //main.screenManager.currentScreen.getDistributeur();

            main.screenManager.loadPopin(ScreenManager.POPIN_SAVE);
            main.sqliteManager.searchPDV({cp: main.sessionManager.cpSelect});
        }
    }

    getDistributeur(){
        main.screenManager.loadPopin(ScreenManager.POPIN_SAVE);
        /*var data={
            action:"getDistributeur",
            variable:{},
            success: this.getDistributeurSuccessHandler,
            fail:this.getDistributeurErrorHandler
        }
        main.dataManager.request(data);*/
        main.sqliteManager.getDistributeur();
    }

    /*get selectDist(){
        return this._selectDist;
    }*/

    getDistributeurSuccessHandler(pData){
        main.sessionManager.distributeur=pData.result;
        main.sessionManager.enseigneSelect=$("#screen-geolocalisation-manual_input-dist option:selected").data().enseigne;
        main.sqliteManager.searchPDV({cp: main.sessionManager.cpSelect,enseigne: main.sessionManager.enseigneSelect.id});

        //main.screenManager.removePopin()
        //main.screenManager.loadScreen(ScreenManager.SCREEN_GEOLOCALISATION_MANUAL_ENSEIGNE);
    }

    searchSuccessHandler(pData){
        main.sessionManager.searchPDV=pData.result;
        main.screenManager.removePopin()
        main.screenManager.loadScreen(ScreenManager.SCREEN_GEOLOCALISATION_MANUAL_RESULT);
    }

    searchErrorHandler(){
        main.screenManager.removePopin()
    }

    getDistributeurErrorHandler(){
        main.screenManager.removePopin()
    }

    removeScreen(){
    	super.removeScreen();
    }
}