import { ApiBookResponse} from "../constants/types";

export const mockBookResponse: ApiBookResponse = {
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