import {Table} from "react-bootstrap";
import {useEffect, useState} from "react";

function TableauEpisode(props) {
    const [character, setCharacter] = useState([])
    const [infoEp, setInfoEp] = useState([])
    const [isLoaded, setLoaded] = useState(false)

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character/' + props.data.id)
            .then(res => res.json())
            .then(data => {
                setCharacter(data);

                const episodeRequests = data.episode.map(ep => fetch(ep).then(res => res.json()));
                Promise.all(episodeRequests).then(episodeData => {
                    setLoaded(true);
                    setInfoEp(episodeData);
                });
            })
    }, [])

    if(isLoaded) {
        return (
            <div style={{ height: "50rem", overflowY: "auto", margin: "2rem"}}>
                <Table striped bordered hover variant="dark" style={{}}>
                        <thead>
                        <tr>
                            <th>code</th>
                            <th>nom</th>
                            <th>date</th>
                            <th>lien</th>
                        </tr>
                        </thead>
                        <tbody>
                    {infoEp.map(ep =>
                        <tr key={ep.id}>
                            <td>{ep.episode}</td>
                            <td>{ep.name}</td>
                            <td>{ep.air_date}</td>
                            <td><a href={"/episode/" + parseInt(ep.episode.split("E")[1])}>voir la fiche de l'épisode</a></td>
                        </tr>
                    )}
                        </tbody>
                    </Table>
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}

export default TableauEpisode