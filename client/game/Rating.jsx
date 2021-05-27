import React, { Component } from 'react'
import Slider from "meteor/empirica:slider"

export default class Rating extends Component {

    handleChange = value => {
        const { player, round } = this.props
        const ratings = player.get("ratings")
        ratings[round.get("roundIndex")] = value
        player.set("ratings", ratings)
    }

    render() {
        const { player, round } = this.props

        // Get rating
        const rating = player.get("ratings")[round.get("roundIndex")] === "NA" ? 1 : player.get("ratings")[round.get("roundIndex")]

        // Get the path
        const stimConfig = round.get("stimConfig")
        const path = `stimuli/${stimConfig.person}${-1 + rating + stimConfig.range[0]}.jpg`
        console.log(path)

        return (
            <div>
                <div className="title">
                    <p><strong>Please rate the faces</strong></p>
                    <img src={path} alt="image of morphed face" />
                </div>
                <br />
                <Slider
                    min={1}
                    max={50}
                    stepSize={1}
                    labelValues={[1, 25, 50]}
                    value={rating}
                    onChange={this.handleChange}
                    showTrackFill={false}
                />
                <br />
                {
                    player.stage.submitted
                        ? <div className="title">Your rating has been submitted. Waiting for other players to submit...</div>
                        : <div className="flex-c">
                            <button
                                className="main-btn"
                                disabled={player.get("ratings")[round.get("roundIndex")] === "NA"}
                                onClick={() => player.stage.submit()}
                            >
                                Submit
                        </button>
                        </div>
                }
            </div>

        )
    }
}
