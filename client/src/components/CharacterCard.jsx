import React, { Component } from 'react';
import ListItem from './ListItem.jsx';
import axios from 'axios';

export default class Heroes extends Component {
    constructor(props){
        super(props);
        this.state = {
            hero: {}
        }
    }
    
    componentDidMount() {
        axios.get(`/heroes/${this.props.match.params.id}`)
            .then(hero => {
                this.setState({
                    hero: hero.data
                })
                console.log('heroes ', this.state.hero)
            })
            .catch(err => {
                console.log('error', err)
            })
    }

    render() {
        const { hero } = this.state;
        let heroCard = hero[0];
        return(
            <div>
                {heroCard && 
                    <div>
                        <h1>{heroCard.name}</h1>
                        <ListItem style={{alignItems: "center"}} key={heroCard.id} item={heroCard}/>
                    </div>
                }
            </div>
        )
    }
}