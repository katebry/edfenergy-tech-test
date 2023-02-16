import {ApiBookResponse} from "../constants";

export const mockBookResponse: ApiBookResponse = {
    "data": [
        {
            "book": {
                "title": "Macbeth",
                "author": "William Shakespeare",
                "isbn": "123456789",
            },
            "stock": {
                "quantity": "2",
                "price": "9.99"
            }
        },
        {
            "book": {
                "title": "Richard II",
                "author": "William Shakespeare",
                "isbn": "123456780",
            },
            "stock": {
                "quantity": "9",
                "price": "11.99"
            }
        }
    ],
    "status": 200
};
