"use strict";
/** Class du manager de l'application. */
class ScreenPhotoUser extends AbstractScreen{
    /**
     * Créér le manager de l'application.
     */
    constructor(pType) {
        super(pType);
        this._nofavoris=null;
    }

    init(){
        super.init();
        this._nofavoris=$("#screen-photouser_nofavoris");
        this._nofavoris.hide();
        main.screenManager.loadPopin(ScreenManager.POPIN_SAVE);
        main.sqliteManager.getPhotoUser();
    }

    getPhotosUserSuccess(pData){
        if(pData.result.length>0){
            //alert(JSON.stringify(pData))
            main.screenManager.removePopin();

            var photoUserArray=new Array();
            for(var i=0; i<pData.result.length; i++){
                photoUserArray.push({title: pData.result[i].photo.title, href: cordova.file.dataDirectory+UpdateManager.FOLDER_PHOTOUSER+'/'+pData.result[i].photo.src, type: 'image/jpeg', thumbnail: cordova.file.dataDirectory+UpdateManager.FOLDER_PHOTOUSER+'/'+pData.result[i].photo.src});
            }

            var gallery = blueimp.Gallery(photoUserArray,{
                onopen: function () {
                    // Callback function executed when the Gallery is initialized.
                },
                onopened: function () {
                    // Callback function executed when the Gallery has been initialized
                    // and the initialization transition has been completed.
                },
                onslide: function (index, slide) {
                    
                },
                onslideend: function (index, slide) {
                    // Callback function executed after the slide change transition.
                },
                onslidecomplete: function (index, slide) {
                    // Callback function executed on slide content load.
                },
                onclose: function () {
                    // Callback function executed when the Gallery is about to be closed.
                },
                onclosed: function () {
                    main.screenManager.loadScreen(ScreenManager.SCREEN_GEOLOCALISATION);
                }
            });
        }else{
            main.screenManager.removePopin();
            main.screenManager.currentNav.showBack(ScreenManager.SCREEN_GEOLOCALISATION);
            this._nofavoris.show();
        }
    }


    getPhotosUserError(){
        main.screenManager.removePopin();
        main.screenManager.loadScreen(ScreenManager.SCREEN_GEOLOCALISATION);
    }

    removeScreen(){
        super.removeScreen();
    }
}