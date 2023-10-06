import React, { Component } from "react"
import { Slider } from "@blueprintjs/core"
import ConfidenceRating from "./ConfidenceRating"
import BinaryChoice from "./BinaryChoice"

export default class Rating extends Component {
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

  renderPercentLabel = (value) => {
    const { game } = this.props
    if (game.treatment.condition === "emotions") {
      return value
    }
    return `${value}%`
  }

  render() {
    const { player, round, stage, game } = this.props
    const { condition } = game.treatment

    // Get rating
    const tmpRating = player.get("ratings")
    // const rating = tmpRating[round.get("roundIndex")] === "NA" ? 1 : tmpRating[round.get("roundIndex")]
    const { rating } = this.state

    // Get the path
    const config =
      condition === "emotions"
        ? round.get("stimConfig")
        : round.get("estimateConfig")

    let path
    if (condition === "emotions") {
      path = `stimuli/faces/${config.person}${
        -1 + rating + config.range[0]
      }.jpg`
    }
    // Get disable condition
    const disabledCondition = tmpRating[round.get("roundIndex")] === "NA"

    const max = condition === "emotions" ? 50 : 100
    const labels = condition === "emotions" ? [1, 25, 50] : [1, 50, 100]

    return (
      <div>
        {condition === "emotions" ? (
          <p className="title">
            <strong>
              What was the average degree of{" "}
              <strong>{config.emotionAdj.toUpperCase()}</strong> in the group of
              faces?
            </strong>
          </p>
        ) : (
          <p className="title">
            <strong>
              What percentage of the shapes were{" "}
              <strong>{config.stimType.toUpperCase()}</strong>?
            </strong>
          </p>
        )}
        {condition === "emotions" && (
          <p className="title">
            <img src={path} alt="image of morphed face" />
          </p>
        )}
        <div className="my-slider">
          <Slider
            min={1}
            max={max}
            stepSize={1}
            labelValues={labels}
            value={rating}
            onChange={this.handleChange}
            onRelease={this.handleRelease}
            showTrackFill={false}
            labelRenderer={this.renderPercentLabel}
          />
        </div>
        {condition === "emotions" && (
          <p className="rating-labels">
            <span>neutral</span>
            <span>very {config.emotion}</span>
          </p>
        )}
        <br />

        {player.stage.submitted ? (
          <>
            <div className="title waiting-msg">
              Your rating has been submitted. Waiting
              {game.treatment.playerCount > 1 && " for the other players"}...
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
