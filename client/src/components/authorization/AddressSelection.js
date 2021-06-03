import "./Authorization.css"
import React, {Component} from "react";
import {YMaps, Map, SearchControl, Placemark} from 'react-yandex-maps';
import Post from "../feed/Post";
import PropTypes from "prop-types";

export default class AddressSelection extends Component {

    constructor(props) {
        super(props);

        this.state = {
            coords: null,
            apsApi: null,
            address: {country: null, city: null, street: null, houseNumber: null},
            addressLine: null,
            isReady: false,
            hintMsg: null
        };

        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleYMaps = this.handleYMaps.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    async handleMapClick(event) {
        const newCoords = event.get('coords');
        this.setState(() => {
            return {coords: newCoords}
        });

        await this.getAddress(newCoords)

        let isValidAddress = (this.state.address.city
            && this.state.address.street && this.state.address.houseNumber)

        this.setReady(isValidAddress)

        if (!this.state.isReady) {
            this.setState({hintMsg: 'Выберите более точный адрес'})
        } else {
            this.setState({hintMsg: null})
        }
    }

    async getAddress(coords) {
        let res = await this.state.mapsApi.geocode(coords)
        const firstGeoObject = res.geoObjects.get(0);
        this.setAddress(firstGeoObject);
        this.setAddressLine(firstGeoObject.getAddressLine())
    }

    handleYMaps(mapsApi) {
        this.setState(() => {
            return {mapsApi: mapsApi}
        });
    }

    setAddress(geoObject) {
        this.setState(() => {
            return {
                address: {
                    city: geoObject.getLocalities()[0],
                    street: geoObject.getThoroughfare(),
                    houseNumber: geoObject.getPremiseNumber()
                }
            }
        });
    }

    setAddressLine(line) {
        this.setState(() => {
            return {addressLine: line}
        });
    }

    setReady(isReady) {
        this.setState(() => {
            return {isReady: isReady}
        });
    }

    handleButtonClick() {
        if (this.state.isReady) {
            this.props.onButtonClick(this.state.address);
        } else {
            this.setState({hintMsg: 'Поставьте точку на карте'})
        }
    }

    renderMap() {
        return (
            <YMaps query={{
                ns: "use-load-option",
                apikey: "ecdefb2f-e7bc-4f44-bd99-4d25bd88024e",
                load: ['control.ZoomControl',
                    'control.FullscreenControl',
                    'control.SearchControl',
                    'control.GeolocationControl', 'geocode']
            }}>

                <Map
                    defaultState={{
                        center: [54.843206, 83.089907], zoom: 16,
                        controls: ['zoomControl', 'fullscreenControl', 'geolocationControl']
                    }}

                    width={'510px'} height={'250px'}
                    onClick={this.handleMapClick}
                    onLoad={(mapsApi) => this.handleYMaps(mapsApi)}
                >
                    <Placemark geometry={this.state.coords}
                               options={{preset: 'islands#dotIcon', iconColor: '#48319b'}}/>
                    <SearchControl options={{provider: 'yandex#map'}}/>
                </Map>
            </YMaps>
        );
    }

    render() {
        return (
            <div className={'app-main-container auth-forms'}>
                <h2>Выбор адреса</h2>

                <textarea
                    className="auth-text-area app-field auth-element"
                    content={this.state.addressLine}
                    disabled={true}
                    value={this.state.addressLine ? this.state.addressLine : ''}
                    placeholder={"Выберите адрес на карте"}>
                </textarea>

                <div> {this.renderMap()} </div>

                {this.state.hintMsg ?
                    <p className={'app-hint'}><b>Подсказка:</b> <i>{this.state.hintMsg}</i></p> : null
                }

                <button className="app-button auth-element" onClick={this.handleButtonClick}>
                    Перейти к регистрации
                </button>

                <p className="auth-element">
                    Уже зарегистрированы? {' '}
                    <a href='/login' className={'auth-link'}>Войти</a>
                </p>

            </div>
        )
    }
}

Post.propTypes = {
    onButtonClick: PropTypes.func,
};