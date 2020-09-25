import React, { createContext, useState } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import News from "./components/News/News";
import Destination from "./components/Destination/Destination";
import Blog from "./components/Blog/Blog";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import Booking from "./components/Booking/Booking";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PlaceAndMap from "./components/PlaceAndMap/PlaceAndMap";

export const UserContext = createContext();

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      {/* <h3>{loggedInUser.email}</h3> */}
      <Router>
        <div>
          <nav>
            <ul>
              {/* <li>
              <Link to="/">Home</Link>
            </li> */}
              <li>
                <Link to="/news">News</Link>
              </li>
              <li>
                <Link to="/destination">Destination</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/login">Log In</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/news">
              <News />
            </Route>
            <Route path="/destination">
              <Destination />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/blog">
              <Blog />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <PrivateRoute path="/placeandmap">
              <PlaceAndMap />
            </PrivateRoute>
            <Route path="/booking/:id">
              <Booking />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}
