from fastapi import FastAPI

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

app.include_router(products.router)
app.include_router(customers.router)
app.include_router(orders.router)
app.include_router(dashboard.router)


@app.get("/")
def root():
    return {
        "message": "API Running"
    }