import React, { Component } from 'react'
import CenterDevWrapper from "../../wrappers/CenterDevWrapper"

export default class Lobby extends Component {
    render() {
        const { gameLobby } = this.props

        return (
            <CenterDevWrapper {...this.props}>
                <div className="container">
                    <h3 className="title">Lobby</h3>
                    <p className="title"><strong>Players ready (including you): {gameLobby.readyCount}/{gameLobby.treatment.playerCount}</strong></p>
                    <p><u>If after 3 minutes there aren't enough players to create a whole group,</u> the study will be cancelled. You won't have to complete the study. We will pay you £0.10 for your time. We will ask you to return your participation on Prolific (this has no adverse effects for you).</p>
                </div>
            </CenterDevWrapper>
        )
    }
}
