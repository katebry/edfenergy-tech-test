import {BookService} from "../service/BookService";
import {ApiConfig} from "../constants";

describe('Handler - e2e flow', () => {

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

    test.skip('Happy path - JSON, returns array of authors books', async () => {

        const mockConfig: ApiConfig = {
            url: 'http://api.book-seller-example.com/by-author?q=',
            authorName: 'Shakespeare',
            limit: '10',
            format: 'json'
        }

        const client = new BookService();
        const booksByShakespeare = await client.getBooksByAuthor(mockConfig);
        expect(booksByShakespeare).toEqual(expectedRes)
    })

    test.skip('Unhappy path - JSON, returns an error', async () => {

        const mockConfig: ApiConfig = {
            url: 'http://api.book-seller-example.com/by-author?q=',
            authorName: 'Shakespeare',
            limit: '10',
            format: 'json'
        }

        const expectedFailRes = {status: 500, message: 'Request failed, returned status of 500'}

        const client = new BookService();
        const booksByShakespeare = await client.getBooksByAuthor(mockConfig);
        expect(booksByShakespeare).toEqual(expectedFailRes)
    })
})