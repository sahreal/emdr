import React from "react";
import socketIOClient from "socket.io-client";
import { hot } from "react-hot-loader/root";
import axios from "axios";
import ReactPlayer from "react-player/youtube";
//import SoundCloudPlayer from "react-player/soundcloud";
const ENDPOINT = "http://localhost:3000";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: [],
      status: false
    };

    this.clickHandler = this.clickHandler.bind(this);
    //this.sendStatus = this.sendStatus.bind(this);
  }

  componentDidMount() {
    //this.sendStatus(this.state);
  }

  // sendStatus(param) {
  //   axios.post("/test", param);
  // }

  clickHandler() {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      this.setState({ status: data });
    });
  }

  render() {
    return (
      <div>
        <h1 className="text-4xl text-white bg-black">EMDR example</h1>
        <div style={{ textAlign: "center" }}>
          <span>
            {this.state.status ? (
              <p style={{ backgroundColor: "orange" }}>on</p>
            ) : (
              <p style={{ backgroundColor: "lightblue" }}>off</p>
            )}
          </span>

          <ReactPlayer
            style={{ display: "inline-block" }}
            controls
            loop
            url="https://www.youtube.com/watch?v=t_nMaJyfYmU&ab_channel=JeffTarbet"
            onStart={this.clickHandler}
            onPlay={this.clickHandler}
            onPause={this.clickHandler}
          />
        </div>
        <div>
          {/* <button
            onClick={this.clickHandler}
            style={{ display: "flex", margin: "auto", border: "double" }}
          >
            Click Me
          </button> */}
        </div>
      </div>
    );
  }
}

export default hot(App);
