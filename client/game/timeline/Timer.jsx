import { StageTimeWrapper } from "meteor/empirica:core"
import React from "react"

class timer extends React.Component {
	render() {
		const { remainingSeconds } = this.props

		const classes = ["timer flex-col"]
		if (remainingSeconds <= 5) {
			classes.push("lessThan5")
		} else if (remainingSeconds <= 10) {
			classes.push("lessThan10")
		}

		return (
			<span className="timer">
				{remainingSeconds}
			</span>
		)
	}
}

export default (Timer = StageTimeWrapper(timer))
