import { useEffect, useState } from "react";
import RetroshareService from "../Service/RetroshareService";


const ProductsAPI = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    RetroshareService.getProducts().then((response) => {
      const { data } = response;
      setProduct(data);
    });
  };
  return product;
};

export default ProductsAPI;
