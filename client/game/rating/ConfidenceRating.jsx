import React, { Component } from 'react'
import Slider from "meteor/empirica:slider";

export default class ConfidenceRating extends Component {
    handleChange = value => {
        const { player } = this.props
        player.stage.set("confidence-rating", value)
    }

    render() {
        const { player } = this.props
        const rating = player.stage.get("confidence-rating")

        return (
            <div>
                <p className="title"><strong>How confident are you about your rating?</strong></p>
                <div className="my-slider">
                    {
                        rating ?
                            <Slider
                                hideHandleOnEmpty={true}
                                min={0}
                                max={9}
                                stepSize={1}
                                value={rating}
                                onChange={this.handleChange}
                                showTrackFill={false}
                            /> :
                            <Slider
                                hideHandleOnEmpty={true}
                                min={0}
                                max={9}
                                stepSize={1}
                                onChange={this.handleChange}
                                showTrackFill={false}
                            />
                    }
                </div>
                <p className="rating-labels"><span>less confident</span><span>less confident</span></p>
            </div>
        )
    }
}
