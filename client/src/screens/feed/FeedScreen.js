import './FeedScreen.css';
import MainHeader from "../../components/header/MainHeader";
import FeedContainer from "../../components/feed/FeedContainer";
import HeaderStub from "../../components/header/HeaderStub";
import AuthorizationChecker from "../../components/authorization/AuthorizationChecker";
import React from 'react'
import Api from "../../utils/Api";


export default class FeedScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bulletins: [],
            errorMsg: null,
        }

        this.setPostsArray = this.setPostsArray.bind(this);
    }

    async componentDidMount() {
        if (Api.isLogged()) {
            await new Promise((resolve, reject) => {
                Api.getAllBulletins(((response) => {
                        if (response.status === 200) {
                            this.setPostsArray(response.data);
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

    setPostsArray(info) {
        this.setState({bulletins: info.reverse()});
    }

    render() {
        return (
            <div>
                <MainHeader/>
                <HeaderStub/>
                <AuthorizationChecker/>
                <div>
                    <FeedContainer posts={this.state.bulletins}/>
                </div>
            </div>
        );
    }
}

