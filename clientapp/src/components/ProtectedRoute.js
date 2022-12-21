import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";

const ProtectedRoute = ({ isAllowed, redirectPath = '/', children }) => {
    if (!isAllowed) {
        return <Link to={redirectPath} replace />;
    }
    
    return children;
};

export default ProtectedRoute;
