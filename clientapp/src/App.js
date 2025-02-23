import Home from "./pages/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import AccountSettings from "./pages/AccountSettings";
import ProtectedRoute from "./components/Router/ProtectedRoute.js";
import { useEffect, useState } from "react";
import Toast from "./components/Toast/Toast";
import "./index.css";

const App = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    const ROOT_AUTHENTICATION_URL = `${process.env.REACT_APP_ROOT_URL}/api/auth`;
    const GENERIC_ERROR_MESSAGE = "An error occured. Please try again...";
    const LOGIN_ERROR_MESSAGE = "Failed to fetch user data.";
    const TIMEOUT_ERROR_MESSAGE = "Request timed out. Please try again...";
    const MAX_RESPONSE_TIME = 1500;

    useEffect(() => {
        if (userLoggedIn) {
            fetchUser(true);
        }
    }, [userLoggedIn]);

    const authorize = async ({ isLoggingIn, email, password, isRememberPassword }) => {
        const urlName = isLoggingIn ? "login" : "register";
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), MAX_RESPONSE_TIME);

        setIsLoading(true);

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
                signal: controller.signal,
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
            if (error.name === 'AbortError') {
                setErrorMessage(TIMEOUT_ERROR_MESSAGE);
            }
            else {
                setErrorMessage(LOGIN_ERROR_MESSAGE);
            }
            return false;
        }
        finally {
            clearTimeout(timeoutId);
            setIsLoading(false);
        }
    }

    const fetchUser = async (silently) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), MAX_RESPONSE_TIME);

        setIsLoading(true);

        try {
            const url = `${ROOT_AUTHENTICATION_URL}/user`;
            const response = await fetch(url, {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': process.env.REACT_APP_FETCH_TYPE,
                },
                signal: controller.signal,
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
            if (!silently) {
                if (error.name === 'AbortError') {
                    setErrorMessage(TIMEOUT_ERROR_MESSAGE);
                }
                else {
                    setErrorMessage(LOGIN_ERROR_MESSAGE);
                }
            }

            setUser(null);
            setUserLoggedIn(false);
        }
        finally {
            clearTimeout(timeoutId);
            setIsLoading(false);
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
        <div className={isLoading ? "waiting" : ""}>
            {errorMessage && <Toast message={errorMessage} onClose={() => setErrorMessage("")} />}

            <Routes>
                <Route path="/" element={<Home onAuthorize={authorize} user={user} onLogout={logoutUser} userLoggedIn={userLoggedIn} isLoading={isLoading} />} />
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
