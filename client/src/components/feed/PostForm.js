import React from 'react'
import PropTypes from 'prop-types';
import './PostForm.css'

export default class PostForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: null,
            text: null,
            hintMsg: null
        };

        this.onTextBulletinChange = this.onTextBulletinChange.bind(this);
        this.onTitleBulletinChange = this.onTitleBulletinChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onTitleBulletinChange(event){
        this.setState({title: event.target.value})
    }

    onTextBulletinChange(event){
        this.setState({text: event.target.value})
    }

    onSubmit(event){
        event.preventDefault();

        if (this.isFormFilled()) {
            this.props.onSubmit(this.getBulletinInfo())
        }else {
            this.setState({hintMsg: 'Заполните все поля'});
        }
    }

    getBulletinInfo(){
        return{
            title: this.state.title,
            text: this.state.text
        }
    }

    isFormFilled() {
        return this.state.title && this.state.text;
    }

    render() {
        return (
            <div>{
                <form
                    className={'app-main-container post-form'}
                    onSubmit={this.onSubmit}>

                    <h2 className={'post-form-field-element'}>{this.props.titleName}</h2>

                    <h4 className={'post-form-field-name'}>Заголовок объявления</h4>
                    <input type="text"
                           onChange={this.onTitleBulletinChange}
                           className="post-form-field app-field"
                           placeholder="Название"/>

                    <h4 className={'post-form-field-name'}>Описание</h4>
                    <textarea
                        onChange={this.onTextBulletinChange}
                        className="post-form-field  post-form-text app-field"
                        placeholder="Чем вы хотите поделиться?"/>

                    {   this.props.errorMsg ?
                        <p className={'app-hint auth-element'}> <b>Ошибка: </b>
                            <i>{this.props.errorMsg}!</i></p> : null
                    }

                    <button type="submit" className="app-button">{this.props.buttonName}</button>
                </form>
            }
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