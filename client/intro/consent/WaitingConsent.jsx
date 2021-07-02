import React, { Component } from 'react'

// Import components
import CenterDevWrapper from "../../wrappers/CenterDevWrapper"
import { isMobile, isFirefox, isChrome } from 'react-device-detect'
import Consent from './Consent'
import { introInfo } from '../introInfo'

// Import the config from the db
import { withTracker } from "meteor/react-meteor-data"
import { Configs } from '../../../shared/api/collectionAdminGlobalConfigs'

// Handles all the timing stuff
import { TimeSync } from "meteor/mizzao:timesync"

export default class WaitingConsent extends Component {
    render() {

        if (!(!isMobile && (isFirefox || isChrome))) {
            return (
                <CenterDevWrapper {...this.props}>
                    <div className="container">
                        Please use a computer and use Firefox or Chrome.
                    </div>
                </CenterDevWrapper>
            )
        }

        return (
            <CenterDevWrapper {...this.props} >
                {/* Load the db data which loads the page contents */}
                <WaitingConsentPageContents {...this.props} />
            </CenterDevWrapper>
        )
    }
}


class WaitingConsentPage extends Component {

    render() {
        const { loading, now, timeToStart, prolificCode } = this.props

        if (loading) {
            return (
                <div>Loading...</div>
            )
        }

        // let difference = +timeToStart - +new Date(TimeSync.serverTime(null, 1000))
        let difference = +timeToStart - +now

        // If waiting for the time, show the countdown and instructions
        if (difference > 1) {
            return (
                <div>
                    <h3></h3>
                    <div className="title">
                        <p>The study will start in:</p>
                        <Countdown {...this.props} />
                        <p><i>A bell will ring 2 minutes, 1 minute, and 10 seconds before the start</i></p>

                        <fieldset>
                            <legend>Study Information</legend>
                            <p><strong>Please make sure to return to this tab at the end of the timer. The study will start at exactly {timeToStart.toLocaleTimeString()}.</strong></p>
                            <p>This study involves groups of 10 participants.</p>
                            <p>You will be given instructions before joining 9 other players in the lobby.</p>
                            <p>The study lasts {introInfo.time}mins and pays between £{introInfo.flatPay} and £{introInfo.bonusPay} depending on your performance.</p>
                        </fieldset>

                        {prolificCode &&
                            <fieldset>
                                <legend>Prolific Information</legend>
                                <p>You can enter this code in the study so that you can do other studies before this one starts: {prolificCode}</p>
                                <p><strong>If you do not complete this study, we will ask you to return your participation (this has no adverse effect on Prolific status).</strong></p>
                                <p>If you do not return your participation we will have to reject your participation.</p>
                                <p>If there aren't enough players to form a group, you will not have to complete the study. We will pay you £0.10 for your time, but you will still have to return your study.</p>
                            </fieldset>
                        }


                    </div>
                </div>

            )
        }

        // If X minutes after the time, say it is too late
        if ((difference / 1000) < -1800) {
            return (
                <div>
                    <p><strong>Thank you for coming. The experiment already started.</strong></p>
                    {prolificCode &&
                        <p>Please return your participation on Prolific (this has no adverse effects on your Prolific rating).</p>
                    }
                </div>
            )
        }

        return <Consent {...this.props} />
    }
}

WaitingConsentPageContents = withTracker(rest => {

    // Suscribe to collection information, and return nothing as long as it is loading
    const loading = !Meteor.subscribe("admin-global-configs").ready()
    if (loading) {
        return {
            loading
        }
    }

    // Get the globalConfigs collection
    const globalConfigs = Configs.find({}).fetch()[0] ?? {}
    const timeToStart = new Date(globalConfigs.timeToStart)
    // const timeToStart = new Date("2021-06-28T13:10:00Z")
    const prolificCode = globalConfigs.prolificCode

    // Get time now (makes sur the whole process is synced)
    const now = new Date(TimeSync.serverTime(null, 1000))

    return {
        loading,
        timeToStart,
        now,
        prolificCode
    };

})(WaitingConsentPage)

class Countdown extends Component {
    state = {
        hours: '00',
        minutes: '00',
        seconds: '00'
    }

    // Prepare a notification sound 
    notificationSound = new Audio("sounds/notification.mp3")

    componentDidMount() {
        setInterval(() => {
            let difference = +this.props.timeToStart - +new Date(TimeSync.serverTime(null, 1000))

            let hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
            let minutes = Math.floor((difference / (1000 * 60)) % 60)
            let seconds = Math.floor((difference / (1000)) % 60)

            // Make sound at 2 minutes
            if ((difference / 1000) < 120 && (difference / 1000) > 119) {
                this.notificationSound.play()
            }

            // Make sound at 1 minute
            if ((difference / 1000) < 60 && (difference / 1000) > 59) {
                this.notificationSound.play()
            }

            // Make sound for the last 10 seconds
            if ((difference / 1000) < 11 && (difference / 1000) > 0) {
                this.notificationSound.play()
            }

            this.setState({
                hours: hours > 9 ? hours : `0${hours}`,
                minutes: minutes > 9 ? minutes : `0${minutes}`,
                seconds: seconds > 9 ? seconds : `0${seconds}`
            })

        }, 1000)
    }

    render() {
        const { hours, minutes, seconds } = this.state

        const countdownStyle = { fontSize: "40pt" }
        countdownStyle.color = hours === "00" && minutes === "00" ? "red" : "black"

        return (
            <p style={countdownStyle}>{`${hours}:${minutes}:${seconds}`}</p>
        )
    }
}