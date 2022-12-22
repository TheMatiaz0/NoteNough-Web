const ROOT_AUTHENTICATION_URL = `${process.env.REACT_APP_ROOT_URL}/api/auth`;

export const authorize = async({isLoggingIn, email, password, isRememberPassword}) => {
    const urlName = isLoggingIn ? "login" : "register";
    const credentialsType = isLoggingIn ? "include" : "same-origin";
    
    return await fetch(`${ROOT_AUTHENTICATION_URL}/${urlName}`, {
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
}

export const fetchUser = async () => {
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

export const logoutUser = async () => {
    await fetch(`${ROOT_AUTHENTICATION_URL}/logout`, {
        method: "POST",
        headers: {
            "Content-type": process.env.REACT_APP_FETCH_TYPE,
        },
    });
    return fetchUser();
}

export const deleteAccount = async () => {
    await fetch(`${ROOT_AUTHENTICATION_URL}/delete`, {
        method: "DELETE",
        headers: {
            "Content-type": process.env.REACT_APP_FETCH_TYPE,
        },
    });
    return fetchUser();
}