import React from "react";
import { type LoaderFunctionArgs, useLoaderData } from "react-router";
import FeatureProducts from "../components/FeatureProducts";
import styles from "../styles/Home.module.css";

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

export async function loadCategoryProducts({ params }: LoaderFunctionArgs) {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/category/${params.apiEndpoint}`
    );

    if (!response.ok) {
      throw new Response("Category not found", { status: response.status });
    }

    return await response.json();
  } catch (error) {
    throw new Response((error as Error).message || "Failed to load category", {
      status: 500,
    });
  }
}

const NavPages: React.FC = () => {
  const { products } = useLoaderData() as ProductsResponse;

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>Category Products</h1>
      <div className={styles.productsGrid}>
        <FeatureProducts products={products} />
      </div>
    </div>
  );
};

export default NavPages;
