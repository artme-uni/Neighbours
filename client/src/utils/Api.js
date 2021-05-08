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

    static get_all_bulletins(responseHandler, errorHandler){
        axios({
            method: 'get',
            url: this.url + '/bulletins',
            headers: {
                'Authorization': `Basic ${this.getToken()}`
            },
        }).then(responseHandler).catch(errorHandler)
    }

    static get_bulletin(responseHandler, errorHandler, id){
        axios({
            method: 'get',
            url: this.url + '/bulletins/{'+id+'}',
            headers: {
                'Authorization': `Basic ${this.getToken()}`
            },
        }).then(responseHandler).catch(errorHandler)
    }

    static create_bulletin(responseHandler, errorHandler, text, title){
        axios({
            method: 'post',
            url: this.url + '/bulletin',
            headers: {
                'Authorization': `Basic ${this.getToken()}`
            },
            data:{
                owner: {
                    login: this.loginInfo,
                },
                text: text,
                title: title
            }
        }).then(responseHandler).catch(errorHandler)
    }

    static update_bulletin(responseHandler, errorHandler, id, text, title){
        axios({
            method: 'put',
            url: this.url + '/bulletins/{'+id+'}',
            headers: {
                'Authorization': `Basic ${this.getToken()}`
            },
            data:{
                id: id,
                owner: {
                    firstName: this.userInfo.firstName,
                    lastName: this.userInfo.lastName,
                    login: this.loginInfo,
                },
                text: text,
                title: title
            }
        }).then(responseHandler).catch(errorHandler)
    }
}