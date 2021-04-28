import './MainScreen.css';
import MainHeader from "../../components/header/MainHeader";
import HeaderStub from "../../components/header/HeaderStub";

import leftCity from "../../resources/mainBackground/left-city.png";
import rightCity from "../../resources/mainBackground/right-city.png";
import ground from "../../resources/mainBackground/ground.png";
import elements from "../../resources/mainBackground/elements.png";
import sun from "../../resources/mainBackground/sun.png";
import React from "react";
import {Link} from "react-router-dom";

export default class MainScreen extends React.Component{

    render() {
    return (
        <div>
            <MainHeader createIsVisible={false}/>
            <HeaderStub/>
            <div>
                <div className={'main-screen-title'}>
                    <h1 className={'main-screen-text'}>
                        Беспрепятсвенно делитесь важной информацией с соседями
                    </h1>
                    <Link to={'/create'} className={'app-button main-screen-button'}>
                        Создать объвление
                    </Link>
                </div>

                <img src={leftCity} className={'left-city'} height="50%" alt={'left-city'}/>
                <img src={rightCity} className={'right-city'} height="50%" alt={'right-city'}/>
                <img src={ground} className={'background-city'} height="25" alt={'background-city'}/>
                <img src={elements} className={'main-screen-city-elements'} height="9%" alt={'elements'}/>
                <img src={sun} className={'main-screen-city-sun'} alt={'sun'}/>
            </div>
        </div>
    )}
}
