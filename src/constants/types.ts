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

type BookError = {
    message: string;
    status: number;
}


export {BookResponse, ApiBookResponse, ApiConfig, FormattedBook, BookError}