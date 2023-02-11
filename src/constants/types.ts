type BookResponse = {
    title: string;
    author: string;
    isbn: string;
    quantity: string;
    price: string;
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

export {BookResponse, ApiBookResponse, ApiConfig}