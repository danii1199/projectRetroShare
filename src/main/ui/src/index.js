import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./components/ProductForm/DataContext";
import ProductsContextProvider from "./contexts/ProductsContext";
import CartContextProvider from "./contexts/CartContext";
import UsersContextProvider from "./contexts/UsersContext";

ReactDOM.render(
  <BrowserRouter>
      <DataProvider>
        <UsersContextProvider>
          <ProductsContextProvider>
            <CartContextProvider>
              <App />
            </CartContextProvider>
          </ProductsContextProvider>
        </UsersContextProvider>
      </DataProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
