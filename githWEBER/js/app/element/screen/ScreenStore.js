"use strict";
/** Class du manager de l'application. */
class ScreenStore extends AbstractScreen{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType) {
		super(pType);
		this._btContactUpdate=null;
        this._btUpdate=null;
        this._btCheck=null;
        this._btConcurrent=null;
        this._blocCheck=null;
        this._blocConcurrent=null;

        this._infoLogo=null;
        this._infoAddress=null;
        this._infoTime=null;
        this._infoVille=null;
        this._champ1=null;
        this._champ2=null;
        this._champ3=null;
        this._champ4=null;
        this._champ5=null;
        this._champ6=null;
        this._champ7=null;
        this._champ8=null;
        this._champ9=null;
        this._champ10=null;
        this._champ11=null;
        this._champ12=null;
        this._champ13=null;
        this._champ14=null;
        this._champ15=null;
        this._champ16=null;
        this._champ17=null;
        this._champImage=null;

        this._gps=null;
        this._btUpdateGps=null;
    }

    init(){
    	super.init();

        var pdv=main.sessionManager.currentPDV;
        var sc=main.sessionManager.currentSC;
  
        this._infoLogo=$("#screen-store_logo");
        this._infoAddress=$("#screen-store_contact_value");
        this._infoTime=$("#screen-store_text-update");
        this._infoVille=$("#screen-store_ville");
        this._champImage=$("#champImage");
        this._champ1=$("#champ1");
        this._champ2=$("#champ2");
        this._champ3=$("#champ3");
        this._champ4=$("#champ4");
        this._champ5=$("#champ5");
        this._champ6=$("#champ6");
        this._champ7=$("#champ7");
        this._champ8=$("#champ8");
        this._champ9=$("#champ9");
        this._champ10=$("#champ10");
        this._champ11=$("#champ11");
        this._champ12=$("#champ12");
        this._champ13=$("#champ13");
        this._champ14=$("#champ14");
        this._champ15=$("#champ15");
        this._champ16=$("#champ16");
        this._champ17=$("#champ17");
        this._gps=$("#gps_value");

        if(pdv.latitude!=0 && pdv.longitude!=0){
            this._gps.html("Lat : "+parseFloat(pdv.latitude).toFixed(4)+", Lng : "+parseFloat(pdv.longitude).toFixed(4));
        }else{
            this._gps.html("NA");
            this._gps.addClass("red");
        }

        this._infoLogo.html('<img src="'+cordova.file.dataDirectory+UpdateManager.FOLDER_DISTRIBUTEUR+'/'+pdv.picto+'" />');
        if(pdv.hasOwnProperty("adresse") && pdv.adresse!="" && pdv.hasOwnProperty("cp") && pdv.cp!="" && pdv.hasOwnProperty("ville") && pdv.ville!=""){
            this._infoAddress.html(pdv.adresse+"<br />"+pdv.cp+" "+pdv.ville);
        }else{
            this._infoAddress.html("&nbsp;<br />&nbsp;");
        }
        if(pdv.hasOwnProperty("ville") && pdv.ville!=""){
            this._infoVille.html(pdv.ville.toUpperCase());
        }else{
            this._infoVille.html("&nbsp;");
        }
        if(sc=='nothing'){
            this._infoTime.html("NA");
            this._champ1.html("NA");
            this._champ2.html("NA");
            this._champ3.html("NA");
            this._champ4.html("NA");
            this._champ5.html("NA");
            this._champ6.html("NA");
            this._champ7.html("NA");
            this._champ8.html("NA");
            this._champ9.html("NA");
            this._champ10.html("NA");
            this._champ11.html("NA");
            this._champ12.html("NA");
            this._champ13.html("NA");
            this._champ14.html("NA");
            this._champ15.html("NA");
            this._champ16.html("NA");
            this._champ17.html("NA");

            this._champ3.removeClass("greenBorder").addClass("red");
            this._champ12.removeClass("greenBorder").addClass("red");
            this._champ14.removeClass("greenBorder").addClass("red");
            this._champ15.removeClass("greenBorder").addClass("red");
            this._champ16.removeClass("greenBorder").addClass("red");
            this._champ17.removeClass("greenBorder").addClass("red");
            this._champ17.parent(".screen-store_bloc-check_reponse").remove();

            this._champImage.empty();

            $(".champBBQ").remove();
            $(".champPlancha").remove();
        }else{
            var jour=["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
            var mois=["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"];
            var dateUpdate=new Date(sc.timestamp*1000);
            this._infoTime.html("Mises à jour le "+jour[dateUpdate.getDay()]+" "+dateUpdate.getDate()+" "+mois[dateUpdate.getMonth()]+" "+dateUpdate.getFullYear()+" à "+dateUpdate.getHours()+"h"+dateUpdate.getMinutes()+" par "+sc.prenom+" "+sc.nom);

            if(sc.rapport.hasOwnProperty("champ1") && sc.rapport.champ1!=""){
                this._champ1.html(sc.rapport.champ1);
            }else{
                this._champ1.html("NA");
            }

            if(sc.rapport.hasOwnProperty("champ2") && sc.rapport.champ2!=""){
                switch(parseInt(sc.rapport.champ2)){
                    case 0:
                        this._champ2.html("PARTNER");
                    break;
                    case 1:
                        this._champ2.html("PREMIUM");
                    break;
                    case 2:
                        this._champ2.html("PREMIUM PLUS");
                    break;
                    case 3:
                        this._champ2.html("PREMIUM WORLD");
                    break;
                    case 4:
                        this._champ2.html("PREMIUM EXPERIENCE");
                    break;
                }
            }else{
                this._champ2.html("NA");
            }

            if(sc.rapport.hasOwnProperty("champ3") && sc.rapport.champ3!=""){
                this._champ3.removeClass("greenBorder");
                this._champ3.removeClass("orangeBorder");
                this._champ3.removeClass("redBorder");
                switch(parseInt(sc.rapport.champ3)){
                    case 0:
                        this._champ3.html("BIEN");
                        this._champ3.addClass("greenBorder");
                    break;
                    case 1:
                        this._champ3.html("MOYEN");
                        this._champ3.addClass("orangeBorder");
                    break;
                    case 2:
                        this._champ3.html("MÉDIOCRE");
                        this._champ3.addClass("redBorder");
                    break;
                }
            }else{
                this._champ3.html("NA");
                this._champ3.removeClass("greenBorder").addClass("red");
            }

            if(sc.rapport.hasOwnProperty("champ4") && sc.rapport.champ4!=""){
                this._champ4.html(sc.rapport.champ4+"m²");
            }else{
                this._champ4.html("NA");
            }

            if(sc.rapport.hasOwnProperty("champ5") && sc.rapport.champ5!=""){
                this._champ5.html(sc.rapport.champ5+"m²");
            }else{
                this._champ5.html("NA");
            }

            if(sc.rapport.hasOwnProperty("champ6") && sc.rapport.champ6!=""){
                this._champ6.html(sc.rapport.champ6);
            }else{
                this._champ6.html("NA");
            }

            if(sc.rapport.hasOwnProperty("champ7") && sc.rapport.champ7!=""){
                this._champ7.html(sc.rapport.champ7);
            }else{
                this._champ7.html("NA");
            }

            if(sc.rapport.hasOwnProperty("champ8") && sc.rapport.champ8!=""){
                this._champ8.html(sc.rapport.champ8);
            }else{
                this._champ8.html("NA");
            }

            if(sc.rapport.hasOwnProperty("champ9") && sc.rapport.champ9!=""){
                this._champ9.html(sc.rapport.champ9);
            }else{
                this._champ9.html("NA");
            }

            if(sc.rapport.hasOwnProperty("champ10") && sc.rapport.champ10!=""){
                this._champ10.html(sc.rapport.champ10);
            }else{
                this._champ10.html("NA");
            }

            if(sc.rapport.hasOwnProperty("champ11") && sc.rapport.champ11!=""){
                this._champ11.html(sc.rapport.champ11+"m");
            }else{
                this._champ11.html("NA");
            }

            if(sc.rapport.hasOwnProperty("champ12") && sc.rapport.champ12!=""){
                this._champ12.removeClass("greenBorder");
                this._champ12.removeClass("redBorder");
                switch(parseInt(sc.rapport.champ12)){
                    case 0:
                        this._champ12.html("OUI");
                        this._champ12.addClass("greenBorder");
                    break;
                    case 1:
                        this._champ12.html("NON");
                        this._champ12.addClass("redBorder");
                    break;
                }
            }else{
                this._champ12.html("NA");
                this._champ12.removeClass("greenBorder").addClass("red");
            }

            if(sc.rapport.hasOwnProperty("champ13") && sc.rapport.champ13!=""){
                this._champ13.html(sc.rapport.champ13);
            }else{
                this._champ13.html("NA");
            }

            if(sc.rapport.hasOwnProperty("champ14") && sc.rapport.champ14!=""){
                this._champ14.removeClass("greenBorder");
                this._champ14.removeClass("redBorder");
                switch(parseInt(sc.rapport.champ14)){
                    case 0:
                        this._champ14.html("OUI");
                        this._champ14.addClass("greenBorder");
                    break;
                    case 1:
                        this._champ14.html("NON");
                        this._champ14.addClass("redBorder");
                    break;
                }
            }else{
                this._champ14.html("NA");
                this._champ14.removeClass("greenBorder").addClass("red");
            }

            if(sc.rapport.hasOwnProperty("champ15") && sc.rapport.champ15!=""){
                this._champ15.removeClass("greenBorder");
                this._champ15.removeClass("redBorder");
                switch(parseInt(sc.rapport.champ15)){
                    case 0:
                        this._champ15.html("OUI");
                        this._champ15.addClass("greenBorder");
                    break;
                    case 1:
                        this._champ15.html("NON");
                        this._champ15.addClass("redBorder");
                    break;
                }
            }else{
                this._champ15.html("NA");
                this._champ15.removeClass("greenBorder").addClass("red");
            }

            if(sc.rapport.hasOwnProperty("champ16") && sc.rapport.champ16!=""){
                this._champ16.removeClass("greenBorder");
                this._champ16.removeClass("redBorder");
                switch(parseInt(sc.rapport.champ16)){
                    case 0:
                        this._champ16.html("OUI");
                        this._champ16.addClass("greenBorder");
                    break;
                    case 1:
                        this._champ16.html("NON");
                        this._champ16.addClass("redBorder");
                        this._champ17.parent(".screen-store_bloc-check_reponse").remove();
                    break;
                }
            }else{
                this._champ16.html("NA");
                this._champ16.removeClass("greenBorder").addClass("red");
                this._champ17.parent(".screen-store_bloc-check_reponse").remove();
            }

            if(sc.rapport.hasOwnProperty("champ17") && sc.rapport.champ17!=""){
                this._champ17.removeClass("greenBorder");
                this._champ17.removeClass("redBorder");
                switch(parseInt(sc.rapport.champ17)){
                    case 0:
                        this._champ17.html("20");
                        this._champ17.addClass("greenBorder");
                    break;
                    case 1:
                        this._champ17.html("50");
                        this._champ17.addClass("greenBorder");
                    break;
                    case 2:
                        this._champ17.html("100");
                        this._champ17.addClass("redBorder");
                    break;
                }
            }else{
                this._champ17.html("NA");
                this._champ17.removeClass("greenBorder").addClass("red");
            }

            if(sc.rapport.hasOwnProperty("photos") && sc.rapport.photos.length>0){
                this._champImage.empty();
                for(var i=0; i<sc.rapport.photos.length; i++){
                    if(sc.rapport.photos[i].split("my_folder").length>1){
                        this._champImage.append('<div class="photo-shoot"><img src="'+cordova.file.dataDirectory.replace("NoCloud", "files")+sc.rapport.photos[i].substr(1, sc.rapport.photos[i].length)+'" /></div>');
                    }else{
                        this._champImage.append('<div class="photo-shoot"><img src="'+AppConfiguration.SERVER_URL+'/app/photos/'+sc.rapport.photos[i]+'" /></div>');
                    }
                    
                }
            }else{
                this._champImage.empty();
            }


            $("#screen-store_bloc-concurrents").empty();
            var nc;
            var k;
            $("#screen-store_bloc-concurrents").append('<div class="screen-store_bloc-check_title">BBQ</div>');
            if(sc.rapport.hasOwnProperty("bbq1") && sc.rapport.bbq1!=""){
                for(var k=0; k<main.sessionManager.concurrentBBQ.length;k++){
                    if(parseInt(main.sessionManager.concurrentBBQ[k].id)==parseInt(sc.rapport.bbq1.nom)){
                        nc=main.sessionManager.concurrentBBQ[k].nom;
                        break;
                    }
                }
                $("#screen-store_bloc-concurrents").append('<div class="screen-store_bloc-check_reponse champBBQ">'+nc+'<div class="screen-store_bloc-check_reponse_double red">'+sc.rapport.bbq1.valeur+'</div></div>');
            }
            if(sc.rapport.hasOwnProperty("bbq2") && sc.rapport.bbq2!=""){
                for(var k=0; k<main.sessionManager.concurrentBBQ.length;k++){
                    if(parseInt(main.sessionManager.concurrentBBQ[k].id)==parseInt(sc.rapport.bbq2.nom)){
                        nc=main.sessionManager.concurrentBBQ[k].nom;
                        break;
                    }
                }
                $("#screen-store_bloc-concurrents").append('<div class="screen-store_bloc-check_reponse champBBQ">'+nc+'<div class="screen-store_bloc-check_reponse_double red">'+sc.rapport.bbq2.valeur+'</div></div>');
            }
            if(sc.rapport.hasOwnProperty("bbq") && sc.rapport.bbq.length>0){
                for(i=0; i<sc.rapport.bbq.length; i++){
                    $("#screen-store_bloc-concurrents").append('<div class="screen-store_bloc-check_reponse champBBQ">'+sc.rapport.bbq[i].nom.toUpperCase()+'<div class="screen-store_bloc-check_reponse_double red">'+sc.rapport.bbq[i].valeur+'</div></div>');
                }
            }
            $("#screen-store_bloc-concurrents").append('<div class="screen-store_bloc-check_title">PLANCHA</div>');
            if(sc.rapport.hasOwnProperty("plancha1") && sc.rapport.plancha1!=""){
                for(var k=0; k<main.sessionManager.concurrentPlancha.length;k++){
                    if(parseInt(main.sessionManager.concurrentPlancha[k].id)==parseInt(sc.rapport.plancha1.nom)){
                        nc=main.sessionManager.concurrentPlancha[k].nom;
                        break;
                    }
                }
                $("#screen-store_bloc-concurrents").append('<div class="screen-store_bloc-check_reponse champPlancha">'+nc+'<div class="screen-store_bloc-check_reponse_double red">'+sc.rapport.plancha1.valeur+'</div></div>');
            }
            if(sc.rapport.hasOwnProperty("plancha2") && sc.rapport.plancha2!=""){
                for(var k=0; k<main.sessionManager.concurrentPlancha.length;k++){
                    if(parseInt(main.sessionManager.concurrentPlancha[k].id)==parseInt(sc.rapport.plancha2.nom)){
                        nc=main.sessionManager.concurrentPlancha[k].nom;
                        break;
                    }
                }
                $("#screen-store_bloc-concurrents").append('<div class="screen-store_bloc-check_reponse champPlancha">'+nc+'<div class="screen-store_bloc-check_reponse_double red">'+sc.rapport.plancha2.valeur+'</div></div>');
            }
            if(sc.rapport.hasOwnProperty("plancha") && sc.rapport.plancha.length>0){
                for(i=0; i<sc.rapport.plancha.length; i++){
                    $("#screen-store_bloc-concurrents").append('<div class="screen-store_bloc-check_reponse champPlancha">'+sc.rapport.plancha[i].nom.toUpperCase()+'<div class="screen-store_bloc-check_reponse_double red">'+sc.rapport.plancha[i].valeur+'</div></div>');
                }
            }
        }
        

    	this._btContactUpdate=new SimpleButton($("#screen-store_contact_bt-update"), this.btContactUpdateUpHandler);
        this._btUpdate=new SimpleButton($("#screen-store_bt-update"), this.btUpdateUpHandler);
        this._btUpdateGps=new SimpleButton($("#screen-store_coordonne_bt-update"), this.btUpdateGPSUpHandler);
        //this._btCheck=new SimpleButton($("#screen-store_bt-check"), this.btBlocUpHandler);
        //this._btConcurrent=new SimpleButton($("#screen-store_bt-concurrents"), this.btBlocUpHandler);
        this._blocCheck=$("#screen-store_bloc-check");
        this._blocConcurrent=$("#screen-store_bloc-concurrents");
        this._blocConcurrent.data("maxheight",this._blocConcurrent.height())
        //this._blocConcurrent.css("height",0);
        this._blocConcurrent.css("height",this._blocConcurrent.data("maxheight"))

        var numLoadedImage=0;
        $(".screen-store_bloc-check_reponse img").on("load",function(){ 
            numLoadedImage++;
            if(numLoadedImage==$(".screen-store_bloc-check_reponse img").length){
                main.screenManager.currentScreen.blocCheck.data("maxheight",main.screenManager.currentScreen.blocCheck.height())
                //main.screenManager.currentScreen.blocCheck.css("height",0);
                main.screenManager.currentScreen.blocCheck.css("height",main.screenManager.currentScreen.blocCheck.data("maxheight"))
            }
      })
    }

    get blocCheck(){
        return this._blocCheck;
    }

    btBlocUpHandler(e){
        main.screenManager.currentScreen.openCloseBloc($(this).attr("id"));
    }

    openCloseBloc(pID){
        if(pID=="screen-store_bt-check"){
            /*if(this._blocCheck.hasClass("close")){
                this._blocCheck.removeClass("close");
            }else{
                this._blocCheck.addClass("close");
            }*/
            if(this._blocCheck.css("opacity")=="1"){
                this._blocCheck.css("height","0px")
                this._blocCheck.css("opacity","0")
            }else{
                this._blocCheck.css("height",this._blocCheck.data("maxheight"))
                this._blocCheck.css("opacity","1")
            }
        }else if(pID=="screen-store_bt-concurrents"){
            /*if(this._blocConcurrent.hasClass("close")){
                this._blocConcurrent.removeClass("close");
            }else{
                this._blocConcurrent.addClass("close");
            }*/
            if(this._blocConcurrent.css("opacity")=="1"){
                this._blocConcurrent.css("height","0px")
                this._blocConcurrent.css("opacity","0")
            }else{
                this._blocConcurrent.css("height",this._blocConcurrent.data("maxheight"))
                this._blocConcurrent.css("opacity","1")
            }
        }
    }

    btContactUpdateUpHandler(e){
        main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CONTACT);
    }

    btUpdateUpHandler(e){
        main.applicationManager.onSC=true;
        main.sessionManager.reset();
        main.sessionManager.editSC=false;
        main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CHECK_1);
    }

    btUpdateGPSUpHandler(e){
        if(main.sessionManager.currentLocation!=null){
            main.screenManager.loadPopin(ScreenManager.POPIN_GPS);
        }
    }

    removeScreen(){
    	super.removeScreen();
    }

    get gps(){
        return this._gps;
    }

    setGPSSuccessHandler(pData){
        main.sessionManager.currentPDV.latitude=main.sessionManager.currentLocation.lat;
        main.sessionManager.currentPDV.longitude=main.sessionManager.currentLocation.lng;
        main.screenManager.currentScreen.gps.html("Lat : "+main.sessionManager.currentPDV.latitude+", Lng : "+main.sessionManager.currentPDV.longitude);
        main.mapManager.changePositionMarker(main.sessionManager.currentPDV.id, main.sessionManager.currentPDV.latitude, main.sessionManager.currentPDV.longitude);
        main.screenManager.removePopin();
    }

    setGPSErrorHandler(){
        main.screenManager.removePopin()
    }
}