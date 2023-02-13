import {BookService} from "../service/BookService";

const client = new BookService();
const booksByShakespear = client.getBooksByAuthor("Shakespear", 10);
