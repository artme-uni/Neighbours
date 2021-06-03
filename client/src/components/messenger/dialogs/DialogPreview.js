import React from 'react'
import PropTypes from 'prop-types';
import CharsAvatar from '../avatar/CharsAvatar'

export default class DialogPreview extends React.Component {

    render() {
        return (
            <div className={'dialog-preview-elements'}>
                <CharsAvatar title={this.props.title}/>

                <div className={'dialog-preview-info'}>
                    <h3 className={'dialog-preview-title'}>
                        {this.props.title}
                    </h3>

                    <text className={'dialogs-preview-date'}>
                        31.05.2021
                    </text>

                    <div>
                        <text className={'single-row'}> {this.props.lastMessage} </text>
                    </div>
                </div>
            </div>
        );
    }
}

DialogPreview.propTypes = {
    title: PropTypes.string,
    lastMessage: PropTypes.string
};