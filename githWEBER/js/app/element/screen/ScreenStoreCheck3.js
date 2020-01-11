"use strict";
/** Class du manager de l'application. */
class ScreenStoreCheck3 extends AbstractScreen{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType) {
		super(pType);
		this._btNext=null;
        this._input=null;

        this._champ4=null;
        this._champ5=null;
        this._champ11=null;

        this._infoLogo=null;
        this._infoTime=null;
        this._infoVille=null;
    }

    init(){
        super.init();
        this._btNext=new SimpleButton($("#screen-store-check-check-3_bt-next"), this.btNextUpHandler);
        this._input=$("input");
        this._input.on("keyup", this.inputChangeHandler);
        this._input.parent().css("opacity", "0.5");

        this._champ4=$("#screen-store-check-3_question_input-bbq");
        this._champ5=$("#screen-store-check-3_question_input-bbq-weber");
        this._champ11=$("#screen-store-check-3_question_input-metres");

        var sc=main.sessionManager.newSC;
        if(sc.rapport.hasOwnProperty("champ4") && sc.rapport.champ4!=""){
            this._champ4.val(sc.rapport.champ4);
            this._champ4.parent().css("opacity", "1");
        }
        if(sc.rapport.hasOwnProperty("champ5") && sc.rapport.champ5!=""){
            this._champ5.val(sc.rapport.champ5);
            this._champ5.parent().css("opacity", "1");
        }
        if(sc.rapport.hasOwnProperty("champ11") && sc.rapport.champ11!=""){
            this._champ11.val(sc.rapport.champ11);
            this._champ11.parent().css("opacity", "1");
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

    inputChangeHandler(e){
        if($(this).val()==""){
            $(this).parent().css("opacity", "0.5");
        }else{
            $(this).parent().css("opacity", "1");
        }
    }

    btNextUpHandler(e){
        main.screenManager.currentScreen.storeResponse();
        
        if(main.sessionManager.editSC==false){
            main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CHECK_4);
        }else{
            main.sessionManager.editSC=false;
            main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_SEND);
        }
    }

    storeResponse(){
        var sc=main.sessionManager.newSC;
        if(this._champ4.val()!=""){
            sc.rapport.champ4=this._champ4.val();
        }else{
            delete sc.rapport.champ4;
        }
        if(this._champ5.val()!=""){
            sc.rapport.champ5=this._champ5.val();
        }else{
            delete sc.rapport.champ5;
        }
        if(this._champ11.val()!=""){
            sc.rapport.champ11=this._champ11.val();
        }else{
            delete sc.rapport.champ11;
        }
    }

    removeScreen(){
        super.removeScreen();
    }
}