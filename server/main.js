// Importing Empirica
import Empirica from "meteor/empirica:core"
import "./bots.js"
import "./callbacks.js"

// Import the configs
import { Configs } from "../shared/api/collectionAdminGlobalConfigs.js";

// Importing helper functions for randomness
import { choice, popChoice, shuffle } from './helper-functions/random';

// Setting a variable for whether this is development/testing or not (determines the time set to the stages)
const isDev = false

// Publish the configs
Meteor.publish('admin-global-configs', function publishTasks() {
	return Configs.find({})
})

// When the game starts (intro steps have ended), set up the game
Empirica.gameInit(game => {
	game.players.forEach((player, i) => {
		player.set("avatar", `/avatars/jdenticon/${player._id}`)
		player.set("ratings", [...Array(game.treatment.nRounds + 1).keys()].map(value => "NA"))
	})

	game.set("treatment", game.treatment)

	const trueAnswers = []

	_.times(game.treatment.nRounds + 1, i => {

		// Select the stimuli for the round
		const personList = ["A", "B", "C", "D"]
		// const emotionList = ["sad", "happy", "angry"]
		const emotionList = ["happy", "angry"]
		const emotionAdjectives = {
			sad: "sadness",
			happy: "happiness",
			angry: "anger"
		}

		const emotionRange = {
			sad: [1, 50],
			happy: [51, 100],
			angry: [101, 150]
		}

		const person = choice(personList)
		const emotion = choice(emotionList)
		const emotionAdj = emotionAdjectives[emotion]
		const range = emotionRange[emotion]

		const imgArraySize = _.random(8, 12)
		const imgIndexes = [...Array(imgArraySize).keys()].map(i => _.random(range[0], range[1]))
		const imgValues = imgIndexes.map(i => i - (range[0] - 1))

		const imgMean = Math.round(imgValues.reduce((total, item) => (total += item), 0) / imgValues.length)
		trueAnswers.push(imgMean)

		const stimuliPaths = imgIndexes.map(i => "stimuli/" + person + i + ".jpg")

		const arrayStyles = imgValues.map(value => {
			// calculate size and the positions
			const width = 141 * 0.75
			const height = 181 * 0.75
			return {
				width: `${width}px`,
				height: `${height}px`,
				left: `calc(50% - ${width / 2}px ${_.random(0, 1) === 1 ? "+" : "-"} ${_.random(0, 20)}px)`,
				top: `calc(50% - ${height / 2}px ${_.random(0, 1) === 1 ? "+" : "-"} ${_.random(0, 15)}px)`
			}
		})

		// Create the round and stages
		const round = game.addRound({
			data: {
				roundIndex: i,
				isPractice: i === 0,
				stimConfig: { person, emotion, emotionAdj, range, imgArraySize, imgIndexes, imgValues, imgMean, stimuliPaths },
				arrayStyles
			}
		})

		// Step 1:
		round.addStage({
			name: "stimulus",
			displayName: "Stimulus",
			durationInSeconds: isDev ? 9999 : 5
		})

		round.addStage({
			name: "rating",
			displayName: "Rating",
			durationInSeconds: isDev ? 9999 : 15
		})

		// No social stage in the practice NOR in the control
		if (i !== 0 && game.treatment.condition !== "control") {
			round.addStage({
				name: "social",
				displayName: "Social",
				durationInSeconds: isDev ? 9999 : 15
			})
		}

		// Step 2:
		round.addStage({
			name: "stimulus",
			displayName: "Stimulus",
			durationInSeconds: isDev ? 9999 : 5
		})

		round.addStage({
			name: "rating",
			displayName: "Rating",
			durationInSeconds: isDev ? 9999 : 15
		})

		// No social stage in the practice NOR in the control
		if (i !== 0 && game.treatment.condition !== "control") {
			round.addStage({
				name: "social",
				displayName: "Social",
				durationInSeconds: isDev ? 9999 : 15
			})
		}

		// Step 3 (no more practice):
		round.addStage({
			name: "stimulus",
			displayName: "Stimulus",
			durationInSeconds: isDev ? 9999 : 5
		})

		round.addStage({
			name: "rating",
			displayName: "Rating",
			durationInSeconds: isDev ? 9999 : 15,
			data: {
				isFinalRating: true
			}
		})

		if (i === 0) {

			// step between the practice and no practice
			round.addStage({
				name: "practiceEnd",
				displayName: "End of Practice Round",
				durationInSeconds: isDev ? 9999 : 15,
			})
		}

		if (i === 15) {
			// a break every 10 stages
			round.addStage({
				name: "break",
				displayName: "Break",
				durationInSeconds: isDev ? 9999 : 180,
			})
		}

	})

	game.set("trueAnswers", trueAnswers)
})
