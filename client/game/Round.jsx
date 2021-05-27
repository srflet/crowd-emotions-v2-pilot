import React from "react"
import CenterDevWrapper from "../wrappers/CenterDevWrapper.jsx"
import Stimulus from "./Stimulus.jsx"
import Rating from "./Rating.jsx"
import Social from "./Social.jsx"
import Feedback from "./Feedback.jsx"

export default class Round extends React.Component {

	renderStage = () => {
		const { stage } = this.props

		if (stage.name === "stimulus") {
			return <Stimulus {...this.props} />
		}

		if (stage.name === "rating") {
			return <Rating {...this.props} />
		}

		if (stage.name === "social") {
			return <Social {...this.props} />
		}

		if (stage.name === "feedback") {
			return <Feedback {...this.props} />
		}
	}

	render() {
		const { round, stage, player, game } = this.props

		return (
			<CenterDevWrapper {...this.props}>
				<div className="container">
					<h3 className="title">{round.get("isPractice") ? `Practice Round` : `Round ${round.get("roundIndex")}`}: {stage.displayName}</h3>
					{this.renderStage()}
				</div>
			</CenterDevWrapper>
		)
	}
}
