function calendar(month, year){
    var calendarObjs = []

    var dateObj = new Date(year, month, 1)
    var weekday = dateObj.getDay()

    var numberofDays = function(month){
        //april, june, november & september
        if (![1, 3, 5, 10, 8].includes(month)){
            return 31
        } else {
            //february
            if (month != 1){
                return 30
            } else {
                if (year%4 != 0){
                    return 28
                } else {
                    return 29
                }
            }
            return 30
        }
    }

    for (var dayObj of _.range(numberofDays(month))){
        var dayInfo = new Date(year, month, dayObj)

        calendarObjs.push(
            {weekDay: dayInfo.getDay(), dateDay: dayObj+1}
        )
    }

    return calendarObjs
}

function buildCalendar(month, year, containerId, bodyOnly=false){
    var weekDaysObj = [
        {weekDay: "Sun", weekNum: 6},
        {weekDay: "Mon", weekNum: 0},
        {weekDay: "Tue", weekNum: 1},
        {weekDay: "Wed", weekNum: 2},
        {weekDay: "Thu", weekNum: 3},
        {weekDay: "Fri", weekNum: 4},
        {weekDay: "Sat", weekNum: 5},
    ]

    var dateObj = new Date()
    var calendarObj = calendar(month, year)

    var dateContainer = flexbox().attr({
        "id": `${containerId}-date-container`
    })

    var enterFirstDay = false

    for (var day of weekDaysObj){
        var weekContainer = flexbox().addClass("flex-column me-1").css({
            "width": "35px"
        })

        weekContainer.append(
            flexbox().addClass("align-items-center justify-content-center w-100").append(
                p(day.weekDay).css({
                    "font-family": "Segoe UI Regular",
                    "color": "midnightblue"
                })
            ).css({
                "height": "35px"
            })
        )

        var weekCal = _.filter(calendarObj, function(calendarDayObj){
            if (calendarDayObj.weekDay == day.weekNum){
                return calendarDayObj
            }
        })

        if (weekCal[0].dateDay == 1){
            enterFirstDay = true
        }

        if (enterFirstDay == false){
            weekCal.unshift("-")
        }

        for (var dayObj of weekCal){
            if (dayObj == "-"){
                weekContainer.append(
                    flexbox().addClass("align-items-center justify-content-center w-100").append(
                        p("-").css({
                            "color": "transparent"
                        })
                    ).css({
                        "height": "35px"
                    })
                )
            } else {
                weekContainer.append(
                    flexbox().addClass("align-items-center justify-content-center w-100 date-picker").append(
                        p(dayObj.dateDay).css({
                            "font-family": "Segoe UI Regular"
                        })
                    ).css({
                        "height": "35px",
                    }).on("click", function(){
                        var currentMonth = calendarMonths.indexOf($(`#${containerId}-month`).html())
                        var currentYear = $(`#${containerId}-year`).html()
                        var selectedDay = $(this).children("p").html()

                        var dateObj = new Date(currentYear, currentMonth, selectedDay)

                        //dateObj.toDateString()

                        $(`#${containerId}-dateModal`).modal("hide")
                        $(`#${containerId}-dateInput`).val(dateObj.toDateString())
                    })
                )
            }
        }

        dateContainer.append(weekContainer)
    }


    if (bodyOnly){
        return dateContainer.children()
    } else {
        return dateContainer
    }
}

var calendarMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function dateBuilder(containerId){
    var dateobj = new Date()

    return flexbox().addClass("justify-content-center align-items-center flex-column").append(
        flexbox().addClass("justify-content-center align-items-center").append(
            btn(
                flexbox().addClass("justify-content-center align-items-center").append(
                    fontawesome("fas", "fa-angle-left")
                )
            ).addClass("shadow-sm date-picker-btn py-2").on("click", function(event){
                event.preventDefault()

                var currentYear = Number($(`#${containerId}-year`).html()) - 1
                $(`#${containerId}-year`).html(currentYear)

                var currentMonth = calendarMonths.indexOf($(`#${containerId}-month`).html())

                manipulateSpace(`${containerId}-date-container`, buildCalendar(currentMonth,currentYear, containerId, bodyOnly=true), afterFunc=null, speed=10)
            }),

            flexbox().addClass("justify-content-center align-items-center h-100").append(
                p(dateobj.getFullYear()).addClass("fs-5 mx-3").css({
                    "font-family": "Segoe UI Regular",
                    "color": "midnightblue",
                }).attr({
                    "id": `${containerId}-year`
                }),
            ),

            btn(
                flexbox().addClass("justify-content-center align-items-center").append(
                    fontawesome("fas", "fa-angle-right")
                )
            ).addClass("shadow-sm date-picker-btn  py-2").on("click", function(){
                event.preventDefault()

                var currentYear = Number($(`#${containerId}-year`).html()) + 1
                currentYear

                $(`#${containerId}-year`).html(currentYear)

                var currentMonth = calendarMonths.indexOf($(`#${containerId}-month`).html())

                manipulateSpace(`${containerId}-date-container`, buildCalendar(currentMonth,currentYear, containerId, bodyOnly=true), afterFunc=null, speed=10)
            }),
        ).addClass("mb-3"),

        flexbox().addClass("justify-content-center align-items-center mb-3").append(
            btn(
                flexbox().addClass("justify-content-center align-items-center").append(
                    fontawesome("fas", "fa-angle-left"),
                )
            ).addClass("shadow-sm date-picker-btn  py-2").on("click", function(){
                event.preventDefault()

                var currentMonth = Number(
                    calendarMonths.indexOf(
                        $(`#${containerId}-month`).html()
                    )
                )

                if (currentMonth <= 0){
                    $(`#${containerId}-month`).html(calendarMonths[0])
                } else {
                    currentMonth = currentMonth - 1
                    $(`#${containerId}-month`).html(calendarMonths[currentMonth])

                    var currentYear = Number($(`#${containerId}-year`).html())

                    manipulateSpace(`${containerId}-date-container`, buildCalendar(currentMonth,currentYear, containerId, bodyOnly=true), afterFunc=null, speed=10)
                }
            }),

            flexbox().addClass("justify-content-center align-items-center h-100").append(
                p(calendarMonths[dateobj.getMonth()]).addClass("mx-3").css({
                    "font-family": "Segoe UI Regular",
                    "color": "midnightblue"
                }).attr({
                    "id": `${containerId}-month`
                }),
            ).css({
                "width": "64px"
            }),

            btn(
                flexbox().addClass("justify-content-center align-items-center").append(
                    fontawesome("fas", "fa-angle-right")
                )
            ).addClass("shadow-sm date-picker-btn  py-2").on("click", function(){
                event.preventDefault()

                var currentMonth = Number(
                    calendarMonths.indexOf(
                        $(`#${containerId}-month`).html()
                    )
                )
                if (currentMonth >= 11){
                    $(`#${containerId}-month`).html(calendarMonths[11])
                } else {
                    var currentMonth = currentMonth + 1

                    $(`#${containerId}-month`).html(calendarMonths[currentMonth])
                    var currentYear = Number($(`#${containerId}-year`).html())

                    manipulateSpace(`${containerId}-date-container`, buildCalendar(currentMonth,currentYear, containerId, bodyOnly=true), afterFunc=null, speed=10)
                }
            }),
        ),

        buildCalendar(1, dateobj.getFullYear(), containerId).css({
                "min-height": "247px"
            })
    )
}

function dateInputModal(containerId){
    return buildModal(
            col(null, 12).append(
                modalClose().addClass("mb-2"),
                modalLogo().addClass("mb-2"),
                dateBuilder(containerId)
            ), 
            `${containerId}-dateModal`, 
            "sm"
        )
}

function dateInput(attributes){
    return [
        dateInputModal(attributes["date-container-id"]),
        inputElement().attr(attributes).on("focus", function(){
            $(`#${attributes["date-container-id"]}-dateModal`).modal("show")
        }),
    ]
}



/* Select v2 -- Non-modal */
    function resetOption(obj, milliseconds){
        var def = $.Deferred()

        setTimeout(function(){
            obj.removeClass('select-element-active').addClass("select-element-passive")
            def.resolve()
        }, milliseconds)

        return def.promise()
    }

    function optionsV2(optionAgrs, parentId){
        options = []
        
        for (i of optionAgrs){
            optionsBody = div().addClass("py-1 px-4 options-v2").append(
                    p(i["text"]).addClass("mb-0 option-text"),
                ).on("click", function(){
                    name = $(`#${parentId}-text`).attr("data-name")

                    text = $(this).children('.option-text').text()
                    
                    $(`input[name=${name}]`).attr({"value": text})
                    $(`#${parentId}-text`).html(text).css({
                        "color": "midnightblue"
                    })

                    resetOption($(`#${parentId}-container`), 310)
                    $(`#${parentId}-container`).children("img").toggleClass("angle-up");
                    $(`#${parentId}-container`).next().slideToggle(300)
                })

            if (typeof i["event"] != "undefined"){
                optionsBody.on("click", i["event"])
            }

            options.push(
                optionsBody
            )
        }

        return options
    }

    function selectV2(optionAgrs, parentId, attributes){
        var angleUp = `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgdmlld0JveD0iMCAwIDQ0OC4xNDk5OSAyNzAuMDQ5OTkiCiAgIHZlcnNpb249IjEuMSIKICAgaWQ9InN2ZzQiCiAgIHNvZGlwb2RpOmRvY25hbWU9ImFuZ2xlLXVwLnN2ZyIKICAgd2lkdGg9IjQ0OC4xNDk5OSIKICAgaGVpZ2h0PSIyNzAuMDQ5OTkiCiAgIGlua3NjYXBlOnZlcnNpb249IjAuOTIuMyAoMjQwNTU0NiwgMjAxOC0wMy0xMSkiPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTEwIj4KICAgIDxyZGY6UkRGPgogICAgICA8Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+CiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICAgICAgPGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPgogICAgICAgIDxkYzp0aXRsZT48L2RjOnRpdGxlPgogICAgICA8L2NjOldvcms+CiAgICA8L3JkZjpSREY+CiAgPC9tZXRhZGF0YT4KICA8ZGVmcwogICAgIGlkPSJkZWZzOCIgLz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEiCiAgICAgb2JqZWN0dG9sZXJhbmNlPSIxMCIKICAgICBncmlkdG9sZXJhbmNlPSIxMCIKICAgICBndWlkZXRvbGVyYW5jZT0iMTAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjEzNjYiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iNzEzIgogICAgIGlkPSJuYW1lZHZpZXc2IgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIwLjQ2MDkzNzUiCiAgICAgaW5rc2NhcGU6Y3g9Ijk5LjQ2MTk5IgogICAgIGlua3NjYXBlOmN5PSIzOTMuMTQ4MDYiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjAiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjI3IgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ic3ZnNCIgLz4KICA8IS0tISBGb250IEF3ZXNvbWUgRnJlZSA2LjIuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIChJY29uczogQ0MgQlkgNC4wLCBGb250czogU0lMIE9GTCAxLjEsIENvZGU6IE1JVCBMaWNlbnNlKSBDb3B5cmlnaHQgMjAyMiBGb250aWNvbnMsIEluYy4gLS0+CiAgPHBhdGgKICAgICBkPSJtIDIwMy4wMjcxMiwxNi4yOTkxODQgYyAxMi41LC0xMi40OTk5OTc2IDMyLjgsLTEyLjQ5OTk5NzYgNDUuMywwIGwgMTkyLDE5MS45OTk5NTYgYyAxMi41LDEyLjUgMTIuNSwzMi44IDAsNDUuMyAtMTIuNSwxMi41IC0zMi44LDEyLjUgLTQ1LjMsMCBMIDIyNS42MjcxMiw4NC4xOTkxODMgNTYuMjI3MTE5LDI1My40OTkxNCBjIC0xMi41LDEyLjUgLTMyLjgsMTIuNSAtNDUuMywwIC0xMi41MDAwMDA0LC0xMi41IC0xMi41MDAwMDA0LC0zMi44IDAsLTQ1LjMgTCAyMDIuOTI3MTIsMTYuMTk5MTg0IFoiCiAgICAgaWQ9InBhdGgyIgogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgc3R5bGU9ImZpbGw6IzE5MTk3MDtmaWxsLW9wYWNpdHk6MSIgLz4KPC9zdmc+Cg==`

        $(window).resize(function(){
            $(`#${parentId}-options`).css("width", $(`#${parentId}`).css("width"))
        })

        return div().append(
            $("<input>").addClass("form-select").append(
                optionAgrs
            ).css({
                "display":"none",
            }).attr(attributes).attr({
                "type": "hidden",
                "placeholder": optionAgrs[0]["text"]
            }),

            flexbox().addClass("px-2 select-element-passive").append(
                div().addClass('flex-grow-1 py-1').append(
                    p(optionAgrs[0]["text"]).addClass("mb-0 fs-6").css({
                        "color": "grey",
                        "letter-spacing": "0.4px"
                    }).attr({
                        "id": `${parentId}-text`,
                        "data-name": attributes["name"],
                    })
                ),
                img(angleUp, "13px", extend=false).addClass("select-version-2")
            ).css({
                "cursor": "pointer",
                "width": "100%",
                "max-height": "40px",
                "min-height": "37px",
            }).on("click", function(){
                //resizeOptions()
                resetAllSelects(`${parentId}-container`)
                $(`#${parentId}-options`).css("width", $(this).parent().css("width"))

                if ($(this).hasClass('select-element-passive')){
                    $(this).removeClass('select-element-passive').addClass("select-element-active")
                    $(this).children("img").toggleClass("angle-up");
                    $(this).next().slideToggle(300)
                } else {
                    resetOption($(this), 310)
                    $(this).children("img").toggleClass("angle-up");
                    $(this).next().slideToggle(300)
                }

            }).attr({
                "id": `${parentId}-container`,
                "data-select": attributes["name"],
            }),

            div().addClass("shadow option-active").append(
                div().addClass("").append(
                    optionsV2(optionAgrs.slice(1, ), parentId)
                )
            ).css({
                "max-height": "200px",
                "overflow": "auto",
                "background-color": "white",
                "display": "none",
                "position": "absolute",
            }).attr({
                "id": `${parentId}-options`
            }),
        ).attr({
            "id": `${parentId}`
        })
    }
    
    function resizeOptions(){
        $(".option-active").each(
            function(key, element){
                $(element).css("width", $(element).parent().css("width"))
            }
        )
    }

    function resetAllSelects(exempt){
        $(".select-element-active").each(
            function(key, element){
                if ($(element).attr("id") != exempt){
                    resetOption($(element), 310)
                    $(element).children("img").removeClass("angle-up");
                    $(element).next().slideUp(300)
                }
            }
        )
    }
/* Select v2 -- Non-modal */

/* Select Modal */
    function selectModal(modalId, size, selectDivData){
        return createModal(modalId).append(
            modalDialog(size).append(
                modalContent().append(
                    modalBody().append(
                        selectModalBody(selectDivData)
                    )
                )
            )
        )
    }

    function selectModalBody(selectDivData){
        return div().addClass("px-3 py-2 auto").append(
            div().addClass("row").append(
                div().addClass("col d-flex justify-content-end").append(
                    icon("x-circle").addClass("mb-3").attr({
                        "data-bs-dismiss":"modal",
                    }).css({
                        "max-width": "30px"
                    }).on("click", function() {
                        $(`[data-select=${selectDivData}]`).css({
                            "border": `2px solid ${themeColor}`,
                            "border-style": "groove",
                            "border-top": "0px",
                            "border-left": "0px",
                            "border-right": "0px",
                            "border-radius": "0px",
                            "color": themeColor,
                        })

                        $(`[data-select=${selectDivData}]`).children("img").toggleClass("angle-up")
                    })
                )
            ),

            /*div().addClass("row").append(
                div().addClass("col d-flex justify-content-center my-3").append(
                    img("event-logos/favicon-dark-o.svg").attr({
                        "id": "modal-logo-prim"
                    })
                )
            ),*/
        )
    }
/* Select Modal */

/* Form Element Constructor */
    function form(){
        return $("<form>")
    }

    function inputElement(){
        return $("<input>").addClass("form-control").attr({
            "spellcheck": "false"
        })
    }

    function labelElement(name, text){
        if (!text){
            return null
        }

        return $("<label>").addClass("form-label").attr({
                    "for": name
                }).text(text)
    }

    function formText(name, text){
        if (!text){
            return null
        }
        
        return  div().addClass("form-text").attr({
                    "for": name
                }).text(text).css({
                    "font-family": "Segoe UI Regular"
                })
    }

    function checkBox(text, attributes){
        return div().addClass("form-check").append(
            $("<input>").addClass("form-check-input").attr(attributes),

            $("<label>").addClass("form-check-label").attr({
                "for": text
            }).text(text)
        )
    }

    fileLabelBody = function(attributes){
        return $("<label>").addClass("form-label fs-6").attr({"for": attributes["id"]}).append(
                div().addClass("shadow rounded-3 w-100 d-flex justify-content-center align-items-center px-4 py-2 flex-column").css({
                    "background-color": "rgba(211,211,211, 0.4)",
                    "min-height": "100px"
                }).append(
                    img("event-logos/upload.svg", "40px").addClass("mb-3 mt-3"),
                    $("<p>").text("Select Document").addClass("fs-6 m-0 mx-2 mb-3").css({
                        "font-family": "futura-book-font",
                        "color": "midnightblue"
                    })
                ).css({
                    "cursor": "pointer"
                })
            ).css({
                "min-width": "120px"
            })
    }


    function fileInput(attributes){
        return div().addClass().append(
            $("<input>").addClass("form-control").attr(attributes).css({"display": "none"}).on("change", function(){
                    files = this.files
                    new Response(files[0].stream()).blob().then(blob => URL.createObjectURL(blob)).then(url => $(`#${attributes["id"]}-container`).empty().append(
                            div().append(
                                btn(null,"yaniko-red-close").addClass("position-absolute top-0 end-0 m-3").on("click", function(){
                                    $(`#${attributes["id"]}-container`).empty().append(
                                        fileLabelBody(attributes)
                                    )
                                    $(`#${attributes["id"]}`).val('')
                                }).css({
                                    "max-width": "30px"
                                }),
                                img(url, "").addClass("rounded-3 shadow").attr({
                                    "id": `${attributes["id"]}-img`
                                }).css({
                                    "max-height": "400px"
                                })
                            ).addClass("position-relative").css({
                                //"background-color": "rgba(211,211,211, 0.4)"
                                "max-width": "300px"
                            }).attr({
                                "id": `${attributes["id"]}-subcontainer`
                            })
                        ))
            }),

            div().append(
                fileLabelBody(attributes)
            ).css({
                "min-width": "120px"
            }).attr({
                "id": attributes["id"]+`-container`
            })
        )
    }

    function Option(obj, idx, modalId, selectInputQueryId){
        if (idx == 0){
            /*return div().addClass("row mt-1 mb-0").append(
                div().addClass("col d-flex justify-content-center px-2").append(
                    $("<p>").addClass("align-self-center mt-0 mb-0 mx-3").text(
                        obj["text"]
                    ).css({
                        "font-family": "futura-book-font",
                        "color": "midnightblue",
                        "font-size": "16.5px"
                    })
                )
            )*/
        }else{
            return div().addClass("row mt-1 profile-nav mb-0").append(
                div().addClass("col d-flex justify-content-start").append(
                    $("<p>").addClass("fs-6 align-self-center mt-0 mb-0 mx-3").text(
                        obj["text"]
                    ).css({
                        "font-family": "Segoe UI Regular",
                        "color": themeColor,
                        "font-size": "16px",
                        "letter-spacing": "0.3px"
                    }).attr({
                        "modal-value": obj["optionAttr"]["value"]
                    })
                ),
            ).on('click', function(event) {
                event.preventDefault();
                /* Act on the event */

                var textSelector = $(`[modal-value="${obj['optionAttr']['value']}"]`)
                var value = textSelector.text()
                        
                $(`input[name=${selectInputQueryId}]`).attr({
                    "value": value
                })

                //$(`[data-name=${selectInputQueryId}]`).text(value)

                $(`[data-name=${selectInputQueryId}]`).text(value).css({
                    //"opacity": "100%"
                    "color": themeColor
                })

                $(`#${modalId}Modal`).modal('hide')

                $(`[data-select=${selectInputQueryId}]`).css({
                    "border": `2px solid ${themeColor}`,
                    "border-style": "groove",
                    "border-top": "0px",
                    "border-left": "0px",
                    "border-right": "0px",
                    "border-radius": "0px",
                    "color": themeColor,
                })

                $(`[data-select=${selectInputQueryId}]`).children("img").toggleClass("angle-up")
            }).on("click", function(){
                if (typeof obj["event"] != "undefined"){
                    obj["event"]()
                }
            })
        }
    }

    function selectElement(options, name, attributes, size){
        $("body").append(
            selectModal(`${name}Modal`, size, name)
        )

        optionsArr = []


        for (optionElement in options){
            /*optionsArr.push(
                $("<option>").attr(
                    options[optionElement]["optionAttr"]
                ).text(options[optionElement]["text"])
            )*/
            $(`#${name}Modal > .modal-dialog > .modal-content > .modal-body > div`).append(
                Option(options[optionElement], optionElement, name, attributes["name"])
            )
        }

        return div().append(
            $("<input>").addClass("form-select").append(
                optionsArr
            ).css({
                "display":"none",
            }).attr(attributes).attr({
                "type": "hidden",
                "placeholder": options[0]["text"]
            }),

            div().addClass("yaniko-select py-1 px-2 d-flex justify-content-between").append(
                $("<p>").addClass("m-0 flex-grow-1").text(
                    options[0]["text"]
                ).css({
                    "color": "grey",
                    "font-family": "Segoe UI Regular",
                    "letter-spacing": "0.4px"
                }).attr({
                    "data-name": attributes["name"],
                }),

                img("event-logos/angle-up.svg", "13px").css({
                    "transition-property": "transform",
                    "transition-duration": "300ms, 200ms",
                    "transition-timing-function": "linear",
                    "transition-delay": "0s, 1s",
                })
            ).on("click", function(){

                $(this).css({
                    "border": `2px solid ${themeColor}`,
                    "border-style": "groove",
                    "border-top": "0px",
                    "border-left": "0px",
                    "border-right": "0px",
                    "border-radius": "0px",
                    "color": themeColor,
                    "font-family": "Segoe UI Regular",
                    "letter-spacing": "0.4px",
                    "overflow": "hidden",
                    //"max-height": "30px"
                })
                $(this).children("img").toggleClass("angle-up")
                $(`#${name}Modal`).modal('show');
            }).attr({
                "data-select": attributes["name"],
            })
        )
    }

    function textAreaElement(){
        return $("<textarea>").addClass("form-control").attr({
            "rows": "4"
        })
    }
    
    function passwordInput(index){
        var inputName = index['attr']['name']

        return div().addClass("input-group").append(
            inputElement().attr(index["attr"]).on('focus', function(){
                    $('#pass-visibility')
            }).focusout(function(){
                $('#pass-visibility')
            }),

            $("<span>").html(
                fontawesome("fas", "fa-eye-slash").attr({
                    "id": `visi-svg-${inputName}`
                }).css({
                    "color": themeColor,
                    "font-size": "1.3rem"
                })
            ).addClass("pass-visibility input-group-text").on('click', function(){
                if($(`#visi-svg-${inputName}`).hasClass("fa-eye-slash")){
                    $(`#visi-svg-${inputName}`).removeClass("fa-eye-slash").addClass("fa-eye")
                    $(`#pass-visibility-${inputName}`).attr("title", "Hide Password")

                    $(`[name=${inputName}]`).attr("type", "text")
                    $(`[name=${inputName}-confirm]`).attr("type", "text")
                } else {
                    $(`#visi-svg-${inputName}`).removeClass("fa-eye").addClass("fa-eye-slash")
                    $(`#pass-visibility-${inputName}`).attr("title", "Show Password")

                    $(`[name=${inputName}]`).attr("type", "password");
                    $(`[name=${inputName}-confirm]`).attr("type", "password")
                }
            }).attr({
                "id": `pass-visibility-${inputName}`, 
                "data-bs-toggle": "tooltip", 
                "data-bs-placement": "right", 
                "title": "Show Password"
            }).css({
                "margin-left": "-40px",
            })
        )
    }

    function buildForm(formObj, colOnly=false){
        /*{
            "tag": "input/textarea/select/select-v2",
            "label": "<-form label->",
            "formText": "<-form small text->",
            "attr": {
                        "name": index["name"],
                        "placeholder": index["placeholder"],
                        "type": index["type"],
                        "value": index["defaultValue"],
                    }
            "options":[
                {
                    "value": "BRL",
                    "text": "Brazil",
                    "optionAttr": {
                        "disabled": true,
                        "selected": true
                    }
                },
                {
                    "value": "USD",
                    "text": "United States Dollar"
                },
            ],
            "colSize": 12,
            "breakpoint": null
        }*/ 

        rowElement = row()

        for (formField in formObj){
            var index = formObj[formField]

            var name = index["attr"]["name"]
            var form_text = index["formText"]
            var label = index["label"]

            var colSize = index["colSize"]

            var breakpoint = function(){
                if (index["breakpoint"] === undefined){
                    return "md"
                } else if (index["breakpoint"]){
                    return index["breakpoint"]
                } else if (index["breakpoint"] === null){
                    return null
                }
            }

            if (index["tag"] == "input"){
                passwordObj = passwordInput(index)

                if (index["attr"]["name"].split("-").reverse()[0] == "password"){
                    rowElement.append(
                        col(breakpoint(), colSize).addClass("mb-3").append(
                            labelElement(name, label),
                            passwordObj,
                            formText(name, form_text)
                        )
                    )
                } else if (index["attr"]["name"].split("-").reverse()[0] == "confirm"){
                    rowElement.append(
                        col(breakpoint(), colSize).addClass("mb-3").append(
                            labelElement(name, label),
                            flexbox().append(
                                inputElement().attr(index["attr"]),
                            ),
                            formText(name, form_text)
                        )
                    )
                } else if (typeof index["attr"]["amountInput"] != "undefined"){

                    rowElement.append(
                        col(breakpoint(), colSize).addClass("mb-3").append(
                            labelElement(name, label),
                            flexbox().append(
                                inputElement().attr(index["attr"]).on("keyup", function(event){
                                    //console.log(formattedText)
                                    exempt = "ArrowLeft, ArrowRight, ArrowDown, ArrowUp, End, Home"
                                    if (exempt.indexOf(event.key) == -1){
                                        caretPosition_ = $(this).caret()

                                        if ($(this).val().length > 0){
                                            formattedText = amountInput(`${$(this).val()}`, decimalPlace=Number($(this).attr("decimalPlace")))
                                            $(this).val(formattedText)
                                        }

                                        if (event.key == "Backspace"){
                                            
                                            if (typeof formattedText === 'undefined'){

                                            }else{
                                                if (formattedText[caretPosition_ - 1] == ","){
                                                    $(this).caret(caretPosition_ - 1)    
                                                } else {
                                                    $(this).caret(caretPosition_)
                                                }
                                            }
                                        }else if ($(this).val().split(",")[0].length == 2){
                                            $(this).caret(caretPosition_)
                                        } else if ($(this).val().split(",")[0].length == 1){
                                            $(this).caret(caretPosition_ + 1)
                                        } else if ($(this).val().split(",")[0].length == 3){
                                            $(this).caret(caretPosition_)
                                        } /*else if ($(this).val()[0] == "."){
                                            value = $(this).val()
                                            $(this).val("0"+value)
                                        }*/
                                    }
                                    //$(this).val(formattedText)
                                }).on("keydown", function(event){

                                    decimalPlace=Number($(this).attr("decimalPlace"))

                                    if (decimalPlace == 0 && event.key == "."){
                                        event.preventDefault()
                                        event.stopImmediatePropagation()
                                    }

                                    if (event.key == "." && $(this).val().indexOf(event.key) != -1){
                                        event.preventDefault()
                                        event.stopImmediatePropagation()     
                                    }

                                    if (event.key == "Backspace"){
                                        text = $(this).val()
                                        caret = $(this).caret()

                                        if (text[caret] == ","){
                                            //had some issues this morning here on caret positioning
                                            //$(this).caret(caret+1)
                                        } else if (text[caret - 1] == ",") {
                                            $(this).caret(caret - 1)
                                        }
                                        
                                        if (text[caret - 1] == "."){
                                            if (text[text.length - 1] == "."){

                                            } else {
                                                $(this).caret(caret - 1)
                                            }
                                        }

                                    }

                                    exempt = "Backspace ArrowLeft ArrowRight ArrowDown ArrowUp 1234567890. Home End Tab"
                                    if(exempt.indexOf(event.key) == -1){
                                        event.preventDefault()
                                        event.stopImmediatePropagation()
                                        //console.log(event)
                                    }

                                    if(event.key == " "){
                                        event.preventDefault()
                                        event.stopImmediatePropagation()
                                        //console.log(event)
                                    }

                                    if ("QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm,".indexOf(event.key) != -1){
                                        event.preventDefault()
                                        event.stopImmediatePropagation()
                                    }

                                    if ($(this).val().split(".")[1]){
                                        if ($(this).val().length == $(this).caret() && $(this).val().split(".")[1].length > Number($(this).attr("decimalPlace")) - 1 && "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890".indexOf(event.key) != -1){
                                            event.preventDefault()
                                            event.stopImmediatePropagation()
                                        }
                                    }

                                }).on("paste", function(event){
                                    event.preventDefault();

                                    //write notification to alert user that paste is not allowed
                                }).on("focusout", function(event){
                                    if (String($(this).val().length) > 0){
                                        if (String($(this).val()).indexOf(".") == -1){
                                            text = String($(this).val())

                                            if (text.slice(-(decimalPlace+1), )[0] != "."){
                                                $(this).val(text+".00")
                                            }
                                        }
                                    }
                                }),

                                clearText()
                            ),
                            formText(name, form_text)
                        )
                    )
                } else if (typeof index["attr"]["cardInput"] != "undefined"){
                    rowElement.append(
                        col(breakpoint(), colSize).addClass("mb-3").append(
                            labelElement(name, label),
                            flexbox().append(
                                inputElement().attr(index["attr"]).on("keyup", function(event){
                                    //console.log(formattedText)
                                    exempt = "ArrowLeft, ArrowRight, ArrowDown, ArrowUp, End, Home"
                                    if (exempt.indexOf(event.key) == -1){
                                        caretPosition_ = $(this).caret()

                                        if ($(this).val().length > 0){
                                            formattedText = cardInput(`${$(this).val()}`)
                                            $(this).val(formattedText)
                                        }

                                        if (event.key == "Backspace"){
                                            
                                            if (typeof formattedText === 'undefined'){

                                            }else{
                                                if (formattedText[caretPosition_ - 1] == ","){
                                                    $(this).caret(caretPosition_ - 1)    
                                                } else {
                                                    $(this).caret(caretPosition_)
                                                }
                                            }
                                        }
                                    }
                                    //$(this).val(formattedText)
                                }).on("keydown", function(event){
                                    if (event.key == "Backspace"){
                                        text = $(this).val()
                                        caret = $(this).caret()

                                        if (text[caret] == "-"){
                                            //$(this).caret(caret+1)
                                        } else if (text[caret - 1] == "-") {
                                            $(this).caret(caret - 1)
                                        }
                                    }

                                    exempt = "Backspace, ArrowLeft, ArrowRight, ArrowDown, ArrowUp, 1234567890, Home, End, Tab"
                                    if(exempt.indexOf(event.key) == -1){
                                        event.preventDefault()
                                        event.stopImmediatePropagation()
                                        //console.log(event)
                                    }

                                    if(event.key == " "){
                                        event.preventDefault()
                                        event.stopImmediatePropagation()
                                        //console.log(event)
                                    }

                                    if ("QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm,".indexOf(event.key) != -1){
                                        event.preventDefault()
                                        event.stopImmediatePropagation()
                                    }

                                    if (typeof $(this).val().split("-").join("") != 'undefined'){
                                        if ($(this).val().split("-").join("").length == 16 && "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890".indexOf(event.key) != -1){
                                            event.preventDefault()
                                            event.stopImmediatePropagation()
                                        }
                                    }
                                }).on("paste", function(event){
                                    event.preventDefault();

                                    navigator.clipboard.readText().then(
                                        clipText => {
                                            text = []
                                            for (i of clipText.split("")){
                                                if ("1234567890".indexOf(i) != -1){
                                                    text.push(i)
                                                }
                                            }
                                            $(this).val(cardInput(text.join("")))
                                        });

                                    event.stopImmediatePropagation()

                                    //write notification to alert user that paste is not allowed
                                }),

                                clearText()
                            ),
                            formText(name, form_text)
                        )
                    )
                } else if (typeof index["attr"]["sortCodeInput"] != "undefined"){
                    rowElement.append(
                        col(breakpoint(), colSize).addClass("mb-3").append(
                            labelElement(name, label),
                            flexbox().append(
                                inputElement().attr(index["attr"]).on("keyup", function(event){
                                    //console.log(formattedText)
                                    exempt = "ArrowLeft, ArrowRight, ArrowDown, ArrowUp, End, Home"
                                    if (exempt.indexOf(event.key) == -1){
                                        caretPosition_ = $(this).caret()

                                        if ($(this).val().length > 0){
                                            formattedText = sortCodeInput(`${$(this).val()}`)
                                            $(this).val(formattedText)
                                        }

                                        if (event.key == "Backspace"){
                                            
                                            if (typeof formattedText === 'undefined'){

                                            }else{
                                                if (formattedText[caretPosition_ - 1] == ","){
                                                    $(this).caret(caretPosition_ - 1)    
                                                } else {
                                                    $(this).caret(caretPosition_)
                                                }
                                            }
                                        }
                                    }
                                    //$(this).val(formattedText)
                                }).on("keydown", function(event){
                                    if (event.key == "Backspace"){
                                        text = $(this).val()
                                        caret = $(this).caret()

                                        if (text[caret] == "-"){
                                            //$(this).caret(caret+1)
                                        } else if (text[caret - 1] == "-") {
                                            $(this).caret(caret - 1)
                                        }
                                    }

                                    exempt = "Backspace, ArrowLeft, ArrowRight, ArrowDown, ArrowUp, 1234567890, Home, End, Tab"
                                    if(exempt.indexOf(event.key) == -1){
                                        event.preventDefault()
                                        event.stopImmediatePropagation()
                                        //console.log(event)
                                    }

                                    if(event.key == " "){
                                        event.preventDefault()
                                        event.stopImmediatePropagation()
                                        //console.log(event)
                                    }

                                    if ("QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm,".indexOf(event.key) != -1){
                                        event.preventDefault()
                                        event.stopImmediatePropagation()
                                    }

                                    if (typeof $(this).val().split("-").join("") != 'undefined'){
                                        if ($(this).val().split("-").join("").length == 6 && "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890".indexOf(event.key) != -1){
                                            event.preventDefault()
                                            event.stopImmediatePropagation()
                                        }
                                    }
                                }).on("paste", function(event){
                                    event.preventDefault();

                                    navigator.clipboard.readText().then(
                                        clipText => {
                                            text = []
                                            for (i of clipText.split("")){
                                                if ("1234567890".indexOf(i) != -1){
                                                    text.push(i)
                                                }
                                            }
                                            $(this).val(cardInput(text.join("")))
                                        });

                                    event.stopImmediatePropagation()

                                    //write notification to alert user that paste is not allowed
                                }),

                                clearText()
                            ),
                            formText(name, form_text)
                        )
                    )
                } else if (typeof index["attr"]["verificationCodeInput"] != "undefined"){
                    rowElement.append(
                        col(breakpoint(), colSize).addClass("mb-3").append(
                            labelElement(name, label),
                            flexbox().append(
                                inputElement().attr(index["attr"]).on("keyup", function(event){
                                    //console.log(formattedText)
                                    exempt = "ArrowLeft, ArrowRight, ArrowDown, ArrowUp, End, Home"
                                    if (exempt.indexOf(event.key) == -1){
                                        caretPosition_ = $(this).caret()

                                        if ($(this).val().length > 0){
                                            formattedText = verificationCodeInput(`${$(this).val()}`)
                                            $(this).val(formattedText)
                                        }

                                        if (event.key == "Backspace"){
                                            
                                            if (typeof formattedText === 'undefined'){

                                            }else{
                                                if (formattedText[caretPosition_ - 1] == ","){
                                                    $(this).caret(caretPosition_ - 1)    
                                                } else {
                                                    $(this).caret(caretPosition_)
                                                }
                                            }
                                        }
                                    }
                                    //$(this).val(formattedText)
                                }).on("keydown", function(event){
                                    if (event.key == "Backspace"){
                                        text = $(this).val()
                                        caret = $(this).caret()

                                        if (text[caret] == "-"){
                                            //$(this).caret(caret+1)
                                        } else if (text[caret - 1] == "-") {
                                            $(this).caret(caret - 1)
                                        }
                                    }

                                    exempt = "Backspace, ArrowLeft, ArrowRight, ArrowDown, ArrowUp, 1234567890, Home, End, Tab"
                                    if(exempt.indexOf(event.key) == -1){
                                        event.preventDefault()
                                        event.stopImmediatePropagation()
                                        //console.log(event)
                                    }

                                    if(event.key == " "){
                                        event.preventDefault()
                                        event.stopImmediatePropagation()
                                        //console.log(event)
                                    }

                                    if ("QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm,".indexOf(event.key) != -1){
                                        event.preventDefault()
                                        event.stopImmediatePropagation()
                                    }

                                    if (typeof $(this).val().split("-").join("") != 'undefined'){
                                        if ($(this).val().split("-").join("").length == 6 && "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890".indexOf(event.key) != -1){
                                            event.preventDefault()
                                            event.stopImmediatePropagation()
                                        }
                                    }
                                }).on("paste", function(event){
                                    event.preventDefault();

                                    navigator.clipboard.readText().then(
                                        clipText => {
                                            text = []
                                            for (i of clipText.split("")){
                                                if ("1234567890".indexOf(i) != -1){
                                                    text.push(i)
                                                }
                                            }
                                            $(this).val(cardInput(text.join("")))
                                        });

                                    event.stopImmediatePropagation()

                                    //write notification to alert user that paste is not allowed
                                }),

                                clearText()
                            ),
                            formText(name, form_text)
                        )
                    )
                } else if (typeof index["attr"]["mobileInput"] != "undefined"){
                    rowElement.append(
                        col(breakpoint(), colSize).addClass("mb-3").append(
                            labelElement(name, label),
                            flexbox().append(
                                inputElement().attr(index["attr"]).on("keyup", function(event){
                                    //console.log(formattedText)
                                    exempt = "ArrowLeft, ArrowRight, ArrowDown, ArrowUp, End, Home"
                                    if (exempt.indexOf(event.key) == -1){
                                        caretPosition_ = $(this).caret()

                                        if ($(this).val().length > 0){
                                            formattedText = mobileInput(`${$(this).val()}`)
                                            $(this).val(formattedText)
                                        }

                                        if (event.key == "Backspace"){
                                            
                                            if (typeof formattedText === 'undefined'){

                                            }else{
                                                if (formattedText[caretPosition_ - 1] == ","){
                                                    $(this).caret(caretPosition_ - 1)    
                                                } else {
                                                    $(this).caret(caretPosition_)
                                                }
                                            }
                                        }
                                    }
                                    //$(this).val(formattedText)
                                }).on("keydown", function(event){
                                    if (event.key == "Backspace"){
                                        text = $(this).val()
                                        caret = $(this).caret()
                                        
                                        if (text.length == 5){
                                            event.preventDefault()
                                            event.stopImmediatePropagation()
                                            return null
                                        }
                                        
                                        if (text[caret] == "-"){
                                            $(this).caret(caret+1)
                                        } else if (text[caret - 1] == "-") {
                                            $(this).caret(caret - 1)
                                        }
                                    }

                                    exempt = "Backspace, ArrowLeft, ArrowRight, ArrowDown, ArrowUp, 1234567890, Home, End, Tab"
                                    if(exempt.indexOf(event.key) == -1){
                                        event.preventDefault()
                                        event.stopImmediatePropagation()
                                        //console.log(event)
                                    }

                                    if(event.key == " "){
                                        event.preventDefault()
                                        event.stopImmediatePropagation()
                                        //console.log(event)
                                    }

                                    if ("QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm, ".indexOf(event.key) != -1){
                                        event.preventDefault()
                                        event.stopImmediatePropagation()
                                    }

                                    if (typeof $(this).val().split("-").join("") != 'undefined'){
                                        if ($(this).val().split("-").join("").length == 13 && "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890".indexOf(event.key) != -1){
                                            event.preventDefault()
                                            event.stopImmediatePropagation()
                                        }
                                    }
                                }).on("paste", function(event){
                                    event.preventDefault();

                                    navigator.clipboard.readText().then(
                                        clipText => {
                                            text = []
                                            for (i of clipText.split("")){
                                                if ("1234567890".indexOf(i) != -1){
                                                    text.push(i)
                                                }
                                            }
                                            $(this).val(mobileInput(text.join("")))
                                        });

                                    event.stopImmediatePropagation()

                                    //write notification to alert user that paste is not allowed
                                }),

                                clearText()
                            ),
                            formText(name, form_text)
                        )
                    )
                } else if (typeof index["attr"]["cardCvc"] != "undefined"){
                    rowElement.append(
                        col(breakpoint(), colSize).addClass("mb-3").append(
                            labelElement(name, label),
                            inputElement().attr(index["attr"]).on("keyup", function(event){
                                //console.log(formattedText)
                                //$(this).val(formattedText)
                            }).on("keydown", function(event){
                                if (event.key == "Backspace"){
                                    text = $(this).val()
                                    caret = $(this).caret()
                                    
                                    if (text[caret] == "-"){
                                        $(this).caret(caret+1)
                                    } else if (text[caret - 1] == "-") {
                                        $(this).caret(caret - 1)
                                    }
                                }

                                exempt = "Backspace, ArrowLeft, ArrowRight, ArrowDown, ArrowUp, 1234567890, Home, End, Tab"
                                if(exempt.indexOf(event.key) == -1){
                                    event.preventDefault()
                                    event.stopImmediatePropagation()
                                    //console.log(event)
                                }

                                if(event.key == " "){
                                    event.preventDefault()
                                    event.stopImmediatePropagation()
                                    //console.log(event)
                                }

                                if ("QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm,".indexOf(event.key) != -1){
                                    event.preventDefault()
                                    event.stopImmediatePropagation()
                                }

                                if (typeof $(this).val() != 'undefined'){
                                    if ($(this).val().length == 3 && "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890".indexOf(event.key) != -1){
                                        event.preventDefault()
                                        event.stopImmediatePropagation()
                                    }
                                }
                            }).on("paste", function(event){
                                event.preventDefault();

                                navigator.clipboard.readText().then(
                                    clipText => {
                                        text = []
                                        for (i of clipText.split("")){
                                            if ("1234567890".indexOf(i) != -1  && text.length < 3){
                                                text.push(i)
                                            }
                                        }
                                        $(this).val(text.join(""))
                                    });

                                event.stopImmediatePropagation()

                                //write notification to alert user that paste is not allowed
                            }),
                            formText(name, form_text)
                        )
                    )
                } else if (typeof index["attr"]["inputLimit"] != "undefined"){
                    rowElement.append(
                        col(breakpoint(), colSize).addClass("mb-3").append(
                            labelElement(name, label),
                            flexbox().append(
                                inputElement().attr(index["attr"]).on("keyup", function(event){
                                    //console.log(formattedText)
                                    //$(this).val(formattedText)
                                }).on("keydown", function(event){

                                   if (event.key == "Backspace"){
                                        text = $(this).val()
                                        caret = $(this).caret()
                                        
                                        if (text[caret] == "-"){
                                            $(this).caret(caret+1)
                                        } else if (text[caret - 1] == "-") {
                                            $(this).caret(caret - 1)
                                        }
                                    }


                                    if(event.key == " "){
                                        event.preventDefault()
                                        event.stopImmediatePropagation()
                                        //console.log(event)
                                    }

                                    if (typeof $(this).val() != 'undefined'){
                                        if ($(this).val().length == $(this).attr("inputLimit") && "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890".indexOf(event.key) != -1){
                                            event.preventDefault()
                                            event.stopImmediatePropagation()
                                        }
                                    }
                                }),

                                clearText()
                            ),
                            formText(name, form_text)
                        )
                    )
                } else{
                    rowElement.append(
                        col(breakpoint(), colSize).addClass("mb-3").append(
                            labelElement(name, label),
                            flexbox().append(
                                inputElement().attr(index["attr"]),
                                clearText()
                            ),
                            formText(name, form_text)
                        )
                    )
                }
            } else if (index["tag"] == "select"){
                if (Object.keys(index).slice(-1) == "modalSize"){
                    selectModalSize = index["modalSize"]
                } else {
                    selectModalSize = "sm"
                }

                rowElement.append(
                    col("md", colSize).addClass("mb-3").append(
                        labelElement(name, label),
                        selectElement(index["options"], name, index["attr"], size=selectModalSize),
                        formText(name, form_text)
                    )
                )
            } else if (index["tag"] == "select-v2"){
                rowElement.append(
                    col("md", colSize).addClass("mb-3").append(
                        labelElement(name, label),
                        selectV2(index["options"], name, index["attr"]),
                        formText(name, form_text)
                    )
                )
            } else if (index["tag"] == "textarea"){

                var textareaInnerText = function(){
                    if (typeof index['attr']['value'] != "undefined"){
                        return index['attr']['value']
                    } else {
                        return ""
                    }
                }

                rowElement.append(
                    col("md", colSize).addClass("mb-3").append(
                        labelElement(name, label),
                        
                        textAreaElement().attr(index["attr"]).val(
                            textareaInnerText()
                        ),
                        
                        formText(name, form_text)
                    )
                )
            } else if (index["tag"] == "checkbox"){
                rowElement.append(
                    col("md", colSize).addClass("mb-3").append(
                        checkBox(label, index['attr'])
                    )
                )
            } else if (index["tag"] == "fileinput"){
                rowElement.append(
                    col("md", colSize).addClass("mb-3").append(
                        fileInput(index["attr"])
                    )
                )
            }
        }

        if (colOnly == true){
            return rowElement.children()
        } else {
            return rowElement
        }

    }
/* Form Element Constructor */

function clearForm(serializedFormObj){

    //clear transfer form
    for (field of serializedFormObj){
        $(`[name=${field["name"]}]`).val("")

        if ($(`[name=${field["name"]}]`).hasClass("form-select")){

            placeholder = $(`[name=${field["name"]}]`).attr("placeholder")

            $(`#${field["name"]}-text`).html(placeholder).css({
                "color": "grey",
                "letter-spacing": "0.4px"
            })

            $(`[data-name=${field['name']}]`).text(placeholder).css({
                "color": "grey",
                "letter-spacing": "0.4px"
            })

        }
    }
}

function customCheckBox(checkBoxId){
    return flexbox().addClass("justify-content-center align-items-center me-3").css({
        "border": "2px solid midnightblue",
        "min-width": "30px",
        "height": "30px",
        "border-radius": "5px",
        "overflow": "hidden"
    }).on("click", function(){
        if($(this).hasClass("checked")){
            $(this).empty()
            $(this).toggleClass("checked")
        } else {
            $(this).append(
                fontawesome("fas", "fa-check").addClass("m-0").css({
                    "color": "midnightblue",
                })
            )

            $(this).toggleClass("checked")
        }
    }).attr({
        "id": checkBoxId
    })
}

/*function buildKYCCodeForm(inputCount){
    inputElements = []

    for (var i = 0; i < inputCount; i++) {
        inputElements.push(
            inputElement().addClass("mx-3 fs-5").css({
                "font-family": "lato-bold",
                "color": "midnightblue",
            }).on("keydown", function(){

                if ($(this).val().length == 1 && event.key != "Backspace"){
                    event.preventDefault()
                    event.stopImmediatePropagation()
                }


                if (event.key == "Backspace" && $(this).val().length == 0){
                    $(this).prev().focus()
                }

                if(event.key == " "){
                    event.preventDefault()
                    event.stopImmediatePropagation()
                    //console.log(event)
                }

                if ("QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm,".indexOf(event.key) != -1){
                    event.preventDefault()
                    event.stopImmediatePropagation()
                }

                exempt = "Backspace, ArrowLeft, ArrowRight, ArrowDown, ArrowUp, 1234567890, Home, End, Tab"
                if(exempt.indexOf(event.key) == -1){
                    event.preventDefault()
                    event.stopImmediatePropagation()
                    //console.log(event)
                }



            }).on("keyup", function(){

                if(event.key == " "){
                    event.preventDefault()
                    event.stopImmediatePropagation()
                    //console.log(event)
                    return
                }

                if ("QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm,".indexOf(event.key) != -1){
                    event.preventDefault()
                    event.stopImmediatePropagation()

                    return
                }

                exempt = "Backspace, ArrowLeft, ArrowRight, ArrowDown, ArrowUp, 1234567890, Home, End, Tab"
                if(exempt.indexOf(event.key) == -1){
                    event.preventDefault()
                    event.stopImmediatePropagation()
                    //console.log(event)
                    return
                }

                if ($(this).val().length == 1 && event.key != "Backspace"){
                    $(this).next().focus()
                } else {
                    event.preventDefault()
                    event.stopImmediatePropagation()
                }
            })
        )
    }

    return flexbox().append(
            inputElements
        ).addClass("my-3")
}*/

