import MainHeader from "../../components/header/MainHeader";
import HeaderStub from "../../components/header/HeaderStub";
import PostForm from "../../components/feed/PostForm";
import React from "react";
import Api from "../../utils/Api";
import AuthorizationChecker from "../../components/authorization/AuthorizationChecker";

class PostCreationScreen extends React.Component{

    state = {
        formIsFilled: false,
        title: null,
        text: null,
        errorMsg: null
    };

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    async onFormSubmit(bulletinsInfo){
        await this.setFormFilled(true)

        if(this.state.formIsFilled){
            Api.create_bulletin(bulletinsInfo,
                ((response) => {
                    if(response.status === 201){
                        window.location.href='/feed';
                    }
                }),
                ((error) => {
                        this.setState({errorMsg: error.response.data.errors[0].defaultMessage})
                }))
        }
    }

    async setFormFilled(isFilled){
        await this.setState({formIsFilled: isFilled});
    }

    render() {
        return (
            <div>
                <MainHeader/>
                <HeaderStub/>
                <AuthorizationChecker/>
                <div>
                    {Api.isLogged() ?
                    <PostForm
                        onSubmit={this.onFormSubmit}
                        errorMsg={this.state.errorMsg}
                        titleName={'Создание объявления'}
                        buttonName={'Создать'}/> : null}
                </div>
            </div>
        );
    }
}

export default PostCreationScreen;
