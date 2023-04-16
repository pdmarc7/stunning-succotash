pageObj = {
    title: "Yaniko Ltd",
    subTitle: "Global Solutions For Innovation",
    navigationArray: [
        /*{
            title: "Blog",
            clickFunction: function(){

            },
            link: "/blog"
        },*/

        {
            title: "Return To Blog",
            clickFunction: function(){

            },
            link: "/"
        },

        {
            title: "Search",
            clickFunction: function(){

            },
            link: "/search"
        },

        /*{
            title: "Become A Publisher",
            clickFunction: function(){

            },
            link: "#"
        },

        {
            title: "Help Us Review Content",
            clickFunction: function(){

            },
            link: "/signup"
        },

        {
            title: "Support Us",
            clickFunction: function(){

            },
            link: "/support"
        },

        {
            title: "Login",
            clickFunction: function(){

            },
            link: "/login"
        },*/
    ],
    blogContent:blogPageContent
}

primaryColor = "#01579b"
secondaryColor = "#ffffff"
textiaryColor = "#00838f"

themeColor = "rgb(14, 162, 189)"

$(async function(){
    createBody()
});

function createBody(){
    return $("#body").append(
        AppPage(),
    )
}

function AppPage(){
    return [
        pageNavigation(pageObj.navigationArray).addClass("sticky-top"),
        navOffCanvas(pageObj.navigationArray),
        div().addClass("container-fluid").append(
            blogSubNav(),
        ),

        container().addClass("").append(
            blogContent(pageObj.blogContent)
        )
    ]
}

/*function blogSubNav(){
    return row().append(
        col(null, 12).append(
            container().append(
                flexbox().addClass("align-items-center flex-wrap py-2").append(
                    p("Blog").addClass("fs-2").css({
                        "font-family": "Segoe UI Light"
                    }),
                    flexbox().addClass("align-items-center ms-auto").append(
                        p("Home").css({
                            fontFamily: "Segoe UI Regular",
                            color: "rgb(14, 162, 189)",
                            cursor: "pointer"
                        }).on("click", function(){
                            window.location.assign(
                                "/"
                            )
                        }),

                        p("/").addClass("mx-1").css({
                            fontFamily: "Segoe UI Regular",
                            color: "#8f9fae"
                        }),

                        p("Blog").css({
                            fontFamily: "Segoe UI Regular",
                            color: "rgb(14, 162, 189)",
                            cursor: "pointer"
                        }).on("click", function(){
                            window.location.assign(
                                "/blog"
                            )
                        }),

                        p("/").addClass("mx-1").css({
                            fontFamily: "Segoe UI Regular",
                            color: "#8f9fae"
                        }),

                        p("Blog Details").css({
                            fontFamily: "Segoe UI Regular",
                        })
                    )
                )
            )
        )
    ).css({
        backgroundColor: "rgba(72, 86, 100, 0.05)",
    })
}*/

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



function blogContent(blogPost){
    return row().append(
        col(null, 12).addClass("my-5").append(
            flexbox().addClass("justify-content-center w-100").append(
                div().addClass("shadow").append(
                    flexbox().addClass("justify-content-center w-100").append(
                        img(blogPost.primaryImageURL, "100%", extend=false).css({
                            "object-fit": "cover"
                        }),
                    ).css({
                        "max-height": "500px",
                        "overflow": "hidden"
                    }),


                    div().addClass("pt-5 px-4").append(
                        p(blogPost.title).addClass("display-6 lh-sm").css({
                            fontFamily: "futura-pk-medium",
                            color: "#485664",
                        }),

                        flexbox().addClass("flex-wrap my-3").append(
                            blogIcon("person", blogPost.author).addClass("me-3"),
                            blogIcon("clock-history", blogPost.datePublished).addClass("me-3"),
                            //blogIcon("chat-dots", `${blogPost.commentsNo} Comments`)
                        ),

                        p(blogPost.content).addClass("").css({
                            fontFamily: "futura-regular",
                            color: "#485664",
                        }),

                        $("<hr>")
                    ),


                    flexbox().addClass("justify-content-center my-4").append(
                        appBtn("Read More Posts").addClass("tagbutton py-2").on("click", function(){
                            window.location.assign(
                                "/blog"
                            )
                        })
                    )
                ).css({
                    "max-width": "800px",
                })
            )
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