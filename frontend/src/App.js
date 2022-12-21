import './App.css';
import Myroutes from './Myroutes';
import { Provider } from 'react-redux';
import {store} from './redux/store'


function App() {
  return (
    <Provider store={store}>
        <div className="App">
          <Myroutes />
        </div>
    </Provider>
  );
}

export default App;
