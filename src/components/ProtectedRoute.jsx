import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth'; // import the utility

const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/loginpage" />;
}

export default ProtectedRoute;
 