import './MessengerScreen.css';
import MainHeader from "../../components/header/MainHeader";
import HeaderStub from "../../components/header/HeaderStub";
import React from 'react'
import AuthorizationChecker from "../../components/authorization/AuthorizationChecker";
import Api from "../../utils/Api";
import DialogsContainer from "../../components/messenger/dialogs/DialogsContainer";

export default class MessengerScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            errorMsg: null,
        }
    }

    setRoomArray(roomsInfo) {
        console.log(roomsInfo)
        this.setState({rooms: roomsInfo});
    }

    async componentDidMount() {
        if (Api.isLogged()) {
            await Api.createSockConnection()

            await new Promise((resolve, reject) => {
                Api.getRooms(((response) => {
                        if (response.status === 200) {
                            this.setRoomArray(response.data);
                        }
                        resolve(response.data)
                    }),
                    ((error) => {
                        this.setState({errorMsg: 'Неизвестная ошибка'})
                        reject(error)
                    }));
            });
        }
    }

    render() {
        return (
            <div>
                <MainHeader addChatIsVisible={true}/>
                <HeaderStub/>
                <AuthorizationChecker/>
                <div className={"messenger"}>
                    {Api.isLogged() ?
                        <DialogsContainer dialogs={this.state.rooms}/>
                        : null}
                </div>
            </div>);
    }
}


