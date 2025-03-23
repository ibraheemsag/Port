from fastapi import APIRouter

router = APIRouter()

@router.post("/rec")
def pix():
    return {"message": "Hello World"}