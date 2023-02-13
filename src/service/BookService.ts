import {ApiBookResponse, ApiConfig, FormattedBook, xml, Error, errorMessage} from "../constants";
import axios from "axios";
import parser from "xml2json"

export class BookService {

    async getBooksByAuthor(config: ApiConfig): Promise<ApiBookResponse | Error> {
        let formattedResponse;

        const endpoint = `${config.url}${config.authorName}&limit=${config.limit}&format=${config.format}`
        const response = await axios(endpoint);

        if (response.status !== 200) {
            return this.handleError(response)
        } else {
            formattedResponse = this.parseXml(response, config.format)
            return formattedResponse
        }
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

    handleError(error: ApiBookResponse): Error {
        return {status: error.status, message: `${errorMessage} ${error.status}`}
    }
}