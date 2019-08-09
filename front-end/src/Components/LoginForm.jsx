import React from "react";
// import Main from "./Main";
import { Redirect, Link } from "@reach/router";
import findWay from "../findWay.png";
import discover from "../discover.png";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: "", password: "", isAuthenticated: 0 };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  login = event => {
    event.preventDefault();
    const user = {
      login: this.state.login,
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
          this.setState({ isAuthenticated: 2 });
        } else {
          this.setState({ isAuthenticated: 1 });
        }
        this.props.checkLogin();
      })
      .catch(err => {
        console.error(err);
        this.setState({ isAuthenticated: 1 });
      });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    let text;
    if (this.state.isAuthenticated === 2) {
      return <Redirect noThrow to="" />;
    }

    if (this.state.isAuthenticated === 1) {
      text = "Login unsuccessful. Please try again.";
    }
    return (
      <div id="signInContent" className="skycomSignin w-75 mx-auto">
        <div id="signInPanel">
          <div className="panel" role="main">
            <div className="panelHeader">
              <div id="header">
                <Link to="https://www.sky.com" className="login-logo" />
              </div>
            </div>

            <div className="subPanel">
              <h3 className="sub-header-one">Sign in</h3>

              <form>
                <div className="formFieldsWrapper">
                  <div className="  ">
                    <label htmlFor="login">Email or Username</label>

                    <input
                      type="text"
                      id="login"
                      name="login"
                      onChange={this.handleChange}
                    />
                    <span className="validationIcon" />
                  </div>

                  <div className="  ">
                    <label htmlFor="password">Password</label>

                    <input
                      type="password"
                      id="password"
                      name="password"
                      onChange={this.handleChange}
                    />
                    <span className="validationIcon" />
                  </div>

                  <div className="buttonRow">
                    <button onClick={this.login} id="signInButton">
                      Sign in
                    </button>
                    <p>{text}</p>
                    <p>
                      <Link
                        id="privacyPolicyLink"
                        to="https://www.sky.com/help/articles/sky-privacy-and-cookies-notice"
                      >
                        Privacy &amp; Cookies Notice
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div id="newToSkyiD" className="panel">
            <h3 className="sub-header-two">New to Sky GYW?</h3>

            <div className="buttonRow p-2">
              <button
                className="btn btn-outline-secondary btn-sm"
                type="register"
                id="signin"
              >
                Register
              </button>
            </div>
          </div>
        </div>

        <div className="welcome">
          <h1 className="page-header-one">Sign in to Sky</h1>
        </div>
        <div className="colPod">
          <div className="miniPod">
            <img src={discover} alt="Sky Go" />

            <div>
              <h4 className="sub-header-three-signin-cfm">Find new places</h4>

              <p>
                Find flights and weather for your next favorite holiday
                destination
              </p>
            </div>
          </div>

          <div className="miniPod">
            <img src={findWay} alt="Sky Apps" />

            <div>
              <h4 className="sub-header-three-signin-cfm">From A to B</h4>

              <p>
                Plan your next journey whether it's on foot, by car or even on
                the train
              </p>
            </div>
          </div>

          <div className="miniPod nonMobilePod">
            <img
              src="https://skyidassets-a.akamaihd.net/static/EolNvX32g5NoyosbMdF4pogG8MRmSJaQsOFZAoilz0r.png"
              alt="My Extras"
            />

            <div>
              <h4 className="sub-header-three-signin-cfm">My Extras</h4>

              <p>Discover more from Sky at no extra cost</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
