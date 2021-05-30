import MainHeader from "../../components/header/MainHeader";
import HeaderStub from "../../components/header/HeaderStub";
import React, {Component} from "react";
import ChatCreationForm from "../../components/messenger/chat/ChatCreationForm";

export default class ChatCreation extends Component {

    state = {
        errorMsg: null
    }

    render() {
        return (
            <div>
                <MainHeader/>
                <HeaderStub/>
                <div>
                    <ChatCreationForm/>
                </div>
            </div>
        );
    }
}
