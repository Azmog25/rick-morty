import PersoInfo from "../personnages/PersoInfo";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import TableauEpisode from "../TableauEpisode";

function PagePersonnage() {
    const { id } = useParams()
    const [character, setCharacter] = useState([])
    const [isLoaded, setLoaded] = useState(false)

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character/' + id)
            .then(res => res.json())
            .then(data => {
                setLoaded(true)
                setCharacter(data)
            })
    }, [])

    if(isLoaded) {
        return (
            <div className={"d-flex flex-row"}>
                <PersoInfo data={character}/>
                <TableauEpisode data={character}/>
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}

export default PagePersonnage