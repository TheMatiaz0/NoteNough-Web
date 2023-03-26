import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import AccountSettings from "./pages/AccountSettings";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";

const App = () => {
    const ROOT_AUTHENTICATION_URL = `${process.env.REACT_APP_ROOT_URL}/api/auth`;
    const [user, setUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    // write timer to fetch user in loop every X seconds
    useEffect(() => {
        fetchUser();
    }, []);

    const authorize = async ({ isLoggingIn, email, password, isRememberPassword }) => {
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
        fetchUser();
        return response.ok;
    }

    const fetchUser = async () => {
        try {
            const url = `${ROOT_AUTHENTICATION_URL}/user`;
            const response = await fetch(url);
            const content = await response.json();
            setUser({ email: content.email });
            setUserLoggedIn(true);
        }
        catch (e) {
            setUser(null);
            setUserLoggedIn(false);
        }
    }

    const changeEmail = async ({ newEmail, currentPassword }) => {
    }

    const changePassword = async ({ currentPassword, newPassword }) => {

    }

    const logoutUser = async () => {
        const response = await fetch(`${ROOT_AUTHENTICATION_URL}/logout`, {
            method: "POST",
            headers: {
                "Content-type": process.env.REACT_APP_FETCH_TYPE,
            },
        });
        fetchUser();
        return response.ok;
    }

    const deleteAccount = async (password) => {
        const response = await fetch(`${ROOT_AUTHENTICATION_URL}/delete`, {
            method: "DELETE",
            headers: {
                "Content-type": process.env.REACT_APP_FETCH_TYPE,
            },
            body: JSON.stringify(
                {
                    password: password
                }),
        });
        fetchUser();
        return response.ok;
    }

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home onAuthorize={authorize} user={user} onLogout={logoutUser} userLoggedIn={userLoggedIn} />} />
                <Route path="/account" element={
                    <ProtectedRoute isAllowed={!!user}>
                        <AccountSettings submitEmailChange={changeEmail} submitPasswordChange={changePassword} submitAccountDelete={deleteAccount} />
                    </ProtectedRoute>
                }
                />
            </Routes>
        </div>
    );
};

export default App;
