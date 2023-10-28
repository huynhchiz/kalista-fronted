import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { userLoginSelector } from '../redux/selector';

const PrivateRoutes = () => {
   const userLogin = useSelector(userLoginSelector);

   if (userLogin && userLogin.isAuthenticated === true) {
      return <Outlet />;
   } else {
      return <Navigate to="/introduce" />;
   }
};

export default PrivateRoutes;