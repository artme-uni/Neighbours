import React from 'react'
import MainHeader from "../../components/header/MainHeader";
import HeaderStub from "../../components/header/HeaderStub";
import AuthorizationChecker from "../../components/authorization/AuthorizationChecker";
import Api from "../../utils/Api";
import ChatInfo from "../../components/messenger/info/ChatInfo";

export default class ChatInfoScreen extends React.Component {

    render() {
        return (
            <div>
                <MainHeader/>
                <HeaderStub/>
                <AuthorizationChecker/>

                {Api.isLogged() ?
                    <ChatInfo/>
                    : null}
            </div>);
    }
}


