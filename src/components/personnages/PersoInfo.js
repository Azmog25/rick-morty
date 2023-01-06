import {Button, Card, ListGroup} from "react-bootstrap";
import React, {useState} from "react";
import {useCookies} from "react-cookie";

function PersoInfo(props) {
    const [cookies, setCookies] = useCookies(['favoris'])
    const [isFavorite, setIsFavorite] = useState(cookies.favoris !== undefined ? cookies.favoris.includes(props.data.id) : false)

    let favIds = cookies.favoris || [];

    function toggleFavorite(id) {
        if(favIds.includes(id)) {
            favIds = favIds.filter(favoriteId => favoriteId !== id);
        } else {
            favIds.push(id)
        }
        console.log(favIds)
        setIsFavorite(!isFavorite)
        setCookies("favoris", favIds)
    }

    return (
        <Card style={{ height: '35rem', width: '18rem', margin: '2rem'}} key={props.data.id} className={"shadow-lg"}>
            <Card.Img variant="top" src={props.data.image} />
            <Card.Body>
                <Card.Title>{props.data.name}</Card.Title>
            </Card.Body>
            <ListGroup variant="flush">
                <ListGroup.Item>statut : {props.data.status}</ListGroup.Item>
                <ListGroup.Item>sexe : {props.data.gender}</ListGroup.Item>
                <ListGroup.Item>type : {props.data.type}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Button className={"float-end"} variant={"dark"} style={{width: '3rem', height: '3rem'}} onClick={() => toggleFavorite(props.data.id)}>
                    {isFavorite ? '💖' : '🤍'}
                </Button>
            </Card.Body>
        </Card>
    )
}

export default PersoInfo