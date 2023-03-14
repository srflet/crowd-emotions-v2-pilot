// Importing Empirica
import Empirica from "meteor/empirica:core"
import "./bots.js"
import "./callbacks.js"
import { estimateDataObject } from "./constants.js"
import { stimuliLookup } from "../shared/api/constants.js" // Import the configs
import { Configs } from "../shared/api/collectionAdminGlobalConfigs.js"

// Importing helper functions for randomness
import { choice, popChoice, shuffle } from "./helper-functions/random"

const path = require("path")
const fs = require("fs")

// Setting a variable for whether this is development/testing or not (determines the time set to the stages)
const isDev = false

// Publish the configs
Meteor.publish("admin-global-configs", function publishTasks() {
  return Configs.find({})
})

// When the game starts (intro steps have ended), set up the game
Empirica.gameInit((game) => {
  game.players.forEach((player, i) => {
    player.set("avatar", `/avatars/jdenticon/${player._id}`)
    player.set(
      "ratings",
      [...Array(game.treatment.nRounds + 1).keys()].map((value) => "NA")
    )
    player.set(
      "fakeRatings",
      [...Array(game.treatment.nRounds + 1).keys()].map((value) => "NA")
    )
    player.set(
      "roundRoundUp",
      [...Array(game.treatment.nRounds + 1).keys()].map((value) => "NA")
    )
    player.set(
      "confidenceRatings",
      [...Array(game.treatment.nRounds + 1).keys()].map((value) => "NA")
    )
  })

  game.set("treatment", game.treatment)
  const squaresPath = path.join(
    __meteor_bootstrap__.serverDir,
    "../web.browser/app/stimuli/squares"
  )
  const dotsPath = path.join(
    __meteor_bootstrap__.serverDir,
    "../web.browser/app/stimuli/dots"
  )
  console.log(squaresPath)
  console.log(dotsPath)

  const squareFiles = fs.readdirSync(squaresPath)
  const dotFiles = fs.readdirSync(dotsPath)
  const numericalStimFiles = shuffle([...squareFiles, ...dotFiles]).filter(
    (file) => {
      return file.split("_")[0] !== "practice"
    }
  )
  const trueAnswers = numericalStimFiles.map((file) => {
    return parseInt(file.split("_")[1].slice(0, 2))
  })

  console.log(`line#80 true answers: ${trueAnswers}`)
  _.times(game.treatment.nRounds + 1, (i) => {
    let round

    // Select the stimuli for the round EMOTIONS
    if (game.treatment.condition === "emotions") {
      const personList = ["A", "B", "C", "D"]
      // const emotionList = ["sad", "happy", "angry"]
      const emotionList = ["happy", "angry"]
      const emotionAdjectives = {
        sad: "sadness",
        happy: "happiness",
        angry: "anger",
      }

      const emotionRange = {
        sad: [1, 50],
        happy: [51, 100],
        angry: [101, 150],
      }

      const person = choice(personList)
      const emotion = choice(emotionList)
      const emotionAdj = emotionAdjectives[emotion]
      const range = emotionRange[emotion]

      const imgArraySize = _.random(8, 12)

      console.log(`Line #109| imgArraySize: ${imgArraySize}`)

      let mean
      let imgValues
      let imgIndexes
      let imgMean
      if (i === 0) {
        imgIndexes = [...Array(imgArraySize).keys()].map((i) =>
          _.random(range[0], range[1])
        )
        imgValues = imgIndexes.map((i) => i - (range[0] - 1))

        imgMean = Math.round(
          imgValues.reduce((total, item) => (total += item), 0) /
            imgValues.length
        )
      } else {
        mean = trueAnswers[i - 1] / 2
        imgValues = stimuliLookup[mean][imgArraySize]
        console.log(`Line #103| stim values: ${imgValues}`)
        imgIndexes = imgValues.map((val) => val + (range[0] - 1))
        console.log(`Line #103| stim indexes: ${imgIndexes}`)
        imgMean = mean
      }

      const stimuliPaths = imgIndexes.map(
        (i) => "stimuli/faces/" + person + i + ".jpg"
      )

      const arrayStyles = imgValues.map((value) => {
        // calculate size and the positions
        const width = 141 * 0.75
        const height = 181 * 0.75
        return {
          width: `${width}px`,
          height: `${height}px`,
          left: `calc(50% - ${width / 2}px ${
            _.random(0, 1) === 1 ? "+" : "-"
          } ${_.random(0, 20)}px)`,
          top: `calc(50% - ${height / 2}px ${
            _.random(0, 1) === 1 ? "+" : "-"
          } ${_.random(0, 15)}px)`,
        }
      })

      // console.log(`---------estimate object----------`)
      // console.log(estimateDataObject)
      // console.log(`---------selected estimate data----------`)
      // console.log(estimateDataObject[i])

      // Create the round and stages
      round = game.addRound({
        data: {
          roundIndex: i,
          isPractice: i === 0,
          stimConfig: {
            person,
            emotion,
            emotionAdj,
            range,
            imgArraySize,
            imgIndexes,
            imgValues,
            imgMean,
            stimuliPaths,
          },
          arrayStyles,
        },
      })
    }

    if (game.treatment.condition === "numerical") {
      const stimFile =
        i === 0
          ? dotFiles.find((file) => file.split("_")[0] === "practice")
          : numericalStimFiles[i - 1]
      const stimType = stimFile.split("_")[0]
      const stimPath =
        i === 0 ? `stimuli/dots/${stimFile}` : `stimuli/${stimType}/${stimFile}`

      const mean =
        i === 0
          ? parseInt(stimFile.split("_")[1].slice(0, 2))
          : trueAnswers[i - 1]

      const colour =
        stimType === "squares" ? "white" : mean === 24 ? "orange" : "blue"

      console.log(stimPath)
      console.log(stimFile)
      console.log(stimType)
      console.log(mean)

      // Create the round and stages
      round = game.addRound({
        data: {
          roundIndex: i,
          isPractice: i === 0,
          estimateConfig: {
            stimFile,
            stimType,
            stimPath,
            mean,
            colour,
          },
        },
      })
    }

    // Step 1: //   if (game.treatment.condition === "emotions") {
    round.addStage({
      name: "stimulus",
      displayName: "Stimulus",
      durationInSeconds: isDev ? 9999 : 6,
    })

    round.addStage({
      name: "rating",
      displayName: "Rating",
      durationInSeconds: isDev ? 9999 : 15,
    })

    // if (game.treatment.condition === "numerical") {
    //   round.addStage({
    //     name: "estimate",
    //     displayName: "Estimate",
    //     durationInSeconds: isDev ? 9999 : 21,
    //   })
    //}

    // No social stage in the practice NOR in the control
    if (i !== 0 && !game.treatment.control) {
      round.addStage({
        name: "social",
        displayName: "Social",
        durationInSeconds: isDev ? 9999 : 3000, //30
      })
    }

    // Step 2:

    round.addStage({
      name: "stimulus",
      displayName: "Stimulus",
      durationInSeconds: isDev ? 9999 : 6,
    })

    round.addStage({
      name: "rating",
      displayName: "Rating",
      durationInSeconds: isDev ? 9999 : 15,
    })

    // if (game.treatment.condition === "numerical") {
    //   round.addStage({
    //     name: "estimate",
    //     displayName: "Estimate",
    //     durationInSeconds: isDev ? 9999 : 21,
    //   })
    // }

    if (i === 0) {
      // step between the practice and no practice
      round.addStage({
        name: "practiceEnd",
        displayName: "End of Practice Round",
        durationInSeconds: isDev ? 9999 : 40, //40,
      })
    }
  })

  game.set("trueAnswers", trueAnswers)
})
