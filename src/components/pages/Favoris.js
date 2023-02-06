import {useCookies} from "react-cookie";
import React, {useEffect, useState} from "react";
import Personnage from "../personnages/Personnage";
import {getFavoris} from "../../database/DBHandler";
import {useSelector} from "react-redux";

function Favoris() {
    const [cookies] = useCookies(['favoris'])
    const [characters, setCharacters] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    const user = useSelector(state => state.user)
    console.log("user ", user)

    let persoFav = []

    useEffect(() => {
        if(user) {
            getFavoris(user)
                .then((res) => {
                    console.log("tableau des favoris : ", res)
                    let link = 'https://rickandmortyapi.com/api/character/['

                    res.forEach(id => {
                        link += id + ','
                    })
                    link = link.slice(0, -1) + ']'

                    fetch(link)
                        .then(response => response.json())
                        .then(data => {
                            setLoaded(true)
                            setCharacters(data)
                        })
                })
                .catch((err) => console.log(err))
        }
    }, [])

    if(isLoaded) {
        for(let i = 0; i < characters.length; i++) {
            persoFav.push(characters[i])
        }
    } else {
        return <h3>Veuillez vous connecter pour avoir accès à la page favoris</h3>
    }

    return (
        <div className={"d-flex flex-row"}>
            {persoFav.map(character =>
                <Personnage key={character.id} data={character}/>
            )}
        </div>
    )
}

export default Favoris