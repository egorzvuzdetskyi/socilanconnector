import React, {Component} from "react";
import "./App.css";

//libraries
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'


// components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard"
import PrivateRoutes from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from "./components/edit-profile/EditProfile";

// store
import store from './store';

//own functions
import {getLocalStorageName, isTokenExpired, setAuthToken} from "./helpers";
import {logoutUser, setCurrentUser} from "./actions/authActions";
import {clearProfile} from "./actions/profileActions";

library.add(faStroopwafel);

if(localStorage.getItem(getLocalStorageName('token'))) {

    const token = localStorage.getItem(getLocalStorageName('token'));

    setAuthToken(token);

    const decoded = jwt_decode(token);

    store.dispatch(setCurrentUser(decoded));

    if(isTokenExpired(decoded)) {
        store.dispatch(clearProfile());
        store.dispatch(logoutUser());

        window.location.href = '/login'
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={ store }>
                <Router>
                    <div className="App">
                        <Navbar />
                        <Route exact path="/" component={Landing} />
                        <div className="container">
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/login" component={Login}/>
                            <Switch>
                                <PrivateRoutes exact path="/dashboard" component={Dashboard}/>
                            </Switch>
                            <Switch>
                                <PrivateRoutes exact path="/create-profile" component={CreateProfile}/>
                            </Switch>
                            <Switch>
                                <PrivateRoutes exact path="/edit-profile" component={EditProfile}/>
                            </Switch>
                        </div>
                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
