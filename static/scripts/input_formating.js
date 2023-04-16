function amountInput(inputAmount, decimalPlace=2){
    //ensure to supply inputAmount as a string
    inputAmount = String(inputAmount).split("")

    newInputAmount = []
    
    for (i of inputAmount){
        if ( i != ","){
            newInputAmount.push(i)
        }
    }

    newInputAmount = newInputAmount.join("")
    //console.log(newInputAmount)

    splitAmount = String(newInputAmount).split(".")
    //console.log(splitAmount)
    if (splitAmount.length > 1){
        amount = splitAmount[0]//.slice(0, 4)
        
        if (splitAmount[1].length == 0){
            decimalNumber = "-"    
        } else {
            decimalNumber = splitAmount[1].slice(0, decimalPlace)
        }
         

        /*if (decimalNumber.length < decimalPlace){
            emptyDigit = decimalPlace - decimalNumber.length

            decimalNumber = decimalNumber + ("0".repeat(emptyDigit))
        }*/
    } else if (splitAmount.length == 1){
        amount = splitAmount[0]//.slice(0, 4)
        decimalNumber = null //"0".repeat(decimalPlace)
    } else {
        return ""
    }

    amount = amount.split("").reverse()

    count = 0;
    for (i of amount){
        if (count%4 == 0){
            amount.splice(count, 0, ",");
        }
        count=count+1
    }

    if (amount[0] == ","){
        amount = amount.slice(1,)
    }

    if (decimalNumber){
        if (amount.length == 0){
            amount = ["0"]
        }

        if (decimalNumber == "-"){
            return amount.reverse().join("")+"."
        } else {
            return amount.reverse().join("")+"."+decimalNumber
        }
    }
    return amount.reverse().join("")//+"."+decimalNumber
}

function cardInput(cardDetails){
    newCardNumber = []
    
    for (i of cardDetails){
        if ( i != "-" && "1234567890".indexOf(i) != -1){
            newCardNumber.push(i)
        }
    }

    cardNumber = String(newCardNumber.join("")).slice(0, 16).split("")
    for (i of [4, 9, 14]){
        if (cardNumber.length > i){
            cardNumber.splice(i, 0, "-");
        }
    }

    return cardNumber.join("")

}

function sortCodeInput(sortCode){
    newSortCode = []
    
    for (i of sortCode){
        if ( i != "-" && "1234567890".indexOf(i) != -1){
            newSortCode.push(i)
        }
    }

    sortCode = String(newSortCode.join("")).slice(0, 6).split("")
    for (i of [2, 5]){
        if (sortCode.length > i){
            sortCode.splice(i, 0, "-");
        }
    }

    return sortCode.join("")

}

function mobileInput(mobileDetails){

    newMobileNumber = []
    mobileDetails = mobileDetails.split("+233-")[1]

    if (typeof mobileDetails == 'undefined'){
        return "+233-"
    }
    
    for (i of mobileDetails){
        if ( i != "-" && "1234567890".indexOf(i) != -1){
            newMobileNumber.push(i)
        }
    }


    mobileNumber = String(newMobileNumber.join("")).slice(0, 9).split("")
    
    for (i of [2, 6]){
        if (mobileNumber.length > i){
            mobileNumber.splice(i, 0, "-");
        }
    }

    return "+233-"+mobileNumber.join("")
}

function verificationCodeInput(verificationCode){
    newVerificationCode = []
    
    for (i of verificationCode){
        if ( i != "-" && "1234567890".indexOf(i) != -1){
            newVerificationCode.push(i)
        }
    }

    verificationCode = String(newVerificationCode.join("")).slice(0, 6).split("")
    for (i of [1, 3, 5, 7, 9]){
        if (verificationCode.length > i){
            verificationCode.splice(i, 0, "-");
        }
    }

    return verificationCode.join("")
}