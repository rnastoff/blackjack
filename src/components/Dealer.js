import React from 'react';
import { connect } from 'react-redux';
import { initialDeal,
         playerSetMove,
         playerSetDoubleButton,
         playerSetInsuranceButton,
         playerSetSplitButton } from '../actions/gameActions';

class Dealer extends React.Component {

  initialDeal = () => {
    this.props.initialDeal()
      .then(() => {
        this.props.updateScores();
      })
      .then(() => {
        this.checkButtons();
        this.props.checkPlayerScore();
      });
  }

  //Deciding if to turn on double/split/insurance
  checkButtons = () => {
    if (this.props.game.playerHands[0].hand[0][0] === this.props.game.playerHands[0].hand[1][0]) { //Split Button Check
      this.props.playerSetSplitButton(true);
    }
    if (this.props.game.playerHands[0].score > 8 && this.props.game.playerHands[0].score < 12) { //Double Down Button check
      this.props.playerSetDoubleButton(true);
    }
    if (this.props.game.dealerHand[1][0] === "A") { //Insurance button check
      this.props.playerSetInsuranceButton(true);
    }
  }

  componentDidMount() {
    this.initialDeal();
  }

  render() {
    //For not displaying all of dealer's cards. Back face shown until player stands
    let cards = this.props.game.dealerHand;
    if (this.props.game.playerHands[0].move !== 'stand' || this.props.game.playerHands[1].move !== 'stand' || this.props.game.gameSection !== 'playing') {
      cards = this.props.game.dealerHand.slice(1);
      cards.unshift("back");
    }      
    cards = cards.map((card) => {
      if (card === 'back') {
        return <img key={card} className="card" alt="" src={require(`../images/cards/back.png`)} />
      } else {
        return <img key={card} className="card" alt="" src={require(`../images/cards/${card}.svg`)} />
      }
    });

    //For not displaying deaer's full score until player stands
    let dealerScore;
    if (this.props.game.playerHands[0].move === 'stand' && this.props.game.playerHands[1].move === 'stand' && this.props.game.gameSection === 'playing') {
      dealerScore = this.props.game.dealerScore;
    } else {
      dealerScore = this.props.getScore(this.props.game.dealerHand.slice(1));
    }

    return (
      <div className="dealer-cards">
        { cards }
        <div className="dealer-score">{dealerScore}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    initialDeal: () => dispatch(initialDeal()),
    incrementNumberOfHands: () => dispatch(incrementNumberOfHands()),
    playerSetMove: (move, splitBoolean) => dispatch(playerSetMove(move, splitBoolean)),
    playerSetDoubleButton: (playerDouble) => dispatch(playerSetDoubleButton(playerDouble)),
    playerSetInsuranceButton: (playerInsurance) => dispatch(playerSetInsuranceButton(playerInsurance)),
    playerSetSplitButton: (playerSplit) => dispatch(playerSetSplitButton(playerSplit))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dealer);
