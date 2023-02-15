import React from "react"
import { ConsentButton } from "meteor/empirica:core"
import CenterDevWrapper from "../../wrappers/CenterDevWrapper"
import { isMobile, isFirefox, isChrome } from 'react-device-detect'
import { introInfo } from "../introInfo"

export default class Consent extends React.Component {
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

		const { time, flatPay, bonusPay } = introInfo

		return (
			<CenterDevWrapper {...this.props}>
				<div className="container">
					<h2 className="title">Informed Consent</h2>
					<p>A study by Professor Tom Taiyi Yan at University College London, School of Management, and Professor Amit Goldberg from Harvard Business School.</p>

					<h3>Purpose of the Study</h3>
					<p>
						The purpose of this research is to examine emotional recognition.
					</p>

					<h3>Why have I been invited to participate?</h3>
					<p>
						We are inviting you to participate in this study because you are at least 18 years old, speak English, and able to give informed consent.
					</p>

					<h3>Do I have to participate?</h3>
					<p>
						Participation in this study is entirely voluntary. You may withdraw participation at any time for any reason without adverse effect.
					</p>

					<h3>What will happen to me if I take part?</h3>
					<p>
						We kindly ask you to participate in a visual search study where you try to remember as much visual information as you possibly can in a short period of time. The entire study should take about {time} mins, and you will receive both a base pay and a performance-based compensation. 
					</p>

					<h3>What are the possible disadvantages and risks of taking part?</h3>
					<p>
						There are no risks or discomforts associated with participating in this research study.
					</p>

					<h3>What are the possible benefits of taking part?</h3>
					<p>
						You will be compensated for you time. You will receive a base payment of XXX£{flatPay}XXX for completing the study and you may obtain a bonus based on your performance. Otherwise, there are no other direct benefits to you from participating in this research. Some potential benefits include learning more about research. We hope that, in the future, other people might benefit from this study through improved understanding of workplace interactions.
					</p>

					<h3>What if something goes wrong?</h3>
					<p>
						If you experience any issues with the survey or anything else occurs that you would like to notify the researcher about, please contact the principal researcher at tom.yan@ucl.ac.uk
					</p>

					<h3>Will my taking part in this study be kept confidential?</h3>
					<p>
						Your responses will be fully anonymized and safely stored to protect your confidentiality. No one will be able to identify you based on the responses you provide.
						Your Prolific ID will be kept securely and will be deleted from the data once compensation has been provided. The Prolific IDs will be replaced by randomly generated IDs to guarantee anonymity.
					</p>

					<h3>What will happen to the results of this research project?</h3>
					<p>
						Once the data is anonymised and analysed, it might be reported in academic publications or made openly available for other researchers on platforms such as GitHub or OSF.
					</p>

					<h3>Local Data Protection Privacy Notice</h3>
					<p>
						All collected data will be anonymized. If you have any questions or concerns about the use of data in research projects at University College London (UCL), the UCL Data Protection Officer can be contacted at data-protection@ucl.ac.uk. More information can be found at <a target="_blank" href="https://www.ucl.ac.uk/legal-services/privacy/ucl-general-research-participant-privacy-notice">https://www.ucl.ac.uk/legal-services/privacy/ucl-general-research-participant-privacy-notice</a>.
					</p>

					<h3>Statement of Consent</h3>
					<p>
						By clicking on the CONTINUE button below, you are providing your informed consent to participate in the current research.
					</p>
					<p>
						If you have any questions about this research, please feel free to contact the lead investigator, Professor Thomas Taiyi Yan, tom.yan@ucl.ac.uk.
					</p>

					<br />
					<div className="flex-c"><ConsentButton text="CONTINUE" /></div>
				</div>
			</CenterDevWrapper>
		)
	}
}
