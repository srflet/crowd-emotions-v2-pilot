import Empirica from "meteor/empirica:core"
import "./bots.js"
import "./callbacks.js"

const isDev = true

// gameInit is where the structure of a game is defined.
// Just before every game starts, once all the players needed are ready, this
// function is called with the treatment and the list of players.
// You must then add rounds and stages to the game, depending on the treatment
// and the players. You can also get/set initial values on your game, players,
// rounds and stages (with get/set methods), that will be able to use later in
// the game.
Empirica.gameInit(game => {
	game.players.forEach((player, i) => {
		player.set("avatar", `/avatars/jdenticon/${player._id}`)
		player.set("score", 0)
	})

	_.times(game.treatment.nRounds, i => {
		const round = game.addRound({
			data: {
				roundIndex: i,
				isPractice: i === 0
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

		round.addStage({
			name: "social",
			displayName: "Social",
			durationInSeconds: 9999
		})

		if (i !== 0) {
			round.addStage({
				name: "rating",
				displayName: "Rating",
				durationInSeconds: 9999
			})

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
				name: "debrief",
				displayName: "Debrief",
				durationInSeconds: 9999
			})
		}

	})
})
