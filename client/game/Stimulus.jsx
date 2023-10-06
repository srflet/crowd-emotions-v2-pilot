import React, { Component } from "react"
import { StageTimeWrapper } from "meteor/empirica:core"

// Allows you to sync time with the server
import { TimeSync } from "meteor/mizzao:timesync"

// Trying to build an accurate timer based on:
// https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript

class StimulusBuilder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timed: 0,
      show: false,
    }
    this.expectedTimeout = null
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const { round, stage, remainingSeconds, game } = this.props
    const config =
      game.treatment.condition === "emotions"
        ? round.get("stimConfig")
        : round.get("estimateConfig")

    const currentTime = Number(new Date(TimeSync.serverTime(null, 100)))
    if (remainingSeconds <= 3 && this.expectedTimeout === null) {
      this.setState({ show: true })
      this.expectedTimeout =
        Number(new Date(TimeSync.serverTime(null, 100))) + 1500
    }

    if (
      currentTime >= this.expectedTimeout &&
      this.expectedTimeout !== null &&
      this.state.show
    ) {
      this.setState({ show: false })
    }

    return (
      <div>
        {game.treatment.condition === "emotions" ? (
          <p className="m0 title">
            We will ask you for the average degree of{" "}
            <strong>{config.emotionAdj.toUpperCase()}</strong> in these faces.
          </p>
        ) : (
          <p>
            Estimate the percentage of{" "}
            <strong>{config.stimType.toUpperCase()}</strong> below:
          </p>
        )}
        <div
          className={`stimuli-holder ${this.state.show && "hidden-stimuli"}`}
        >
          <div className="fixation-cross">+</div>
        </div>
        {game.treatment.condition === "emotions" && (
          <div
            className={`stimuli-holder ${!this.state.show && "hidden-stimuli"}`}
          >
            {config.stimuliPaths.map((path, index) => {
              return (
                <div key={index} className="stimulus-holder">
                  <img src={path} style={round.get("arrayStyles")[index]} />
                </div>
              )
            })}
          </div>
        )}
        {game.treatment.condition === "numerical" && (
          <div
            className={`stimuli-holder-numerical ${
              !this.state.show && "hidden-stimuli"
            }`}
          >
            <div className="stimulus-numerical">
              <img src={round.get("estimateConfig").stimPath} />
            </div>
          </div>
        )}
      </div>
    )
  }
}

// Export this awith the stage time wrapper that makes it a timer
export default Stimulus = StageTimeWrapper(StimulusBuilder)
