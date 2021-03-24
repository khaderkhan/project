import Search from "./components/search";
import Details from "./components/details";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <div className="container-fluid">
        <BrowserRouter>
            <Route
                exact={true}
                path={["/"]}>
                <Home/>
            </Route>
            <Route
                exact={true}
                path={["/search", "/search/:title"]}>
                <Search/>
            </Route>
            <Route
                exact={true}
                path={["/details/:imdbID"]}>
                <Details/>
            </Route>
        </BrowserRouter>
    </div>
  );
}

export default App;
