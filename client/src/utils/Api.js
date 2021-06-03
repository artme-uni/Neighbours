import axios from 'axios';
import SockJS from 'sockjs-client';
import Stomp from "webstomp-client";

export default class Api {
    static stompClient
    static sock
    static isInRoom

    static url = 'http://34.118.80.63:3752'
    static socketUrl = '34.118.80.63:3752'

    // static url = 'http://localhost:8080'
    // static socketUrl = 'localhost:8080'

    static loginInfoKey = 'ApiLoginInfo'
    static loginInfo = null
    static userInfoKey = 'ApiUserInfo'
    static userInfo = null
    static chatInfoKey = 'ChatInfo'
    static chatInfo = null

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
        this.loginInfo = JSON.parse(localStorage.getItem(this.loginInfoKey))
    }

    static setUserInfo(info) {
        localStorage.setItem(this.userInfoKey, JSON.stringify(info));
    }

    static async loadChatInfo() {
        this.chatInfo = JSON.parse(await localStorage.getItem(this.chatInfoKey))
    }

    static setChatInfo(info) {
        localStorage.setItem(this.chatInfoKey, JSON.stringify(info));
    }

    static loadUserInfo() {
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

    static getAddress(){
        return{
            city: this.userInfo.city,
            street: this.userInfo.street,
            houseNumber: this.userInfo.houseNumber
        }
    }

    static getAllBulletins(responseHandler, errorHandler) {
        this.loadLoginInfo()
        this.loadUserInfo()
        axios({
            method: 'put',
            url: this.url + '/bulletins',
            headers: {
                'Authorization': `Basic ${this.getToken()}`
            },
            data: this.getAddress()
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
        this.loadUserInfo()

        axios({
            method: 'post',
            url: this.url + '/bulletins',
            headers: {
                'Authorization': `Basic ${this.getToken()}`
            },
            data: {
                owner: {
                    firstName: this.userInfo.firstName,
                    lastName: this.userInfo.lastName,
                    login: this.loginInfo.login,
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

    static async createSockConnection(onConnect) {
        this.loadLoginInfo();

        let str = `http://${this.getLoginData()}@${this.socketUrl}/ws`
        let sock = new SockJS(str)
        const stompClient = Stomp.over(sock);

        stompClient.connect({}, () => {
            if (this.stompClient) {
                return
            }
            this.stompClient = stompClient
            this.sock = sock
            if (onConnect) {
                onConnect()
            }
        })
    }

    static getRooms(responseHandler, errorHandler) {
        this.loadLoginInfo();

        axios({
            method: 'get',
            url: this.url + '/chat/roomList',
            headers: {
                'Authorization': `Basic ${this.getToken()}`
            },
        }).then(responseHandler).catch(errorHandler)
    }

    static async createNewChatRoom(roomName, handler) {
        this.loadUserInfo();

        let subscription = await this.stompClient.subscribe('/chat/newRoom', (msg) => {
            let mainBody = JSON.parse(msg.body).body

            Api.openRoom(mainBody.id)
            subscription.unsubscribe()
            handler(mainBody.id)
        })

        this.stompClient.send("/app/chat/addRoom", JSON.stringify({
            roomName: roomName,
            city: this.userInfo.city,
            street: this.userInfo.street,
            houseNumber: this.userInfo.houseNumber
        }));

    }

    static async openRoom(roomNumber, getRoomInfo, newMessageHandler) {
        this.loadUserInfo();
        this.loadLoginInfo();

        let subscription = await this.stompClient.subscribe(`/chat/${roomNumber}/join`, (msg) => {
            let body = JSON.parse(msg.body)
            getRoomInfo(body)
            subscription.unsubscribe()
            Api.setChatInfo(body)
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
            if (newMessageHandler) {
                newMessageHandler(body)
            }
        })
    }

    static sendMsg(roomID, textMessage) {
        this.stompClient.send(`/app/chat/${roomID}/sendMessage`, JSON.stringify({
            messageType: "MESSAGE",
            firstName: this.userInfo.firstName,
            lastName: this.userInfo.lastName,
            text: textMessage,
        }))
    }

    static leaveChat(roomID) {
        this.loadUserInfo();
        this.loadLoginInfo();

        let dto = {
            roomId: roomID,
            login: this.loginInfo.login,
            firstName: this.userInfo.firstName,
            lastName: this.userInfo.lastName,
        }

        this.stompClient.send(`/app/chat/${roomID}/leave`, JSON.stringify(dto))
        this.isInRoom = false
    }

    static addUser(chatRoom, login){
        this.loadLoginInfo()
        axios({
            method: 'post',
            url: this.url + '/addChatMember',
            headers: {
                'Authorization': `Basic ${this.getToken()}`
            },
            data: {
                roomId: chatRoom,
                login: login
            }
        })
    }

    static removeUser(chatRoom, login){
        this.loadLoginInfo()
        axios({
            method: 'post',
            url: this.url + '/removeChatMember',
            headers: {
                'Authorization': `Basic ${this.getToken()}`
            },
            data: {
                roomId: chatRoom,
                login: login
            }
        })
    }
}