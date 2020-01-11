"use strict";
/** Class représentant l'objet Main. */
class UpdateManager {
    /**
     * Créér le Main.
     */
    constructor() {
        this._timeoutCheckUpdate=null;
        this._updateData=null;
        this._numDownloaded=null;
        this._indexSC=null;
        this._indexPhoto=null;
        this._dataSync=null;
        this._onSync=false;
        this._onPhotoDl=false;
    }

    init(){ 
        if(this.contentTimestamp==null){
            this.contentTimestamp=0;
        }
        document.addEventListener("DOWNLOADER_downloadSuccess", this.downloadSuccess);
        document.addEventListener("DOWNLOADER_downloadError", this.downloadError);
        this.checkUpdate();
    }

    get onSync(){
        return this._onSync;
    }

    set onSync(pBoolean){
        this._onSync=pBoolean;
    }

    static get FOLDER_DISTRIBUTEUR(){
        return "distributeur";
    }

    static get FOLDER_PHOTOUSER(){
        return "photouser";
    }

    checkUpdate(){
        //alert("Last Timestamp -> "+main.updateManager.contentTimestamp);
        /*if(main.updateManager.contentTimestamp!=0){
            //alert("ONLINE "+main.networkManager.isOnline)
            if(main.networkManager.isOnline==true){
                main.updateManager.startUpdate();
            }else{
                main.updateManager.restartTimeout();
            }
        }*/
    }

    startUpdate(){
        main.screenManager.loadPopin(ScreenManager.POPIN_SYNC);
        if(main.networkManager.isOnline==true){
            main.updateManager.onSync=true;
            main.updateManager.numDownloaded=0;
            main.sqliteManager.getDataSync();
        }else{
            main.updateManager.restartTimeout();
        }
    }

    getDataSyncSucess(pData){
        //alert("Get data offline sync")
        main.updateManager.dataSync=pData;
        main.updateManager.indexSC=0;
        main.updateManager.indexPhoto=0;
        main.updateManager.stockPhoto();
    }

    stockPhoto(){
        //alert("Send picture to Dashboard");
        if(main.updateManager.indexSC<main.updateManager.dataSync.storecheck.length){
            if(main.networkManager.isOnline==true){
                if(main.updateManager.indexPhoto<main.updateManager.dataSync.storecheck[main.updateManager.indexSC].rapport.photos.length){
                    var sc=main.updateManager.dataSync.storecheck[main.updateManager.indexSC];
                    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
                        var photo=sc.rapport.photos[main.updateManager.indexPhoto];
                        fileSys.root.getFile(photo, { create: false }, function(new_entry){
                            var options = new FileUploadOptions();
                            options.fileKey = "file";
                            options.fileName = sc.id_pdv+"_"+sc.id_user+"_";
                            options.mimeType = "image/jpeg";
                            var params = new Object();
                            params.value1 = "test";
                            params.value2 = "param";
                            options.params = params;
                            options.chunkedMode = false;
                            var ft = new FileTransfer();
                            ft.upload(new_entry.toURL(), AppConfiguration.SERVER_URL+"/app/service.php?action=stockPhoto", function(result){
                                //alert(JSON.stringify(result));
                                main.updateManager.dataSync.storecheck[main.updateManager.indexSC].rapport.photos[main.updateManager.indexPhoto]=result.response;
                                main.updateManager.indexPhoto=main.updateManager.indexPhoto+1;
                                main.updateManager.stockPhoto();
                            }, function(error){
                                //alert(JSON.stringify(error));
                                main.updateManager.restartTimeout();
                            }, options);

                        }, function(){
                            //alert("trouve pas")
                            main.updateManager.indexPhoto=main.updateManager.indexPhoto+1;
                            main.updateManager.stockPhoto();
                        });
                    },function (){
                        main.updateManager.restartTimeout();
                    });
                }else{
                    main.updateManager.indexSC=main.updateManager.indexSC+1;
                    main.updateManager.indexPhoto=0;
                    main.updateManager.stockPhoto();
                }
            }else{
                main.updateManager.restartTimeout();
            }
        }else{
            //alert("Send picture success");
            main.updateManager.startSyncData();
        }
    }

    startSyncData(){
        //alert("Start Sync Data");
        //alert(JSON.stringify(main.updateManager.dataSync));
        var loginID;
        if(main.sessionManager.login==null){
            loginID=main.sessionManager.tempLogin.id;
        }else{
            loginID=main.sessionManager.login.id;
        }
        if(main.networkManager.isOnline==true){
            var data={
                action:"syncData",
                variable:{
                    //user_id_photo: main.sessionManager.login.id,
                    user_id_photo: loginID,
                    syncTimestamp: main.updateManager.contentTimestamp,
                    syncLocalData:JSON.stringify(main.updateManager.dataSync)
                },
                success: main.updateManager.checkUpdateSuccess,
                fail:main.updateManager.checkUpdateError
            }
            main.dataManager.request(data);
        }else{
            main.updateManager.restartTimeout();
        }
    }

    checkUpdateSuccess(pData){
        //alert("Data Sync Success");
        //alert(JSON.stringify(pData));
        main.updateManager.updateData=pData;
        //alert("Clean Offline Sync");
        main.sqliteManager.cleanSync();
    }

    checkUpdateError(){
        //alert("Data Sync Error");
        main.updateManager.restartTimeout();
    }

    cleanSyncSuccess(){
        //alert("Clean Offline Sync Success");
        //alert("Download distributeur");
        main.updateManager.downloadUserPhoto();
    }

    downloadUserPhoto(){
        this._onPhotoDl=true;
        if(this._updateData.photouser.length>0){
            if(main.networkManager.isOnline==true){
                //alert("download distributeur")
                var userPhotoArray=new Array();
                for(var i=0; i<this._updateData.photouser.length; i++){
                    //alert(this._updateData.photouser[i].photo.src)
                    userPhotoArray.push({url:AppConfiguration.SERVER_URL+"/app/photos/"+this._updateData.photouser[i].photo.src});
                }

                //alert(JSON.stringify(userPhotoArray))
                downloader.abort();
                downloader.init({folder: UpdateManager.FOLDER_PHOTOUSER, fileSystem:cordova.file.dataDirectory});
                downloader.getMultipleFiles(userPhotoArray);
            }else{
                main.updateManager.restartTimeout();
            }
        }else{
            //alert("Download distributeur Success");
            main.updateManager.downloadDistributeur();
        }
    }

    downloadDistributeur(){
        //alert("download distributeur")
        main.updateManager.numDownloaded=0;
        this._onPhotoDl=false;
        if(this._updateData.distributeur.length>0){
            if(main.networkManager.isOnline==true){
                
                var distributeurArray=new Array();
                for(var i=0; i<this._updateData.distributeur.length; i++){
                    distributeurArray.push({url:AppConfiguration.SERVER_URL+"/app/distributeur/"+this._updateData.distributeur[i].picto});
                }

                downloader.abort();
                downloader.init({folder: UpdateManager.FOLDER_DISTRIBUTEUR, fileSystem:cordova.file.dataDirectory});
                downloader.getMultipleFiles(distributeurArray);
            }else{
                main.updateManager.restartTimeout();
            }
        }else{
            //alert("Download distributeur Success");
            main.sqliteManager.setDataSync();
        }
    }

    get dataSync(){
        return this._dataSync;
    }

    set dataSync(pData){
        this._dataSync=pData;
    }

    get indexSC(){
        return this._indexSC;
    }

    set indexSC(pNum){
        this._indexSC=pNum;
    }

    get indexPhoto(){
        return this._indexPhoto;
    }

    set indexPhoto(pNum){
        this._indexPhoto=pNum;
    }

    get numDownloaded(){
        return this._numDownloaded;
    }

    set numDownloaded(pNum){
        this._numDownloaded=pNum;
    }

    get onPhotoDl(){
        return this._onPhotoDl;
    }

    set onPhotoDl(pNum){
        this._onPhotoDl=pNum;
    }

    downloadSuccess(){
        //alert("dl success");
        main.updateManager.numDownloaded=main.updateManager.numDownloaded+1;
        if(main.updateManager.onPhotoDl==false){
            if(main.updateManager.numDownloaded==main.updateManager.updateData.distributeur.length){
                //alert("Downlaod Success");
                main.sqliteManager.setDataSync();
            }
        }else{
            //alert("dl photo");
            //alert(main.updateManager.numDownloaded+"  "+main.updateManager.updateData.photouser.length);
            if(main.updateManager.numDownloaded==main.updateManager.updateData.photouser.length){
                //alert("Downlaod Success");
                main.updateManager.downloadDistributeur();
            }
        }
    }

    dataSyncSuccess(){

        //alert("Sync finish");
        /*if(main.updateManager.contentTimestamp==0){
            main.sessionManager.saveLogin(main.sessionManager.tempLogin);
            main.screenManager.removePopin()
            main.screenManager.loadScreen(ScreenManager.SCREEN_LOGGED);
        }
        this.contentTimestamp=parseInt(main.updateManager.updateData.syncTimestamp);
        main.updateManager.restartTimeout();*/
        main.updateManager.onSync=false;
        setTimeout(function(){main.screenManager.currentPopin.syncSuccess();},1000);
    }

    downloadError(){
        //alert("check error");
        main.updateManager.restartTimeout();
    }

    restartTimeout(){
        main.updateManager.onSync=false;
        setTimeout(function(){main.screenManager.currentPopin.syncError();},1000);
        /*if(main.updateManager.contentTimestamp==0){
            main.screenManager.removePopin();
        }else{
            if(this._timeoutCheckUpdate==null){
                clearTimeout(this._timeoutCheckUpdate)
            }
            this._timeoutCheckUpdate=setTimeout(main.updateManager.checkUpdate, UpdateManager.DELAY_CHECK_UPDATE);
        }*/
    }

    static get DELAY_CHECK_UPDATE(){
        return 30000;
    }

    static get KEY_CONTENT_TIMESTAMP(){
        return "content_timestamp4";
    }

    set contentTimestamp(pTimestamp){
        window.localStorage.setItem(UpdateManager.KEY_CONTENT_TIMESTAMP, pTimestamp);
    }

    get contentTimestamp(){
        return window.localStorage.getItem(UpdateManager.KEY_CONTENT_TIMESTAMP);
    }

    set updateData(pJson){
        this._updateData=pJson;
    }

    get updateData(){
        return this._updateData;
    }

}