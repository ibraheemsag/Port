from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from .routers import pix, rec
import os

# Use port 80 directly in container to fix 405 errors
app = FastAPI()

# Update origins to include Azure Static Web App URL and allow any HTTP requests
origins = [
    "http://localhost:3000",
    "https://localhost:3000",
    "http://resume-frontend.azurestaticapps.net",
    "https://resume-frontend.azurestaticapps.net",
    "http://yellow-desert-0f9167403.6.azurestaticapps.net",
    "https://yellow-desert-0f9167403.6.azurestaticapps.net",
    # Add more origins if needed
]

# Add CORS middleware with proper configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods including OPTIONS
    allow_headers=["*"],
    max_age=86400,  # Cache preflight requests for 24 hours
)

app.include_router(pix.router)
app.include_router(rec.router)

@app.get("/")
def read_root():
    return {"message": "Hello from Azure Container Instance - API is running properly.", "status": "online"}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 80))
    uvicorn.run(app, host="0.0.0.0", port=port)