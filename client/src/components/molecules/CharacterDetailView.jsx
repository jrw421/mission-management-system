import React, { Component } from 'react';
import axios from 'axios';
import CharacterCard from '../atoms/CharacterCard.jsx';

export default class CharacterDetailView extends Component {
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
        console.log('this is proips in detail', this.props)
        const { hero } = this.state;
        let heroCard = hero[0];
        return(
            <div>
                {heroCard && 
                    <div>
                        <h1>{heroCard.name}</h1>
                        <CharacterCard style={{alignItems: "center"}} key={heroCard.id} item={heroCard} router={this.props}/>
                    </div>
                }
            </div>
        )
    }
}