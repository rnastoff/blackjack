import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import { incrementNumberOfHands,
         playerDealCard,
         playerSetSplitButton,
         playerSetInsuranceButton,
         playerSetDoubleButton,
         playerSetDouble,
         playerSetInsurance,
         playerSetSplit,
         playerSetMove,
         playerIncreaseBet,
         playerAddInsuranceAmount } from '../actions/gameActions';

class Footer extends React.Component {

  playerHitSequence = (num, splitBoolean) => {
    this.props.playerDealCard(splitBoolean)
    .then(() => {
      this.props.updateScores();
    })
    .then(() => {
      this.props.checkPlayerScore();
    });
  }

  playerHit = () => {
    if (this.props.game.playerHands[1].hand.length > 0) { //for the split hand
      if (this.props.game.playerHands[1].move !== 'stand') {
        this.playerHitSequence(1, true);
      }
      else {
        this.playerHitSequence(0);
      }
    }
    else { //For the non-split hand
      this.playerHitSequence(0);
    }
  }

  playerStandSequence = (move, splitBoolean) => {
    this.props.playerSetSplitButton(false);
    this.props.playerSetDoubleButton(false);
    this.props.playerSetInsuranceButton(false);
    this.props.playerSetMove("stand", splitBoolean).then(() => this.props.dealerPlay());
  }

  playerStand = () => {
    if (this.props.game.playerHands[1].hand.length > 0) { //for the split hand
      if (this.props.game.playerHands[1].move !== 'stand') {
        this.playerStandSequence("stand", true);
        this.props.playerSetMove("hit");
      }
      else {
        this.playerStandSequence("stand");
      }
    }
    else { //for the non-split hand
      this.playerStandSequence("stand");
    }
  }

  playerSplit = () => {
    this.props.playerSetSplit()
      .then(() => {
        this.props.updateScores();
      })
      .then(() => {
        this.props.checkPlayerScore();
        this.props.displayChips();
      });
  }

  playerDouble = () => {
    this.props.playerSetDouble()
      .then(() => {
        this.props.updateScores();
      })
      .then(() => {
        this.props.checkPlayerScore();
        this.props.displayChips();
      })
      .then(() => {
        this.props.dealerPlay();
      });
  }

  playerInsurance = () => {
    this.props.playerSetInsurance();
  }

  render() {
    return (
      <div className="footer">
        <div className="footer-balance-box">
          <div className="footer-balance-text">BALANCE</div>
          <div className="footer-balance-amount">{numeral(this.props.game.playerBalance).format('$ 0,0[.]00')}</div>
        </div>
        <div className="footer-buttons-box">
          <button
            onClick={this.playerHit}
            disabled={this.props.game.playerHands[0].move === 'stand' && this.props.game.playerHands[1].move === 'stand'}>
            HIT
          </button>
          <button
            onClick={this.playerStand}
            disabled={this.props.game.playerHands[0].move === 'stand' && this.props.game.playerHands[1].move === 'stand'}>
            STAND
          </button>
          <button
            onClick={this.playerDouble}
            disabled={!this.props.game.playerDouble}>
            DOUBLE
          </button>
          <button
            onClick={this.playerSplit}
            disabled={!this.props.game.playerSplit}>
            SPLIT
          </button>
          <button
            onClick={this.playerInsurance}
            disabled={!this.props.game.playerInsurance}>
            INSURANCE
          </button>
        </div>
        <div className="footer-bet-box">
          <div className="footer-bet-text">BET</div>
          <div className="footer-bet-amount">
            {numeral(this.props.game.playerBet).format('$ 0,0[.]00')}
            {this.props.game.playerInsuranceAmount > 0 && " / " + numeral(this.props.game.playerInsuranceAmount).format('$ 0,0[.]00')}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    incrementNumberOfHands: () => dispatch(incrementNumberOfHands()),
    playerDealCard: (splitBoolean) => dispatch(playerDealCard(splitBoolean)),

    playerSetSplitButton: (playerSplit) => dispatch(playerSetSplitButton(playerSplit)),
    playerSetInsuranceButton: (playerInsurance) => dispatch(playerSetInsuranceButton(playerInsurance)),
    playerSetDoubleButton: (playerDouble) => dispatch(playerSetDoubleButton(playerDouble)),

    playerSetSplit: () => dispatch(playerSetSplit()),
    playerSetInsurance: () => dispatch(playerSetInsurance()),
    playerSetDouble: () => dispatch(playerSetDouble()),

    playerSetMove: (move, splitBoolean) => dispatch(playerSetMove(move, splitBoolean)),
    playerIncreaseBet: (amount) => dispatch(playerIncreaseBet(amount)),
    playerSetInsurance: () => dispatch(playerSetInsurance()),
    playerAddInsuranceAmount: (amount) => dispatch(playerAddInsuranceAmount(amount))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
