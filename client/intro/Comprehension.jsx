import React, { Component } from 'react'
import CenterDevWrapper from '../wrappers/CenterDevWrapper'

export default class Comprehension extends Component {
    state = {
        showError: false
    }

    handleSubmit = e => {
        e.preventDefault()

        const elements = Object.keys(e.currentTarget).map(key => e.currentTarget[key])
        const radios = elements.filter(elem => elem.type === "radio")

        const isEvaluateTrue = radios.filter(radio => radio.name === "evaluate" && radio.checked && radio.value === "true").length === 1
        const isTimesTrue = radios.filter(radio => radio.name === "times" && radio.checked && radio.value === "true").length === 1

        if (isEvaluateTrue && isTimesTrue) {
            this.props.onNext()
        } else {
            this.setState({ showError: true })
        }
    }

    render() {
        const { hasPrev, hasNext, onNext, onPrev, game } = this.props

        return (
            <CenterDevWrapper {...this.props}>
                <div className="container">
                    <h2>Comprehension Check</h2>

                    <form onSubmit={this.handleSubmit}>
                        <p>In this study, what are you going to evaluate?</p>
                        <div>
                            <p>
                                <label className="my-radio">
                                    <input type="radio" name="evaluate" value="false" /> The number of faces in a group of faces
                                </label>
                            </p>
                            <p>
                                <label className="my-radio">
                                    <input type="radio" name="evaluate" value="true" /> The average emotion in a group of faces
                                </label>
                            </p>
                            <p>
                                <label className="my-radio">
                                    <input type="radio" name="evaluate" value="false" /> The ethnicity of faces in a group of faces
                                </label>
                            </p>
                        </div>

                        <br />

                        <p>How many times will you see each group of faces and give your estimate?</p>
                        <div>
                            <p>
                                <label className="my-radio">
                                    <input type="radio" name="times" value="false" /> 1
                                </label>
                            </p>
                            <p>
                                <label className="my-radio">
                                    <input type="radio" name="times" value="false" /> 2
                                </label>
                            </p>
                            <p>
                                <label className="my-radio">
                                    <input type="radio" name="times" value="true" /> 3
                                </label>
                            </p>
                        </div>
                        <br />

                        {this.state.showError &&
                            <p className="error-msg">
                                Incorrect. Please provide the correct answers. You can reread the instructions if you need to.
                            </p>
                        }

                        <br />
                        <div className="flex-c multiple-btns">
                            <button className="main-btn" disabled={!hasPrev} onClick={onPrev}>Previous</button>
                            <button className="main-btn" type="submit">Submit and start the practice</button>
                        </div>
                    </form>
                </div>
            </CenterDevWrapper>
        )
    }
}
