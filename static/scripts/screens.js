/* Loading Screen */
    function loadingScreen(message, afterFunc=null){
        var body = flexbox().addClass("align-items-center justify-content-center flex-column loading-page container").append(
                row().addClass("flex-grow-1").append(
                    flexbox().addClass('mt-auto mb-auto w-100 align-items-center justify-content-center flex-column').append(
                        spinner().addClass("text-center").css({
                            "color": themeColor,
                            "font-size": "10px",
                        }),

                        p(message).addClass("fs-6 text-center mt-3").css({
                            "color": themeColor, 
                            "font-family": "futura-book-font", 
                            "letter-spacing": "0.3px"
                        })
                    )
                ),

                row().addClass("mb-2").append(
                    col(null, 12).addClass("").append(
                        flexbox().addClass("justify-content-center align-items-center flex-column").append(
                            p("Powered By").addClass("text-center mb-2").css({
                                "color": themeColor, 
                                "font-family": "futura-book-font", 
                                "letter-spacing": "0.3px"
                            }),

                            img("event-logos/banner.svg").attr({
                                "id": "modal-logo-loading"
                            }).css({
                                "max-width": "5rem"
                            }),

                            p("Yaniko Ltd").addClass("text-center mt-1 form-text").css({
                                "color": themeColor, 
                                "font-family": "futura-book-font", 
                                "letter-spacing": "0.3px"
                            }),

                        )
                    )
                ),

            ).css({
                "min-height": "100vh"
            })

        manipulateSpace("body", body, afterFunc=afterFunc)

    }
/* Loading Screen */

/* Success Screen */
    function successScreen(message, returnEvent){
        var body = div().addClass("d-flex align-items-center justify-content-center flex-column loading-page container").append(
                row().addClass("flex-grow-1").append(
                    div().addClass('col-12 mt-auto mb-auto').append(
                        div().addClass("d-flex justify-content-center").append(
                            icon("check-circle").css({
                                "font-size": "10rem"
                            }),
                        ),

                        p(message).addClass("fs-6 text-center mt-3").css({
                            "color": themeColor, 
                            "font-family": "futura-book-font", 
                            "letter-spacing": "0.3px"
                        }),

                        div().addClass("d-flex justify-content-center").append(
                            btn("Back").addClass("dashboard-btn").on("click", function(){
                                returnEvent()
                            })
                        ),
                    )
                ),

                row().addClass("mb-4").append(
                    div().addClass("col-12").append(
                        p("Powered By").addClass("form-text text-center").css({
                            "color": themeColor, 
                            "font-family": "futura-book-font", 
                            "letter-spacing": "0.3px"
                        })
                    ),

                    div().addClass("col-12").addClass("d-flex justify-content-center").append(
                        img("event-logos/favicon-dark-o.svg").attr({
                            "id": "modal-logo-loading"
                        })
                    )
                ),

            )
        manipulateSpace("body", body)
    }
/* Success Screen */

/* Error Screen */
    function errorScreen(message, returnEvent){
        var body = div().addClass("d-flex align-items-center justify-content-center flex-column loading-page container").append(
                row().addClass("flex-grow-1").append(
                    div().addClass('col-12 mt-auto mb-auto').append(
                        div().addClass("d-flex justify-content-center").append(
                            icon("exclamation-circle").css({
                                "font-size": "10rem"
                            }),
                        ),

                        p(message).addClass("fs-6 text-center mt-3").css({
                            "color": themeColor, 
                            "font-family": "futura-book-font", 
                            "letter-spacing": "0.3px"
                        }),

                        div().addClass("d-flex justify-content-center").append(
                            btn("Back").addClass("dashboard-btn").on("click", function(){
                                returnEvent()
                            })
                        ),
                    )
                ),

                row().addClass("mb-4").append(
                    div().addClass("col-12").append(
                        p("Powered By").addClass("form-text text-center").css({
                            "color": themeColor, 
                            "font-family": "futura-book-font", 
                            "letter-spacing": "0.3px"
                        })
                    ),

                    div().addClass("col-12").addClass("d-flex justify-content-center").append(
                        img("event-logos/favicon-dark-o.svg").attr({
                            "id": "modal-logo-loading"
                        })
                    )
                ),

            )

        manipulateSpace("body", body)
    }
/* Error Screen */