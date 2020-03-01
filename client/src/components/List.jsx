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
      compareNames: [],
      filters: {}
    }
    this.clickToCompare = this.clickToCompare.bind(this);
    this.renderCharacter = this.renderCharacter.bind(this);
    this.getHeroStatsById = this.getHeroStatsById.bind(this);
    this.getVillianStatsById = this.getVillianStatsById.bind(this);
  }

  componentDidMount() {
    this.getHeroStatsById(2);
    this.getVillianStatsById(7);
    axios.get('/heroes_villians')
      .then(({data}) => {
        this.setState({
          superheroes_villians: data,
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

  addOrRemoveFilter(property, value) {
    const newFilters = Object.assign({}, this.state.filters);
    const allValues = newFilters[property];
    if (allValues === undefined) {
      newFilters[property] = [value];
    } else if (allValues.includes(value)) {
      newFilters[property].splice(newFilters[property].indexOf(value), 1);
    } else {
      newFilters[property].push(value)
    }
    this.setState({
      filters: newFilters
    });
  }
    
  checkObjectAgainstFilters(object, filters) {
    const properties = Object.keys(object);
    return properties.every((property) => {
      if(typeof object[property] === "object") {
        return this.checkFilters(object[property])
      } else {
        if (filters[property] === undefined || filters[property].length === 0) return true;
        return filters[property].includes(object[property])
      }
    });
  }
    
  checkFilterIsActive(filters, filter, value) {
    return filters[filter] !== undefined && filters[filter].includes(value)
  }

  render() {
    const { superheroes_villians } = this.state
    return(
      <div>
        <h4> List All Heroes and Villians</h4>
        <h3>You have selected {this.state.compareNames.length ? this.state.compareNames[0] + " and " + this.state.compareNames[1] : "no characters"} to compare.</h3>
        <Link to={{pathname: "/compare-characters", state:{ items: this.state.compareItems }}}>See comparison</Link><br/>

        <Button color= {this.checkFilterIsActive(this.state.filters, "alignment", "BAD") ? "primary" : "secondary" } onClick= {() => this.addOrRemoveFilter("alignment", "BAD")}>Show Baddies</Button>
        <Button color= {this.checkFilterIsActive(this.state.filters, "alignment", "GOOD") ? "primary" : "secondary" } onClick= {() => this.addOrRemoveFilter("alignment", "GOOD")}>Show Goodies</Button>
        <Button color= {this.checkFilterIsActive(this.state.filters, "alignment", "NEUTRAL") ? "primary" : "secondary" } onClick= {() => this.addOrRemoveFilter("alignment", "NEUTRAL")}>Show Neutral</Button>
        <Button color= {this.checkFilterIsActive(this.state.filters, "alignment", "UNKNOWN") ? "primary" : "secondary" } onClick= {() => this.addOrRemoveFilter("alignment", "UNKNOWN")}>Show UNKNOWN</Button>

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
          { superheroes_villians ? superheroes_villians.filter((character) => this.checkObjectAgainstFilters(character, this.state.filters)).map(item => <ListItem key={item.id} item={item} clickToCompare={this.clickToCompare} />) : <h2>loading</h2>}
        </div>
      </div>
    )
  }
}

export default List;