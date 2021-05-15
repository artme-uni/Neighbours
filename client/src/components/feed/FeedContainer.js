import React from 'react'
import './Feed.css'
import PropTypes from 'prop-types';

import Post from "./Post";
import Api from "../../utils/Api";

export default class FeedContainer extends React.Component {

    render() {
        return (
            <div className={'app-main-container'}>

                {this.props.posts.map(post =>
                    <div  key={post.id}   className={'feed-container-element'}>
                        <Post id={post.id} title={post.title} text={post.text} date={post.publicationDate}
                              author={post.owner.firstName + " " + post.owner.lastName}
                        isEditable={post.owner.login === Api.getLogin()}/>
                    </div>
                )}

            </div>
        );
    }
}

FeedContainer.propTypes = {
    posts: PropTypes.array,
}