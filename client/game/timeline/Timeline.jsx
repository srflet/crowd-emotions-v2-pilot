import React, { Component } from 'react'
import Timer from "./Timer"

export default class Timeline extends Component {
    render() {
        const { round, stage, player, game } = this.props

        let ratingCount = -1
        const ratingDescriptors = ["1st", "2nd", "3rd"]

        return (
            <div className="timeline">
                <p className="title"><strong>{round.get("isPractice") ? `Practice Round` : `Round ${round.get("roundIndex")}/${game.treatment.nRounds}`}</strong></p>
                {round.stages.map((s, index) => {
                    if (s.name === "rating") { ratingCount++ }

                    return <p key={index} className={`${stage._id === s._id ? "current" : "notcurrent"}-stage`}>{s.name === "rating" && ratingDescriptors[ratingCount] + " "}{s.displayName}</p>
                })}
                <div className="my-timer">
                    <p>Timer</p>
                    <Timer {...this.props} />
                </div>
            </div>
        )
    }
}