import React, { Component } from 'react'

export default class BinaryChoice extends Component {

    handleChangeBinary = e => {
        const { player } = this.props
        player.stage.set("binaryChoice", e.currentTarget.value)
    }

    render() {
        const { stimConfig } = this.props


        return (
            <>
                <div className="binary-choice-holder">
                    <p className="title"><strong>If you had to choose, which of the two emotions would you choose to describe the face you created?</strong></p>
                    <p>
                        <label className="my-radio">
                            <input type="radio" name="binary-emotion" value="neutral" onChange={this.handleChangeBinary} /> neutral
                    </label>
                    </p>
                    <p>
                        <label className="my-radio">
                            <input type="radio" name="binary-emotion" value={stimConfig.emotion} onChange={this.handleChangeBinary} /> {stimConfig.emotion}
                        </label>
                    </p>
                </div>
                <br />
            </>
        )
    }
}