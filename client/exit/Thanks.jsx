import React from "react"
import CenterDevWrapper from "../wrappers/CenterDevWrapper"

export default class Thanks extends React.Component {
  static stepName = "Thanks"

  render() {
    const { player, game } = this.props
    if (!player.get("finishedStudy")) {
      player.set("finishedStudy", true)
    }

    const ratings = player.get("ratings")
    let trueAnswers = game.get("trueAnswers")
    const { condition } = game.treatment
    if (condition === "emotions") {
      trueAnswers = trueAnswers.map((ans) => {
        return Math.floor(ans / 2)
      })
    }

    const totalError = trueAnswers
      .map((trueAnswer, index) => {
        return Math.abs(trueAnswer - ratings[index + 1])
      })
      .filter((val) => !isNaN(val))
      .reduce((total, item) => (total += item), 0)

    const averageError = (
      totalError /
      trueAnswers.filter((trueAnswer, index) => ratings[index + 1] !== "NA")
        .length
    ).toFixed(2)

    return (
      <CenterDevWrapper {...this.props}>
        <div className="container">
          <h2>Feedback and Debrief</h2>
          <p>
            Thank you for completing the study! Below are your scores. Please
            allow us 10 business days to process your bonus payment.
          </p>

          <br />
          <h3>Feedback about your performance</h3>
          <p>
            Your average absolute error was {averageError}, the lower the
            better.
          </p>
          <p>Here is a breakdown per round:</p>
          <div className="feedbackHolder">
            {trueAnswers.map((trueAnswer, index) => {
              if (index >= 0) {
                return (
                  <div
                    key={index}
                    className={index % 5 === 0 ? "firstRound" : ""}
                  >
                    <p>
                      <u>Round {index + 1}</u>
                    </p>
                    <p>True Answer: {trueAnswer}</p>
                    <p>Your Answer: {ratings[index + 1]}</p>
                    <p>
                      Absolute error:{" "}
                      {Math.abs(trueAnswer - ratings[index + 1])}
                    </p>
                  </div>
                )
              }
            })}
          </div>
          <br />
          <p className="flex-c">
            <button
              className="main-btn"
              onClick={() => {
                window.location =
                  "https://app.prolific.co/submissions/complete?cc=C9A40DQL"
              }}
            >
              Complete study on Prolific
            </button>
          </p>
        </div>
      </CenterDevWrapper>
    )
  }
}
