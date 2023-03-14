import React, { Component } from "react"
import { Meteor } from "meteor/meteor"
import CenterDevWrapper from "../wrappers/CenterDevWrapper"
import { introInfo } from "../intro/introInfo"

export default class Sorry extends Component {
  static stepName = "Sorry"

  render() {
    const { player, game } = this.props
    let msg
    switch (player.exitStatus) {
      case "gameFull":
        msg = `Unfortunately, all the games available are full. We will pay you $${introInfo.pityPay} for your time.`
        break
      case "gameLobbyTimedOut":
        msg = `Unfortunately, there were NOT enough players for the game to start. We will pay you $${introInfo.pityPay} for your time.`
        break
      case "playerEndedLobbyWait":
        msg =
          "You decided to stop waiting, we are sorry it was too long a wait."
        break
      default:
        msg = "Unfortunately the Game was cancelled..."
        break
    }
    if (player.exitReason === "failedQuestion") {
      msg =
        "Unfortunately you did not meet the conditions required to play the game."
    }
    // Only for dev
    if (!game && Meteor.isDevelopment) {
      msg =
        "Unfortunately the Game was cancelled because of failed to init Game (only visible in development, check the logs)."
    }
    return (
      <CenterDevWrapper {...this.props}>
        <div className="container">
          <h4></h4>
          <p>Thank you for coming. {msg}</p>
          <p>
            <strong>
              Please return your participation on Prolific (this will have no
              adverse effect on your Prolific status).
            </strong>
          </p>
          <p>
            Please contact the researcher if you believe there was a problem.
          </p>
        </div>
      </CenterDevWrapper>
    )
  }
}
