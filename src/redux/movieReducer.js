
const initialState = {
    movies: []
}

export default function movieReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_MOVIES':
            return state.movies
        case 'SET_MOVIES':
            return { ...state, movies: action.payload }
        case 'UPDATE_MOVIES':
            return { ...state, movies: [action.payload, ...state.movies] }
        default:
            return state
    }
};