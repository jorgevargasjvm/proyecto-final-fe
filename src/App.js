import React from 'react';
import "./assets/css/global.css"
import {CookiesProvider} from 'react-cookie';
import HomePage from "./pages/Home";
import PurchasePage from "./pages/Purchase"
import Router from "./routes";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Themes from "./assets/themes"

function App() {
    return (
        <CookiesProvider>
            <Router>
                <Route path="/" component={HomePage} exact/>
                <Route path="/purchase" component={PurchasePage} exact/>
            </Router>
        </CookiesProvider>
    );
}

export default App;
