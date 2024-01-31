// tmdbApi.js

export const category = {
    movie: 'movie',
    tv: 'tv'
};

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated'
};

export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air'
};

const baseURL = 'https://api.themoviedb.org/3';
const apiKey = '490977fdf68910dda3102d3f35def0aa';

const tmdbApi = {
    getMoviesList: async (type, params) => {
        const url = `${baseURL}/movie/${movieType[type]}?api_key=${apiKey}`;
        const response = await fetch(url);
        return response.json();
    },
    getTvList: async (type, params) => {
        const url = `${baseURL}/tv/${tvType[type]}?api_key=${apiKey}`;
        const response = await fetch(url);
        return response.json();
    },
    getVideos: async (cate, id) => {
        const url = `${baseURL}/${category[cate]}/${id}/videos?api_key=${apiKey}`;
        const response = await fetch(url);
        return response.json();
    },
    search: async (cate, query, params) => {
        const queryParams = new URLSearchParams(params);
        const url = `${baseURL}/search/${category[cate]}?api_key=${apiKey}&query=${query}&${queryParams.toString()}`;
        const response = await fetch(url);
        return response.json();
    },
    detail: async (cate, id, params) => {
        const queryParams = new URLSearchParams(params);
        const detailsUrl = `${baseURL}/${category[cate]}/${id}?api_key=${apiKey}&${queryParams.toString()}`;
        const creditsUrl = `${baseURL}/${category[cate]}/${id}/credits?api_key=${apiKey}`;

        // Fetch both details and credits concurrently
        const [detailsResponse, creditsResponse] = await Promise.all([
            fetch(detailsUrl),
            fetch(creditsUrl),
        ]);

        const detailsData = await detailsResponse.json();
        const creditsData = await creditsResponse.json();

        // Combine details and credits data
        return { ...detailsData, credits: { cast: creditsData.cast } };
    },
    credits: async (cate, id) => {
        const url = `${baseURL}/${category[cate]}/${id}/credits?api_key=${apiKey}`;
        const response = await fetch(url);
        return response.json();
    },
    similar: async (cate, id) => {
        const url = `${baseURL}/${category[cate]}/${id}/similar?api_key=${apiKey}`;
        const response = await fetch(url);
        return response.json();
    },
};

export default tmdbApi;
