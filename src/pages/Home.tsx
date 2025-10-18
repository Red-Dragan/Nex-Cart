import React from "react";
import { useLoaderData } from "react-router";
import styles from "../styles/Home.module.css";
import FeatureProducts from "../components/FeatureProducts";

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

export async function homeLoader() {
  const response = await fetch("https://dummyjson.com/products");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data;
}

const Home: React.FC = () => {
  const data = useLoaderData() as ProductsResponse;

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>Featured Products</h1>

      <div className={styles.productsGrid}>
        <FeatureProducts products={data.products} />
      </div>
    </div>
  );
};

export default Home;
