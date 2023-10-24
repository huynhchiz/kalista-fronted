import './App.scss'
import Nav from '../components/Nav/Nav';
import Introduce from '../components/Introduce/Introduce';

function App() {
  return (
    <div className="app">
      <div className='app-container'>

        <div className='app-header'>
          <Nav />
        </div>

        <div className='app-content' >
          <Introduce />
        </div>

      </div>
    </div>
  );
}

export default App;
