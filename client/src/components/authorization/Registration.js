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
                    <form className={'app-main-container auth-forms'}>

                        <h2>Регистрация</h2>

                        <input type="text" className="app-field auth-field" placeholder="Имя"/>

                        <input type="text" className="app-field auth-field" placeholder="Фамилия"/>

                        <input type="email" className="app-field auth-field" placeholder="Электронная почта"/>

                        <input type="password" className="app-field auth-field" placeholder="Пароль"/>

                        <button type="submit" className="app-button auth-element">Зарегистрироваться</button>

                        <p className="auth-element">
                            Уже зарегистрированы? {' '}

                            <a href="/login" className={'auth-link'}>Войти</a>
                        </p>
                    </form>
                }
            </div>
        );
    }

}

