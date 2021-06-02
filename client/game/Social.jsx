import React, { Component } from 'react'

export default class Social extends Component {
    render() {
        const { game, player, round } = this.props
        const otherPlayers = game.players.filter(p => p._id !== player._id)

        // Calculate summary of ratings
        const otherRatings = otherPlayers.map(p => p.get("ratings")[round.get("roundIndex")]).filter(rating => rating !== "NA")
        const min = Math.min(...otherRatings).toFixed(2)
        const mean = (otherRatings.reduce((total, item) => (total += item), 0) / otherRatings.length).toFixed(2)
        const max = Math.max(...otherRatings).toFixed(2)

        // Get the path
        const stimConfig = round.get("stimConfig")
        const path = `stimuli/${stimConfig.person}${-1 + Math.round(mean) + stimConfig.range[0]}.jpg`

        return (
            <div>
                <p>
                    Please see below for the ratings given by {otherPlayers.length} other participants in this session. They saw the exact same group of faces as you did, and these ratings are real-time data.
                </p>
                <div className="social-holder">
                    <div className="social-summary title">
                        <p><strong>Summary:</strong></p>
                        <p>Min of other players: <strong>{min}</strong></p>
                        <p>Mean of other players: <strong>{mean}</strong></p>
                        <p>Max of other players: <strong>{max}</strong></p>
                        <br />
                        <div>
                            <p><strong>Average face created from the ratings of the other players:</strong></p>
                            <img src={path} alt="image of morphed face" />
                        </div>
                    </div>
                    <div className="social-responses">
                        <p className="title"><strong>Other players' responses:</strong></p>
                        {otherPlayers.map((p, i) => {
                            return <SocialResponse key={i} p={p} {...this.props} />
                        })}
                    </div>
                </div>
                <br />
                {
                    player.stage.submitted
                        ? <div className="title waiting-msg">Waiting for the other players...</div>
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
