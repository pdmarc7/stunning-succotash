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
            title: "Home",
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
        },*/

        /*{
            title: "Help Us Review Content",
            clickFunction: function(){

            },
            link: "/signup"
        },*/

        {
            title: "Create Blog Post",
            clickFunction: function(){

            },
            link: "/create-post"
        },

        {
            title: "Support This Site",
            clickFunction: function(){

            },
            link: "/support"
        },

        /*{
            title: "Login",
            clickFunction: function(){

            },
            link: "/login"
        },*/
    ],
    blogPosts: blogPostsObj
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
            flexbox().addClass("justify-content-center align-items-center flex-column").append(
                p("Happy Easter").addClass("text-center display-3").css({
                    "font-family": "Segoe UI Light",
                    "color": "#ffffff"
                }),

                p("A Programmer's Personal Blog").addClass("text-center fs-5").css({
                    "font-family": "futura-pk-light",
                    "color": "#ffffff"
                }),
            ).css({
                "background-image": `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${jumbotronImage})`,
                "min-height": "400px",
                "background-position": "center",
                "background-repeat": "no-repeat",
                "background-size": "cover",
                "position": "relative"
            })
        ),

        container().addClass("").append(

            (function(){
                if (pageObj.blogPosts.length < 1){
                    return noArticlesToView()
                }

                return blogGallery(pageObj.blogPosts)
            })(),

        )
    ]
}

/*function blogSubNav(){
    return row().append(
        col(null, 12).append(
            container().append(
                flexbox().addClass("align-items-center flex-wrap py-2").append(
                    p(`${appName}`).addClass("fs-2").css({
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
                            fontFamily: "Segoe UI Regular"
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


/*{
    primaryImageURL: "path/to/image",
    postId: "04b2ada38474299aa5e0b3d3",
    title: "Aute sunt ut deserunt sint et voluptate id qui labore aliqua dolor amet.",
    content: "Sit deserunt nostrud fugiat velit exercitation est officia dolore nostrud ullamco minim adipisicing dolor dolor amet sed id enim culpa.",
    author: "Cupidatat dolor",
    datePublished: "Jan 1, 2020",
    commentsNo: 12

}*/