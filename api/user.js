import {GET, POST} from "./request"

export function LoginAPI(account, password) {
    const url = '/user/signin'
    const params = {account: account, password: password}
    return POST(url, null, params)
}