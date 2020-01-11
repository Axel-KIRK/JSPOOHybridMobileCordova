"use strict";
/** Class du manager de l'application. */
class ScreenMyCheck extends AbstractScreen{
	/**
     * Créér le manager de l'application.
     */
    constructor(pType) {
        super(pType);
        this._elements=null;
    }

    init(){
        super.init();

        $("#screen-geolocalisation-manual-result_bloc-store_arrow-top").css("visibility","hidden");
        $("#screen-geolocalisation-manual-result_bloc-store_arrow-bottom").css("visibility","hidden");

        $('#screen-geolocalisation-manual-result_bloc-store_list_elements').empty();
        if(main.sessionManager.searchMyPDV.length>0){
            for(var i=0; i<main.sessionManager.searchMyPDV.length; i++){
                var element=$('<div class="screen-geolocalisation-manual-result_bloc-store_list_element"><div class="screen-geolocalisation-manual-result_bloc-store_list_element_logo"><img src="'+cordova.file.dataDirectory+UpdateManager.FOLDER_DISTRIBUTEUR+'/'+main.sessionManager.searchMyPDV[i].picto+'" /></div><div class="screen-geolocalisation-manual-result_bloc-store_list_element_bt-plus"></div><div class="screen-geolocalisation-manual-result_bloc-store_list_element_detail"><div class="screen-geolocalisation-manual-result_bloc-store_list_element_detail_text-ville">'+main.sessionManager.searchMyPDV[i].ville+'</div><div class="screen-geolocalisation-manual-result_bloc-store_list_element_detail_spacer"></div><div class="screen-geolocalisation-manual-result_bloc-store_list_element_detail_text-addresse-1">'+main.sessionManager.searchMyPDV[i].adresse+'</div><div class="screen-geolocalisation-manual-result_bloc-store_list_element_detail_text-addresse-2">'+main.sessionManager.searchMyPDV[i].cp+' '+main.sessionManager.searchMyPDV[i].ville+'</div><div class="screen-geolocalisation-manual-result_bloc-store_list_element_detail_text-phone">Tél.: <span class="screen-geolocalisation-manual-result_bloc-store_list_element_detail_text-phone_value">'+main.sessionManager.searchMyPDV[i].tel+'</span></div><div class="screen-geolocalisation-manual-result_bloc-store_list_element_detail_spacer"></div><div class="screen-geolocalisation-manual-result_bloc-store_list_element_detail_text-contact">Contact: <span class="screen-geolocalisation-manual-result_bloc-store_list_element_detail_text-contact_value">'+main.sessionManager.searchMyPDV[i].contact+'</span></div><div class="screen-geolocalisation-manual-result_bloc-store_list_element_detail_text-mail">'+main.sessionManager.searchMyPDV[i].email.replace(";", "<br />")+'</div><div class="screen-geolocalisation-manual-result_bloc-store_list_element_detail_spacer"></div><div class="screen-geolocalisation-manual-result_bloc-store_list_element_detail_text-web">'+main.sessionManager.searchMyPDV[i].web+'</div></div></div>')
                element.find('.screen-geolocalisation-manual-result_bloc-store_list_element_bt-plus').data().pdv=JSON.stringify(main.sessionManager.searchMyPDV[i]);
                $('#screen-geolocalisation-manual-result_bloc-store_list_elements').append(element);
            }

            this._elements=$(".screen-geolocalisation-manual-result_bloc-store_list_element");
            this._elements.each(function( index ) {
                var parent=$(this);
                var logo=parent.find(".screen-geolocalisation-manual-result_bloc-store_list_element_logo");
                var detail=parent.find(".screen-geolocalisation-manual-result_bloc-store_list_element_detail");
                var plus=parent.find(".screen-geolocalisation-manual-result_bloc-store_list_element_bt-plus");
                $(this).find(".screen-geolocalisation-manual-result_bloc-store_list_element_logo img").on("load",function(){ 
                    detail.addClass("show");
                    /*parent.data("minheight",parent.height()-detail.height())
                    parent.data("maxheight",parent.height())
                    if(parent.index()==0){
                        parent.height(parent.data("maxheight"));
                        detail.addClass("show");
                    }else{
                        parent.height(parent.data("minheight"));
                        detail.removeClass("show");
                    }
                    parent.addClass("animate");
                    var btLogo=new SimpleButton(logo, main.screenManager.currentScreen.logoUpHandler);*/
                    var btPlus=new SimpleButton(plus, main.screenManager.currentScreen.plusUpHandler);
              })
            });
        }else{
            $("#screen-geolocalisation-manual-result_bloc-store_arrow-top").css("visibility","hidden");
            $("#screen-geolocalisation-manual-result_bloc-store_arrow-bottom").css("visibility","hidden");
            $('#screen-geolocalisation-manual-result_bloc-store_list_elements').append('<br /><br /><div id="screen-geolocalisation-manual-result_no-result">Pas de résultat</div>');
        }
    }

    logoUpHandler(e){
        main.screenManager.currentScreen.openEnseigne($(this).parent(".screen-geolocalisation-manual-result_bloc-store_list_element").index());
    }

    openEnseigne(pIndex){
        this._elements.each(function( index ) {
            var detail=$(this).find('.screen-geolocalisation-manual-result_bloc-store_list_element_detail');
            detail.addClass("animate");
            if(index==pIndex){
                $(this).height($(this).data("maxheight"));
                detail.addClass("show");
            }else{
                $(this).height($(this).data("minheight"));
                detail.removeClass("show");
            }
        });
    }

    plusUpHandler(e){
        main.sessionManager.currentPDV=JSON.parse($(this).data().pdv);
        main.dataManager.getPiInfo();
    }

    removeScreen(){
        super.removeScreen();
    }
}