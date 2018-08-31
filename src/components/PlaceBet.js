import React from 'react';
import { FaUndo } from 'react-icons/fa';
import { FaGreaterThan } from 'react-icons/fa';
import { connect } from 'react-redux';
import { playerIncreaseBet,
         playerUndoBet,
         setGameSection } from '../actions/gameActions';


//write - playerResetBet, playerAddToBet from actions/player.js
//read - deck.gameStatus

class PlaceBet extends React.Component {
  increaseBet = (num) => {
    if (this.props.game.playerBalance >= num) {
      this.props.playerIncreaseBet(num).then(() => {
        this.props.displayChips();
      });
    }
  };

  reset = () => {
    this.props.playerUndoBet().then(() => {
      this.props.displayChips();
    });    
  };

  play = () => {
    this.props.setGameSection('playing');
  }

  render() {
    if (this.props.game.gameSection === "betting") {
      return (
        <div>
          <div className="place-bet-bg"></div>
          <div className="place-bet-container">
            <div className="place-bet-position">
              <button onClick={this.reset} className="bet-reset-button"><FaUndo className="fa-undo"/></button>
              <button
                onClick={() => this.increaseBet(1)}
                className="chip-button bet-one-button"
                disabled={!(this.props.game.playerBalance >= 1)}>
              </button>
              <button
                onClick={() => this.increaseBet(5)}
                className="chip-button bet-five-button"
                disabled={!(this.props.game.playerBalance >= 5)}>
              </button>
              <button
                onClick={() => this.increaseBet(10)}
                className="chip-button bet-ten-button"
                disabled={!(this.props.game.playerBalance >= 10)}>
              </button>
              <button
                onClick={() => this.increaseBet(25)}
                className="chip-button bet-twenty-five-button"
                disabled={!(this.props.game.playerBalance >= 25)}>
              </button>
              <button
                onClick={() => this.increaseBet(50)}
                className="chip-button bet-fifty-button"
                disabled={!(this.props.game.playerBalance >= 50)}>
              </button>
              <button
                onClick={() => this.increaseBet(100)}
                className="chip-button bet-hundred-button"
                disabled={!(this.props.game.playerBalance >= 100)}>
              </button>
              <button
                onClick={this.play}
                disabled={!(this.props.game.playerBet > 0)}
                className="bet-button">
                <FaGreaterThan className="fa-greater-than"/>
              </button>
            </div>
            <div className="place-your-bet">PLACE YOUR BET</div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    playerIncreaseBet: (amount) => dispatch(playerIncreaseBet(amount)),
    playerUndoBet: () => dispatch(playerUndoBet()),
    setGameSection: (status) => dispatch(setGameSection(status))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceBet);
