# MERN Booking App

## Overview

This project is a full-stack booking application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to search for hotels based on various criteria such as destination, facilities, hotel types, star ratings, and price. The application includes features for user registration, authentication, and hotel search with filtering and pagination.

## Features

-   **User Authentication:** Secure user registration and login using JWT-based authentication.
-   **Hotel Search:** Advanced search functionality with filters for destination, facilities, hotel types, star ratings, and price.
-   **Dynamic Filtering:** Real-time filtering of search results based on user selections.
-   **Pagination:** Efficient data retrieval and display with pagination for large datasets.
-   **Responsive Design:** Fully responsive design that works seamlessly across different devices.
-   **Toast Notifications:** User-friendly toast notifications for providing feedback on actions.

## Technologies Used

-   **Frontend:**
    -   React: A JavaScript library for building user interfaces.
    -   TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
    -   Tailwind CSS: A utility-first CSS framework for rapid UI development.
    -   react-hook-form: For form validation and management.
    -   react-query: For efficient data fetching and state management.
    -   react-router-dom: For managing navigation within the application.
-   **Backend:**
    -   Node.js: An open-source, cross-platform JavaScript runtime environment.
    -   Express: A minimal and flexible Node.js web application framework.
    -   Mongoose: An elegant MongoDB object modeling tool for Node.js.
    -   jsonwebtoken: For creating and verifying JSON Web Tokens.
    -   bcryptjs: For hashing passwords.
-   **Database:**
    -   MongoDB: A NoSQL database.
-   **Testing:**
    -   Playwright: A framework for end-to-end testing.

## Setup Instructions

### Prerequisites

-   Node.js and npm installed
-   MongoDB installed and running

### Installation

1.  Clone the repository:

    ```sh
    git clone [repository URL]
    ```

2.  Navigate to the backend directory:

    ```sh
    cd backend
    ```

3.  Install backend dependencies:

    ```sh
    npm install
    ```

4.  Create a `.env` file in the backend directory and configure the following environment variables:

    ```
    MONGODB_CONNECTION_STRING=[Your MongoDB Connection String]
    JWT_SECRET_KEY=[Your JWT Secret Key]
    NODE_ENV=development
    ```

5.  Run the backend server:

    ```sh
    npm run dev
    ```

6.  Open a new terminal and navigate to the frontend directory:

    ```sh
    cd frontend
    ```

7.  Install frontend dependencies:

    ```sh
    npm install
    ```

8.  Create a `.env` file in the frontend directory and configure the following environment variables:

    ```
    VITE_API_BASE_URL=http://localhost:5000
    ```

9.  Run the frontend development server:

    ```sh
    npm run dev
    ```

## End-to-End Testing

1.  Navigate to the `e2e-tests` directory:

    ```sh
    cd e2e-tests
    ```

2.  Install the dependencies:

    ```sh
    npm install
    ```

3.  Run the tests:

    ```sh
    npx playwright test
    ```
