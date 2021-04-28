import React from 'react'
import './Feed.css'
import PropTypes from 'prop-types';
import {Dropdown} from 'react-bootstrap';

export default class Post extends React.Component {

    render() {
        return (
            <div className={'feed-post'}>

                <h3 className={'feed-post-title'}>
                    {this.props.title}
                </h3>
                <div>
                    <text className={'feed-post-date'}>{this.props.date} {' | '}</text>
                    <b className={'feed-post-author'}>{this.props.author}</b>
                </div>
                <div className={'feed-post-text'}>
                    {this.props.text}
                </div>


                {this.props.isEditable ?
                    <Dropdown className={'feed-post-info-button'}>
                        <Dropdown.Toggle variant={'styled'} id="dropdown-basic"> </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item className={'feed-post-dropdown-element'} href={'/edit'}>
                                Изменить
                            </Dropdown.Item>
                            <Dropdown.Item className={'feed-post-dropdown-element'}>Удалить</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> : null}

            </div>
        );
    }
}


Post.propTypes = {
    title: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    text: PropTypes.string,
    isEditable: PropTypes.bool
};