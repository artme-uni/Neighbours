import React from 'react'
import PropTypes from 'prop-types';
import './PostForm.css'

export default class PostForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: null,
            text: null,
            titleChanged: false,
            textChanged: false,
            hintMsg: null
        };

        this.onTextBulletinChange = this.onTextBulletinChange.bind(this);
        this.onTitleBulletinChange = this.onTitleBulletinChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onTitleBulletinChange(event) {
        this.setState({title: event.target.value})
        this.setState({titleChanged: true})
    }

    onTextBulletinChange(event) {
        this.setState({text: event.target.value})
        this.setState({textChanged: true})
    }

    async onSubmit(event) {
        event.preventDefault();

        if (await this.isFormFilled()) {
            this.props.onSubmit(this.getBulletinInfo())
        } else {
            this.setState({hintMsg: 'Заполните все поля'});
        }
    }

    getBulletinInfo() {
        return {
            title: this.state.title,
            text: this.state.text
        }
    }

    async isFormFilled() {
        if(!this.state.titleChanged){
            await this.setState({title: this.props.title})
        }
        if(!this.state.textChanged){
            await this.setState({text: this.props.text})
        }

        return this.state.title && this.state.text;
    }

    render() {
        return (
            <div>
                <form
                    className={'app-main-container post-form'}
                    onSubmit={this.onSubmit}>

                    <h2 className={'post-form-field-element'}>{this.props.titleName}</h2>

                    <h4 className={'post-form-field-name'}>Заголовок объявления</h4>
                    <input type="text"
                           onChange={this.onTitleBulletinChange}
                           className="post-form-field app-field post-form-field-element"
                           placeholder="Название"
                           defaultValue={this.props.title ? this.props.title : ''}/>

                    <h4 className={'post-form-field-name'}>Описание</h4>
                    <textarea
                        onChange={this.onTextBulletinChange}
                        className="post-form-field  post-form-text app-field"
                        placeholder="Чем вы хотите поделиться?"
                        defaultValue={this.props.text ? this.props.text : ''}/>

                    {this.props.errorMsg ?
                        <p className={'app-hint auth-element'}><b>Ошибка: </b>
                            <i>{this.props.errorMsg}!</i></p> : null
                    }

                    {this.state.hintMsg ?
                        <p className={'app-hint'}><b>Ошибка: </b>
                            <i>{this.state.hintMsg}!</i></p> : null
                    }

                    <button type="submit" className="app-button auth-element">{this.props.buttonName}</button>
                </form>
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
    text: PropTypes.string,

    onSubmit: PropTypes.func
};