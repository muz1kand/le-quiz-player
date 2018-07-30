const LOGIN = 'le-quiz-player/auth/LOGIN'
const LOGOUT = 'le-quiz-player/auth/LOGOUT'

const initialState = {
  playerKey: '',
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        playerKey: action.playerKey,
      }
    case LOGOUT:
      return {
        ...state,
        playerKey: '',
      }
    default:
      return state
  }
}

export function login(playerKey) {
  return {
    type: LOGIN,
    playerKey,
  }
}

export function logout() {
  return {
    type: LOGOUT,
  }
}
