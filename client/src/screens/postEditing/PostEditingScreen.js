import MainHeader from "../../components/header/MainHeader";
import HeaderStub from "../../components/header/HeaderStub";
import PostForm from "../../components/feed/PostForm";
import React from "react";
import Api from "../../utils/Api";

export default class PostEditingScreenScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            postInfo: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        this.loadPost()
    }

    loadPost(){
        Api.get_bulletin(this.getPostID(),
            ((response) => {
                if(response.status === 200){
                    this.setPostInfo(response.data)
                }
            }),
            ((error) => {
                console.log(error)
            }));
    }

    getPostID(){
        return parseInt(this.props.match.params.id)
    }

    setPostInfo(info){
        this.setState({postInfo: info});
        console.log(this.state.postInfo)
    }

    onSubmit(updatedInfo){
        Api.update_bulletin(
            this.getPostID(),
            updatedInfo.title,
            updatedInfo.text,
            ((response) => {
                if(response.status === 200){
                    console.log(200)
                }
            }),
            ((error) => {
                console.log(error)
            }));
    }

    render() {
        return (
            <div>
                <MainHeader createIsVisible={false}/>
                <HeaderStub/>
                <div className={'app-main-container'}>
                    <PostForm
                        titleName={'Редактирование объявления'}
                        buttonName={'Обновить'}
                        title={this.state.postInfo.title}
                        text={this.state.postInfo.text}
                        onSubmit={this.onSubmit}
                    />
                </div>
            </div>
        );
    }
}