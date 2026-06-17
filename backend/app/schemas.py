from pydantic import BaseModel, Field
from pydantic import EmailStr
from pydantic import Field

class ProductCreate(BaseModel):

    name: str = Field(min_length=2, max_length=100)

    sku: str = Field(min_length=2, max_length=20)

    price: float = Field(gt=0)

    stock_quantity: int = Field(ge=0)


class ProductResponse(BaseModel):

    id: int
    name: str
    sku: str
    price: float
    stock_quantity: int

    class Config:
        from_attributes = True

class ProductUpdate(BaseModel):
    name: str
    sku: str
    price: float = Field(gt=0)
    stock_quantity: int = Field(ge=0)

class CustomerCreate(BaseModel):

    full_name: str = Field(min_length=2)

    email: EmailStr = Field(max_length=15)

    phone: str = Field(min_length=10, max_length=15)

class CustomerResponse(BaseModel):

    id: int

    full_name: str

    email: str

    phone: str

    class Config:
        from_attributes = True

class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int = Field(gt=0)

class OrderCreate(BaseModel):
    customer_id: int
    items: list[OrderItemCreate]