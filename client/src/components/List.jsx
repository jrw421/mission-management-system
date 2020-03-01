import React, { Component } from 'react';
import ListItem from './ListItem.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FuzzySearch from 'react-fuzzy';
import Button from '@material-ui/core/Button';
import { action } from '@storybook/addon-actions';

class List extends Component {
  constructor(props){
    super(props);
    this.state = {
      superheroes_villians: [],
      superheroes: [],
      compareItems: [],
      compareNames: []
    }
    this.clickToCompare = this.clickToCompare.bind(this);
    this.renderCharacter = this.renderCharacter.bind(this);
    this.filterByAlignment = this.filterByAlignment.bind(this);
    this.getHeroStatsById = this.getHeroStatsById.bind(this);
    this.getVillianStatsById = this.getVillianStatsById.bind(this);
  }

  componentDidMount() {
    this.getHeroStatsById(2);
    this.getVillianStatsById(7);
    axios.get('/heroes_villians')
      .then(data => {
        this.setState({
          superheroes_villians: data,
          backup_data: data
        })
      })
      .catch(err => {
        console.error('there was an error in frontend', err)
      })
  }

  clickToCompare(item) {
    if (this.state.compareNames.length < 4) {
      this.setState({
        compareNames: [...this.state.compareNames, item.name],
        compareItems: [...this.state.compareItems, item]
      })
    } else {
      alert("You can only compare up to four characters");
    }
  }

  renderCharacter(item) {
    return (
      <ListItem key={item.id} item={item} clickToCompare={this.clickToCompare} />
    )
  }

  getHeroStatsById(id) {
    axios.get(`/hero-stats/${2}`)
      .then(stats => {
        console.log('stats ', stats)
      })
      .catch(err => {
        console.log('error: ', err)
      })
  }
  
  getVillianStatsById(id) {
    axios.get(`/villian-stats/${12}`)
      .then(stats => {
        console.log('villian stats ', stats)
      })
      .catch(err => {
        console.log('error: ', err)
      })
  }

  filterByAlignment(alignment) {
    let filteredData = this.state.superheroes_villians.data;
    filteredData = filteredData.filter((item) => {
      let align = item.alignment && item.alignment.toLowerCase();
      return align === alignment;
    })
    this.setState({ 
      superheroes_villians: { data: filteredData }
    })
  }

  render() {
    const { superheroes_villians } = this.state
    return(
      <div>
        <h4> List All Heroes and Villians</h4>
        <h3>You have selected {this.state.compareNames.length ? this.state.compareNames[0] + " and " + this.state.compareNames[1] : "no characters"} to compare.</h3>
        <Link to={{pathname: "/compare-characters", state:{ items: this.state.compareItems }}}>See comparison</Link><br/>

        <Button onClick={() => this.filterByAlignment("bad")}>Show all baddies</Button>
        <Button onClick={() => this.filterByAlignment("good")}>Show all goodies</Button>

        <FuzzySearch
          list={superheroes_villians.data}
          keys={['name', 'alignment']}
          width={430}
          onSelect={action('selected')}
          distance={3}
          threshold={.01}
          resultsTemplate={(props, state, styles, clickHandler) => {
            return superheroes_villians.data.map((item, i) => {
              const style = state.selectedIndex === i ? styles.selectedResultStyle : styles.resultsStyle;
              return (
                  <div
                    key={i}
                    style={style}
                  >
                    <Link to={`/character/${item.id}`} params={{ id: item.id }}>{item.name}</Link>
                    <span style={{ float: 'right', opacity: 0.5 }}> {item.alignment}</span>
                </div>
              );
            });
          }}
        />
        <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
          { superheroes_villians.data ? superheroes_villians.data.map(item => <ListItem key={item.id} item={item} clickToCompare={this.clickToCompare} />) : <h2>loading</h2>}
        </div>
      </div>
    )
  }
}

export default List;