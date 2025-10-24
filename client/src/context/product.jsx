import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import { http } from "../helpers/http";

export const productContext = createContext({
    products: [],
    fetchProducts: async () => {},
});

export function ProductProvider({ children }) { 
    const [products, setProducts] = useState([]);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await http({
                method: "GET",
                url: "/products",
            });

            // API returns { products: [...] } according to documentation
            setProducts(response.data.products || response.data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const value = {
        products,
        fetchProducts,
    };

    return (
        <productContext.Provider value={value}>{children}</productContext.Provider>
    );
}

export function useProduct() {
    return useContext(productContext);
}