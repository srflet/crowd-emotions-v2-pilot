import React, { Component } from "react"
import { Slider } from "@blueprintjs/core"
import ConfidenceRating from "./ConfidenceRating"
import BinaryChoice from "./BinaryChoice"

export default class Estimate extends Component {
  state = {
    rating:
      this.props.player.get("ratings")[this.props.round.get("roundIndex")] ===
      "NA"
        ? 1
        : this.props.player.get("ratings")[this.props.round.get("roundIndex")],
  }

  handleChange = (value) => {
    this.setState({ rating: value })
  }

  handleRelease = (value) => {
    const { player, round } = this.props
    const ratings = player.get("ratings")
    ratings[round.get("roundIndex")] = value
    player.set("ratings", ratings)
    player.stage.set("rating", value)

    player.set("player-timeout", false)
  }

  render() {
    const { player, round, stage, game } = this.props

    // Get rating
    const tmpRating = player.get("ratings")
    // const rating = tmpRating[round.get("roundIndex")] === "NA" ? 1 : tmpRating[round.get("roundIndex")]
    const { rating } = this.state

    // Get the path
    const estimateConfig = round.get("estimateConfig")

    // Get disable condition
    const disabledCondition = tmpRating[round.get("roundIndex")] === "NA"

    return (
      <div>
        <p className="title">
          <strong>{estimateConfig.question}</strong>
        </p>
        <p className="title">
          Please use the slider below to enter your estimate.
        </p>
        <div className="my-slider">
          <Slider
            min={1}
            max={50}
            stepSize={1}
            labelValues={[1, 25, 50]}
            value={rating}
            onChange={this.handleChange}
            onRelease={this.handleRelease}
            showTrackFill={false}
          />
        </div>
        <br />

        {player.stage.submitted ? (
          <>
            <div className="title waiting-msg">
              Your rating has been submitted. Waiting
              {game.treatment.playerCount > 1 && " for the other players"}
              ...
            </div>
          </>
        ) : (
          <>
            <div className="flex-c">
              <button
                className="main-btn"
                disabled={disabledCondition}
                onClick={() => player.stage.submit()}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    )
  }
}
