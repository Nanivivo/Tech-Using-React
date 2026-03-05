export default function CardComponent({
  id,
  title,
  image,
  price,
  rating,
  addToCart,
  toggleWishlist,
  isWishlisted
}) {

  return (
    <div className="card">

      <button
        className="wishlist-btn"
        onClick={() => toggleWishlist(id)}
      >
        {isWishlisted ? "❤️" : "🤍"}
      </button>

      <img src={image} className="product-img" />

      <h3 className="product-title">{title}</h3>

      <div className="rating">
        ⭐ {rating}
      </div>

      <div className="price">
        <span className="new">${price}</span>
      </div>

      <button
        className="cart-btn"
        onClick={()=>addToCart({id,title,image,price,rating})}
      >
        Add to Cart
      </button>

    </div>
  );
}