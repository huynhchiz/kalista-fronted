import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './App.scss'
import Nav from '../components/Nav/Nav';
import Menu from '../components/Menu/Menu';
import AppRoutes from '../routes/AppRoutes';
import LoadPage from '../components/re-use/LoadPage/LoadPage';
import NotiModal from '../components/re-use/NotiModal/NotiModal';
import ErrorPage from '../components/ErrorPage/ErrorPage';

import { themeSelector } from '../redux/selectors/themeSelector';
import ZoomedImage from '../components/re-use/ZoomedImage/ZoomedImage';
import { useEffect, useRef } from 'react';

import socketIOClient from 'socket.io-client'
import { accInfoSelector } from '../redux/selectors/accountSelector';

function App() {
  const darkTheme = useSelector(themeSelector)
  const accInfo = useSelector(accInfoSelector)
  const accountId = accInfo.userId

  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = socketIOClient.connect('http://localhost:3434')
    
    return () => {
        socketRef.current.disconnect(accountId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(accountId) {
      socketRef.current.emit('online', accountId)
    }
  }, [accountId])

  return (
    <BrowserRouter>
      <ZoomedImage />

      <div className={`app${darkTheme ? ' app-dark' : ''}`}>
        <div className={`app-container${darkTheme ? ' app-container-dark' : ''}`}>

          <div className='app-header'>
            <Nav />
          </div>

          <NotiModal top />

          <LoadPage />

          <ErrorPage />

          <div className={`app-content${darkTheme ? ' app-content-dark' : ''}`} >
            <AppRoutes socketRef={socketRef} />
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
