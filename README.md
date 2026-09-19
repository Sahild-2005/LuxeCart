\# LuxeCart



LuxeCart is a full-stack e-commerce web application built as a technical assessment project.



The application provides a modern shopping experience for customers along with a secure admin dashboard for product management, authentication, and visual analytics.



\## Live Demo



\*\*Frontend:\*\*  

https://luxecart-two-eta.vercel.app



\*\*Backend API:\*\*  

https://luxecart-api-rxq7.onrender.com



\*\*API Base URL:\*\*  

https://luxecart-api-rxq7.onrender.com/api



\*\*GitHub Repository:\*\*  

https://github.com/Sahild-2005/LuxeCart



\---



\## Features



\### Customer Features



\- Modern responsive landing page

\- Product listing page

\- Product details page

\- Product images and information

\- Product categories

\- Responsive navigation

\- Direct product routing



\### Admin Features



\- Secure admin login

\- JWT-based authentication

\- Protected admin dashboard

\- Product creation

\- Product editing

\- Product deletion

\- Product statistics

\- Category-wise visual analytics

\- Admin logout

\- Protected backend APIs



\---



\## Tech Stack



\### Frontend



\- React.js

\- Vite

\- React Router

\- Axios

\- Recharts

\- CSS



\### Backend



\- Node.js

\- Express.js

\- JWT

\- bcryptjs

\- Mongoose



\### Database



\- MongoDB Atlas



\### Deployment



\- Vercel — Frontend

\- Render — Backend

\- MongoDB Atlas — Database



\---



\## Application Architecture



```text

&#x20;                   ┌─────────────────────┐

&#x20;                   │       User          │

&#x20;                   └──────────┬──────────┘

&#x20;                              │

&#x20;                              ▼

&#x20;                   ┌─────────────────────┐

&#x20;                   │   React + Vite      │

&#x20;                   │      Vercel         │

&#x20;                   └──────────┬──────────┘

&#x20;                              │

&#x20;                        REST API

&#x20;                              │

&#x20;                              ▼

&#x20;                   ┌─────────────────────┐

&#x20;                   │ Node.js + Express   │

&#x20;                   │       Render        │

&#x20;                   └──────────┬──────────┘

&#x20;                              │

&#x20;                          Mongoose

&#x20;                              │

&#x20;                              ▼

&#x20;                   ┌─────────────────────┐

&#x20;                   │   MongoDB Atlas     │

&#x20;                   └─────────────────────┘





&#x20;                   API Endpoints

Product APIs

Method	Endpoint	Description

GET	/api/products	Get all products

GET	/api/products/:id	Get product by ID

POST	/api/products	Create a product

PUT	/api/products/:id	Update a product

DELETE	/api/products/:id	Delete a product





Authentication

Method	Endpoint	Description

POST	/api/admin/login	Admin authentication





Dashboard

Method	Endpoint	Description

GET	/api/dashboard/stats	Get dashboard statistics





Admin product and dashboard operations are protected using JWT authentication.

Project Structure

LuxeCart/

│

├── client/

│   ├── public/

│   │   └── favicon.svg

│   │

│   ├── src/

│   │   ├── components/

│   │   │   ├── Navbar.jsx

│   │   │   ├── Footer.jsx

│   │   │   └── ProtectedRoute.jsx

│   │   │

│   │   ├── pages/

│   │   │   ├── Home.jsx

│   │   │   ├── Products.jsx

│   │   │   ├── ProductDetails.jsx

│   │   │   ├── AdminLogin.jsx

│   │   │   └── AdminDashboard.jsx

│   │   │

│   │   ├── App.jsx

│   │   └── main.jsx

│   │

│   ├── vercel.json

│   ├── index.html

│   └── package.json

│

├── server/

│   ├── config/

│   │   └── db.js

│   │

│   ├── middleware/

│   │   └── authMiddleware.js

│   │

│   ├── models/

│   │   ├── Admin.js

│   │   └── Product.js

│   │

│   ├── routes/

│   │   ├── adminRoutes.js

│   │   ├── dashboardRoutes.js

│   │   └── productRoutes.js

│   │

│   ├── createAdmin.js

│   ├── server.js

│   └── package.json

│

├── .gitignore

└── README.md

Local Development

Prerequisites

Make sure you have installed:

\- Node.js

\- npm

\- MongoDB Atlas account or local MongoDB

1\. Clone the Repository

git clone https://github.com/Sahild-2005/LuxeCart.git

cd LuxeCart

2\. Install Backend Dependencies

cd server

npm install

3\. Configure Backend Environment Variables

Create a .env file inside the server directory:

MONGO\_URI=your\_mongodb\_connection\_string

JWT\_SECRET=your\_jwt\_secret

PORT=5000

Do not commit this file to GitHub.

4\. Start the Backend

npm run dev

The backend will run on:

http://localhost:5000

5\. Install Frontend Dependencies

Open a new terminal:

cd client

npm install

6\. Configure Frontend Environment Variables

Create:

client/.env

Add:

VITE\_API\_URL=http://localhost:5000/api

7\. Start the Frontend

npm run dev

The frontend will be available at the local Vite development URL shown in the terminal.

Environment Variables

Client

VITE\_API\_URL=http://localhost:5000/api

Server

MONGO\_URI=your\_mongodb\_connection\_string

JWT\_SECRET=your\_jwt\_secret

PORT=5000

Security

Environment files and credentials should never be committed to the repository.

The production environment variables are configured separately in the deployment platforms.

Authentication

LuxeCart uses JWT-based authentication for the admin dashboard.

The authentication flow is:

Admin Login

&#x20;    ↓

Email + Password

&#x20;    ↓

Backend Verification

&#x20;    ↓

bcrypt Password Comparison

&#x20;    ↓

JWT Token Generation

&#x20;    ↓

Token Stored on Client

&#x20;    ↓

Protected Admin Dashboard

Protected backend operations require a valid JWT token.

Dashboard Analytics

The admin dashboard provides visual insights into the product catalog, including:

\- Total product statistics

\- Category-based product distribution

\- Product management overview

Charts are implemented using Recharts.

Deployment

LuxeCart is deployed using the following architecture:

Frontend

&#x20;   ↓

Vercel



Backend

&#x20;   ↓

Render



Database

&#x20;   ↓

MongoDB Atlas

Production URLs

Frontend

https://luxecart-two-eta.vercel.app

Backend

https://luxecart-api-rxq7.onrender.com

Security Considerations

\- Passwords are hashed using bcryptjs.

\- Admin APIs are protected using JWT authentication.

\- Sensitive environment variables are stored outside the source code.

\- .env files are excluded through .gitignore.

\- Admin routes are protected on both frontend and backend.

\- Production database credentials are not stored in the repository.

Future Improvements

Potential future enhancements include:

\- Shopping cart functionality

\- User authentication

\- Order management

\- Payment gateway integration

\- Product search and filtering

\- Wishlist functionality

\- Pagination

\- Advanced sales analytics

\- Image upload using cloud storage

Author

Sahil Dhumal

B.E. Computer Engineering

GitHub:

https://github.com/Sahild-2005





