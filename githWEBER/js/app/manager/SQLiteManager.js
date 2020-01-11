"use strict";
/** Class du manager de l'application. */
class SQLiteManager {
	/**
     * Créér le manager de l'application.
     */
	constructor() {
        this._db=null;
        this._dataSync=null;
        this._indexUser=0;
        this._indexDistributeur=0;
        this._indexPhotoUser=0;
        this._indexConcurrent=0;
        this._indexPDV=0;
        this._indexSC=0;
        this._mySC=0;
        this._resultArray=null;
        this._piArray=null;
    }

    init(){
        this._db= window.sqlitePlugin.openDatabase({name: 'weber4.db', location: 'default'});
        this._db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS distributeur (id integer, enseigne text, picto text, sync_timestamp integer, deleted integer)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS pdv (id integer, latitude text, longitude text, adresse text, cp text, ville text, tel text, contact text, email text, nom text, id_distributeur integer, id_remote integer, id_weber text, sync_timestamp integer, deleted integer, islocal integer)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS store_check (id integer, timestamp integer, rapport text, sync integer, alert integer, id_pdv integer, id_user integer, sync_timestamp integer, deleted integer, islocal integer)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS user (id integer, id_statut integer, nom text, prenom text, email text, login text, password text, tel text, avatar text, sync_timestamp integer, deleted integer)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS concurrent (id integer, nom text, categorie integer, sync_timestamp integer, deleted integer)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS user_photo (id integer, user_id integer, photo text, sync_timestamp integer, deleted integer)');
        }, function(error) {
            console.log('Transaction ERROR: ' + error.message);
        }, function() {
            console.log('Populated database OK');
        });
    }


    truncateBDD(){
        this._db.transaction(function(tx) {
            tx.executeSql('DELETE FROM distributeur');
            tx.executeSql('DELETE FROM pdv');
            tx.executeSql('DELETE FROM store_check');
            tx.executeSql('DELETE FROM user');
            tx.executeSql('DELETE FROM concurrent');
            tx.executeSql('DELETE FROM user_photo');
            main.screenManager.removePopin();
            main.updateManager.startUpdate();
        }, function(error) {
            main.screenManager.currentScreen.userValidActionError();
        }, function() {
            console.log('Populated database OK');
        });
    }


    /////SYNC ONLINE DATA

    insertUser(){
        if(main.sqliteManager.indexUser<main.updateManager.updateData.users.length){
            var pUser=main.updateManager.updateData.users[main.sqliteManager.indexUser];
            this._db.transaction(function(tx) {
                tx.executeSql('SELECT * FROM user WHERE id=?', [pUser.id], function(tx, rs) {
                    var query;
                    if(rs.rows.length>0){
                        query='UPDATE user SET id_statut=?, nom=?, prenom=?, email=?, login=?, password=?, tel=?, avatar=?, sync_timestamp=?, deleted=? WHERE id=?';
                        main.sqliteManager.db.transaction(function(tx) {
                            tx.executeSql(query, [pUser.id_statut, pUser.nom, pUser.prenom, pUser.email, pUser.login, pUser.password, pUser.tel, pUser.avatar, pUser.sync_timestamp, pUser.deleted, pUser.id]);
                            main.sqliteManager.indexUser=main.sqliteManager.indexUser+1;
                            main.sqliteManager.insertUser();
                        }, function(error) {
                            console.log('Transaction ERROR: ' + error.message);
                        }, function() {
                            console.log('Populated database OK');
                        });
                    }else{
                        query='INSERT INTO user (id, id_statut, nom, prenom, email, login, password, tel, avatar, sync_timestamp, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                        main.sqliteManager.db.transaction(function(tx) {
                            tx.executeSql(query, [pUser.id, pUser.id_statut, pUser.nom, pUser.prenom, pUser.email, pUser.login, pUser.password, pUser.tel, pUser.avatar, pUser.sync_timestamp, pUser.deleted]);
                            main.sqliteManager.indexUser=main.sqliteManager.indexUser+1;
                            main.sqliteManager.insertUser();
                        }, function(error) {
                            console.log('Transaction ERROR: ' + error.message);
                        }, function() {
                            console.log('Populated database OK');
                        });
                    }
                }, function(tx, error) {

                });
            }); 
        }else{
            //alert("sync user ok");
            this.insertUserPhoto();
        }
    }

    insertUserPhoto(){
        if(main.sqliteManager.indexPhotoUser<main.updateManager.updateData.photouser.length){
            var pUserPhoto=main.updateManager.updateData.photouser[main.sqliteManager.indexPhotoUser];
            this._db.transaction(function(tx) {
                tx.executeSql('SELECT * FROM user_photo WHERE id=?', [pUserPhoto.id], function(tx, rs) {
                    var query;
                    if(rs.rows.length>0){
                        query='UPDATE user_photo SET user_id=?, photo=?, sync_timestamp=?, deleted=? WHERE id=?';
                        main.sqliteManager.db.transaction(function(tx) {
                            tx.executeSql(query, [pUserPhoto.user_id, window.btoa(JSON.stringify(pUserPhoto.photo)), pUserPhoto.sync_timestamp, pUserPhoto.deleted, pUserPhoto.id]);
                            main.sqliteManager.indexPhotoUser=main.sqliteManager.indexPhotoUser+1;
                            main.sqliteManager.insertUserPhoto();
                        }, function(error) {
                            console.log('Transaction ERROR: ' + error.message);
                        }, function() {
                            console.log('Populated database OK');
                        });
                    }else{
                        query='INSERT INTO user_photo (id, user_id, photo, sync_timestamp, deleted) VALUES (?, ?, ?, ?, ?)';
                        main.sqliteManager.db.transaction(function(tx) {
                            tx.executeSql(query, [pUserPhoto.id, pUserPhoto.user_id, window.btoa(JSON.stringify(pUserPhoto.photo)), pUserPhoto.sync_timestamp, pUserPhoto.deleted]);
                            main.sqliteManager.indexPhotoUser=main.sqliteManager.indexPhotoUser+1;
                            main.sqliteManager.insertUserPhoto();
                        }, function(error) {
                            console.log('Transaction ERROR: ' + error.message);
                        }, function() {
                            console.log('Populated database OK');
                        });
                    }
                }, function(tx, error) {

                });
            });
        }else{
            //alert("sync user ok");
            this.insertDistributeur();
        }
    }

    insertDistributeur(){
        if(main.sqliteManager.indexDistributeur<main.updateManager.updateData.distributeur.length){
            var pDistributeur=main.updateManager.updateData.distributeur[main.sqliteManager.indexDistributeur];
            this._db.transaction(function(tx) {
                tx.executeSql('SELECT * FROM distributeur WHERE id=?', [pDistributeur.id], function(tx, rs) {
                    var query;
                    if(rs.rows.length>0){
                        query='UPDATE distributeur SET enseigne=?, picto=?, sync_timestamp=?, deleted=? WHERE id=?';
                        main.sqliteManager.db.transaction(function(tx) {
                            tx.executeSql(query, [pDistributeur.enseigne, pDistributeur.picto, pDistributeur.sync_timestamp, pDistributeur.deleted, pDistributeur.id]);
                            main.sqliteManager.indexDistributeur=main.sqliteManager.indexDistributeur+1;
                            main.sqliteManager.insertDistributeur();
                        }, function(error) {
                            console.log('Transaction ERROR: ' + error.message);
                        }, function() {
                            console.log('Populated database OK');
                        });
                    }else{
                        query='INSERT INTO distributeur (id, enseigne, picto, sync_timestamp, deleted) VALUES (?, ?, ?, ?, ?)';
                        main.sqliteManager.db.transaction(function(tx) {
                            tx.executeSql(query, [pDistributeur.id, pDistributeur.enseigne, pDistributeur.picto, pDistributeur.sync_timestamp, pDistributeur.deleted]);
                            main.sqliteManager.indexDistributeur=main.sqliteManager.indexDistributeur+1;
                            main.sqliteManager.insertDistributeur();
                        }, function(error) {
                            console.log('Transaction ERROR: ' + error.message);
                        }, function() {
                            console.log('Populated database OK');
                        });
                    }
                }, function(tx, error) {

                });
            }); 
        }else{
            //alert("sync distributeur ok");
            this.insertConcurrent();
        }
    }

    insertConcurrent(){
        if(main.sqliteManager.indexConcurrent<main.updateManager.updateData.concurrent.length){
            var pConcurrent=main.updateManager.updateData.concurrent[main.sqliteManager.indexConcurrent];
            this._db.transaction(function(tx) {
                tx.executeSql('SELECT * FROM concurrent WHERE id=?', [pConcurrent.id], function(tx, rs) {
                    var query;
                    if(rs.rows.length>0){
                        query='UPDATE concurrent SET nom=?, categorie=?, sync_timestamp=?, deleted=? WHERE id=?';
                        main.sqliteManager.db.transaction(function(tx) {
                            tx.executeSql(query, [pConcurrent.nom, pConcurrent.categorie, pConcurrent.sync_timestamp, pConcurrent.deleted, pConcurrent.id]);
                            main.sqliteManager.indexConcurrent=main.sqliteManager.indexConcurrent+1;
                            main.sqliteManager.insertConcurrent();
                        }, function(error) {
                            console.log('Transaction ERROR: ' + error.message);
                        }, function() {
                            console.log('Populated database OK');
                        });
                    }else{
                        query='INSERT INTO concurrent (id, nom, categorie, sync_timestamp, deleted) VALUES (?, ?, ?, ?, ?)';
                        main.sqliteManager.db.transaction(function(tx) {
                            tx.executeSql(query, [pConcurrent.id, pConcurrent.nom, pConcurrent.categorie, pConcurrent.sync_timestamp, pConcurrent.deleted]);
                            main.sqliteManager.indexConcurrent=main.sqliteManager.indexConcurrent+1;
                            main.sqliteManager.insertConcurrent();
                        }, function(error) {
                            console.log('Transaction ERROR: ' + error.message);
                        }, function() {
                            console.log('Populated database OK');
                        });
                    }
                }, function(tx, error) {

                });
            }); 
        }else{
            //alert("sync concurrent ok");
            this.insertPointdevente();
        }
    }

    insertPointdevente(){
        //alert(main.sqliteManager.indexPDV+"  "+main.updateManager.updateData.pointdevente.length);
        if(main.sqliteManager.indexPDV<main.updateManager.updateData.pointdevente.length){
            //alert("fuck");
            var pPointdevente=main.updateManager.updateData.pointdevente[main.sqliteManager.indexPDV];
            //alert(JSON.stringify(pPointdevente))
            this._db.transaction(function(tx) {

                tx.executeSql('SELECT * FROM pdv WHERE id=?', [pPointdevente.id], function(tx, rs) {
                    var query;
                    if(rs.rows.length>0){
                        //alert("exsit")
                        query='UPDATE pdv SET latitude=?, longitude=?, adresse=?, cp=?, ville=?, tel=?, contact=?, email=?, nom=?, id_distributeur=?, id_remote=?, id_weber=?, sync_timestamp=?, deleted=?, islocal=? WHERE id=?';
                        //main.mapManager.changePositionMarker(pPointdevente.id, pPointdevente.latitude, pPointdevente.longitude);
                        main.sqliteManager.db.transaction(function(tx) {
                            tx.executeSql(query, [pPointdevente.latitude, pPointdevente.longitude, pPointdevente.adresse, pPointdevente.cp, pPointdevente.ville, pPointdevente.tel, pPointdevente.contact, pPointdevente.email, pPointdevente.nom, pPointdevente.id_distributeur, pPointdevente.id_remote, pPointdevente.id_weber.toUpperCase(), pPointdevente.sync_timestamp, pPointdevente.deleted, 0, pPointdevente.id]);
                            
                            //main.mapManager.changePositionMarker(pPointdevente.id, pPointdevente.latitude, pPointdevente.longitude);

                            main.sqliteManager.indexPDV=main.sqliteManager.indexPDV+1;
                            main.sqliteManager.insertPointdevente();
                        }, function(error) {
                            console.log('Transaction ERROR: ' + error.message);
                        }, function() {
                            console.log('Populated database OK');
                        });
                    }else{
                        query='INSERT INTO pdv (id, latitude, longitude, adresse, cp, ville, tel, contact, email, nom, id_distributeur, id_remote, id_weber, sync_timestamp, deleted, islocal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'; 
                        if(main.mapManager.mapInitalized==true){
                            tx.executeSql('SELECT picto FROM distributeur WHERE id=?', [pPointdevente.id_distributeur], function(tx, rs) {
                                //main.mapManager.addMarker({"id":pPointdevente.id, "latitude":pPointdevente.latitude, "longitude":pPointdevente.longitude, "nom":pPointdevente.nom, "adresse":pPointdevente.adresse, "cp":pPointdevente.cp ,"ville":pPointdevente.ville, "picto":rs.rows.item(0).picto});
                            }, function(tx, error) {
                            });
                        }
                        main.sqliteManager.db.transaction(function(tx) {
                            tx.executeSql(query, [pPointdevente.id, pPointdevente.latitude, pPointdevente.longitude, pPointdevente.adresse, pPointdevente.cp, pPointdevente.ville, pPointdevente.tel, pPointdevente.contact, pPointdevente.email, pPointdevente.nom, pPointdevente.id_distributeur, pPointdevente.id_remote, pPointdevente.id_weber.toUpperCase(), pPointdevente.sync_timestamp, pPointdevente.deleted, 0]);
                            main.sqliteManager.indexPDV=main.sqliteManager.indexPDV+1;
                            main.sqliteManager.insertPointdevente();
                        }, function(error) {
                            console.log('Transaction ERROR: ' + error.message);
                        }, function() {
                            console.log('Populated database OK');
                        });
                    }
                }, function(tx, error) {

                });
            }); 
        }else{
            //alert("sync pdv ok");
            this.insertStorecheck();
        }                                                                                                                                                                                                                                                                                               
    }

    insertStorecheck(){
        if(main.sqliteManager.indexSC<main.updateManager.updateData.storecheck.length){
            var pStorecheck=main.updateManager.updateData.storecheck[main.sqliteManager.indexSC];
            this._db.transaction(function(tx) {
                tx.executeSql('SELECT * FROM store_check WHERE id=?', [pStorecheck.id], function(tx, rs) {
                    var query;
                    if(rs.rows.length>0){
                        query='UPDATE store_check SET timestamp=?, rapport=?, sync=?, alert=?, id_pdv=?, id_user=?, sync_timestamp=?, deleted=?, islocal=? WHERE id=?';
                        main.sqliteManager.db.transaction(function(tx) {
                            tx.executeSql(query , [pStorecheck.timestamp, window.btoa(JSON.stringify(pStorecheck.rapport)), pStorecheck.sync, pStorecheck.alert, pStorecheck.id_pdv, pStorecheck.id_user, pStorecheck.sync_timestamp, pStorecheck.deleted, 0, pStorecheck.id]);
                            main.sqliteManager.indexSC=main.sqliteManager.indexSC+1;
                            main.sqliteManager.insertStorecheck();
                        }, function(error) {
                            console.log('Transaction ERROR: ' + error.message);
                        }, function() {
                            console.log('Populated database OK');
                        });
                    }else{
                        query='INSERT INTO store_check (id, timestamp, rapport, sync, alert, id_pdv, id_user, sync_timestamp, deleted, islocal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                        main.sqliteManager.db.transaction(function(tx) {
                            tx.executeSql(query , [pStorecheck.id, pStorecheck.timestamp, window.btoa(JSON.stringify(pStorecheck.rapport)), pStorecheck.sync, pStorecheck.alert, pStorecheck.id_pdv, pStorecheck.id_user, pStorecheck.sync_timestamp, pStorecheck.deleted, 0]);
                            main.sqliteManager.indexSC=main.sqliteManager.indexSC+1;
                            main.sqliteManager.insertStorecheck();
                        }, function(error) {
                            console.log('Transaction ERROR: ' + error.message);
                        }, function() {
                            console.log('Populated database OK');
                        });
                    }
                }, function(tx, error) {

                });
            }); 
        }else{
            //alert("sync sc ok");
            main.sqliteManager.setDataSyncAllSuccess();
        }
    }




    ////////SYNC OFFLINE DATA

    insertNewStorecheck(pStorecheck){
        this._db.transaction(function(tx) {
            tx.executeSql('SELECT id FROM store_check ORDER BY id DESC LIMIT 1', [], function(tx, rs) {
                var newid;
                if(rs.rows.length>0){
                    newid=parseInt(rs.rows.item(0).id)+1000;
                }else{
                    newid=1000;
                }
                var query='INSERT INTO store_check (id, timestamp, rapport, sync, alert, id_pdv, id_user, sync_timestamp, deleted, islocal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                //alert(JSON.stringify(rs.rows.item(0)));
                tx.executeSql(query , [newid, pStorecheck.timestamp, window.btoa(JSON.stringify(pStorecheck.rapport)), pStorecheck.sync, pStorecheck.alert, pStorecheck.id_pdv, pStorecheck.id_user, pStorecheck.sync_timestamp, pStorecheck.deleted, 1]);
            }, function(tx, error) {

            });
        }, function(error) {
            console.log('Transaction ERROR: ' + error.message);
        }, function() {
            console.log('Populated database OK');
        });
    }

    selectSyncPDV(){
        this._db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM pdv WHERE islocal=?', [1], function(tx, rs) {
                var retour=new Array();
                for (var i = 0; i < rs.rows.length; i++){
                    retour.push({"id":rs.rows.item(i).id, "latitude":rs.rows.item(i).latitude, "longitude":rs.rows.item(i).longitude, "adresse":rs.rows.item(i).adresse, "cp":rs.rows.item(i).cp, "ville":rs.rows.item(i).ville, "tel":rs.rows.item(i).tel, "contact":rs.rows.item(i).contact, "email":rs.rows.item(i).email, "nom":rs.rows.item(i).nom, "id_distributeur":rs.rows.item(i).id_distributeur, "id_remote":rs.rows.item(i).id_remote, "id_weber":"", "sync_timestamp":rs.rows.item(i).sync_timestamp, "deleted":rs.rows.item(i).deleted});
                }

                main.sqliteManager.dataSync.pdv=retour;
                main.sqliteManager.selectSyncStorecheck();
            }, function(tx, error) {

            });
        }, function(error) {
            console.log('Transaction ERROR: ' + error.message);
        }, function() {
            console.log('Populated database OK');
        });
    }

    selectSyncStorecheck(){
        this._db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM store_check WHERE islocal=?', [1], function(tx, rs) {
                var retour=new Array();
                for (var i = 0; i < rs.rows.length; i++){
                    retour.push({"id":rs.rows.item(i).id, "timestamp":rs.rows.item(i).timestamp, "rapport":JSON.parse(window.atob(rs.rows.item(i).rapport)), "sync":rs.rows.item(i).sync, "alert":rs.rows.item(i).alert, "id_pdv":rs.rows.item(i).id_pdv, "id_user":rs.rows.item(i).id_user, "sync_timestamp":rs.rows.item(i).sync_timestamp, "deleted":rs.rows.item(i).deleted});
                }
                main.sqliteManager.dataSync.storecheck=retour;
                //alert(JSON.stringify(main.sqliteManager.dataSync))
                main.sqliteManager.getSyncStoreCheckSuccess();
            }, function(tx, error) {

            });
        }, function(error) {
            console.log('Transaction ERROR: ' + error.message);
        }, function() {
            console.log('Populated database OK');
        });
    }

    ////////SERVICE

    getPi(){
        this._db.transaction(function(tx) {
            tx.executeSql('SELECT pdv.id AS pdvid, pdv.adresse AS pdvadresse, pdv.cp AS pdvcp, pdv.ville AS pdvville, pdv.nom AS pdvnom, pdv.longitude AS pdvlongitude, pdv.latitude AS pdvlatitude, distributeur.picto AS dispicto FROM pdv LEFT JOIN distributeur ON pdv.id_distributeur=distributeur.id AND distributeur.deleted=0 WHERE pdv.deleted=0', [], function(tx, rs) {
                var retour=new Array();
                for (var i = 0; i < rs.rows.length; i++){
                    retour.push({"id":rs.rows.item(i).pdvid, "latitude":rs.rows.item(i).pdvlatitude, "longitude":rs.rows.item(i).pdvlongitude, "nom":rs.rows.item(i).pdvnom, "adresse":rs.rows.item(i).pdvadresse, "cp":rs.rows.item(i).pdvcp ,"ville":rs.rows.item(i).pdvville, "picto":rs.rows.item(i).dispicto});
                }
                main.mapManager.getPiSuccess({"result":retour});
            }, function(tx, error) {
                main.mapManager.getPiError();
            });
        }, function(error) {
            main.mapManager.getPiError();
        }, function() {
            console.log('Populated database OK');
        });

    }

    getDistributeur(){
        this._db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM distributeur WHERE deleted=0 ORDER BY enseigne ASC", [], function(tx, rs) {
                var distArray=new Array();
                for (var i = 0; i < rs.rows.length; i++){
                    distArray.push({"id":rs.rows.item(i).id, "enseigne":rs.rows.item(i).enseigne, "picto":rs.rows.item(i).picto});
                }
                main.screenManager.currentScreen.getDistributeurSuccessHandler({"result":distArray});
            }, function(tx, error) {
                main.screenManager.currentScreen.getDistributeurErrorHandler();
            });
        }, function(error) {
            main.screenManager.currentScreen.getDistributeurErrorHandler();
        }, function() {
            console.log('Populated database OK');
        });
    }

    getPiInfo(pParam){
        this._db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM concurrent WHERE categorie=1 AND deleted=0 ORDER BY nom ASC', [], function(tx, rs) {
                var concurrentArray1=new Array();
                for (var i = 0; i < rs.rows.length; i++){
                    concurrentArray1.push({'id':rs.rows.item(i).id, 'nom':rs.rows.item(i).nom});
                }
                main.sqliteManager.db.transaction(function(tx) {
                    tx.executeSql('SELECT * FROM concurrent WHERE categorie=2 AND deleted=0 ORDER BY nom ASC', [], function(tx, rs) {
                        var concurrentArray2=new Array();
                        for (var j = 0; j < rs.rows.length; j++){
                            concurrentArray2.push({'id':rs.rows.item(j).id, 'nom':rs.rows.item(j).nom});
                        }
                        main.sqliteManager.db.transaction(function(tx) {
                            tx.executeSql('SELECT store_check.id AS id, store_check.rapport AS rapport, store_check.timestamp AS timestamp, user.prenom AS prenom, user.nom AS nom FROM store_check LEFT JOIN user ON store_check.id_user= user.id AND user.deleted=0 WHERE store_check.id_pdv=? AND store_check.deleted=0 ORDER BY store_check.id DESC LIMIT 0,1', [pParam.id], function(tx, rs) {
                                if(rs.rows.length==0){
                                    main.dataManager.getPiInfoSuccess({'result':"nothing", "bbq":concurrentArray1, "plancha":concurrentArray2});
                                }else{
                                    main.dataManager.getPiInfoSuccess({'result':{"id":rs.rows.item(0).id, "rapport":JSON.parse(window.atob(rs.rows.item(0).rapport)), "timestamp":rs.rows.item(0).timestamp, "prenom":rs.rows.item(0).prenom, "nom":rs.rows.item(0).nom}, "bbq":concurrentArray1, "plancha":concurrentArray2});
                                }
                            }, function(tx, error) {
                                main.dataManager.getPiInfoError();
                            });
                        }, function(error) {
                            main.dataManager.getPiInfoError();
                        }, function() {
                            console.log('Populated database OK');
                        });
                    }, function(tx, error) {
                        main.dataManager.getPiInfoError();
                    });
                }, function(error) {
                    main.dataManager.getPiInfoError();
                }, function() {
                    console.log('Populated database OK');
                });           
            }, function(tx, error) {
                main.dataManager.getPiInfoError();
            });
        }, function(error) {
            main.dataManager.getPiInfoError();
        }, function() {
            console.log('Populated database OK');
        });
    }

    getDistributeurs(){
        this._db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM distributeur WHERE deleted=0 ORDER BY enseigne ASC", [], function(tx, rs) {
                var distArray=new Array();
                for (var i = 0; i < rs.rows.length; i++){
                    distArray.push({"id":rs.rows.item(i).id, "enseigne":rs.rows.item(i).enseigne, "picto":rs.rows.item(i).picto});
                }
                main.mapManager.getDistributeursSuccess({"result":distArray});
            }, function(tx, error) {
                main.mapManager.getDistributeursError();
            });
        }, function(error) {
            main.mapManager.getDistributeursError();
        }, function() {
            console.log('Populated database OK');
        });
    }

    getPhotoUser(){
        this._db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM user_photo WHERE deleted=0 ORDER BY id ASC", [], function(tx, rs) {
                var photoUserArray=new Array();
                for (var i = 0; i < rs.rows.length; i++){
                    photoUserArray.push({"id":rs.rows.item(i).id, "user_id":rs.rows.item(i).user_id, "photo":JSON.parse(window.atob(rs.rows.item(i).photo))});
                }
                main.screenManager.currentScreen.getPhotosUserSuccess({"result":photoUserArray});
            }, function(tx, error) {
                main.screenManager.currentScreen.getPhotosUserError();
            });
        }, function(error) {
            main.screenManager.currentScreen.getPhotosUserError();
        }, function() {
            console.log('Populated database OK');
        });
    }

    searchPDV(pParam){
        this._db.transaction(function(tx) {
            //alert(JSON.stringify(pParam))
            tx.executeSql("SELECT pdv.id AS pdvid, pdv.adresse AS pdvadresse, pdv.cp AS pdvcp, pdv.ville AS pdvville, pdv.tel AS pdvtel, pdv.contact AS pdvcontact, pdv.nom AS pdvnom, pdv.email AS pdvemail, pdv.longitude AS pdvlongitude, pdv.latitude AS pdvlatitude, distributeur.picto AS dispicto, distributeur.id AS disid FROM pdv LEFT JOIN distributeur ON pdv.id_distributeur=distributeur.id AND distributeur.deleted=0 WHERE pdv.cp=? AND pdv.deleted=0", [pParam.cp], function(tx, rs) {
            //tx.executeSql("SELECT pdv.id AS pdvid, pdv.adresse AS pdvadresse, pdv.cp AS pdvcp, pdv.ville AS pdvville, pdv.tel AS pdvtel, pdv.contact AS pdvcontact, pdv.nom AS pdvnom, pdv.email AS pdvemail, pdv.longitude AS pdvlongitude, pdv.latitude AS pdvlatitude, distributeur.picto AS dispicto FROM pdv LEFT JOIN distributeur ON pdv.id_distributeur=distributeur.id AND distributeur.deleted=0 WHERE pdv.cp=? AND pdv.id_distributeur=? AND pdv.deleted=0", [pParam.cp, pParam.enseigne], function(tx, rs) {
                var piArray=new Array();
                //alert(rs.rows.length);
                for (var i = 0; i < rs.rows.length; i++){
                    for(var l=0; l<main.sessionManager.listDistributeur.length; l++){
                        if(main.sessionManager.listDistributeur[l].id==rs.rows.item(i).disid){
                            piArray.push({'id' : rs.rows.item(i).pdvid, 'latitude' : rs.rows.item(i).pdvlatitude, 'longitude' : rs.rows.item(i).pdvlongitude, 'cp' : rs.rows.item(i).pdvcp, 'ville' : rs.rows.item(i).pdvville, 'adresse' : rs.rows.item(i).pdvadresse, 'tel' : rs.rows.item(i).pdvtel, 'contact' : rs.rows.item(i).pdvcontact, 'email' : rs.rows.item(i).pdvemail, 'web' : rs.rows.item(i).pdvnom, 'picto' : rs.rows.item(i).dispicto, 'enseigne' : main.sessionManager.listDistributeur[l]});
                        }
                    }
                }
                
                main.sqliteManager.db.transaction(function(tx) {
                    tx.executeSql("SELECT pdv.id AS pdvid, pdv.adresse AS pdvadresse, pdv.cp AS pdvcp, pdv.ville AS pdvville, pdv.tel AS pdvtel, pdv.contact AS pdvcontact, pdv.nom AS pdvnom, pdv.email AS pdvemail, pdv.longitude AS pdvlongitude, pdv.latitude AS pdvlatitude, distributeur.picto AS dispicto, distributeur.id AS disid FROM pdv LEFT JOIN distributeur ON pdv.id_distributeur=distributeur.id AND distributeur.deleted=0 WHERE pdv.ville LIKE ? AND pdv.deleted=0", ['%'+pParam.cp+'%'], function(tx, rs) {
                        //alert(rs.rows.length);
                        for (var j = 0; j < rs.rows.length; j++){
                            for(var k=0; k<main.sessionManager.listDistributeur.length; k++){
                                if(main.sessionManager.listDistributeur[k].id==rs.rows.item(j).disid){
                                    piArray.push({'id' : rs.rows.item(j).pdvid, 'latitude' : rs.rows.item(j).pdvlatitude, 'longitude' : rs.rows.item(j).pdvlongitude, 'cp' : rs.rows.item(j).pdvcp, 'ville' : rs.rows.item(j).pdvville, 'adresse' : rs.rows.item(j).pdvadresse, 'tel' : rs.rows.item(j).pdvtel, 'contact' : rs.rows.item(j).pdvcontact, 'email' : rs.rows.item(j).pdvemail, 'web' : rs.rows.item(j).pdvnom, 'picto' : rs.rows.item(j).dispicto, 'enseigne' : main.sessionManager.listDistributeur[k]});
                                    break;
                                }
                            }
                        }

                        //main.screenManager.currentScreen.searchSuccessHandler({'result':piArray});
                        main.sqliteManager.db.transaction(function(tx) {
                            tx.executeSql("SELECT pdv.id AS pdvid, pdv.adresse AS pdvadresse, pdv.cp AS pdvcp, pdv.ville AS pdvville, pdv.tel AS pdvtel, pdv.contact AS pdvcontact, pdv.nom AS pdvnom, pdv.email AS pdvemail, pdv.longitude AS pdvlongitude, pdv.latitude AS pdvlatitude, distributeur.picto AS dispicto, distributeur.id AS disid FROM pdv LEFT JOIN distributeur ON pdv.id_distributeur=distributeur.id AND distributeur.deleted=0 WHERE pdv.id_weber LIKE ? AND pdv.deleted=0", ['%'+pParam.cp.toUpperCase()+'%'], function(tx, rs) {
                                //alert(rs.rows.length);
                                for (var n = 0; n < rs.rows.length; n++){
                                    for(var m=0; m<main.sessionManager.listDistributeur.length; m++){
                                        if(main.sessionManager.listDistributeur[m].id==rs.rows.item(n).disid){
                                            piArray.push({'id' : rs.rows.item(n).pdvid, 'latitude' : rs.rows.item(n).pdvlatitude, 'longitude' : rs.rows.item(n).pdvlongitude, 'cp' : rs.rows.item(n).pdvcp, 'ville' : rs.rows.item(n).pdvville, 'adresse' : rs.rows.item(n).pdvadresse, 'tel' : rs.rows.item(n).pdvtel, 'contact' : rs.rows.item(n).pdvcontact, 'email' : rs.rows.item(n).pdvemail, 'web' : rs.rows.item(n).pdvnom, 'picto' : rs.rows.item(n).dispicto, 'enseigne' : main.sessionManager.listDistributeur[m]});
                                            break;
                                        }
                                    }
                                }

                                main.screenManager.currentScreen.searchSuccessHandler({'result':piArray});
                            }, function(tx, error) {
                                main.screenManager.currentScreen.searchErrorHandler();
                            });
                        }, function(error) {
                            main.screenManager.currentScreen.searchErrorHandler();
                        }, function() {
                            console.log('Populated database OK');
                        });
                    }, function(tx, error) {
                        main.screenManager.currentScreen.searchErrorHandler();
                    });
                }, function(error) {
                    main.screenManager.currentScreen.searchErrorHandler();
                }, function() {
                    console.log('Populated database OK');
                });

            }, function(tx, error) {
                main.screenManager.currentScreen.searchErrorHandler();
            });
        }, function(error) {
            main.screenManager.currentScreen.searchErrorHandler();
        }, function() {
            console.log('Populated database OK');
        });
    }

    getConcurrent(pParam){
        this._db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM concurrent WHERE categorie=? AND deleted=0 ORDER BY nom ASC", [pParam.id_concurrent], function(tx, rs) {
                var concurrentArray=new Array();
                for (var i = 0; i < rs.rows.length; i++){
                    concurrentArray.push({"id":rs.rows.item(i).id, "nom":rs.rows.item(i).nom});
                }
               // main.mapManager.getPiSuccess({"result":concurrentArray});
            }, function(tx, error) {
                //main.mapManager.getPiError();
            });
        }, function(error) {
            //main.mapManager.getPiError();
        }, function() {
            console.log('Populated database OK');
        });
    }

    setPDVInfo(pParam){
        if(pParam.create=="true"){
            this._db.transaction(function(tx) {
                tx.executeSql('SELECT id FROM pdv ORDER BY id DESC LIMIT 1', [], function(tx, rs) {
                    var newid;
                    if(rs.rows.length>0){
                        newid=parseInt(rs.rows.item(0).id)+1000;
                    }else{
                        newid=1000;
                    }
                    //tx.executeSql("INSERT INTO pdv (id, latitude, longitude, adresse, cp, ville, tel, contact, email, nom, id_distributeur, id_remote, sync_timestamp, deleted, islocal) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [newid, pParam.latitude, pParam.longitude, pParam.adresse, pParam.cp, pParam.ville, pParam.tel, pParam.contact, pParam.email, pParam.nom, pParam.id_distributeur, pParam.id_remote, 0, 0, 1], function(tx, rs) {
                    tx.executeSql("INSERT INTO pdv (id, latitude, longitude, adresse, cp, ville, nom, id_distributeur, id_remote, sync_timestamp, deleted, islocal) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [newid, pParam.latitude, pParam.longitude, pParam.adresse, pParam.cp, pParam.ville, pParam.nom, pParam.id_distributeur, pParam.id_remote, 0, 0, 1], function(tx, rs) {
                        main.screenManager.currentScreen.btCreateSuccessHandler({'result' : "success", "id" : newid});
                    }, function(tx, error) {
                        main.screenManager.currentScreen.btCreateErrorHandler();
                    });
                }, function(tx, error) {

                });
            }, function(error) {
                main.screenManager.currentScreen.btCreateErrorHandler();
            }, function() {
                console.log('Populated database OK');
            });
        }else{
            this._db.transaction(function(tx) {
                //tx.executeSql("UPDATE pdv SET adresse=?, cp=?, ville=?, tel=?, contact=?, email=?, nom=?, islocal=? WHERE id=?", [pParam.adresse, pParam.cp, pParam.ville, pParam.tel, pParam.contact, pParam.email, pParam.nom, 1, pParam.id], function(tx, rs) {
                tx.executeSql("UPDATE pdv SET adresse=?, cp=?, ville=?, nom=?, islocal=? WHERE id=?", [pParam.adresse, pParam.cp, pParam.ville, pParam.nom, 1, pParam.id], function(tx, rs) {
                    main.screenManager.currentScreen.btCreateSuccessHandler({'result': "success"});
                }, function(tx, error) {
                    main.screenManager.currentScreen.btCreateErrorHandler();
                });
            }, function(error) {
                main.screenManager.currentScreen.btCreateErrorHandler();
            }, function() {
                console.log('Populated database OK');
            });
        }
    }

    getMySCgetMySC(pParam){
        this._db.transaction(function(tx) {
            tx.executeSql("SELECT id_pdv FROM store_check WHERE id_user=? AND deleted=0 ORDER BY id DESC", [pParam.id_user], function(tx, rs) {
                main.sqliteManager.piArray=new Array();

                var idArray=new Array();
                for (var i = 0; i < rs.rows.length; i++){
                    idArray.push(rs.rows.item(i).id_pdv);
                }

                main.sqliteManager.resultArray=new Array();

                for(i=0; i<idArray.length; i++){
                    var exist=false;
                    for(var j=0; j< main.sqliteManager.resultArray.length;j++){
                        if(idArray[i]==main.sqliteManager.resultArray[j]){
                            exist=true;
                            break;
                        }
                    }
                    if(exist==false){
                        main.sqliteManager.resultArray.push(idArray[i]);
                    }
                }

                main.sqliteManager.mySC=0;
                main.sqliteManager.selectMySC();
            }, function(tx, error) {
                main.screenManager.currentMenu.searchErrorHandler();
            });
        }, function(error) {
            main.screenManager.currentMenu.searchErrorHandler();
        }, function() {
            console.log('Populated database OK');
        });
    }

    selectMySC(){
        if(main.sqliteManager.mySC<main.sqliteManager.resultArray.length){
            this._db.transaction(function(tx) {
                tx.executeSql("SELECT pdv.id AS pdvid, pdv.adresse AS pdvadresse, pdv.cp AS pdvcp, pdv.ville AS pdvville, pdv.tel AS pdvtel, pdv.contact AS pdvcontact, pdv.nom AS pdvnom, pdv.email AS pdvemail, pdv.longitude AS pdvlongitude, pdv.latitude AS pdvlatitude, distributeur.picto AS dispicto FROM pdv LEFT JOIN distributeur ON pdv.id_distributeur=distributeur.id AND distributeur.deleted=0 WHERE pdv.id=? AND pdv.deleted=0", [main.sqliteManager.resultArray[main.sqliteManager.mySC]], function(tx, rs) {
                    if(rs.rows.length>0){
                        main.sqliteManager.piArray.push({'id' : rs.rows.item(0).pdvid, 'latitude' : rs.rows.item(0).pdvlatitude, 'longitude' : rs.rows.item(0).pdvlongitude, 'cp' : rs.rows.item(0).pdvcp, 'ville' : rs.rows.item(0).pdvville, 'adresse' : rs.rows.item(0).pdvadresse, 'tel' : rs.rows.item(0).pdvtel, 'contact' : rs.rows.item(0).pdvcontact, 'email' : rs.rows.item(0).pdvemail, 'web' : rs.rows.item(0).pdvnom, 'picto' : rs.rows.item(0).dispicto});
                    }

                    main.sqliteManager.mySC=main.sqliteManager.mySC+1;
                    main.sqliteManager.selectMySC();
                }, function(tx, error) {
                    main.screenManager.currentMenu.searchErrorHandler();
                });
            }, function(error) {
                main.screenManager.currentMenu.searchErrorHandler();
            }, function() {
                console.log('Populated database OK');
            });
        }else{
            main.screenManager.currentMenu.searchSuccessHandler({'result':main.sqliteManager.piArray});
        }
    }

    setPDVGPS(pParam){
        this._db.transaction(function(tx) {
            tx.executeSql("UPDATE pdv SET latitude=?, longitude=?, islocal=? WHERE id=?", [pParam.clat.toString(), pParam.clng.toString(), 1, pParam.id_pdv], function(tx, rs) {
                main.screenManager.currentScreen.setGPSSuccessHandler({'result' :"success"});
            }, function(tx, error) {
                main.screenManager.currentScreen.setGPSErrorHandler();
            });
        }, function(error) {
            main.screenManager.currentScreen.setGPSErrorHandler();
        }, function() {
            console.log('Populated database OK');
        });
    }

    //////////////SYNC

    getDataSync(){
        this._dataSync={};
        this.selectSyncPDV();
    }

    getSyncStoreCheckSuccess(){
        main.updateManager.getDataSyncSucess(this._dataSync);
    }

    cleanSync(){
        //alert("clean")
        this._db.transaction(function(tx) {
            for(var i=0; i<main.sqliteManager.dataSync.storecheck.length; i++){
                tx.executeSql('DELETE FROM store_check WHERE id=?', [main.sqliteManager.dataSync.storecheck[i].id]);
            }
            for(i=0; i<main.sqliteManager.dataSync.pdv.length; i++){
                tx.executeSql('DELETE FROM pdv WHERE id=?', [main.sqliteManager.dataSync.pdv[i].id]);
                if(main.mapManager.mapInitalized==true){
                    main.mapManager.removeMarker(main.sqliteManager.dataSync.pdv[i].id);
                }
            }
            //alert("clean success")
            main.updateManager.cleanSyncSuccess();
        }, function(error) {
            //alert("toto")
            console.log('Transaction ERROR: ' + error.message);
        }, function() {
            console.log('Populated database OK');
        });
    }

    setDataSync(){
        //alert("maintenant")
        main.sqliteManager.indexUser=0;
        main.sqliteManager.indexDistributeur=0;
        main.sqliteManager.indexPhotoUser=0;
        main.sqliteManager.indexConcurrent=0;
        main.sqliteManager.indexPDV=0;
        main.sqliteManager.indexSC=0;
        this.insertUser();
    }
    setDataSyncAllSuccess(){
        //alert("finish")
        main.updateManager.dataSyncSuccess();
    }

    get dataSync(){
        return this._dataSync;
    }

    get db(){
        return this._db;
    }

    get indexUser(){
        return this._indexUser;
    }

    set indexUser(pIndex){
        this._indexUser=pIndex;
    }

    get indexDistributeur(){
        return this._indexDistributeur;
    }

    set indexDistributeur(pIndex){
        this._indexDistributeur=pIndex;
    }

    get indexPhotoUser(){
        return this._indexPhotoUser;
    }

    set indexPhotoUser(pIndex){
        this._indexPhotoUser=pIndex;
    }

    get indexConcurrent(){
        return this._indexConcurrent;
    }

    set indexConcurrent(pIndex){
        this._indexConcurrent=pIndex;
    }

    get indexPDV(){
        return this._indexPDV;
    }

    set indexPDV(pIndex){
        this._indexPDV=pIndex;
    }

    get indexSC(){
        return this._indexSC;
    }

    set indexSC(pIndex){
        this._indexSC=pIndex;
    }

    get mySC(){
        return this._mySC;
    }

    set mySC(pIndex){
        this._mySC=pIndex;
    }

    get resultArray(){
        return this._resultArray;
    }

    set resultArray(pArray){
        this._resultArray=pArray;
    }

    get piArray(){
        return this._piArray;
    }

    set piArray(pArray){
        this._piArray=pArray;
    }
}