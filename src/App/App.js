import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { userLoginSelector } from '../redux/selector';
import { useEffect } from 'react';

import './App.scss'
import Nav from '../components/Nav/Nav';
import AppRoutes from '../routes/AppRoutes';

function App() {
  const userLogin = useSelector(userLoginSelector)
  const navigate = useNavigate()
  
  useEffect(() => {
    if(userLogin && !userLogin.isAuthenticated) {
      navigate('/introduce')
    }
  }, [])

  return (
      <div className="app">
        <div className='app-container'>

          <div className='app-header'>
            <Nav />
          </div>

          <div className='app-content' >
            <AppRoutes />
          </div>

        </div>
      </div>
  );
}

export default App;
