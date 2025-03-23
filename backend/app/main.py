from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from .routers import pix, rec
import os

# Use port 80 directly in container to fix 405 errors
app = FastAPI()

# Update origins to include Azure Static Web App URL
origins = [
    "http://localhost:3000",
    "https://resume-frontend.azurestaticapps.net",  # Add your Azure Static Web App URL
    "https://yellow-desert-0f9167403.6.azurestaticapps.net"  # Add the current deployment URL
]

app.include_router(pix.router)
app.include_router(rec.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from Azure Container Instance - API is running properly.", "status": "online"}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 80))
    uvicorn.run(app, host="0.0.0.0", port=port)