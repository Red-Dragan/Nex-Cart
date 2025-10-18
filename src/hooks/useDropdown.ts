import { useState } from "react";

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

export const useNavDropdown = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [categories, setCategorys] = useState<Record<string, CategoryData>>({
    Beauty: {
      name: "Beauty",
      apiEndpoint: "beauty",
      products: [],
      loading: false,
    },
    Women: {
      name: "Women",
      apiEndpoint: "womens-dresses",
      products: [],
      loading: false,
    },
    Men: {
      name: "Men",
      apiEndpoint: "mens-shirts",
      products: [],
      loading: false,
    },
    Electronics: {
      name: "Electronics",
      apiEndpoint: "smartphones",
      products: [],
      loading: false,
    },
    Living: {
      name: "Living",
      apiEndpoint: "furniture",
      products: [],
      loading: false,
    },
    Sports: {
      name: "Sports",
      apiEndpoint: "sports-accessories",
      products: [],
      loading: false,
    },
    Accessories: {
      name: "Accessories",
      apiEndpoint: "womens-bags",
      products: [],
      loading: false,
    },
  });

  const fetchCategoryProducts = async (categoryName: string) => {
    const category = categories[categoryName];

    if (category.products.length > 0 || category.loading) return;

    setCategorys((perv) => ({
      ...perv,
      [categoryName]: { ...perv[categoryName], loading: true },
    }));

    try {
      const responce = await fetch(
        `https://dummyjson.com/products/category/${category.apiEndpoint}?limit=15`
      );
      const data = await responce.json();
      setCategorys((perv) => ({
        ...perv,
        [categoryName]: {
          ...perv[categoryName],
          products: data.products || [],
          loading: false,
        },
      }));
    } catch (error) {
      console.log(error);
    }
    
  };
  const handleMouseEnter = (categoryName: string) => setActiveDropdown(categoryName);

  const handleMouseLeave = () => setActiveDropdown(null);

  return {
    activeDropdown,
    categories,
    fetchCategoryProducts,
    handleMouseEnter,
    handleMouseLeave
  }
};
