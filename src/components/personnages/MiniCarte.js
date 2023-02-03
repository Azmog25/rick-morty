import {Card} from "react-bootstrap";
import React from "react";

function MiniCarte(props) {
    return (
        <Card style={{height: "5rem", width: '9rem', margin: '2rem'}} key={props.data.id} className={"shadow-lg"}>
            <Card.Img variant="top" src={props.data.image} />
            <Card.Body>
                <Card.Title>{props.data.name}</Card.Title>
            </Card.Body>
            <Card.Body>
                <Card.Link href={"/Personnage/" + props.data.id}>Plus d'info</Card.Link>
            </Card.Body>
        </Card>
    )
}

export default MiniCarte