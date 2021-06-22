import React, { Component } from 'react'
import { StageTimeWrapper } from "meteor/empirica:core"

// Allows you to sync time with the server
import { TimeSync } from "meteor/mizzao:timesync";

// Trying to build an accurate timer based on: 
// https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript

class StimulusBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timed: 0,
            show: false
        };
        this.expectedTimeout = null;
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const { round, stage, remainingSeconds } = this.props
        const stimConfig = round.get("stimConfig")

        const currentTime = Number(new Date(TimeSync.serverTime(null, 100)))

        if (remainingSeconds <= 3 && this.expectedTimeout === null) {
            this.setState({ show: true })
            this.expectedTimeout = Number(new Date(TimeSync.serverTime(null, 100))) + 1500
        }

        if (currentTime >= this.expectedTimeout && this.expectedTimeout !== null && this.state.show) {
            this.setState({ show: false })
        }

        return (
            <div>
                <p className="m0 title">
                    We will ask you for the average degree of <strong>{stimConfig.emotionAdj}</strong> in these faces.
                </p>
                <div className={`stimuli-holder ${this.state.show && "hidden-stimuli"}`}>
                    <div className="fixation-cross">
                        +
                    </div>
                </div>
                <div className={`stimuli-holder ${!this.state.show && "hidden-stimuli"}`}>
                    {stimConfig.stimuliPaths.map((path, index) => {
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