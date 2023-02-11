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

    test('GET = getBooksByAuthor: when the getBooksByAuthor endpoint is called, a list of books are returned', async () => {
        const bookService = new BookService();

        const expectedRes = {
            "data": [
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
            ],
            "status": 200
        };

        const mockedGet = jest
            .spyOn(bookService, "getBooksByAuthor")
            .mockImplementation(() => Promise.resolve(mockBookResponse));

        const getBooksByAuthorResponse = bookService.getBooksByAuthor(mockConfig);

        expect(mockedGet).toHaveBeenCalled();
        expect(mockedGet).toHaveBeenCalledWith(mockConfig)
        await expect(getBooksByAuthorResponse).resolves.toEqual(expectedRes);
    });
});