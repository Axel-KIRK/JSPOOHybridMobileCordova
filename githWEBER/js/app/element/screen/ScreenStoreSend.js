"use strict";
/** Class du manager de l'application. */
class ScreenStoreSend extends AbstractScreen{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType) {
		super(pType);
        this._btSend=null;
        this.indexImage=null;
        this._deltaY=false;
        this._btInformer=null;
        this._onInform;
    }

    get indexImage(){
        return this._indexImage;
    }

    set indexImage(pIndex){
        this._indexImage=pIndex;
    }

    get onInform(){
        return this._onInform;
    }

    set onInform(pBoolean){
        this._onInform=pBoolean;
    }

    init(){
    	super.init();
        var pdv=main.sessionManager.currentPDV;
        var sc=main.sessionManager.newSC;
        
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
        this._btInformer=$("#screen-store_bt-informer");
        this._btInformer.on(main.eventManager.EVENT_DOWN, this.btInformerDownHandler);
        this._onInform=0;

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

        var scc=main.sessionManager.currentSC;
        this._infoTime.html("NA");
        if(scc!='nothing'){
            var jour=["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
            var mois=["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"];
            var dateUpdate=new Date(scc.timestamp*1000);
            this._infoTime.html("Mises à jour le "+jour[dateUpdate.getDay()]+" "+dateUpdate.getDate()+" "+mois[dateUpdate.getMonth()]+" "+dateUpdate.getFullYear()+" à "+dateUpdate.getHours()+"h"+dateUpdate.getMinutes()+" par "+scc.prenom+" "+scc.nom);
        }

        if(sc=='nothing'){
            //this._infoTime.html("NA");
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
            /*var jour=["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
            var mois=["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"];
            var dateUpdate=new Date(sc.timestamp*1000);
            this._infoTime.html("Mises à jour le "+jour[dateUpdate.getDay()]+" "+dateUpdate.getDate()+" "+mois[dateUpdate.getMonth()]+" "+dateUpdate.getFullYear()+" à "+dateUpdate.getHours()+"h"+dateUpdate.getMinutes()+" par "+sc.prenom+" "+sc.nom);*/

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

            this._champImage.empty();
            for(var i=0; i<main.sessionManager.scPhoto.length; i++){
                this._champImage.append('<div class="photo-shoot"><img src="'+main.sessionManager.scPhoto[i].toURL()+'" /></div>');
                //this._champImage.append('<div class="photo-shoot")"></div>');
            }
            /*if(sc.rapport.hasOwnProperty("photos") && sc.rapport.photos.length>0){
                this._champImage.empty();
                for(var i=0; i<sc.rapport.photos.length; i++){
                    this._champImage.append('<img src="http://weber-sc.gc-dev.biz/app/photos/'+sc.rapport.photos[i]+'" />');
                }
            }else{
                this._champImage.empty();
            }*/


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


        this._btSend=new SimpleButton($("#screen-store_bt-send"), this.btSendUpHandler);

        this._champ1.on(main.eventManager.EVENT_UP, this.champDownHandler);
        this._champ2.on(main.eventManager.EVENT_UP, this.champDownHandler);
        this._champ3.on(main.eventManager.EVENT_UP, this.champDownHandler);
        this._champ4.on(main.eventManager.EVENT_UP, this.champDownHandler);
        this._champ5.on(main.eventManager.EVENT_UP, this.champDownHandler);
        this._champ6.on(main.eventManager.EVENT_UP, this.champDownHandler);
        this._champ7.on(main.eventManager.EVENT_UP, this.champDownHandler);
        this._champ8.on(main.eventManager.EVENT_UP, this.champDownHandler);
        this._champ9.on(main.eventManager.EVENT_UP, this.champDownHandler);
        this._champ10.on(main.eventManager.EVENT_UP, this.champDownHandler);
        this._champ11.on(main.eventManager.EVENT_UP, this.champDownHandler);
        this._champ12.on(main.eventManager.EVENT_UP, this.champDownHandler);
        this._champ13.on(main.eventManager.EVENT_UP, this.champDownHandler);
        this._champ14.on(main.eventManager.EVENT_UP, this.champDownHandler);
        this._champ15.on(main.eventManager.EVENT_UP, this.champDownHandler);
        this._champ16.on(main.eventManager.EVENT_UP, this.champDownHandler);
        this._champ17.on(main.eventManager.EVENT_UP, this.champDownHandler);
        this._champImage.on(main.eventManager.EVENT_UP, this.champDownHandler);
        $(".champBBQ").on(main.eventManager.EVENT_UP, this.champDownHandler);
        $(".champPlancha").on(main.eventManager.EVENT_UP, this.champDownHandler);

        $("#screen-store_container").on(main.eventManager.EVENT_MOVE, this.containerMoveHandler)
    }

    btInformerDownHandler(e){
        if($(this).hasClass("checked")){
            $(this).removeClass("checked");
            main.screenManager.currentScreen.onInform=0;
        }else{
            $(this).addClass("checked");
            main.screenManager.currentScreen.onInform=1;
        }
    }

    get deltaY(){
        return this._deltaY;
    }

    set deltaY(pValue){
        this._deltaY=pValue;
    }

    containerMoveHandler(e){
        //main.screenManager.currentScreen.deltaY=$("#screen-store-gallery_bloc-photos-container").scrollTop()
        main.screenManager.currentScreen.deltaY=true;
    }

    champDownHandler(e){
        if(main.screenManager.currentScreen.deltaY==false){
            main.sessionManager.editSC=true;

            if($(this).hasClass("champBBQ")){
                main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CONCURRENT_1);
            }else if($(this).hasClass("champPlancha")){
                main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CONCURRENT_2);
            }else{
                switch($(this).attr('id')){
                    case "champ1":
                        main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_COMMENT);
                    break;
                    case "champ2":
                        main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CHECK_1);
                    break;
                    case "champ3":
                        main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CHECK_2);
                    break;
                    case "champ4":
                        main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CHECK_3);
                    break;
                    case "champ5":
                        main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CHECK_3);
                    break;
                    case "champ6":
                        main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CHECK_4);
                    break;
                    case "champ7":
                        main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CHECK_4);
                    break;
                    case "champ8":
                        main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CHECK_4);
                    break;
                    case "champ9":
                        main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CHECK_4);
                    break;
                    case "champ10":
                        main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CHECK_4);
                    break;
                    case "champ11":
                        main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CHECK_3);
                    break;
                    case "champ12":
                        main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CHECK_5);
                    break;
                    case "champ13":
                        main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CHECK_5);
                    break;
                    case "champ14":
                        main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CHECK_6);
                    break;
                    case "champ15":
                        main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CHECK_6);
                    break;
                    case "champ16":
                        main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CHECK_6);
                    break;
                    case "champ17":
                        main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_CHECK_6);
                    break;
                    case "champImage":
                        main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_GALLERY);
                    break;
                }
            }
        }

        main.screenManager.currentScreen.deltaY=false;
    }

    btSendUpHandler(e){
        main.screenManager.currentScreen.sendSC();
    }

    sendSC(){
        this._btSend.desactiveButton();
        main.screenManager.loadPopin(ScreenManager.POPIN_SAVE);
        var sc=main.sessionManager.newSC;
        if(sc.rapport.hasOwnProperty("photos")==false){
            sc.rapport.photos=new Array();
        }else{
            sc.rapport.photos=new Array();
        }
        for(var i=0; i<main.sessionManager.scPhoto.length; i++){
            sc.rapport.photos.push(main.sessionManager.scPhoto[i].fullPath);
        }

        main.sessionManager.newSC.timestamp=Math.floor(new Date().getTime() / 1000);
        main.sessionManager.newSC.nom=main.sessionManager.login.nom;
        main.sessionManager.newSC.prenom=main.sessionManager.login.prenom;
        main.sessionManager.currentSC=JSON.parse(JSON.stringify(main.sessionManager.newSC));
        main.applicationManager.onSC=false;
        main.screenManager.removePopin()
        main.sqliteManager.insertNewStorecheck({timestamp:main.sessionManager.newSC.timestamp, rapport:main.sessionManager.currentSC.rapport, sync:0, alert:main.screenManager.currentScreen.onInform, id_pdv:main.sessionManager.currentPDV.id, id_user:main.sessionManager.login.id, sync_timestamp:main.sessionManager.newSC.timestamp, deleted:0});
        main.screenManager.loadScreen(ScreenManager.SCREEN_STORE);
        main.screenManager.loadPopin(ScreenManager.POPIN_COMPLETE);


        /*if(main.sessionManager.scPhoto.length>0){
            main.screenManager.currentScreen.indexImage=0;
            main.screenManager.currentScreen.sendImage();
        }else{
            main.screenManager.currentScreen.sendSCBDD()
        }*/
    }

    sendSCBDD(){
        var data={
            action:"sendSC",
            variable:{
                id_pdv: main.sessionManager.currentPDV.id,
                id_user: main.sessionManager.login.id,
                rapport:JSON.stringify(main.sessionManager.newSC.rapport),
                informer:this._onInform
            },
            success: this.sendSuccesHandler,
            fail:this.sendFailHandler
        }
        
        main.dataManager.request(data);
    }

    sendSuccesHandler(pData){
       main.sessionManager.newSC.timestamp=pData.timestamp;
       main.sessionManager.newSC.nom=main.sessionManager.login.nom;
       main.sessionManager.newSC.prenom=main.sessionManager.login.prenom;
       main.sessionManager.currentSC=JSON.parse(JSON.stringify(main.sessionManager.newSC));
       main.applicationManager.onSC=false;
       main.screenManager.removePopin()
       main.sqliteManager.insertNewStorecheck({timestamp:main.sessionManager.newSC.timestamp, rapport:main.sessionManager.currentSC.rapport, sync:0, alert:main.screenManager.currentScreen.onInform, id_pdv:main.sessionManager.currentPDV.id, id_user:main.sessionManager.login.id, sync_timestamp:main.sessionManager.newSC.timestamp, deleted:0});
       main.screenManager.loadScreen(ScreenManager.SCREEN_STORE);
       main.screenManager.loadPopin(ScreenManager.POPIN_COMPLETE);
    }

    sendFailHandler(){
        main.screenManager.removePopin()
    }

    sendImage(){
        var data={
            action:"stockPhoto",
            variable:{
                id_pdv: main.sessionManager.currentPDV.id,
                id_user: main.sessionManager.login.id,
                data:main.sessionManager.scPhoto[0]
            },
            success: this.sendImageSuccessHandler,
            fail:this.sendImageErrorHandler
        }
        main.dataManager.request(data);
    }

    sendImageSuccessHandler(pData){
        main.sessionManager.scPhoto.shift();
        var sc=main.sessionManager.newSC;
        sc.rapport.photos.push(pData.srcImg);
        if(main.sessionManager.scPhoto.length>0){
            //main.screenManager.currentScreen.indexImage=main.screenManager.currentScreen.indexImage+1;
            main.screenManager.currentScreen.sendImage();
        }else{
            main.screenManager.currentScreen.sendSCBDD()
        }
    }

    sendImageErrorHandler(){
        main.screenManager.removePopin()
    }

    removeScreen(){
    	super.removeScreen();
    }
}