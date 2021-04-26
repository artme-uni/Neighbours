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
                    <form className={'auth-forms'}>

                        <div className={'auth-main-label'}>Вход</div>

                        <input type="email" className="auth-field" placeholder="Электронная почта"
                               value={this.state.email} onChange={val => this.updateEmail(val)}/>

                        <input type="password" className="auth-field" placeholder="Пароль"
                               value={this.state.password} onChange={val => this.updatePassword(val)}/>

                        <button type="submit" onClick={this.handleClick} className="auth-button"> Войти</button>

                        <p className="auth-suggestion-label">
                            Впервые здесь? {' '}

                            <a href='/registration' className={'link'}>
                                Зарегистрироваться
                            </a>
                        </p>
                    </form>
                }

            </div>
        );
    }
}