import {GET, POST} from "./request"

export function GuessCategoriesAPI() {
    const url = '/guess/categories'
    return GET(url, null) 
}

export function GuessLanguagesAPI() {
    const url = '/guess/languages'
    return GET(url, null) 
}

export function GuessListAPI(word="", cate="", lang="", page=0, size=10) {
    const url = '/guess/list'
    const params = {word: word, category: cate, language: lang, page: page, size: size}
    return GET(url, params) 
}

export function GuessDeleteAPI(word, lang) {
    const url = '/guess/delete'
    const params = {word: word, language: lang}
    return POST(url, null, params) 
}

export function GuessCreateAPI(word, cate, lang) {
    const url = '/guess/create'
    const params = {words: word, category: cate, language: lang}
    return POST(url, null, params) 
}