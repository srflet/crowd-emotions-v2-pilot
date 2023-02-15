import React, { Component } from "react"
import CenterDevWrapper from "../wrappers/CenterDevWrapper.jsx"
import Stimulus from "./Stimulus.jsx"
import Rating from "./rating/Rating.jsx"
import Estimate from "./rating/Estimate.jsx"
import Social from "./Social.jsx"
import Timeline from "./timeline/Timeline"
import Break from "./Break.jsx"
import PracticeEnd from "./PracticeEnd.jsx"

export default class Round extends Component {
  renderStage = () => {
    const { stage, player } = this.props

    if (stage.name === "stimulus") {
      return <Stimulus {...this.props} />
    }

    if (stage.name === "rating") {
      return <Rating {...this.props} />
    }

    if (stage.name === "estimate") {
      return <Estimate {...this.props} />
    }

    if (stage.name === "social") {
      return <Social {...this.props} />
    }

    if (stage.name === "practiceEnd") {
      return <PracticeEnd {...this.props} />
    }
  }

  render() {
    const { round, stage, player, game } = this.props

    // const timeout = player.idle && player.get("player-timeout")
    const timeout = player.get("player-timeout")
    // if (timeout && !player.stage.submitted) {
    // 	player.stage.submit()
    // }

    return (
      <CenterDevWrapper {...this.props}>
        <div className="round-holder">
          <Timeline {...this.props} />
          <div className="container">
            {timeout && (
              <p className="timeout-box">
                You seem to be disengaged from the study. Because this is a
                group study, a player’s disengagement will delay the progress of
                the other {game.treatment.playerCount - 1} players. Please make
                sure you are responding to the stages.
              </p>
            )}
            {this.renderStage()}
          </div>
        </div>
      </CenterDevWrapper>
    )
  }
}
