import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { accAuthSelector } from '../redux/selectors/accountSelector';

const PrivateRoutes = () => {
   const accountAuth = useSelector(accAuthSelector)

   if (accountAuth && accountAuth.isAuth) {
      return <Outlet />;
   } else {
      return <Navigate to="/introduce" />;
   }
};

export default PrivateRoutes;