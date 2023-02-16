class ApiError implements Error {
    constructor(data, status) {
        this.response = {
            data, status
        };
        this.message = "";
        this.name = "";
    }

    response: {
        data: [];
        status: number;
    }
    message: string;
    name: string;
}

export {ApiError}