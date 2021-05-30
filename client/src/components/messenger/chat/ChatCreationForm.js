import React from 'react'
import PropTypes from 'prop-types';
import './ChatCreationForm.css'
import Api from "../../../utils/Api";

export default class ChatCreationForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: null,
            titleChanged: false,
            hintMsg: null
        };
        Api.loadLoginInfo()
        Api.createSockConnection()

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onTitleChange(event) {
        this.setState({title: event.target.value})
        this.setState({titleChanged: true})
    }

    async onSubmit(event) {
        event.preventDefault();

        if (this.state.title) {
            await Api.createNewChatRoom(this.state.title, (id) => window.location.href = "/chat-info/" + id)
        } else {
            this.setState({hintMsg: 'Заполните все поля'});
        }
    }

    render() {
        return (
            <div>
                <form
                    className={'app-main-container chat-form'}
                    onSubmit={this.onSubmit}>

                    <h2 className={'chat-form-field-element'}>Создание чата</h2>

                    <h4 className={'chat-form-field-name'}>Название</h4>
                    <input type="text"
                           onChange={this.onTitleChange}
                           className="chat-form-field app-field"
                           placeholder="Название"
                           defaultValue={this.props.title ? this.props.title : ''}/>

                    {this.state.hintMsg ?
                        <p className={'app-hint'}><b>Ошибка: </b>
                            <i>{this.state.hintMsg}!</i></p> : null
                    }

                    <button type="submit" className="app-button chat-form-element">Создать</button>
                </form>
            </div>
        );
    }
}


ChatCreationForm.propTypes = {
    titleName: PropTypes.string,
    buttonName: PropTypes.string,

    title: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    text: PropTypes.string,

    onSubmit: PropTypes.func
};