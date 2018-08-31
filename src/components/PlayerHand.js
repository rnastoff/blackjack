import React from 'react';
import { connect } from 'react-redux';
import { FaAngleLeft } from 'react-icons/fa';
import { FaGreaterThan } from 'react-icons/fa';

class PlayerHand extends React.Component {
  render() {
    return (
      <div className="player-cards">
        { this.props.hand }

        {(this.props.arrow == "hit" && this.props.game.playerHands[1].hand.length > 0) && <div className="player-arrow"><FaAngleLeft className="fa-angle-left"/></div>}

        <div className="player-score">{this.props.score}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game
  };
};

export default connect(mapStateToProps)(PlayerHand);
