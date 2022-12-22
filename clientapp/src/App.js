import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import AccountSettings from "./pages/AccountSettings";
import ProtectedRoute from "./components/ProtectedRoute";
import {createContext} from "react";
import { user } from "./services/AuthenticationHandler";

const UserContext = createContext(user);

const App = () => {
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
