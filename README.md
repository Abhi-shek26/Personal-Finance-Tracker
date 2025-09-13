# ![Personal Finance Tracker](https://img.shields.io/badge/Project-PersonalFinanceTracker-blue)

A full-stack **MERN application** to track personal income and expenses, visualize spending patterns, and manage transactions securely with authentication.  

**Live Demo:** [Frontend on Vercel](https://personal-finance-tracker-ashen-three.vercel.app/)  

---

## Features

-   **User Authentication:** Secure user registration and login system using JWT (JSON Web Tokens) for stateless authentication.
-   **Transaction Management:** Full CRUD (Create, Read, Update, Delete) functionality for financial transactions.
-   **Data Filtering:** Easily filter transactions to view all, only income, or only expenses.
-   **Data Visualization:** An interactive doughnut chart provides a clear breakdown of expenses by category.
-   **Data Isolation:** Each user can only view and manage their own financial data, ensuring privacy and security.
-   **Responsive Design:** A clean, modern UI built with Tailwind CSS that is fully responsive and works beautifully on desktop and mobile devices.
-   **Error Handling:** A well formatted form of error handling is done for every steps from login/signup to adding transactions details.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, Axios, Chart.js |
| Backend  | Node.js, Express.js, MongoDB, Mongoose |
| Deployment | Vercel (frontend), Render (backend) |
| Auth | JWT, localStorage |
| Styling |  TailwindCSS |

---

## Screenshots

**Login Page**

<img width="519" height="521" alt="image" src="https://github.com/user-attachments/assets/aedb15b6-a762-4f4d-a54c-01e09ea1f762" />


**Signup Page**

<img width="589" height="681" alt="image" src="https://github.com/user-attachments/assets/4b45ff24-fa65-49dc-bb9c-f36fc6da2423" />


**Dashboard Example**  

<img width="765" height="564" alt="image" src="https://github.com/user-attachments/assets/c5e5b1ef-f529-4a06-a0f9-267c6881b8d3" />


**Transaction Form** 

 <img width="350" height="381" alt="image" src="https://github.com/user-attachments/assets/621891d2-f8dd-4285-a5f0-4cb289f79863" />

---

## Deployment

This application is deployed with a modern, separated architecture for optimal performance and scalability:
-   **Frontend:** Deployed as a static site on **Netlify**.
-   **Backend:** Deployed as a web service on **Render**.

---

```
## Folder Structure
/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/   # Reusable React components (TransactionForm, ExpenseChart)
│   │   ├── context/      # React Context for global state (AuthContext)
│   │   ├── hooks/        # Custom hooks (useLogin, useSignup, etc.)
│   │   ├── pages/        # Page components (Home, Login, Signup)
│   │   └── utils/        # Utility functions (axios API instance)
│   ├── .env              # Frontend environment variables (VITE_API_URL)
│   └── package.json      # Frontend dependencies
│
└── server/
    ├── controllers/    # Logic for handling requests (userController, transactionController)
    ├── middleware/     # Custom middleware (requireAuth)
    ├── models/         # Mongoose schemas (User.js, Transaction.js)
    ├── routes/         # API route definitions (user.js, transaction.js)
    ├── utils/          # Backend utility functions (handleErrors)
    ├── .env            # Backend environment variables (MONGO_URI, SECRET)
    └── server.js       # Main Express server entry point

```

## API Endpoints

### User Routes

| Method | Endpoint         | Description                   |
| :----- | :--------------- | :---------------------------- |
| `POST` | /api/user/signup | Register a new user           |
| `POST` | /api/user/login  | Authenticate a user and get a token |

### Transaction Routes

*All transaction routes require a valid JWT token in the `Authorization: Bearer <token>` header.*

| Method   | Endpoint               | Description                           |
| :------- | :--------------------- | :------------------------------------ |
| `GET`    | /api/transactions      | Fetch all transactions for the logged-in user |
| `POST`   | /api/transactions      | Create a new transaction              |
| `GET`    | /api/transactions/:id  | Fetch a single transaction by ID      |
| `PUT`    | /api/transactions/:id  | Update an existing transaction        |
| `DELETE` | /api/transactions/:id  | Delete a transaction                  |



## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

-   Node.js (v18.x or later)
-   npm (v9.x or later)
-   A MongoDB Atlas account or a local MongoDB installation.

### Installation & Setup

1.  **Clone the repository:**
    ```
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    
    ```

2.  **Install backend dependencies** from the root directory:
    ```
    npm install
    
    ```

3.  **Install frontend dependencies:**
    ```
    cd client
    npm install
    cd ..
    
    ```

4.  **Configure Backend Environment:**
    -   In the `server` directory, create a file named `.env`.
    -   Add your MongoDB connection string and a secret key for JWT:
        ```
        MONGO_URI=your_mongodb_connection_string
        SECRET=your_super_secret_jwt_key_of_at_least_32_characters
        
        ```

5.  **Configure Frontend Environment:**
    -   In the `client` directory, create a file named `.env`.
    -   Add the URL for your local backend server:
        ```
        VITE_API_URL=http://localhost:5000
        
        ```

### Running the Application

From the **root directory**, run the development script. This will start both the frontend and backend servers at the same time.

```
npm run dev

```

-   The backend API will be running on `http://localhost:5000`.
-   The frontend React application will be available at `http://localhost:5173`.

## Deployment

The application is configured for a separated deployment:

-   **Backend (Render):** The Express server is deployed as a Web Service on Render. The `start` script in the root `package.json` is used to run the server. Environment variables (`MONGO_URI`, `SECRET`) must be set in the Render dashboard.

-   **Frontend (Netlify/Vercel):** The React client is deployed as a static site.
    -   **Base directory:** `client`
    -   **Build command:** `npm run build`
    -   **Publish directory:** `client/dist`
    -   **Environment Variable:** `VITE_API_URL` must be set to the live URL of the deployed backend on Render.
    -   **CORS:** The backend's CORS policy must be updated to allow requests from the live frontend domain.
