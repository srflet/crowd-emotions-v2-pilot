import React, { Component } from "react"
import CenterDevWrapper from "../wrappers/CenterDevWrapper"

export default class Comprehension extends Component {
  state = {
    showError: false,
    evaluateAnswer: "",
  }

  handleRadio = (e) => {
    const answer = e.currentTarget.value
    this.setState({ evaluateAnswer: answer })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { game } = this.props
    const { evaluateAnswer } = this.state

    const elements = Object.keys(e.currentTarget).map(
      (key) => e.currentTarget[key]
    )
    const radios = elements.filter((elem) => elem.type === "radio")

    const evalTrue = game.treatment.condition === "emotions" ? "3" : "2"

    const isEvaluateTrue = evaluateAnswer === evalTrue
    const isTimesTrue =
      radios.filter(
        (radio) =>
          radio.name === "times" && radio.checked && radio.value === "true"
      ).length === 1

    if (isEvaluateTrue && isTimesTrue) {
      this.props.onNext()
    } else {
      this.setState({ showError: true })
    }
  }

  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props

    const { condition } = game.treatment

    return (
      <CenterDevWrapper {...this.props}>
        <div className="container">
          <h2>Comprehension Check</h2>

          <form onSubmit={this.handleSubmit}>
            <p>In this study, what are you going to evaluate?</p>
            <div>
              <p>
                <label className="my-radio">
                  <input
                    type="radio"
                    name="evaluate"
                    value="1"
                    onClick={this.handleRadio}
                  />{" "}
                  The population of the United States of America.
                </label>
              </p>
              <p>
                <label className="my-radio">
                  <input
                    type="radio"
                    name="evaluate"
                    value="2"
                    onClick={this.handleRadio}
                  />{" "}
                  A feature of a visual image.
                </label>
              </p>
              <p>
                <label className="my-radio">
                  <input
                    type="radio"
                    name="evaluate"
                    value="3"
                    onClick={this.handleRadio}
                  />{" "}
                  The average emotion in a group of faces.
                </label>
              </p>
            </div>

            <br />

            <p>
              How many times will you see each{" "}
              {condition === "emotions" ? "group of faces" : "visual image"} and
              give your estimate?
            </p>
            <div>
              <p>
                <label className="my-radio">
                  <input type="radio" name="times" value="false" /> 1
                </label>
              </p>
              <p>
                <label className="my-radio">
                  <input type="radio" name="times" value="true" /> 2
                </label>
              </p>
              <p>
                <label className="my-radio">
                  <input type="radio" name="times" value="false" /> 3
                </label>
              </p>
            </div>
            <br />

            {this.state.showError && (
              <p className="error-msg">
                Incorrect. Please provide the correct answers. You can reread
                the instructions if you need to.
              </p>
            )}

            <br />
            <div className="flex-c multiple-btns">
              <button className="main-btn" disabled={!hasPrev} onClick={onPrev}>
                Previous
              </button>
              <button className="main-btn" type="submit">
                Submit and{" "}
                {game.treatment.playerCount > 1
                  ? "join the lobby"
                  : "start the practice"}
              </button>
            </div>
          </form>
        </div>
      </CenterDevWrapper>
    )
  }
}
