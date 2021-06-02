import React from 'react'
import './Feed.css'
import PropTypes from 'prop-types';

import Post from "./Post";
import Api from "../../utils/Api";

export default class FeedContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            postsCount : 5,
            postLoadStep : 5
        }
        this.increasePostsCount = this.increasePostsCount.bind(this);
    }

    increasePostsCount(){
        this.setState({
            postsCount: this.state.postsCount + this.state.postLoadStep
        })
    }

    getButton(){
        return  this.state.postsCount < this.props.posts.length ?
                <button
                    type="submit"
                    className="app-button feed-button"
                    onClick={this.increasePostsCount}>

                    Загрузить еще
                </button> : null
    }

    render() {
        return (
            <div>
            { this.props.posts.length === 0 ? 'Нет доступных объвлений' :
            <div className={'app-main-container'}>
                {this.props.posts.slice(0, this.state.postsCount).map(post =>
                    <div  key={post.id}   className={'feed-container-element'}>
                        <Post
                            id={post.id}
                            title={post.title}
                            text={post.text}
                            date={post.publicationDate}
                            author={post.owner.firstName + " " + post.owner.lastName}
                            isEditable={post.owner.login === Api.getLogin()} />
                    </div>
                )}

                { this.getButton() }

            </div>
            }</div>
        );
    }
}

FeedContainer.propTypes = {
    posts: PropTypes.array,
}