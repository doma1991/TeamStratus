import React from "react";
import Main from "./Main";
import { Redirect } from "@reach/router";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: "", password: "", isAuthenticated: false };
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
          this.setState({ isAuthenticated: true });
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ isAuthenticated: false });
      });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    if (this.state.isAuthenticated === true) {
      console.log("success");
      return <Redirect noThrow to="" />;
    }
    return (
      <div id="signInContent" className="skycomSignin w-75 mx-auto">
        <div id="signInPanel">
          <div className="panel" role="main">
            <div className="panelHeader">
              <div id="header">
                <a href="https://www.sky.com" className="login-logo" />
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

                  <div id="forgottenRow">
                    <p>
                      Forgotten{" "}
                      <a
                        id="forgottenUsername"
                        href="https://skyid.sky.com/forgotusername/skycom/7b613a2768747470733a2f2f736b7969642e736b792e636f6d2f7369676e696e2f736b79636f6d2f376236313361323736383734373437303733336132663266373737373737326537333662373932653633366636643266323732633632336132373638373437343730373333613266326637373737373732653733366237393265363336663664326632373764272c623a2768747470733a2f2f736b7969642e736b792e636f6d2f7369676e696e2f736b79636f6d2f376236313361323736383734373437303733336132663266373737373737326537333662373932653633366636643266323732633632336132373638373437343730373333613266326637373737373732653733366237393265363336663664326632373764277d"
                      >
                        username
                      </a>{" "}
                      or{" "}
                      <a
                        id="forgottenPassword"
                        href="https://skyid.sky.com/resetpassword/skycom/7b613a2768747470733a2f2f736b7969642e736b792e636f6d2f7369676e696e2f736b79636f6d2f376236313361323736383734373437303733336132663266373737373737326537333662373932653633366636643266323732633632336132373638373437343730373333613266326637373737373732653733366237393265363336663664326632373764272c623a2768747470733a2f2f736b7969642e736b792e636f6d2f7369676e696e2f736b79636f6d2f376236313361323736383734373437303733336132663266373737373737326537333662373932653633366636643266323732633632336132373638373437343730373333613266326637373737373732653733366237393265363336663664326632373764277d"
                      >
                        password
                      </a>
                      ?
                    </p>
                  </div>

                  <div className="buttonRow">
                    <button onClick={this.login}>Sign in</button>

                    <p>
                      <a
                        id="privacyPolicyLink"
                        href="https://www.sky.com/help/articles/sky-privacy-and-cookies-notice"
                      >
                        Privacy &amp; Cookies Notice
                      </a>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div id="newToSkyiD" className="panel">
            <h3 className="sub-header-two">Notice Me !</h3>
            <p>
              Trouble logging in? You may need to reset your password –{" "}
              <a
                id="forgottenPassword"
                href="https://skyid.sky.com/resetpassword/skycom/7b613a2768747470733a2f2f736b7969642e736b792e636f6d2f7369676e696e2f736b79636f6d2f376236313361323736383734373437303733336132663266373737373737326537333662373932653633366636643266323732633632336132373638373437343730373333613266326637373737373732653733366237393265363336663664326632373764272c623a2768747470733a2f2f736b7969642e736b792e636f6d2f7369676e696e2f736b79636f6d2f376236313361323736383734373437303733336132663266373737373737326537333662373932653633366636643266323732633632336132373638373437343730373333613266326637373737373732653733366237393265363336663664326632373764277d"
              >
                click here
              </a>
            </p>
            <h3 className="sub-header-two">New to Sky GYW?</h3>

            <div className="buttonRow p-2">
              <button
                className="btn btn-outline-secondary btn-sm"
                type="register"
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
            <img
              src="https://skyidassets-a.akamaihd.net/static/1gqI1I1Mcln4qcoaB4mNosYV5ZbRwIsBaJlZZE1GBl2.jpg"
              alt="Sky Go"
            />

            <div>
              <h4 className="sub-header-three-signin-cfm">Sky Go</h4>

              <p>Watch TV on the move in line with your TV subscription</p>
            </div>
          </div>

          <div className="miniPod">
            <img
              src="https://skyidassets-a.akamaihd.net/static/1S3uPAbdHPgIfq9VB5WkmijhIUUeIlMdTkPjrBngRZW.jpg"
              alt="Sky Apps"
            />

            <div>
              <h4 className="sub-header-three-signin-cfm">Sky Apps</h4>

              <p>Free mobile apps for breaking news, latest scores and more</p>
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
