import {ApiBookResponse, ApiConfig} from "../constants/types";
import axios from "axios";

export class BookService {

    async getBooksByAuthor(config: ApiConfig): Promise<ApiBookResponse> {
        const endpoint = `${config.url}${config.authorName}&limit=${config.limit}&format=${config.format}`
        return axios(endpoint);
    }
}