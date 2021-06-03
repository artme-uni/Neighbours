import React from "react";
import './Authorization.css'
import Post from "../feed/Post";
import PropTypes from "prop-types";

export default class LoginForm extends React.Component {
    state = {
        login: null,
        password: null
    };

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
    }

    updateEmail(evt) {
        this.setState({login: evt.target.value});
    }

    updatePassword(evt) {
        this.setState({password: evt.target.value});
    }

    onSubmit(event) {
        event.preventDefault()
        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <div>
                {
                    <form className={'app-main-container auth-forms'} onSubmit={this.onSubmit}>

                        <h2>Вход</h2>

                        <input type="email"
                               className="app-field auth-field"
                               placeholder="Электронная почта"
                               value={this.state.login}
                               onChange={this.updateEmail}/>

                        <input type="password"
                               className="app-field auth-field"
                               placeholder="Пароль"
                               value={this.state.password}
                               onChange={this.updatePassword}/>

                        {   this.props.errorMsg ?
                            <p className={'app-hint auth-element'}> <b>Ошибка: </b>
                                <i>{this.props.errorMsg}!</i></p> : null
                        }

                        <button type="submit" className="app-button auth-element"> Войти</button>

                        <p className="auth-element">
                            Впервые здесь? {' '}

                            <a href='/registration' className={'auth-link'}>
                                Зарегистрироваться
                            </a>
                        </p>
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