import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const useAuth = () => {
    const zefAuth = useContext(AuthContext);
    return zefAuth;
};

export default useAuth;