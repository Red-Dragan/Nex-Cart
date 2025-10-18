import React from "react";
import { Link } from "react-router";
import { useWishlist } from "../context/WishLIstContext";
import { useCart } from "../context/CartContext";
import { convertToINR, formatINR } from "../utils/currency";
import styles from "../styles/Wishlist.module.css";

const Wishlist: React.FC = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className={styles.emptyWishlist}>
        <div className={styles.emptyContent}>
          <svg
            className={styles.emptyIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <h2>Your Wishlist is Empty</h2>
          <p>Save your favorite items here!</p>
          <Link to="/" className={styles.shopNowBtn}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wishlistContainer}>
      {/* Header */}
      <div className={styles.wishlistHeader}>
        <h1>My Wishlist ({items.length} items)</h1>
      </div>

      {/* Wishlist Grid */}
      <div className={styles.wishlistGrid}>
        {items.map((item) => (
          <div key={item.id} className={styles.wishlistCard}>
            {/* Product Image */}
            <Link to={`/products/${item.id}`} className={styles.imageContainer}>
              <img src={item.thumbnail} alt={item.title} />
            </Link>

            {/* Product Info */}
            <div className={styles.productInfo}>
              <Link to={`/products/${item.id}`} className={styles.productTitle}>
                {item.title}
              </Link>
              <p className={styles.productPrice}>
                {formatINR(parseFloat(convertToINR(item.price)))}
              </p>
            </div>

            {/* Actions */}
            <div className={styles.actions} onClick={() => removeFromWishlist(item.id)}>
              <button
                onClick={() => addToCart({...item})}
                className={styles.addToCartBtn}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Move to Cart
              </button>

              <button
                onClick={() => removeFromWishlist(item.id)}
                className={styles.removeBtn}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
