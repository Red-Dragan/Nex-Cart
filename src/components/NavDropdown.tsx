import React from "react";
import { useNavigate } from "react-router";
import styles from "../styles/Navigation.module.css";
import { convertToINR, formatINR } from "../utils/currency";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
}

interface CategoryData {
  name: string;
  apiEndpoint: string;
  products: Product[];
  loading: boolean;
}

interface NavDropdownProps {
  categoryName: string;
  categoryData: CategoryData;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onFetchProducts: (categoryName: string) => void;
}

const NavDropdown: React.FC<NavDropdownProps> = ({
  categoryName,
  categoryData,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onFetchProducts,
}) => {
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    onMouseEnter();
    onFetchProducts(categoryName);
  };

  const handleCategoryClick = () => {
    navigate(`/category/${categoryData.apiEndpoint}`);
  };

  const handleProductClick = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/products/${productId}`);
  };

  return (
    <li
      className={styles.navItem}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className={styles.navLink} onClick={handleCategoryClick}>
        {categoryName}
      </span>

      {/* Dropdown Menu */}
      {isActive && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownContent}>
            {categoryData.loading ? (
              <div className={styles.dropdownLoading}>Loading products...</div>
            ) : categoryData.products.length > 0 ? (
              <div className={styles.productList}>
                {categoryData.products.map((product) => (
                  <div
                    key={product.id}
                    className={styles.productItem}
                    onClick={(e) => handleProductClick(product.id, e)}
                  >
                    <span className={styles.productTitle}>{product.title}</span>
                    <span className={styles.productPrice}>{formatINR(parseFloat(convertToINR(product.price)))}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noProducts}>No products available</div>
            )}
          </div>
        </div>
      )}
    </li>
  );
};

export default NavDropdown;
