import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import AccountSettings from "./pages/AccountSettings";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<AccountSettings />} />
      </Routes>
    </div>
  );
};

export default App;
