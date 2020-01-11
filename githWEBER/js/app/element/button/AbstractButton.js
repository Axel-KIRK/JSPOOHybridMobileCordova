"use strict";
/** Class du manager de l'application. */
class AbstractButton {
    /**
     * Créér le manager de l'application.
     */
    constructor(pElement) {
        this._element=pElement;
        this._element.data("button",this);
    }

    get element() {
        return this._element;
    }

    activeButton(){
        this._element.on(main.eventManager.EVENT_DOWN+".abstractbutton", this.downHandler);
        this._element.on(main.eventManager.EVENT_MOVE+".abstractbutton", this.moveHandler);
        this._element.on(main.eventManager.EVENT_UP+".abstractbutton", this.upHandler);
        this._element.on(main.eventManager.EVENT_CLICK+".abstractbutton", this.clickHandler);
    }

    desactiveButton(){
        this._element.off(".abstractbutton");
    }

    display(pBoolean){
        if(pBoolean==true){
            this._element.show();
        }else{
            this._element.hide();
        }
    }

    downHandler(e){
        $(this).addClass("event-down");
    }

    moveHandler(e){
        
    }

    upHandler(e){
        $(this).removeClass("event-down");
    }

    clickHandler(e){

    }

    removeButton(){
        this.desactiveButton();
    }

}