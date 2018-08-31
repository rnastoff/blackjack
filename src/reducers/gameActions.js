const newDeck = [
  "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH", "AH",
  "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9H", "10C", "JC", "QC", "KC", "AC",
  "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD", "AD",
  "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS", "AS",
];

const testDeck = [
  "5H", "10H", "5D", "AH", "6H", "2D", "2S", "2C", "10H", "JH", "QH", "KH", "AH"
];

const gameActionsDefaultState = {
  newDeck: newDeck,
  shuffledDeck: [], //normally an empty array
  numberOfHands: 0,
  gameSection: 'shuffling', //shuffling, betting, player, dealer, end
  gameMessage: 'SHUFFLING CARDS', //SHUFFLING CARDS, YOU WON!, YOU LOST!, PUSH, YOU'RE BROKE START OVER
  gameMessageBoolean: true, //true for initial load - shuffling

  playerHands: [
    {
      hand: [],
      move: 'stand', //hit, stand
      score: 0
    },
    {
      hand: [],
      move: 'stand', //hit, stand
      score: 0
    }
  ],
  playerBalance: 1000,
  playerBet: 0,
  playerDouble: false,
  playerInsurance: false,
  playerInsuranceAmount: 0,
  playerSplit: false,

  dealerHand: [],
  dealerScore: 0,
  dealerMove: "hit"
}

const gameActionsReducer = (state = gameActionsDefaultState, action) => {
  switch(action.type) {

    case "SET_GAME_SECTION":
      return {
        ...state,
        gameSection: action.gameSection
      };
    case "SET_SHUFFLED_DECK":
      return {
        ...state,
        shuffledDeck: action.shuffledDeck
      }
    case "REMOVE_CARD_FROM_DECK":
      return {
        ...state,
        shuffledDeck: state.shuffledDeck.filter((card, index) => index >= action.num)
      };
    case "SET_GAME_MESSAGE":
      return {
        ...state,
        gameMessage: action.gameMessage
      };
    case "SET_GAME_MESSAGE_BOOLEAN":
      return {
        ...state,
        gameMessageBoolean: action.gameMessageBoolean
      };
    case "INCREMENT_NUMBER_OF_HANDS":
      return {
        ...state,
        numberOfHands: state.numberOfHands + 1
      };
    case "RESET_NUMBER_OF_HANDS":
      return {
        ...state,
        numberOfHands: 0
      };




    case "DEALER_ADD_CARDS":
      return {
        ...state,
        dealerHand: [...state.dealerHand, ...action.cards]
      };
    case "DEALER_SET_SCORE":
      return {
        ...state,
        dealerScore: action.score
      };
    case "DEALER_SET_MOVE":
      return {
        ...state,
        dealerMove: action.move
      };
    case "DEALER_RESET_HAND":
      return {
        ...state,
        dealerHand: []
      }




    case "PLAYER_ADD_TO_BET":
      return {
        ...state,
        playerBet: state.playerBet + action.amount
      };
    case "PLAYER_RESET_BET":
      return {
        ...state,
        playerBet: 0
      };
    case "PLAYER_ADD_TO_BALANCE":
      return {
        ...state,
        playerBalance: state.playerBalance + action.amount
      };
    case "PLAYER_REMOVE_FROM_BALANCE":
      return {
        ...state,
        playerBalance: state.playerBalance - action.amount
      };
    case "PLAYER_RESET_BALANCE":
      return {
        ...state,
        playerBalance: 1000
      };
    case "PLAYER_ADD_CARDS":
      if (action.splitBoolean) {
        return {
          ...state,
          playerHands: [
            state.playerHands[0], { ...state.playerHands[1], hand: [...state.playerHands[1].hand, ...action.cards] }
          ]
        };
      } else {
        return {
          ...state,
          playerHands: [
            { ...state.playerHands[0], hand: [...state.playerHands[0].hand, ...action.cards] }, state.playerHands[1]
          ]
        };
      }

    case "PLAYER_REMOVE_CARD":
      return {
        ...state,
        playerHands: [
          { ...state.playerHands[0], hand: [state.playerHands[0].hand[0]] }, state.playerHands[1]
        ]
      };

    case "PLAYER_SET_SCORE":
      if (action.splitBoolean) {
        return {
          ...state,
          playerHands: [
            state.playerHands[0], { ...state.playerHands[1], score: action.score }
          ]
        };
      }
      else {
        return {
          ...state,
          playerHands: [
            { ...state.playerHands[0], score: action.score }, state.playerHands[1]
          ]
        }
      }

    case "PLAYER_SET_MOVE":
      if (action.splitBoolean) {
        return {
          ...state,
          playerHands: [
            state.playerHands[0], { ...state.playerHands[1], move: action.move }
          ]
        };
      }
      else {
        return {
          ...state,
          playerHands: [
            { ...state.playerHands[0], move: action.move }, state.playerHands[1]
          ]
        };
      }

    case "PLAYER_ADD_INSURANCE_AMOUNT":
      return {
        ...state,
        playerInsuranceAmount: action.insuranceAmount
      }
    case "PLAYER_SET_INSURANCE_BUTTON":
      return {
        ...state,
        playerInsurance: action.insuranceButton
      }
    case "PLAYER_SET_DOUBLE_BUTTON":
      return {
        ...state,
        playerDouble: action.doubleButton
      }
    case "PLAYER_SET_SPLIT_BUTTON":
      return {
        ...state,
        playerSplit: action.splitButton
      }
    case "PLAYER_RESET_HANDS":
      return {
        ...state,
        playerHands: gameActionsDefaultState.playerHands
      };

    default:
      return state;
  }
}

export default gameActionsReducer;
