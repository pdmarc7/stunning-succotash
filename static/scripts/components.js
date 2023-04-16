
/* HTML ELEMENTS*/
    const div = function(){
        //standard div
        return $('<div>');
    }


    const container = function(){
        return div().addClass("container")
    }
            
    const row = function(){
        //standard row
        return div().addClass('row');
    }

    const rowmb4 = function(){
        //row with mb-4 margin
        return div().addClass('row mb-4');
    }

    const col6lg = function(){
        //bootstrap col-lg-6
        return div().addClass('col-lg-6');
    }

    const col6sm = function(){
        //bootstrap col-lg-6
        return div().addClass('col-sm-6');
    }

    const col = function(breakpoint=null, size=null){
        if (breakpoint == null && size == null){
            //standard col
            return div().addClass('col');
        } else if (breakpoint == null ){
            return div().addClass(`col-${size}`);
        }

        //custom col
        return div().addClass(`col-${breakpoint}-${size}`);
    }

    const btn = function(btnText, btnType=null){
        if (btnType == "close"){
            return $("<button>").addClass("btn-close")
        } else if (btnType == "yaniko-close"){
            return img("event-logos/btn-close.svg", "40px").css({
                "cursor": "pointer"
            })
        } else if (btnType == "yaniko-white-close"){
            return img("event-logos/btn-close-white.svg", "40px").css({
                "cursor": "pointer"
            })
        } else if (btnType == "yaniko-red-close"){
            return img("event-logos/btn-close-red.svg", "40px").css({
                "cursor": "pointer"
            })
        }

        return $("<button>").addClass("btn").html(btnText)
    }

    function img(src ,maxWidth, extend=true){

        if(extend){
            if (src.split("/")[0] != "static"){
                src = "static/"+src
            }
        }

        return $("<img>").addClass("img-fluid").attr({
            "src": src
        }).css({
            "max-width": maxWidth
        }).attr({
            "draggable": "false"
        })
    }


    function p(text, color, font_size){
        return $("<p>").html(text).css({
            "color": color,
            "font-family": "futura-regular",
            "font-size": font_size,
            "letter-spacing": "0.3px"
        }).addClass("m-0")
    }

    function h2(){
        return $("<h2>")
    }

    function fontawesome(icon_type, name){
        return $("<i>").addClass(`${icon_type} ${name} m-0`).css({
            "font-size": "1.8rem"
        })
    }

    function a(htmlText, link){
        return $("<a>").html(htmlText).css({
            textDecoration: "none",
            color: "none",
            "cursor": "pointer"
        }).attr({
            "href": link
        })
    }



    function manipulateSpace(targetId, content, afterFunc=null, speed=null){

        if (speed == null){
            speed = 500
        }

        return $(`#${targetId}`).fadeOut(speed, function(){
            $(this).empty().append(
                content
            )

            if (afterFunc != null){
                afterFunc()
            }
        }).fadeIn(speed)
    }
/* HTML ELEMENTS*/


/* Utility Functions */

    const iconBtn = function(btnText, fontawesomeName, btnfontFamily){
        return  btn(
            flexbox().addClass("align-items-center justify-content-center").append(
                p(btnText).addClass("").css({
                    "font-family": btnfontFamily,
                    "letter-spacing": "0.5px",
                }),
                fontawesome("fas", fontawesomeName).addClass("ms-2")
            ).css({
                "width": "100%"
            })
        )
    }

    function roundTo(value, places){
        var power = Math.pow(10, places);
        return Math.round(value * power) / power;
    }
    
    function copyFunc(imgId, textId, copyText, targetId){
        return $("<div>").addClass("mx-auto mb-1 d-flex justify-content-start align-items-center").append(
            $("<p>").addClass("fs-6 m-0").text(copyText).css({
                "font-family": "futura-regular",
                "color": "midnightblue",
            }).attr({
                "id": textId
            }),

            img("event-logos/copy-0.svg").addClass("mx-3").attr({
                "id": imgId,
            }).css({
                "max-width": "30px",
                "cursor": "pointer",
            }).on("click", function(){
                navigator.clipboard.writeText($(`#${targetId}`).text())

                $(this).attr({
                    "src":"event-logos/copy-1.svg"
                })

                $(`#${textId}`).text("Copied!")

                setTimeout(function(){
                    $(`#${imgId}`).attr({
                        "src":"event-logos/copy-0.svg"
                    })

                    $(`#${textId}`).text(copyText)
                }, 2500)
            })

        ).css({
            
        })
    }


    function refillForm(serializedArray){
        for (idx in serializedArray){
            $(`[name=${serializedArray[idx]["name"]}]`).val(serializedArray[idx]["value"])
        }
    }

    function divider(){
        return div().addClass("history-divider rounded-4")
    }


    function flexbox(){
        return div().addClass("d-flex")
    }

    function clearText(){
        return icon("x-circle").css({
                "margin-left": "-25.5px",
                "cursor": "pointer",
                "z-index": 3,
                "color": primaryColor,
                "font-size": "1.8rem"
                //"display": "none",
            }).attr({
                "data-bs-toggle": "tooltip", 
                "data-bs-placement": "top",
                "data-bs-custom-class": "custom-tooltip",
                "title": "Clear Text",
            }).on("click", function(){
                
                if (typeof $(this).prev().attr("mobileInput") != "undefined"){
                    $(this).prev().val("+233-").focus()
                } else {
                    $(this).prev().val("").focus()
                }
            })
    }


    function icon(iconName){
        return $("<i>").addClass(`bi-${iconName}`).css({
            "color": primaryColor,
            "font-size": "2rem"
        })
    }

    function verticalDivider(){
        return div().css({
            "width": "3px",
            "height": "1rem",
            "background-color": "grey",
            "border-radius": "5px"
        })
    }
/* Utility Functions */

/* Input Formatting */
    function formatAmountInput(amount){
        amount = String(amount).replace(" ", "")
    }
/* Input Formatting */

/* Dimmer */
    function dimmer(dimmerId, body){
        return flexbox().addClass("justify-content-center align-items-center flex-column").css({
            "width": "100%",
            "height": "100vh",
            "position": "fixed",
            "top": "0px",
            "z-index": "2000",
            "background-color": "rgba(0,0,0, 0.9)",
        }).append(
            body
        ).attr({
            "id": dimmerId,
        })
    }

    function dimmerShow(dimmerId, content){
        $("body").append(
            dimmer(dimmerId, content)
        ).css({
            "overflow": "hidden",
        })
    }

    function dimmerHide(dimmerId){
        $(`#${dimmerId}`).remove()
        $("body").removeAttr("style")
    }

    function dimmerLoadingShow(){
        var content = div().addClass("spinner-border text-light my-3").attr({
                "role": "status"
            }).append(
                $("<span>").addClass("visually-hidden").text("Loading...")
            ).css({
                "width": "3rem",
                "height": "3rem"
            })

        dimmerShow("dimmer-loading", content)
    }

    function dimmerLoadingHide(){
        dimmerHide("dimmer-loading")
    }

    function dimmerTransferShow(){

        var destinationCountries = [
            "Australia", "Canada", "Europe", "Ghana", "Nigeria", "South Africa", ""
        ]

        var content = ""

        dimmerShow("dimmer-transfer", content)
    }

    function dimmerTransferHide(){
        dimmerHide("dimmer-transfer")
    }
/* Dimmer */

function videoElement(){
    return $("<video>").addClass("img-fluid")
}

function canvasElement(){
    return $("<canvas>")
}

function spanElement(){
    return $("<span>")
}

function spinner(){
    return div().addClass("spinner-border").attr({
        "role": "status"
    }).append(
        spanElement().addClass("visually-hidden").append("Loading...")
    )
}

var geolocationFailure = function(err) {
    console.log("ERROR (" + getErrorCode(err) + "): " + err.message)
}

var geolocationSuccess = function(pos) {
    console.log("Your location is " + pos.coords.latitude + "°, " + pos.coords.longitude + "°.")
}

var updateLocation = function(position) {
    console.log("New position at: " + position.coords.latitude + ", " + position.coords.longitude);
}

var getGPSErrorCode = function(err) {
    switch (err.code) {
        case err.PERMISSION_DENIED:
            return "PERMISSION_DENIED";
        case err.POSITION_UNAVAILABLE:
            return "POSITION_UNAVAILABLE";
        case err.TIMEOUT:
            return "TIMEOUT";
        default:
            return "UNKNOWN_ERROR";
    }
}

function getGPSLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationFailure);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function startMonitorGPSLocation(){
    if (navigator.geolocation) {
        var watchId = navigator.geolocation.watchPosition(updateLocation, geolocationFailure);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function stopMonitorGPSLocation(watchId){
    navigator.geolocation.clearWatch(watchId);
}


function takePhoto(containerId){
    var videoId = `video-${containerId}`
    var canvasId = `canvas-${containerId}`

    var canvas = document.getElementById(canvasId)
    var context = canvas.getContext('2d');

    var video = document.getElementById(videoId)

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    return canvas.toDataURL('image/png')
}

function cameraControlBtn(videoElementId, iconObj, clickEventFunctiion){
    return flexbox().addClass(`rounded-circle ${videoElementId}-btn justify-content-center align-items-center mx-3`).append(
        iconObj.css({
            "color": "white",
            "font-size": "1.8rem"
        }),
    ).css({
        "width": "50px",
        "height": "50px",
        "visibility": "hidden",
        "background-color": "#1e88e5",
        "cursor": "pointer"
    }).on("click", clickEventFunctiion)
}

function cameraObj(videoElementId, canvasElementId, cameraViewContainerId, cameraConstraints, cameraImageOverlay, cameraControlBtns){

    var imageOverlay = function (imageOverlayObj){
        if (imageOverlayObj){
            return imageOverlayObj.css({
                "display": "none",
                 "z-index": "12"
            }).addClass(`${videoElementId}-overlay position-absolute top-50 start-50 translate-middle w-50`)
        }
    }

    var video = flexbox().addClass("justify-content-center align-items-center").append(
        div().addClass("position-relative w-100").append(
            imageOverlay(cameraImageOverlay),

            videoElement().addClass(`rounded-4 w-100`).attr({
                "id": videoElementId
            }).css({
                "display": "none",
            }),

            flexbox().append(
                cameraControlBtns
            ).addClass(`justify-content-center align-self-center position-absolute top-100 start-50 translate-middle`).css({
                "z-index": "10",
            })
        ).css({
            "id": `${videoElementId}-flexbox`
        })
    )

    var canvas = canvasElement().attr({
        "id": canvasElementId,
    }).css({
        "display": "none"
    })

    $(`#${cameraViewContainerId}`).append(video, canvas)

    /*video.on("canplay", function(){
        var data = takePhoto(canvasElementId, videoElementId)
    })*/

    var constraints = cameraConstraints;

    navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream){
        var video = document.getElementById(videoElementId)

        video.srcObject = mediaStream;

        video.onloadedmetadata = function(e){
            video.play();
        }
    }).catch(function(err){console.log(err.name + ": "+ err.message)})

}

function loadingCameraObj(){
    return flexbox().addClass("justify-content-center align-items-center flex-column p-3").append(
        spinner(),
        p("Loading Camera").addClass("text-center my-3")
    )
}

function buildCamera(containerId, cameraConstraints, captureBtn=false, /*cameraFlipBtn=false,*/ captureFunction=null, cameraImageOverlay=null, cameraControlBtns=[]){
    var cameraContainerBody = flexbox().addClass("w-100 h-100 justify-content-center align-items-center flex-column p-3").append(
        loadingCameraObj().css({
            "z-index": "10"
        }).attr({
            "id": `loading-${containerId}`
        })
    ).attr({
        "id": `camera-${containerId}`
    })

    $(`#${containerId}`).append(cameraContainerBody)

    if (captureBtn){
        cameraControlBtns.push(
            cameraControlBtn(`video-${containerId}`, fontawesome("fas", "fa-camera"), captureFunction)
        )
    }

    cameraObj(`video-${containerId}`, `canvas-${containerId}`, `camera-${containerId}`, cameraConstraints, cameraImageOverlay, cameraControlBtns)

    var video = document.getElementById(`video-${containerId}`)

    video.addEventListener("canplay", function(){
        setTimeout(function(){
            $(`#loading-${containerId}`).fadeOut(2000).remove()
            $(`#video-${containerId}`).fadeIn(2000)
            $(`.video-${containerId}-btn`).css({
                "visibility": "visible"
            })

            $(`.video-${containerId}-overlay`).fadeIn(2500)
        }, 2500)
    })
}


function linkIcon(iconName, link){
    return icon(iconName).on("click", function(){
        window.location = link
    }).css({
        "color": "#ffffff",
        "cursor": "pointer"
    })
}

//----------------------------------------------------------------//
function carouselContainer(carouselContainerId){
    return div().addClass("carousel slide w-100 d-flex align-items-center").attr({
        "id": carouselContainerId,
        //"data-bs-ride": "carousel"
        "data-bs-touch": "false",
    })
}

function carouselInner(){
    return div().addClass("carousel-inner")
}

function carouselItem(imgObj, minHeight){
    return div().addClass("carousel-item").append(
        flexbox().addClass("align-items-center justify-content-center w-100").append(
            imgObj.addClass("d-block")
        ).css({
            "min-height": minHeight
        })
    ).css({
        "min-height": minHeight
    })
}

function carouselPreviousControl(carouselContainerId){
    return icon("chevron-left").addClass("position-absolute top-50 start-0 translate-middle-y ms-3 carousel-control-obj").on("click", function(){
        var indicatorsContainer = $(`#${carouselContainerId}-indicators`)

        var currentSlide = Number(indicatorsContainer.attr("data-current-slide"))
        var slideLength = Number(indicatorsContainer.attr("data-slide-length"))

        $(`[data-bs-slide=${currentSlide}][data-bs-target=${carouselContainerId}]`).removeClass("active")

        var newCurrentSlide = currentSlide - 1

        if (newCurrentSlide < 0 ){
            newCurrentSlide = slideLength - 1
            indicatorsContainer.attr("data-current-slide", newCurrentSlide)
        } else {
            indicatorsContainer.attr("data-current-slide", newCurrentSlide)
        }

        $(`[data-bs-slide=${newCurrentSlide}][data-bs-target=${carouselContainerId}]`).addClass("active")

        $(`#${carouselContainerId}`).carousel("prev")

    })
}

function carouselNextControl(carouselContainerId){
    return icon("chevron-right").addClass("position-absolute top-50 end-0 translate-middle-y me-3 carousel-control-obj").on("click", function(){
        var indicatorsContainer = $(`#${carouselContainerId}-indicators`)

        var currentSlide = Number(indicatorsContainer.attr("data-current-slide"))
        var slideLength = Number(indicatorsContainer.attr("data-slide-length"))

        $(`[data-bs-slide=${currentSlide}][data-bs-target=${carouselContainerId}]`).removeClass("active")

        var newCurrentSlide = currentSlide  + 1

        if (newCurrentSlide == slideLength ){
            newCurrentSlide = 0
            indicatorsContainer.attr("data-current-slide", newCurrentSlide)
        } else {
            indicatorsContainer.attr("data-current-slide", newCurrentSlide)
        }

        $(`[data-bs-slide=${newCurrentSlide}][data-bs-target=${carouselContainerId}]`).addClass("active")

        $(`#${carouselContainerId}`).carousel("next")
    })
}

function buildCarousel(carouselContainerId, carouselItems=[]){
    return carouselContainer(carouselContainerId).append(
            carouselInner().append(
                carouselItems[0].addClass("active"),
                carouselItems.slice(1,)
            ),

            carouselPreviousControl(carouselContainerId),
            carouselNextControl(carouselContainerId),

            carouselIndicators(carouselItems, carouselContainerId)
        ).addClass("position-relative")
}


function carouselIndicators(carouselItems, carouselContainerId){
    var indicatorsContainer = div().addClass("carousel-indicators-custom position-absolute bottom-0 start-50 translate-middle-x mb-4").attr({
        "data-current-slide": "0",
        "data-slide-length": carouselItems.length,
        "id": `${carouselContainerId}-indicators`
    })

    for (var i = 0; i < carouselItems.length; i++) {

        var indicator = icon("circle-fill").addClass("mx-1").attr({
                "data-bs-target": carouselContainerId,
                "data-bs-slide": i
            }).css({
                "font-size": "0.5rem",
                "color": "#b0bec5"
            })

        if (i == 0){
            indicator.addClass("active")
        }

        indicatorsContainer.append(
            indicator
        )
    }

    return indicatorsContainer

}

function rangeCounter(rangeCounterId, limit, lowerbound=1){
    return flexbox().append(
        div().addClass("btn").append(
            flexbox().addClass("justify-content-center align-items-center w-100 h-100").append(
                fontawesome("fas", "fa-minus")
            )
        ).css({
            "background-color": primaryColor,
            "color": "#ffffff",
            "border": `2px solid ${primaryColor}`,
            "cursor": "pointer",
            "border-top-left-radius": "5px",
            "border-bottom-left-radius": "5px",
            "border-bottom-right-radius": "0px",
            "border-top-right-radius": "0px",
            "width": "50px"
        }).attr({
            "id": `${rangeCounterId}-minus`
        }).on("click", function(){
            var currentQuantity = $(`#${rangeCounterId}-number`).html()
            if (Number(currentQuantity) != lowerbound){
                $(`#${rangeCounterId}-number`).html(Number(currentQuantity) - 1)
            }
        }),

        div().addClass("px-3 py-2").append(
            flexbox().addClass("justify-content-center align-items-center w-100 h-100").append(
                p(lowerbound).css({
                    "color": primaryColor,
                    "font-family": "opensans-medium",
                }).attr({
                    "id": `${rangeCounterId}-number`
                })
            )
        ).css({
            "border-top": `2px solid ${optionColor}`,
            "border-bottom": `2px solid ${optionColor}`,
            "border-left": "0",
            "border-right": "0",
            "width": "65px"
        }),

        div().addClass("btn").append(
            flexbox().addClass("justify-content-center align-items-center w-100 h-100").append(
                fontawesome("fas", "fa-plus")
            )
        ).css({
            "background-color": primaryColor,
            "color": "#ffffff",
            "border": `2px solid ${primaryColor}`,
            "cursor": "pointer",
            "border-top-right-radius": "5px",
            "border-bottom-right-radius": "5px",
            "border-top-left-radius": "0px",
            "border-bottom-left-radius": "0px",
            "width": "50px"
        }).attr({
            "id": `${rangeCounterId}-plus`
        }).on("click", function(){
            var currentQuantity = $(`#${rangeCounterId}-number`).html()

            if (Number(currentQuantity) < limit){
                $(`#${rangeCounterId}-number`).html(Number(currentQuantity) + 1)
            }
        }),       
    )
}


(function ($) {
    // Behind the scenes method deals with browser
    // idiosyncrasies and such
    $.caretTo = function (el, index) {
        if (el.createTextRange) { 
            var range = el.createTextRange(); 
            range.move("character", index); 
            range.select(); 
        } else if (el.selectionStart != null) { 
            el.focus(); 
            el.setSelectionRange(index, index); 
        }
    };
    
    // Another behind the scenes that collects the
    // current caret position for an element
    
    // TODO: Get working with Opera
    $.caretPos = function (el) {
        if ("selection" in document) {
            var range = el.createTextRange();
            try {
                range.setEndPoint("EndToStart", document.selection.createRange());
            } catch (e) {
                // Catch IE failure here, return 0 like
                // other browsers
                return 0;
            }
            return range.text.length;
        } else if (el.selectionStart != null) {
            return el.selectionStart;
        }
    };

    // The following methods are queued under fx for more
    // flexibility when combining with $.fn.delay() and
    // jQuery effects.

    // Set caret to a particular index
    $.fn.caret = function (index, offset) {
        if (typeof(index) === "undefined") {
            return $.caretPos(this.get(0));
        }
        
        return this.queue(function (next) {
            if (isNaN(index)) {
                var i = $(this).val().indexOf(index);
                
                if (offset === true) {
                    i += index.length;
                } else if (typeof(offset) !== "undefined") {
                    i += offset;
                }
                
                $.caretTo(this, i);
            } else {
                $.caretTo(this, index);
            }
            
            next();
        });
    };

    // Set caret to beginning of an element
    $.fn.caretToStart = function () {
        return this.caret(0);
    };

    // Set caret to the end of an element
    $.fn.caretToEnd = function () {
        return this.queue(function (next) {
            $.caretTo(this, $(this).val().length);
            next();
        });
    };
}(jQuery));