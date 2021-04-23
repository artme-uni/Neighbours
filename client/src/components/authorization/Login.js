import "./Style.css"
import React from "react";
import './Style.css'
import Registration from "./Registration";

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log('По кнопке кликнули');
    }

    redirectToRegister(){
        console.log('Открываем окно регистрации');
    }

    render() {
        return (
            <form className = {'auth-forms'}>
                {/*<img src={loginImg}/>*/}
                <h3>Вход</h3>
                <div className="form-group">
                    <label>Адрес почты</label>
                    <input type="email" className="form-control" placeholder="Введите адрес почты" />
                </div>

                <div className="form-group">
                    <label>Пароль</label>
                    <input type="password" className="form-control" placeholder="Введите пароль" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Войти</button>
                <p className="forgot-password text-right">
                    Забыли <a href="#" onClick={() => this.handleClick()}>пароль?</a>
                </p>
                <p className="have-no-account text-right">
                    Не <a href="#" onClick={()=> this.redirectToRegister()}>зарегистрированы?</a>
                </p>

            </form>
        );
    }
}