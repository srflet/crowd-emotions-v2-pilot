import React, { Component } from 'react'

export default class Break extends Component {
    render() {
        const { stage, player, game } = this.props

        return (
            <div>
                <p className="title"><strong>Feel free to take a {stage.durationInSeconds / 60} minute break.</strong></p>
                <p className="title">You can cut your break short by pressing the continue button. {game.treatment.playerCount > 1 && "Every player has to press 'continue' for the break to end early."}</p>
                {
                    player.stage.submitted
                        ? <div className="title waiting-msg">Waiting{game.treatment.playerCount > 1 && " for the other players"}...</div>
                        : <div className="flex-c"><button className="main-btn" onClick={() => player.stage.submit()}>Continue</button></div>
                }
            </div>
        )
    }
}
