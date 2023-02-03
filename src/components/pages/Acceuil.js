import React, {useEffect, useState} from "react";
import Personnage from "../personnages/Personnage";

function Acceuil() {
    const [characters, setCharacters] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    let ids = []
    let perso = []

    function rand(min, max, tab) {
        for(let i = 0; i < 5; i++) {
            tab.push(Math.floor(Math.random() * (max - min + 1) + min))
        }

        return tab
    }

    rand(0,826, ids)
    let link = 'https://rickandmortyapi.com/api/character/'

    ids.forEach(id => {
        link += id + ','
    })
    link = link.slice(0, -1)

    useEffect(() => {
        fetch(link)
            .then(res => res.json())
            .then(data => {
                setLoaded(true)
                setCharacters(data)
            })
    }, [])

    if(isLoaded) {
        characters.forEach(char => {
            perso.push(char)
        })
    }


    return (
        <div className={"d-flex flex-row"}>
            {perso.map(character =>
                <Personnage key={character.id} data={character}/>
            )}
        </div>
    )
}

export default Acceuil;