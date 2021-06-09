import React, { Component } from 'react'
import Slider from "meteor/empirica:slider";

export default class ConfidenceRating extends Component {
    handleChange = value => {
        const { player } = this.props
        player.stage.set("confidence-rating", value)
    }

    handleLabel = value => {
        return value + "%"
    }

    render() {
        const { player } = this.props
        const isNotRated = player.stage.get("confidence-rating") ?? "isNotRated"
        const rating = player.stage.get("confidence-rating")

        return (
            <div>
                <p className="title"><strong>How confident are you about your rating?</strong></p>
                <div className="my-slider">
                    <Slider
                        min={0}
                        max={100}
                        stepSize={10}
                        labelStepSize={10}
                        labelRenderer={this.handleLabel}
                        value={rating}
                        onChange={this.handleChange}
                        showTrackFill={false}
                        className={isNotRated !== "isNotRated" ? "" : "out-of-bounds-thumb"}
                    />
                </div>
                <p className="rating-labels"><span>less confident</span><span>more confident</span></p>
            </div>
        )
    }
}
