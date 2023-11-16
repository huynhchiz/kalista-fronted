import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './App.scss'
import Nav from '../components/Nav/Nav';
import Menu from '../components/Menu/Menu';
import AppRoutes from '../routes/AppRoutes';
import LoadPage from '../components/re-use/LoadPage/LoadPage';

import { themeSelector } from '../redux/selector';
import NotiModal from '../components/re-use/NotiModal/NotiModal';
import { useEffect } from 'react';
import { dispatchGetAccount/*, dispatchGetAccountFollowers, dispatchGetAccountFollowings*/ } from '../dispatchs/dispatchAccount';
import ErrorPage from '../components/ErrorPage/ErrorPage';

function App() {
  const darkTheme = useSelector(themeSelector)

  useEffect(() => {
    dispatchGetAccount()
    // dispatchGetAccountFollowers(10)
    // dispatchGetAccountFollowings(10)
  }, [])

  return (
    <BrowserRouter>
      <div className="app">
        <div className='app-container'>

          <div className='app-header'>
            <Nav />
          </div>

          <NotiModal top />

          <LoadPage />

          <ErrorPage />

          <div className={`app-content ${darkTheme ? 'app-content-dark' : ''}`} >
            <AppRoutes />
          </div>

          <div className='app-footer'>
            <Menu />
          </div>

        </div>
      </div>
    </BrowserRouter>
      
  );
}

export default App;
