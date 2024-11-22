class CustomError extends Error {
    httpStatusCode;
    timestamp;

    constructor(httpStatusCode: number = 500, message: string) {
        if (message) {
            super(message);
        } else {
            super('Internal Server Error');
        }

        // initializing the class properties
        this.httpStatusCode = httpStatusCode;
        this.timestamp = new Date().toISOString();

        // attaching a call stack to the current class,
        // preventing the constructor call to appear in the stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}

export default CustomError;
