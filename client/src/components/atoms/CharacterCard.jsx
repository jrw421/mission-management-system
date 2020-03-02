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
    let color = (item.alignment && item.alignment.toLowerCase() === "good") ? "blue" : "red";

    const classes = makeStyles({
      root: {
        width: 50,
        backgroundColor: color,
      },
      media: {
        height: 140,
      },
    });
    const characterEndpoint = window.location.href.indexOf("character") !== -1 && window.location.href.indexOf("compare") === -1;
    const characterRenderShowMore = window.location.href.indexOf("character") !== -1;
    console.log(' character ', window.location.href.indexOf("character") !== -1, window.location.href.indexOf("compare-characters") === -1)
    return(
        <Card style={{width: characterEndpoint ? "100%" : "50%", backgroundColor: color}} className={classes.root}>
          <Link to={`/character/${item.id}`} params={{ id: item.id }}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="character image"
              height="440"
              image={item.image}
              title="character image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {item.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                May add description here
              </Typography>
              <Typography>
                {item.alignment}
              </Typography>
            </CardContent>
          </CardActionArea>
          </Link>
          <CardActions>
            {window && !characterRenderShowMore ?
            <div>
              <Link to={`/character/${item.id}`} params={{ id: item.id }}>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </Link>
                 <Button size="small" color="primary" onClick={() => {clickToCompare(item)}}>
                 Compare
               </Button>
               </div>
              :
              <Button size="small" color="primary" onClick={() => this.setState({ showDetails: !this.state.showDetails}, console.log('click'))}>
                  {!this.state.showDetails ? "Learn More" : "Hide details"};
              </Button>
            }
            {this.state.showDetails && 
              <div>
                {item.rawJSON}
              </div>
            }
          </CardActions>
        </Card>
    )
  }
}
export default CharacterCard;