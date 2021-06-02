import React, { Component } from 'react'
import { StageTimeWrapper } from "meteor/empirica:core"

class StimulusBuilder extends Component {

    render() {
        const { round, stage, remainingSeconds } = this.props
        const stimConfig = round.get("stimConfig")

        return (
            <div>
                <p>{this.props.remainingSeconds}</p>
                <p>Below, we are going to show you a group of photographs for 1.5 seconds.</p>
                <p>Then we will ask you the average level of {stimConfig.emotionAdj} in these faces.</p>
                <div className={`stimuli-holder ${(remainingSeconds * 1000) > 1500 && "hidden-stimuli"}`}>
                    {round.get("stimConfig").stimuliPaths.map((path, index) => {
                        return (
                            <div key={index} className="stimulus-holder">
                                <img
                                    src={path}
                                    style={round.get("arrayStyles")[index]}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

// Export this awith the stage time wrapper that makes it a timer
export default (Stimulus = StageTimeWrapper(StimulusBuilder));