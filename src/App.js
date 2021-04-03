import Search from "./components/search";
import Details from "./components/details";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./components/login";
import Register from "./components/register";
import Profile from "./components/profile";
import StaticProfile from "./components/static-profile";
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
                path={["/details/:movieID"]}>
                <Details/>
            </Route>
            <Route
                exact={true}
                path={["/profile"]}>
                <Profile/>
            </Route>
            <Route
                exact={true}
                path={["/profile/:profileId"]}>
                <StaticProfile/>
            </Route>

        </BrowserRouter>
  );
}

export default App;
