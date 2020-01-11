"use strict";
/** Class du manager de l'application. */
class ScreenStoreCheck2 extends AbstractScreen{
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

        this._btNext=new SimpleButton($("#screen-store-check-check-2_bt-next"), this.btNextUpHandler);
        this._selectElement=$(".screen-store-check-2_question_element");
        this._selectElement.on(main.eventManager.EVENT_DOWN, this.selectElementDownHandler);

        var sc=main.sessionManager.newSC;
        if(sc.rapport.hasOwnProperty("champ3") && sc.rapport.champ3!=""){
            this._selectElement.eq(parseInt(sc.rapport.champ3)).css("opacity","1");
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

    get selectElement(){
        return this._selectElement;
    }

    selectElementDownHandler(e){
        main.screenManager.currentScreen.selectElement.css("opacity","0.5");
        $(this).css("opacity","1");
    }

    btNextUpHandler(e){
        main.screenManager.currentScreen.storeResponse();
        
        if(main.sessionManager.editSC==false){
            main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CHECK_3);
        }else{
            main.sessionManager.editSC=false;
            main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_SEND);
        }
    }

    storeResponse(){
        var sc=main.sessionManager.newSC;
        this._selectElement.each(function(index){
            if($(this).css("opacity")=="1"){
                sc.rapport.champ3=index.toString();
            }
        })
    }

    removeScreen(){
        super.removeScreen();
        this._selectElement.off(main.eventManager.EVENT_DOWN, this.selectElementDownHandler);
    }
}