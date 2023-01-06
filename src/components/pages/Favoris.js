import {useCookies} from "react-cookie";
import React, {useEffect, useState} from "react";
import Personnage from "../personnages/Personnage";

function Favoris() {
    const [cookies] = useCookies(['favoris'])
    const [characters, setCharacters] = useState([])
    const [isLoaded, setLoaded] = useState(false)

    let favIds = cookies.favoris !== undefined ? cookies.favoris : [];
    let persoFav = []

    useEffect(() => {
        let link = 'https://rickandmortyapi.com/api/character/['

        favIds.forEach(id => {
            link += id + ','
        })
        link = link.slice(0, -1) + ']'

        fetch(link)
            .then(res => res.json())
            .then(data => {
                setLoaded(true)
                setCharacters(data)
            })
    }, [])

    if(isLoaded) {
        for(let i = 0; i < characters.length; i++) {
            persoFav.push(characters[i])
        }
    } else {
        return <div>Loading ...</div>
    }

    return (
        <div className={"d-flex flex-row"}>
            {persoFav.length === 0 ? <h3 style={{margin: "auto"}}>aucun personnage en favoris</h3> : persoFav.map(character =>
                <Personnage key={character.id} data={character}/>
            )}
        </div>
    )
}

export default Favoris