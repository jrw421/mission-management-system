import React, { Component } from 'react';
import BarChart from 'react-easy-bar-chart';
import TitleNavBar from '../atoms/TitleNavBar.jsx'
import Button from '@material-ui/core/Button'
import { display } from '@material-ui/system';

class CompareStatsChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      attribute: "strength"
    }
  }

  changeAttribute(attribute) {
    this.setState({
      attribute
    });
  }

  render() {
    const colors = ["#7B4B94", "#7D82B8", "#B7E3CC", "#C4FFB2"]
    const data = this.props.characters.map((character, i) => {
      const powerstats = JSON.parse(character.rawJSON).powerstats
      console.log(powerstats)
      return {
        title: character.name + " " + this.state.attribute,
        value: powerstats[this.state.attribute],
        color: colors[i]
      }
    });

    return (
      <div>
        <TitleNavBar title ="Power Stats"></TitleNavBar>
        <BarChart 
          height={400}
          width={800}
          data={data}
        />
        <div styles ={{display: "flex", flexDirection: "column"}}>
          <Button variant = "contained" color= "primary" onClick= {() => this.changeAttribute("strength") }>Strength</Button>
          <Button variant = "contained" color= "primary" onClick= {() => this.changeAttribute("speed") }>Speed</Button>
          <Button variant = "contained" color= "primary" onClick= {() => this.changeAttribute("durability") }>Durability</Button>
          <Button variant = "contained" color= "primary" onClick= {() => this.changeAttribute("power") }>Power</Button>
          <Button variant = "contained" color= "primary" onClick= {() => this.changeAttribute("combat") }>Combat</Button>
          <Button variant = "contained" color= "primary" onClick= {() => this.changeAttribute("intelligence") }>Intelligence</Button>
        </div>
      </div>
    );
  }
}

export default CompareStatsChart;