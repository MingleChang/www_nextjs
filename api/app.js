import {GET, POST} from "./request"
//上传APK或IPA文件
export function UploadAppAPI(file, platform, environment) {
    const url = 'https://api.minglechang.com/app/upload'
    const params = {file: file, platform: platform, environment: environment}
    return POST(url, null, params)
}
//获取App信息
export function GetAppInfoAPI(appId) {
    const url = 'https://api.minglechang.com/app/'+appId
    return GET(url, null)
}