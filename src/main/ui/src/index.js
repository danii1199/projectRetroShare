import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./components/ProductForm/DataContext";
import ProductsContextProvider from "./contexts/ProductsContext";
import CartContextProvider from "./contexts/CartContext";
import UsersContextProvider from "./contexts/UsersContext";
import DataContextProvider from "./components/CheckOut/StateContext/DataContext";
import MessagesContextProvider from "./components/Chat/context/MessagesContext";


ReactDOM.render(
  <BrowserRouter>
    <DataProvider>
      <UsersContextProvider>
        <ProductsContextProvider>
          <DataContextProvider>
            <CartContextProvider>
              <MessagesContextProvider>
              <App />
              </MessagesContextProvider>
            </CartContextProvider>
          </DataContextProvider>
        </ProductsContextProvider>
      </UsersContextProvider>
    </DataProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
