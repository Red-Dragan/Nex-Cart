import React from "react";
import styles from "../styles/Home.module.css";
import { convertToINR, formatINR } from "../utils/currency";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";


interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductsResponse {
  products: Product[];
}



const FeatureProducts: React.FC<ProductsResponse> = ({ products }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event bubbling
    
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail
    }, 1);
    
  };
  return (
    <>
      {products.map((product: Product) => (
        <Link key={product.id} className={styles.productCard} to={`/products/${product.id}`}>
          <div className={styles.imageContainer}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className={styles.productImage}
            />
            {product.discountPercentage > 0 && (
              <span className={styles.discount}>
                -{Math.round(product.discountPercentage)}%
              </span>
            )}
          </div>

          <div className={styles.productInfo}>
            <h3 className={styles.productTitle}>{product.title}</h3>
            <p className={styles.productBrand}>{product.brand}</p>
            <p className={styles.productDescription}>
              {product.description.substring(0, 80)}...
            </p>

            <div className={styles.priceSection}>
              <span className={styles.price}>
                {formatINR(parseFloat(convertToINR(product.price)))}
              </span>
              <span className={styles.rating}>
                ⭐ {(Math.floor(product.rating * 10) / 10).toFixed(1)}
              </span>
            </div>

            <button className={styles.addToCartBtn} onClick={(e) => handleAddToCart(product, e)}>Add to Cart</button>
          </div>
        </Link>
      ))}
    </>
  );
};

export default FeatureProducts;
