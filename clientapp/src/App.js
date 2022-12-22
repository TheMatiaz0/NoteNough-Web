import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import AccountSettings from "./pages/AccountSettings";
import ProtectedRoute from "./components/ProtectedRoute";
import {createContext, useEffect, useState} from "react";
import {fetchUser} from "./services/AuthenticationHandler";

const UserContext = createContext({});

const App = () => {
    const [user, setUser] = useState({});

    // write timer to fetch user in loop every X seconds
    useEffect(() => {
        fetchUser();
    }, []);
    
  return (
    <div>
        <UserContext.Provider value={user}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={
                    <ProtectedRoute isAllowed={false}>
                        <AccountSettings />
                    </ProtectedRoute>
            }
            />
      </Routes></UserContext.Provider>
    </div>
  );
};

export default App;
