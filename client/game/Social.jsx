import React, { Component } from 'react'

export default class Social extends Component {
    render() {
        const { game, player, round } = this.props
        const otherPlayers = game.players.filter(p => p._id !== player._id)

        // Calculate summary of ratings
        const otherRatings = otherPlayers.map(p => p.get("ratings")[round.get("roundIndex")]).filter(rating => rating !== "NA")
        // const min = Math.min(...otherRatings).toFixed(2)
        // const max = Math.max(...otherRatings).toFixed(2)
        const mean = (otherRatings.reduce((total, item) => (total += item), 0) / otherRatings.length).toFixed(2)

        // Get the path
        const stimConfig = round.get("stimConfig")
        const path = `stimuli/${stimConfig.person}${-1 + Math.round(mean) + stimConfig.range[0]}.jpg`

        return (
            <div>
                <p>
                    Please see below for the ratings given by {otherPlayers.length} other participants in this session. They saw the exact same group of faces as you did, and these ratings are real-time data.
                </p>
                <br />
                <div className="social-summary title">
                    <p><strong>Average face created from the ratings of the other players:</strong></p>
                    {
                        isNaN(mean)
                            ? <span>No answers provided by the other players</span>
                            : <img src={path} alt="image of morphed face" />
                    }
                </div>
                <br />
                <p className="title"><strong>Other players' responses:</strong></p>
                <div className="social-responses">
                    {otherPlayers.map((p, i) => {
                        return <SocialResponse key={i} p={p} stimConfig={stimConfig} index={i} {...this.props} />
                    })}
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
        const { p, index, round, stimConfig } = this.props

        const path = `stimuli/${stimConfig.person}${-1 + p.get("ratings")[round.get("roundIndex")] + stimConfig.range[0]}.jpg`
        return (
            <div className="social-response title">
                <p>Player {index + 1}</p>
                {p.get("ratings")[round.get("roundIndex")] === "NA"
                    ? <span>{p.get("ratings")[round.get("roundIndex")]}</span>
                    : <img src={path} alt="other-player-response" />
                }
            </div>
        )
    }
}
