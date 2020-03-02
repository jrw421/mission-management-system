import React from 'react';
import ReactDOM from 'react-dom';
import CharacterList from './components/molecules/CharacterList.jsx';
import CharacterDetailView from './components/molecules/CharacterDetailView.jsx';
import CompareCharacters from './components/molecules/CompareCharacters.jsx'
import {
  BrowserRouter as Router,
  Route,
  Switch 
} from 'react-router-dom';

const App = () => (
  <Router>
    <Switch>
      <Route path="/character/:id" exact component={CharacterDetailView}/>
      <Route path="/compare-characters" exact component={CompareCharacters}/>
      <Route path="/" exact component={CharacterList}/>
      <Route component={<div>Sorry, nothing here yet.</div>} />
    </Switch>
  </Router>
  )

ReactDOM.render(<App />, document.getElementById('app'));