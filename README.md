# Library Management System

This project is a simple library management system designed to help users manage books, members, and borrowing records efficiently.

## Features

- Add, update, delete and borrow books

## Technology Stack

- **Node.js** for server-side JavaScript runtime
- **Express.js** as the web application framework
- **Mongoose** for MongoDB object modeling

## API Endpoints and Routes

The following API endpoints are available for interacting with the library management system:

Base URL: [https://library-management-five-lac.vercel.app/api](https://library-management-five-lac.vercel.app/api)

- `GET /books`  
- `POST /books`  
- `GET /books/:bookId`  
- `PUT /books/:bookId`  
- `DELETE /books/:bookId`  
- `POST /borrow`  
- `GET /borrow`

## Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/takbirgazi/l2b5-assignment-3
    ```
2. Navigate to the project directory:
    ```bash
    cd l2b5-assignment-3
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

4. Set up the database creatiantal in .env file

5. Run the application:
    ```bash
    npm run dev
    ```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements.