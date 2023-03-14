import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../providers/AuthProvider";

export interface PropType {
    component: React.FC;
}

const PrivateRoute: FC<PropType> = ({ component: Component }) => {
    const isAuthenticated = useAuth().currentUser !== undefined;

    if (isAuthenticated) return <Component />;
    return <Navigate to='/user/signin' />;
};

export default PrivateRoute;