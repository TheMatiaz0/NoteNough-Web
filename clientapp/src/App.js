import Home from "./pages/Home";
/*import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp"; */
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        {/*<Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} /> */}
      </Routes>
    </div>
  );
};

export default App;
