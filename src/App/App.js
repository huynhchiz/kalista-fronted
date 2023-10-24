import './App.scss'
import Nav from '../components/Nav/Nav';
import Introduce from '../components/Introduce/Introduce';

function App() {
  return (
    <div className="app">
      <div className='app-layer-1'>
        <div className='app-layer-2'>
          <Nav />
          <Introduce />
        </div>
      </div>
    </div>
  );
}

export default App;
