import Empirica from "meteor/empirica:core"
import { render } from "react-dom"

// Import components
import WarningConsent from "./intro/consent/WarningConsent"
import WaitingConsent from "./intro/consent/WaitingConsent"
import Consent from "./intro/consent/Consent"
import Lobby from "./intro/lobby/Lobby"
import NewPlayer from "./intro/newplayer/NewPlayer"
import ScreenSize from "./intro/ScreenSize"
import Instructions from "./intro/Instructions"
import Comprehension from "./intro/Comprehension"
import Round from "./game/Round"
import ExitSurvey from "./exit/ExitSurvey"
import Thanks from "./exit/Thanks"
import Sorry from "./exit/Sorry"
import WaitingThanks from "./exit/WaitingThanks"

// Take out elements of the header:
// Set the About Component you want to use for the About dialog (optional).
Empirica.about(null)
// Getting rid of the breadcrums (the progress bar):
Empirica.breadcrumb(() => null)
// Get rid of the header, it will be replaced by the dev wrapper than only shows on dev mode
Empirica.header(() => null)

// Set the component for getting the player id (optional)
Empirica.newPlayer(NewPlayer)

// Set the lobby (optional)
Empirica.lobby(Lobby)

// Using isDev to help with quick testing
const isDev = false

if (!isDev) {
  // Set the Consent Component you want to present players (optional).
  Empirica.consent(Consent)

  // Introduction pages to show before they play the game (optional).
  // At this point they have been assigned a treatment. You can return
  // different instruction steps depending on the assigned treatment.
  Empirica.introSteps((game, treatment) => {
    return [ScreenSize, Instructions, Comprehension]
  })
}

// The Round component containing the game UI logic.
// This is where you will be doing the most development.
// See client/game/Round.jsx to learn more.
Empirica.round(Round)

// End of Game pages. These may vary depending on player or game information.
// For example we can show the score of the user, or we can show them a
// different message if they actually could not participate the game (timed
// out), etc.
// The last step will be the last page shown to user and will be shown to the
// user if they come back to the website.
// If you don't return anything, or do not define this function, a default
// exit screen will be shown.
Empirica.exitSteps((game, player) => {
  if (
    !game ||
    (player.exitStatus &&
      player.exitStatus !== "finished" &&
      player.exitReason !== "playerQuit")
  ) {
    return [Sorry]
  }
  return [ExitSurvey, Thanks]
})

// Start the app render tree.
// NB: This must be called after any other Empirica calls (Empirica.round(),
// Empirica.introSteps(), ...).
// It is required and usually does not need changing.
Meteor.startup(() => {
  render(Empirica.routes(), document.getElementById("app"))
})
