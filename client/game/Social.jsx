import React, { Component } from "react"
import { socialLookupTable } from "../../shared/api/constants"
import { Slider } from "@blueprintjs/core"

export default class Social extends Component {
  state = {
    confidenceRating:
      this.props.player.get("confidenceRatings")[
        this.props.round.get("roundIndex")
      ] === "NA"
        ? 1
        : this.props.player.get("confidenceRatings")[
            this.props.round.get("roundIndex")
          ],
  }
  componentDidMount() {
    const { player, round, game } = this.props
    const ratingIndex = round.get("roundIndex")
    let roundUp = player.get("roundRoundUp")[ratingIndex]
    if (roundUp === "NA") {
      roundUp = Math.random() > 0.5
      let roundUpValues = player.get("roundRoundUp")
      roundUpValues[ratingIndex] = roundUp
      player.set("roundUpValues", roundUpValues)
    }

    let playerRating = player.get("ratings")[ratingIndex]

    let fakeRating = player.get("fakeRatings")[ratingIndex]
    if (playerRating === "NA") {
      if (fakeRating === "NA") {
        const config =
          game.treatment.condition === "emotions"
            ? round.get("stimConfig")
            : round.get("estimateConfig")
        let mean =
          game.treatment.condition === "emotions" ? config.imgMean : config.mean
        if (game.treatment.condition === "numerical") {
          if (mean % 2) {
            mean = roundUp ? (mean + 1) / 2 : Math.floor(mean / 2)
          }
        }

        const multiplier = Math.random() > 0.5 ? 1 : -1
        const value = Math.floor(Math.random() * 6)
        fakeRating = mean + multiplier * value

        let fakeRatings = player.get("fakeRatings")
        fakeRatings[ratingIndex] = fakeRating
        console.log(
          `mean: ${mean}`,
          `value: ${value}`,
          `fakeRating: ${fakeRating}`
        )
      }
    }

    let useRating = playerRating === "NA" ? fakeRating : playerRating

    console.log(`roundUp: ${roundUp}`)
    if (game.treatment.condition === "numerical") {
      if (useRating % 2) {
        useRating = roundUp ? (useRating + 1) / 2 : Math.floor(useRating / 2)
      } else {
        useRating = useRating / 2
      }
    }

    console.log(
      `fakeRating: ${fakeRating}`,
      `playerRating: ${playerRating}`,
      `useRating: ${useRating}`
    )
    const otherRatings =
      useRating < 46
        ? socialLookupTable[playerRating + 3]
        : socialLookupTable[48]
    console.log(playerRating)
    console.log(otherRatings)
    player.stage.set("otherRatings", otherRatings)
  }

  handleChange = (value) => {
    this.setState({ confidenceRating: value })
  }

  handleRelease = (value) => {
    const { player, round } = this.props
    const confidenceRatings = player.get("confidenceRatings")
    confidenceRatings[round.get("roundIndex")] = value
    player.set("confidenceRatings", confidenceRatings)
    player.stage.set("confidenceRating", value)

    player.set("player-timeout", false)
  }

  render() {
    const { game, player, round, stage } = this.props
    const { confidenceRating } = this.state

    const otherPlayers = game.players.filter((p) => p._id !== player._id)
    const otherRatings = player.stage.get("otherRatings")
    // const otherRatings = [1, 2, 4]
    if (!otherRatings) {
      return <p>Loading</p>
    }
    const config =
      game.treatment.condition === "emotions"
        ? round.get("stimConfig")
        : round.get("estimateConfig")
    // Calculate summary of ratings

    let mean = (
      otherRatings.reduce((total, item) => (total += item), 0) /
      otherRatings.length
    ).toFixed(2)

    if (game.treatment.condition === "numerical") {
      mean = `${mean * 2}%`
    }

    // Get the path
    let path
    if (game.treatment.condition === "emotions") {
      path = `stimuli/faces/${config.person}${
        -1 + Math.round(mean) + config.range[0]
      }.jpg`
    } else {
      path = config.stimPath
    }

    const labels = [1, 10]

    return (
      <div>
        <p>
          Please see below for the ratings given by 9 other participants in this
          session. They{" "}
          {game.treatment.condition === "emotions" ? (
            <>saw the exact same group of faces as you did</>
          ) : (
            <>saw the exact same question</>
          )}
          , and these ratings are real-time data.
        </p>
        <br />
        <div className="social-summary title">
          <p>
            <strong>
              Average{" "}
              {game.treatment.condition === "emotions" && (
                <>face created from the</>
              )}{" "}
              ratings of the other players:
            </strong>
          </p>
          <p className="centred">{mean}</p>
          {game.treatment.condition === "emotions" && (
            <img src={path} alt="image of morphed face" />
          )}
        </div>
        {/* {game.treatment.condition === "numerical" && (
          <div className="stimuli-holder-numerical">
            <div className="stimulus-numerical">
              <img src={path} />
            </div>
          </div>
        )} */}
        <br />
        <p className="title">
          <strong>Other players' responses:</strong>
        </p>
        <div className="social-responses">
          {otherRatings.map((r, i) => {
            return (
              <SocialResponse
                key={i}
                r={r}
                config={config}
                index={i}
                condition={game.treatment.condition}
                {...this.props}
              />
            )
          })}
        </div>
        <br />
        <p>
          On a scale of 1-10, how confident do you feel that your estimate was
          more accurate than the estimates of the other 9 people in the game?
        </p>

        <div className="my-slider">
          <Slider
            min={1}
            max={10}
            stepSize={1}
            labelValues={labels}
            value={confidenceRating}
            onChange={this.handleChange}
            onRelease={this.handleRelease}
            showTrackFill={false}
            labelRenderer={this.renderPercentLabel}
          />
        </div>
        <p className="rating-labels">
          <span>(Not confident at all)</span>
          <span>(Extremely confident)</span>
        </p>
        <br />
        {player.stage.submitted ? (
          <div className="title waiting-msg">
            Waiting{game.treatment.playerCount > 1 && " for the other players"}
            ...
          </div>
        ) : (
          <div className="flex-c">
            <button className="main-btn" onClick={() => player.stage.submit()}>
              Continue
            </button>
          </div>
        )}
      </div>
    )
  }
}

class SocialResponse extends Component {
  render() {
    const { r, index, round, config, condition } = this.props

    let path
    if (condition === "emotions") {
      path = `stimuli/faces/${config.person}${-1 + r + config.range[0]}.jpg`
    }
    return (
      <div
        className={`social-response${
          condition === "numerical" ? "-numerical" : ""
        }`}
      >
        <p className="player-id">Player {index + 1}</p>
        {condition === "numerical" ? (
          <span>{r * 2}%</span>
        ) : (
          <img src={path} alt="other-player-response" />
        )}
      </div>
    )
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}
