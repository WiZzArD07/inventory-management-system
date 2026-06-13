const [products, setProducts] = useState([]);
const [name, setName] = useState("");
const [sku, setSku] = useState("");
const [price, setPrice] = useState("");
const [stock, setStock] = useState("");

const fetchProducts = async () => {

  const response = await api.get("/products");

  setProducts(response.data);
};

const addProduct = async () => {

  await api.post("/products", {
    name,
    sku,
    price: Number(price),
    stock_quantity: Number(stock)
  });

  fetchProducts();
};

const deleteProduct = async (id) => {

  await api.delete(`/products/${id}`);

  fetchProducts();
};

{products.map(product => (
  <div key={product.id}>

    <h4>{product.name}</h4>

    <p>SKU: {product.sku}</p>

    <p>Price: {product.price}</p>

    <p>Stock: {product.stock_quantity}</p>

    <button
      onClick={() => deleteProduct(product.id)}
    >
      Delete
    </button>

  </div>
))}