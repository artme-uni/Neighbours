import axios from 'axios';
import SockJS from 'sockjs-client';
import Stomp from "webstomp-client";

export default class Api {
    static stompClient
    static sock
    static isInRoom

    static url = 'http://localhost:8080'
    static socketUrl = 'localhost:8080'

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
        return Buffer.from(this.getLoginData(), 'utf8').toString('base64')
    }

    static getLoginData() {
        return (`${this.loginInfo.login}:${this.loginInfo.password}`);
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

    static createSockConnection() {
        this.loadLoginInfo();
        let str = `http://${this.getLoginData()}@${this.socketUrl}/ws`
        let sock = new SockJS(str)
        const stompClient = Stomp.over(sock);

        stompClient.connect({}, () => {
            if(this.stompClient){
                return
            }
            this.stompClient = stompClient
            this.sock = sock
            console.log('StompClient INITIALIZED')
        })
    }

    static async createNewChatRoom(roomName) {
        this.loadUserInfo();

        let subscription = await this.stompClient.subscribe('/chat/newRoom', (msg) => {
            let body = JSON.parse(msg.body)
            console.log('New Room !!!! Создана комната ' + body.id)
            subscription.unsubscribe()
        })

        this.stompClient.send("/app/chat/addRoom", JSON.stringify({
            roomName: roomName,
            city: this.userInfo.city,
            street: this.userInfo.street,
            houseNumber: this.userInfo.houseNumber
        }));

    }

    static async openRoom(roomNumber){
        if(this.isInRoom){
            return
        }else {
            this.isInRoom = true
        }

        this.loadUserInfo();
        this.loadLoginInfo();

        let subscription = await this.stompClient.subscribe(`/chat/${roomNumber}/join`, (msg) => {
            console.log('OPEN CHAT !!!! отобразиии все сообщения')
            console.log(msg.body)
            subscription.unsubscribe()
        })


        let dto = {
            roomId: roomNumber,
            login: this.loginInfo.login,
            firstName: this.userInfo.firstName,
            lastName: this.userInfo.lastName,
        }
        await this.stompClient.send(`/app/chat/${roomNumber}/join`, JSON.stringify(dto));

        this.stompClient.subscribe(`/chat/${roomNumber}/messages`, (newMsg) => {
            let body = JSON.parse(newMsg.body)
            if(body.messageType === "JOIN"){
                console.log('GET !!!! отобрази появление нового пользователя')
            } else if(body.messageType === "LEAVE"){
                console.log('GET !!!! отобрази уход пользователя')
            } else {
                console.log('GET !!!! отобрази новое сообщение')
            }

            console.log(newMsg)
        })
    }

    static sendMsg(roomID, textMessage){
        this.stompClient.send(`/app/chat/${roomID}/sendMessage`, JSON.stringify({
            messageType: "MESSAGE",
            firstName: this.userInfo.firstName,
            lastName: this.userInfo.lastName,
            text: textMessage,
        }))
    }

    static leaveChat(roomID){
        this.loadUserInfo();
        this.loadLoginInfo();

        let dto = {
            roomId: roomID,
            login: this.loginInfo.login,
            firstName: this.userInfo.firstName,
            lastName: this.userInfo.lastName,
        }

        console.log(dto)

        this.stompClient.send(`/app/chat/${roomID}/leave`, JSON.stringify(dto))
        this.isInRoom = false
    }
}