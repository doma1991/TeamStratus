
import React, { Component } from "react";

// Also need to install moment byt running: npm install moment
//



export class Sms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            number: "",
            message:""
        };
        this.handleClearForm = this.handleClearForm.bind(this);

        this.handleChangeNumber = this.handleChangeNumber.bind(this);
        this.handleChangeM = this.handleChangeM.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleClearForm(e) {
        this.setState({
            number:""
        });
    }

    handleChangeNumber(event) {
        this.setState({
    number: event.target.value
        });
    }
    handleChangeM(event) {
        this.setState({
            message: event.target.value
        });
    }


    async handleSubmit(event) {
        try {
            event.preventDefault();
            let URL = "http://localhost:8080/sendsms/"+ this.state.number+"/";
            // let URL =
            //     baseURL +
            //     this.state.number;

            console.log(URL);
            let response = await fetch(URL);
            let data = await response.json();
            console.log(data);

        } catch (e) {
            console.log("error", e);
        }
        this.handleClearForm();
    }

    render(){
        return (
                                    <form onSubmit={this.handleSubmit}>
                                        <p>Enter your number:</p>
                                        <input type={"text"}
                                               onChange={this.handleChangeNumber}
                                        value={this.number}/>
                                        <input type='submit'/>
                                    </form>
                                );}

                                }

export default Sms;