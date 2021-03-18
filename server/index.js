const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

let isOn = "";
let videoData = "";
app.use("/", express.static(path.join(__dirname, "../dist")));
app.use(bodyParser.json());
app.post("/test", (req, res) => {
  let status = req.body.status;
  isOn = status;
});

io.on("connection", socket => {
  console.log("a user connected");

  flipSwitch(socket);
  videoSync(socket);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

let flipSwitch = socket => {
  if (isOn || isOn === undefined) {
    isOn = false;
  } else {
    isOn = true;
  }
  //console.log(isOn, "is this on");
  socket.local.emit("FromAPI", isOn);
};

let videoSync = socket => {
  socket.on("syncVideo", data => {
    console.log(data, "tests");
    socket.broadcast.emit("syncVideo", data);
  });
};

http.listen(port, () => {
  console.log(`listening on EMDR*:${port}`);
});

//app.listen(port, () => console.log(`EMDR now listening on port ${port}`));
