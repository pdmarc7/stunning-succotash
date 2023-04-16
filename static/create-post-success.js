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
        container().addClass("").append(
            flexbox().addClass("justify-content-center align-items-center flex-column").append(
                icon("check-circle-fill").css({
                    fontSize: "10rem",
                    color: primaryColor
                }),

                p("We Have Received Your Blog Post").addClass("text-center fs-2 mt-3").css({
                    fontFamily: "Segoe UI Light"
                }),

                p("Your Post Has Been Published").addClass("text-center fs-6 mt-3").css({
                    fontFamily: "Segoe UI Regular"
                }),

                a(appBtn("Go Back").addClass("mt-3"), "/")
            ).css({
                height: "100vh"
            })
        ),
    ]
}


