import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import Feed from "./feed/Feed";
import Messenger from "./messenger/Messenger";
import Main from "./main/Main";
import Profile from "./profile/Profile";

function ScreensRoot() {
    return (
        <BrowserRouter>
            <Route exact path='/' component={Main}/>
            <Route path='/feed' component={Feed}/>
            <Route path='/messenger' component={Messenger}/>
            <Route path='/profile' component={Profile}/>
        </BrowserRouter>
    );
}

export default ScreensRoot;
