import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { useEffect } from 'react';

import './App.scss'
import Nav from '../components/Nav/Nav';
import Menu from '../components/Menu/Menu';
import AppRoutes from '../routes/AppRoutes';
import LoadPage from '../components/re-use/LoadPage/LoadPage';
import NotiModal from '../components/re-use/NotiModal/NotiModal';
import ErrorPage from '../components/ErrorPage/ErrorPage';

import { themeSelector } from '../redux/selectors/themeSelector';

function App() {
  const darkTheme = useSelector(themeSelector)

  return (
    <BrowserRouter>
      <div className={`app${darkTheme ? ' app-dark' : ''}`}>
        <div className={`app-container${darkTheme ? ' app-container-dark' : ''}`}>

          <div className='app-header'>
            <Nav />
          </div>

          <NotiModal top />

          <LoadPage />

          <ErrorPage />

          <div className={`app-content${darkTheme ? ' app-content-dark' : ''}`} >
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
