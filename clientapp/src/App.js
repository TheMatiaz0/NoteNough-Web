import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import AccountSettings from "./pages/AccountSettings";
import ProtectedRoute from "./components/Account/ProtectedRoute.js";
import { useEffect, useState } from "react";

const App = () => {
    const ROOT_AUTHENTICATION_URL = `${process.env.REACT_APP_ROOT_URL}/api/auth`;
    const [user, setUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
        fetchUser();
    }, []);

    const authorize = async ({ isLoggingIn, email, password, isRememberPassword }) => {
        const urlName = isLoggingIn ? "login" : "register";

        const response = await fetch(`${ROOT_AUTHENTICATION_URL}/${urlName}`, {
            method: 'POST',
            credentials: "include",
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

        await fetchUser();
        return response.ok;
    }

    const fetchUser = async () => {
        try {
            const url = `${ROOT_AUTHENTICATION_URL}/user`;
            const response = await fetch(url, {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': process.env.REACT_APP_FETCH_TYPE,
                }
            });
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
        const response = await fetch(`${ROOT_AUTHENTICATION_URL}/update`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify({
                currentPassword: currentPassword,
                newEmail: newEmail
            }),
            headers: {
                "Content-Type": process.env.REACT_APP_FETCH_TYPE,
            },
        });

        await fetchUser();
        return response.ok;
    }

    const changePassword = async ({ currentPassword, newPassword }) => {
        const response = await fetch(`${ROOT_AUTHENTICATION_URL}/update`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify({
                currentPassword: currentPassword,
                newPassword: newPassword
            }),
            headers: {
              "Content-Type": process.env.REACT_APP_FETCH_TYPE,
            },
        });

        await fetchUser();  
        return response.ok;
    }

    const logoutUser = async () => {
        const response = await fetch(`${ROOT_AUTHENTICATION_URL}/logout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": process.env.REACT_APP_FETCH_TYPE,
            },
        });

        await fetchUser();
        return response.ok;
    }

    const deleteAccount = async ({ currentPassword }) => {
        const response = await fetch(`${ROOT_AUTHENTICATION_URL}/delete`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": process.env.REACT_APP_FETCH_TYPE,
            },
            body: JSON.stringify(
            {
                currentPassword: currentPassword
            }),
        });

        await fetchUser();
        return response.ok;
    }

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home onAuthorize={authorize} user={user} onLogout={logoutUser} userLoggedIn={userLoggedIn} />} />
                <Route path="/account" element={
                    <ProtectedRoute userLoggedIn={userLoggedIn}>
                        <AccountSettings submitEmailChange={changeEmail} submitPasswordChange={changePassword} submitAccountDelete={deleteAccount} onLogout={logoutUser} />
                    </ProtectedRoute>
                }
                />
            </Routes>
        </div>
    );
};

export default App;
