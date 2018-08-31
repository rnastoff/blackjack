import React from 'react';
import { connect } from 'react-redux';
import Background from './Background';
import Header from './Header';
import PlaceBet from './PlaceBet';
import Container from './Container';
import Footer from './Footer';

class Blackjack extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chipsHTML: ""
    }
  }

  //<img src={tabletop} />
//<PlaceBet />

displayChips = () => {
  let chipsHTML = "";
  let playerBet = this.props.game.playerBet;
  const chips = [100, 50, 25, 10, 5, 1];
  let chipNum = 0;

  while (playerBet) {
    if (playerBet >= chips[chipNum]) {
      chipsHTML += `<img class="chip" src='../images/chips/chip-angle-${chips[chipNum]}.png' />`;
      playerBet -= chips[chipNum];
    }
    while (playerBet < chips[chipNum]) {
      chipNum++;
    }
  }
  this.setState(({ chipsHTML: chipsHTML }));
}


  render() {
    return (
      <div>
        <Header />
        <PlaceBet chips={this.state.chipsHTML} displayChips={this.displayChips} />
        <Background />
        <Container chips={this.state.chipsHTML} displayChips={this.displayChips} />
      </div>
    );
  }
}

//export default Blackjack;

const mapStateToProps = (state) => {
  return {
    game: state.game
  }
}

export default connect(mapStateToProps)(Blackjack);
