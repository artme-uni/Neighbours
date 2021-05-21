import React from 'react'
import PropTypes from 'prop-types';
import './Messages.css'
import CharsAvatar from "../avatar/CharsAvatar";

export default class Message extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messagesCount: 5,
        }
    }

    render() {
        return (
            <div>
                {this.props.message.isOutgoingMessage ?
                    <div className={'message-container'}>
                        <div className={'message-outgoing'}>
                            <text>{this.props.message.text}</text>
                        </div>
                    </div>
                    :
                    <div className={'message-container'}>
                        <CharsAvatar isSmall={true} title={this.props.message.author}/>
                        <div className={'message-incoming'}>
                            <div>
                                <b>{this.props.message.author}  </b>
                                <text className={'chat-message-date'}>{this.props.message.date}</text>
                            </div>

                            <text>{this.props.message.text}</text>
                        </div>
                    </div>
                }
            </div>
        );
    }

}

Message.propTypes = {
    message: PropTypes.object
}