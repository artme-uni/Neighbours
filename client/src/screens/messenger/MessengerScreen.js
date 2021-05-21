import './MessengerScreen.css';
import MainHeader from "../../components/header/MainHeader";
import HeaderStub from "../../components/header/HeaderStub";
import React from 'react'
import AuthorizationChecker from "../../components/authorization/AuthorizationChecker";
import Api from "../../utils/Api";
import DialogsContainer from "../../components/messenger/DialogsContainer";

export default class MessengerScreen extends React.Component {

    render() {
        const test = [
            {id: '1', title: 'ул. Пирогова, д.2', lastMessage: {text: "В итоге его никто не нашел?", date: "22.04.2021"}},
            {id: '2', title: 'Валентин Павлович', lastMessage: {text: "Да, согласен", date: "22.04.2021"}},
            {id: '3', title: 'Новоселье в 25кв', lastMessage: {text: "Жду всех завтра после 18:00 у себя. Берите с собой друзей и хорошее настроение, с меня праздничный ужин!", date: "22.04.2021"}},
            {id: '4', title: 'Дмитрий Кораблев', lastMessage: {text: "Ну так что, идем завтра?", date: "22.04.2021"}},
            {id: '5', title: 'Test', lastMessage: {text: "test", date: "22.04.2021"}},
            {id: '5', title: 'Test', lastMessage: {text: "test", date: "22.04.2021"}},
            {id: '5', title: 'Test', lastMessage: {text: "test", date: "22.04.2021"}},
            {id: '5', title: 'Test', lastMessage: {text: "test", date: "22.04.2021"}},
            {id: '5', title: 'Test', lastMessage: {text: "test", date: "22.04.2021"}},
            {id: '5', title: 'Test', lastMessage: {text: "test", date: "22.04.2021"}},
            {id: '5', title: 'Test', lastMessage: {text: "test", date: "22.04.2021"}},
            {id: '5', title: 'Test', lastMessage: {text: "test", date: "22.04.2021"}},
            {id: '5', title: 'Test', lastMessage: {text: "test", date: "22.04.2021"}},
            {id: '5', title: 'Test', lastMessage: {text: "test", date: "22.04.2021"}},
        ]

        return (
            <div>
                <MainHeader addChatIsVisible={true}/>
                <HeaderStub/>
                <AuthorizationChecker/>
                <div className={"messenger"}>
                    {Api.isLogged() ?
                        <DialogsContainer dialogs={test}/>
                        : null}
                </div>
            </div>);
    }
}


