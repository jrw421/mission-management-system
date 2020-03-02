import React, { Component } from 'react';
import CharacterCard from '../atoms/CharacterCard.jsx';
import TitleNavBar from '../atoms/TitleNavBar.jsx';
import CompareStatsChart from '../molecules/CompareStatsChart.jsx'
import '../../styles/main.css';

export default class CompareCharacters extends Component {
    constructor(props){
        super(props);
        this.goBack = this.goBack.bind(this)
    }

    goBack() {
        this.props.history.push('/');
    }
    
    render() {
        return(
            <div>
                <TitleNavBar return = {this.goBack} title = {this.props.location.state.items.map(item => item.name).join(", ")}></TitleNavBar>
                <div className="compareCharacterCard">
                    {this.props.location.state.items && 
                        this.props.location.state.items.map(item => {
                            return  (<CharacterCard key={item.id} item={item}/>)
                        })
                    }
                </div>
                <CompareStatsChart characters={this.props.location.state.items}/>
            </div>
        )
    }
}