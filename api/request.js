
function queryString(query) {
    let array = []
    for (let key in query) {
        let value = query[key]
        let text = key + '=' + value
        array.push(text)
    }
    let result = array.join('&')
    return result
}

function urlWithQuery(url, query) {
    let string = queryString(query)
    if (url.indexOf('?') >= 0) {
        return url + '&' + string
    }else {
        return url + '?' + string
    }
}

function formDataFromParams(params) {
    let formDate = new FormData()
    for (let key in params) {
        let value = params[key]
        formDate.append(key, value)
    }
    return formDate
}

function checkStatus(response) {
    if (response.status == 200) {
        return response;
    }
    let error = new Error(response.statusText)
    error.code = response.status
    error.message = response.statusText
    throw error
}

async function parseJSON(response) {
    let json = await response.json()
    if (json.code == 200) {
        return json.result
    }else {
        let error = new Error(json.message)
        error.message = json.message
        error.code = json.code
        throw error
    }
}

function checkError(error) {
    var code = error.code
    if (code == undefined) {
        code = 400
    }
    var message = error.message
    if (message == undefined || message == null || message == '') {
        message = "network error"
    }
    error.code = code
    error.message = message
    return error
}

function GET(url, query) {
    return new Promise((resolve, reject) => {
        let urlString = urlWithQuery(url, query)
        fetch(urlString)
        .then(checkStatus)
        .then(parseJSON)
        .then((response) => {
            resolve(response)
        })
        .catch((error) => {
            reject(checkError(error))
        })
    })
}

function POST(url, query, params) {
    
    return new Promise((resolve, reject) => {
        let urlString = urlWithQuery(url, query)
        let formDate = formDataFromParams(params)
        fetch(urlString, {
            method: 'POST',
            body: formDate,
            headers: {
                token: ''
            }
        })
        .then(checkStatus)
        .then(parseJSON)
        .then((response) => {
            resolve(response)
        })
        .catch((error) => {
            reject(checkError(error))
        })
    })

}

export {GET, POST}