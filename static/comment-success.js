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
            flexbox().addClass("justify-content-center align-items-center flex-column my-5").append(
                icon("check-circle-fill").css({
                    fontSize: "10rem",
                    color: primaryColor
                }),

                p("Comment Posted Successfully").addClass("text-center fs-2 mt-3").css({
                    fontFamily: "Segoe UI Light"
                }),

                p("Click The Button Below To Return To Blog").addClass("text-center fs-6 mt-3").css({
                    fontFamily: "Segoe UI Regular"
                }),

                a(appBtn("Return To Blog").addClass("mt-3"), `/blog/${postId}`)

                //a(appBtn("Continue Review").addClass("mt-3"), `/review-article/${postId}/0`)
            ).css({
                "min-height": "100vh"
            })
        ),


    ]
}


