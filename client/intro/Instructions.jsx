import React, { Component } from "react"
import CenterDevWrapper from "../wrappers/CenterDevWrapper"

export default class Instructions extends Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props

    const { condition } = game.treatment

    const imgPath =
      condition === "emotions"
        ? "instructions/instructions3a.png"
        : "instructions/instructions3b.png"

    return (
      <CenterDevWrapper {...this.props}>
        <div className="container">
          <h2>Instructions</h2>

          <p>
            Welcome to our study! Below is a summary of the study’s procedure.
            Please read this carefully.
          </p>

          <ol className="instructions-list">
            {condition === "emotions" ? (
              <li>
                On the screen, you will briefly see a group of faces. These
                faces are of the same person, but with different emotions. For
                instance, in the example below, some faces are angrier than
                others.
              </li>
            ) : (
              <li>
                You will be presented with a visual image for a brief period and
                will be asked a question about that image. Below is an example
                of a visual image.
              </li>
            )}

            <div
              className={`instructions-image-${
                condition === "emotions" ? "emotions" : "numerical"
              }`}
            >
              <img src={imgPath} />
            </div>
            <li>
              You will evaluate{" "}
              {condition === "emotions"
                ? "the AVERAGE EMOTION of this group of faces"
                : "a feature of the visual image"}
              . For the example above, we will ask you{" "}
              {condition === "emotions"
                ? "“what is the average degree of anger in this group of faces?”"
                : "“what is the percentage of blue dots in this image?”"}
            </li>
            <li>
              To respond, you will have a slider where you can indicate your
              response on a scale of 1
              {condition === "emotions"
                ? " (neutral) to 50 (very angry)"
                : "% to 100%"}
              .
            </li>
            {!game.treatment.control && (
              <li>
                After you give your first answer, we will show you the responses
                given by the other 9 participants in this game.
              </li>
            )}
            <li>
              Then, we will show you this{" "}
              {condition === "emotions" ? " group of faces" : "visual image"}{" "}
              one more time, where you can revise your response and submit your
              final answer.
            </li>
            <li>
              We will then move onto the next{" "}
              {condition === "emotions" ? " group of faces" : "question"}. In
              total, there will be a practice{" "}
              {condition === "emotions" ? "round" : "question"}, followed by{" "}
              {game.treatment.nRounds}{" "}
              {condition === "emotions" ? "rounds" : "questions"}.
            </li>
          </ol>

          <br />
          <div className="flex-c multiple-btns">
            <button className="main-btn" disabled={!hasPrev} onClick={onPrev}>
              Previous
            </button>
            <button className="main-btn" onClick={onNext}>
              Next
            </button>
          </div>
        </div>
      </CenterDevWrapper>
    )
  }
}
