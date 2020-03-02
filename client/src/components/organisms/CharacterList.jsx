import React, { Component } from 'react';
import ListItem from '../atoms/CharacterCard.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FuzzySearch from 'react-fuzzy';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import classes from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { action } from '@storybook/addon-actions';
import '../../styles/main.css';
import Typography from '@material-ui/core/Typography';
import TitleNavBar from '../atoms/TitleNavBar.jsx';

class CharacterList extends Component {
  constructor(props){
    super(props);
    this.state = {
      superheroes_villians: [],
      superheroes: [],
      compareItems: [],
      compareNames: [],
      filters: {},
      powerstats: {}
    }
    this.clickToCompare = this.clickToCompare.bind(this);
    this.renderCharacter = this.renderCharacter.bind(this);
    this.getHeroStatsById = this.getHeroStatsById.bind(this);
    this.getVillianStatsById = this.getVillianStatsById.bind(this);
    this.goBack = this.goBack.bind(this)
  }

  goBack() {
    this.props.history.push('/');
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
    axios.get(`/hero-stats/${id}`)
      .then(stats => {
        console.log('stats ', stats)
      })
      .catch(err => {
        console.log('error: ', err)
      })
  }
  
  getVillianStatsById(id) {
    axios.get(`/villian-stats/${id}`)
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

  sortCharacters(sortFilter) {

  }

  render() {
    const { superheroes_villians } = this.state
    return(
      <div className="characterList">
      <TitleNavBar title = "Character View" return={this.goBack}></TitleNavBar>
      <Typography style={{marginTop: "15px"}} gutterBottom variant="h6" component="h6">Filters</Typography>
      <Button variant = "contained" color= {this.checkFilterIsActive(this.state.filters, "alignment", "BAD") ? "primary" : "secondary" } onClick= {() => this.addOrRemoveFilter("alignment", "BAD")}>Show Baddies</Button>
      <Button variant = "contained" color= {this.checkFilterIsActive(this.state.filters, "alignment", "GOOD") ? "primary" : "secondary" } onClick= {() => this.addOrRemoveFilter("alignment", "GOOD")}>Show Goodies</Button>
      <Button variant = "contained" color= {this.checkFilterIsActive(this.state.filters, "alignment", "NEUTRAL") ? "primary" : "secondary" } onClick= {() => this.addOrRemoveFilter("alignment", "NEUTRAL")}>Show Neutral</Button>
      <Button variant = "contained" color= {this.checkFilterIsActive(this.state.filters, "alignment", "UNKNOWN") ? "primary" : "secondary" } onClick= {() => this.addOrRemoveFilter("alignment", "UNKNOWN")}>Show UNKNOWN</Button>
      <Button variant = "contained" color= {this.checkFilterIsActive(this.state.filters, "alignment", "UNKNOWN") ? "primary" : "secondary" } onClick= {() => this.sortCharacters("strength", "UNKNOWN")}>Sort By Stength</Button>
      <Typography style={{marginTop: "25px"}} gutterBottom variant="h6" component="h6">Search</Typography>
      <div className="fuzzySearch">
        <FuzzySearch
          list={superheroes_villians}
          caseSensitive={false}
          keys={['name', 'alignment']}
          width={800}
          onSelect={action('selected')}
          distance={3}
          threshold={.01}
          resultsTemplate={(props, state, styles, clickHandler) => {
            return state.results.map((item, i) => {
              const parsedItem = JSON.parse(item.rawJSON);
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
        <br/>
      </div>
      <Container style={{display:"flex"}}>
        <Typography style={{marginTop: "15px"}} gutterBottom variant="h6" component="h6">{this.state.compareNames.length ? "You have selected " + this.state.compareNames.slice(",").join(", ") : "Please select characters to compare"} to compare.</Typography>
        {this.state.compareItems.map((character) => <Avatar alt={character.slug} src={character.image}/>)}
        {(this.state.compareItems && this.state.compareItems.length > 1) ? <Link to={{pathname: "/compare-characters", state:{ items: this.state.compareItems }}}>
        <Button size="small" variant = "contained" color= "primary" >
          See Comparison
        </Button>
      </Link>: null }
      </Container>
      <Container style={{display:"flex"}}>
        <div className="characterListCards">
          { superheroes_villians && this.state.filters ? superheroes_villians.filter((character) => this.checkObjectAgainstFilters(character, this.state.filters)).map(item => <ListItem style={{padding: "1px"}} key={item.id} item={item} clickToCompare={this.clickToCompare} />) : 
            superheroes_villians.sort((character) => this.sortCharacters(character, sortFilter)).map(item => <ListItem style={{padding: "1px"}} key={item.id} item={item} clickToCompare={this.clickToCompare} />) }
            {/* // : <h2>loading</h2>} */}
            {/* // <h2>loading</h2>} */}
        </div>
      </Container>
    </div>
    )
  }
}

export default CharacterList;