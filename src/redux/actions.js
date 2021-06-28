
const saveMovies = (data) => {
    return {
        type: 'SET_MOVIES',
        payload: data
    };
};

const updateMovies = (data) => {
    return {
        type: 'UPDATE_MOVIES',
        payload: data
    };
};


export {
    saveMovies,
    updateMovies
};