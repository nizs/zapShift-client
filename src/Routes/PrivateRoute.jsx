import React from 'react';
import { Children } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Components/Loading';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation()

    if (loading) {
        return <Loading />
    }

    if (!user) {
        return <Navigate state={location.pathname} to='/signin' />
    }

    return children;
};

export default PrivateRoute;