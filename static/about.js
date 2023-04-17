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
            title: "Settings",
            clickFunction: function(){

            },
            link: "/settings"
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
}

primaryColor = "#01579b"
secondaryColor = "#ffffff"
textiaryColor = "#00838f"

themeColor = "rgb(14, 162, 189)"


$(async function(){
    /*loadingContentView()
    requesting blog post data to build page

    var response = await getRequest("/blog-post-cards")

    console.log(response)

    if (response["status"] == "success"){
        manipulateSpace("body", AppPage())
    } else {
        manipulateSpace("body", errorContentView())
    }*/

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
                p("About").addClass("text-center display-3").css({
                    "font-family": "Segoe UI Light",
                    "color": "#ffffff"
                }),
            ).css({
                "background-image": `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${jumbotronImage})`,
                "min-height": "400px",
                "background-position": "center",
                "background-repeat": "no-repeat",
                "background-size": "cover",
                "position": "relative"
            }),

            flexbox().addClass("justify-content-center align-items-center flex-column my-5 px-4").append(
                p(aboutStatement).addClass("fs-6 mb-3").css({
                    fontFamily: "Segoe UI Regular"
                }),
            )
        ),
    ]
}


