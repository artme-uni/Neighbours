import React from "react";
import './Profile.css'

import Post from "../feed/Post";
import PropTypes from "prop-types";
import Api from "../../utils/Api"

export default class ProfileForm extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
        Api.loadUserInfo()
        this.state = {
            userInfo: Api.userInfo,
            login: Api.getLogin()
        }
    }

    onSubmit(event) {
        event.preventDefault()
        Api.clearInfo()
        window.location.href='/#'
    }

    render() {
        return (
            <div>
                {
                    <form className={'app-main-container profile-form'}
                          onSubmit={this.onSubmit}>

                        <h2>Профиль</h2>

                        <h4 className={'profile-field-name profile-top-margin'}>ФИО</h4>
                        <input type="text"
                               className="app-field profile-field"
                               placeholder="ФИО"
                               disabled={true}
                               defaultValue={
                                   this.state.userInfo.lastName + ' ' +
                                   this.state.userInfo.firstName + ' ' +
                                   this.state.userInfo.middleName}/>

                        <h4 className={'profile-field-name'}>Логин</h4>
                        <input type="email"
                               className="app-field profile-field"
                               placeholder="Электронная почта"
                               disabled={true}
                               defaultValue={this.state.login}/>

                        <h4 className={'profile-field-name'}>Адрес</h4>
                        <input type="text"
                               className="app-field profile-field"
                               placeholder="Адрес"
                               disabled={true}
                               defaultValue={
                                   this.state.userInfo.city + ', ' +
                                   this.state.userInfo.street + ', ' +
                                   this.state.userInfo.houseNumber}/>

                        <button type="submit" className="app-button">Выйти</button>
                    </form>
                }

            </div>
        );
    }
}

Post.propTypes = {
    onSubmit: PropTypes.func,
    errorMsg: PropTypes.string
};