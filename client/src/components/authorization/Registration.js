import "./Style.css"
import React, { Component } from "react";
import loginImg from "../../resources/NeighboursLogo.svg";

export default class Registration extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        console.log('По кнопке кликнули');
    }

    render() {
        return (
            <form className={'auth-forms'}>
                {/*<img src={loginImg}/>*/}
                <h3>Регистрация</h3>
                <div className="form-group">
                    <label>Имя</label>
                    <input type="text" className="form-control" placeholder="Введите имя" />
                </div>

                <div className="form-group">
                    <label>Фамилия</label>
                    <input type="text" className="form-control" placeholder="Введите фамилию" />
                </div>

                <div className="form-group">
                    <label>Адрес почты</label>
                    <input type="email" className="form-control" placeholder="Введите адрес почты" />
                </div>

                <div className="form-group">
                    <label>Пароль</label>
                    <input type="password" className="form-control" placeholder="Введите пароль" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Зарегистрироваться</button>
                <p className="forgot-password text-right">
                    Уже зарегистрированы <a href="#" onClick={this.handleClick}>войти?</a>
                </p>
            </form>
        );
    }
}

