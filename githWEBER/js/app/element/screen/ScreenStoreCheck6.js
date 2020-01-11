"use strict";
/** Class du manager de l'application. */
class ScreenStoreCheck6 extends AbstractScreen{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType) {
		super(pType);
		this._btNext=null;
        this._selectElement=null;

        this._infoLogo=null;
        this._infoTime=null;
        this._infoVille=null;
    }

    init(){
    	super.init();
        this._btNext=new SimpleButton($("#screen-store-check-check-6_bt-next"), this.btNextUpHandler);
    	this._selectElement=$(".screen-store-check-6_question_value");
        this._selectElement.on(main.eventManager.EVENT_DOWN, this.selectElementDownHandler);

        $("#screen-store-check-6_question4").hide();
        var sc=main.sessionManager.newSC;
        if(sc.rapport.hasOwnProperty("champ14") && sc.rapport.champ14!=""){
            $("#champ14 .screen-store-check-6_question_value").eq(parseInt(sc.rapport.champ14)).css("opacity","1");
        }
        if(sc.rapport.hasOwnProperty("champ15") && sc.rapport.champ15!=""){
            $("#champ15 .screen-store-check-6_question_value").eq(parseInt(sc.rapport.champ15)).css("opacity","1");
        }
        if(sc.rapport.hasOwnProperty("champ16") && sc.rapport.champ16!=""){
            $("#champ16 .screen-store-check-6_question_value").eq(parseInt(sc.rapport.champ16)).css("opacity","1");
            if(parseInt(sc.rapport.champ16)==0){
                $("#screen-store-check-6_question4").show();
            }
        }
        if(sc.rapport.hasOwnProperty("champ17") && sc.rapport.champ17!=""){
            $("#champ17 .screen-store-check-6_question_value").eq(parseInt(sc.rapport.champ17)).css("opacity","1");
        }

        var pdv=main.sessionManager.currentPDV;
        var scc=main.sessionManager.currentSC;
        this._infoLogo=$(".screen-store-check-common_logo");
        this._infoTime=$("#screen-store_text-update");
        this._infoTime.html("NA");
        this._infoVille=$(".screen-store-check-common_ville");
        this._infoLogo.html('<img src="'+cordova.file.dataDirectory+UpdateManager.FOLDER_DISTRIBUTEUR+'/'+pdv.picto+'" />');
        if(pdv.hasOwnProperty("ville") && pdv.ville!=""){
            this._infoVille.html(pdv.ville.toUpperCase());
        }else{
            this._infoVille.html("&nbsp;");
        }
        if(scc!='nothing'){
            var jour=["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
            var mois=["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"];
            var dateUpdate=new Date(scc.timestamp*1000);
            this._infoTime.html("Mises à jour le "+jour[dateUpdate.getDay()]+" "+dateUpdate.getDate()+" "+mois[dateUpdate.getMonth()]+" "+dateUpdate.getFullYear()+" à "+dateUpdate.getHours()+"h"+dateUpdate.getMinutes()+" par "+scc.prenom+" "+scc.nom);
        }

        if(main.sessionManager.editSC==true){
            this._btNext.element.html("RETOUR");
        }
    }

    selectElementDownHandler(e){
        $(this).parent().find(".screen-store-check-6_question_value").css("opacity","0.5");
        $(this).css("opacity","1");
        if($(this).parents(".screen-store-check-6_question").attr("id")=="screen-store-check-6_question3"){
            if($(this).index()==0){
                $("#screen-store-check-6_question4").show();
            }else{
                $("#screen-store-check-6_question4").hide();
            }
        }
    }

    btNextUpHandler(e){
        main.screenManager.currentScreen.storeResponse();
        
        if(main.sessionManager.editSC==false){
            main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CONCURRENT_1);
        }else{
            main.sessionManager.editSC=false;
            main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_SEND);
        }
    }

    storeResponse(){
        var sc=main.sessionManager.newSC;
        $("#champ14 .screen-store-check-6_question_value").each(function(index){
            if($(this).css("opacity")=="1"){
                sc.rapport.champ14=index.toString();
            }
        })
        $("#champ15 .screen-store-check-6_question_value").each(function(index){
            if($(this).css("opacity")=="1"){
                sc.rapport.champ15=index.toString();
            }
        })
        $("#champ16 .screen-store-check-6_question_value").each(function(index){
            if($(this).css("opacity")=="1"){
                sc.rapport.champ16=index.toString();
                if(index==1 && sc.rapport.hasOwnProperty("champ17")){
                    delete sc.rapport.champ17;
                }else{
                    $("#champ17 .screen-store-check-6_question_value").each(function(index){
                        if($(this).css("opacity")=="1"){
                            sc.rapport.champ17=index.toString();
                        }
                    })
                }
            }
        })
    }

    removeScreen(){
    	super.removeScreen();
    }
}