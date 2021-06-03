import React, {Component} from "react";
import './MainHeader.css'
import PropTypes from 'prop-types';

export default class MainHeader extends Component {

    render() {
        return (
            <div className={'main-header-container'}>
                <div className={'main-header'}>
                    <a className={'main-header-name'} href="/">Neighbours</a>

                    <div className={'main-header-navbar-container'}>
                        {this.props.createPostIsVisible ?
                        <a className={'main-header-big-links'} href={'/create'}>Создать объвление</a> : null}

                        {this.props.addChatIsVisible ?
                            <a className={'main-header-big-links'} href={'/create-chat'}>Добавить чат</a> : null}

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


MainHeader.propTypes = {
    createPostIsVisible: PropTypes.bool,
    addChatIsVisible: PropTypes.bool,
};

MainHeader.defaultProps = {
    createPostIsVisible: false,
    addChatIsVisible: false
};