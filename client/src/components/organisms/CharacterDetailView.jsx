import React, { Component } from 'react';
import axios from 'axios';
import CharacterCard from '../atoms/CharacterCard.jsx';
import TitleNavBar from '../atoms/TitleNavBar.jsx'

export default class CharacterDetailView extends Component {
    constructor(props){
        super(props);
        this.state = {
            hero: {}
        }
        this.goBack = this.goBack.bind(this)
    }

    goBack() {
        this.props.history.push('/');
    }
    
    componentDidMount() {
        axios.get(`/heroes/${this.props.match.params.id}`)
            .then(hero => {
                this.setState({
                    hero: hero.data
                })
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
                <TitleNavBar return = {this.goBack} title = {heroCard ? heroCard.name : "UNKNOWN"}></TitleNavBar>
                {heroCard && 
                    <div style={{width: "30%"}}>
                        <CharacterCard style={{alignItems: "center"}} key={heroCard.id} item={heroCard} router={this.props}/>
                    </div>
                }
            </div>
        )
    }
}