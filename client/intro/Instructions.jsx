import React, { Component } from 'react'
import CenterDevWrapper from '../wrappers/CenterDevWrapper'

export default class Instructions extends Component {
    render() {
        const { hasPrev, hasNext, onNext, onPrev, game } = this.props

        return (
            <CenterDevWrapper {...this.props}>
                <div className="container">
                    <h2>Instructions</h2>

                    <p>
                        Welcome to our study! Today, we are going to ask you to evaluate emotions of people’s faces. Below is a summary of the study’s procedure. Please read this carefully.
                    </p>

                    <ol className="instructions-list">
                        <li>
                            On the screen, you will briefly see a group of faces. These faces are of the same person, but with different emotions. For instance, in the example below, some faces are angrier than others.
                        </li>
                        <div className="instructions-image"><img src="instructions/instructions1.png" /></div>
                        <li>
                            You will evaluate the AVERAGE EMOTION of this group of faces. For the example above, we will ask you “what is the average degree of anger in this group of faces?”
                        </li>
                        <li>
                            To respond, you will have a slider where you can indicate your response on a scale of 1 (neutral) to 50 (very angry).
                        </li>
                        <li>
                            We will show you this group of faces two more times where you can also revise your answers two more times.
                        </li>
                        <li>
                            Then we will move onto the next group of faces. There will be a practice round and 30 normal rounds {game.treatment.nRounds}. You will have the opportunity to take break in the middle of the study.
                        </li>
                    </ol>

                    {game.treatment.playerCount > 1 &&
                        <div>
                            <p><strong>You will be paired with {game.treatment.playerCount} other players for this task.</strong></p>
                            <p>This means you will be going through the rounds at the same pace as other players.</p>
                            {game.treatment.condition === "control"
                                ? <p>However, you will not directly interact with the other players</p>
                                : <p>In between ratings, you will have a 'social' stage where you will see the ratings from the other players as well as an average of their ratings.</p>
                            }
                        </div>
                    }

                    <br />
                    <div className="flex-c multiple-btns">
                        <button className="main-btn" disabled={!hasPrev} onClick={onPrev}>Previous</button>
                        <button className="main-btn" onClick={onNext}>Next</button>
                    </div>
                </div>
            </CenterDevWrapper>
        )
    }
}
