import React from 'react'
import MainHeader from "../../components/header/MainHeader";
import HeaderStub from "../../components/header/HeaderStub";
import AuthorizationChecker from "../../components/authorization/AuthorizationChecker";
import Api from "../../utils/Api";
import ChatInfo from "../../components/messenger/info/ChatInfo";

export default class ChatInfoScreen extends React.Component {

    constructor(props) {
        super(props);
        this.getChatID = this.getChatID.bind(this);
        this.onBackButton = this.onBackButton.bind(this);
    }

    getChatID(){
        return parseInt(this.props.match.params.id)
    }

    onBackButton(){
        window.location.href = "/chat/" + this.getChatID()
    }

    render() {
        const members = [
            {id:"1", name: "Максим Пронин"},
            {id:"2", name: "Артур Шарифов"},
            {id:"3", name: "Test"},
            {id:"4", name: "Артем Кононов"},
            {id:"5", name: "Валентин Павлович"},
        ]

        return (
            <div>
                <MainHeader/>
                <HeaderStub/>
                <AuthorizationChecker/>

                {Api.isLogged() ?
                    <ChatInfo title={"ул. Пирогова, 2"} members={members} onBackButton={this.onBackButton}/>
                    : null}
            </div>);
    }
}


