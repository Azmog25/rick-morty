import React, {useState} from "react";
import {useCookies} from "react-cookie";
import {Button, Card} from "react-bootstrap";

function Personnage(props) {
    const [cookies, setCookies] = useCookies(['favoris'])
    const [isFavorite, setIsFavorite] = useState(cookies.favoris !== undefined ? cookies.favoris.includes(props.data.id) : false)

    let favIds = cookies.favoris !== undefined ? cookies.favoris : [];

    function toggleFavorite(id) {
        if(favIds.includes(id)) {
            favIds = favIds.filter(favoriteId => favoriteId !== id);
        } else {
            favIds.push(id)
        }
        setIsFavorite(!isFavorite)
        setCookies("favoris", favIds)
    }



    return (
        <Card style={{ width: '18rem', margin: '2rem'}} key={props.data.id} className={"shadow-lg"}>
            <Card.Img variant="top" src={props.data.image} />
            <Card.Body>
                <Card.Title>{props.data.name}</Card.Title>
            </Card.Body>
            <Card.Body>
                <Card.Link href={"/Personnage/" + props.data.id}>Plus d'info</Card.Link>
                <Button className={"float-end"} variant={"dark"} onClick={() => toggleFavorite(props.data.id)} style={{width: '3rem', height: '3rem'}}>
                    {isFavorite ? '💖' : '🤍'}
                </Button>
            </Card.Body>
        </Card>
    )
}

export default Personnage