import React from "react";
import './MainHeader.css'
import PropTypes from 'prop-types';

class MainHeader extends React.Component {
    render() {
        return (
            <div className={'main-header-container'}>
                <div className={'main-header'}>
                    <a className={'main-header-name'} href="/">Neighbours</a>

                    <div className={'main-header-navbar-container'}>
                        {this.props.createIsVisible ?
                        <a className={'main-header-big-links'} href={'/create'}>Создать</a> : null}

                        <a className={'main-header-simple-link'} href={'/feed'}>Объявления</a>
                        <a className={'main-header-simple-link'} href={'/messenger'}>Мессенджер</a>
                        <a className={'main-header-simple-link'} href={'/profile'}>Профиль</a>
                    </div>
                </div>

                <div className={'header-transition'}> </div>
            </div>
        );
    }
}

export default MainHeader;


MainHeader.propTypes = {
    createIsVisible: PropTypes.bool,
};

MainHeader.defaultProps = {
    createIsVisible: true
};