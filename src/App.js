import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
// import Board from './components/Board';
import Game from './components/Game';

function App() {
  return (
    <Switch>
      <Route exact path = "/board" component={Game}></Route>
      <Redirect exact from="/" to="/board" />
    </Switch>
  );
}

export default App;
