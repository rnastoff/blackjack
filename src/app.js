import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

import Blackjack from './components/Blackjack';

import { playerIncreaseBet,
         playerUndoBet,
         playerSetInsurance,
         playerSetDouble,
         playerSetSplit,
         playerDealCard,
         playerSetMove,
         playerSetScore,
         playerResetHands,
         dealerDealCard,
         dealerSetScore,
         dealerSetMove,
         dealerResetHand,
         setGameSection,
         initialDeal } from './actions/gameActions';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <Blackjack />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
