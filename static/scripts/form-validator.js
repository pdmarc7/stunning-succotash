function validateForm(serializedArr){
    var warnings = []

    for (formObj of serializedArr){
        var result = validateFormInputObj(formObj["name"])

        if (result){
            warnings.push(
                result   
            )
        }
    }

    return warnings
}

function validateFormInputObj(obj){
    var target = $(`[name=${obj}]`)
    var label = $(`label[for=${obj}]`)
    var smallText = $(`small[for=${obj}]`)

    if (target.attr("type") == "text"){
        var value = target.val()
        
        if (value.length < 1){
            return p(`<em>${label.text()}</em> - Required`).css({
                "color": "darkred",
                "font-family": "Segoe UI Regular",
                "font-size": "15px"
            }).addClass("form-text mb-0")
        }

        /* 
            Start every email form-input with a name attr following the format;
                email-whatever

            For password it mus
        */

        if (obj.split("-")[0] == "email"){
            if (!validateEmail(value)){
                return p(`<em>${label.text()}</em> - Invalid`).css({
                    "color": "darkred",
                    "font-family": "Segoe UI Regular",
                    "font-size": "15px"
                }).addClass("form-text mb-0")
            }
        }

    } else if (target.attr("type") == "password"){
        var value = target.val()

        if (value.length < 8){
                return p(`<em>${label.text()}</em> - Minimum Of 8 Character`).css({
                    "color": "darkred",
                    "font-family": "Segoe UI Regular",
                    "font-size": "15px"
                }).addClass("form-text mb-0") 
        }

        if (label.text() == "Password" && $(`label[for="${obj}-confirm"]`).text().length > 0){
            if (value != $(`[name="${target.attr("name")}-confirm"]`).val() ){
                return p(`<em>${label.text()}</em> - Does Not Match <em>Confirm Password</em>`).css({
                    "color": "darkred",
                    "font-family": "Segoe UI Regular",
                    "font-size": "15px"
                }).addClass("form-text mb-0") 
            }
        }
    } else if (target.attr("type") == "checkbox"){

    } else if (target.attr("type") == "file"){

    } else if (target.attr("type") == "select"){

    } else if (target.attr("type") == "textarea"){

    }
}

function validatePassword(){

}

function validateTextInput(){

}

function validateCheckBox(){

}

function validateCustomCheckBox(checkBoxId){
    return $(`#${checkBoxId}`).hasClass("checked")
}

function validateSelect(){

}

function validateFileInput(){

}

function validateTextArea(){

}

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

