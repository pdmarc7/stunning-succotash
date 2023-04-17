pageObj = {
    navigationArray: [
        /*{
            title: "Blog",
            clickFunction: function(){

            },
            link: "/blog"
        },*/

        {
            title: "Return To Blog Home",
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
            blogContent(pageObj.blogContent),

            renderComments(pageObj.blogContent.comments).addClass()
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
                            blogIcon("chat-dots", `${blogPost.comments.length} Comment(s)`)
                        ),

                        p(blogPost.content).addClass("").css({
                            fontFamily: "futura-regular",
                            color: "#485664",
                        }),

                        $("<hr>")
                    ),


                    flexbox().addClass("justify-content-start my-4 px-4").append(
                        a(appBtn("Read More Posts").addClass("py-2"), "/"),
                        a(appBtn("Leave A Comment").addClass("py-2"), `/comment/${blogPost.postId}`).addClass("ps-3")
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

function renderComments(comments){
    //randomImageAvatars = []

    commentObjs = []

    for (const comment of comments){
        commentObjs.push(
            div().addClass("shadow px-4 py-4 rounded-3 mb-5 w-100").append(
                div().append(
                    p(`${comment.firstName} ${comment.lastName}`).css({
                        fontFamily: "futura-pk-medium",
                    }),
                    
                    p(`${comment.datePublished}`).css({
                        color: "grey", 
                        fontFamily: "Segoe UI Regular",
                        fontSize: "small"
                    }).addClass("mb-3"),
                    
                    p(`${comment.comment}`).addClass("").css({

                    })
                )
            ).css({
                "max-width": "800px",
            })
        )
    }

    return row().append(
        col(null, 12).addClass("mb-3").append(
            flexbox().addClass("align-items-center w-100 flex-column").append( 
                div().addClass("px-4 pb-2 w-100").append(
                    flexbox().append(
                        (function(){
                            if (comments.length > 0){
                                return p("Comments").addClass("fs-2").css({
                                    fontFamily: "Segoe UI Light",
                                    color: "grey"
                                })
                            } else {
                                return p("No Comments Yet").addClass("fs-2").css({
                                    fontFamily: "Segoe UI Light",
                                    color: "grey"
                                })
                            }
                        })
                    ).addClass("justify-content-end"),
                ).css({
                    "max-width": "800px",
                }),

                commentObjs
            )
        )
    )
}