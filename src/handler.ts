import {BookService} from "./service/BookService";
import {ApiConfig, url} from "./constants";

const client = new BookService();

const config: ApiConfig = {
    url: url,
    authorName: 'Shakespeare',
    limit: '10',
    format: 'json'
}

export const handler = async ():Promise<void> => {
    try {
        const booksByShakespeare = client.getBooksByAuthor(config);
    } catch (error) {
        console.log(error)
    }
}
