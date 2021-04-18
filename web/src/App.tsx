import React from 'react';
import './App.css';
import Routes from "./routes/Routes";
import StandardNavBar from "./components/nav_bar/StandardNavBar";
import {ThemeProvider} from '@material-ui/core/styles';
import {BrowserRouter as Router} from "react-router-dom";
import {lightTheme} from "./theme/Theme";

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={lightTheme}>
                <Router>
                    <StandardNavBar/>
                    <Routes/>
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;
