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
            title: "Return To Dashboard",
            clickFunction: function(){

            },
            link: "/dashboard"
        },

        /*{
            title: "Blog",
            clickFunction: function(){
                //window.location.assign("/blog")
            },
            link: "/review-blog"
        },*/


        {
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
        },
    ]


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
        pageNavigation(navigationArrayContent).addClass("sticky-top"),
        navOffCanvas(navigationArrayContent),

        div().addClass("container-fluid").append(
            blogSubNav(),
        ),

        container().addClass("my-5").append(
            p("Write A Comment").css({
                fontFamily: "Segoe UI Light"
            }).addClass("fs-2 mb-5 text-center"),

            /*p("Article").css({
                fontFamily: "Segoe UI Regular",
            }).addClass("fs-6 text-start"),*/

            flexbox().addClass("justify-content-start").append(
                a(appBtn("Skip To Start Review").addClass("tagbutton mt-2 mb-3"), `/review-article/${pageObj.postId}/0`),
            ),

            p(pageObj.title).css({
                fontFamily: "futura-pk-regular",
                color: "grey",
            }).addClass("fs-5 mb-3 text-start"),

            form().append(
                inputElement().attr({
                    "name": "postId",
                    "value": pageObj.postId,
                }).css({
                    "display": "none",
                }),

                createPostForm(),
                flexbox().addClass("justify-content-center").append(
                    appBtn("Post Comment").addClass("tagbutton mt-2 mb-5 submit"),
                )
            ).addClass("").attr({
                "method": "POST",
                "action": "/post-comment"
            })
        ),
    ]
}

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

function createPostForm(){
    var formObj = [
        {
            "tag": "textarea",
            "label": "Leave A Comment",
            "formText": "Write The Comment Of The Blog Post",
            "attr": {
                "name": "comment",
                "rows": 5,
                "placeholder": "Write The Comment Of The Blog Post"
            },

            "colSize": 12,
            "breakpoint": "md"
        },
    ]

    return buildForm(formObj)
}
