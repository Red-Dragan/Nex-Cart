import React from "react";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import { convertToINR, formatINR } from "../utils/currency";
import styles from "../styles/Cart.module.css";

const Cart: React.FC = () => {
  const { items, handleIncriment, handleDecrement, handleRemoveItem } = useCart();

  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className={styles.emptyCartContent}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={styles.emptyCartIcon}
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h2>Your Cart is Empty</h2>
          <p>Add some products to get started!</p>
          <Link to="/" className={styles.shopNowBtn}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      {/* Cart Header */}
      <div className={styles.cartHeader}>
        <h1>Shopping Cart</h1>
        <span className={styles.itemCount}>
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </span>
      </div>

      <div className={styles.cartLayout}>
        {/* Cart Items Section */}
        <div className={styles.cartItemsSection}>
          <Link to="/" className={styles.continueShoppingLink}>
            ← Continue Shopping
          </Link>

          <div className={styles.cartItems}>
            {items.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                {/* Product Image */}
                <Link to={`/products/${item.id}`} className={styles.itemImage}>
                  <img src={item.thumbnail} alt={item.title} />
                </Link>

                {/* Product Details */}
                <div className={styles.itemDetails}>
                  <Link
                    to={`/products/${item.id}`}
                    className={styles.itemTitle}
                  >
                    {item.title}
                  </Link>
                  <p className={styles.itemPrice}>
                    {formatINR(parseFloat(convertToINR(item.price * item.quantity)))}
                  </p>

                  {/* Quantity Controls */}
                  <div className={styles.quantityControl}>
                    <button className={styles.qtyBtn} disabled={item.quantity === 1} onClick={() => handleDecrement(item)}>-</button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button className={styles.qtyBtn} onClick={() => handleIncriment(item)}>+</button>
                  </div>
                </div>

                {/* Item Total */}
                <button className={styles.removeBtn} onClick={() => handleRemoveItem(item)}>Remove</button>
                {/* Remove Button */}
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className={styles.orderSummary}>
          <h2>Order Summary</h2>

          <div className={styles.summaryDetails}>
            <div className={styles.summaryRow}>
              <span>Subtotal ({totalItems} items)</span>
              <span>{formatINR(parseFloat(convertToINR(totalPrice)))}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span className={styles.freeShipping}>FREE</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Tax (GST 18%)</span>
              <span>
                {formatINR(parseFloat(convertToINR(totalPrice * 0.18)))}
              </span>
            </div>

            <div className={styles.summaryDivider}></div>

            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Total</span>
              <span>
                {formatINR(parseFloat(convertToINR(totalPrice * 1.18)))}
              </span>
            </div>
          </div>

          <button className={styles.checkoutBtn}>Proceed to Checkout</button>

          <div className={styles.paymentMethods}>
            <p>We accept</p>
            <div className={styles.paymentIcons}>
              <span>💳</span>
              <span>🏦</span>
              <span>📱</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
