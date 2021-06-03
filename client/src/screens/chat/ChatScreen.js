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
        this.state = {
            messages: []
        };
    }

    getChatID() {
        return parseInt(this.props.match.params.id)
    }

    addMessage(newMsg){
        this.state.messages.push(newMsg)
    }

    async componentDidMount() {
        if (Api.isLogged()) {
            await Api.createSockConnection(
                () =>
                    Api.openRoom(this.getChatID(),
                        (chatInfo) => {
                            this.setState({messages: chatInfo.messages})
                            window.scrollTo(0, window.outerHeight);
                        },
                        (newMsg) => {
                            this.addMessage(newMsg)
                            this.setState({messages: this.state.messages})
                            window.scrollTo(0, window.outerHeight);
                        })
            )
            window.scrollTo(0, window.outerHeight);
        }
    }

    render() {
        window.scrollTo(0, window.outerHeight);
        return (
            <div>
                <MainHeader/>
                <HeaderStub/>
                <AuthorizationChecker/>

                <div style={{position: "relative"}}>
                    {Api.isLogged() ?
                        <Chat messages={this.state.messages} title={'ул. Пирогова, 2'} chatID={this.getChatID()}/>
                        : null}
                </div>
            </div>);
    }
}


