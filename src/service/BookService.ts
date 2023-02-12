import {ApiBookResponse, ApiConfig, Book} from "../constants/types";
import axios from "axios";

export class BookService {

    async getBooksByAuthor(config: ApiConfig): Promise<ApiBookResponse> {
        const endpoint = `${config.url}${config.authorName}&limit=${config.limit}&format=${config.format}`
        const response = await axios(endpoint);
        if (response.status === 200) {
            this.formatResponse(response, config.format)
        }
        return response
    }

    formatResponse(getBooksByAuthorResponse: ApiBookResponse, format: string): Book[] {
        return getBooksByAuthorResponse.data.map(({book, stock}) => {
            return {...book, ...stock}
        })
    }
}