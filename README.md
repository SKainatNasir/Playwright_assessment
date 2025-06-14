# Shipin Assessment Project

This project is an assessment solution that demonstrates end-to-end testing, gRPC server implementation, and database operations using Playwright, TypeScript, and PostgreSQL.

## Project Structure

├── config/                 # Configuration files
│   └── testData.ts        # Test data configuration
├── database/              # Database related files
├── grpc/                  # gRPC server implementation
├── pages/                 # Page object models
├── tests/                 # Test specifications
│   ├── e2e.spec.ts       # End-to-end tests
│   ├── grpc.spec.ts      # gRPC service tests
│   └── db-crud.spec.ts   # Database CRUD operation tests
├── playwright.config.ts   # Playwright configuration
├── package.json          # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration


## Project Components

### 1. End-to-End Testing
- Located in `tests/e2e.spec.ts`
- Tests complete user flows including login and payment processes
- Uses Playwright for browser automation

### 2. gRPC Server
- Located in `grpc/` directory
- Implements gRPC service endpoints
- Tested through `tests/grpc.spec.ts`

### 3. Database Operations
- Located in `database/` directory
- PostgreSQL database integration
- CRUD operations tested in `tests/db.spec.ts`

### 4. Configuration
- Test data configuration in `config/testData.ts`
- Environment variables for database connection
- Playwright configuration in `playwright.config.ts`

## Test Data
The project includes test data for:
- User login credentials
- Payment information
- Database test records



## Database Setup

The project uses a local PostgreSQL database managed through pgAdmin:

1. **Database Configuration**
   - Database Name: mydatabase
   - Host: localhost
   - Port: 5432 
   - Username: postgres
   - Password: 5432

2. **pgAdmin Setup**
   - Open pgAdmin 4
   - Create a new server connection if not already done
   - Create a new database for the project
   - The database schema will be automatically created when running the tests

3. **Connection String**
   Update your `.env` file with the following format:
   DATABASE_URL=postgres://postgres:5432@localhost:5432/mydatabase



## Best Practices Implemented

1. **Code Organization**
    - Clear directory structure
    - Separation of concerns
    - Modular code design

2. **Testing**
    - End-to-end testing
    - Service-level testing
    - Database operation testing
    - Page Object Model pattern

3. **Configuration Management**
    - Environment variables
    - Centralized test data
    - TypeScript configuration



## Commands used for Running Tests

# Run all tests
npx playwright test 

# Run specific test file for task 1 
npx playwright test tests/e2e.spec.ts --project=firefox  --headed 

# Run specific test file for task 2
npx playwright test tests/db.spec.ts --project=firefox

# Run specific test file for task 3
npx playwright test tests/grpc.spec.ts --project=firefox 

# To review the report of each test 
npx playwright show-report  


