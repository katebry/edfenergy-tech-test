import {mockBookResponse} from '../mocks/mockBookResponse'
import {BookService} from "../service/BookService";
import {ApiConfig} from "../constants";

describe('Book Service', () => {

    const mockConfig: ApiConfig = {
        url: 'http://api.book-seller-example.com/by-author?q=',
        authorName: 'Shakespeare',
        limit: '10',
        format: 'json'
    }

    beforeEach(() => {
        jest.restoreAllMocks()
    })

    test('GET = getBooksByAuthor: when the getBooksByAuthor endpoint is successfully hit, a 200 status code is returned', async () => {
        const bookService = new BookService();

        const mockedGet = jest
            .spyOn(bookService, "getBooksByAuthor")
            .mockImplementation(() => Promise.resolve(mockBookResponse));

        const getBooksByAuthorResponse = bookService.getBooksByAuthor(mockConfig);

        expect(mockedGet).toHaveBeenCalled();
        expect(mockedGet).toHaveBeenCalledWith(mockConfig)
        const data = await getBooksByAuthorResponse
        expect(data.status).toBe(200)
    });

    test('FORMAT = if status is 200 & format is json, the authors books are returned as an array',  () => {
        const bookService = new BookService();

        const expectedRes = [
                {
                    "title": "Macbeth",
                    "author": "William Shakespeare",
                    "isbn": "123456789",
                    "quantity": "2",
                    "price": "9.99"
                },
                {
                    "title": "Richard II",
                    "author": "William Shakespeare",
                    "isbn": "123456780",
                    "quantity": "9",
                    "price": "11.99"
                }
            ]

        expect(bookService.formatResponse(mockBookResponse)).toEqual(expectedRes)
    })

    test('FORMAT = if status is 200 & format is xml, the authors books are returned as an array',  () => {
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

        const expectedRes = [
            {
                "title": "Macbeth",
                "author": "William Shakespeare",
                "isbn": "123456789",
                "quantity": "2",
                "price": "9.99"
            },
            {
                "title": "Richard II",
                "author": "William Shakespeare",
                "isbn": "123456780",
                "quantity": "9",
                "price": "11.99"
            }
        ]

        expect(bookService.parseXml(input)).toEqual(expectedRes)
    })
});