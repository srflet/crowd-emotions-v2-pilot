// Importing Empirica
import Empirica from "meteor/empirica:core"
import "./bots.js"
import "./callbacks.js"
import { estimateDataObject } from "./constants.js"
import { stimuliLookup } from "../shared/api/constants.js" // Import the configs
import { Configs } from "../shared/api/collectionAdminGlobalConfigs.js"
import { emotionsConfigs } from "./constants.js"

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
  // const squaresPath = path.join(
  //   __meteor_bootstrap__.serverDir,
  //   "../web.browser/app/stimuli/squares"
  // )
  // const dotsPath = path.join(
  //   __meteor_bootstrap__.serverDir,
  //   "../web.browser/app/stimuli/dots"
  // )

  const numericPath = path.join(
    __meteor_bootstrap__.serverDir,
    "../web.browser/app/stimuli/new"
  )

  // const squareFiles = fs.readdirSync(squaresPath)
  // const dotFiles = fs.readdirSync(dotsPath)

  const newStimFiles = fs.readdirSync(numericPath)
  console.log("+++++++++ Files are:", newStimFiles)
  const numericalStimFiles = shuffle([...newStimFiles]).filter((file) => {
    return file.split("-")[0] !== "test"
  })

  let trueAnswers = []

  if (game.treatment.condition === "numerical") {
    trueAnswers = numericalStimFiles.map((file) => {
      return parseInt(file.split("-")[0])
    })
  }

  const practiceConfigs = emotionsConfigs[0]

  const gameConfigsArray = shuffle([
    ...emotionsConfigs.filter((_config) => !_config.isPractice),
  ])

  console.log(`practiceConfigs`, practiceConfigs)

  console.log("gameConfigsArray", gameConfigsArray)
  console.log(`length of: ${gameConfigsArray.length}`)

  // gameConfigsArray = shuffle([...gameConfigsArray])

  console.log(`line#71 true answers: ${trueAnswers}`)
  _.times(game.treatment.nRounds + 1, (i) => {
    // Select the stimuli for the round EMOTIONS
    if (game.treatment.condition === "emotions") {
      // console.log(`---------estimate object----------`)
      // console.log(estimateDataObject)
      // console.log(`---------selected estimate data----------`)
      // console.log(estimateDataObject[i])

      // Create the round and stages
      if (i === 0) {
        round = game.addRound({
          data: {
            roundIndex: i,
            ...practiceConfigs,
          },
        })
      } else {
        trueAnswers.push(gameConfigsArray[i - 1].stimConfig.imgMean * 2)
        round = game.addRound({
          data: {
            roundIndex: i,
            ...gameConfigsArray[i - 1],
          },
        })
      }
    }

    if (game.treatment.condition === "numerical") {
      const stimFile =
        i === 0
          ? newStimFiles.find((file) => file.split("-")[0] === "test")
          : numericalStimFiles[i - 1]
      console.log(stimFile.split("-"))
      const stimType =
        i === 0
          ? stimFile.split("-")[2].split(".")[0]
          : stimFile.split("-")[1].split(".")[0]
      const stimPath = `stimuli/new/${stimFile}`

      const mean =
        i === 0 ? parseInt(stimFile.split("-")[1]) : trueAnswers[i - 1]

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
      durationInSeconds: isDev ? 9999 : 15, //30
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
        durationInSeconds: isDev ? 9999 : 20, //20
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
      durationInSeconds: isDev ? 9999 : 15, //15
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
        durationInSeconds: isDev ? 9999 : 30, //40,
      })
    }
  })

  game.set("trueAnswers", trueAnswers)
})
