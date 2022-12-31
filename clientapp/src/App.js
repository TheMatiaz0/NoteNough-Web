import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import AccountSettings from "./pages/AccountSettings";
import ProtectedRoute from "./components/ProtectedRoute";
import {useEffect, useState} from "react";

const App = () => {
    const ROOT_AUTHENTICATION_URL = `${process.env.REACT_APP_ROOT_URL}/api/auth`;
    
    const [user, setUser] = useState({});
    
    // write timer to fetch user in loop every X seconds
    useEffect(() => {
        fetchUser();
    }, []);

    const authorize = async({isLoggingIn, email, password, isRememberPassword}) => {
        const urlName = isLoggingIn ? "login" : "register";
        const credentialsType = isLoggingIn ? "include" : "same-origin";

        const response = await fetch(`${ROOT_AUTHENTICATION_URL}/${urlName}`, {
            method: 'POST',
            credentials: credentialsType,
            headers: {
                'Content-Type': process.env.REACT_APP_FETCH_TYPE,
            },
            body: JSON.stringify(
                {
                    email: email,
                    password: password,
                    rememberMe: isRememberPassword
                }),
        });
        
        return response.ok;
    }

    const fetchUser = async () => {
        try {
            const url = `${ROOT_AUTHENTICATION_URL}/user`;
            const response = await fetch(url);
            const content = await response.json();
            setUser({email: content.email});
        }
        catch (e) {
            setUser({});
            console.error(e);
        }
        // ???
        // return fetchNotesFromDatabase();
    }

    const logoutUser = async () => {
        await fetch(`${ROOT_AUTHENTICATION_URL}/logout`, {
            method: "POST",
            headers: {
                "Content-type": process.env.REACT_APP_FETCH_TYPE,
            },
        });
        return fetchUser();
    }

    const deleteAccount = async () => {
        await fetch(`${ROOT_AUTHENTICATION_URL}/delete`, {
            method: "DELETE",
            headers: {
                "Content-type": process.env.REACT_APP_FETCH_TYPE,
            },
        });
        return fetchUser();
    }
    
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home onAuthorize={authorize} user={user} onLogout={logoutUser} />} />
            <Route path="/account" element={
                    <ProtectedRoute isAllowed={!!user}>
                        <AccountSettings />
                    </ProtectedRoute>
            }
            />
      </Routes>
    </div>
  );
};

export default App;
