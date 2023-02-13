import {ApiBookResponse, ApiConfig, FormattedBook, json, xml, Error, errorMessage} from "../constants";
import axios from "axios";
import parser from "xml2json"

export class BookService {

    async getBooksByAuthor(config: ApiConfig): Promise<ApiBookResponse | Error> {
        const endpoint = `${config.url}${config.authorName}&limit=${config.limit}&format=${config.format}`
        const response = await axios(endpoint);

        if (response.status === 200 && config.format === json) {
            this.formatResponse(response)
        }
        if (response.status === 200 && config.format === xml) {
            this.parseXml(response)
        }
        return this.handleError(response)
    }

    formatResponse(getBooksByAuthorResponse: ApiBookResponse): FormattedBook[] {
        return getBooksByAuthorResponse.data.map(({book, stock}) => {
            return {...book, ...stock}
        })
    }

    parseXml(xml: any): FormattedBook[] {
        let parsedXml = parser.toJson(xml)
        let parsedJson = JSON.parse(parsedXml)
        return this.formatResponse(parsedJson.root)
    }

    handleError(error: ApiBookResponse): Error {
        return {status: error.status, message: `${errorMessage} ${error.status}`}
    }
}