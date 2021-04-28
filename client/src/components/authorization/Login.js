import React from "react";
import './Authorization.css'

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleClick = this.handleClick.bind();
    }

    updateEmail(evt) {
        this.setState({email: evt.target.value});
    }

    updatePassword(evt) {
        this.setState({password: evt.target.value});
    }

    handleClick() {
        alert("email: " + this.state.email)
    }

    render() {
        return (
            <div>
                {
                    <form className={'app-main-container auth-forms'}>

                        <h2>Вход</h2>

                        <input type="email" className="app-field auth-field" placeholder="Электронная почта"
                               value={this.state.email} onChange={val => this.updateEmail(val)}/>

                        <input type="password" className="app-field auth-field" placeholder="Пароль"
                               value={this.state.password} onChange={val => this.updatePassword(val)}/>

                        <button type="submit" onClick={this.handleClick} className="app-button auth-element"> Войти</button>

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