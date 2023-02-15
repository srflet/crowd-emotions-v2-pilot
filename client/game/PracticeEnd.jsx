import React, { Component } from "react"
import SocialInstructions from "./SocialInstructions"

export default class PracticeEnd extends Component {
  render() {
    const { player, game } = this.props
    return (
      <div>
        <div>
          <p>
            This is the end of the practice round. Now you will do the actual
            study.
          </p>
          <p>
            <strong>
              <u>Remember, the more accurate you are, the higher your bonus!</u>
            </strong>
          </p>
          <p>
            <strong>You are paired with 9 other players for this task.</strong>
          </p>
          <p>
            This means you will be going through the rounds at the same pace as
            other players.
          </p>
        </div>

        <div>
          {!game.treatment.control && <SocialInstructions {...this.props} />}
          {player.stage.submitted ? (
            <div className="title waiting-msg">
              Waiting
              {game.treatment.playerCount > 1 && " for the other players"}
              ...
            </div>
          ) : (
            <div className="flex-c">
              <button
                className="main-btn"
                onClick={() => player.stage.submit()}
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}
