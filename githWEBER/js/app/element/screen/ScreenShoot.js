"use strict";
/** Class du manager de l'application. */
class ScreenShoot extends AbstractScreen{
	/**
     * Créér le manager de l'application.
     */
	constructor(pType) {
		super(pType);
		this._btIdentifie=null;
        this._btShoot=null;
    }

    init(){
    	super.init();
        
        //navigator.camera.getPicture(this.cameraSuccess, this.cameraError, {destinationType:navigator.camera.DestinationType.FILE_URI,correctOrientation:true,targetWidth:1280,targetHeight:1280, quality: 50, saveToPhotoAlbum:true});
    	navigator.camera.getPicture(this.cameraSuccess, this.cameraError, {destinationType:navigator.camera.DestinationType.FILE_URI,correctOrientation:true,targetWidth:1280,targetHeight:1280, quality: 50});

        //this._btShoot=new SimpleButton($("#screen-shoot_bt-shoot"), this.btShootUpHandler)
    }

    cameraSuccess(imageData){
        /*var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageData.substr(imageData.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        var params = new Object();
        params.value1 = "test";
        params.value2 = "param";
        options.params = params;
        options.chunkedMode = false;

        var ft = new FileTransfer();
        ft.upload(imageData, AppConfiguration.SERVER_URL+"/app/service.php?action="+"stockPhoto", function(result){
            alert("success");
            alert(JSON.stringify(result));
        }, function(error){
            alert("fail");
            alert(JSON.stringify(error));
        }, options);*/

        /*var currentName = imageData.replace(/^.*[\\\/]/, '');
         
          //Create a new name for the photo
          var d = new Date(),
              n = d.getTime(),
              newFileName = n + ".jpg";
         
          //Move the file to permanent storage
          $cordovaFile.moveFile(cordova.file.tempDirectory, currentName, cordova.file.dataDirectory, newFileName).then(function(success){
         
            //success.nativeURL will contain the path to the photo in permanent storage, do whatever you wish with it, e.g:
            //createPhoto(success.nativeURL);
            //
            main.sessionManager.scPhoto.push(success.nativeURL);
            main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_GALLERY);
         
          }, function(error){
            //an error occured
          });
         
        }, function(error){
          //An error occured
        }*/

        /*window.resolveLocalFileSystemURL(
          imageData,
          function(fileEntry){
                newFileUri  = cordova.file.dataDirectory + "images/";
                oldFileUri  = fileUri;
                fileExt     = "." + oldFileUri.split('.').pop();

                newFileName = guid("car") + fileExt;
                window.resolveLocalFileSystemURL(newFileUri,
                        function(dirEntry) {
                            // move the file to a new directory and rename it
                            fileEntry.moveTo(dirEntry, newFileName, successCallback, errorCallback);
                        },
                        errorCallback);
          },
          errorCallback);*/

        main.screenManager.currentScreen.movePhoto( imageData );
    
       // window.resolveLocalFileSystemURI( imageData , main.screenManager.currentScreen.resolveOnSuccess, main.screenManager.currentScreen.resOnError);
    }


    movePhoto(file){
        //alert(file);
        window.resolveLocalFileSystemURI( file , main.screenManager.currentScreen.resolveOnSuccess, main.screenManager.currentScreen.resOnError);
    }

    resolveOnSuccess(entry){
        var d = new Date();
        var n = d.getTime();

        //new file name
        var newFileName = n + ".jpg";
        var myFolderApp = "my_folder";

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
            //alert("toto");
            fileSys.root.getDirectory( myFolderApp,{create:true},function(directory) {
                //alert("tata");
                entry.moveTo(directory, newFileName, function(new_entry){
                    //alert("titi")
                    //alert(new_entry.toURL())

                    main.sessionManager.scPhoto.push(new_entry);
                    main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_GALLERY);
                    //alert(JSON.parse(new_entry))
                    /*path = new_entry.fullPath;
                    url = new_entry.toURL();

                    console.log(path+"\n"+url);

                    alert( path+"\n"+url );*/

                    //jQuery('body').append('<img src="'+path+'" />');

                }, main.screenManager.currentScreen.resOnError);
            }, main.screenManager.currentScreen.resOnError);
        }, main.screenManager.currentScreen.resOnError);
    }

    resOnError(error) {
        //alert('Error '+error.code+': '+error.message);
    }


    cameraError(e){
        main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_PHOTO);
    }

    /*btShootUpHandler(e){
        main.screenManager.loadScreen(ScreenManager.SCREEN_STORE_GALLERY);
    }*/

    removeScreen(){
    	super.removeScreen();
    }
}