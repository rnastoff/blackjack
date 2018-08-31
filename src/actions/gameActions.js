

//THUNK ACTIONS
export const playerIncreaseBet = (amount) => (dispatch, getStore) => Promise.resolve().then(() => {
  return dispatch(playerAddToBet(amount))
}).then(() => {
  return dispatch(playerRemoveFromBalance(amount));
});

export const playerUndoBet = () => (dispatch, getStore) => Promise.resolve().then(() => {
  return dispatch(playerAddToBalance(getStore().game.playerBet));
}).then(() => {
  return dispatch(playerResetBet());
});

export const initialDeal = () => (dispatch, getStore) => Promise.resolve().then(() => {
  let deck = getStore().game.shuffledDeck;
  return dispatch(playerAddCards([deck[0], deck[2]]));
}).then(() => {
  let deck = getStore().game.shuffledDeck;
  return dispatch(dealerAddCards([deck[1], deck[3]]));
}).then(() => {
  dispatch(removeCardFromDeck(4));
  dispatch(incrementNumberOfHands());
  dispatch(playerSetMove("hit"));
});

export const playerSetInsurance = () => (dispatch, getStore) => Promise.resolve().then(() => {
  let amount = Math.floor(getStore().game.playerBet / 2);
  return dispatch(playerAddInsuranceAmount(amount));
}).then(() => {
  let amount = Math.floor(getStore().game.playerBet / 2);
  dispatch(playerRemoveFromBalance(amount));
  dispatch(playerSetInsuranceButton(false));
});

export const playerSetDouble = () => (dispatch, getStore) => Promise.resolve().then(() => {
  let amount = Math.floor(getStore().game.playerBet);
  dispatch(playerAddToBet(amount));
  dispatch(playerRemoveFromBalance(amount));
  dispatch(playerSetDoubleButton(false));
}).then(() => {
  dispatch(playerDealCard());
  dispatch(playerSetMove('stand'));
});

export const playerSetSplit = () => (dispatch, getStore) => Promise.resolve().then(() => {
  let card = getStore().game.playerHands[0].hand[1];
  dispatch(playerAddCards([card], true));
}).then(() => {
  dispatch(playerRemoveCard());
}).then(() => {
  dispatch(playerAddCards([getStore().game.shuffledDeck[0]]));
  dispatch(playerAddCards([getStore().game.shuffledDeck[1]], true));
}).then(() => {
  let amount = getStore().game.playerBet;
  dispatch(removeCardFromDeck(2));
  dispatch(playerSetSplitButton(false));
  dispatch(playerSetDoubleButton(false));
  dispatch(playerSetInsuranceButton(false));
  dispatch(playerAddToBet(amount));
  dispatch(playerRemoveFromBalance(amount));
  dispatch(playerSetMove("stand"));
  dispatch(playerSetMove("hit", true));
});

export const playerDealCard = (splitBoolean) => (dispatch, getStore) => Promise.resolve().then(() => {
  let deck = getStore().game.shuffledDeck;
  dispatch(playerAddCards([deck[0]], splitBoolean));
}).then(() => {
  dispatch(removeCardFromDeck());
  dispatch(playerSetDoubleButton(false));
  dispatch(playerSetInsuranceButton(false));
  dispatch(playerSetSplitButton(false));
});


export const dealerDealCard = () => (dispatch, getStore) => Promise.resolve().then(() => {
  let deck = getStore().game.shuffledDeck;
  dispatch(dealerAddCards([deck[0]]));
}).then(() => {
  dispatch(removeCardFromDeck());
});


export const setGameSection = (gameSection) => (dispatch, getStore) => Promise.resolve().then(() => {
  return dispatch({
    type: 'SET_GAME_SECTION',
    gameSection: gameSection
  });
});





export const playerSetMove = (move, splitBoolean) => (dispatch, getStore) => Promise.resolve().then(() => {
  return dispatch({
    type: "PLAYER_SET_MOVE",
    move: move,
    splitBoolean: splitBoolean
  });
});

export const dealerSetMove = (move) => (dispatch, getStore) => Promise.resolve().then(() => {
  return dispatch({
    type: "DEALER_SET_MOVE",
    move: move
  });
});


export const playerAddToBalance = (amount) => (dispatch, getStore) => Promise.resolve().then(() => {
  return dispatch({
    type: "PLAYER_ADD_TO_BALANCE",
    amount: amount
  });
});


export const setGameMessage = (gameMessage) => (dispatch, getStore) => Promise.resolve().then(() => {
  return dispatch({
    type: "SET_GAME_MESSAGE",
    gameMessage: gameMessage
  });
});

export const setGameMessageBoolean = (gameMessageBoolean) => (dispatch, getStore) => Promise.resolve().then(() => {
  return dispatch({
    type: "SET_GAME_MESSAGE_BOOLEAN",
    gameMessageBoolean: gameMessageBoolean
  });
});



////////////////BASIC ACTIONS
//DECK
export const setShuffledDeck = (deck = []) => ({
  type: 'SET_SHUFFLED_DECK',
  shuffledDeck: deck
});

export const incrementNumberOfHands = () => ({
  type: 'INCREMENT_NUMBER_OF_HANDS'
});

export const resetNumberOfHands = () => ({
  type: 'RESET_NUMBER_OF_HANDS'
});

//Number, if nothing passed, just 1
export const removeCardFromDeck = (num = 1) => ({
  type: 'REMOVE_CARD_FROM_DECK',
  num: num
});









//DEALER
//Card is an array
export const dealerAddCards = (cards) => ({
  type: "DEALER_ADD_CARDS",
  cards: cards
});

export const dealerResetHand = () => ({
  type: "DEALER_RESET_HAND"
});

export const dealerSetScore = (score) => ({
  type: "DEALER_SET_SCORE",
  score: score
});





//PLAYER
//Card is an array
export const playerAddCards = (cards, splitBoolean) => ({
  type: "PLAYER_ADD_CARDS",
  cards: cards,
  splitBoolean: splitBoolean
});

export const playerRemoveCard = () => ({
  type: "PLAYER_REMOVE_CARD"
})

export const playerResetHands = () => ({
  type: "PLAYER_RESET_HANDS"
});

export const playerSetScore = (score, splitBoolean) => ({
  type: "PLAYER_SET_SCORE",
  score: score,
  splitBoolean: splitBoolean
});


export const playerRemoveFromBalance = (amount) => ({
  type: "PLAYER_REMOVE_FROM_BALANCE",
  amount: amount
});

export const playerResetBalance = () => ({
  type: "PLAYER_RESET_BALANCE"
});

export const playerAddToBet = (amount) => ({
  type: "PLAYER_ADD_TO_BET",
  amount: amount
});

export const playerResetBet = () => ({
  type: "PLAYER_RESET_BET"
});

//No args, flips boolean
export const playerSetDoubleButton = (doubleButton) => ({
  type: 'PLAYER_SET_DOUBLE_BUTTON',
  doubleButton: doubleButton
});

//No args, flips boolean
export const playerSetInsuranceButton = (insuranceButton) => ({
  type: 'PLAYER_SET_INSURANCE_BUTTON',
  insuranceButton: insuranceButton
});

//Number
export const playerAddInsuranceAmount = (insuranceAmount) => ({
  type: 'PLAYER_ADD_INSURANCE_AMOUNT',
  insuranceAmount: insuranceAmount
});

//No args, flips boolean
export const playerSetSplitButton = (splitButton) => ({
  type: "PLAYER_SET_SPLIT_BUTTON",
  splitButton: splitButton
})
