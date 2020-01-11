"use strict";
/** Class du manager de l'application. */
class ScreenComment extends AbstractScreen{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType) {
		super(pType);
		this._btValidate=null;
        this._champ1=null;

        this._infoLogo=null;
        this._infoTime=null;
        this._infoVille=null;
    }

    init(){
    	super.init();
    	this._btValidate=new SimpleButton($("#screen-store-comment_bt-validate"), this.btValidateUpHandler);

        this._champ1=$("#screen-store-comment_textarea");

        var sc=main.sessionManager.newSC;
        if(sc.rapport.hasOwnProperty("champ1") && sc.rapport.champ1!=""){
            this._champ1.val(sc.rapport.champ1);
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
            this._btValidate.element.html("RETOUR");
        }
    }

    btValidateUpHandler(e){
        main.screenManager.currentScreen.storeResponse();
        main.sessionManager.editSC=false;
        main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_SEND);
    }

    storeResponse(){
        var sc=main.sessionManager.newSC;
        if(this._champ1.val()!=""){
            sc.rapport.champ1=this._champ1.val();
        }else{
            delete sc.rapport.champ1;
        }
    }

    removeScreen(){
    	super.removeScreen();
    }
}