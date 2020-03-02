import React from 'react';
import ReactDOM from 'react-dom';
import CharacterList from './components/molecules/CharacterList.jsx';
import CharacterDetailView from './components/molecules/CharacterDetailView.jsx';
import CompareCharacters from './components/molecules/CompareCharacters.jsx'
// import { BrowserRouter, Route, Switch, Link, withRouter } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch, Link 
} from 'react-router-dom';

const App = () => (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/villians">Villians</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/character/:id" exact component={CharacterDetailView}/>
        <Route path="/compare-characters" exact component={CompareCharacters}/>
        <Route path="/" exact component={CharacterList}/>
        <Route component={<div>Sorry, nothing here yet.</div>} />
      </Switch>
  </Router>
  )

ReactDOM.render(<App />, document.getElementById('app'));