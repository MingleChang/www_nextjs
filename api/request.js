
const host = 'https://api.minglechang.com'
// const host = 'http://127.0.0.1:9000'

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
    var address = url
    if(url.indexOf('http://')==-1 && url.indexOf('https://')==-1) {
        address = host + url;
    }
    let string = queryString(query)
    if (url.indexOf('?') >= 0) {
        return address + '&' + string
    }else {
        return address + '?' + string
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

function getLocationToken() {
    try {
        let user = JSON.parse(localStorage.getItem('user'))
        let token = user.token
        return token
    }catch (error) {
        return ""
    }
}

function GET(url, query) {
    return new Promise((resolve, reject) => {
        let urlString = urlWithQuery(url, query)
        fetch(urlString, {
            method: 'GET',
            headers: {
                token: getLocationToken()
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

function POST(url, query, params) {
    return new Promise((resolve, reject) => {
        let urlString = urlWithQuery(url, query)
        let formDate = formDataFromParams(params)
        fetch(urlString, {
            method: 'POST',
            body: formDate,
            headers: {
                token: getLocationToken()
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