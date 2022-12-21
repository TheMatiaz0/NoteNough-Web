import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import AccountSettings from "./pages/AccountSettings";
import ProtectedRoute from "./components/ProtectedRoute";

const ROOT_URL = window.location.href;

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={
                <ProtectedRoute isAllowed={false}>
                    <AccountSettings />
                </ProtectedRoute>
            }
        />
      </Routes>
    </div>
  );
};

export default App;
