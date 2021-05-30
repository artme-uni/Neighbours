import './ChatScreen.css';
import MainHeader from "../../components/header/MainHeader";
import HeaderStub from "../../components/header/HeaderStub";
import React from 'react'
import AuthorizationChecker from "../../components/authorization/AuthorizationChecker";
import Api from "../../utils/Api";
import Chat from "../../components/messenger/chat/Chat";

export default class ChatScreen extends React.Component {

    constructor(props) {
        super(props);
        Api.createSockConnection()
    }

    getChatID(){
        return parseInt(this.props.match.params.id)
    }

    render() {
        const messages = [
            {id:"1", author:"Test", isOutgoingMessage:false, text:"Test msg1!", date: "18:57"},
            {id:"2", author:"Test", isOutgoingMessage:false, text:"Test msg2!", date: "18:57"},
            {id:"3", author:"Test", isOutgoingMessage:false, text:"Test msg3!", date: "18:57"},
            {id:"4", author:"Test", isOutgoingMessage:false, text:"Test msg4!", date: "18:57"},
            {id:"5", author:"Test", isOutgoingMessage:false, text:"Test msg5!", date: "18:57"},
            {id:"6", author:"Test", isOutgoingMessage:false, text:"Test msg6!", date: "18:57"},
            {id:"7", author:"Test", isOutgoingMessage:false, text:"Test msg7!", date: "18:57"},
            {id:"8", author:"Test", isOutgoingMessage:false, text:"Test msg8!", date: "18:57"},
            {id:"9", author:"Кононов Артем", isOutgoingMessage:true, text:"Привет, соседи!", date: "18:57"},
            {id:"10", author:"Артур Шарифов", isOutgoingMessage:false, text:"Вечер добрый, ты из какой квартиры?", date: "18:57"},
            {id:"11", author:"Максим Пронин", isOutgoingMessage:false, text:"Приветик)", date: "18:57"},
            {id:"12", author:"Максим Пронин", isOutgoingMessage:false, text:"Жду всех завтра после 18:00 у себя. Берите с собой друзей и хорошее настроение, с меня праздничный ужин!)", date: "18:57"},
            {id:"13", author:"Кононов Артем", isOutgoingMessage:true, text:"Жду всех завтра после 18:00 у себя. Берите с собой друзей и хорошее настроение, с меня праздничный ужин!", date: "18:57"}
        ]

        window.scrollTo(0, window.outerHeight);
        return (
            <div>
                <MainHeader/>
                <HeaderStub/>
                <AuthorizationChecker/>

                <div style={{position:"relative"}}>
                    {Api.isLogged() ?
                        <Chat messages={messages} title={'ул. Пирогова, 2'} chatID={this.getChatID()}/>
                        : null}
                </div>

                {/*<button onClick={() => Api.createNewChatRoom("Room Boom")}> Create </button>*/}
                {/*<button onClick={() => Api.openRoom(1)}> Join </button>*/}
                {/*<button onClick={() => Api.sendMsg(1, "OK")}> Send </button>*/}
                {/*<button onClick={() => Api.leaveChat(1)}> Leave </button>*/}
            </div>);
    }
}


