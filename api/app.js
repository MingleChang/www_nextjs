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

export function GetPackageIdsAPI() {
    const url = 'https://api.minglechang.com/app/packageids'
    return GET(url, null)
}
export function GetPlatformsAPI(packageId) {
    const url = 'https://api.minglechang.com/app/platforms'
    let params = {"packageid": packageId}
    return GET(url, params)
}

export function GetEnvironmentsAPI(packageId, platform) {
    const url = 'https://api.minglechang.com/app/environments'
    let params = {"packageid": packageId, "platform": platform}
    return GET(url, params)
}

export function GetVersionsAPI(packageId, platform, environment) {
    const url = 'https://api.minglechang.com/app/versions'
    let params = {"packageid": packageId, "platform": platform, "environment": environment}
    return GET(url, params)
}

export function GetAppListAPI(packageId, platform, environment, version) {
    const url = 'https://api.minglechang.com/app/list'
    let params = {"packageid": packageId, "platform": platform, "environment": environment, "version": version}
    return GET(url, params)
}