import React from 'react'
import MainHeader from "../../components/header/MainHeader";
import HeaderStub from "../../components/header/HeaderStub";
import AuthorizationChecker from "../../components/authorization/AuthorizationChecker";
import Api from "../../utils/Api";
import ChatInfo from "../../components/messenger/info/ChatInfo";

export default class ChatInfoScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            users: [],
            isLoaded: false
        };

        this.getChatID = this.getChatID.bind(this);
        this.onBackButton = this.onBackButton.bind(this);

    }

    getChatID() {
        return parseInt(this.props.match.params.id)
    }

    onBackButton() {
        window.location.href = "/chat/" + this.getChatID()
    }

    async componentDidMount() {
        if (Api.isLogged()) {
            await Api.loadChatInfo()

            this.setState({user: Api.chatInfo.users})
            this.setState({title: Api.chatInfo.roomName})
            this.setState({isLoaded: true})
        }
    }

    render() {
        return (
            <div>
                <MainHeader/>
                <HeaderStub/>
                <AuthorizationChecker/>

                {Api.isLogged() ?
                    <ChatInfo title={this.state.title} members={this.state.user} isLoaded={this.state.isLoaded}
                              onBackButton={this.onBackButton} id={parseInt(this.props.match.params.id)}/>
                    : null}
            </div>);
    }
}


