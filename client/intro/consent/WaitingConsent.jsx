import React, { Component } from 'react'

// Import components
import CenterDevWrapper from "../../wrappers/CenterDevWrapper"
import { isMobile, isFirefox, isChrome } from 'react-device-detect'
import Consent from './Consent'

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

        const { loading, now, timeToStart } = this.props


        if (loading) {
            return (
                <div>Loading...</div>
            )
        }

        console.log(this.props.game)
        let difference = +timeToStart - +new Date(TimeSync.serverTime(null, 1000))
        if (difference > 1) {
            return (
                <div>
                    <h3></h3>
                    <div className="title">
                        <p>The study will start in:</p>
                        <Countdown {...this.props} />
                        <p><i>({timeToStart.toLocaleTimeString()})</i></p>
                        <p><strong>Please make sure to return to this tab just before the timer runs out.</strong></p>
                        <p>You will then be given some instructions before joining other players for the study.</p>
                    </div>
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
    const timeToStart = globalConfigs.timeToStart ?? new Date("2021-06-25T16:00:00Z")

    return {
        loading,
        timeToStart
    };

})(WaitingConsentPage)

class Countdown extends Component {
    state = {
        hours: '00',
        minutes: '00',
        seconds: '00'
    }

    componentDidMount() {
        setInterval(() => {
            let difference = +this.props.timeToStart - +new Date(TimeSync.serverTime(null, 1000))

            let hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
            let minutes = Math.floor((difference / (1000 * 60)) % 60)
            let seconds = Math.floor((difference / (1000)) % 60)
            this.setState({
                hours: hours > 9 ? hours : `0${hours}`,
                minutes: minutes > 9 ? minutes : `0${minutes}`,
                seconds: seconds > 9 ? seconds : `0${seconds}`
            })

        }, 1000)
    }

    render() {
        const { hours, minutes, seconds } = this.state

        return (
            <p style={{ fontSize: "40pt" }}>{`${hours}:${minutes}:${seconds}`}</p>
        )
    }
}