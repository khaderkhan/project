import Search from "./components/search";
import Details from "./components/details";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./components/login";
import Register from "./components/register";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (

        <BrowserRouter>
            <div className="container-fluid">
            <Route exact={true}
                   path="/">
                <Header/>
            </Route>
            </div>
            {/*    <Route*/}
            {/*    exact={true}*/}
            {/*    path={["/"]}>*/}
            {/*    <Home/>*/}
            {/*</Route>*/}
            <Route
                exact={true}
                path={["/search", "/search/:title"]}>
                <Search/>
            </Route>
            <Route
                exact={true}
                path={["/movies/:movieID"]}>
                <Details/>
            </Route>
            <Route
                exact={true}
                path={["/login"]}>
                <Login/>
            </Route>
            <Route
                exact={true}
                path={["/register"]}>
                <Register/>
            </Route>

        </BrowserRouter>
  );
}

export default App;
