import React from "react";

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      login: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    let json = JSON.stringify({
      login: this.state.login,
      password: this.state.password
    });
    
    let response = await fetch("http://localhost:8080/users/restrict", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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

  handleResponse = () => {
    console.log("logged in");
  };


  render() {
    return (
      <div className="container p-3">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="login">Username</label>
            <input
              type="text"
              name="login"
              id="login"
              value={this.login}
              placeholder="Username"
              onChange={this.handleChange("login")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={this.password}
              onChange={this.handleChange("password")}
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default LoginForm;
