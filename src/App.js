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
import {createStore} from "redux";
import reducers from "./reducers/combine-reducers";
import {Provider} from "react-redux";

function App() {

    const store = createStore(reducers)
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="container-fluid">
                    <Route
                        path="/">
                        <Header/>
                    </Route>
                </div>
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
                    path={["/profile/:userID"]}>
                    <StaticProfile/>
                </Route>

            </BrowserRouter>
        </Provider>
    );
}

export default App;
