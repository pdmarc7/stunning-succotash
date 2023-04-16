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
                p("Page Under Construction").addClass("display-6 text-center mt-5 mb-3").css({
                    fontFamily: "Segoe UI Light"
                }),
                a(appBtn("Go Back To Home").addClass("tagbutton my-3"), "/"),

                img("https://img.freepik.com/free-vector/teamwork-connecting-jigsaw-puzzle-piece_53876-32592.jpg?w=740&t=st=1681563866~exp=1681564466~hmac=b4810fbd4fadcad432e16b6e1487bd475892ce222d6d50c8d5e53c8ae1975d6d", null, extend=false)
            ).css({
                "min-height": "100vh"
            })
        ),
    ]
}


