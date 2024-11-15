import axios from 'axios';

const API_KEY = 'crals9pr01qhk4bqotb0crals9pr01qhk4bqotbg';
const BASE_URL = 'https://finnhub.io/api/v1/news';

export interface News {
    image: string;
    source: string;
    datetime: string;
    headline: string;
    id: string;
    url: string;
}

export const fetchNews = async (): Promise<News[]> => {
    try {
        const response = await axios.get(`${BASE_URL}?category=general&token=${API_KEY}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
