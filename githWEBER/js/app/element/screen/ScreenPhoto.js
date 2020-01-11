"use strict";
/** Class du manager de l'application. */
class ScreenPhoto extends AbstractScreen{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType) {
		super(pType);
		this._btShoot=null;

        this._infoLogo=null;
        this._infoTime=null;
        this._infoVille=null;
    }

    init(){
    	super.init();
    	this._btShoot=new SimpleButton($("#screen-store-photo_icone-photo"), this.btShootUpHandler)

        var pdv=main.sessionManager.currentPDV;
        var scc=main.sessionManager.currentSC;
        this._infoLogo=$("#screen-store-photo_logo");
        this._infoTime=$("#screen-store_text-update");
        this._infoVille=$("#screen-store-photo_ville");
        this._infoTime.html("NA");
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
    }

    btShootUpHandler(e){
        if(main.sessionManager.scPhoto.length==0){
            main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_SHOOT);
        }else{
            main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_GALLERY);
        }
    }

    removeScreen(){
    	super.removeScreen();
    }
}