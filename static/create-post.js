primaryColor = "#01579b"
secondaryColor = "#ffffff"
textiaryColor = "#00838f"

themeColor = "rgb(14, 162, 189)"

var navigationArrayContent = [
        /*{
            title: "Create Blog Post",
            clickFunction: function(){

            },
            link: "/create-post"
        },*/

        {
            title: "Back To Blog Home",
            clickFunction: function(){

            },
            link: "/"
        },

        /*{
            title: "Blog",
            clickFunction: function(){
                //window.location.assign("/blog")
            },
            link: "/review-blog"
        },*/



        /*{
            title: "Settings",
            clickFunction: function(){

            },
            link: "/settings"
        },

        {
            title: "Logout",
            clickFunction: function(){

            },
            link: "/logout"
        },*/
    ]


pageObj = {
    "articlesReviewed": 460,
    "articlesTotal": 460,

    "articlesToReview": []
}


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
        pageNavigation(navigationArrayContent).addClass("sticky-top"),
        navOffCanvas(navigationArrayContent),

        div().addClass("container-fluid").append(
            blogSubNav(),
        ),

        container().addClass("mt-5").append(
            p("New Blog Post").css({
                fontFamily: "Segoe UI Light"
            }).addClass("fs-2 mb-5 text-center"),

            form().append(
                createPostForm(),
                flexbox().addClass("justify-content-center").append(
                    appBtn("Post Blog Content").addClass("tagbutton mt-2 mb-5 submit")
                )
            ).addClass("").attr({
                "method": "POST",
                "action": "/create-post"
            })
        ),
    ]
}


function createPostForm(){
    var formObj = [
        {
            "tag": "input",
            "label": "Authorization Key",
            "formText": "Enter The Authorization Key",
            "attr": {
                "name": "authorizationKey",
                "placeholder": "Use Authorization Key To Approve This Post"
            },

            "colSize": 12,
            "breakpoint": "md"
        },

        {
            "tag": "input",
            "label": "Title",
            "formText": "Blog Post Title",
            "attr": {
                "name": "title",
                "placeholder": "Title Of Your Blog Post"
            },

            "colSize": 6,
            "breakpoint": "md"
        },

        {
            "tag": "input",
            "label": "Author (Full Name)",
            "formText": "Name Of Author Of Article",
            "attr": {
                "name": "author",
                "placeholder": "Title Of Author"
            },

            "colSize": 6,
            "breakpoint": "md"
        },


        {
            "tag": "input",
            "label": "Image URL",
            "formText": "Primary Image URL",
            "attr": {
                "name": "primaryImageURL",
                "placeholder": "Image URL For Primary Image In Blog"
            },

            "colSize": 12,
            "breakpoint": "md"
        },

        {
            "tag": "input",
            "label": "Photo Credit(s)",
            "formText": "Photo Credit(s) For Blog Post Image",
            "attr": {
                "name": "photoCredit",
                "placeholder": "Attributions For Image In Blog In Text Or HTML"
            },

            "colSize": 12,
            "breakpoint": "md"
        },

        {
            "tag": "textarea",
            "label": "Post Context/Theme",
            "formText": "Write The Main Context/Theme Of Your Blog Post",
            "attr": {
                "name": "context",
                "rows": 3,
                "placeholder": "Write The Context/Theme Of Your Blog Post In HTML"
            },

            "colSize": 12,
            "breakpoint": "md"
        },

        {
            "tag": "textarea",
            "label": "Blog Post Content",
            "formText": "Write The Content Of Your Blog Post",
            "attr": {
                "name": "content",
                "rows": 10,
                "placeholder": "Write The Content Of Your Blog Post In Text Or HTML"
            },

            "colSize": 12,
            "breakpoint": "md"
        },
    ]

    return buildForm(formObj)
}
