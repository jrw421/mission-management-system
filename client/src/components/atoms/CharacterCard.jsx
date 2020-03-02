import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

class CharacterCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      showDetails: false
    }
  }
  
  render() {
    const { item, clickToCompare } = this.props; 
    let color;
    if (item.alignment === "UNKNOWN") {
      color = "#7B68EE"
    } else if (item.alignment === "NEUTRAL") {
      color = "#696969"
    } else {
      color = ((item.alignment === "GOOD") ? "#3498DB" : "#8b0000");
    }
    const characterEndpoint = window.location.href.indexOf("character") !== -1 && window.location.href.indexOf("compare") === -1;
    const characterRenderShowMore = window.location.href.indexOf("character") !== -1;
    let parsedItem = JSON.parse(item.rawJSON);
    return(
      <Card style={{width: characterEndpoint ? "100%" : "20%", backgroundColor: color, color: "white", margin: "15px" }} >
        <Link to={`/character/${item.id}`} params={{ id: item.id }}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="character image"
              height="100%"
              image={item.image}
              title="character image"
            />
            <CardContent className="cardContent">
              <Typography gutterBottom variant="h4" component="h2">
                {item.name}
              </Typography>
              <Typography variant="body2" component="p">
                Also known as: {parsedItem.biography.alterEgos}
              </Typography>
              <Typography>
                Alignment: {item.alignment}
              </Typography>
            </CardContent>
          </CardActionArea>
          </Link>
          <CardActions>
            {window && !characterRenderShowMore ?
            <div className="smallButton">
              <Link to={`/character/${item.id}`} params={{ id: item.id }}>
                <Button size="small" variant = "contained" color= { item.alignment === "BAD" ? "secondary" : "primary" }>
                  Learn More
                </Button>
              </Link>
                 <Button size="small" variant = "contained" color= { item.alignment === "BAD" ? "secondary" : "primary" } onClick={() => {clickToCompare(item)}}>
                 Select to Compare
               </Button>
               </div>
              :
              <Button size="small" onClick={() => this.setState({ showDetails: !this.state.showDetails})}>
                  {!this.state.showDetails ? "Learn More" : "Hide details"};
              </Button>
            }
            {this.state.showDetails && 
              <div>
                <h1>Powerstats</h1>
                  <h3>Intelligence: {parsedItem.powerstats.intelligence}</h3>
                  <h3>Strength: {parsedItem.powerstats.strength}</h3>
                  <h3>Speed: {parsedItem.powerstats.speed}</h3>
                  <h3>Durability: {parsedItem.powerstats.durability}</h3>
                  <h3>Power: {parsedItem.powerstats.power}</h3>
                  <h3>Combat: {parsedItem.powerstats.combat}</h3><br/>
                <h1>Appearance</h1>
                  <h3>Gender: {parsedItem.appearance.male}</h3>
                  <h3>Race: {parsedItem.appearance.race}</h3>
                  <h3>Height: {parsedItem.appearance.height[0]}</h3>
                  <h3>Weight: {parsedItem.appearance.weight[0]}</h3>
                  <h3>Eye color: {parsedItem.appearance.eyeColor}</h3>
                  <h3>Hair color: {parsedItem.appearance.hairColor}</h3><br/>
                <h1>Biography</h1>
                  <h3>Full Name: {parsedItem.biography.fullName}</h3>
                  <h3>Alter Egos: {parsedItem.biography.alterEgos}</h3>
                  <h3>Aliases: {parsedItem.biography.aliases}</h3>
                  <h3>Place of Birth: {parsedItem.biography.placeOfBirth}</h3>
                  <h3>First Appearance: {parsedItem.biography.firstAppearance}</h3>
                  <h3>Alignment: {parsedItem.biography.alignment}</h3>
                  <h3>Publisher: {parsedItem.biography.publisher}</h3><br/>
                <h1>Work</h1>
                  <h3>Occupation: {parsedItem.work.occupation}</h3>
                  <h3>Base: {parsedItem.work.base}</h3><br/>
                <h1>Connections</h1>
                  <h3>Group Affiliation: {parsedItem.connections.groupAffiliation}</h3>
                  <h3>Relatives: {parsedItem.connections.relatives}</h3><br/>
              </div>
            }
          </CardActions>
        </Card>
    )
  }
}
export default CharacterCard;