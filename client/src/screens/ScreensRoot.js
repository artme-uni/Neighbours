import React, {Component} from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import FeedScreen from "./feed/FeedScreen";
import MessengerScreen from "./messenger/MessengerScreen";
import MainScreen from "./main/MainScreen";
import ProfileScreen from "./profile/ProfileScreen";
import LoginScreen from "./login/LoginScreen";
import RegistrationScreen from "./registration/RegistrationScreen";
import PostCreationScreen from "./postCreation/PostCreationScreen";
import PostEditingScreen from "./postEditing/PostEditingScreen";
import ChatScreen from "./chat/ChatScreen";
import ChatInfoScreen from "./chatInfo/ChatInfoScreen";
import ChatCreation from "./chatCreation/ChatCreation";

export default class ScreensRoot extends Component {

    render() {
        return (
            <BrowserRouter>
                <Route exact path='/' component={MainScreen}/>
                <Route path='/feed' component={FeedScreen}/>
                <Route path='/messenger' component={MessengerScreen}/>
                <Route path='/chat/:id' component={ChatScreen}/>
                <Route path='/chat-info/:id' component={ChatInfoScreen}/>
                <Route path='/create-chat' component={ChatCreation}/>
                <Route path='/profile' component={ProfileScreen}/>
                <Route path='/login' component={LoginScreen}/>
                <Route path='/registration' component={RegistrationScreen}/>
                <Route path='/create' component={PostCreationScreen}/>
                <Route path='/edit/:id' component={PostEditingScreen}/>
            </BrowserRouter>
        );
    }
}