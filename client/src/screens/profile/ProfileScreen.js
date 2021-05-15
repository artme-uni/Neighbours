import './ProfileScreen.css';
import MainHeader from "../../components/header/MainHeader";
import HeaderStub from "../../components/header/HeaderStub";
import React from 'react'
import ProfileForm from "../../components/authorization/ProfileForm";
import AuthorizationChecker from "../../components/authorization/AuthorizationChecker";

function ProfileScreen() {
    return (
        <div>
            <MainHeader/>
            <HeaderStub/>
            <AuthorizationChecker/>
            <div className={"profile"}>
                <ProfileForm />
            </div>
        </div>
    );
}

export default ProfileScreen;
