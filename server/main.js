// Importing Empirica
import Empirica from "meteor/empirica:core"
import "./bots.js"
import "./callbacks.js"

// Importing helper functions for randomness
import { choice, popChoice, shuffle } from './helper-functions/random';

// Setting a variable for whether this is development/testing or not (determines the time set to the stages)
const isDev = true

// When the game starts (intro steps have ended), set up the game
Empirica.gameInit(game => {
	game.players.forEach((player, i) => {
		player.set("avatar", `/avatars/jdenticon/${player._id}`)
		player.set("ratings", [...Array(game.treatment.nRounds + 1).keys()].map(value => "NA"))
	})

	_.times(game.treatment.nRounds + 1, i => {

		// Select the stimuli for the round
		const personList = ["A", "B", "C", "D"]
		const emotionList = ["sad", "happy", "angry"]

		const emotionRange = {
			sad: [1, 50],
			happy: [51, 100],
			angry: [101, 150]
		}

		const person = choice(personList)
		const emotion = choice(emotionList)
		const range = emotionRange[emotion]

		const imgArraySize = _.random(1, 12)
		const imgIndexes = [...Array(imgArraySize).keys()].map(i => _.random(range[0], range[1]))
		const imgValues = imgIndexes.map(i => i - range[0])

		const stimuliPaths = imgIndexes.map(i => "stimuli/" + person + i + ".jpg")

		// Create the round and stages
		const round = game.addRound({
			data: {
				roundIndex: i,
				isPractice: i === 0,
				stimConfig: { person, emotion, range, imgArraySize, imgIndexes, imgValues, stimuliPaths }
			}
		})

		round.addStage({
			name: "stimulus",
			displayName: "Stimulus",
			durationInSeconds: isDev ? 9999 : 1.8
		})

		round.addStage({
			name: "rating",
			displayName: "Rating",
			durationInSeconds: 9999
		})

		if (i !== 0) {
			round.addStage({
				name: "social",
				displayName: "Social",
				durationInSeconds: 9999
			})
		}


		round.addStage({
			name: "rating",
			displayName: "Rating",
			durationInSeconds: 9999
		})

		if (i !== 0) {
			round.addStage({
				name: "social",
				displayName: "Social",
				durationInSeconds: 9999
			})

			round.addStage({
				name: "rating",
				displayName: "Rating",
				durationInSeconds: 9999
			})

			round.addStage({
				name: "feedback",
				displayName: "Feedback",
				durationInSeconds: 9999
			})
		}

	})
})
