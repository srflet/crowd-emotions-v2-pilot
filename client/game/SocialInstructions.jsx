import React, { Component } from "react"

export default class SocialInstructions extends Component {
  render() {
    const { game } = this.props
    return (
      <div>
        <p>
          From now on, in between , you will have a 'social' stage where you
          will see the from the other players and an average of their .
        </p>
        <p>For example:</p>
        <div
          className={`practiceEnd-image-${
            game.treatment.condition === "emotions" ? "emotions" : "numerical"
          }`}
        >
          <img
            src={`instructions/instructions2${
              game.treatment.condition === "emotions" ? "a" : "b"
            }.png`}
            width="75%"
          />
        </div>
      </div>
    )
  }
}
