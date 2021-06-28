import axios from "axios";
import store from "../redux/store";
import { saveMovies, updateMovies } from "../redux/actions";
import { baseUrl } from "../constants";

const getAllMovies = async () => {
    try {
        let response = await axios.get(`${baseUrl}/movies`);
        if (response && response.status == 200 && response.data && response.data.data) {
            let movies = response.data.data;
            store.dispatch(saveMovies(movies));
        }
    }
    catch (err) {
        console.log("Could not get all movies", err);
    }
};

const getPagedMovies = async (pageNumber, perPage) => {
    try {
        let response = await axios.get(`${baseUrl}/movies/paged`, {
            params: {
                pageNumber,
                perPage
            }
        });
        if (response && response.status == 200 && response.data && response.data.data) {
            let movies = response.data.data;
            console.log("Redux movies now", movies);
            store.dispatch(saveMovies(movies));
        }
    }
    catch (err) {
        console.log("Could not get all movies", err);
    }
};

const createMovie = async (movie) => {
    try {
        let response = await axios.post(`${baseUrl}/movies/new`, movie);
        if (response && response.status == 200 && response.data && response.data.data) {
            let movie = response.data.data;
            store.dispatch(updateMovies(movie));
        }
    }
    catch (err) {
        console.log("Could not get all movies", err);
    }
};

export {
    getAllMovies,
    getPagedMovies,
    createMovie
};