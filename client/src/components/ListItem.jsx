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

class ListItem extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    const { item } = this.props; 
    console.log(item.alignment)
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
    return(
      // <Link to={`/character/:${item.id}`}>
        <Card style={{width: "50%", backgroundColor: color}} className={classes.root}>
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
          <CardActions>
            <Button size="small" color="primary">
              Learn More
            </Button>
            <Button size="small" color="primary">
              Compare
            </Button>
          </CardActions>
        </Card>
      // </Link>
    )
  }
}
export default ListItem;