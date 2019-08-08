import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class FlightsView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="row destination-row mx-auto">
          <div className="column">
            <Card style={{ width: "18rem" }} id="flightsCard1">
              <Card.Img
                variant="top"
                src={require("./Film_picture/Crazy_Rich_asians_Singapore.jpg")}
              />
              <Card.Body>
                <Button variant="primary">Fly to XXXX</Button>
              </Card.Body>
            </Card>
          </div>
          <div className="column">
            <Card style={{ width: "18rem" }} id="flightsCard2">
              <Card.Img
                variant="top"
                src={require("./Film_picture/Mama_Mia_.jpg")}
              />
              <Card.Body>
                <Button variant="primary">Fly to XXXX</Button>
              </Card.Body>
            </Card>
          </div>
          <div className="column">
            <Card style={{ width: "18rem" }} id="flightsCard3">
              <Card.Img
                variant="top"
                src={require("./Film_picture/BigLittleLies_TVScreen_Monterey.jpg")}
              />
              <Card.Body>
                <Button variant="primary">Fly to XXXX</Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
export default FlightsView;
