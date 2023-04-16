function showNotificationToast(notificationType, eventTime, title, message){

    var toastBody;
    var messageContainer = div().addClass("toast-body").append(
                flexbox().append(
                    p(title).addClass("mb-0 flex-grow-1").css({
                        "font-family": "futura-medium"
                    }),
                    $("<small>").html(eventTime).addClass("me-2").css({
                        "font-family": "futura-book-font"
                    }),
                )
            )

    var toastCloseBtn = icon("x-circle-fill").addClass("me-2").attr({
                            "data-bs-dismiss": "toast"
                        }).css({
                            "max-width": "25px",
                            "font-size": "1.6rem",
                            "cursor": "pointer",
                            "color": "#b71c1c"
                        })

    if (notificationType == "success"){
        toastBody = messageContainer.append(
            flexbox().addClass("align-items-center").append(
                icon("check2-circle").addClass("me-3").css("color", "darkgreen"),
                message.addClass("flex-grow-1"),
                toastCloseBtn
            )
        )
    } else if (notificationType == "failed"){
        toastBody = messageContainer.append(
            flexbox().addClass("align-items-center").append(
                icon("exclamation-circle").addClass("me-3").css("color", "darkred"),
                message.addClass("flex-grow-1"),
                toastCloseBtn
            )
        )
    } else {
        toastBody = messageContainer.append(
            flexbox().addClass("align-items-center").append(
                icon("exclamation-circle").addClass("me-3").css("color", "midnightblue"),
                message.addClass("flex-grow-1"),
                toastCloseBtn
            )
        )
    }

    $("#toast-container").append(
        createToastBody(toastBody).bind("hidden.bs.toast", function(){
            $(this).remove()
        })
    )

    $(".yaniko-toast").toast("show")
}

function hideNotificationToast(){
    $("#yanikoToast").toast("hide")
}

function createToastContainer(){
    return div().addClass("toast-container position-fixed bottom-0 end-0 p-3").attr({
        "id": "toast-container"
    })
}

function createToastBody(message){
    var body = div().attr({
            "role": "alert",
        }).addClass("toast yaniko-toast shadow-lg").append(
            message
        ).css({
            "background-color": "#ffffff",
            "opacity": "1"

        })

    return body
}

/*function updateRecentActivities(){
    for (i in newActivitesObj){
        state = newActivitesObj[i]
        $("#notifications").prepend(
            buildActivity(state), divider().css({"background-color": "lavender"})
        )
    }
}*/

$(".yaniko-toast").bind("hidden.bs.toast", function(){
    $("#toast-container").empty()
})
