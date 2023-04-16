function buildRequestObj(serializedArr){
    var requestObj = {}

    for (i of serializedArr){
        requestObj[i["name"]] = i["value"]
    }

    return JSON.stringify(requestObj)
}


async function postRequest(endpoint, requestObj){
    var data = new FormData()

    for (i of requestObj){
        data.append(i["name"], i["value"])
    }

    response = await fetch(endpoint, {
        method: "POST",
        body: data,
    })

    return response.json()
}

async function postJSONRequest(endpoint, requestObj){
    //use flask.request.json() to read data with flask framework
    response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(requestObj),
        headers: {"Content-Type": "application/json"},
    })

    return response.json()
}

async function blobRequest(endpoint, requestObj){
    //use flask.request.json() to read data with flask framework
    response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(requestObj),
        headers: {"Content-Type": "application/json"},
    })

    return response.blob()
}

async function getRequest(endpoint){
    response = await fetch(endpoint)
    return response.json()
}
