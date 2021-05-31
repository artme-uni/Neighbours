import React from 'react'
import './ChatCreationForm.css'
import Api from "../../../utils/Api";

export default class UserAddingForm extends React.Component {

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
            await Api.addUser(this.props.id, this.state.title)
            this.getBack()
        } else {
            this.setState({hintMsg: 'Заполните все поля'});
        }
    }

    getBack(){
        window.location.href = "/messenger"
        // window.location.href = "/chat/" + this.props.id
    }

    render() {
        return (
            <div>
                <div
                    className={'app-main-container chat-form'}>
                    <form
                        onSubmit={this.onSubmit}>

                        <h2 className={'chat-form-field-element'}>Добавление пользователя</h2>

                        <h4 className={'chat-form-field-name'}>Логин</h4>
                        <input type="text"
                               onChange={this.onTitleChange}
                               className="chat-form-field app-field"
                               placeholder="Название"/>

                        {this.state.hintMsg ?
                            <p className={'app-hint'}><b>Ошибка: </b>
                                <i>{this.state.hintMsg}!</i></p> : null
                        }

                        <button type="submit" className="app-button chat-form-element">Добавить</button>
                    </form>
                    <button onClick={() => this.getBack()} className="chat-button chat-info-back-button">Верунуться</button>
                </div>
            </div>
        );
    }
}