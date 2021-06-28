import React, { Component } from 'react'

export default class PracticeEnd extends Component {
    render() {
        const { player, game } = this.props
        return (
            <div>
                <p>
                    This is the end of the practice round. Now you will do the actual study.
                </p>
                <p><strong><u>Remember, the more accurate you are, the higher your bonus (up to 100% of your base pay)!</u></strong></p>

                {game.treatment.playerCount > 1 &&
                    <div>
                        <p><strong>You are paired with {game.treatment.playerCount - 1} other players for this task.</strong></p>
                        <p>This means you will be going through the rounds at the same pace as other players.</p>
                        {game.treatment.condition !== "control" &&
                            <div>
                                <p>From now on, in between ratings, you will have a 'social' stage where you will see the ratings from the other players (as a morphed face) and an average of their ratings (a morphed face based on the average rating).</p>
                                <p>For example:</p>
                                <div className="instructions-image"><img src="instructions/instructions2.png" width="75%" /></div>
                            </div>
                        }
                    </div>
                }
                {
                    player.stage.submitted
                        ? <div className="title waiting-msg">Waiting{game.treatment.playerCount > 1 && " for the other players"}...</div>
                        : <div className="flex-c"><button className="main-btn" onClick={() => player.stage.submit()}>Continue</button></div>
                }
            </div>
        )
    }
}
