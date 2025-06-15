This repository contains three separate tasks as part of the automation assessment. Below is a detailed explanation of each task.

## Task 1: UI Automation - E2E Flow
This task involves creating end-to-end tests for the Automation Exercise website using Playwright with TypeScript.

### Key Requirements:
- Target Website: https://www.automationexercise.com/
- Technology Stack:
  - TypeScript
  - Page Object Model (POM) design pattern
- Test Coverage:
  - Site navigation
  - Product search functionality
  - Add to cart operations
  - Checkout process simulation
- Implementation Guidelines:
  - Follow POM design pattern for better maintainability
  - Create reusable page objects
  - Implement proper test assertions
  - Handle dynamic elements and wait conditions

## Task 2: Database Operations - PostgreSQL
This task focuses on implementing CRUD operations using PostgreSQL database by creating DB locally on pgAdmin
### Key Requirements:
- Target Website: https://pgexercises.com/
- Database Connection:
  - Format: `postgres://postgres:5432@localhost:5432/mydatabase`
  - Ensure proper connection handling
- Implementation Guidelines:
  - Create (Insert) operations
  - Read (Select) operations
  - Update operations
  - Delete operations

## Task 3: API Integration - gRPC
This task involves implementing CRUD operations using gRPC protocol.

### Key Requirements:
- Target Endpoint: https://grpcb.in/
- Implementation Requirements:
  - Create operations
  - Read operations
  - Update operations
  - Delete operations
- Code Quality:
  - Clean and maintainable code structure
  - Proper error handling
  - Clear documentation
  - Easy to understand for team members
 


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
