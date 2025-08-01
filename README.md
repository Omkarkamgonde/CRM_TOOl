# CRM (Customer Relationship Management) System

A full-fledged CRM tool built with Spring Boot, MySQL, and React.js.

## Project Overview

This CRM system helps businesses manage their customer relationships by tracking leads, opportunities, quotations, and conversions. It provides a comprehensive solution for sales teams to manage their customer pipeline effectively.

## Technology Stack

### Backend
- **Java**: Programming language
- **Spring Boot**: Backend web framework
- **Spring Security**: Authentication and authorization
- **Hibernate**: ORM for database operations
- **MySQL**: Relational database

### Frontend
- **React.js**: Frontend library
- **Bootstrap 5**: UI components
- **Axios**: HTTP client for API requests

### Development Tools
- **Maven**: Dependency management
- **Git**: Version control
- **Postman**: API testing

## Features

### Authentication Module
- User registration and login
- JWT-based authentication
- Role-based authorization (User and Admin roles)

### Dashboard with Navigation Bar
- Sections: Lead, Opportunity, Quotation, and Converted
- Each section shows the lead table with dynamic updates

### Lead Management
- Create, read, update, and delete leads
- Search leads by organization name, person name, location, etc.
- Auto-generated lead IDs (e.g., LEAD001)

### Opportunity Management
- Create opportunities for leads
- Track opportunity status (Active, Quotation, Converted)
- View all opportunities for a specific lead

### Quotation Management
- Create quotations for opportunities
- Update opportunity status to Quotation
- Track quotation date

### Conversion Management
- Convert opportunities to sales
- Update opportunity status to Converted
- Track conversion date

## Database Configuration

- **Database Name**: newcrm
- **Username**: root
- 

## Getting Started

### Prerequisites

- Java 11 or higher
- Maven
- MySQL
- Node.js and npm

### Backend Setup

1. Clone the repository
2. Navigate to the project directory
3. Configure the database in `application.properties`
4. Run the Spring Boot application:
   ```
   mvn spring-boot:run
   ```

### Frontend Setup

1. Navigate to the frontend directory
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React development server:
   ```
   npm start
   ```

## API Endpoints

### Authentication
- POST /api/auth/signin - Login
- POST /api/auth/signup - Register

### Leads
- GET /api/leads - Get all leads
- GET /api/leads/{id} - Get lead by ID
- POST /api/leads - Create a new lead
- PUT /api/leads/{id} - Update a lead
- DELETE /api/leads/{id} - Delete a lead
- GET /api/leads/search - Search leads

### Opportunities
- GET /api/opportunities - Get all opportunities
- GET /api/opportunities/{id} - Get opportunity by ID
- GET /api/opportunities/lead/{leadId} - Get opportunities by lead ID
- GET /api/opportunities/status/{status} - Get opportunities by status
- POST /api/opportunities - Create a new opportunity
- PUT /api/opportunities/{id} - Update an opportunity
- PUT /api/opportunities/{id}/quotation - Create quotation for an opportunity
- PUT /api/opportunities/{id}/convert - Convert an opportunity
- DELETE /api/opportunities/{id} - Delete an opportunity
