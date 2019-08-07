import React from "react";
import "./weather.css";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { PayPalButton } from "react-paypal-button-v2";

class TopFiveFlights extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flight1:"",
            flight2:"",
            flight3:"",
            flight4:"",
            flight5:"",
            price1:"",
            price2:"",
            price3:"",
            price4:"",
            price5:"",
            extra1:"",
            extra2:"",
            extra3:"",
            extra4:"",
            extra5:"",
            showModal1:false,
            showModal2:false,
            showModal3:false,
            showModal4:false,
            showModal5:false
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this.open1 = this.open1.bind(this);
        this.close1 = this.close1.bind(this);

        this.open2 = this.open2.bind(this);
        this.close2 = this.close2.bind(this);

        this.open3 = this.open3.bind(this);
        this.close3 = this.close3.bind(this);

        this.open4 = this.open4.bind(this);
        this.close4 = this.close4.bind(this);


        this.getTop5Flights("1","DXB");

    }

    getInitialState() {
        return { ["showModal"]: false };
    }

    close() {
        this.setState({ ["showModal1"]: false });
    }

    open() {
        this.setState({ ["showModal1"]: true });
    }

    close1() {
        this.setState({ ["showModal2"]: false });
    }

    open1() {
        this.setState({ ["showModal2"]: true });
    }

    close2() {
        this.setState({ ["showModal3"]: false });
    }

    open2() {
        this.setState({ ["showModal3"]: true });
    }

    close3() {
        this.setState({ ["showModal4"]: false });
    }

    open3() {
        this.setState({ ["showModal4"]: true });
    }

    close4() {
        this.setState({ ["showModal5"]: false });
    }

    open4() {
        this.setState({ ["showModal5"]: true });
    }

    async getTop5Flights(value,destination){
        let data;

        let current = new Date();
        current.setMonth(current.getMonth()+1);

        let formattedDate = current.getFullYear() + "-" + current.getMonth() + "-" + current.getDay();

        try {

            let URL = "http://localhost:8080/getflight/" + destination +"/lhr/2019-10-10";
            let response = await fetch(URL);
            data = await response.json().then(stringRes =>{
                this.setState({
                    ["flight"+value]: stringRes.airlineName
                });
                this.setState({
                    ["price"+value]: stringRes.price
                });
                this.setState({
                    ["extra"+value]: stringRes.extra
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

                {/*<Button*/}
                {/*    bsStyle="primary"*/}
                {/*    bsSize="large"*/}
                {/*    onClick={this.open}*/}
                {/*>*/}
                {/*    Launch demo modal*/}
                {/*</Button>*/}

                <div className="row">
                    <div className="span2 offset1">
                        <div onClick={this.open}>
                            flight1
                        </div>

                        <Modal show={this.state.showModal} onHide={this.close}>
                            <Modal.Header closeButton>
                                <Modal.Title>London to Dubai</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p> {this.state.flight1}</p>
                                <p> {this.state.price1}</p>
                                <p> {this.state.extra1}</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <div className="paypalButton">
                                    <PayPalButton
                                        amount= {this.state.price1}
                                        onSuccess={(details, data) => {
                                            alert("Transaction completed by " + details.payer.name.given_name);

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


                    </div>
                    <div className="span2">


                        <div onClick={this.open1}>
                            flight1
                        </div>

                        <Modal show={this.state.showModal2} onHide={this.close1}>
                            <Modal.Header closeButton>
                                <Modal.Title>London to Dubai</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p> {this.state.flight1}</p>
                                <p> {this.state.price1}</p>
                                <p> {this.state.extra1}</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <div className="paypalButton">
                                    <PayPalButton
                                        amount= {this.state.price1}
                                        onSuccess={(details, data) => {
                                            alert("Transaction completed by " + details.payer.name.given_name);

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



                    </div>
                    <div className="span2">
                        <div onClick={this.open}>
                            flight1
                        </div>
                    </div>
                    <div className="span2">
                        <div onClick={this.open}>
                            flight1
                        </div>

                    </div>
                    <div className="span2">

                        <div onClick={this.open}>
                            flight1
                        </div>

                    </div>
                </div>





            </div>
        );
    }
}

export default TopFiveFlights;
