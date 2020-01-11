"use strict";
/** Class du manager de l'application. */
class EventManager {
	/**
     * Créér le manager de l'application.
     */
	constructor() {
		
		this._eventDown=null;
		this._eventMove=null;
		this._eventUp=null;
    this._eventClick=null;
    }

    get EVENT_DOWN() {
      return this._eventDown;
    }

    get EVENT_MOVE() {
      return this._eventMove;
    }

    get EVENT_UP() {
      return this._eventUp;
    }

    get EVENT_CLICK() {
      return this._eventClick;
    }

    setEventType(pMobile){
    	if(pMobile==false){
    		this._eventDown="mousedown";
			 this._eventMove="mousemove";
			this._eventUp="mouseup";
      this._eventClick="click";
    	}else{
    		this._eventDown="touchstart";
			 this._eventMove="touchmove";
			 this._eventUp="touchend";
      this._eventClick="click";
    	}
    }

}