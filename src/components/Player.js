import React from 'react';
import { connect } from 'react-redux';
import PlayerHand from './PlayerHand';

  //<img className='card' src={require('../images/cards/QC.svg')} />

class Player extends React.Component {

  render() {
    let hand = this.props.game.playerHands[0].hand.map((card) => {
      return <img key={card} className="card" alt="" src={require(`../images/cards/${card}.svg`)} />
    });
    let handSplit = this.props.game.playerHands[1].hand.map((card) => {
      return <img key={card} className="card" alt="" src={require(`../images/cards/${card}.svg`)} />
    });
    return (
      <div className="player-hands">
        <PlayerHand hand={hand} score={this.props.game.playerHands[0].score} arrow={this.props.game.playerHands[0].move}/>

        {this.props.game.playerHands[1].hand.length > 0 &&
          <PlayerHand hand={handSplit} score={this.props.game.playerHands[1].score} arrow={this.props.game.playerHands[1].move} />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game
  };
};

export default connect(mapStateToProps)(Player);
