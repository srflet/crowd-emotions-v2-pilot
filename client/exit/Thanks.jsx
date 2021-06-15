import React from "react"
import CenterDevWrapper from "../wrappers/CenterDevWrapper"

export default class Thanks extends React.Component {
	static stepName = "Thanks"

	render() {
		const { player, game } = this.props
		if (!player.get("finishedStudy")) {
			player.set("finishedStudy", true)
		}

		const ratings = player.get("ratings")
		const trueAnswers = game.get("trueAnswers")

		const totalError = trueAnswers
			.map((trueAnswer, index) => {
				return Math.abs(trueAnswer - ratings[index])
			})
			.filter(val => !isNaN(val))
			.reduce((total, item) => (total += item), 0)

		const averageError = (totalError / trueAnswers.filter((trueAnswer, index) => ratings[index] !== "NA").length).toFixed(2)

		return (
			<CenterDevWrapper {...this.props}>
				<div className="container">
					<h2>Feedback and Debrief</h2>
					<p>
						Thank you for completing the study! Below are your scores. Please allow us 10 business days to process your bonus payment.
					</p>

					<br />
					<h3>Feedback about your performance</h3>
					<p>Your average absolute error was {averageError}, the lower the better.</p>
					<p>Here is a breakdown per round:</p>
					<div className="feedbackHolder">
						{trueAnswers.map((trueAnswer, index) => {
							if (index > 0) {
								return (
									<div key={index} className={(index - 1) % 5 === 0 ? "firstRound" : ""}>
										<p><u>Round {index}</u></p>
										<p>True Answer: {trueAnswer}</p>
										<p>Your Answer: {ratings[index]}</p>
										<p>Absolute error: {Math.abs(trueAnswer - ratings[index])}</p>
									</div>
								)
							}
						})}
					</div>

					<br />
					<h3>Completing this study</h3>
					<p>
						If you have any questions about the study, or the payment. Please feel free to write to the principal investigator Professor Tom Taiyi Yan at tom.taiyi.yan@ucl.ac.uk.
					</p>
					<br />
					<p className="flex-c">
						<button className="main-btn" onClick={() => { window.location = "https://app.prolific.co/submissions/complete?cc=19B4F87E" }}>
							Complete study on Prolific
						</button>
					</p>
				</div>
			</CenterDevWrapper>
		)
	}
}
