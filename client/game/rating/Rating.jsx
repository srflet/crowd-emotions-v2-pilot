import React, { Component } from 'react'
import { Slider } from "@blueprintjs/core"
import ConfidenceRating from './ConfidenceRating'
import BinaryChoice from './BinaryChoice'

export default class Rating extends Component {

    handleChange = value => {
        const { player, round } = this.props
        const ratings = player.get("ratings")
        ratings[round.get("roundIndex")] = value
        player.set("ratings", ratings)
        player.stage.set("rating", value)
    }

    render() {
        const { player, round, stage } = this.props

        // Get rating
        const rating = player.get("ratings")[round.get("roundIndex")] === "NA" ? 1 : player.get("ratings")[round.get("roundIndex")]

        // Get the path
        const stimConfig = round.get("stimConfig")
        const path = `stimuli/${stimConfig.person}${-1 + rating + stimConfig.range[0]}.jpg`

        // Get disable condition
        const disabledCondition = player.get("ratings")[round.get("roundIndex")] === "NA" ||
            !player.stage.get("confidence-rating") ||
            (stage.get("isFinalRating") && !player.stage.get("binaryChoice"))

        return (
            <div>
                <p className="title"><strong>What was the average level of {stimConfig.emotionAdj} in the group of faces?</strong></p>
                <p className="title">
                    <img src={path} alt="image of morphed face" />
                </p>
                <div className="my-slider">
                    <Slider
                        min={1}
                        max={50}
                        stepSize={1}
                        labelValues={[1, 25, 50]}
                        value={rating}
                        onChange={this.handleChange}
                        showTrackFill={false}
                    />
                </div>
                <p className="rating-labels"><span>less {stimConfig.emotion}</span><span>more {stimConfig.emotion}</span></p>
                <br />
                <ConfidenceRating {...this.props} />
                <br />
                {
                    stage.get("isFinalRating") &&
                    <BinaryChoice stimConfig={stimConfig} {...this.props} />
                }
                {
                    player.stage.submitted
                        ? <div className="title waiting-msg">Your rating has been submitted. Waiting for other players to submit...</div>
                        : <div className="flex-c">
                            <button
                                className="main-btn"
                                disabled={disabledCondition}
                                onClick={() => player.stage.submit()}
                            >
                                Next
                        </button>
                        </div>
                }
            </div>

        )
    }
}
