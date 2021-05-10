import { useEffect, useState } from "react";
import RetroshareService from "../Service/Auth/RetroshareService";


const ProductsAPI =() => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const id=(window.location.pathname.split("/")[2]);
    obtenerDatos(id);
  }, []);

  const obtenerDatos = async (id) => {
    console.log(id)
    RetroshareService.getOneProduct(id).then((response) => {
      const {data}   = response;
      setProduct(data);
    });
  };
  return product;
};

export default ProductsAPI;
