# Customer & Policy Management System

A full-stack application for managing customers and insurance policies.

## Tech Stack
- **Backend**: Node.js, Express, Prisma, SQLite
- **Frontend**: Next.js, Tailwind CSS

## Prerequisites
- Node.js (v18+)
- npm

## Setup Instructions

### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Initialize the database:
   ```bash
   npx prisma db push
   ```
4. Start the server:
   ```bash
   npm start
   ```
   The backend runs on `http://localhost:3001`.

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend runs on `http://localhost:3000`.

## Features
- **Customers**: Create, View List
- **Policies**: Create (linked to customer), View List, Search (by type, status, city)

## API Endpoints
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create a customer
- `GET /api/customers/:id/policies` - Get policies for a customer
- `POST /api/policies` - Create a policy
- `GET /api/policies/search` - Search policies with filters

