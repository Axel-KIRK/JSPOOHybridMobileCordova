"use strict";
/** Class du manager de l'application. */
class ScreenStoreCheck4 extends AbstractScreen{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType) {
		super(pType);
		this._btNext=null;
        this._input=null;

        this._champ6=null;
        this._champ7=null;
        this._champ8=null;
        this._champ9=null;
        this._champ10=null;

        this._infoLogo=null;
        this._infoTime=null;
        this._infoVille=null;
    }

    init(){
        super.init();
        this._btNext=new SimpleButton($("#screen-store-check-check-4_bt-next"), this.btNextUpHandler);
        this._input=$("input");
        this._input.on("keyup", this.inputChangeHandler);
        this._input.parent().css("opacity", "0.5");

        this._champ6=$("#champ6");
        this._champ7=$("#champ7");
        this._champ8=$("#champ8");
        this._champ9=$("#champ9");
        this._champ10=$("#champ10");

        var sc=main.sessionManager.newSC;
        if(sc.rapport.hasOwnProperty("champ6") && sc.rapport.champ6!=""){
            this._champ6.val(sc.rapport.champ6);
            this._champ6.parent().css("opacity", "1");
        }
        if(sc.rapport.hasOwnProperty("champ7") && sc.rapport.champ7!=""){
            this._champ7.val(sc.rapport.champ7);
            this._champ7.parent().css("opacity", "1");
        }
        if(sc.rapport.hasOwnProperty("champ8") && sc.rapport.champ8!=""){
            this._champ8.val(sc.rapport.champ8);
            this._champ8.parent().css("opacity", "1");
        }
        if(sc.rapport.hasOwnProperty("champ9") && sc.rapport.champ9!=""){
            this._champ9.val(sc.rapport.champ9);
            this._champ9.parent().css("opacity", "1");
        }
        if(sc.rapport.hasOwnProperty("champ10") && sc.rapport.champ10!=""){
            this._champ10.val(sc.rapport.champ10);
            this._champ10.parent().css("opacity", "1");
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
            main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CHECK_5);
        }else{
            main.sessionManager.editSC=false;
            main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_SEND);
        }
    }

    storeResponse(){
        var sc=main.sessionManager.newSC;
        if(this._champ6.val()!=""){
            sc.rapport.champ6=this._champ6.val();
        }else{
            delete sc.rapport.champ6;
        }
        if(this._champ7.val()!=""){
            sc.rapport.champ7=this._champ7.val();
        }else{
            delete sc.rapport.champ7;
        }
        if(this._champ8.val()!=""){
            sc.rapport.champ8=this._champ8.val();
        }else{
            delete sc.rapport.champ8;
        }
        if(this._champ9.val()!=""){
            sc.rapport.champ9=this._champ9.val();
        }else{
            delete sc.rapport.champ9;
        }
        if(this._champ10.val()!=""){
            sc.rapport.champ10=this._champ10.val();
        }else{
            delete sc.rapport.champ10;
        }
    }

    removeScreen(){
        super.removeScreen();
    }
}