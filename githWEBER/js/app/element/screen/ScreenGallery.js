"use strict";
/** Class du manager de l'application. */
class ScreenGallery extends AbstractScreen{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType) {
		super(pType);
		this._btPlus=null;
        this._btNext=null;
        this._zoomPhoto=null;
        this._indexSelected=null;
        this._blocPhotos=null;

        this._infoLogo=null;
        this._infoTime=null;
        this._infoVille=null;
        this._deltaY=false;
    }

    init(){
    	super.init();

        this._blocPhotos=$("#screen-store-gallery_bloc-photos");
        for(var i=0; i<main.sessionManager.scPhoto.length; i++){
            
            this._blocPhotos.append('<div class="screen-store-gallery_bloc-photo screen-store-gallery_bloc-photo-zoom" data-arrayid="'+i+'"><div class="containerImg"><img src="'+main.sessionManager.scPhoto[i].toURL()+'" /></div><div class="screen-store-gallery_bloc-photo_bt-delete"></div></div>');
        }
        
    	this._btPlus=new SimpleButton($("#screen-store-gallery_bloc-photo-plus"), this.btPlusUpHandler);
        if(main.sessionManager.scPhoto.length==10){
            this._btPlus.element.detach();
        }
        this._btNext=new SimpleButton($("#screen-store-gallery_bt-next"), this.btNextUpHandler);
        if(main.sessionManager.scPhoto.length<3){
            this._btNext.element.addClass("desactiver");
        }
        $("#screen-store-gallery_bloc-photos").css("top",($("#screen-store-gallery_bloc-photos-container").height()-$("#screen-store-gallery_bloc-photos").height())/2);
        /* SAMPLE */
        $(".screen-store-gallery_bloc-photo .screen-store-gallery_bloc-photo_bt-delete").each(function(index){
            var btDelete=new SimpleButton($(this), main.screenManager.currentScreen.btDeleteUpHandler);
        });
        /* END SAMPLE */
        $(".screen-store-gallery_bloc-photo-zoom").each(function(index){
            var bt=new SimpleButton($(this), main.screenManager.currentScreen.blocPhotoUpHandler);
        });

        $("#screen-store-gallery_bloc-photos-container").on(main.eventManager.EVENT_MOVE, this.containerMoveHandler)

        $("#screen-store-gallery_zoom-photo .screen-store-gallery_bloc-photo_bt-delete").each(function(index){
            var btDelete=new SimpleButton($(this), main.screenManager.currentScreen.btDeleteZoomUpHandler);
        });
        this._zoomPhoto=new SimpleButton($("#screen-store-gallery_zoom-photo"), main.screenManager.currentScreen.zoomUpHandler);

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

    containerMoveHandler(e){
        //main.screenManager.currentScreen.deltaY=$("#screen-store-gallery_bloc-photos-container").scrollTop()
        main.screenManager.currentScreen.deltaY=true;
    }

    get zoomPhoto(){
        return this._zoomPhoto;
    }

    get indexSelected(){
        return this._indexSelected;
    }

    set indexSelected(pValue){
        this._indexSelected=pValue;
    }

    get deltaY(){
        return this._deltaY;
    }

    set deltaY(pValue){
        this._deltaY=pValue;
    }

    blocPhotoUpHandler(e){
        if(main.screenManager.currentScreen.deltaY==false){
            main.screenManager.currentScreen.indexSelected=$(this).index();
            main.screenManager.currentScreen.zoomPhoto.element.addClass("show");
            $("#screen-store-gallery_zoom-photo img").attr("src",$(this).find("img").attr("src"))
        }
        main.screenManager.currentScreen.deltaY=false;
    }

    zoomUpHandler(e){
        main.screenManager.currentScreen.zoomPhoto.element.removeClass("show");
        e.stopPropagation();
        e.stopImmediatePropagation();
    }

    btPlusUpHandler(e){
        if(main.screenManager.currentScreen.deltaY==false){
            main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_SHOOT);
        }
        main.screenManager.currentScreen.deltaY=false;
    }

    btNextUpHandler(e){
        if(main.sessionManager.scPhoto.length>2){
            
            if(main.sessionManager.editSC==false){
                main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_COMMENT);
            }else{
                main.sessionManager.editSC=false;
                main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_SEND);
            }
        }
    }

    btDeleteUpHandler(e){
        main.screenManager.currentScreen.deleteImageArray($(this).parent(".screen-store-gallery_bloc-photo").data().arrayid);
        $(this).parent(".screen-store-gallery_bloc-photo").remove();
    }

    btDeleteZoomUpHandler(e){
        main.screenManager.currentScreen.deleteImageArray($(".screen-store-gallery_bloc-photo").eq(main.screenManager.currentScreen.indexSelected).data().arrayid);
        $(".screen-store-gallery_bloc-photo").eq(main.screenManager.currentScreen.indexSelected).remove();
    }

    deleteImageArray(pID){
        main.sessionManager.scPhoto.splice(pID,1)
        $(".screen-store-gallery_bloc-photo").each(function(index){
            if(parseInt($(this).data().arrayid)>parseInt(pID)){
                $(this).data().arrayid=$(this).data().arrayid-1;
            }
        })
        if(main.sessionManager.scPhoto.length<10){
            this._blocPhotos.prepend(this._btPlus.element);
        }
        if(main.sessionManager.scPhoto.length<3){
            this._btNext.element.addClass("desactiver");
        }
    }

    removeScreen(){
    	super.removeScreen();
    }
}