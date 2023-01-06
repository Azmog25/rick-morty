import React, { useState, useEffect } from 'react';
import Personnage from "./personnages/Personnage";


function Cards() {
    const [characters, setCharacters] = useState([]);
    let perso = []

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character')
            .then(res => res.json())
            .then(data => {
                setCharacters(data.results);
            })
    }, []);

    characters.forEach(char => {
        perso.push(<Personnage data={char}/>)
    })

    return (
        <div>

        </div>
    )
}

export default Cards;