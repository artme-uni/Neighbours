import React from 'react'
import PropTypes from 'prop-types';
import DialogPreview from "./DialogPreview";
import './Dialogs.css'

export default class DialogsContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogsCount : 5,
            dialogsLoadStep : 5
        }
        this.increaseDialogsCount = this.increaseDialogsCount.bind(this);
        this.onClickChat = this.onClickChat.bind(this);
    }

    increaseDialogsCount(){
        this.setState({
            dialogsCount: this.state.dialogsCount + this.state.dialogsLoadStep
        })
    }

    onClickChat(id){
        window.location.href='/chat/' + id
    }

    render() {
        return (
            <div className={'app-main-container'}>
                {this.props.dialogs.slice(0, this.state.dialogsCount).map(dialog =>
                    <button
                        key={dialog.id}
                        onClick={() => this.onClickChat(dialog.id)}
                        className={'dialogs-previews-container'}>
                        <DialogPreview title={dialog.title} lastMessage={dialog.lastMessage}/>
                    </button>
                )}

                { this.state.dialogsCount < this.props.dialogs.length ?
                    <button
                        className="app-button dialogs-container-button"
                        onClick={this.increaseDialogsCount}>
                        Загрузить еще
                    </button>
                     : null
                 }

            </div>
        );
    }
}

DialogsContainer.propTypes = {
    dialogs: PropTypes.array
}