from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine
from .database import Base

from .routers import products
from .routers import customers
from .routers import orders
from .routers import dashboard


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Inventory Management API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(customers.router)
app.include_router(orders.router)
app.include_router(dashboard.router)


@app.get("/")
def root():
    return {
        "message": "API Running"
    }