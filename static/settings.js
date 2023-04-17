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
            title: "About",
            clickFunction: function(){

            },
            link: "/about"
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

        container().addClass("pt-4").append(
            p("Update Application Settings").css({
                fontFamily: "Segoe UI Light"
            }).addClass("fs-2 mb-5 text-center"),

            form().append(
                settingsForm(),
                flexbox().addClass("justify-content-center").append(
                    appBtn("Update App Settings").addClass("tagbutton mt-2 mb-5 submit")
                )
            ).addClass("").attr({
                "method": "POST",
                "action": "/settings"
            })
        ),
    ]
}


function settingsForm(){
    var formObj = [
        {
            "tag": "input",
            "label": "Authorization Key",
            "formText": "Application Update Authorization Key",
            "attr": {
                "name": "authorizationKey",
                "placeholder": "Enter The Authorization Key"
            },

            "colSize": 12,
            "breakpoint": "md"
        },


        {
            "tag": "input",
            "label": "App Name",
            "formText": "Application Name",
            "attr": {
                "name": "appName",
                "placeholder": "Application Name in Title HTML Tag"
            },

            "colSize": 12,
            "breakpoint": "md"
        },

        {
            "tag": "input",
            "label": "App Title",
            "formText": "Application Jumbotron Title",
            "attr": {
                "name": "appTitle",
                "placeholder": "Title Of Your App Jumbotron"
            },

            "colSize": 6,
            "breakpoint": "md"
        },

        {
            "tag": "input",
            "label": "App Sub-Title",
            "formText": "Application Jumbotron Sub-Title",
            "attr": {
                "name": "appSubTitle",
                "placeholder": "Sub-Title Of Your App Jumbotron"
            },

            "colSize": 6,
            "breakpoint": "md"
        },


        {
            "tag": "input",
            "label": "Jumbotron Image URL",
            "formText": "Jumbotron Image URL",
            "attr": {
                "name": "appJumbotron",
                "placeholder": "Image URL For Application Jumbotron"
            },

            "colSize": 12,
            "breakpoint": "md"
        },



        {
            "tag": "textarea",
            "label": "About Statement",
            "formText": "Application About Statement",
            "attr": {
                "name": "appAbout",
                "rows": 10,
                "placeholder": "Write Your Application About Statment"
            },

            "colSize": 12,
            "breakpoint": "md"
        },
    ]

    return buildForm(formObj)
}


