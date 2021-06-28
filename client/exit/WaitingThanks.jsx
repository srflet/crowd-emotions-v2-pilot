import React, { Component } from 'react'
import CenterDevWrapper from "../wrappers/CenterDevWrapper"

// Import the config from the db
import { withTracker } from "meteor/react-meteor-data"
import { Configs } from '../../shared/api/collectionAdminGlobalConfigs'

export default class WaitingThanks extends Component {
    static stepName = "Thanks"

    render() {
        return (
            <CenterDevWrapper {...this.props} >
                {/* Load the db data which loads the page contents */}
                <WaitingThanksContents {...this.props} />
            </CenterDevWrapper>
        )
    }
}

class WaitingThanksPage extends Component {

    render() {
        const { player, game, prolificCode, loading } = this.props

        if (loading) {
            return (
                <div>Loading...</div>
            )
        }

        if (!player.get("finishedStudy")) {
            player.set("finishedStudy", true)
        }

        const ratings = player.get("ratings")
        const trueAnswers = game.get("trueAnswers")

        const totalError = trueAnswers
            .map((trueAnswer, index) => {
                return Math.abs(trueAnswer - ratings[index])
            })
            .filter(val => !isNaN(val))
            .reduce((total, item) => (total += item), 0)

        const averageError = (totalError / trueAnswers.filter((trueAnswer, index) => ratings[index] !== "NA").length).toFixed(2)

        return (
            <CenterDevWrapper {...this.props}>
                <div className="container">
                    <h2>Feedback and Debrief</h2>
                    <p>
                        Thank you for completing the study! Below are your scores. Please allow us 10 business days to process your bonus payment.
                    </p>

                    <br />
                    <h3>Feedback about your performance</h3>
                    <p>Your average absolute error was {averageError}, the lower the better.</p>
                    <p>Here is a breakdown per round:</p>
                    <div className="feedbackHolder">
                        {trueAnswers.map((trueAnswer, index) => {
                            if (index > 0) {
                                return (
                                    <div key={index} className={(index - 1) % 5 === 0 ? "firstRound" : ""}>
                                        <p><u>Round {index}</u></p>
                                        <p>True Answer: {trueAnswer}</p>
                                        <p>Your Answer: {ratings[index]}</p>
                                        <p>Absolute error: {Math.abs(trueAnswer - ratings[index])}</p>
                                    </div>
                                )
                            }
                        })}
                    </div>

                    <br />
                    <h3>Completing this study</h3>
                    <p>
                        If you have any questions about the study, or the payment. Please feel free to write to the principal investigator Professor Tom Taiyi Yan at tom.taiyi.yan@ucl.ac.uk.
                    </p>
                    <br />
                    {prolificCode &&
                        <p className="flex-c">
                            <button className="main-btn" onClick={() => { window.location = `https://app.prolific.co/submissions/complete?cc=${prolificCode}` }}>
                                Complete study on Prolific
                            </button>
                        </p>
                    }

                </div>
            </CenterDevWrapper>
        )
    }
}

WaitingThanksContents = withTracker(rest => {

    // Suscribe to collection information, and return nothing as long as it is loading
    const loading = !Meteor.subscribe("admin-global-configs").ready()
    if (loading) {
        return {
            loading
        }
    }

    // Get the globalConfigs collection
    const globalConfigs = Configs.find({}).fetch()[0] ?? {}
    const prolificCode = globalConfigs.prolificCode

    return {
        loading,
        prolificCode
    }

})(WaitingThanksPage)
