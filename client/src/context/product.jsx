import { createContext, useState, useEffect, useCallback, useContext } from "react";
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

            console.log(response.data, '<<<<< response.data');
            const normalized = response.data && response.data.products ? response.data.products : response.data;
            setProducts(normalized || []);
        } catch (error) {
            console.error(error);
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