import React from 'react'
import PropTypes from 'prop-types';
import './PostForm.css'

export default class PostForm extends React.Component {

    render() {
        return (
            <div>
                <div className={'app-main-container post-form'}>
                    <h2 className={'post-form-field-element'}>{this.props.titleName}</h2>

                    <h4 className={'post-form-field-name'}>Заголовок объявления</h4>
                    <input type="text" className="post-form-field app-field" placeholder="Название"/>

                    <h4 className={'post-form-field-name'}>Описание</h4>
                    <textarea className="post-form-field  post-form-text app-field"
                              placeholder="Чем вы хотите поделиться?"/>

                    <button type="submit" className="app-button">{this.props.buttonName}</button>
                </div>
            </div>
        );
    }
}


PostForm.propTypes = {
    titleName: PropTypes.string,
    buttonName: PropTypes.string,

    title: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    text: PropTypes.string
};