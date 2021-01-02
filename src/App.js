import React from 'react';
import "./assets/css/global.css"
import {CookiesProvider} from 'react-cookie';
import Router from "./routes";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Themes from "./assets/themes"

function App() {
    return (
        <CookiesProvider>
            <ThemeProvider theme={Themes.default}>
                <Router/>
            </ThemeProvider>
        </CookiesProvider>
    );
}

export default App;
