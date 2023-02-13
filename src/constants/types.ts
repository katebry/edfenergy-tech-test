type BookResponse = {
    book: {
        title: string;
        author: string;
        isbn: string;
    }
    stock: {
        quantity: string;
        price: string;
    }
}

type ApiBookResponse = {
    data: BookResponse[],
    status: number
}

type ApiConfig = {
    method?: string;
    url: string;
    authorName: string;
    limit: string;
    format: string;
}

type FormattedBook = {
    title: string;
    author: string;
    isbn: string;
    quantity: string;
    price: string;
}

type Error = {
    status: number;
    message: string;
}

export {BookResponse, ApiBookResponse, ApiConfig, FormattedBook, Error}