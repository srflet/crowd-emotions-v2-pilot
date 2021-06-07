import React, { Component } from 'react'
import CenterDevWrapper from "../wrappers/CenterDevWrapper.jsx"
import Stimulus from "./Stimulus.jsx"
import Rating from "./Rating.jsx"
import Social from "./Social.jsx"
import Timeline from "./timeline/Timeline"
import PracticeEnd from './PracticeEnd.jsx'

export default class Round extends Component {

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

		return <PracticeEnd {...this.props} />
	}

	render() {
		const { round, stage, player, game } = this.props

		return (
			<CenterDevWrapper {...this.props}>
				<div className="round-holder">
					<Timeline {...this.props} />
					<div className="container">
						{this.renderStage()}
					</div>
				</div>
			</CenterDevWrapper>
		)
	}
}