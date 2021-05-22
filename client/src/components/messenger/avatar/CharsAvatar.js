import React from 'react'
import PropTypes from 'prop-types';
import './CharsAvatar.css'

export default class CharsAvatar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            colors: [
                "255, 85, 77",
                "255, 164, 37",
                "255, 203, 38",
                "104, 222, 121",
                "110, 205, 249",
                "168, 140, 248",
            ]
        }
    }

    getShortTitle(fullTitle) {
        let upperTitle = fullTitle.toUpperCase();
        let words = upperTitle.split(' ');
        if (words.length === 2) {
            return words[0].charAt(0) + words[1].charAt(0) + ""
        } else {
            return words[0].charAt(0) + "";
        }
    }

    getRGBColor(title) {
        let hash = this.getHash(title)
        let elementIndex = hash % (this.state.colors.length)
        return this.state.colors[elementIndex]
    }

    getGradient(){
        return 'linear-gradient(320deg, ' +
            'rgba(' + this.getRGBColor(this.props.title) + ', 1), rgba(' + this.getRGBColor(this.props.title) + ', 0.7))'
    }

    getHash(title) {
        let hash = 0;
        if (title.length === 0) {
            return hash;
        }
        for (let i = 0; i < title.length; i++) {
            const char = title.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    render() {
        return (
            <div className={'dialog-preview-elements'}>
                <h3
                    className={this.props.isSmall ? 'avatars-small' : 'avatars-big'}
                    style={{
                        background: this.getGradient(this.props.title)
                    }}
                >

                    {this.getShortTitle(this.props.title)}
                </h3>
            </div>
        );
    }
}

CharsAvatar.propTypes = {
    title: PropTypes.string,
    isSmall: PropTypes.bool
}

CharsAvatar.defaultProps = {
    isSmall: false
}