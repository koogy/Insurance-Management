import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../providers/AuthProvider";

export interface PropType {
    component: React.FC;
}

const UnconnectedRoute: FC<PropType> = ({ component: Component }) => {
    const isAuthenticated = useAuth().currentUser !== undefined;

    if (!isAuthenticated) return <Component />;
    return <Navigate to='/' />;
};

export default UnconnectedRoute;