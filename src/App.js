import React, { Component, Fragment } from "react";
import LineChart from "./chart";
import "./App.css";
import axios from "axios";
import Pie from "./pie";
import { HiOutlineUserCircle } from "react-icons/hi";

class App extends Component {
  state = {
    created: [],
    updated: [],
    issues: [],
    comments: [],
    lineChart: false,
    pie:false,
    username: "",
    password: "",
    display: "flex",
    invalidlogin: "none",
  };
  login = () => {
    if (this.state.username === "John" && this.state.password === 12345) {
      this.setState({ lineChart: true, display: "none",username: "",password: "", invalidlogin: "none" });
    } else if (this.state.username === "Micky" && this.state.password === 98765) {
      this.setState({ pie: true, display: "none", username: "", invalidlogin: "none",      password: "",});
    } else {
      this.setState({ invalidlogin: "block" });
    }
  };
  componentDidMount() {
    axios
      .get("https://api.github.com/repositories/19438/issues")
      .then((res) => {
        const created = res.data.map((e) => {
          const year = e.created_at.slice(0, 10);
          return year;
        });
        const updated = res.data.map((e) => {
          const year = e.updated_at.slice(0, 10);
          return year;
        });
        const issues = res.data.map((e) => e.number);
        const comments = res.data.map((e) => e.comments);
        this.setState({ created, updated, issues, comments});
        console.log();
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }
  chartsignout = () =>{
    this.setState({display: "flex",lineChart: false})
  }
  piesignout= () =>{
    this.setState({display: "flex",pie: false})
  }

  render() {
    const height = window.innerHeight;
    const width = window.innerWidth;
    return (
      <Fragment>
        <div
          className="signin"
          style={{
            display: this.state.display,
            justifyContent: "center",
            height: height,
            width: width,
          }}
        >
          <div className="container">
            <div className="content">
              <HiOutlineUserCircle className="img" />
            </div>
            <div className="input">
              <div className="inputs">
                <label for="uname">
                  <b>Username : </b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={this.state.username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
              </div>

              <div className="inputs">
                <label for="psw">
                  <b>Password :</b>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>

              <button type="submit" onClick={this.login}>
                Login
              </button>
              <p
                style={{
                  marginTop: 0,
                  color: "red",
                  display: this.state.invalidlogin,
                }}
              >
                Invalid Login
              </p>
            </div>
          </div>
        </div>
        {this.state.lineChart === true ? (
          <LineChart data={this.state.issues} updated={this.state.updated} chart={this.chartsignout} />
        ) : (
          null
        )}

        {this.state.pie === true ? (
          <Pie data={this.state.issues} pie={this.piesignout} />
        ) : (
          null
        )}
      </Fragment>
    );
  }
}

export default App;
