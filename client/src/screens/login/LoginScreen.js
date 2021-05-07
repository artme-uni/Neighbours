import './LoginScreen.css';
import MainHeader from "../../components/header/MainHeader";
import LoginForm from "../../components/authorization/LoginForm";
import HeaderStub from "../../components/header/HeaderStub";
import {Component} from "react";
import Api from "../../utils/Api";

export default class LoginScreen extends Component {

    state = {
        errorMsg: null
    }

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(userInfo) {

        Api.login(userInfo,
            ((response) => {
                if(response.status === 200){
                    window.location.href='/#'
                }
            }),
            ((error) => {
                if(error.response.status === 401){
                    this.setState({errorMsg : 'Неверный логин или пароль' })
                }
            }))
    }

    render() {
        return (
            <div>
                <MainHeader/>
                <HeaderStub/>
                <div className={"authorization"}>
                    <LoginForm onSubmit={this.onFormSubmit} errorMsg={this.state.errorMsg}/>
                </div>
            </div>
        );
    }
}
