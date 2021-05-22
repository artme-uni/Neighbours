import React from 'react'
import PropTypes from 'prop-types';
import './Chat.css'
import Message from "./Message";

export default class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messagesCount: 10,
            messageLoadStep: 5
        }
        this.increaseMessageCount = this.increaseMessageCount.bind(this);
    }

    increaseMessageCount() {
        this.setState({
            messagesCount: this.state.messagesCount + this.state.messageLoadStep
        })
    }

    componentDidMount() {
        window.scrollTo(0, window.outerHeight);
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
                                <div className={'chat-message-container'}>
                                    <div
                                        className={message.isOutgoingMessage ? 'chat-outgoing-message' : 'chat-incoming-message'}>
                                        <Message message={message}/>
                                    </div>
                                </div>
                            )}

                    <div className={'chat-field-part'}>
                        <div className={'chat-field-stub-transition'}>
                        </div>

                        <div className={'chat-field-part-back app-main-container'}>

                            <div className={'chat-buttons-panel'}>
                                <input
                                    className={'app-field chat-field'}
                                    placeholder={'Введите сообщение'}
                                />
                                <button className={'chat-send-button'}>📨</button>
                            </div>
                            <button
                                className={'app-button'}
                                onClick={() => (window.location.href = "/chat-info/" + this.props.chatID)}>
                                Редактировать чат
                            </button>
                        </div>
                    </div>

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