import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";

class FlightsView extends Component {
  render() {
    return (
      <div>
        <CardDeck>
          <Card className="flightCard" id="flightsCard1">
            <Card.Img
              variant="top"
              src={require("./Film_picture/Crazy_Rich_asians_Singapore.jpg")}
            />
            <Card.Body>
              <Button variant="primary">Fly to Singapore</Button>
            </Card.Body>
          </Card>
          <Card className="flightCard" id="flightsCard2">
            <Card.Img
              variant="top"
              src={require("./Film_picture/Crazy_Rich_asians_Singapore.jpg")}
            />
            <Card.Body>
              <Button variant="primary">Fly to Singapore</Button>
            </Card.Body>
          </Card>
          <Card className="flightCard" id="flightsCard3">
            <Card.Img
              variant="top"
              src={require("./Film_picture/Crazy_Rich_asians_Singapore.jpg")}
            />
            <Card.Body>
              <Button variant="primary">Fly to Singapore</Button>
            </Card.Body>
          </Card>
          {/*           
</CardDeck>
        <CardDeck>
          <Card className="flightCard" id="flightsCard1">
            <Card.Img
              variant="top"
              src={require("./Film_picture/Crazy_Rich_asians_Singapore.jpg")}
            />
            <Card.Body>
              <Button variant="primary">Fly to Singapore</Button>
            </Card.Body>
          </Card>

          <Card className="flightCard" id="flightsCard2">
            <Card.Img
              variant="top"
              src={require("./Film_picture/mama_mia_portrait.jpg")}
            />
            <Card.Body>
              <Button variant="primary">Fly to Skiathos</Button>
            </Card.Body>
          </Card>

          <Card className="flightCard" id="flightsCard3">
            <Card.Img
              variant="top"
              src={require("./Film_picture/MI_fallout_paris.jpg")}
            />
            <Card.Body>
              <Button variant="primary">Fly to Paris</Button>
            </Card.Body>
          </Card>*/}
        </CardDeck>
      </div>
    );
  }
}
export default FlightsView;
