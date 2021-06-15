import React, { Component } from 'react'
import CenterDevWrapper from '../wrappers/CenterDevWrapper'

export default class ScreenSize extends Component {
    render() {
        const { hasPrev, hasNext, onNext, onPrev, game } = this.props

        return (
            <CenterDevWrapper {...this.props}>
                <div className="container">
                    <h2></h2>

                    <p>Please remove every distraction.</p>

                    <p>Make sure your browser is opened in full screen or you will not be able to do the study properly.</p>

                    <br />
                    <div className="flex-c multiple-btns">
                        <button className="main-btn" disabled={!hasPrev} onClick={onPrev}>Previous</button>
                        <button className="main-btn" onClick={onNext}>Next</button>
                    </div>
                </div>
            </CenterDevWrapper>
        )
    }
}
