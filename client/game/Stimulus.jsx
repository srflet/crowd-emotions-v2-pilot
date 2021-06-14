import React, { Component } from 'react'
import { StageTimeWrapper } from "meteor/empirica:core"

class StimulusBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timed: 0,
            show: false
        };
        this.timer = null;
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const { round, stage, remainingSeconds } = this.props
        const stimConfig = round.get("stimConfig")

        if (remainingSeconds <= 5 && this.timer === null) {
            this.setState({ show: true })

            this.timer = setInterval(() => {
                let timed = this.state.timed + 500

                if (timed >= 1500) {
                    this.setState({ show: false })
                    clearInterval(this.timer)
                } else {
                    this.setState({ timed: timed })
                }

            }, 500);
        }

        return (
            <div>
                <p>Below, we are going to show you faces expressing different degrees of emotion for 1.5 seconds.</p>
                <p>Then we will ask you for the average degree of {stimConfig.emotionAdj} in these faces.</p>
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