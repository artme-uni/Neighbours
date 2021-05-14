import axios from 'axios';

export default class Api {
    static url = 'http://localhost:8080'

    static loginInfoKey = 'ApiUserInfo'
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

    static change(newValue){
        console.log('Old')
        console.log(this.value)
        this.value = newValue
        console.log('New')
        console.log(this.value)
    }

    static setLoginInfo(info){
        localStorage.setItem(this.loginInfoKey, JSON.stringify(info));
    }

    static loadLoginInfo(){
        this.loginInfo = JSON.parse(localStorage.getItem(this.loginInfoKey))
    }

    static getLogin(){
        this.loadLoginInfo()
        return this.loginInfo.login
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

    static getToken(){
        this.loadLoginInfo()
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

    static create_bulletin(bulletinInfo, responseHandler, errorHandler){
        this.loadLoginInfo()
        axios({
            method: 'post',
            url: this.url + '/bulletins',
            headers: {
                'Authorization': `Basic ${this.getToken()}`
            },
            data:{
                owner: {
                    login: this.loginInfo.login
                },
                title: bulletinInfo.title,
                text: bulletinInfo.text
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