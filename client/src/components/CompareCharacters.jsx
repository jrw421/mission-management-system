import React, { Component } from 'react';
import ListItem from './ListItem.jsx';

export default class CompareCharacters extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return(
            <div>
                <h2>Compare Characters</h2>
                <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                    {this.props.location.state.items && 
                        this.props.location.state.items.map(item => {
                            return  (<ListItem key={item.id} item={item}/>)
                        })
                    }
                </div>
            </div>
        )
    }
}