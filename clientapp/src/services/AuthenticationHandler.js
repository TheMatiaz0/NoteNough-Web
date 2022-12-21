import {useEffect, useState} from "react";


const ROOT_AUTHENTICATION_URL = `${process.env.REACT_APP_ROOT_URL}/api/auth`;

const [email, setEmail] = useState("");

useEffect(() => {
    fetchUser();
}, []);

export const fetchUser = async () => {
    try {
        const url = `${ROOT_AUTHENTICATION_URL}/user`;
        const response = await fetch(url);
        const content = await response.json();
        setEmail(content.email);
    }
    catch (e) {
        setEmail("");
        console.error(e);
    }
    return fetchNotesFromDatabase();
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