import React from "react"
import { ConsentButton } from "meteor/empirica:core"
import CenterDevWrapper from "../../wrappers/CenterDevWrapper"

export default class Consent extends React.Component {
	render() {
		return (
			<CenterDevWrapper {...this.props}>
				<div className="container">
					<h2 className="title">Informed Consent</h2>
					<p>
						The purpose of this research is to examine emotional recognition. We kindly ask you to participate in an emotion recognition game where you estimate the emotionality of a group of images of people. The entire study should take no more than 20 mins. The principal investigator of this study is Professor Tom Taiyi Yan at University College London, School of Management, and Professor Amit Goldberg from Harvard Business School.
					</p>

					<h3>Data Security</h3>
					<p>
						Your data are being securely held and your responses to this survey remain strictly private. No identifying information about you (or your answers to specific questions we ask you) will ever be freely shared or presented in the results of this research.
					</p>

					<h3>Benefits</h3>
					<p>
						You will receive XX GBP as base compensation for participation. There is a bonus component up to 100% of the base pay, based on your performance in the game (i.e., how accurately you are able to identify emotions).
					</p>
					<p>
						A further benefit of participating in this research is that you are contributing to the advancement of social science.
					</p>

					<h3>Confidentiality</h3>
					<p>
						Any identifying information will be replaced with a random number in our data file. The data file is password-protected and accessible only by the immediate research team. No identifying information will ever be presented in the results of this research.
					</p>

					<h3>Dissemination of Results</h3>
					<p>
						No information that could identify your specific responses in this study will be presented in any discussions, publications or presentations that result from this research.
					</p>

					<h3>Withdrawing from the Study</h3>
					<p>
						You are free to withdraw at any time without penalty or the loss of benefits to which you would otherwise be entitled.
					</p>

					<h3>Possible Risks</h3>
					<p>
						There are no foreseeable risks beyond those present in routine daily life anticipated in this study.
					</p>

					<h3>Statement of Consent</h3>
					<p>
						By clicking on the CONTINUE button below, you are providing your informed consent to participate in the current research. As always, you are free to discontinue your participation at any time without penalty or the loss of benefits to which you are otherwise entitled.
					</p>
					<p>
						If you have any questions about this research, please feel free to contact the lead investigator, Professor Thomas Taiyi Yan, tom.taiyi.yan@ucl.ac.uk.
					</p>

					<br />
					<div className="flex-c"><ConsentButton text="CONTINUE" /></div>
				</div>
			</CenterDevWrapper>
		)
	}
}
