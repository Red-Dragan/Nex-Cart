import React, { useState } from "react";
import { type LoaderFunctionArgs, useLoaderData } from "react-router";
import { convertToINR, formatINR } from "../utils/currency";
import { useCart } from "../context/CartContext";
import styles from "../styles/ProductDetails.module.css";
import { useWishlist } from "../context/WishLIstContext";

interface Review {
  rating: number;
  comment: string;
  reviewerName: string;
  reviewerEmail: string;
  date: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  thumbnail: string;
  images: string[];
}

export async function productLoader({ params }: LoaderFunctionArgs) {
  const response = await fetch(`https://dummyjson.com/products/${params.id}`);

  if (!response.ok) {
    throw new Response("Product Not Found", { status: 404 });
  }

  return await response.json();
}

const Products: React.FC = () => {
  const product = useLoaderData() as Product;
  const [selectedImage, setSelectedImage] = useState<string>(product.thumbnail);
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();
  const { addToWish, removeFromWishlist, isInWishlist } = useWishlist();

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase" && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const discountedPrice = product.price;
  const originalPrice = product.discountPercentage > 0 ? product.price / (1 - product.discountPercentage / 100): product.price;

  const inWishlist = isInWishlist(product.id);

  const toggleWishlistItem = (product: Product) => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWish({
        id: product.id,
        price: product.price,
        title: product.title,
        quantity: 1,
        thumbnail: product.thumbnail,
      });
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.productContainer}>
        <div className={styles.imageSection}>
          <div className={styles.mainImage}>
            <img src={selectedImage} alt={product.title} />
            {product.discountPercentage > 0 && (
              <span className={styles.discountBadge}>
                -{Math.round(product.discountPercentage)}% OFF
              </span>
            )}
          </div>
          <div className={styles.thumbnailContainer}>
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`${styles.thumbnail} ${
                  selectedImage === image ? styles.activeThumbnail : ""
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image} alt={`${product.title} ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.header}>
            <h1 className={styles.title}>{product.title}</h1>
            <button
              className={`${styles.wishlistBtn} ${inWishlist ? styles.wishlistActive : ''}`}
              aria-label="Add to wishlist"
              onClick={() => toggleWishlistItem(product)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>

          <div className={styles.brandRating}>
            <span className={styles.brand}>Brand: {product.brand}</span>
            <div className={styles.rating}>
              <span className={styles.stars}>
                ⭐ {product.rating.toFixed(1)}
              </span>
              <span className={styles.reviewCount}>
                ({product.reviews.length} reviews)
              </span>
            </div>
          </div>

          <div className={styles.priceSection}>
            <div className={styles.priceWrapper}>
              <span className={styles.currentPrice}>
                {formatINR(parseFloat(convertToINR(discountedPrice)))}
              </span>
              {product.discountPercentage > 0 && (
                <span className={styles.originalPrice}>
                  {formatINR(parseFloat(convertToINR(originalPrice)))}
                </span>
              )}
            </div>
            <span className={styles.taxInfo}>Inclusive of all taxes</span>
          </div>

          <div className={styles.availability}>
            <span
              className={`${styles.stockStatus} ${
                product.stock > 0 ? styles.inStock : styles.outOfStock
              }`}
            >
              {product.stock > 0
                ? `In Stock (${product.stock} available)`
                : "Out of Stock"}
            </span>
          </div>

          <p className={styles.description}>{product.description}</p>

          {/* Quantity Selector */}
          <div className={styles.quantitySection}>
            <label className={styles.quantityLabel}>Quantity:</label>
            <div className={styles.quantitySelector}>
              <button
                onClick={() => handleQuantityChange("decrease")}
                className={styles.quantityBtn}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className={styles.quantityValue}>{quantity}</span>
              <button
                onClick={() => handleQuantityChange("increase")}
                className={styles.quantityBtn}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button
              className={styles.addToCartBtn}
              disabled={product.stock === 0}
              onClick={() => addToCart({ ...product }, quantity)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Add to Cart
            </button>
            <button className={styles.buyNowBtn} disabled={product.stock === 0}>
              Buy Now
            </button>
          </div>

          {/* Product Meta Info */}
          <div className={styles.metaInfo}>
            <div className={styles.metaItem}>
              <strong>SKU:</strong> {product.sku}
            </div>
            <div className={styles.metaItem}>
              <strong>Category:</strong> {product.category}
            </div>
            <div className={styles.metaItem}>
              <strong>Tags:</strong> {product.tags?.join(", ")}
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className={styles.detailsSection}>
        <div className={styles.detailsGrid}>
          <div className={styles.detailCard}>
            <h3>Specifications</h3>
            <ul>
              <li>
                <strong>Weight:</strong> {product.weight}g
              </li>
              <li>
                <strong>Dimensions:</strong> {product.dimensions.width} x{" "}
                {product.dimensions.height} x {product.dimensions.depth} cm
              </li>
              <li>
                <strong>Warranty:</strong> {product.warrantyInformation}
              </li>
              <li>
                <strong>Minimum Order:</strong> {product.minimumOrderQuantity}{" "}
                units
              </li>
            </ul>
          </div>

          <div className={styles.detailCard}>
            <h3>Shipping & Returns</h3>
            <ul>
              <li>
                <strong>Shipping:</strong> {product.shippingInformation}
              </li>
              <li>
                <strong>Return Policy:</strong> {product.returnPolicy}
              </li>
              <li>
                <strong>Availability:</strong> {product.availabilityStatus}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <div className={styles.reviewsSection}>
          <h2>Customer Reviews</h2>
          <div className={styles.reviewsGrid}>
            {product.reviews.map((review, index) => (
              <div key={index} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div>
                    <strong className={styles.reviewerName}>
                      {review.reviewerName}
                    </strong>
                    <div className={styles.reviewRating}>
                      {"⭐".repeat(Math.round(review.rating))}
                      <span className={styles.ratingNumber}>
                        ({review.rating})
                      </span>
                    </div>
                  </div>
                  <span className={styles.reviewDate}>
                    {new Date(review.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className={styles.reviewComment}>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
