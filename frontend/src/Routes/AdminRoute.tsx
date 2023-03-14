import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import ForbidenAccess from '../components/error404/forbidenAccess';
import { useAuth } from "../providers/AuthProvider";
import { PropType } from './PrivateRoute';

const AdminRoute: FC<PropType> = ({ component: Component }) => {
    const user = useAuth().currentUser;
    const isAuthenticated = user !== undefined;

    if (isAuthenticated ){
        if(!user.isAdmin){
            return <ForbidenAccess/>
        } else {
            return <Component />;
        }
    }  else {
        return <Navigate to='/user/signin' />
    }
};

export default AdminRoute;