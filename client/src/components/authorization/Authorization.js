import "./Style.css"
import "./Login"
import "./Registration"
import React from "react";

export default class Authorization extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            openRegister: false,
            openLogin: true,
        };
    }

    redirectToRegister(){
        this.setState({
            openRegister: true,
            openLogin: false,
        });
    }

    redirectToLogin(){
        this.setState({
            openRegister: false,
            openLogin: true,
        });
    }

    render() {
        return(
            <div>
                {
                    this.state.openRegister ?
                        <form className={'auth-forms'}>
                            {/*<img src={loginImg}/>*/}
                            <h3>Регистрация</h3>
                            <div className="form-group">
                                <label>Имя</label>
                                <input type="text" className="form-control" placeholder="Введите имя"/>
                            </div>

                            <div className="form-group">
                                <label>Фамилия</label>
                                <input type="text" className="form-control" placeholder="Введите фамилию"/>
                            </div>

                            <div className="form-group">
                                <label>Адрес почты</label>
                                <input type="email" className="form-control" placeholder="Введите адрес почты"/>
                            </div>

                            <div className="form-group">
                                <label>Пароль</label>
                                <input type="password" className="form-control" placeholder="Введите пароль"/>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">Зарегистрироваться</button>
                            <p className="forgot-password text-right">
                                Уже зарегистрированы <a href="#" onClick={() => this.redirectToLogin()}>войти?</a>
                            </p>
                        </form>
                        :
                        <form className={'auth-forms'}>
                            {/*<img src={loginImg}/>*/}
                            <h3>Вход</h3>
                            <div className="form-group">
                                <label>Адрес почты</label>
                                <input type="email" className="form-control" placeholder="Введите адрес почты"/>
                            </div>

                            <div className="form-group">
                                <label>Пароль</label>
                                <input type="password" className="form-control" placeholder="Введите пароль"/>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">Войти</button>
                            <p className="forgot-password text-right">
                                Забыли <a href="#">пароль?</a>
                            </p>
                            <p className="have-no-account text-right">
                                Не <a href="#" onClick={() => this.redirectToRegister()}>зарегистрированы?</a>
                            </p>

                        </form>
                }
            </div>
        );
    }

}
