import React from "react";
import { Redirect } from "@reach/router";
import { Link } from "@reach/router";

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

  handleResponse = data => {
    console.log(data.error);
    if (this.state.login == data.login) {
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
      });

      // return <Redirect noThrow to="/error" />;
    }
  };

  render() {
    let text;
    let link;
    let longText ="";
    if (this.state.registration) {
      text = "successful";
      link = "/";
      longText = (
        <p id="registrationOutcome">
          Registration {text}. Please click <Link to={link}>here</Link> to
          continue.
        </p>
      );

      // return <Redirect noThrow to="" />;
    } else if (!this.state.registration) {
      longText = (
        <p id="registrationOutcome">
          Registration {text}. Please click <Link to={link}>here</Link> to
          continue.
        </p>
      );
      text = "unsuccessful";
      link = "/register";
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
      />
    ];

    return (
      <div className="regPanel  mx-auto">
        <div className="previous-member p-1">
          <span id="preamble">Already have a Sky iD?</span>

          <a
            id="signinLink"
            href="/login"
            data-description="Sign in"
            data-tracking-label="sign-in"
          >
            Sign in
          </a>
        </div>
        <div className="panelHeader text-center">
          <h1 className="page-header-two">Register for Sky GYW</h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="container text-left">
            {fields.map((field, count) => {
              let linkContent = tags[count];
              return (
                <div
                  key={linkContent}
                  className="row justify-content-center p-1"
                >
                  <div>
                    <label htmlFor={field.name}>{linkContent}</label>
                    {field}
                  </div>
                </div>
              );
            })}

            <input type="hidden" name="role" value="U" />
            <input type="hidden" name="route" />
            <input type="hidden" name="photo" />
            <div className="row justify-content-center">
              <div className="submit-row">
                <input
                  className="btn btn-outline-primary"
                  type="submit"
                  value="Register"
                />
              </div>
            </div>
          </div>
          {longText}
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
