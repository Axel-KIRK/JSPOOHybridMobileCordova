"use strict";
/** Class du manager de l'application. */
class ScreenConccurent2 extends AbstractScreen{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType) {
		super(pType);
		this._btNext=null;
        this._input=null;

        this._plancha1=null;
        this._plancha2=null;
        this._plancha3=null;

        this._infoLogo=null;
        this._infoTime=null;
        this._infoVille=null;
    }

    init(){
    	super.init();
    	this._btNext=new SimpleButton($("#screen-store-check-concurrents-2_bt-next"), this.btNextUpHandler);
        this._input=$(".values-2 input");
        this._input.on("keyup", this.inputChangeHandler);
        this._input.parent().css("opacity", "0.5");
        this._input.parent().parent().find(".screen-store-concurrents-2_question_values").css("opacity", "0.5");

        this._plancha1=$('#plancha1');
        this._plancha2=$('#plancha2');
        this._plancha3=$('#plancha3');

        $(".values-select select").empty()

        for(var i=0; i<main.sessionManager.concurrentPlancha.length;i++){
            $(".values-select select").append('<option value="'+main.sessionManager.concurrentPlancha[i].id+'">'+main.sessionManager.concurrentPlancha[i].nom.toUpperCase()+'</option>');
        }

        var sc=main.sessionManager.newSC;
        if(sc.rapport.hasOwnProperty("plancha1")){
            if(sc.rapport.plancha1.hasOwnProperty("nom") && sc.rapport.plancha1.nom!=""){
                this._plancha1.find("option").prop("selected",false);
                this._plancha1.find("option[value='"+sc.rapport.plancha1.nom+"']").prop("selected",true);
            }
            if(sc.rapport.plancha1.hasOwnProperty("valeur") && sc.rapport.plancha1.valeur!=""){
                this._plancha1.find("input").val(parseInt(sc.rapport.plancha1.valeur));
                this._plancha1.find("input").parent().css("opacity", "1");
                this._plancha1.find("input").parent().parent().find(".screen-store-concurrents-2_question_values").css("opacity", "1");
            }
        }
        if(sc.rapport.hasOwnProperty("plancha2")){
            if(sc.rapport.plancha2.hasOwnProperty("nom") && sc.rapport.plancha2.nom!=""){
                this._plancha2.find("option").prop("selected",false);
                this._plancha2.find("option[value='"+sc.rapport.plancha2.nom+"']").prop("selected",true);
            }
            if(sc.rapport.plancha2.hasOwnProperty("valeur") && sc.rapport.plancha2.valeur!=""){
                this._plancha2.find("input").val(parseInt(sc.rapport.plancha2.valeur));
                this._plancha2.find("input").parent().css("opacity", "1");
                this._plancha2.find("input").parent().parent().find(".screen-store-concurrents-2_question_values").css("opacity", "1");
            }
        }
        if(sc.rapport.hasOwnProperty("plancha3")){
            if(sc.rapport.plancha3.hasOwnProperty("nom") && sc.rapport.plancha3.nom!=""){
                this._plancha3.find("option").prop("selected",false);
                this._plancha3.find("option[value='"+sc.rapport.plancha3.nom+"']").prop("selected",true);
            }
            if(sc.rapport.plancha3.hasOwnProperty("valeur") && sc.rapport.plancha3.valeur!=""){
                this._plancha3.find("input").val(parseInt(sc.rapport.plancha3.valeur));
                this._plancha3.find("input").parent().css("opacity", "1");
                this._plancha3.find("input").parent().parent().find(".screen-store-concurrents-2_question_values").css("opacity", "1");
            }
        }
        /*if(sc.rapport.hasOwnProperty("plancha") && sc.rapport.plancha.length>0){
            if(sc.rapport.plancha[0].hasOwnProperty("nom") && sc.rapport.plancha[0].nom!=""){
                this._plancha3.find(".values-input").find("input").val(sc.rapport.plancha[0].nom);
            }
            if(sc.rapport.plancha[0].hasOwnProperty("valeur") && sc.rapport.plancha[0].valeur!=""){
                this._plancha3.find(".values-2").find("input").val(parseInt(sc.rapport.plancha[0].valeur));
            }

            if(sc.rapport.plancha[0].hasOwnProperty("nom") && sc.rapport.plancha[0].nom!="" && sc.rapport.plancha[0].hasOwnProperty("valeur") && sc.rapport.plancha[0].valeur!=""){
                this._plancha3.find(".values-input").find("input").parent().css("opacity", "1");
                this._plancha3.find(".values-input").find("input").parent().parent().find(".screen-store-concurrents-2_question_values").css("opacity", "1");
            }
        }*/

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
            $(this).parent().parent().find(".screen-store-concurrents-2_question_values").css("opacity", "0.5");
        }else{
            $(this).parent().css("opacity", "1");
            $(this).parent().parent().find(".screen-store-concurrents-2_question_values").css("opacity", "1");
        }
    }

    btNextUpHandler(e){
        main.screenManager.currentScreen.storeResponse();
        if(main.sessionManager.editSC==false){
            main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_PHOTO);
        }else{
            main.sessionManager.editSC=false;
            main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_SEND);
        }
    }

    storeResponse(){
        var sc=main.sessionManager.newSC;
        if(this._plancha1.find("input").val()!=""){
            sc.rapport.plancha1={};
            sc.rapport.plancha1.nom=this._plancha1.find("option:selected").val();
            sc.rapport.plancha1.valeur=this._plancha1.find("input").val().toString();
        }else{
            delete sc.rapport.plancha1;
        }
        if(this._plancha2.find("input").val()!=""){
            sc.rapport.plancha2={};
            sc.rapport.plancha2.nom=this._plancha2.find("option:selected").val();
            sc.rapport.plancha2.valeur=this._plancha2.find("input").val().toString();
        }else{
            delete sc.rapport.plancha2;
        }
        if(this._plancha3.find("input").val()!=""){
            sc.rapport.plancha3={};
            sc.rapport.plancha3.nom=this._plancha3.find("option:selected").val();
            sc.rapport.plancha3.valeur=this._plancha3.find("input").val().toString();
        }else{
            delete sc.rapport.plancha3;
        }

        /*if(this._plancha3.find(".values-input").find("input").val()!="" && this._plancha3.find(".values-2").find("input").val()!=""){
            sc.rapport.plancha=[{"nom":this._plancha3.find(".values-input").find("input").val().toString(),"valeur":this._plancha3.find(".values-2").find("input").val().toString()}];
        }else{
            delete sc.rapport.plancha;
        }*/
    }

    removeScreen(){
    	super.removeScreen();
    }
}