import React from "react";
import socketIOClient from "socket.io-client";
import { hot } from "react-hot-loader/root";
import axios from "axios";
import ReactPlayer from "react-player/youtube";
//import SoundCloudPlayer from "react-player/soundcloud";
const ENDPOINT = "http://localhost:3000";
//const ENDPOINT = "https://sleepy-meadow-38123.herokuapp.com/";
const socket = socketIOClient(ENDPOINT);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: [],
      status: false,
      played: 0
    };

    this.clickHandler = this.clickHandler.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.handleSeekMouseUp = this.handleSeekMouseUp.bind(this);
    this.handleSeekMouseDown = this.handleSeekMouseDown.bind(this);
    this.handleSeekChange = this.handleSeekChange.bind(this);
    //this.sendStatus = this.sendStatus.bind(this);
  }

  componentDidUpdate() {
    //this.sendStatus(this.state);
    socket.on("timeCode", data => {
      this.setState({ played: data.time });
      console.log(data, "getitgirl");
    });
  }

  clickHandler() {
    socket.on("FromAPI", data => {
      this.setState({ status: data });
    });
  }

  onStart() {
    console.log("start");
  }

  onProgress(played) {
    //onsole.log(played, "wow");
    let time = played.playedSeconds;
    this.setState({ played: time });
    socket.emit("syncVideo", { time });
  }

  handleSeekChange(e) {
    console.log(e.target.value, "SEEK");
    //this.setState({ played: parseFloat(e.target.value) });
  }

  handleSeekMouseDown(e) {
    console.log("mouseDown");
    //this.setState({ seeking: true });
  }

  handleSeekMouseUp(e) {
    this.setState({ seeking: false });
    console.log(e.target.value, "mousup");
    this.player.seekTo(parseFloat(e.target.value));
  }

  render() {
    console.log(this.state.played, "seconds played");
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
            ref={player => {
              this.player = player;
            }}
            style={{ display: "inline-block" }}
            controls
            loop
            url="https://www.youtube.com/watch?v=t_nMaJyfYmU&ab_channel=JeffTarbet"
            onStart={this.onStart}
            onPlay={this.clickHandler}
            onPause={this.clickHandler}
            onReady={() => this.player.seekTo(this.state.player)}
            onProgress={this.onProgress}
          />
        </div>
        <div>
          <input
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={this.state.played}
            onChange={this.handleSeekChange}
            onMouseUp={this.handleSeekMouseUp}
            onMouseDown={this.handleSeekMouseDown}
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
