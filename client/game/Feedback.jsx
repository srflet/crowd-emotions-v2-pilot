import React, { Component } from 'react'

export default class Feedback extends Component {
    render() {
        const { player, round } = this.props
        const rating = player.get("ratings")[round.get("roundIndex")]

        return (
            <div>
                <p>The true rating was: XXXX</p>
                <p>Your rating was: {rating}</p>
                <p>Absolute error: YYYY</p>
                <p>Reward: ZZZZ</p>
            </div>
        )
    }
}
