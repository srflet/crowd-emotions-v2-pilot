import React, { Component } from 'react'

export default class Feedback extends Component {
    render() {
        const { player, round } = this.props
        const rating = player.get("ratings")[round.get("roundIndex")]
        const stimConfig = round.get("stimConfig")

        return (
            <div>
                <p>The true rating was: {stimConfig.imgMean}</p>
                <p>Your rating was: {rating}</p>
                <p>Absolute error: {Math.abs(stimConfig.imgMean - rating)}</p>
                <p>Reward: ZZZZ</p>
                <br />
                {
                    player.stage.submitted
                        ? <div className="title">Waiting for the other players...</div>
                        : <div className="flex-c"><button className="main-btn" onClick={() => player.stage.submit()}>Continue</button></div>
                }
            </div>
        )
    }
}
