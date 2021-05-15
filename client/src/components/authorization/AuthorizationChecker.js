import React, {Component} from 'react';
import Api from "../../utils/Api"

export default class AuthorizationChecker extends Component {

    constructor(props) {
        super(props);
        Api.loadLoginInfo()

        if(!Api.isLogged()){
            window.location.href='/login'
        }
    }

    render() {
        return (
            <div/>
        )
    }
}