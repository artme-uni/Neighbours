import React from 'react'
import PropTypes from 'prop-types';
import './Chat.css'
import Message from "./Message";
import Api from "../../../utils/Api";

export default class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messagesCount: 10,
            messageLoadStep: 5,
            value: null,
            currentID: 0
        }
        this.increaseMessageCount = this.increaseMessageCount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
    }

    increaseMessageCount() {
        this.setState({
            messagesCount: this.state.messagesCount + this.state.messageLoadStep
        })
    }

    componentDidMount() {
        window.scrollTo(0, window.outerHeight);
        Api.loadLoginInfo()
    }

    async onSubmit(event) {
        event.preventDefault();

        if (!this.state.value || this.state.value === '') {
            return
        }
        Api.sendMsg(this.props.chatID, this.state.value)
        this.setState({value: ''});
    }

    onFieldChange(event) {
        this.setState({value: event.target.value});
    }

    isOutgoingMessage(message) {
        return message.firstName === Api.userInfo.firstName && message.lastName === Api.userInfo.lastName
    }

    render() {

        return (
            <div className={'chat-main-container'}>
                <div className={'app-main-container chat-container'}>

                    {this.state.messagesCount < this.props.messages.length ?
                        <button
                            onClick={this.increaseMessageCount}
                            className={'chat-button'}>
                            Загрузить еще
                        </button> : null
                    }

                    {
                        this.props.messages
                            .reverse()
                            .slice(0, this.state.messagesCount)
                            .reverse()
                            .map(message =>
                                <div>
                                    {message.messageType === "MESSAGE" ?
                                        <div
                                            className={'chat-message-container'}
                                            key={message.lastName + message.dateTime}>

                                            <div
                                                className={this.isOutgoingMessage(message) ? 'chat-outgoing-message' : 'chat-incoming-message'}>
                                                <Message message={message}
                                                         isOutgoingMessage={this.isOutgoingMessage(message)}/>

                                            </div>
                                        </div> : null}
                                </div>
                            )}


                    <form className={'chat-field-part'} onSubmit={this.onSubmit}>
                        {this.props.messages.length === 0 ?
                            <div>
                                История сообщений пуста
                            </div> : null}

                        <div className={'chat-field-stub-transition'}>
                        </div>

                        <div className={'chat-field-part-back app-main-container'}>

                            <div className={'chat-buttons-panel'}>
                                <input
                                    className={'app-field chat-field'}
                                    placeholder={'Введите сообщение'}
                                    value={this.state.value}
                                    onChange={this.onFieldChange}
                                />
                                <button className={'chat-send-button'}>📨</button>
                            </div>
                            <button
                                className={'app-button'}
                                onClick={() => (window.location.href = "/chat-info/" + this.props.chatID)}>
                                Редактировать чат
                            </button>
                        </div>
                    </form>

                    <div className={'chat-field-stub'}>
                    </div>
                </div>
            </div>
        );
    }

}

Chat.propTypes = {
    chatID: PropTypes.number,
    title: PropTypes.string,
    messages: PropTypes.object
}