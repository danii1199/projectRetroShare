import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import UserDataComponent from "./components/DataComponent/UserDataComponent";
//import GameDataComponent from "./components/DataComponent/GameDataComponent";
//import Game from "./components/DataComponent/Game";
//import GameConsoleDataComponent from "./components/DataComponent/GameConsoleDataComponent";
//import GameConsole from "./components/DataComponent/GameConsole";
//import SingIn from "./components/UserAuth/SingIn";
//import SingUp from "./components/UserAuth/SingUp";
import { Step1 } from "./components/ProductForm/Step1";
import { Step2 } from "./components/ProductForm/Step2";
import { Step3 } from "./components/ProductForm/Step3";
//import Products from "./components/Products/Products";
import { Result } from "./components/ProductForm/Result";
//import ProductView from "./components/ProductView/ProductView";
//import VinylDataComponent from "./components/DataComponent/VinylDataComponent";
//import Vinyl from "./components/DataComponent/Vinyl";
//import RecordPlayerDataComponent from "./components/DataComponent/RecordPlayerDataComponent";
//import RecordPlayer from "./components/DataComponent/RecordPlayer";
//import UserProfile from "./components/User/UserProfile";
//import OneUser from "./components/User/OneUser";
//import Cart from "./pages/cart";
//import Chat from "./components/Chat/Chat";
import { SignUpResult } from "./components/UserAuth/SignUpResult";
import { CartForm } from "./pages/cart/CartForm";
import { CartFormResult } from "./pages/cart/CartFormResult";
import { lazy, Suspense } from "react";
import { Container } from "@material-ui/core";

const Products = lazy(() => import("./components/Products/Products"));
//const NavBar = lazy(() => import("./components/NavBar"));
const UserDataComponent = lazy(() =>
  import("./components/DataComponent/UserDataComponent")
);
const GameDataComponent = lazy(() =>
  import("./components/DataComponent/GameDataComponent")
);
const GameConsoleDataComponent = lazy(() =>
  import("./components/DataComponent/GameConsoleDataComponent")
);
const VinylDataComponent = lazy(() =>
  import("./components/DataComponent/VinylDataComponent")
);
const RecordPlayerDataComponent = lazy(() =>
  import("./components/DataComponent/RecordPlayerDataComponent")
);
const GameConsole = lazy(() =>
  import("./components/DataComponent/GameConsole")
);
const Game = lazy(() => import("./components/DataComponent/Game"));
const Vinyl = lazy(() => import("./components/DataComponent/Vinyl"));
const RecordPlayer = lazy(() =>
  import("./components/DataComponent/RecordPlayer")
);
const UserProfile = lazy(() => import("./components/User/UserProfile"));
const Chat = lazy(() => import("./components/Chat/Chat"));
const OneUser = lazy(() => import("./components/User/OneUser"));
const Cart = lazy(() => import("./pages/cart"));
const ProductView = lazy(() => import("./components/ProductView/ProductView"));
const SingIn = lazy(() => import("./components/UserAuth/SingIn"));
const SingUp = lazy(() => import("./components/UserAuth/SingUp"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Container>
          <NavBar />
        </Container>
        <Container>
          <Switch>
            <Route exact path="/users" component={UserDataComponent} />
            <Route path="/login" exact component={SingIn} />
            <Route path="/singup" exact component={SingUp} />
            <Route
              path="/videogames-admin"
              exact
              component={GameDataComponent}
            />
            <Route path="/videogames" exact component={Game} />

            <Route
              path="/gameconsole-admin"
              exact
              component={GameConsoleDataComponent}
            />
            <Route path="/gameconsole" exact component={GameConsole} />

            <Route
              path="/rplayer-admin"
              exact
              component={RecordPlayerDataComponent}
            />
            <Route path="/rplayer" exact component={RecordPlayer} />
            <Route path="/vinyl-admin" exact component={VinylDataComponent} />
            <Route path="/vinyl" exact component={Vinyl} />
            <Route path="/" exact component={Products} />
            <Route path="/cart" component={Cart} />
            <Route path="/chat" component={Chat} />
            <Route path="/pr/:id" component={ProductView} />
            <Route path="/user/:id" component={OneUser} />
            <Route path="/step1" exact component={Step1} />
            <Route path="/step2" component={Step2} />
            <Route path="/SignUpResult" component={SignUpResult} />
            <Route path="/step3" component={Step3} />
            <Route path="/result" component={Result} />
            <Route path="/profile" exact component={UserProfile} />
            <Route path="/cartForm" exact component={CartForm} />
            <Route path="/cartFormResult" exact component={CartFormResult} />
          </Switch>
        </Container>
      </Suspense>
    </Router>
  );
};

export default App;
