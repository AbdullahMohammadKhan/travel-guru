import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Data from "../../Data/Data.js";
const Home = () => {
  return (
    <Container>
      <Row>
        <Col xs={6}>
          {Data.map((d) => (
            <Card key={d.id} className="bg-dark text-white">
              <Card.Img
                onClick={() => console.log(d.id)}
                src={d.url}
                alt="Card image"
              />
              <Card.ImgOverlay>
                <Card.Title>
                  <Link to={"/booking/" + d.id}>{d.name}</Link>
                </Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
                <Card.Text>Last updated 3 mins ago</Card.Text>
              </Card.ImgOverlay>
            </Card>
          ))}
        </Col>
        <Col xs={6}></Col>
      </Row>
    </Container>
  );
};

export default Home;
