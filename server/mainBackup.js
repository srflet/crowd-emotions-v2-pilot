// Importing Empirica
import Empirica from "meteor/empirica:core"
import "./bots.js"
import "./callbacks.js"
import { estimateDataObject } from "./constants.js"
import { stimuliLookup } from "../shared/api/constants.js" // Import the configs
import { Configs } from "../shared/api/collectionAdminGlobalConfigs.js"

// Importing helper functions for randomness
import { choice, popChoice, shuffle } from "./helper-functions/random.js"

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
  const trueAnswers = numericalStimFiles.map((file) => {
    return parseInt(file.split("-")[0])
  })

  console.log(`line#71 true answers: ${trueAnswers}`)
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
      const emotion = i % 2 ? emotionList[0] : emotionList[1]
      const emotionAdj = emotionAdjectives[emotion]
      const range = emotionRange[emotion]

      const imgArraySize = _.random(8, 12)

      // console.log(`Line #109| imgArraySize: ${imgArraySize}`)

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
        const left = `calc(50% - ${width / 2}px ${
          _.random(0, 1) === 1 ? "+" : "-"
        } ${_.random(0, 20)}px)`
        const top = `calc(50% - ${height / 2}px ${
          _.random(0, 1) === 1 ? "+" : "-"
        } ${_.random(0, 15)}px)`

        console.log(`\narrayStyles round ${i}: `)
        console.log(
          `{\nwidth: ${width},\nheight: ${height},\nleft: ${left},\ntop: ${top}}`
        )
        return {
          width: `${width}px`,
          height: `${height}px`,
          left: left,
          top: top,
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

      console.log("\n.....round data......")
      console.log(`roundIndex: ${i}`)
      console.log(`isPractice: ${i === 0}`)
      console.log("stimconfig: {")
      console.log(`person: ${person}`)
      console.log(`emotion: ${emotion}`)
      console.log(`emotionAdj: ${emotionAdj}`)
      console.log(`range: ${range}`)
      console.log(`imgArraySize: ${imgArraySize}`)
      console.log(`imgIndexes: ${imgIndexes}`)
      console.log(`imgValues: ${imgValues}`)
      console.log(`imgMean: ${imgMean}`)
      console.log(`stimuliPaths: ${stimuliPaths}`)
      console.log("}")
      console.log(`arrayStyles: ${arrayStyles}`)
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
      durationInSeconds: isDev ? 9999 : 100000,
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
