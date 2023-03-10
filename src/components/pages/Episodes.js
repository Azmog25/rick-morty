import {useEffect, useState} from "react";
import {Accordion, Button} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import MiniCarte from "../personnages/MiniCarte";

function Episodes() {
    const [episodes, setEpisodes] = useState([])
    const [characters, setCharacters] = useState([])
    const [episode, setEpisode] = useState([])
    const [isLoaded, setLoaded] = useState(false)

    let { page } = useParams()

    page = parseInt(page)
    const nextPage = page === 3 ? 3 : page + 1;
    const previousPage = page === 1 ? 1 : page - 1;

    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/episode?page=" + page)
            .then(res => res.json())
            .then(data => {
                setEpisodes(data.results)
                setLoaded(true)

                episodes.forEach(ep => {
                    fetch('https://rickandmortyapi.com/api/episode/' + parseInt(ep.episode.split("E")[1]))
                        .then(res => res.json())
                        .then(data => {
                            setEpisode(data);
                            console.log(data)

                            const characterRequest = data.characters.map(char => fetch(char).then(res => res.json()));
                            Promise.all(characterRequest).then(characterData => {
                                setLoaded(true);
                                setCharacters(characterData);
                            });
                        })
                })
            })
    }, [page])


    if(isLoaded) {
        return (
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", margin: "1rem"}}>
                    <Link to={`/Episodes/${previousPage}`} style={{}}>
                        <Button variant="dark">page précédente</Button>
                    </Link>
                    <Link to={`/Episodes/${nextPage}`} style={{}}>
                        <Button variant="dark">page suivante</Button>
                    </Link>
                </div>
                <div style={{marginTop: "5rem"}}>
                    {episodes.map(episode => (
                        <Accordion defaultActiveKey="0" key={episode.id}>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>{episode.episode} - <b>{episode.name}</b></Accordion.Header>
                                <Accordion.Body style={{height: "15rem", overflowY: "auto"}}>
                                    date de parution : {episode.air_date}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    ))}
                </div>
            </div>
        )
    }
}

export default Episodes