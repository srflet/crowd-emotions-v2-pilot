import React, { Component } from 'react'

// Import components
import CenterDevWrapper from "../../wrappers/CenterDevWrapper"
import { isMobile, isFirefox, isChrome } from 'react-device-detect'
import Consent from './Consent'
import { introInfo } from '../introInfo'

export default class WarningConsent extends Component {
    state = {
        warningIsRead: false
    }

    render() {

        // Only get people with the right setup
        if (!(!isMobile && (isFirefox || isChrome))) {
            return (
                <CenterDevWrapper {...this.props}>
                    <div className="container">
                        Please use a computer and use Firefox or Chrome.
                    </div>
                </CenterDevWrapper>
            )
        }

        if (!this.state.warningIsRead) {
            return (
                <CenterDevWrapper {...this.props}>
                    <div className="container">
                        <div className="warning-consent">
                            <h3 className="title">Important Information</h3>
                            <p><strong>The study lasts {introInfo.time}mins and pays between £{introInfo.flatPay} and £{introInfo.bonusPay} depending on your performance.</strong></p>

                            <p>This study involves groups of 10 participants. You will be given instructions before joining 9 other players in the lobby.</p>
                            <p>
                                <strong>We need groups of 10 players for the study to begin.</strong> If 10 players show up in a lobby, then the study will start. Otherwise, you will wait up to {introInfo.timeout}mins in the lobby. If there are less than 10 players by the end of that time, the study will stop. If the groups are full you will be informed, as they might fill up faster than expected. In both cases, you will be asked to return your participation on Prolific (this has no adverse effect on your Prolific score) and you will be paid £{introInfo.pityPay} for your time.
                            </p>


                            <div className="flex-c">
                                <button
                                    className="main-btn"
                                    onClick={() => this.setState({ warningIsRead: true })}
                                >
                                    Continue to Consent Form
                                </button>
                            </div>

                        </div>
                    </div>
                </CenterDevWrapper>
            )
        }

        return <Consent />
    }
}
