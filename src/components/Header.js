import React from 'react';
import { connect } from 'react-redux';
import { FaBars } from 'react-icons/fa';
import { playerResetHands,
         playerSetMove,
         playerSetScore,
         playerResetBet,
         playerResetBalance,
         playerAddInsuranceAmount,
         playerSetInsuranceButton,
         playerSetDoubleButton,
         playerSetSplitButton,
         dealerSetMove,
         dealerResetHand,
         dealerSetScore,
         setGameSection,
         setGameMessage,
         setGameMessageBoolean,
         resetNumberOfHands } from '../actions/gameActions';

class Header extends React.Component {

  startOver = () => {
    this.props.setGameMessageBoolean(false)
    .then(() => {
      this.props.playerResetHands();
      this.props.playerSetMove('stand');
      this.props.playerSetMove('stand', true);
      this.props.playerSetScore(0);
      this.props.playerSetScore(0, true);
      this.props.playerResetBet();
      this.props.playerResetBalance();
      this.props.playerAddInsuranceAmount(0);
      this.props.playerSetInsuranceButton(false);
      this.props.playerSetDoubleButton(false);
      this.props.playerSetSplitButton(false);
      this.props.dealerSetMove("hit");
      this.props.dealerResetHand();
      this.props.dealerSetScore(0);
      this.props.setGameSection('shuffling');
      this.props.setGameMessage('SHUFFLING');
      this.props.resetNumberOfHands();
      this.props.setGameMessageBoolean(true);
    });    
  }

  render() {
    return (
      <div className="header">
        <div className="header-title">BLACKJACK</div>
        <button className="header-button" onClick={this.startOver}>START OVER</button>
      </div>
    );
  }
}

//export default Header;

const mapStateToProps = (state) => {
  return {
    game: state.game
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    playerResetHands: () => dispatch(playerResetHands()),
    playerSetScore: (score, splitBoolean) => dispatch(playerSetScore(score, splitBoolean)),
    playerSetMove: (move, splitBoolean) => dispatch(playerSetMove(move, splitBoolean)),
    playerResetBet: () => dispatch(playerResetBet()),
    playerResetBalance: () => dispatch(playerResetBalance()),
    playerAddInsuranceAmount: (amount) => dispatch(playerAddInsuranceAmount(amount)),
    playerSetInsuranceButton: (insuranceButton) => dispatch(playerSetInsuranceButton(insuranceButton)),
    playerSetDoubleButton: (doubleButton) => dispatch(playerSetDoubleButton(doubleButton)),
    playerSetSplitButton: (splitButton) => dispatch(playerSetSplitButton(splitButton)),
    dealerSetMove: (move) => dispatch(dealerSetMove(move)),
    dealerResetHand: () => dispatch(dealerResetHand()),
    dealerSetScore: (score) => dispatch(dealerSetScore(score)),
    setGameSection: (section) => dispatch(setGameSection(section)),
    setGameMessage: (message) => dispatch(setGameMessage(message)),
    setGameMessageBoolean: (messageBoolean) => dispatch(setGameMessageBoolean(messageBoolean)),
    resetNumberOfHands: () => dispatch(resetNumberOfHands())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
