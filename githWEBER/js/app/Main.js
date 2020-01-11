"use strict";
/** Class représentant l'objet Main. */
class Main {
	/**
     * Créér le Main.
     */
	constructor() {
        this._eventManager=new EventManager();
		this._applicationManager=new ApplicationManager();
        this._screenManager=new ScreenManager();
        this._sessionManager=new SessionManager();
        this._mapManager=new MapManager();
        this._dataManager=new DataManager();
        this._sqliteManager=new SQLiteManager();
        this._networkManager=new NetworkManager();
        this._systemManager=new SystemManager();
        this._updateManager=new UpdateManager();
    }

    init(){	
        this._systemManager.init();
        this._sqliteManager.init();
        this._dataManager.init();
        this._applicationManager.init();
        this._screenManager.init();
    }

    get dataManager() {
        return this._dataManager;
    }

    get mapManager() {
        return this._mapManager;
    }

    get eventManager() {
        return this._eventManager;
    }

    get applicationManager() {
        return this._applicationManager;
    }

    get screenManager() {
        return this._screenManager;
    }

    get sqliteManager() {
        return this._sqliteManager;
    }

    get networkManager() {
        return this._networkManager;
    }

    get sessionManager() {
        return this._sessionManager;
    }

    get systemManager() {
        return this._systemManager;
    }

    get updateManager() {
        return this._updateManager;
    }
}
