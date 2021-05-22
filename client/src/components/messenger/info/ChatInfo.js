import React from 'react'
import PropTypes from "prop-types";
import './ChatInfo.css'
import MembersList from "./MembersList";

export default class ChatInfo extends React.Component {
    render() {
        return (
            <div className={'app-main-container chat-info-form'}>
                <h2>Редактирование чата</h2>

                <h4 className={'chat-info-field-name'}>Название чата</h4>
                <input type="text"
                       onChange={this.onTitleBulletinChange}
                       className="chat-info-field app-field"
                       disabled={true}
                       defaultValue={this.props.title ? this.props.title : ''}/>

                <MembersList members={this.props.members}/>

                <button className={'app-button chat-info-leave-button'}>Покинуть чат</button>
                <button onClick={this.props.onBackButton} className={'chat-button chat-info-back-button'}>
                    Вернуться
                </button>

            </div>
        );
    }

}

ChatInfo.propTypes = {
    title: PropTypes.string,
    members: PropTypes.array,
    onBackButton: PropTypes.func
};