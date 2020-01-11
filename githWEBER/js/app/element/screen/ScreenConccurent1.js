"use strict";
/** Class du manager de l'application. */
class ScreenConccurent1 extends AbstractScreen{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType) {
		super(pType);
		this._btNext=null;
        this._input=$("input");

        this._bbq1=null;
        this._bbq2=null;
        this._bbq3=null;

        this._infoLogo=null;
        this._infoTime=null;
        this._infoVille=null;
    }

    init(){
    	super.init();
    	this._btNext=new SimpleButton($("#screen-store-check-concurrents-1_bt-next"), this.btNextUpHandler);
        this._input=$(".values-2 input");
        this._input.on("keyup", this.inputChangeHandler);
        this._input.parent().css("opacity", "0.5");
        this._input.parent().parent().find(".screen-store-concurrents-1_question_values").css("opacity", "0.5");

        this._bbq1=$('#bbq1');
        this._bbq2=$('#bbq2');
        this._bbq3=$('#bbq3');

        $(".values-select select").empty()

        for(var i=0; i<main.sessionManager.concurrentBBQ.length;i++){
            $(".values-select select").append('<option value="'+main.sessionManager.concurrentBBQ[i].id+'">'+main.sessionManager.concurrentBBQ[i].nom.toUpperCase()+'</option>');
        }

        var sc=main.sessionManager.newSC;
        if(sc.rapport.hasOwnProperty("bbq1")){
            if(sc.rapport.bbq1.hasOwnProperty("nom") && sc.rapport.bbq1.nom!=""){
                this._bbq1.find("option").prop("selected",false);
                this._bbq1.find("option[value='"+sc.rapport.bbq1.nom+"']").prop("selected",true);
            }
            if(sc.rapport.bbq1.hasOwnProperty("valeur") && sc.rapport.bbq1.valeur!=""){
                this._bbq1.find("input").val(parseInt(sc.rapport.bbq1.valeur));
                this._bbq1.find("input").parent().css("opacity", "1");
                this._bbq1.find("input").parent().parent().find(".screen-store-concurrents-1_question_values").css("opacity", "1");
            }
        }
        if(sc.rapport.hasOwnProperty("bbq2")){
            if(sc.rapport.bbq2.hasOwnProperty("nom") && sc.rapport.bbq2.nom!=""){
                this._bbq2.find("option").prop("selected",false);
                this._bbq2.find("option[value='"+sc.rapport.bbq2.nom+"']").prop("selected",true);
            }
            if(sc.rapport.bbq2.hasOwnProperty("valeur") && sc.rapport.bbq2.valeur!=""){
                this._bbq2.find("input").val(parseInt(sc.rapport.bbq2.valeur));
                this._bbq2.find("input").parent().css("opacity", "1");
                this._bbq2.find("input").parent().parent().find(".screen-store-concurrents-1_question_values").css("opacity", "1");
            }
        }
        if(sc.rapport.hasOwnProperty("bbq3")){
            if(sc.rapport.bbq3.hasOwnProperty("nom") && sc.rapport.bbq3.nom!=""){
                this._bbq3.find("option").prop("selected",false);
                this._bbq3.find("option[value='"+sc.rapport.bbq3.nom+"']").prop("selected",true);
            }
            if(sc.rapport.bbq3.hasOwnProperty("valeur") && sc.rapport.bbq3.valeur!=""){
                this._bbq3.find("input").val(parseInt(sc.rapport.bbq3.valeur));
                this._bbq3.find("input").parent().css("opacity", "1");
                this._bbq3.find("input").parent().parent().find(".screen-store-concurrents-1_question_values").css("opacity", "1");
            }
        }
        /*if(sc.rapport.hasOwnProperty("bbq") && sc.rapport.bbq.length>0){
            if(sc.rapport.bbq[0].hasOwnProperty("nom") && sc.rapport.bbq[0].nom!=""){
                this._bbq3.find(".values-input").find("input").val(sc.rapport.bbq[0].nom);
            }
            if(sc.rapport.bbq[0].hasOwnProperty("valeur") && sc.rapport.bbq[0].valeur!=""){
                this._bbq3.find(".values-2").find("input").val(parseInt(sc.rapport.bbq[0].valeur));
            }

            if(sc.rapport.bbq[0].hasOwnProperty("nom") && sc.rapport.bbq[0].nom!="" && sc.rapport.bbq[0].hasOwnProperty("valeur") && sc.rapport.bbq[0].valeur!=""){
                this._bbq3.find(".values-input").find("input").parent().css("opacity", "1");
                this._bbq3.find(".values-input").find("input").parent().parent().find(".screen-store-concurrents-1_question_values").css("opacity", "1");
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
            $(this).parent().parent().find(".screen-store-concurrents-1_question_values").css("opacity", "0.5");
        }else{
            $(this).parent().css("opacity", "1");
            $(this).parent().parent().find(".screen-store-concurrents-1_question_values").css("opacity", "1");
        }
    }

    btNextUpHandler(e){
        main.screenManager.currentScreen.storeResponse();
        
        if(main.sessionManager.editSC==false){
            main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CONCURRENT_2);
        }else{
            main.sessionManager.editSC=false;
            main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_SEND);
        }
    }

    storeResponse(){
        var sc=main.sessionManager.newSC;
        if(this._bbq1.find("input").val()!=""){
            sc.rapport.bbq1={};
            sc.rapport.bbq1.nom=this._bbq1.find("option:selected").val();
            sc.rapport.bbq1.valeur=this._bbq1.find("input").val().toString();
        }else{
            delete sc.rapport.bbq1;
        }
        if(this._bbq2.find("input").val()!=""){
            sc.rapport.bbq2={};
            sc.rapport.bbq2.nom=this._bbq2.find("option:selected").val();
            sc.rapport.bbq2.valeur=this._bbq2.find("input").val().toString();
        }else{
            delete sc.rapport.bbq2;
        }
        if(this._bbq3.find("input").val()!=""){
            sc.rapport.bbq3={};
            sc.rapport.bbq3.nom=this._bbq3.find("option:selected").val();
            sc.rapport.bbq3.valeur=this._bbq3.find("input").val().toString();
        }else{
            delete sc.rapport.bbq3;
        }
        /*if(this._bbq3.find(".values-input").find("input").val()!="" && this._bbq3.find(".values-2").find("input").val()!=""){
            sc.rapport.bbq=[{"nom":this._bbq3.find(".values-input").find("input").val().toString(),"valeur":this._bbq3.find(".values-2").find("input").val().toString()}];
        }else{
            delete sc.rapport.bbq;
        }*/
    }

    removeScreen(){
    	super.removeScreen();
    }
}