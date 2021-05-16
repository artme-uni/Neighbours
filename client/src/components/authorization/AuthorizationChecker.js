import React, {Component} from 'react';
import Api from "../../utils/Api"

export default class AuthorizationChecker extends Component {

    async componentDidMount() {
        try {
            if(!Api.isLogged()){
                window.location.href='/login'
            }
        } catch(err) {}
    }

    render() {
        return (
            <div/>
        )
    }
}