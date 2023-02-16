import {ApiBookResponse, ApiConfig, FormattedBook, xml, errorMessage, BookError} from "../constants";
import axios from "axios";
import parser from "xml2json"

export class BookService {

    async retrieveBooksFromEndpoint(endpoint): Promise<ApiBookResponse> {
        return axios(endpoint);
    }

    async getBooksByAuthor(config: ApiConfig): Promise<FormattedBook | BookError> {
        let formattedResponse;
        let response;
        const endpoint = `${config.url}${config.authorName}&limit=${config.limit}&format=${config.format}`

        try {
            response = await this.retrieveBooksFromEndpoint(endpoint)
        } catch (error: unknown) {
            return this.handleError(error)
        }

        formattedResponse = this.parseXml(response, config.format)
        return formattedResponse
    }

    formatResponse(getBooksByAuthorResponse: ApiBookResponse): FormattedBook[] {
        return getBooksByAuthorResponse.data.map(({book, stock}) => {
            return {...book, ...stock}
        })
    }

    parseXml(input: any, format: string): FormattedBook[] {
        if (format === xml) {
            let parsedXml = parser.toJson(input)
            let parsedJson = JSON.parse(parsedXml)
            return this.formatResponse(parsedJson.root)
        } else {
            return this.formatResponse(input)
        }
    }

    handleError(error): BookError {
        return {status: error.response.status, message: `${errorMessage} ${error.response.status}`}
    }
}