"use strict";
/** Class du manager de l'application. */
class SessionManager {
	/**
     * Créér le manager de l'application.
     */
	constructor() {
		this._scPhoto=null;
        this._login=null;
        this._currentPDV=null;
        this._currentSC=null;
        this._newSC=null;
        this._cpSelect=null;
        this._enseigneSelect=null;
        this._searchPDV=null;
        this._currentLocation=null;
        this._searchMyPDV=null;
        this._distributeur;
        this._concurrentBBQ=null;
        this._concurrentPlancha=null;
        this._editSC=false;
        this._listDistributeur=null;
        this._tempLogin=null;
    }

    get tempLogin(){
        return this._tempLogin;
    }

    set tempLogin(pData){
        this._tempLogin=pData;
    }

    static get LS_LOGIN(){
        return "login4";
    }

    get listDistributeur(){
        return this._listDistributeur;
    }

    set listDistributeur(pArray){
        this._listDistributeur=pArray;
    }

    get scPhoto(){
        return this._scPhoto;
    }

    get editSC(){
        return this._editSC;
    }

    set editSC(pBoolean){
        this._editSC=pBoolean;
    }

    get concurrentBBQ(){
        return this._concurrentBBQ;
    }

    set concurrentBBQ(pData){
        this._concurrentBBQ=pData;
    }

    get concurrentPlancha(){
        return this._concurrentPlancha;
    }

    set concurrentPlancha(pData){
        this._concurrentPlancha=pData;
    }

    get currentPDV(){
        return this._currentPDV;
    }

    set currentPDV(pData){
        this._currentPDV=pData;
    }

    get currentLocation(){
        return this._currentLocation;
    }

    set currentLocation(pData){
        this._currentLocation=pData;
    }

    get currentSC(){
        return this._currentSC;
    }

    set currentSC(pData){
        this._currentSC=pData;
    }

    get cpSelect(){
        return this._cpSelect;
    }

    set cpSelect(pData){
        this._cpSelect=pData;
    }

    get searchPDV(){
        return this._searchPDV;
    }

    set searchPDV(pData){
        this._searchPDV=pData;
    }

    get searchMyPDV(){
        return this._searchMyPDV;
    }

    set searchMyPDV(pData){
        this._searchMyPDV=pData;
    }

    get enseigneSelect(){
        return this._enseigneSelect;
    }

    set enseigneSelect(pData){
        this._enseigneSelect=pData;
    }

    get distributeur(){
        return this._distributeur;
    }

    set distributeur(pData){
        this._distributeur=pData;
    }

    get newSC(){
        return this._newSC;
    }

    set newSC(pData){
        this._newSC=pData;
    }

    get login(){
        return this._login;
    }

    setLogin(){
        this._login=JSON.parse(window.localStorage.getItem(SessionManager.LS_LOGIN));
        main.screenManager.currentNav.setName();
    }

    saveLogin(pData){
        window.localStorage.setItem(SessionManager.LS_LOGIN, JSON.stringify(pData));
        this.setLogin();
    }

    existLogin(){
        var retour;
        if(window.localStorage.getItem(SessionManager.LS_LOGIN)==null){
            retour=false;
        }else{
            retour=true;
            this.setLogin();
        }

        return retour;
    }

    destroyLogin(){
        localStorage.removeItem(SessionManager.LS_LOGIN);
    }
    
    reset(){
        this._scPhoto=new Array();
        if(this._currentSC=="nothing"){
            this._newSC={};
            this._newSC.rapport={};
        }else{
            this._newSC=JSON.parse(JSON.stringify(this._currentSC));
        }
    }

}