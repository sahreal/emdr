const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

let isOn = "";
app.use("/", express.static(path.join(__dirname, "../dist")));
app.use(bodyParser.json());
app.post("/test", (req, res) => {
  let status = req.body.status;
  isOn = status;
});

io.on("connection", socket => {
  console.log("a user connected");

  flipSwitch(socket);

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
  console.log(isOn, "is this on");
  socket.emit("FromAPI", isOn);
};

http.listen(port, () => {
  console.log(`listening on EMDR*:${port}`);
});

//app.listen(port, () => console.log(`EMDR now listening on port ${port}`));
