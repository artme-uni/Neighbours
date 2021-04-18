import React from "react";
import loginImg from "./login.svg";

export class Login extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return <div className="base-container">
            <div className="header">Neighbours</div>
            <div className="content">
                <div className="image">
                    <img src={loginImg}/>
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Имя пользователя</label>
                        <input type="text" name="username" placeholder="username"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input type="password" name="password" placeholder="password"/>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn">
                    Войти
                </button>

                <button type="button" className="btn">
                    Регистрация
                </button>
            </div>
        </div>
    }
}