import React from "react";
import "./weather.css";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { PayPalButton } from "react-paypal-button-v2";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardGroup";

class TopFiveFlights extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flight1: "",
      flight2: "",
      flight3: "",
      price1: "",
      price2: "",
      price3: "",
      extra1: "",
      extra2: "",
      extra3: "",
      showModal1: false,
      showModal2: false,
      showModal3: false
    };
    this.open1 = this.open1.bind(this);
    this.close1 = this.close1.bind(this);
    this.open2 = this.open2.bind(this);
    this.close2 = this.close2.bind(this);
    this.open3 = this.open3.bind(this);
    this.close3 = this.close3.bind(this);
    this.getTop5Flights("1", "JSI");
    this.getTop5Flights("2", "CDG");
    this.getTop5Flights("3", "SIN");
  }

  close1() {
    this.setState({ ["showModal1"]: false });
  }

  open1() {
    this.setState({ ["showModal1"]: true });
  }

  close2() {
    this.setState({ ["showModal2"]: false });
  }

  open2() {
    this.setState({ ["showModal2"]: true });
  }

  close3() {
    this.setState({ ["showModal3"]: false });
  }

  open3() {
    this.setState({ ["showModal3"]: true });
  }

  async getTop5Flights(value, destination) {
    let data;

    let current = new Date();
    current.setMonth(current.getMonth() + 1);

    let formattedDate =
      current.getFullYear() + "-" + current.getMonth() + "-" + current.getDay();

    try {
      let URL =
        "http://localhost:8080/getflight/" + destination + "/lhr/2019-10-10";
      let response = await fetch(URL);
      data = await response.json().then(stringRes => {
        this.setState({
          ["flight" + value]: stringRes.airlineName
        });
        this.setState({
          ["price" + value]: stringRes.price
        });
        this.setState({
          ["extra" + value]: stringRes.extra
        });
      });

      //console.log(URL);
    } catch (e) {
      console.log("error", e);
    }

    return data;
  }

  render() {
    return (
      <div>
        <CardDeck>
          <Card bg="light" className="flightCard" id="flightsCard1">
            <Card.Img
              variant="top"
              src={require("./Film_picture/Mama_Mia_.jpg")}
            />
            <Card.Body>
              <Button
                variant="light"
                // variant="outline-dark"
                onClick={this.open1}
              >
                Fly to Skiathos
              </Button>
            </Card.Body>
          </Card>
          <Modal show={this.state.showModal1} onHide={this.close1}>
            <Modal.Header closeButton>
              <Modal.Title>London to Skiathos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p> {this.state.flight1}</p>
              <p> £ {this.state.price1}</p>
              <p> {this.state.extra1}</p>
            </Modal.Body>
            <Modal.Footer>
              <div className="paypalButton">
                <PayPalButton
                  amount={this.state.price1}
                  onSuccess={(details, data) => {
                    alert(
                      "Transaction completed by " +
                        details.payer.name.given_name
                    );

                    // OPTIONAL: Call your server to save the transaction
                    return fetch("/paypal-transaction-complete", {
                      method: "post",
                      body: JSON.stringify({
                        orderID: data.orderID
                      })
                    });
                  }}
                  options={{
                    clientId: "sb",
                    currency: "GBP"
                  }}
                />
              </div>
            </Modal.Footer>
          </Modal>
          <Card bg="light" className="flightCard" id="flightsCard1">
            <Card.Img
              variant="top"
              src={require("./Film_picture/MI_Fallout.jpg")}
            />
            <Card.Body>
              <Button variant="light" onClick={this.open2}>
                Fly to Paris
              </Button>
            </Card.Body>
          </Card>

          <Modal show={this.state.showModal2} onHide={this.close2}>
            <Modal.Header closeButton>
              <Modal.Title>London to Paris</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p> {this.state.flight2}</p>
              <p> £ {this.state.price2}</p>
              <p> {this.state.extra2}</p>
            </Modal.Body>
            <Modal.Footer>
              <div className="paypalButton">
                <PayPalButton
                  amount={this.state.price2}
                  onSuccess={(details, data) => {
                    alert(
                      "Transaction completed by " +
                        details.payer.name.given_name
                    );

                    // OPTIONAL: Call your server to save the transaction
                    return fetch("/paypal-transaction-complete", {
                      method: "post",
                      body: JSON.stringify({
                        orderID: data.orderID
                      })
                    });
                  }}
                  options={{
                    clientId: "sb",
                    currency: "GBP"
                  }}
                />
              </div>
            </Modal.Footer>
          </Modal>

          <Card bg="light" className="flightCard" id="flightsCard1">
            <Card.Img
              variant="top"
              src={require("./Film_picture/Crazy_Rich_asians_Singapore.jpg")}
            />
            <Card.Body>
              <Button variant="light" onClick={this.open3}>
                Fly to Singapore
              </Button>
            </Card.Body>
          </Card>

          <Modal show={this.state.showModal3} onHide={this.close3}>
            <Modal.Header closeButton>
              <Modal.Title>London to Singapore</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p> {this.state.flight3}</p>
              <p> £ {this.state.price3}</p>
              <p> {this.state.extra3}</p>
            </Modal.Body>
            <Modal.Footer>
              <div className="paypalButton">
                <PayPalButton
                  amount={this.state.price3}
                  onSuccess={(details, data) => {
                    alert(
                      "Transaction completed by " +
                        details.payer.name.given_name
                    );

                    // OPTIONAL: Call your server to save the transaction
                    return fetch("/paypal-transaction-complete", {
                      method: "post",
                      body: JSON.stringify({
                        orderID: data.orderID
                      })
                    });
                  }}
                  options={{
                    clientId: "sb",
                    currency: "GBP"
                  }}
                />
              </div>
            </Modal.Footer>
          </Modal>
        </CardDeck>
      </div>
    );
  }
}

export default TopFiveFlights;
