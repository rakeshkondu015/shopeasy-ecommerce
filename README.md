# 🛒 EasyCart – Full Stack E-Commerce Platform

A simple full-stack e-commerce application with two roles:
- **Admin** – Full CRUD on products, view and delete users
- **User** – Browse products, add to cart, manage cart

---

## 🗂 Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Backend   | Spring Boot 3, Java 17  |
| Database  | MySQL 8                 |
| Security  | Spring Security + JWT   |
| Frontend  | React 18, React Router  |
| HTTP      | Axios                   |

---

## ⚙️ Backend Setup

### 1. Create MySQL Database
```sql
CREATE DATABASE ecommerce_db;
```

### 2. Configure `application.properties`
Edit `ecommerce-backend/src/main/resources/application.properties`:
```properties
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### 3. Run the Backend
```bash
cd ecommerce-backend
mvn spring-boot:run
```
Backend runs on **http://localhost:8080**

---

## 💻 Frontend Setup

### 1. Install dependencies
```bash
cd ecommerce-frontend
npm install
```

### 2. Start React app
```bash
npm start
```
Frontend runs on **http://localhost:3000**

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint             | Access  |
|--------|----------------------|---------|
| POST   | /api/auth/register   | Public  |
| POST   | /api/auth/login      | Public  |

### Products
| Method | Endpoint                        | Access  |
|--------|---------------------------------|---------|
| GET    | /api/products/all               | Public  |
| GET    | /api/products/{id}              | Public  |
| GET    | /api/products/search?name=xxx   | Public  |
| GET    | /api/products/category/{cat}    | Public  |

### Admin (requires ADMIN role)
| Method | Endpoint                | Access |
|--------|-------------------------|--------|
| POST   | /api/admin/products     | Admin  |
| PUT    | /api/admin/products/{id}| Admin  |
| DELETE | /api/admin/products/{id}| Admin  |
| GET    | /api/admin/users        | Admin  |
| DELETE | /api/admin/users/{id}   | Admin  |

### Cart (requires USER or ADMIN role)
| Method | Endpoint            | Access         |
|--------|---------------------|----------------|
| GET    | /api/cart           | Authenticated  |
| POST   | /api/cart/add       | Authenticated  |
| PUT    | /api/cart/{id}      | Authenticated  |
| DELETE | /api/cart/{id}      | Authenticated  |
| DELETE | /api/cart/clear     | Authenticated  |

---

## 👤 Default Test Accounts

Register via `/register` in the UI and choose role:
- Select **Admin** to get full CRUD access
- Select **User** to browse and add to cart

---

## 📁 Project Structure

```
ecommerce-project/
├── ecommerce-backend/          ← Spring Boot
│   └── src/main/java/com/ecommerce/
│       ├── controller/         ← REST Controllers
│       ├── service/            ← Business Logic
│       ├── repository/         ← JPA Repositories
│       ├── model/              ← JPA Entities
│       ├── dto/                ← Data Transfer Objects
│       └── config/             ← Security & JWT
│
└── ecommerce-frontend/         ← React App
    └── src/
        ├── pages/              ← Login, Register, Products, Cart, Admin
        ├── components/         ← Navbar
        ├── context/            ← AuthContext (global state)
        └── services/           ← Axios API calls
```
