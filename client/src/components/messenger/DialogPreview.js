import React from 'react'
import PropTypes from 'prop-types';

export default class DialogPreview extends React.Component {

    getShortTitle(fullTitle) {
        let upperTitle = fullTitle.toUpperCase();
        let words = upperTitle.split(' ');
        if (words.length === 2) {
            return words[0].charAt(0) + words[1].charAt(0)
        } else {
            return words[0].charAt(0);
        }
    }

    render() {
        return (
            <div className={'dialog-preview-elements'}>

                <h3 className={'dialog-chars-avatar'}>
                    {this.getShortTitle(this.props.title)}
                </h3>

                <div className={'dialog-preview-info'}>
                    <h3 className={'dialog-preview-title'}>
                        {this.props.title}
                    </h3>

                    <text className={'dialogs-preview-date'}> {this.props.lastMessage.date} </text>

                    <div>
                        <text className={'single-row'}> {this.props.lastMessage.text} </text>
                    </div>

                </div>
            </div>
        );
    }
}

DialogPreview.propTypes = {
    title: PropTypes.string,
    lastMessage: PropTypes.object
};