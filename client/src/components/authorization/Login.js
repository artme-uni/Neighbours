import "./Style.css"
import React, { Component } from "react";

export default class Login extends Component {
    render() {
        return (
            <form>
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
                    Забыли <a href="#">пароль?</a>
                </p>
            </form>
        );
    }
}