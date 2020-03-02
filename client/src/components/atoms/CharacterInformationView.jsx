import React from 'react';

export default function CharacterInformationView ({props}) {
    return (
        <div className="characterInformationView">
            <h1>Powerstats</h1>
                <h3>Intelligence: {props.powerstats.intelligence}</h3>
                <h3>Strength: {props.powerstats.strength}</h3>
                <h3>Speed: {props.powerstats.speed}</h3>
                <h3>Durability: {props.powerstats.durability}</h3>
                <h3>Power: {props.powerstats.power}</h3>
                <h3>Combat: {props.powerstats.combat}</h3><br/>
            <h1>Appearance</h1>
                <h3>Gender: {props.appearance.male}</h3>
                <h3>Race: {props.appearance.race}</h3>
                <h3>Height: {props.appearance.height[0]}</h3>
                <h3>Weight: {props.appearance.weight[0]}</h3>
                <h3>Eye color: {props.appearance.eyeColor}</h3>
                <h3>Hair color: {props.appearance.hairColor}</h3><br/>
            <h1>Biography</h1>
                <h3>Full Name: {props.biography.fullName}</h3>
                <h3>Alter Egos: {props.biography.alterEgos}</h3>
                <h3>Aliases: {props.biography.aliases}</h3>
                <h3>Place of Birth: {props.biography.placeOfBirth}</h3>
                <h3>First Appearance: {props.biography.firstAppearance}</h3>
                <h3>Alignment: {props.biography.alignment}</h3>
                <h3>Publisher: {props.biography.publisher}</h3><br/>
            <h1>Work</h1>
                <h3>Occupation: {props.work.occupation}</h3>
                <h3>Base: {props.work.base}</h3><br/>
            <h1>Connections</h1>
                <h3>Group Affiliation: {props.connections.groupAffiliation}</h3>
                <h3>Relatives: {props.connections.relatives}</h3><br/>
            </div>
    )
}