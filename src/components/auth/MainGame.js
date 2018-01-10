import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class MainGame extends Component {

    constructor(props) {
        super(props);
        let rnum = Math.floor(Math.random() * 100 + 1);
        this.state = {
            turns: 0,
            Rnum: rnum
        }

        this.saveClicked = this.saveClicked.bind(this);

    };





    saveClicked(event) {
        let number_of_turns = this.state.turns;
        this.setState({
            turns: number_of_turns + 1
        })

        if (number_of_turns > 3) {
            this.props.signoutUser();
        }
        else {

            if (this.refs.txt.value == this.state.Rnum) {
                this.refs.message.innerHTML = "Right Guess.!"
            }
            else {
                this.refs.message.innerHTML = "Try again.!"
            }

        }



    };



    render() {
        return (

            <center>
                <div className="inner form-container outer">
                    <br />
                    <h1>Guess a number between 1 to 100</h1>
                    <br />
                    <h3 ref="message"></h3><br />
                    <h3>You have {3-(this.state.Rnum)} Turns left.</h3><br />
                    Enter the number:<textarea rows="3" cols="10" className="form-control" ref="txt" placeholder="Guess here..." /><br />

                    <button className="btn btn-confirm" onClick={this.saveClicked.bind(this)}>Submit</button>&nbsp;
            </div>
            </center>
        );
    }
}



export default connect(null, actions)(MainGame)