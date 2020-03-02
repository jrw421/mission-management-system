import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../../styles/main.css'

export default (props) => {
  console.log(props)
  return (
    <AppBar position="static" className="bottom-margin">
     <Toolbar>
        {props.return ? <Button color= "inherit" onClick= {props.return}>{"< Back"}</Button> : null}
        <Typography gutterBottom variant="h6" component="h4">Mission Management Control: {props.title}</Typography>
      </Toolbar>
    </AppBar>
  );
}