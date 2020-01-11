"use strict";
/** Class du manager de l'application. */
class MapManager {
	/**
     * Créér le manager de l'application.
     */
	constructor() {
    this._map=null;
    this._gmap=$("#gmap");
    this._mapInitalized=false;
    this._btCreate=null;
    this._btBack=null;
    this._my=null;
    this._currentPositionTimeout=null;
    this._mapOption=null;
    this._markerArray=null;
    this._mapScale=true;
  }

  static get DISTANCE_MARKER(){
        return 30000;
    }

  get map() {
    return this._map;
  }

  get gmap() {
    return this._gmap;
  }

  get my(){
    return this._my;
  }

  set my(pMarker){
    this._my=pMarker;
  }

  get mapInitalized() {
    return this._mapInitalized;
  }

  get mapOption(){
    return this._mapOption;
  }

  set mapInitalized(pBoolean) {
    this._mapInitalized=pBoolean;
  }

  get markerArray(){
    return this._markerArray;
  }

  set markerArray(pArray) {
    this._markerArray=pArray;
  }

  get mapScale(){
    return this._mapScale;
  }

  set mapScale(pBoolean) {
    this._mapScale=pBoolean;
  }

  init(){
    this._mapOption = {
        enableHighAccuracy: true
    };

    this._map=$("#map");
    this._markerArray=new Array();
    this._gmap=plugin.google.maps.Map.getMap(document.getElementById("map"));
    this._gmap.addEventListener(plugin.google.maps.event.MAP_READY, this.gmapReadyHandler);
    //this._gmap.on(plugin.google.maps.event.CAMERA_CHANGE, this.onMapCameraChanged);
    this._btCreate=new SimpleButton($("#screen-geolocalisation-map_bt-create"), this.btCreateUpHandler);
    this._btBack=new SimpleButton($("#screen-geolocalisation-map_bt-back"), this.btBackUpHandler);
  }

  onMapCameraChanged(position) {
    /*if(main.mapManager.mapScale==false){
      if(position.zoom>12){
        main.mapManager.mapScale=true;
        for(var i=0; i<main.mapManager.markerArray.length;i++){
          main.mapManager.markerArray[i].pdv.setVisible(true)
        }
      }
    }else{
      if(position.zoom<=12){
        main.mapManager.mapScale=false;
        for(var i=0; i<main.mapManager.markerArray.length;i++){
          main.mapManager.markerArray[i].pdv.setVisible(false)
        }
      }
    }*/
  }

  btCreateUpHandler(e){
      //main.screenManager.loadScreen(ScreenManager.SCREEN_GEOLOCALISATION_MANUAL_CP);
      main.sqliteManager.getDistributeurs();
  }

  getDistributeursSuccess(pData){
      main.sessionManager.listDistributeur=pData.result;
      main.screenManager.loadScreen(ScreenManager.SCREEN_GEOLOCALISATION_MANUAL_CP);
  }

  getDistributeursError(){

  }

  btBackUpHandler(e){
      main.screenManager.loadScreen(ScreenManager.SCREEN_GEOLOCALISATION);
  }

  activeMap(pBoolean){
    if(pBoolean==true){
      this._map.show();
      this._gmap.setClickable(true);
      this._gmap.setVisible(true);
      this._btCreate.activeButton();
      this._btBack.activeButton();
      main.screenManager.menu.hide();
      //main.mapManager.gmap.getMyLocation(main.mapManager.mapOption, main.mapManager.getMyLocationSuccessHandler, main.mapManager.getMyLocationErrorHandler);
    }else{
      this._map.hide();
      main.screenManager.menu.show();
      this._btCreate.desactiveButton();
      this._btBack.desactiveButton();
      this._gmap.setClickable(false);
      this._gmap.setVisible(false);
    }
  }

  gmapReadyHandler(e) {
    main.mapManager.mapInitalized=true;
    main.screenManager.splashInitialized=true;
    navigator.splashscreen.hide();
    var isonline=main.networkManager.isOnline;
    main.updateManager.init();

    main.mapManager.activeMap(false);
    main.mapManager.gmap.setMyLocationEnabled(true);
    main.mapManager.gmap.getMyLocation(main.mapManager.mapOption, main.mapManager.getMyLocationSuccessHandler, main.mapManager.getMyLocationErrorHandler);
    //var watchId = navigator.geolocation.watchPosition(main.mapManager.getMyLocationSuccessHandler, main.mapManager.getMyLocationErrorHandler, { timeout: 10000, enableHighAccuracy: true });
  }

  getPi(){
    /*var data={
        action:"getPi",
        variable:{},
        success: this.getPiSuccess,
        fail:this.getPiError
    }
    main.dataManager.request(data);*/
    main.sqliteManager.getPi();
  }

  getPiSuccess(pData){
    if(main.updateManager.onSync==false){
      for(var i=0; i<main.mapManager.markerArray.length; i++){
        main.mapManager.markerArray[i].pdv.remove();
      }
      main.mapManager.markerArray=new Array();
      for(i=0; i<pData.result.length;i++){
          //if(pData.result[i].latitude!=0 && pData.result[i].longitude!=0){
            main.mapManager.addMarker(pData.result[i]);
          //}
      }
    }
    setTimeout(function(){main.mapManager.gmap.getMyLocation(main.mapManager.mapOption, main.mapManager.getMyLocationSuccessHandler, main.mapManager.getMyLocationErrorHandler);},60000)
  }

  getPiError(){

  }

  addMarker(pData){
    if(main.mapManager.mapInitalized==true){
        if(main.mapManager.getDistance(main.sessionManager.currentLocation, new plugin.google.maps.LatLng(pData.latitude,pData.longitude))<MapManager.DISTANCE_MARKER){
          main.mapManager.gmap.addMarker({
            'position': new plugin.google.maps.LatLng(pData.latitude,pData.longitude),
            'icon': {'url': cordova.file.dataDirectory+UpdateManager.FOLDER_DISTRIBUTEUR+'/'+pData.picto},
            'title': pData.nom+"\n"+pData.adresse+"\n"+pData.cp+" "+pData.ville,
            'snippet': "Cliquez ici pour accéder à la fiche",
            'idpdv':pData,
            'markerClick': function(marker) {
              marker.showInfoWindow();
            },
            'infoClick': function(marker) {
              main.sessionManager.currentPDV=marker.get("idpdv");
              main.dataManager.getPiInfo();
            }
          }, function(marker) {
              main.mapManager.markerArray.push({'pdv':marker,'data':pData});
              /*if(main.sessionManager.currentLocation!=null){
                if(main.mapManager.getDistance(main.sessionManager.currentLocation, new plugin.google.maps.LatLng(pData.latitude,pData.longitude))<MapManager.DISTANCE_MARKER){
                  marker.setVisible(true)
                }else{
                  marker.setVisible(false)
                }
              }else{
                  marker.setVisible(false)
              }*/
          });
        }
    }
  }

  removeMarker(pID){
    /*var indexSplice=-1;
    for(var i=0; i<main.mapManager.markerArray.length; i++){
      if(main.mapManager.markerArray[i].data.id==pID){
        main.mapManager.markerArray[i].pdv.remove();
        indexSplice=i;
        break;
      }
    }
    if(indexSplice>-1){
      main.mapManager.markerArray.splice(indexSplice,1);
    }*/
  }

  changePositionMarker(pID, pLat, pLng){
    /*for(var i=0; i<main.mapManager.markerArray.length; i++){
      if(main.mapManager.markerArray[i].data.id==pID){
        main.mapManager.markerArray[i].data.latitude=pLat;
        main.mapManager.markerArray[i].data.longitude=pLng;
        main.mapManager.markerArray[i].pdv.setPosition(new plugin.google.maps.LatLng(pLat,pLng))
        if(main.sessionManager.currentLocation!=null){
          if(main.mapManager.getDistance(main.sessionManager.currentLocation, new plugin.google.maps.LatLng(main.mapManager.markerArray[i].data.latitude,main.mapManager.markerArray[i].data.longitude))<MapManager.DISTANCE_MARKER){
            main.mapManager.markerArray[i].pdv.setVisible(true)
          }else{
            main.mapManager.markerArray[i].pdv.setVisible(false)
          }
        }else{
            main.mapManager.markerArray[i].pdv.setVisible(false)
        }
        break;
      }
    }*/
  }

  getMyLocationSuccessHandler(location) {
    /*var firstLock=false;
    if(main.sessionManager.currentLocation==null){
      firstLock=true;
    }*/
    //main.sessionManager.currentLocation=new plugin.google.maps.LatLng(location.coords.latitude, location.coords.longitude);
    main.sessionManager.currentLocation=location.latLng;
    main.mapManager.gmap.moveCamera({
        target: {lat: main.sessionManager.currentLocation.lat, lng: main.sessionManager.currentLocation.lng  },
        zoom: 17,
        tilt: 0,
        bearing: 0
      }, function() {
        
      });

    //if(firstLock==true){
      main.mapManager.getPi();
    /*}else{
      for(var i=0; i<main.mapManager.markerArray.length;i++){
        if(main.mapManager.getDistance(main.sessionManager.currentLocation, new plugin.google.maps.LatLng(main.mapManager.markerArray[i].data.latitude,main.mapManager.markerArray[i].data.longitude))<MapManager.DISTANCE_MARKER){
          main.mapManager.markerArray[i].pdv.setVisible(true)
        }else{
          main.mapManager.markerArray[i].pdv.setVisible(false)
        }
      }
      setTimeout(function(){main.mapManager.gmap.getMyLocation(main.mapManager.mapOption, main.mapManager.getMyLocationSuccessHandler, main.mapManager.getMyLocationErrorHandler);},60000)
    }*/
    
  }

  rad(x) {
    return x * Math.PI / 180;
  };

  getDistance(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = this.rad(p2.lat - p1.lat);
    var dLong = this.rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
  };

  getMyLocationErrorHandler(e) {
    setTimeout(function(){main.mapManager.gmap.getMyLocation(main.mapManager.mapOption, main.mapManager.getMyLocationSuccessHandler, main.mapManager.getMyLocationErrorHandler);},60000)
  }

  /*syncPosition(){
    if(this._currentPositionTimeout!=null){
      clearTimeout(this._currentPositionTimeout);
    }
    this._currentPositionTimeout=setTimeout(function(){
      main.mapManager.gmap.getMyLocation(main.mapManager.mapOption, main.mapManager.getMyLocationSuccessHandler, main.mapManager.getMyLocationErrorHandler);
    },5000);
  }*/

}