import React from "react";
import Main from "./Main";

class LoginForm extends React.Component {
  // async handleSubmit(event) {
  //   const user = {username: this.state.username, password: this.state.password};

  //   let response = await fetch("http://localhost:8080/users/restrict", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: json
  //   });

  //   let data = await response.json();
  //   this.handleResponse(data);
  // }

  constructor(props) {
    super(props);
    this.state = { username: "", password: "", isAuthenticated: false };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  login = () => {
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    fetch("http://localhost:8080/login", {
      method: "POST",
      body: JSON.stringify(user)
    })
      .then(res => {
        const jwtToken = res.headers.get("Authorization");
        if (jwtToken !== null) {
          sessionStorage.setItem("jwt", jwtToken);
          this.setState({ isAuthenticated: true });
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ isAuthenticated: false });
      });
  };

  handleChange = valueName => {
    return event => {
      this.setState({ [valueName]: event.target.value });
    };
  };

  render() {
    if (this.state.isAuthenticated === true) {
      return <Main />;
    }
    return (
      <div className="container p-3">
        <form onSubmit={this.login}>
          <div className="form-group">
            <label htmlFor="login">Username</label>
            <input
              type="text"
              name="login"
              id="login"
              value={this.state.login}
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
              value={this.state.password}
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
