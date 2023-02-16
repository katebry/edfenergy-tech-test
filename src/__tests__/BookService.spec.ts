import {mockBookResponse } from '../mocks/mockBookResponse'
import {BookService} from "../service/BookService";
import {ApiConfig, expectedJsonRes, expectedSuccessRes} from "../constants";
import {ApiError} from "../constants/ApiError";

describe('Book Service', () => {

    const testConfig: ApiConfig = {
        url: 'http://api.book-seller-example.com/by-author?q=',
        authorName: 'Shakespeare',
        limit: '10',
        format: 'json'
    }

    beforeEach(() => {
        jest.restoreAllMocks();
    })

    test('GET = getBooksByAuthor: when the getBooksByAuthor endpoint is successfully hit, formatted data is returned', async () => {
        const bookService = new BookService();

        const mockedGet = jest
            .spyOn(bookService, "retrieveBooksFromEndpoint")
            .mockImplementation(() => Promise.resolve(mockBookResponse));

        const getBooksByAuthorResponse = bookService.getBooksByAuthor(testConfig);

        expect(mockedGet).toHaveBeenCalled();
        const data = await getBooksByAuthorResponse;
        expect(data).toEqual(expectedSuccessRes);
    });

    test('GET = getBooksByAuthor: when the getBooksByAuthor endpoint is NOT successfully hit, an error is returned', async () => {
        const bookService = new BookService();

        const expectedRes = {status: 500, message: 'Request failed, returned status of 500'};

        const mockedGet = jest
            .spyOn(bookService, "retrieveBooksFromEndpoint")
            .mockImplementation(() => {
                throw new ApiError([], 500)
            });

        const getBooksByAuthorResponse = bookService.getBooksByAuthor(testConfig);

        expect(mockedGet).toHaveBeenCalled();
        const data = await getBooksByAuthorResponse;
        expect(data).toEqual(expectedRes);
    });

    test('FORMAT = if status is 200 & format is json, the authors books are returned as an array', () => {
        const bookService = new BookService();

        expect(bookService.formatResponse(mockBookResponse)).toEqual(expectedSuccessRes);
    })

    test('FORMAT = if status is 200 & format is xml, the authors books are returned as a json', () => {
        const bookService = new BookService();

        const input = '<?xml version="1.0" encoding="UTF-8" ?>\n' +
            '<root>\n' +
            '    <data>\n' +
            '        <book>\n' +
            '            <title>Macbeth</title>\n' +
            '            <author>William Shakespeare</author>\n' +
            '            <isbn>123456789</isbn>\n' +
            '        </book>\n' +
            '        <stock>\n' +
            '            <quantity>2</quantity>\n' +
            '            <price>9.99</price>\n' +
            '        </stock>\n' +
            '    </data>\n' +
            '    <data>\n' +
            '        <book>\n' +
            '            <title>Richard II</title>\n' +
            '            <author>William Shakespeare</author>\n' +
            '            <isbn>123456780</isbn>\n' +
            '        </book>\n' +
            '        <stock>\n' +
            '            <quantity>9</quantity>\n' +
            '            <price>11.99</price>\n' +
            '        </stock>\n' +
            '    </data>\n' +
            '    <status>200</status>\n' +
            '</root>'

        expect(bookService.parseXml(input)).toEqual(expectedJsonRes);
    })
});