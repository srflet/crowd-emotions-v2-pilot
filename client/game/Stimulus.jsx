import React, { Component } from 'react'

export default class Stimulus extends Component {
    render() {
        const { round } = this.props
        return (
            <div>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia, ducimus sunt nam esse est distinctio, praesentium quasi tempora neque laborum nesciunt laboriosam cumque! Deserunt quidem similique ut ipsa neque provident?</p>
                <div className="stimuli-holder">
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
