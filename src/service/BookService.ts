import {ApiBookResponse, ApiConfig, FormattedBook, xml, errorMessage, BookError} from "../constants";
import axios from "axios";
import parser from "xml2json";

export class BookService {

    async retrieveBooksFromEndpoint(endpoint): Promise<ApiBookResponse> {
        return axios(endpoint);
    }

    async getBooksByAuthor(config: ApiConfig): Promise<FormattedBook[] | BookError> {
        let response;
        const endpoint = `${config.url}${config.authorName}&limit=${config.limit}&format=${config.format}`;

        try {
            response = await this.retrieveBooksFromEndpoint(endpoint);
        } catch (error: unknown) {
            return this.handleError(error);
        }

        if (config.format === xml) {
            response = this.parseXml(response);
        }
        return this.formatResponse(response);
    }

    formatResponse(getBooksByAuthorResponse: ApiBookResponse): FormattedBook[] {
        return getBooksByAuthorResponse.data.map(({book, stock}) => {
            return {...book, ...stock};
        })
    }

    parseXml(input: any): ApiBookResponse {
        let parsedXml = parser.toJson(input);
        const parsedJson = JSON.parse(parsedXml);
        return parsedJson.root;
    }

    handleError(error): BookError {
        return {status: error.response.status, message: `${errorMessage} ${error.response.status}`}
    }
}