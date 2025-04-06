# Resume Project

## Project Overview

This project is a web application with a React frontend and FastAPI backend. It features a recommendation system and image processing capabilities, containerized with Docker for easy deployment.

## Table of Contents

- [Architecture](#architecture)
- [Frontend](#frontend)
- [Backend](#backend)
- [Deployment](#deployment)
- [Azure Deployment](#azure-deployment)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Contributors](#contributors)

## Architecture

The application follows a microservices architecture with:

- **Frontend**: React-based web application
- **Backend**: FastAPI REST API
- **Docker**: Containerization for both frontend and backend services

## Frontend

The frontend is built with React and provides a user interface for interacting with the backend services.

### Tech Stack

- React.js
- React Router for navigation
- Styled Components for styling
- Web Vitals for performance monitoring

### Key Directories

- `/src/components`: Reusable UI components
- `/src/pages`: Page components for different routes
- `/src/services`: API client services for backend communication
- `/src/hooks`: Custom React hooks
- `/src/utils`: Utility functions
- `/src/assets`: Static assets like images and icons

### Scripts

- `npm start`: Start the development server
- `npm build`: Build the production-ready application
- `npm test`: Run tests
- `npm eject`: Eject from Create React App

## Backend

The backend is built with FastAPI, a modern, fast web framework for building APIs with Python.

### Tech Stack

- FastAPI
- Uvicorn ASGI server
- Anthropic and OpenAI for AI capabilities
- Pillow for image processing
- Python-dotenv for environment management

### Key Directories

- `/app/routers`: API route definitions
- `/app/services`: Business logic services
- `/app/config.py`: Application configuration
- `/app/main.py`: Application entry point

### Endpoints

- `/`: Root endpoint that returns a health check message
- Additional endpoints for recommendation system and image processing

## Deployment

The application is containerized using Docker for easy deployment:

```bash
# Using docker-compose
docker-compose up

# Deploying individually
cd backend && docker build -t resume-backend .
docker run -p 8000:8000 resume-backend

cd frontend && docker build -t resume-frontend .
docker run -p 3000:3000 resume-frontend
```

## Azure Deployment

This application is deployed using Azure cloud services:

### Architecture

- **Frontend**: Azure Static Web Apps
- **Backend**: Azure Container Instances
- **CI/CD**: GitHub Actions workflow for automated deployments

### Setup Steps

1. **Frontend deployment (Azure Static Web Apps)**
   - The frontend is deployed using Azure Static Web Apps
   - Configuration in `staticwebapp.config.json` handles routing and CORS settings
   - The app is accessible at `https://resume-frontend.azurestaticapps.net` or `https://yellow-desert-0f9167403.6.azurestaticapps.net`

2. **Backend deployment (Azure Container Instances)**
   - The backend API is containerized and deployed to Azure Container Instances
   - The container is configured to run on port 80 in production

3. **Environment Configuration**
   - Production environment variables are set in Azure portal for both services
   - For the frontend, `.env.production` configures production settings

### GitHub Actions Workflow

The application uses GitHub Actions for CI/CD:
- Automatic builds on push to main branch
- Automated testing before deployment
- Separate workflows for frontend and backend deployment
- Environment variables are stored as GitHub Secrets

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd resume
   ```

2. **Set up environment variables**
   ```bash
   # For backend
   cp backend/.env.example backend/.env
   # For frontend
   cp frontend/.env.example frontend/.env
   ```

3. **Run with Docker Compose**
   ```bash
   docker-compose up
   ```

4. **Or run individually**
   ```bash
   # Backend
   cd backend
   pip install -r requirements.txt
   uvicorn app.main:app --reload

   # Frontend
   cd frontend
   npm install
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## Environment Variables

### Backend (.env)

Required environment variables for backend configuration:

- API keys for external services
- Database connection details
- Application configuration

### Frontend (.env)

- `REACT_APP_API_URL`: Backend API URL

## API Documentation

Once the backend is running, you can access the API documentation at:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Contributors

- [Your Name](your-profile-link)

## License

[Specify your license here] 