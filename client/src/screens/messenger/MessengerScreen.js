import './MessengerScreen.css';
import MainHeader from "../../components/header/MainHeader";
import HeaderStub from "../../components/header/HeaderStub";
import React from 'react'
import AuthorizationChecker from "../../components/authorization/AuthorizationChecker";
import Api from "../../utils/Api";

function MessengerScreen() {
    return (
        <div>
            <MainHeader/>
            <HeaderStub/>
            <AuthorizationChecker/>
            <div className={"messenger"}>
                {Api.isLogged() ?
                    <h1>Hello, it's a messenger screen!</h1> : null}
            </div>
        </div>
    );
}

export default MessengerScreen;
