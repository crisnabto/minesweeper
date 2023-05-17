import './App.css';
import { Route, Switch } from 'react-router-dom';
// import Board from './components/Board';
import Game from './components/Game';

function App() {
  return (
    <Switch>
      <Route exact path = "/board" component={Game}></Route>
    </Switch>
  );
}

export default App;
