import './RegistrationScreen.css';
import MainHeader from "../../components/header/MainHeader";
import RegistrationForm from "../../components/authorization/RegistrationForm";
import HeaderStub from "../../components/header/HeaderStub";
import {Component} from "react";
import AddressSelection from "../../components/authorization/AddressSelection";

import Api from "../../utils/Api"

export default class RegistrationScreen extends Component {

    state = {
        placeIsSelected: false,
        formIsFilled: false,
        login: null,
        userInfo: null,
        addressInfo: null,
        errorMsg: null
    };

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onPlaceSelect = this.onPlaceSelect.bind(this);
    }

    async onFormSubmit(userInfo) {
        this.setFormFilled(true)
        await this.setState( {userInfo: userInfo});

        if(this.state.formIsFilled && this.state.placeIsSelected) {

            Api.register(this.getRegistrationInfo(),
                ((response) => {
                    if(response.status === 201){
                        window.location.href='/login'
                    }
            }),
                ((error) => {
                    if(error.response.status === 400){
                        this.setState({errorMsg : error.response.data.errors[0].defaultMessage })
                    }
                    if(error.response.status === 409){
                        this.setState({errorMsg : 'Username already exists' })
                    }
                }))
        }
    }

    onPlaceSelect(addressInfo) {
        this.setPlaceSelected(true)
        this.setState( {addressInfo: addressInfo});
    }

    getRegistrationInfo(){
        let registrationInfo = {}
        Object.assign(registrationInfo , this.state.addressInfo)
        Object.assign(registrationInfo , this.state.userInfo)
        return registrationInfo;
    }

    setFormFilled(isFilled) {
        this.setState( {formIsFilled: isFilled});
    }

    setPlaceSelected(isSelected) {
        this.setState( {placeIsSelected: isSelected});
    }

    render() {
        return (
            <div>
                <MainHeader/>
                <HeaderStub/>
                <div className={"authorization"}>
                    {this.state.placeIsSelected ?
                        <RegistrationForm
                            onSubmit={this.onFormSubmit} errorMsg={this.state.errorMsg}/>
                        :
                        <AddressSelection
                            onButtonClick = {this.onPlaceSelect}/>
                    }
                </div>
            </div>
        );
    }
}
