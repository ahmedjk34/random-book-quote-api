# Random Book Quote API

This project provides an API that returns random quotes from various books. It is designed to be simple and easy to use, making it perfect for integrating into your applications or websites.

## Features

- Fetch random book quotes
- Supports multiple authors and genres
- Easy to integrate with any application

## Getting Started

### Live Demo

You can try out the API live at the following URL:

[Random Book Quote API Live Demo](https://random-book-quote-api.ahmedtaher212005.workers.dev/quote/random)

### URL format

```
(https://random-book-quote-api.ahmedtaher212005.workers.dev/{parameters}?{query _if applicable_})
```

### API Endpoints

| Method | Endpoint      | Description                 | Query Parameters                                                                                 |
| ------ | ------------- | --------------------------- | ------------------------------------------------------------------------------------------------ |
| GET    | /quotes       | Returns all quotes          | `text`: Filter quotes by text. `author`: Filter quotes by author. `book`: Filter quotes by book. |
| GET    | /quote/today  | Returns today's quote       | None                                                                                             |
| GET    | /quote/random | Returns a random book quote | None                                                                                             |

Example response for **GET /quote/random**:

```json
{
	"quote": "To be, or not to be, that is the question.",
	"author": "William Shakespeare",
	"book": "Hamlet"
}
```

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/random-book-quote-api.git
   ```
2. Navigate to the project directory:
   ```sh
   cd random-book-quote-api
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

### Usage

1. Start the server:
   ```sh
   npm start
   ```
2. The API will be available at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, please contact [yourname@example.com](mailto:yourname@example.com).
