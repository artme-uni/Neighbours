import React from 'react'
import PropTypes from "prop-types";
import './ChatInfo.css'
import CharsAvatar from "../avatar/CharsAvatar";
import Api from "../../../utils/Api";

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
        this.removeUser = this.removeUser.bind(this);
    }


    async stepForward() {
        await this.canStepForwardUpdate()
        if (this.state.canStepForward) {
            await this.setState({
                startPosition: this.state.startPosition + this.state.step
            })

            await this.canStepForwardUpdate()
            this.canStepBackUpdate()
        }
    }

    async stepBack() {
        this.canStepBackUpdate()
        if (this.state.canStepBack) {

            await this.setState({
                startPosition: this.state.startPosition - this.state.step
            })

            await this.canStepForwardUpdate()
            this.canStepBackUpdate()
        }
    }

    async canStepForwardUpdate() {
        await this.setState({
            canStepForward: (this.state.startPosition + this.state.step) < this.props.members.length
        })
    }

    canStepBackUpdate() {
        this.setState({
            canStepBack: (this.state.startPosition - this.state.step) >= 0
        })
    }

    getName(member) {
        return member.firstName + " " + member.lastName
    }

    removeUser(userLogin){
        Api.removeUser(this.props.id, userLogin)
        window.location.href = "/chat/" + this.props.id
    }

    render() {
        return (
            <div>
                <div className={'chat-info-button-panel'}>
                    <h4 className={'chat-info-field-name'}>Список пользователей</h4>
                    <div>
                        <button
                            onClick={this.stepBack}
                            className={'chat-button chat-info-button'}>
                            Назад
                        </button>
                        <button
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
                            <div key={member.login} className={'chat-info-member'}>
                                <div className={'chat-info-member-name'}>
                                    <div className={'chat-info-avatar'}>
                                        <CharsAvatar title={this.getName(member)} isSmall={true}/>
                                    </div>
                                    {this.getName(member)}
                                </div>
                                <button onClick={() => this.removeUser(member.login)} className={'chat-info-member-button'}>Удалить</button>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

MembersList.propTypes = {
    members: PropTypes.array,
    isLoaded: PropTypes.bool
};

MembersList.defaultProps = {
    members: []
}