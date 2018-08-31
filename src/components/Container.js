import React from 'react';
import { connect } from 'react-redux';
import Background from './Background';
import GameStatus from './GameStatus';
import Dealer from './Dealer';
import Player from './Player';
import Chips from './Chips';
import Footer from './Footer';
import numeral from 'numeral';

import { playerSetScore,
         playerSetMove,
         playerAddToBalance,
         playerResetBet,
         playerAddInsuranceAmount,
         dealerSetScore,
         dealerSetMove,
         dealerDealCard,
         setGameSection,
         setGameMessageBoolean,
         setGameMessage } from '../actions/gameActions';

class Container extends React.Component {

  //CALCULATE SCORE OF HAND
  getScore = (hand) => {
    let score = 0;
    let numberOfAce = 0;
    for (let i=0; i < hand.length; i++) {
      let first = hand[i].slice(0,1);
      if ((parseInt(first)) > 1 && (parseInt(first) < 10)) { score += parseInt(first); }
      else if (parseInt(first) === 1) { score += 10; }
      else if (first == "J" || first == "Q" || first == "K") { score += 10; }
      else if (first == "A") {
        score += 11;
        numberOfAce++;
       }
    }
    if (score > 21 && numberOfAce > 0) {
       score = score-10;
     } //Ace as 1
    return score;
   };

   //CHECK FOR BLACKJACK OR BUST
   checkPlayerScore = () => {
     if (this.props.game.playerHands[0].score > 21 || this.props.game.playerHands[0].score === 21) {
       this.props.playerSetMove("stand").then(() => this.dealerPlay());
     }
     if (this.props.game.playerHands[1].move === "hit") {
       if (this.props.game.playerHands[1].score > 21 || this.props.game.playerHands[1].score === 21) {
         this.props.playerSetMove("stand", true); //then(() => this.dealerPlay());
         this.props.playerSetMove("hit");
       }
     }
   }

   //UPDATE SCORE
   updateScores = () => {
     this.props.playerSetScore(this.getScore(this.props.game.playerHands[0].hand));
     this.props.dealerSetScore(this.getScore(this.props.game.dealerHand));
     if (this.props.game.playerHands[1].hand.length > 0) { //for split
       this.props.playerSetScore(this.getScore(this.props.game.playerHands[1].hand), true);
     }
   }

  //DEALER DECISION TO HIT OR STAND
  dealerCompare = (whichPlayerHand) => {
    return new Promise((resolve, reject) => {
      if (this.props.game.dealerMove !== 'stand') {
        let dealInterval = setInterval(() => {
          if (this.props.game.dealerMove === 'stand') {
              clearInterval(dealInterval);
              resolve();
            }
          let dealerHand = this.props.game.dealerScore;
          let playerHand = this.props.game.playerHands[whichPlayerHand].score;
          if (dealerHand > 21) {
            this.props.dealerSetMove('stand');
          }
          else if (playerHand > 21) {
            this.props.dealerSetMove('stand');
          }
          else if (playerHand > dealerHand && dealerHand < 16) {
            this.props.dealerDealCard().then(() => this.updateScores());
          }
          else {
            this.props.dealerSetMove('stand');
          }
      }, 1000);
    }
    });
  }

  //CHECK IF DEALER CAN PLAY, THEN RUN IT ONCE OR TWICE (IF THERE'S A SPLIT)
  dealerPlay = () => {
    if (this.props.game.playerHands[0].move === "stand" && this.props.game.playerHands[1].move === "stand") {
      this.dealerCompare(0).then(() => {
        if (this.props.game.playerHands[1].hand.length > 0) {
          this.props.dealerSetMove("hit").then(() => {
            this.dealerCompare(1);
          });
        }
      }).then(() => {
        this.compareScores();
      });
    }
  }

  //LOOK AT HANDS, SET UP AMOUNT TO WIN/INSURANCE
   compareScores = () => {
     let winningAmount = 0;
     let winningInsurance = 0;
     let handOneAmount = this.props.game.playerBet;
     let handTwoAmount = 0;

     if (this.props.game.playerHands[1].hand.length > 0) { //if there's a split
       handOneAmount = Math.floor(this.props.game.playerBet / 2);
       handTwoAmount = Math.floor(this.props.game.playerBet / 2);
     }


     if (this.getScore(this.props.game.dealerHand.slice(0,2)) === 21) { //insurance
       winningInsurance = this.props.game.playerInsuranceAmount;
     }

     let whichPlayerHand = handTwoAmount > 0 ? 1 : 0; //how many times to run the loop. Once, or twice for split

     for (let i=0; i < whichPlayerHand + 1; i++) {
       if (this.props.game.playerHands[whichPlayerHand].score > 21) {
         winningAmount -= whichPlayerHand === 0 ? handOneAmount : handTwoAmount;
       }
       else if (this.props.game.dealerScore > 21) {
         winningAmount += whichPlayerHand === 0 ? handOneAmount : handTwoAmount;
       }
       else if (this.props.game.dealerScore > this.props.game.playerHands[whichPlayerHand].score) {
         winningAmount -= whichPlayerHand === 0 ? handOneAmount : handTwoAmount;
       }
       else if (this.props.game.dealerScore === this.props.game.playerHands[whichPlayerHand].score) { //handle push
         winningAmount += 0;
       }
       else {
         winningAmount += whichPlayerHand === 0 ? handOneAmount : handTwoAmount;
       }
     }
     this.endGame(winningAmount, winningInsurance);
   }

  //END GAME MESSAGE
  endGame = (winningAmount, winningInsurance) => {
    let message = "";
    winningAmount = Math.floor(winningAmount * 1.5);
    winningInsurance = winningInsurance * 2;
    if (winningAmount > 0) {
      message = `You Won ${numeral(winningAmount).format('$ 0,0[.]00')}!`;
      this.props.playerAddToBalance(winningAmount)
        .then(() => {
          this.props.playerResetBet();
        });
    }
    else if (winningAmount < 0) {
      message = "You Lost!";
      this.props.playerResetBet();
    }
    else if (winningAmount === 0) {
      message = "PUSH!"
      this.props.playerAddToBalance(this.props.game.playerBet)
        .then(() => {
          this.props.playerResetBet();
        });
    }
    if (winningInsurance) {
      message += ` Insurance paid ${numeral(winningInsurance).format('$ 0,0[.]00')}`;
      this.props.playerAddToBalance(winningInsurance)
        .then(() => {
          this.props.playerAddInsuranceAmount(0);
        });
    }

    this.props.setGameMessage(message).then(() => {
      this.props.displayChips();
    });
    this.props.setGameMessageBoolean(true);
  }

  render() {
    return (
      <div className="container">
        <div className="container-position">
          {this.props.game.gameSection === 'playing' && <Dealer updateScores={this.updateScores} checkPlayerScore={this.checkPlayerScore} getScore={this.getScore}/>}
          {this.props.game.gameMessageBoolean && <GameStatus />}
          {this.props.game.gameSection === 'playing' && <Player updateScores={this.updateScores} />}
          <Chips chips={this.props.chips}/>
          <Footer
            updateScores={this.updateScores}
            checkPlayerScore={this.checkPlayerScore}
            dealerPlay={this.dealerPlay}
            displayChips={this.props.displayChips}/>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    game: state.game
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    playerSetScore: (score, splitBoolean) => dispatch(playerSetScore(score, splitBoolean)),
    playerSetMove: (move, splitBoolean) => dispatch(playerSetMove(move, splitBoolean)),
    playerAddToBalance: (amount) => dispatch(playerAddToBalance(amount)),
    playerResetBet: () => dispatch(playerResetBet()),
    playerAddInsuranceAmount: (amount) => dispatch(playerAddInsuranceAmount(amount)),
    dealerSetScore: (hand) => dispatch(dealerSetScore(hand)),
    dealerSetMove: (move) => dispatch(dealerSetMove(move)),
    dealerDealCard: () => dispatch(dealerDealCard()),
    setGameMessage: (message) => dispatch(setGameMessage(message)),
    setGameMessageBoolean: (messageBoolean) => dispatch(setGameMessageBoolean(messageBoolean)),
    setGameSection: (section) => dispatch(setGameSection(section))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
