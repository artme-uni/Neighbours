import "./Authorization.css"
import React, {Component} from "react";

export default class Registration extends Component {

    handleClick() {
        console.log('По кнопке кликнули');
    }

    render() {
        return (
            <div>
                {
                    <form className={'auth-forms'}>

                        <div className={'auth-main-label'}>Регистрация</div>

                        <input type="text" className="auth-field" placeholder="Имя"/>

                        <input type="text" className="auth-field" placeholder="Фамилия"/>

                        <input type="email" className="auth-field" placeholder="Электронная почта"/>

                        <input type="password" className="auth-field" placeholder="Пароль"/>

                        <button type="submit" className="auth-button">Зарегистрироваться</button>

                        <p className="auth-suggestion-label">
                            Уже зарегистрированы? {' '}

                            <a href="/login" className={'link'}>Войти</a>
                        </p>
                    </form>
                }
            </div>
        );
    }

}

