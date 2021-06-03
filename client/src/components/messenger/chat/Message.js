import React from 'react'
import PropTypes from 'prop-types';
import './Messages.css'
import CharsAvatar from "../avatar/CharsAvatar";
import Api from "../../../utils/Api";

export default class Message extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messagesCount: 5,
        }
    }

    componentDidMount() {
        Api.loadUserInfo()
    }

    getAuthor() {
        return this.props.message.firstName + " " + this.props.message.lastName
    }

    getTime(dateTime){
        let words = dateTime.split('T');
        return words[1].slice(0,5)
    }

    renderSimpleMessage() {
        return this.props.isOutgoingMessage ?
            <div className={'message-container'}>
                <div className={'message-outgoing'}>
                    {this.props.message.text}
                </div>
            </div>
            :
            <div className={'message-container'}>
                <CharsAvatar isSmall={true} title={this.getAuthor()}/>
                <div className={'message-incoming'}>
                    <div>
                        <b>{this.getAuthor()} </b>
                        <text className={'chat-message-date'}>{this.getTime(this.props.message.dateTime)}</text>
                    </div>

                    {this.props.message.text}
                </div>
            </div>
    }

    renderJoinMessage() {
        return !this.props.isOutgoingMessage ?
        <div className={'message-container'}>
            <div className={'message-incoming'}>
                {this.getAuthor()} присоединился к чату
            </div>
        </div> : null
    }


    render() {
        return (
            <div>
                {this.props.message.messageType === "MESSAGE" ?
                    <div>
                        {this.renderSimpleMessage()}
                    </div>
                    : null}

            </div>
        );
    }

}

Message.propTypes = {
    message: PropTypes.object,
    isOutgoingMessage: PropTypes.bool
}