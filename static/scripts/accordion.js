/* Accordion Constructor */
    function createAccordion(accordionId, text, icon, icon_size, body){
        return div().addClass("accordion mx-auto").attr({
            "id": accordionId
        }).append(
            accordionItem().append(
                accordionHeader(accordionId).append(
                    accordionButton(accordionId, text, icon, icon_size)
                ),

                accordionCollapse(accordionId).append(
                    accordionBody(body)
                )
            ),
        )
    }

    function accordionItem(){
        return div().addClass("accordion-item")
    }

    function accordionHeader(accordionId){
        return h2().addClass("accordion-header").attr({
            "id": `${accordionId}Header`
        })
    }

    function accordionCollapse(accordionId){
        return div().addClass("accordion-collapse shadow-lg collapse show").attr({
            "data-bs-parent": `#${accordionId}`,
            "id": `${accordionId}Collapse`
        })
    }

    function accordionButton(accordionId, text, icon, icon_size){
        if (icon){
            return $("<button>").append(
                    div().addClass("d-flex justify-content-start align-items-center").append(
                        img(icon, icon_size),
                        p(text).addClass("my-0 mx-2")
                    )
                ).addClass("accordion-button tagheading fs-6").attr({
                "type": "button",
                "data-bs-toggle":"collapse",
                "data-bs-target": `#${accordionId}Collapse`
            })
        } else {
            return $("<button>").text(text).addClass("accordion-button tagheading fs-6").attr({
                "type": "button",
                "data-bs-toggle":"collapse",
                "data-bs-target": `#${accordionId}Collapse`
            })
        }
    }

    function accordionBody(body){
        return div().addClass("accordion-body").append(body)
    }
/* Accordion Constructor */