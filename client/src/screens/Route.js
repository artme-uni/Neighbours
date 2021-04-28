import React from 'react';
import { Router, Route} from 'react-router-dom';
import history from './history';

import FeedScreen from "./feed/FeedScreen";
import MessengerScreen from "./messenger/MessengerScreen";
import MainScreen from "./main/MainScreen";
import ProfileScreen from "./profile/ProfileScreen";
import LoginScreen from "./login/LoginScreen";
import RegistrationScreen from "./registration/RegistrationScreen";
import PostCreationScreen from "./postCreation/PostCreationScreen";

function ScreensRoot() {
    return (
        <Router history={history}>
            <Route exact path='/' component={MainScreen}/>
            <Route path='/feed' component={FeedScreen}/>
            <Route path='/messenger' component={MessengerScreen}/>
            <Route path='/profile' component={ProfileScreen}/>
            <Route path='/login' component={LoginScreen}/>
            <Route path='/registration' component={RegistrationScreen}/>
            <Route path='/create' component={PostCreationScreen}/>
        </Router>
    );
}

export default ScreensRoot;
