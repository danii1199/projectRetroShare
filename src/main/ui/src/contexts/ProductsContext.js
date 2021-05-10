import { createContext } from "react";
import { useEffect, useState } from "react";
import RetroshareService from "../Service/RetroshareService";

export const ProductsContext = createContext();

const ProductsContextProvider = ({ children }) => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    RetroshareService.getProducts().then((response) => {
      const { data } = response;
      setProduct(data);
    });
  };

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
