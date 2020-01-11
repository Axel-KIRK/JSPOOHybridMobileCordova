"use strict";
/** Class du manager de l'application. */
class SystemManager {
	/**
     * Créér le manager de l'application.
     */
	constructor() {
		
    }

    init(){
        document.addEventListener("pause", this.onPause, false);
        document.addEventListener("resume", this.onResume, false);
    }

    onPause(){

    }

    onResume(){
    	
    }

}