import React, { Component } from 'react';
import axios from 'axios';

export default class Heroes extends Component {
    constructor(props){
        super(props);
        this.state = {
            hero: {}
        }
    }
    
    componentDidMount() {
        axios.get(`/heroes/:${1}`)
            .then(hero => {
                this.setState({
                    hero
                })
                console.log('heroes ', heroes)
            })
            .catch(err => {
                console.log('error')
            })
    }

    render() {
        const { hero } = this.state;
        return(
            <div>
                <h1>HEROES</h1>
                <div>{hero.id}</div>
                <div>{hero.slug}</div>
                <div>{hero.name}</div>
                {/* {this.state.heroes.map(hero => {
                    <div>{hero}</div>
                })} */}
            </div>
        )
    }
}