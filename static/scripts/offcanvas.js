/* OffCanvas Constructor */
    function createOffcanvas(offcanvasId, body, direction, static=false){
        if (static){
            return div().addClass(`offcanvas ${direction}`).attr({
                "id": offcanvasId,
                "data-bs-backdrop": "static"
            }).append(
                //offcanvasHeader(offcanvasId), 
                offcanvasBody(body)
            )            
        }

        return div().addClass(`offcanvas ${direction}`).attr({
            "id": offcanvasId,
        }).append(
            //offcanvasHeader(offcanvasId), 
            offcanvasBody(body)
        )
    }

    function offCanvasClose(){
        return icon("x-circle").attr({
                "data-bs-dismiss": "offcanvas"
            }).css({
                "cursor": "pointer"
            })
    }

    function offcanvasHeader(offcanvasId){
        return div().addClass("offcanvas-header").append(
            /*btn(null, "close").attr({
                "data-bs-dismiss": "offcanvas"
            })*/
            div().addClass("col-12 d-flex justify-content-between mb-4").append(
                div().addClass("flex-grow-1").append(
                img("event-logos/favicon-dark-o.svg").addClass('img-fluid').attr({

                }).css({
                    "max-width": "90px"
                })),

                btn(null, "yaniko-close").attr({
                    "data-bs-dismiss": "offcanvas"
                }).css({
                    "max-width": "30px"
                })
            ),
        ).addClass("my-0").css('min-width', '100%');
    }

    function offcanvasBody(body){
        return div().addClass("offcanvas-body p-0").append(body)
    } 
/* OffCanvas Constructor */

function loadingContainer(message){
    return [
        $("<div>", {"class": "text-center"}).append(
            $("<div>", {"class": "spinner-border", "role":"status"}).append(
              $("<span>", {"class": "visually-hidden"}).text("Loading ...")    
            ).css({"color": themeColor, "font-family": "futura-book-font", "width": "40px", "height": "40px"})
        ),

        $("<p>", {"class": "fs-6 text-center mt-3"}).html(message).css({"color": themeColor, "font-family": "futura-book-font", "letter-spacing": "0.3px"})
    ]
}

function successContainer(message){
    return [
        div().addClass("d-flex justify-content-center").append(
            img("event-logos/success-message.svg").addClass("img-fluid").attr({
                
            }).css({
                "max-width": "90px",
            })
        ),

        $("<p>", {"class": "fs-6 text-center mt-3 px-3"}).html(message).css({"color": themeColor, "font-family": "futura-book-font", "letter-spacing": "0.3px"}).attr({
            "id": "loadingViewText"
        })
    ]
}

function smallAd(){
    return [
        div().addClass("col-12").append(
          $("<p>", {"class": "form-text text-center"}).html(`Powered By`).css({"color": themeColor, "font-family": "futura-book-font"})
        ),
        div().addClass("col-12").addClass("d-flex justify-content-center").append(
            img("event-logos/favicon-dark-o.svg").attr({
                "id": "modal-logo-loading"
            })
        )
    ]
}

function offcanvasLoadingView(message){
    return div().addClass("d-flex flex-column align-items-center justify-content-center").append(
        /*col(null, 12).addClass("d-flex justify-content-center px-4 py-3").append(
            img("event-logos/favicon-dark-o.svg", "120px")
        ),*/

        col(null, 12).addClass("flex-grow-1 d-flex justify-content-center flex-column").append(
            loadingContainer(message),
        ),

        col(null, 12).addClass("mb-3").append(
            smallAd()
        )
    ).css({
        "height": "100vh"
    })
}


function offcanvasResponse (message, success, offCanvasId){
    $(`#${offCanvasId} > .offcanvas-body`).fadeOut(500, function(){
        $(this).empty().append(
            (function (){
                if (success){
                    return offcanvasSuccessView(message)
                } else {
                    return offcanvasErrorView(message)
                }
            })()
        )
    }).fadeIn(500)
}