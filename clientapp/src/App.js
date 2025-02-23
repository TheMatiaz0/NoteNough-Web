import Home from "./pages/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import AccountSettings from "./pages/AccountSettings";
import ProtectedRoute from "./components/Router/ProtectedRoute.js";
import { useEffect, useState } from "react";

const App = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [user, setUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    const ROOT_AUTHENTICATION_URL = `${process.env.REACT_APP_ROOT_URL}/api/auth`;
    const GENERIC_ERROR_MESSAGE = "An error occured. Please try again."
    const NETWORK_ERROR_MESSAGE = "Network error. Please check your connection."

    useEffect(() => {
        fetchUser(true);
    }, [userLoggedIn]);

    const authorize = async ({ isLoggingIn, email, password, isRememberPassword }) => {
        const urlName = isLoggingIn ? "login" : "register";

        try {
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
            const data = await response.json();
    
            if (!response.ok) {
              setErrorMessage(data.message || GENERIC_ERROR_MESSAGE);
              return false;
            }
      
            await fetchUser();
            setErrorMessage("");
            return true;
        }
        catch (error) {
            setErrorMessage(NETWORK_ERROR_MESSAGE);
            return false;
        }
    }

    const fetchUser = async (silently) => {
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

            if (!response.ok) {
                setErrorMessage(content.message || GENERIC_ERROR_MESSAGE);
                return;
            }
            setUser({ email: content.email });
            setUserLoggedIn(true);
        }
        catch (error) {
            setUser(null);
            setUserLoggedIn(false);
            if (!silently) {
                setErrorMessage(NETWORK_ERROR_MESSAGE);
            }
        }
    }

    const changeEmail = async ({ newEmail, currentPassword }) => {
        const response = await fetch(`${ROOT_AUTHENTICATION_URL}/update`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify({
                currentPassword: currentPassword,
                email: newEmail
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
                password: newPassword
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
            {errorMessage && (
                <div className="error-message">
                    <p>{errorMessage}</p>
                </div>
            )}

            <Routes>
                <Route path="/" element={<Home onAuthorize={authorize} user={user} onLogout={logoutUser} userLoggedIn={userLoggedIn} />} />
                <Route path="/account" element={
                    <ProtectedRoute userLoggedIn={true}>
                        <AccountSettings submitEmailChange={changeEmail} submitPasswordChange={changePassword} submitAccountDelete={deleteAccount} onLogout={logoutUser} />
                    </ProtectedRoute>
                }
                />
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </div>
    );
};

export default App;
