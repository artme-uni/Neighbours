import './ProfileScreen.css';
import MainHeader from "../../components/header/MainHeader";
import HeaderStub from "../../components/header/HeaderStub";
import React from 'react'
import ProfileForm from "../../components/authorization/ProfileForm";
import AuthorizationChecker from "../../components/authorization/AuthorizationChecker";
import Api from "../../utils/Api"

export default class ProfileScreen extends React.Component {
    render() {
        return (
            <div>
                <MainHeader/>
                <HeaderStub/>
                <AuthorizationChecker/>
                <div className={"profile"}>
                    {Api.isLogged() ? <ProfileForm/> : null}
                </div>
            </div>
        );
    }
}