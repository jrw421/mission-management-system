import React, { Component } from 'react';
import ListItem from './ListItem.jsx';
import axios from 'axios';

class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      superheroes_villians: []
    }
  }

  componentDidMount() {
    axios.get('/heroes_villians')
      .then(data => {
        this.setState({
          superheroes_villians: data
        })
      })
      .catch(err => {
        console.error('there was an error in frontend', err)
      })
  }

  render() {
    const { superheroes_villians } = this.state
    return(
      <div>
        <h4> List All Heroes and Villians </h4>
        <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
          { superheroes_villians.data ? superheroes_villians.data.map(item => <ListItem key={item.id} item={item}/>) : <h2>loading</h2>}
        </div>
      </div>
    )
  }
}

export default List;