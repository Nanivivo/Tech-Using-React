export default function CartDrawer({ cartItems, isOpen, closeCart }) {

  // OVERALL TOTAL OF ALL ITEMS
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="cart-overlay" onClick={closeCart}></div>
      )}

      {/* Drawer */}
      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>

        {/* Header */}
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button onClick={closeCart}>✖</button>
        </div>

        {/* Cart Items */}
        <div className="cart-items">

          {cartItems.length === 0 && (
            <p className="empty-cart">Cart is empty</p>
          )}

          {cartItems.map((item) => {

            // subtotal per item
            const subTotal = item.price * item.quantity;

            return (
              <div key={item.id} className="cart-item">

                <img src={item.image} className="cart-img" />

                <div className="cart-info-box">
                  <h4>{item.title}</h4>

                  <p>Price: ${item.price}</p>

                  <p>Quantity: {item.quantity}</p>

                  <p className="item-subtotal">
                    Subtotal: ${subTotal}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

        {/* TOTAL PRICE */}
        <div className="cart-footer">
          <h3>Total Price: ${total}</h3>
        </div>

      </div>
    </>
  );
}