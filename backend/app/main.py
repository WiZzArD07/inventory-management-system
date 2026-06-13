from fastapi import FastAPI

from .database import engine
from .database import Base

from .routers import products

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Inventory Management API"
)

app.include_router(products.router)


@app.get("/")
def root():
    return {
        "message": "API Running"
    }