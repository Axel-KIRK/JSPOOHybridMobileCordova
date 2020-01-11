"use strict";
/** Class du manager de l'application. */
class NetworkManager {
	/**
     * Créér le manager de l'application.
     */
	constructor() {
		document.addEventListener("online", this.onlineHandler, false);
		document.addEventListener("offline", this.offlineHandler, false);
    }

    get isOnline(){
    	var networkState = navigator.connection.type;
    	if(networkState==Connection.CELL_4G || networkState==Connection.ETHERNET || networkState==Connection.WIFI){
            $("#nav-default_header_sync_message").html("ONLINE");
            $("#nav-default_header_sync").addClass("online");
    		return true;
    	}else{
            $("#nav-default_header_sync_message").html("OFFLINE");
            $("#nav-default_header_sync").removeClass("online");
    		return false;
    	}
    }

    onlineHandler(){
    	//main.networkManager.isOnline=true;
       var networkState = navigator.connection.type;
        if(networkState==Connection.CELL_4G || networkState==Connection.ETHERNET || networkState==Connection.WIFI){
            $("#nav-default_header_sync_message").html("ONLINE");
            $("#nav-default_header_sync").addClass("online");
        }else{
            $("#nav-default_header_sync_message").html("OFFLINE");
            $("#nav-default_header_sync").removeClass("online");
        }
    }

    offlineHandler(){
    	//main.networkManager.isOnline=false;
       var networkState = navigator.connection.type;
        if(networkState==Connection.CELL_4G || networkState==Connection.ETHERNET || networkState==Connection.WIFI){
            $("#nav-default_header_sync_message").html("ONLINE");
            $("#nav-default_header_sync").addClass("online");
        }else{
            $("#nav-default_header_sync_message").html("OFFLINE");
            $("#nav-default_header_sync").removeClass("online");
        }
    }

}