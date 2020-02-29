import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List.jsx';
import Heroes from './components/Heroes.jsx';
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
        <Route path="/character/:id" exact component={Heroes}/>
        <Route path="/villians" exact component={Heroes}/>
        <Route path="/" exact component={List}/>
          {/* <List /> */}
        <Route component={<div>Sorry, nothing here yet.</div>} />
      </Switch>
    </div>
  </BrowserRouter>
  )

ReactDOM.render(<App />, document.getElementById('app'));