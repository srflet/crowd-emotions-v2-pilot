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

		return (
			<CenterDevWrapper {...this.props}>
				<div className="container">
					<h2>Feedback and Debrief</h2>
					<p>
						Thank you for completing the study! Below are your scores. Please allow us 10 business days to process your bonus payment.
					</p>
					<div className="feedbackHolder">
						{game.get("trueAnswers").map((trueAnswer, index) => {
							if (index > 0) {
								return (
									<div key={index} className={index === 1 ? "firstRound" : ""}>
										<p>Round {index}</p>
										<p>True Answer: {trueAnswer}</p>
										<p>Your Answer: {ratings[index]}</p>
										<p className="m0">Absolute error: {Math.abs(trueAnswer - ratings[index])}</p>
									</div>
								)
							}
						})}
					</div>
					<p>
						If you have any questions about the study, or the payment. Please feel free to write to the principal investigator Professor Tom Taiyi Yan at tom.taiyi.yan@ucl.ac.uk.
					</p>
				</div>
			</CenterDevWrapper>
		)
	}
}
