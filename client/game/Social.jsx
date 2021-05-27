import React, { Component } from 'react'

export default class Social extends Component {
    render() {
        const { game, player, round } = this.props
        const otherPlayers = game.players.filter(p => p._id !== player._id)

        // Calculate summary of ratings
        const otherRatings = otherPlayers.map(p => p.get("ratings")[round.get("roundIndex")]).filter(rating => rating !== "NA")
        const sumRatings = otherRatings.reduce((total, item) => (total += item), 0)
        const min = Math.min(...otherRatings).toFixed(2)
        const mean = (sumRatings / otherRatings.length).toFixed(2)
        const max = Math.max(...otherRatings).toFixed(2)

        return (
            <div>
                <p className="title"><strong>Information from other players</strong></p>
                <br />
                <div className="social-holder">
                    <div className="social-summary">
                        <p className="title"><strong>Summary</strong></p>
                        <p>Min of other players: <strong>{min}</strong></p>
                        <p>Mean of other players: <strong>{mean}</strong></p>
                        <p>Max of other players: <strong>{max}</strong></p>
                    </div>
                    <div className="social-responses">
                        <p className="title"><strong>Other players' responses</strong></p>
                        {otherPlayers.map((p, i) => {
                            return <SocialResponse key={i} p={p} {...this.props} />
                        })}
                    </div>
                </div>
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

class SocialResponse extends Component {
    render() {
        const { p, round } = this.props
        return (
            <div className="social-response">
                <img src={p.get("avatar")} alt="avatar" className="social-response-avatar" />
                <p>response: <strong>{p.get("ratings")[round.get("roundIndex")]}</strong></p>
            </div>
        )
    }
}
