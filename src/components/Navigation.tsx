import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import NavDropdown from "./NavDropdown";
import { useNavDropdown } from "../hooks/useDropdown";
import styles from "../styles/Navigation.module.css";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishLIstContext";

const Navigation: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.reduce((total, item) => total + item.quantity, 0);

  const {
    activeDropdown,
    categories,
    fetchCategoryProducts,
    handleMouseEnter,
    handleMouseLeave,
  } = useNavDropdown();

  const navLinks = [
    "Beauty",
    "Women",
    "Men",
    "Electronics",
    "Living",
    "Sports",
    "Accessories",
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search/${searchQuery}`);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo Section */}
        <Link className={styles.logo} to={"/"}>
          <svg
            width="53"
            height="36"
            viewBox="0 0 53 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 2L3.5 32H9.5L13.5 20L18.5 32H24.5L19.5 12L22.5 2H13.5Z"
              fill="#FF3F6C"
            />
            <path
              d="M37.5 2L27.5 32H33.5L37.5 20L42.5 32H48.5L43.5 12L46.5 2H37.5Z"
              fill="#FF3F6C"
            />
          </svg>
        </Link>

        {/* Navigation Links */}
        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <NavDropdown
              key={link}
              categoryName={link}
              categoryData={categories[link]}
              isActive={activeDropdown === link}
              onMouseEnter={() => handleMouseEnter(link)}
              onMouseLeave={handleMouseLeave}
              onFetchProducts={fetchCategoryProducts}
            />
          ))}
        </ul>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <svg
              className={styles.searchIcon}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke="#696b79"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 21L16.65 16.65"
                stroke="#696b79"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </form>
        </div>

        {/* User Actions */}
        <div className={styles.actions}>
          <button className={styles.actionItem}>
            <Link className={styles.actionText} to="/profile">
              Profile
            </Link>
          </button>
          <button className={styles.actionItem}>
            <Link className={styles.actionText} to="/wishlist">
              Wishlist
              {wishlistCount > 0 && (
                <span className={styles.cartBadge}>{wishlistCount}</span>
              )}
            </Link>
          </button>
          <button className={styles.actionItem}>
            <Link className={styles.actionText} to="/cart">
              Bag
              {cartCount > 0 && (
                <span className={styles.cartBadge}>{cartCount}</span>
              )}
            </Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
