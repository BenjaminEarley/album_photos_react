import React from 'react';
import logo from '../logo.png';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Albums from "./albums/albums";
import Photos from "./photos/photos";
import {Logo, TopBar} from "./app.style";

export default App;

function App() {
    return (
        <Router>
            <AppBar/>
            <PageSwitch/>
        </Router>
    );
}

function PageSwitch() {
    return (
        <Switch>
            <Route exact path="/" children={<Albums/>}/>
            <Route path="/album/:albumId" children={<Photos/>}/>
        </Switch>
    );
}

function AppBar() {
    return (
        <TopBar>
            <Link to="/">
                <Logo src={logo} alt="logo"/>
            </Link>
        </TopBar>
    )
}
