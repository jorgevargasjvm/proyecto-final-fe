import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import "./assets/css/global.css"
import {CookiesProvider} from 'react-cookie';
import HomePage from "./pages/Home";

function App() {
    return (
        <CookiesProvider>
            <Router>
                <Route path="/" component={HomePage} exact/>
            </Router>
        </CookiesProvider>
    );
}

export default App;
