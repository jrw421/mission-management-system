import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List.jsx';
import Character from './components/CharacterCard.jsx';
import CompareCharacters from './components/CompareCharacters.jsx'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

const App = () => (
    <BrowserRouter>
      <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* <li>
            <Link to="/character/:id">Character</Link>
          </li> */}
          <li>
            <Link to="/villians">Villians</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/character/:id" exact component={Character}/>
        <Route path="/compare-characters" exact component={CompareCharacters}/>
        <Route path="/" exact component={List}/>
          {/* <List /> */}
        <Route component={<div>Sorry, nothing here yet.</div>} />
      </Switch>
    </div>
  </BrowserRouter>
  )

ReactDOM.render(<App />, document.getElementById('app'));