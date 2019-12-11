import {GET, POST} from "./request"
export function UploadApp(file, platform, environment) {
    const url = 'https://api.minglechang.com/app/upload'
    const params = {file: file, platform: platform, environment: environment}
    return POST(url, null, params)
}

export function GetAppInfoAPI(appId) {
    const url = 'https://api.minglechang.com/app/'+appId
    return GET(url, null)
}