# Inventory Management System

A full-stack Inventory Management System built with FastAPI, React, PostgreSQL, and Docker.

## Features

### Product Management

* Create products
* Update products
* Delete products
* Unique SKU validation
* Stock quantity management

### Customer Management

* Create customers
* Delete customers
* Unique email validation
* Phone number validation

### Order Management

* Create orders
* Automatic inventory deduction
* Inventory validation
* Automatic total amount calculation

### Dashboard

* Total products count
* Total customers count
* Total orders count
* Low stock product monitoring

## Tech Stack

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* Pydantic

### Frontend

* React
* Vite
* React Router
* React Toastify

### DevOps

* Docker
* Docker Compose

## Project Structure

```plaintext
inventory-management-system/
│
├── backend/
│   ├── app/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

## API Endpoints

### Products

| Method | Endpoint       |
| ------ | -------------- |
| GET    | /products      |
| POST   | /products      |
| PUT    | /products/{id} |
| DELETE | /products/{id} |

### Customers

| Method | Endpoint        |
| ------ | --------------- |
| GET    | /customers      |
| POST   | /customers      |
| DELETE | /customers/{id} |

### Orders

| Method | Endpoint |
| ------ | -------- |
| GET    | /orders  |
| POST   | /orders  |

### Dashboard

| Method | Endpoint   |
| ------ | ---------- |
| GET    | /dashboard |

## Business Rules

* Product SKU must be unique
* Customer email must be unique
* Product quantity cannot be negative
* Orders cannot be created with insufficient inventory
* Creating an order automatically reduces stock
* Order total is calculated by the backend
* All APIs include validation and error handling

## Docker Setup

### Build and Run

```bash
docker compose up --build
```

### Access Application

Frontend:

```text
http://localhost:5173
```

Backend API:

```text
http://localhost:8000
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

## Environment Variables

Backend `.env`

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/inventory_db
```

## Screenshots

### Dashboard

(Add Screenshot)

### Products

(Add Screenshot)

### Customers

(Add Screenshot)

### Orders

(Add Screenshot)

## Future Improvements

* Authentication and Authorization
* Product Search and Filters
* Order History Analytics
* Export Reports
* Role-Based Access Control

## Author

Aryan Jaiswal
