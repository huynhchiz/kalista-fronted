import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginSelector } from '../redux/selector';
import { useEffect } from 'react';

import './App.scss'
import Nav from '../components/Nav/Nav';
import AppRoutes from '../routes/AppRoutes';
import LoadPage from '../components/re-use/LoadPage/LoadPage';
import { getAccount } from '../redux/userLoginSlice';

function App() {
  const dispatch = useDispatch()
  const userLogin = useSelector(userLoginSelector)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAccount())
  }, [userLogin])
  
  useEffect(() => {
    if(userLogin && !userLogin.isAuthenticated) {
      navigate('/introduce')
    }
  }, [userLogin])

  console.log({ userLogin });

  return (
      <div className="app">
        <div className='app-container'>

          <div className='app-header'>
            <Nav />
          </div>

          <LoadPage />

          <div className='app-content' >
            <AppRoutes />
          </div>

        </div>
      </div>
  );
}

export default App;
