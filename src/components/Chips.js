import React from 'react';
import { connect } from 'react-redux';

// <img className="chip" src={require('../images/chips/chip-angle-1.png')} />
//THIS NEEDS WORK
//<img className="chip" src={require('../images/chips/chip-angle-1.png')} />

class Chips extends React.Component {

  render() {
    return (
      <div className="chips">
        <div dangerouslySetInnerHTML={ {__html: this.props.chips} } />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    game: state.game
  }
}

export default connect(mapStateToProps)(Chips);
