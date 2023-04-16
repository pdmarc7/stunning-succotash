/* Modal Constructor */
    function buildModal(modal_body, modalId, size){
        return createModal(modalId).append(
            modalDialog(size).append(
                modalContent().append(
                    modalBody().append(
                        modal_body
                    ).attr({
                        "id": modalId+"Body"
                    })
                )
            )
        )
    }

    function createModal(modalId){
        return div().addClass("modal fade").attr({
            "data-bs-backdrop":"static",
            "data-bs-keyboard":"false", 
            "id": modalId, 
            "tabindex":"-1", 
            "aria-labelledby":`${modalId}Label`, 
            "aria-hidden":"true",
        })
    }

    function modalDialog(size){
        /* 
            sm - small modals
            lg - large modals
            xl - extra large modals 

        */
        if (size){
            return div().addClass(`modal-dialog modal-${size} modal-dialog-centered modal-dialog-scrollable`)
        } else {
            //default modal size
            return div().addClass(`modal-dialog modal-dialog-centered modal-dialog-scrollable`)
        }

    }

    function modalContent(){
        return div().addClass("modal-content")
    }

    function modalBody(){
        return div().addClass("modal-body")
    }

    function modalBackBtn(target){
        return div().addClass("row").append(
                div().addClass("col d-flex justify-content-start my-2").append(
                    $("<button>").addClass("btn shadow-sm").attr({
                        "type":"button",
                        "data-bs-toggle":"modal", 
                        "data-bs-target": target
                    }).text("Back")
                )
            )
    }

    function modalClose(closeEvent){
        return div().addClass("col-12 d-flex justify-content-end").append(
                icon("x-circle-fill").attr({
                    "data-bs-dismiss":"modal"
                }).on("click", closeEvent).css({
                    "cursor": "pointer",
                    "max-width": "35px"
                })
            )
        
    }

    /*function modalLogo(){
        return div().addClass("row").append(
            div().addClass("col d-flex justify-content-center my-3").append(
                img("event-logos/favicon-dark-o.svg").attr({
                    "id": "modal-logo-prim"
                })
            )
        )
    }*/
/* Modal Constructor */

/* Modal State Functions */
    function loadingView(message){
        return div().addClass("d-flex align-items-center justify-content-center").append(
            row().addClass("flex-grow-1").append(
                div().addClass('col-12 my-3').append(
                    /*div().addClass("d-flex mb-4 justify-content-between").append(
                        img("event-logos/favicon-dark-o.svg").addClass("img-fluid").attr({
                            
                        }).css({
                            "max-width": "80px",
                        }),
                    ),*/

                    $("<div>", {"class": "text-center mt-3"}).append(
                        $("<div>", {"class": "spinner-border", "role":"status"}).append(
                            $("<span>", {"class": "visually-hidden"}).text("Loading ...")    
                        ).css({"color": themeColor, "font-family": "futura-book-font", "width": "40px", "height": "40px"})
                    ),

                    $("<p>", {"class": "fs-6 text-center mt-3"}).html(message).css({"color": themeColor, "font-family": "futura-book-font", "letter-spacing": "0.3px"}).attr({
                        "id": "loadingViewText"
                    })
                )
            ),
        )
    }

    function errorView(message){
        return div().addClass("d-flex align-items-center justify-content-center").append(
            row().addClass("flex-grow-1").append(
                div().addClass('col-12 my-3').append(
                    /*div().addClass("d-flex mb-4 justify-content-between").append(
                        img("event-logos/favicon-dark-o.svg").addClass("img-fluid").attr({

                        }).css({
                            "max-width": "80px",
                        }),
                    ),*/

                    div().addClass("d-flex justify-content-center").append(
                        icon("exclamation-circle").css({
                            "font-size": "7rem"
                        })
                    ),

                    $("<p>", {"class": "fs-6 text-center mt-3 px-3"}).html(message).css({"color": themeColor, "font-family": "futura-book-font", "letter-spacing": "0.3px"}).attr({
                        "id": "loadingViewText"
                    })
                )
            ),
        )
    }

    function successView(message){

        return div().addClass("d-flex align-items-center justify-content-center").append(
            row().addClass("flex-grow-1").append(
                div().addClass('col-12 my-3').append(
                    /*div().addClass("d-flex mb-4 justify-content-between").append(
                        img("event-logos/favicon-dark-o.svg").addClass("img-fluid").attr({

                        }).css({
                            "max-width": "80px",
                        }),

                    ),*/

                    div().addClass("d-flex justify-content-center").append(
                        icon("check-circle").css({
                            "font-size": "7rem"
                        })
                    ),

                    $("<p>", {"class": "fs-6 text-center mt-0 px-3 mb-0"}).html(message).css({"color": themeColor, "font-family": "futura-book-font", "letter-spacing": "0.3px"}).attr({
                        "id": "loadingViewText"
                    })
                )
            ),
        )
    }
/* Modal State Functions */


/* User Nav Modal */
    function navDivider(navOption){
        if (navOption["divider"] == true){
            return div().addClass("px-3").append(
                divider().css({
                    "background-color": "lavender"
                }), 
            )
        } else {
            return null
        }
    }

    function navModalOptions(options){
        navOptions = []

        for (var navOption of options){
            navOptions.push(
                div().addClass("row mt-0 mb-3").append(
                    navDivider(navOption),

                    div().addClass("col d-flex justify-content-start px-3 profile-nav mb-0 align-items-center").append(
                        navOption["icon"],

                        p(navOption["text"]).addClass("fs-6 align-self-center mt-0 mb-0 mx-3").css({
                            "letter-spacing": "0.5px"
                        })
                    ).on("click", navOption["event"])
                )
            )
        }

        return navOptions
    }


    function navModalBody(options){
        return div().addClass("px-3 py-2 auto").append(
            modalClose().addClass("mb-3"),
            navModalOptions(options)
        )
    }

    function navModal(options){
        return createModal("navigationModal").append(
            modalDialog("sm").append(
                modalContent().append(
                    modalBody().append(
                        navModalBody(options)
                    )
                )
            )
        )
    }
/* User Nav Modal */