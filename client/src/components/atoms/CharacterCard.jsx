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
import CharacterInformationView from './CharacterInformationView.jsx';

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
              <CharacterInformationView props={parsedItem}/>
            }
          </CardActions>
        </Card>
    )
  }
}
export default CharacterCard;