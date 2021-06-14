import React, { Component } from 'react'

export default class PracticeEnd extends Component {
    render() {
        const { player } = this.props
        return (
            <div>
                <p>
                    This is the end of the practice round. Now you will do the actual study.
                </p>
                <p><strong><u>Remember, the more accurate you are, the higher your bonus (up to 100% of your base pay)!</u></strong></p>
                {
                    player.stage.submitted
                        ? <div className="title waiting-msg">Waiting for the other players...</div>
                        : <div className="flex-c"><button className="main-btn" onClick={() => player.stage.submit()}>Continue</button></div>
                }
            </div>
        )
    }
}
