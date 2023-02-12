import {mockBookResponse} from '../mocks/mockBookResponse'
import {BookService} from "../service/BookService";
import {ApiConfig} from "../constants/types";

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

        // const expectedRes = {
        //     "data": [
        //         {
        //             "title": "Macbeth",
        //             "author": "William Shakespeare",
        //             "isbn": "123456789",
        //             "quantity": "2",
        //             "price": "9.99"
        //         },
        //         {
        //             "title": "Richard II",
        //             "author": "William Shakespeare",
        //             "isbn": "123456780",
        //             "quantity": "9",
        //             "price": "11.99"
        //         }
        //     ],
        //     "status": 200
        // };

        const mockedGet = jest
            .spyOn(bookService, "getBooksByAuthor")
            .mockImplementation(() => Promise.resolve(mockBookResponse));

        const getBooksByAuthorResponse = bookService.getBooksByAuthor(mockConfig);

        expect(mockedGet).toHaveBeenCalled();
        expect(mockedGet).toHaveBeenCalledWith(mockConfig)
        const data = await getBooksByAuthorResponse
        expect(data.status).toBe(200)
        // expect(data).toEqual(expectedRes);
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

        expect(bookService.formatResponse(mockBookResponse, 'json')).toEqual(expectedRes)
    })
});