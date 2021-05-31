import MainHeader from "../../components/header/MainHeader";
import HeaderStub from "../../components/header/HeaderStub";
import React, {Component} from "react";
import UserAddingForm from "../../components/messenger/chat/UserAddingForm";

export default class UserAdding extends Component {
    state = {
        errorMsg: null
    }

    render() {
        return (
            <div>
                <MainHeader/>
                <HeaderStub/>
                <div>
                    <UserAddingForm id={parseInt(this.props.match.params.id)}/>
                </div>
            </div>
        );
    }
}
