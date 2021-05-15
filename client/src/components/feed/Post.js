import React from 'react'
import './Feed.css'
import PropTypes from 'prop-types';
import {Dropdown} from 'react-bootstrap';
import Api from "../../utils/Api";

export default class Post extends React.Component {

    constructor(props) {
        super(props);

        this.self_destruction = this.self_destruction.bind(this);
    }

    self_destruction(){
        Api.delete_bulletin(this.props.id, ((response) => {
                if(response.status === 200){
                    window.location.href='/feed'
                }
            }),
            ((error) => {
                console.log(error)
            }))
    }

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
                        <Dropdown.Toggle variant={'styled-toggle'} id="dropdown-basic">Изменить</Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item className={'feed-post-dropdown-element'} href={'http://localhost:3000/edit/' + this.props.id}>
                                Редактировать
                            </Dropdown.Item>

                            <Dropdown.Item className={'feed-post-dropdown-element'} onClick={this.self_destruction}>
                                Удалить
                            </Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown> : null}

            </div>
        );
    }
}



Post.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    text: PropTypes.string,
    isEditable: PropTypes.bool
};