import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import FeedScreen from "./feed/FeedScreen";
import MessengerScreen from "./messenger/MessengerScreen";
import MainScreen from "./main/MainScreen";
import ProfileScreen from "./profile/ProfileScreen";
import LoginScreen from "./login/LoginScreen";
import RegistrationScreen from "./registration/RegistrationScreen";
import PostCreationScreen from "./postCreation/PostCreationScreen";
import PostEditingScreen from "./postEditing/PostEditingScreen";

function ScreensRoot() {
    return (
        <BrowserRouter>
            <Route exact path='/' component={MainScreen}/>
            <Route path='/feed' component={FeedScreen}/>
            <Route path='/messenger' component={MessengerScreen}/>
            <Route path='/profile' component={ProfileScreen}/>
            <Route path='/login' component={LoginScreen}/>
            <Route path='/registration' component={RegistrationScreen}/>
            <Route path='/create' component={PostCreationScreen}/>
            <Route path='/edit' component={PostEditingScreen}/>
        </BrowserRouter>
    );
}

export default ScreensRoot;
