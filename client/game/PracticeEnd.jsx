import React, { Component } from 'react'

export default class PracticeEnd extends Component {
    render() {
        const { player } = this.props
        return (
            <div>
                <p>
                    This is the end of the practice round. Now you will do the actual round where you will be show the face array <strong>three times</strong> instead of two.
                </p>
                {
                    player.stage.submitted
                        ? <div className="title waiting-msg">Waiting for the other players...</div>
                        : <div className="flex-c"><button className="main-btn" onClick={() => player.stage.submit()}>Continue</button></div>
                }
            </div>
        )
    }
}
