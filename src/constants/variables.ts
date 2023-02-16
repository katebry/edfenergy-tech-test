const url = 'http://api.book-seller-example.com/by-author?q=';

const json = 'json';

const xml = 'xml';

const errorMessage = 'Request failed, returned status of';

const expectedSuccessRes = [
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

const expectedJsonRes = {"data": [{"book": {"author": "William Shakespeare", "isbn": "123456789", "title": "Macbeth"}, "stock": {"price": "9.99", "quantity": "2"}}, {"book": {"author": "William Shakespeare", "isbn": "123456780", "title": "Richard II"}, "stock": {"price": "11.99", "quantity": "9"}}], "status": "200"}

export {url, json, xml, errorMessage, expectedSuccessRes, expectedJsonRes}