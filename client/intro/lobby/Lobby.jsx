import React, { Component } from 'react'
import CenterDevWrapper from "../../wrappers/CenterDevWrapper"
import { introInfo } from '../introInfo'

export default class Lobby extends Component {
    render() {
        const { gameLobby } = this.props

        return (
            <CenterDevWrapper {...this.props}>
                <div className="container">
                    <h3 className="title">Lobby</h3>
                    <p className="title"><strong>Players ready (including you): {gameLobby.readyCount + (10 - gameLobby.treatment.playerCount)}/10</strong></p>
                    <p>
                        <strong>We need groups of 10 players for the study to begin.</strong> If 10 players show up in a lobby, then the study will start. Otherwise, you will wait up to {introInfo.timeout}mins in the lobby. If there are less than 10 players by the end of that time, the study will stop. You will be asked to return your participation on Prolific (this has no adverse effect on your Prolific score) and you will be paid £{introInfo.pityPay} for your time.
                    </p>
                </div>
            </CenterDevWrapper>
        )
    }
}
