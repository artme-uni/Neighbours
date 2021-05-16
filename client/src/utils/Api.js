import axios from 'axios';

export default class Api {
    static url = 'http://localhost:8080'

    static loginInfoKey = 'ApiLoginInfo'
    static loginInfo = null
    static userInfoKey = 'ApiUserInfo'
    static userInfo = null

    static register(registrationInfo, responseHandler, errorHandler) {
        axios({
            method: 'post',
            url: this.url + '/register',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            data: registrationInfo
        }).then(responseHandler).catch(errorHandler)
    }

    static async setLoginInfo(info) {
        await localStorage.setItem(this.loginInfoKey, JSON.stringify(info));
    }

    static loadLoginInfo() {
        console.log('load login')
        this.loginInfo = JSON.parse(localStorage.getItem(this.loginInfoKey))
    }

    static setUserInfo(info) {
        localStorage.setItem(this.userInfoKey, JSON.stringify(info));
    }

    static loadUserInfo() {
        console.log('load user')
        this.userInfo = JSON.parse(localStorage.getItem(this.userInfoKey))
    }

    static clearInfo() {
        localStorage.clear()
    }

    static isLogged() {
        this.loadLoginInfo()
        return !!this.loginInfo;
    }

    static getLogin() {
        this.loadLoginInfo()
        return this.loginInfo.login
    }

    static async login(loginInfo, responseHandler, errorHandler) {
        await this.setLoginInfo(loginInfo)
        console.log(loginInfo)
        console.log(this.getToken())

        axios({
            method: 'post',
            url: this.url + '/login',
            headers: {
                'Authorization': `Basic ${this.getToken()}`
            },
            data: loginInfo
        }).then(
            (response) => {
                if (response.status === 200) {
                    this.setUserInfo(response.data)
                }
                responseHandler(response)
            }
        ).catch(errorHandler)
    }

    static getToken() {
        this.loadLoginInfo()
        return Buffer.from(`${this.loginInfo.login}:${this.loginInfo.password}`, 'utf8').toString('base64')
    }

    static getAllBulletins(responseHandler, errorHandler) {
        this.loadLoginInfo()
        axios({
            method: 'get',
            url: this.url + '/bulletins',
            headers: {
                'Authorization': `Basic ${this.getToken()}`
            },
        }).then(responseHandler).catch(errorHandler)
    }

    static get_bulletin(id, responseHandler, errorHandler) {
        axios({
            method: 'get',
            url: this.url + '/bulletins/' + id,
            headers: {
                'Authorization': `Basic ${this.getToken()}`
            },
        }).then(responseHandler).catch(errorHandler)
    }

    static create_bulletin(bulletinInfo, responseHandler, errorHandler) {
        this.loadLoginInfo()
        axios({
            method: 'post',
            url: this.url + '/bulletins',
            headers: {
                'Authorization': `Basic ${this.getToken()}`
            },
            data: {
                owner: {
                    login: this.loginInfo.login
                },
                title: bulletinInfo.title,
                text: bulletinInfo.text
            }
        }).then(responseHandler).catch(errorHandler)
    }

    static update_bulletin(id, title, text, responseHandler, errorHandler) {
        this.loadLoginInfo()
        this.loadUserInfo()

        axios({
            method: 'put',
            url: this.url + '/bulletins/' + id,
            headers: {
                'Authorization': `Basic ${this.getToken()}`
            },
            data: {
                id: id,
                owner: {
                    firstName: this.userInfo.firstName,
                    lastName: this.userInfo.lastName,
                    login: this.loginInfo.login,
                },
                text: text,
                title: title
            }
        }).then(responseHandler).catch(errorHandler)
    }

    static delete_bulletin(id, responseHandler, errorHandler) {
        axios({
            method: 'delete',
            url: this.url + '/bulletins/' + id,
            headers: {
                'Authorization': `Basic ${this.getToken()}`
            },
        }).then(responseHandler).catch(errorHandler)
    }
}