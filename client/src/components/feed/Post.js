import React from 'react'
import './Feed.css'
import PropTypes from 'prop-types';

export default class Post extends React.Component {

    render() {
        return (
            <div>
                <h3 className={'feed-post-title'}>
                    {this.props.title}
                </h3>
                <div>
                    <text className={'feed-post-date'}>{this.props.date} by {' '}</text>
                    <b className={'feed-post-author'}>{this.props.author}</b>
                </div>
                <div className={'feed-post-text'}>
                    {this.props.text}
                </div>
            </div>
        );
    }
}


Post.propTypes = {
    title: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    text: PropTypes.string
};