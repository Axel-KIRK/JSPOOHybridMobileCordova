"use strict";
/** Class du manager de l'application. */
class ScreenStoreContact extends AbstractScreen{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType, pParameter) {
		super(pType);
		this._btValidate=null;
        this._selectDist=null;
    }

    get parameter(){
        return this._parameter;
    }

    init(){
    	super.init();
        if(main.sessionManager.currentPDV!=null){

            if(main.sessionManager.currentPDV.hasOwnProperty("adresse") && main.sessionManager.currentPDV.adresse!=""){
                $("#screen-geolocalisation-contact_input-adresse").val(main.sessionManager.currentPDV.adresse);
            }
            if(main.sessionManager.currentPDV.hasOwnProperty("cp") && main.sessionManager.currentPDV.cp!=""){
                $("#screen-geolocalisation-contact_input-cp").val(main.sessionManager.currentPDV.cp);
            }
            if(main.sessionManager.currentPDV.hasOwnProperty("ville") && main.sessionManager.currentPDV.ville!=""){
                $("#screen-geolocalisation-contact_input-ville").val(main.sessionManager.currentPDV.ville);
            }
            if(main.sessionManager.currentPDV.hasOwnProperty("tel") && main.sessionManager.currentPDV.tel!=""){
                $("#screen-geolocalisation-contact_input-telephone").val(main.sessionManager.currentPDV.tel);
            }
            if(main.sessionManager.currentPDV.hasOwnProperty("contact") && main.sessionManager.currentPDV.contact!=""){
                $("#screen-geolocalisation-contact_input-contact").val(main.sessionManager.currentPDV.contact);
            }
            if(main.sessionManager.currentPDV.hasOwnProperty("email") && main.sessionManager.currentPDV.email!=""){
                $("#screen-geolocalisation-contact_input-email").val(main.sessionManager.currentPDV.email);
            }
            if(main.sessionManager.currentPDV.hasOwnProperty("web") && main.sessionManager.currentPDV.web!=""){
                $("#screen-geolocalisation-contact_input-web").val(main.sessionManager.currentPDV.web);
            }

            $("#screen-geolocalisation-manual_input-dist-div").hide();
        }

        $("#screen-geolocalisation-contact_input-email").hide();
        $("#screen-geolocalisation-contact_input-contact").hide();
        $("#screen-geolocalisation-contact_input-telephone").hide();

        this._selectDist=$("#screen-geolocalisation-manual_input-dist");
        for(var i=0; i<main.sessionManager.listDistributeur.length; i++){
            var isSelect="";
            if(i==0){
                isSelect="selected";
            }
            var dist=$("<option "+isSelect+">"+main.sessionManager.listDistributeur[i].enseigne+"</option>")
            dist.data().enseigne=main.sessionManager.listDistributeur[i];
            //alert(JSON.stringify(dist.data().enseigne))
            this._selectDist.append(dist);
        }

        $("#screen-geolocalisation-contact_input-adresse").change(function() {
            main.screenManager.currentScreen.keyPressHandler();
        });
        $("#screen-geolocalisation-contact_input-cp").change(function() {
            main.screenManager.currentScreen.keyPressHandler();
        });
        $("#screen-geolocalisation-contact_input-ville").change(function() {
            main.screenManager.currentScreen.keyPressHandler();
        });
        $("#screen-geolocalisation-contact_input-telephone").change(function() {
            main.screenManager.currentScreen.keyPressHandler();
        });
        $("#screen-geolocalisation-contact_input-contact").change(function() {
            main.screenManager.currentScreen.keyPressHandler();
        });
        $("#screen-geolocalisation-contact_input-email").change(function() {
            main.screenManager.currentScreen.keyPressHandler();
        });
        $("#screen-geolocalisation-contact_input-web").change(function() {
            main.screenManager.currentScreen.keyPressHandler();
        });


    	this._btValidate=new SimpleButton($("#screen-store-contact_bt-validate"), this.btValidateUpHandler);
        if($("#screen-geolocalisation-contact_input-web").val()=="" || $("#screen-geolocalisation-contact_input-adresse").val()=="" || $("#screen-geolocalisation-contact_input-cp").val()=="" || $("#screen-geolocalisation-contact_input-ville").val()==""){
            this._btValidate.element.addClass("desactiver");
        }
    }

    keyPressHandler(){
        if($("#screen-geolocalisation-contact_input-web").val()!="" && $("#screen-geolocalisation-contact_input-adresse").val()!="" && $("#screen-geolocalisation-contact_input-cp").val()!="" && $("#screen-geolocalisation-contact_input-ville").val()!=""){
            this._btValidate.element.removeClass("desactiver");
        }else{
            this._btValidate.element.addClass("desactiver");
        }
    }

    btValidateUpHandler(e){
        if($("#screen-geolocalisation-contact_input-web").val()!="" && $("#screen-geolocalisation-contact_input-adresse").val()!="" && $("#screen-geolocalisation-contact_input-cp").val()!="" && $("#screen-geolocalisation-contact_input-ville").val()!=""){
            main.screenManager.currentScreen.setPDVInfo();
        }
    }

    setPDVInfo(){
        main.screenManager.loadPopin(ScreenManager.POPIN_SAVE);
        /*var data={
            action:"setPDVInfo",
            variable:{
                adresse: $("#screen-geolocalisation-contact_input-adresse").val(),
                cp: $("#screen-geolocalisation-contact_input-cp").val(),
                ville: $("#screen-geolocalisation-contact_input-ville").val(),
                tel: $("#screen-geolocalisation-contact_input-telephone").val(),
                contact: $("#screen-geolocalisation-contact_input-contact").val(),
                email: $("#screen-geolocalisation-contact_input-email").val(),
                web: $("#screen-geolocalisation-contact_input-web").val()
            },
            success: this.btCreateSuccessHandler,
            fail:this.btCreateErrorHandler
        };*/
        if(main.sessionManager.currentPDV==null){
            main.sqliteManager.setPDVInfo({create:"true", id_remote:1, id_distributeur:$("#screen-geolocalisation-manual_input-dist option:selected").data().enseigne.id, longitude:main.sessionManager.currentLocation.lng, latitude:main.sessionManager.currentLocation.lat, adresse: $("#screen-geolocalisation-contact_input-adresse").val(), cp: $("#screen-geolocalisation-contact_input-cp").val(), ville: $("#screen-geolocalisation-contact_input-ville").val(), tel: $("#screen-geolocalisation-contact_input-telephone").val(), contact: $("#screen-geolocalisation-contact_input-contact").val(), email: $("#screen-geolocalisation-contact_input-email").val(), nom: $("#screen-geolocalisation-contact_input-web").val()});
        }else{
            main.sqliteManager.setPDVInfo({create:"false", id:main.sessionManager.currentPDV.id, adresse: $("#screen-geolocalisation-contact_input-adresse").val(), cp: $("#screen-geolocalisation-contact_input-cp").val(), ville: $("#screen-geolocalisation-contact_input-ville").val(), tel: $("#screen-geolocalisation-contact_input-telephone").val(), contact: $("#screen-geolocalisation-contact_input-contact").val(), email: $("#screen-geolocalisation-contact_input-email").val(), nom: $("#screen-geolocalisation-contact_input-web").val()});
        }
        //main.dataManager.request(data);
    }

    btCreateSuccessHandler(pData){
        main.screenManager.removePopin()
        if(main.sessionManager.currentPDV==null){
            main.sessionManager.currentPDV={
                id:pData.id,
                latitude : main.sessionManager.currentLocation.lat,
                longitude : main.sessionManager.currentLocation.lng,
                cp : $("#screen-geolocalisation-contact_input-cp").val(),
                ville : $("#screen-geolocalisation-contact_input-ville").val(),
                adresse : $("#screen-geolocalisation-contact_input-adresse").val(),
                tel : $("#screen-geolocalisation-contact_input-telephone").val(),
                contact : $("#screen-geolocalisation-contact_input-contact").val(),
                email : $("#screen-geolocalisation-contact_input-email").val(),
                web : $("#screen-geolocalisation-contact_input-web").val(),
                picto : /*main.sessionManager.enseigneSelect.picto*/$("#screen-geolocalisation-manual_input-dist option:selected").data().enseigne.picto
            }
            //main.mapManager.addMarker(main.sessionManager.currentPDV);
            main.dataManager.getPiInfo();
        }else{
            main.sessionManager.currentPDV.cp=$("#screen-geolocalisation-contact_input-cp").val();
            main.sessionManager.currentPDV.ville=$("#screen-geolocalisation-contact_input-ville").val();
            main.sessionManager.currentPDV.adresse=$("#screen-geolocalisation-contact_input-adresse").val();
            main.sessionManager.currentPDV.tel=$("#screen-geolocalisation-contact_input-telephone").val();
            main.sessionManager.currentPDV.contact=$("#screen-geolocalisation-contact_input-contact").val();
            main.sessionManager.currentPDV.email=$("#screen-geolocalisation-contact_input-email").val();
            main.sessionManager.currentPDV.web=$("#screen-geolocalisation-contact_input-web").val();
            main.screenManager.loadScreen(ScreenManager.SCREEN_STORE);
        }
        
    }

    btCreateErrorHandler(){
        main.screenManager.removePopin()
    }

    removeScreen(){
    	super.removeScreen();
    }
}