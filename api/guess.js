import {GET, POST} from "./request"

export function GuessCategoriesAPI() {
    const url = '/guess/categories'
    return GET(url, null) 
}

export function GuessLanguagesAPI() {
    const url = '/guess/languages'
    return GET(url, null) 
}

export function GuessListAPI(cate, lang, page, size) {
    const url = '/guess/list'
    const params = {category: cate, language: lang, page: page, size: size}
    return GET(url, params) 
}