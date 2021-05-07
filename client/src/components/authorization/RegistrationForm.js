import "./Authorization.css"
import React, {Component} from "react";
import PropTypes from "prop-types";
import Post from "../feed/Post";

export default class RegistrationForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: null,
            lastName: null,
            middleName: null,
            login: null,
            password: null,
            hintMsg: null
        };

        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onMiddleNameChange = this.onMiddleNameChange.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onFirstNameChange(event) {
        this.setState({firstName: event.target.value})
    }

    onLastNameChange(event) {
        this.setState({lastName: event.target.value})
    }

    onMiddleNameChange(event) {
        this.setState({middleName: event.target.value})
    }

    onLoginChange(event) {
        this.setState({login: event.target.value});
    }

    onPasswordChange(event) {
        this.setState({password: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault()

        if (this.isFormFilled()) {
            this.props.onSubmit(this.getUserInfo())
        } else {
            this.setState({hintMsg: 'Заполните все поля'});
        }
    }

    getUserInfo() {
        return {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            middleName: this.state.middleName,
            login: this.state.login,
            password: this.state.password
        }
    }

    isFormFilled() {
        return this.state.firstName &&
            this.state.lastName &&
            this.state.middleName &&
            this.state.login &&
            this.state.password;
    }

    render() {
        return (
            <div>
                {
                    <form
                        className={'app-main-container auth-forms'}
                        onSubmit={this.onSubmit}>

                        <h2>Регистрация</h2>

                        <input type="text"
                               onChange={this.onFirstNameChange}
                               className="app-field auth-field"
                               placeholder="Имя"/>

                        <input type="text"
                               onChange={this.onLastNameChange}
                               className="app-field auth-field"
                               placeholder="Фамилия"/>

                        <input type="text"
                               onChange={this.onMiddleNameChange}
                               className="app-field auth-field"
                               placeholder="Отчество"/>

                        <input type="email"
                               onChange={this.onLoginChange}
                               className="app-field auth-field"
                               placeholder="Электронная почта"/>

                        <input type="password"
                               onChange={this.onPasswordChange}
                               className="app-field auth-field"
                               placeholder="Пароль"/>

                        {   this.state.hintMsg ?
                            <p className={'app-hint auth-element'}> <b>Подсказка: </b>
                                <i>{this.state.hintMsg}!</i></p> : null
                        }

                        {   this.props.errorMsg ?
                            <p className={'app-hint auth-element'}> <b>Ошибка: </b>
                                <i>{this.props.errorMsg}!</i></p> : null
                        }

                        <button type="submit" className="app-button auth-element">
                            Зарегистрироваться
                        </button>

                        <p className="auth-element">
                            Уже зарегистрированы? {' '}
                            <a href='/login' className={'auth-link'}>Войти</a>
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