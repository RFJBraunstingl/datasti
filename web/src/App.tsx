import React, {useState} from 'react';
import './App.css';
import Routes from "./routes/Routes";
import StandardNavBar from "./components/NavBar/StandardNavBar";
import {ThemeProvider} from '@material-ui/core/styles';
import {BrowserRouter as Router} from "react-router-dom";
import {lightTheme} from "./theme/Theme";
import UserContext from './contexts/user-context'
import {User} from "./types/User";

function App() {
    const [user, setUser] = useState<User | undefined>(undefined)

    return (
        <div className="App">
            <UserContext.Provider value={{
                user,
                setUser
            }}>
                <ThemeProvider theme={lightTheme}>
                    <Router>
                        <StandardNavBar/>
                        <Routes/>
                    </Router>
                </ThemeProvider>
            </UserContext.Provider>
        </div>
    );
}

export default App;
