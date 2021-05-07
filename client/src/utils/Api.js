import axios from 'axios';

export default class Api {
    static url = 'http://localhost:8080'

    static loginInfo
    static userInfo

    static register(registrationInfo, responseHandler, errorHandler){
        axios({
            method: 'post',
            url: this.url + '/register',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            data: registrationInfo
        }).then(responseHandler).catch(errorHandler)
    }

    static login(loginInfo, responseHandler, errorHandler){
        this.setLoginInfo(loginInfo)

        console.log('Authorization Basic ' + this.getToken())

        axios({
            method: 'post',
            url: this.url + '/login',
            headers: {
                'Authorization': `Basic ${this.getToken()}`
            },
            data: loginInfo
        }).then(responseHandler).catch(errorHandler)
    }

    static setLoginInfo(loginInfo){
        this.loginInfo = loginInfo
    }

    static getToken(){

        return Buffer.from(`${this.loginInfo.login}:${this.loginInfo.password}`, 'utf8').toString('base64')
    }
}