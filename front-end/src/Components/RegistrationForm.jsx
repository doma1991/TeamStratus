import React from "react";

class RegistrationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      postCode: "",
      telephoneNumber: "",
      email: "",
      login: "",
      password: "",
      role: "U",
      route: null,
      photo: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    let json = JSON.stringify({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      city: this.state.city,
      postCode: this.state.postCode,
      telephoneNumber: this.state.telephoneNumber,
      email: this.state.email,
      login: this.state.login,
      password: this.state.password,
      role: "U",
      route: null,
      photo: ""
    });
    let response = await fetch("http://localhost:8080/users/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: json
    });
    
    let data = await response.json();

    this.handleResponse(data);
  }

  handleChange = valueName => {
    return event => {
      this.setState({ [valueName]: event.target.value });
    };
  };

  handleResponse = (data) => {
   if (this.state.login === data.login) {

    this.setState({
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      postCode: "",
      telephoneNumber: "",
      email: "",
      login: "",
      password: "",
      role: "U",
      route: null,
      photo: "",
      registration: true
    });
  
   } else {
     this.setState({
       registration: false
     })
   }
  
    
  };

  render() {
let text;
if (this.state.registration) {
  text = "Successfully registered. Click <a href={''}>here</a> to log in."
} else if(this.state.registration == false) {

  text = "Unable to register. Click <a href={'/RegistrationForm'}>here</a> to try again."
}

    const tags = [
      "First name:",
      "Last name:",
      "Address:",
      "City:",
      "Post Code:",
      "Telephone:",
      "Email:",
      "Username:",
      "Password:",
      "Upload photo:"
    ];
    const fields = [
      <input
        type="text"
        name="firstName"
        value={this.state.firstName}
        onChange={this.handleChange("firstName")}
        required
      />,
      <input
        type="text"
        name="lastName"
        value={this.state.lastName}
        onChange={this.handleChange("lastName")}
        required
      />,
      <input
        type="text"
        name="address"
        value={this.state.address}
        onChange={this.handleChange("address")}
        required
      />,
      <input
        type="text"
        name="city"
        value={this.state.city}
        onChange={this.handleChange("city")}
        required
      />,
      <input
        type="text"
        name="postCode"
        value={this.state.postCode}
        onChange={this.handleChange("postCode")}
        required
      />,
      <input
        type="text"
        name="telephoneNumber"
        value={this.state.telephoneNumber}
        onChange={this.handleChange("telephoneNumber")}
        required
      />,
      <input
        type="email"
        name="email"
        value={this.state.email}
        onChange={this.handleChange("email")}
        required
      />,
      <input
        type="text"
        name="login"
        value={this.state.login}
        onChange={this.handleChange("login")}
        required
      />,
      <input
        type="password"
        name="password"
        pattern="(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
        value={this.state.password}
        onChange={this.handleChange("password")}
        required
      />,
      <input
        type="text"
        name="photo"
        onChange={this.handleChange("photo")}
        value=""
      />
    ];



    return (
      <form onSubmit={this.handleSubmit} method="post">
        <div className="container">
          {fields.map((field, count) => {
            let linkContent = tags[count];
            return (
              <div key={linkContent} className="row justify-content-center">
                <div className="col-sm-4">{linkContent}</div>
                <div className="col-sm-4">{field}</div>
              </div>
            );
          })}

          <input type="hidden" name="role" value="U" />
          <input type="hidden" name="route" />
          <div className="row justify-content-center">
            <div className="col-sm-4">
              <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
          </div>
        </div>
        <p id="registrationOutcome">Output goes here: {text}</p>
      </form>
    );
  }
}

export default RegistrationForm;
