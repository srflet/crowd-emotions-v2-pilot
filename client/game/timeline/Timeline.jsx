import React, { Component } from 'react'
import Timer from "./Timer"

export default class Timeline extends Component {
    render() {
        const { round, stage, player, game } = this.props

        return (
            <div className="timeline">
                <p className="title"><strong>{round.get("isPractice") ? `Practice Round` : `Round ${round.get("roundIndex")}`}</strong></p>
                {round.stages.map((s, index) => {
                    return <p key={index} className={`${stage._id === s._id ? "current" : "notcurrent"}-stage`}>{s.displayName}</p>
                })}
                <div className="my-timer">
                    <p>Timer</p>
                    <Timer {...this.props} />
                </div>
            </div>
        )
    }
}