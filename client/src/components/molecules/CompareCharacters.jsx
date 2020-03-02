import React, { Component } from 'react';
import ListItem from '../atoms/CharacterCard.jsx';
import '../../styles/main.css';

export default class CompareCharacters extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return(
            <div>
                <h2>Compare Characters</h2>
                <div className="compareCharacterCard">
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