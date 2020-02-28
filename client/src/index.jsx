import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List.jsx';
import axios from 'axios';
import Heroes from './components/Heroes.jsx';
import {
  // BrowserRouter as Router,
  Switch,
  // Route,
  Link
} from "react-router-dom";
import {BrowserRouter, Route} from 'react-router-dom';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      superheroes_villians: []
    }
  }

  componentDidMount() {
    axios.get('/heroes_villians')
      .then(data => {
        console.log('data in frontend', data)
        this.setState({
          superheroes_villians: data
        })
      })
      .catch(err => {
        console.error('there was an error in frontend', err)
      })
  }

  render () {
    return (
      <BrowserRouter>
       <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/heroes">Heroes</Link>
            </li>
            <li>
              <Link to="/villians">Villians</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/heroes" exact component={Heroes}>
          </Route>
          <Route path="/villians" exact component={Heroes}>
          </Route>
          <Route path="/" >
            <List/>
          </Route>
          <Route component={<div>Sorry, nothing here yet.</div>} />
        </Switch>
      </div>
    </BrowserRouter>
      // <div>
      //   <h1>All Superheroes and Villians</h1>
      //   <List items={this.state.superheroes_villians}/>
      // </div>
      )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));