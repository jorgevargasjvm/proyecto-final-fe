import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './pages/Index';
import "./assets/css/global.css"
import {CookiesProvider} from 'react-cookie';

function App() {
    return (
        <CookiesProvider>
            <Router>
                <Route path="/" component={Home} exact/>
            </Router>
        </CookiesProvider>
    );
}

export default App;
