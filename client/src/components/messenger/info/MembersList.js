import React from 'react'
import PropTypes from "prop-types";
import './ChatInfo.css'
import CharsAvatar from "../avatar/CharsAvatar";

export default class MembersList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startPosition: 0,
            step: 3,
            canStepForward: false,
            canStepBack: false
        }
        this.stepForward = this.stepForward.bind(this);
        this.stepBack = this.stepBack.bind(this);
    }

    async stepForward() {
        await this.setState({
            startPosition: this.state.startPosition + this.state.step
        })

        this.canStepForwardUpdate()
        this.canStepBackUpdate()
    }

    async stepBack() {
        await this.setState({
            startPosition: this.state.startPosition - this.state.step
        })

        this.canStepForwardUpdate()
        this.canStepBackUpdate()
    }

    canStepForwardUpdate() {
        this.setState({
            canStepForward: (this.state.startPosition + this.state.step) < this.props.members.length
        })
    }

    canStepBackUpdate() {
        this.setState({
            canStepBack: (this.state.startPosition - this.state.step) >= 0
        })
    }

    componentDidMount() {
        this.canStepForwardUpdate()
        this.canStepBackUpdate()
    }

    render() {
        return (
            <div>
                <div className={'chat-info-button-panel'}>
                    <h4 className={'chat-info-field-name'}>Список пользователей</h4>
                    <div>
                        <button
                            disabled={!this.state.canStepBack}
                            onClick={this.stepBack}
                            className={'chat-button chat-info-button'}>
                            Назад
                        </button>
                        <button
                            disabled={!this.state.canStepForward}
                            onClick={this.stepForward}
                            className={'chat-button chat-info-button'}>
                            Вперед
                        </button>
                    </div>
                </div>

                <div className={'chat-info-members-list'}>
                    {this.props.members
                        .slice(this.state.startPosition, this.state.startPosition + this.state.step)
                        .map(member =>
                            <div key={member.id} className={'chat-info-member'}>
                                <div className={'chat-info-member-name'}>
                                    <div className={'chat-info-avatar'}>
                                        <CharsAvatar title={member.name} isSmall={true}/>
                                    </div>
                                    <text>{member.name}</text>
                                </div>
                                <button className={'chat-info-member-button'}>Удалить</button>
                            </div>
                        )}
                </div>
            </div>
        );
    }

}

MembersList.propTypes = {
    members: PropTypes.array
};