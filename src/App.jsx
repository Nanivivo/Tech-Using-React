import CardComponent from "./Component/Card";
import { products } from "./array";
import "./Component/card.css";
import { useEffect, useState } from "react";
import CartDrawer from "./Component/CartDrawer";

export default function App() {

  const brands = ["All", ...new Set(products.map(p => p.brand))];

  const [cartItems, setCartItems] = useState(
      ()=>{
             const savedItem= localStorage.getItem("techstore-item");
             if(savedItem){
                   try {
                             return JSON.parse(savedItem);
                   } catch (error) {
                         console.log("problem!!",error);
                   }
             }
             return [];
      }
  );

  useEffect(
    ()=>{
            localStorage.setItem("techstore-item",JSON.stringify(cartItems));
    },[cartItems]
  );
  const [wishlistItems, setWishlistItems] = useState(()=>{
    const whishlist=localStorage.getItem("wishlist")
              if(whishlist){
                 try{
                   return JSON.parse(whishlist);
              }
              catch(error){
                   console.log("problem!!!",error);
              }
            }
              return [];
  }
  );
  useEffect(()=>{
        localStorage.setItem("wishlist",JSON.stringify(wishlistItems));

  },[wishlistItems]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  function addToCart(product) {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const wishlistCount = wishlistItems.length;

  function toggleWishlist(productId) {
    if (wishlistItems.includes(productId)) {
      setWishlistItems(wishlistItems.filter(id => id !== productId));
    } else {
      setWishlistItems([...wishlistItems, productId]);
    }
  }

  let filteredProducts = products.filter(product => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesBrand =
      selectedBrand === "All" || product.brand === selectedBrand;

    return matchesSearch && matchesBrand;
  });

  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "name") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  return (
    <div className={`website ${darkMode ? "dark-theme" : "light-theme"}`}>

      {/* NAVBAR */}
      <nav className="navbar">

        <h2 className="logo">TechStore</h2>

        <ul className="nav-links">
          <li>Products</li>
          <li>Deals</li>
          <li>Support</li>
          <li>About</li>
        </ul>

        <div className="nav-icons">
         <label className="theme-switch">
  <input
    type="checkbox"
    checked={darkMode}
    onChange={() => setDarkMode(!darkMode)}
  />
  <span className="slider"></span>
</label>

          <div className="wishlist-info">
            ❤️ {wishlistCount}
          </div>

          <div className="cart-info" onClick={() => setCartOpen(true)}>
            🛒 {cartCount}
          </div>

        </div>

      </nav>

      {/* PRODUCTS */}
      <section className="products-section">

        <h2 className="section-title">Best Sellers</h2>

        {/* FILTER BAR */}
        <div className="filters">

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />

          <select
            value={selectedBrand}
            onChange={(e)=>setSelectedBrand(e.target.value)}
          >
            {brands.map((brand,index)=>(
              <option key={index}>{brand}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e)=>setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="price-low">Price Low → High</option>
            <option value="price-high">Price High → Low</option>
            <option value="rating">Rating</option>
            <option value="name">Name</option>
          </select>

        </div>

        <div className="cart-summary">
          Cart: {cartCount} items | Total: ${cartTotal}
        </div>

        {/* PRODUCTS GRID */}
        <div className="products-grid">

          {filteredProducts.map(product => (

            <CardComponent
              key={product.id}
              {...product}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              isWishlisted={wishlistItems.includes(product.id)}
            />

          ))}

        </div>

      </section>

      {/* CART DRAWER */}
      <CartDrawer
        cartItems={cartItems}
        isOpen={cartOpen}
        closeCart={() => setCartOpen(false)}
      />

    </div>
  );
}