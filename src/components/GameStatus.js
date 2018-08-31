import React from 'react';
import { connect } from 'react-redux';
import { setShuffledDeck,
         setGameSection,
         setGameMessage,
         setGameMessageBoolean,
         resetNumberOfHands,
         playerResetHands,
         playerSetScore,
         playerSetMove,
         playerAddInsuranceAmount,
         dealerResetHand,
         dealerSetScore,
         dealerSetMove } from '../actions/gameActions';

class GameStatus extends React.Component {

  //Fisher Yates Shuffle
  shuffleDeck = (deck) => {
    let shuffledDeck = deck.slice(0);
    let remaining = deck.length;
    let temp;
    let randomNum;
    while(remaining) {
      randomNum = Math.floor(Math.random() * remaining--);
      temp = shuffledDeck[remaining];
      shuffledDeck[remaining] = shuffledDeck[randomNum];
      shuffledDeck[randomNum] = temp;
    }
    return shuffledDeck;
    //return deck; //delete this  when you turn back on the shuffling
  };

  //IF SHOULD SHUFFLE
  checkMessage = () => {
    if (this.props.game.gameSection === "shuffling") {
      this.props.setGameMessage("SHUFFLING DECK");
      let deck = this.shuffleDeck(this.props.game.newDeck);

      this.props.setShuffledDeck(deck);

      setTimeout(() => {
        this.props.setGameMessageBoolean(false);
        this.props.setGameMessage("");
        this.props.setGameSection("betting");
      }, 1000);
    }
  }

  closeBox = () => {
    this.newGame();
    if (this.props.game.numberOfHands >= 5) {
      this.props.resetNumberOfHands();
      this.props.setGameMessage("SHUFFLING");
      this.props.setGameSection("shuffling")
        .then(() => {
          this.checkMessage();
        });
    }
    else {
      this.props.setGameMessageBoolean(false);
      this.props.setGameMessage("");
      this.props.setGameSection("betting");
    }
  }

  //Reset hands/scores/etc for new game
  newGame = () => {
    this.props.playerResetHands();
    this.props.playerSetScore(0);
    this.props.playerSetScore(0, true);
    this.props.dealerResetHand();
    this.props.dealerSetScore(0);
    this.props.dealerSetMove("stand");
    this.props.playerAddInsuranceAmount(0);
  }

  componentDidMount() {
    console.log("Game status mounted");
    this.checkMessage();
  }


  render() {
    return (
      <div className="game-status" onClick={this.closeBox}>
        <div className="game-status-box">
          <div className="game-status-text">{this.props.game.gameMessage}</div>
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
    setShuffledDeck: (deck) => dispatch(setShuffledDeck(deck)),
    setGameSection: (gameSection) => dispatch(setGameSection(gameSection)),
    setGameMessage: (gameMessage) => dispatch(setGameMessage(gameMessage)),
    setGameMessageBoolean: (gameMessageBoolean) => dispatch(setGameMessageBoolean(gameMessageBoolean)),
    resetNumberOfHands: () => dispatch(resetNumberOfHands()),
    playerResetHands: () => dispatch(playerResetHands()),
    playerSetScore: () => dispatch(playerSetScore()),
    playerSetMove: () => dispatch(playerSetMove()),
    playerAddInsuranceAmount: (amount) => dispatch(playerAddInsuranceAmount(amount)),
    dealerResetHand: () => dispatch(dealerResetHand()),
    dealerSetScore: () => dispatch(dealerSetScore()),
    dealerSetMove: (move) => dispatch(dealerSetMove())
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(GameStatus);
