
function triggerNavOffCanvasBtn(){
    return div().append(
        fontawesome("fas", "fa-bars").css({
            "color": "black",
            "cursor": "pointer"
        }).addClass("me-3")
    ).on("click", function(){
        $("#navOffCanvas").offcanvas("show")
    }).attr({
        "id": "triggerNavOffCanvasBtn"
    })
}

function navOffCanvas(navigationArray) {
  var body = (function() {
    var result = [];

    for (const navObj of navigationArray) {
      var navClassName = navObj.title.replace(" ", "")

      var navItem = a(navObj.title, navObj.link).css({
        color: function() {
          if (_.first(navigationArray).title == navObj.title) {
            return "black";
          } else {
            return "grey";
          }
        },
        fontFamily: "futura-medium"
      }).addClass("fs-4 nav-item").attr({
        "data-navcode": navClassName
      })

      var underline = div().css({
        width: "0%",
        height: "3px",
        backgroundColor: "black",
        marginTop: "5px"
      }).addClass("underline");

      var navItemContainer = col(null, 12).append(
        flexbox().addClass("justify-content-center").append(
          div().addClass("nav-item py-3").css({
            cursor: "pointer",
            position: "relative"
          }).append(
            navItem,
            underline
          ).on("mouseenter", function() {
            var underline = $(this).find(".underline");
            gsap.to(underline, { width: "100%", duration: 0.3, ease: "power2.inOut" });
          }).on("mouseleave", function() {
            var underline = $(this).find(".underline");
            gsap.to(underline, { width: "0%", duration: 0.3, ease: "power2.inOut" });
          }).on("click", function() {
            $(".nav-item").each(function() {
              //var underline = $(this).find(".underline");
              //gsap.to(underline, { width: "0%", duration: 0.3, ease: "power2.inOut" });
              $(this).css({ color: "grey" });
            });

            //var underline = $(this).find(".underline");
            //gsap.to(underline, { width: "100%", duration: 0.3, ease: "power2.inOut" });
            $(`[data-navcode=${$(this).find("p").attr("data-navcode")}]`).css({ color: "black" });
            $("#navOffCanvas").offcanvas("hide")
          })
        )
      );

      result.push(navItemContainer);
    }

    // Set the first navItem to be active by default
    $(".nav-item:first-child").trigger("click");

    return flexbox().addClass("justify-content-center align-items-center flex-column h-100").append(
        icon("x-circle-fill").on("click", function(){
            $("#navOffCanvas").offcanvas("hide")
        }).addClass("align-self-end mx-3 mb-3").css("color", "black"),

        result
    );
  })();

  return createOffcanvas("navOffCanvas", body, "offcanvas-end", static=false);
}

function pageNavigation(navigationArray) {
    var navigationBar = flexbox().addClass("justify-content-end py-2 navbar px-2");

    for (const obj of navigationArray) {

        var navClassName = obj.title.replace(" ", "")

        var navItem = a(obj.title, obj.link)
            .on("click", obj.clickFunction)
            .addClass("px-2 py-2 nav-item mx-1")
            .css({
                "cursor": "pointer",
                "font-family": "futura-pk-medium",
                "letter-spacing": "0.5px"
            })
            .css({
                color: function() {
                    if (obj.title == _.first(navigationArray).title) {
                        return "black";
                    } else {
                        return "grey";
                    }
                }
            })
            .css({
                position: "relative",
                display: "inline-block"
            }).on("click", function(){
                $(".nav-item").css({
                    "color": "grey"
                })

                $(`[data-navcode=${$(this).attr("data-navcode")}]`).css({ color: "black" });
            }).attr({
                "data-navcode": navClassName,
            });

        var navItemUnderline = div()
            .addClass("nav-item-underline")
            .css({
                position: "absolute",
                bottom: 0,
                left: 0,
                width: 0,
                height: "2px",
                backgroundColor: "black",
                transition: "width 0.3s ease"
            });

        navItem.append(navItemUnderline);

        navItem.hover(function() {
            var tl = gsap.timeline();
            tl.to($(this).find(".nav-item-underline"), {width: "100%", duration: 0.03});
        }, function() {
            var tl = gsap.timeline();
            tl.to($(this).find(".nav-item-underline"), {width: "0", duration: 0.03});
        });

        navigationBar.append(
            (function(){
                if ($(window).width() <= 500){
                    return navItem.hide()
                } else {
                    return navItem
                }
            })()
        );
    }


    return div().addClass("mx-0 ").append(
        navigationBar.append(
            (function(){
                if ($(window).width() <= 500){
                    return triggerNavOffCanvasBtn()
                } else {
                    return triggerNavOffCanvasBtn().hide()
                }
            })()
        )
    ).css({
        "z-index": 100,
        "background-color": "transparent"
    });
}

function appBtn(btnText, btnType=null){
    return btn(btnText, btnType).css({
        "background-image": `linear-gradient(225deg, ${primaryColor} 0%, ${textiaryColor} 100%)`,
        "color": "#FFFFFF",
        "font-family": "futura-medium",
        "border": "none"
    }).addClass("shadow-sm")
}

function searchBtn(){
    return a(
        flexbox().addClass("rounded-circle align-items-center justify-content-center shadow").append(
            fontawesome("fas", "fa-magnifying-glass").css({
                color: "white",
                fontSize: "1.2rem"
            })
        ).css({
            backgroundImage: `linear-gradient(225deg, ${primaryColor} 0%, ${textiaryColor} 100%)`,
            width: "2.5rem",
            height: "2.5rem",
            cursor: "pointer",
            border: `linear-gradient(225deg, ${primaryColor} 0%, ${textiaryColor} 100%)`,
            //transition: "all 0.5s ease-out",
        }).hover(function(){
            $(this).css({
                backgroundImage: `linear-gradient(225deg, ${primaryColor} 0%, ${textiaryColor} 70%)`
            })
        }, function(){
            $(this).css({
                backgroundImage: `linear-gradient(225deg, ${primaryColor} 0%, ${textiaryColor} 100%)`
            })
        }),

        "/search"
    )
}

function blogCard(cardObj){
    return col("md", 4).addClass("px-4").append(
        div().addClass("shadow px-0 py-0 rounded-3").append(
            img(cardObj.primaryImageURL, "100%", extend=false),
            div().append(
                a(
                    p(cardObj.title).addClass("mt-2 fs-4 lh-sm").css({
                        fontFamily: "futura-pk-medium",
                        color: "#485664",
                        cursor: "pointer"
                    }).hover(function(){
                        $(this).css({
                            color: "rgb(14, 162, 189)"
                        })
                    }, function(){
                        $(this).css({
                            color: "#485664"
                        })
                    }),

                    `blog/${cardObj.postId}`
                ),

                flexbox().addClass("flex-wrap my-3").append(
                    blogIcon("person", cardObj.author).addClass("me-3"),
                    blogIcon("clock-history", cardObj.datePublished).addClass("me-3"),
                    blogIcon("chat-dots", `${cardObj.comments.length} Comment(s)`)
                ),

                p(cardObj.context).addClass("").css({
                   fontFamily: "futura-pk-regular"
                }),

                flexbox().append(
                    a(
                        appBtn("Read More").addClass("px-5 py-2"), `blog/${cardObj.postId}`
                    )
                ).addClass("mt-4 justify-content-end")
            ).addClass("py-3 px-4 mb-2")
        )
    )
}

function blogIcon(iconText, text){
    return flexbox().addClass("align-items-center").append(
        icon(iconText).css({
            fontSize: "1.3rem"
        }).addClass("me-1"),

        p(text).css({
            fontFamily: "Segoe UI Regular",
            color: "#6c757d",
            fontSize: "small"
        })
    )
}

function blogGallery(blogPosts){
    var results = row().addClass("py-5 gy-5 gx-3")

    for (const blogPost of blogPosts){
        results.append(
            blogCard(blogPost),
        )
    }

    return results

}


$(async function(){
    window.addEventListener("scroll", function() {
        var navbar = document.querySelector(".navbar");

        if (window.pageYOffset > 0) {
            navbar.style.backgroundColor = "#ffffff";
            navbar.style.boxShadow = "0px 2px 10px rgba(0, 0, 0, 0.1)";
        } else {
            navbar.style.backgroundColor = "transparent";
            navbar.style.boxShadow = "none";
        }
    });


    $(window).on("resize", function(){
        if ($(window).width() < 500){
            $(".navbar").find("a.nav-item").hide()
            $("#triggerNavOffCanvasBtn").show()
        } else {
            $("#navOffCanvas").offcanvas("hide")

            $(".navbar").find("a.nav-item").show()
            $("#triggerNavOffCanvasBtn").hide()
        }
    })
});

function loadingContentView(){
    $("#body").append(
        container().append(
            flexbox().addClass("align-items-center justify-content-center").append(
                spinner().css({
                    width: "5rem",
                    height: "5rem"
                })
            ).css({
                "min-height": "100vh"
            })
        )
    )
}

function errorContentView(){
    return container().append(
        flexbox().addClass("align-items-center justify-content-center flex-column").append(
            fontawesome("fas", "fa-triangle-exclamation").css({
                "font-size": "10rem"
            }),

            p("We're Experiencing Some Technical Difficulties").addClass("display-6 mt-3").css({
                fontFamily: "Segoe UI Light"
            })
        ).css({
            "min-height": "100vh"
        })
    )
}

function noArticlesToReview(){
    return flexbox().addClass("justify-content-center align-items-center flex-column mt-5").append(
        p("No Articles To Review For Now").css({
            fontFamily: "Segoe UI Light",

        }).addClass("fs-2 text-center")
    )
}

function noArticlesToView(){
    return flexbox().addClass("justify-content-center align-items-center flex-column mt-5").append(
        p("No Articles To View For Now").css({
            fontFamily: "Segoe UI Light",

        }).addClass("fs-2 text-center")
    )
}


function alertMessage(message){
    return div().addClass("alert alert-warning alert-dismissible fade show").attr({
        "role": "alert"
    }).append(
        message,
        $("<button>").addClass("btn-close").attr({
            "data-bs-dismiss": "alert",
            "type": "button"
        })
    )
}

async function displayFlashMessages(){
    var messages = await getRequest("/flash_messages")

    flashMessages = []

    for (const message of messages["messages"]){
        flashMessages.push(
            alertMessage(message)
        )
    }

    return flashMessages
}

$(async function(){
    $("body").append(
        `
        
        `,
    )

    $("head").append(
        `

        `,
    )
});

function blogSubNav(){
    var today = new Date()
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    return row().append(
        col(null, 12).append(
            container().append(
                flexbox().addClass("justify-content-end align-items-center flex-wrap py-3").append(
                    div().append(
                        /*p("Today's Date").addClass("").css({
                            fontFamily: "futura-pk-regular",
                            color: "grey"
                        }),*/

                        p(`${weekdays[today.getUTCDay()]}, ${today.getUTCDate()} ${months[today.getMonth()]}, ${today.getFullYear()}`).addClass("").css({
                            fontFamily: "Segoe UI Regular",
                            color: "black"
                        }),
                    )
                ),
            )
        )
    ).css({
        backgroundColor: "rgba(72, 86, 100, 0.05)",
    })
}
