var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.use(express.static(__dirname + "/public"));
app.get("/", function (req, res, next) {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", function (socket) {
  const ids = socket.rooms;
  socket.on("start", function (room) {
    ids.forEach((id) => {
      io.to(id).emit({
        card1: rooms.cards.shift(),
        card2: rooms.cards.shift(),
      });
    });
    // update db
  });

  socket.on("nextround", function (room) {
    if (room.round == 1) {
      io.in("room1").emit([rooms.cards.shift(),rooms.cards.shift(),rooms.cards.shift()]);
    }else if (room.round <4) {
      io.in("room1").emit([rooms.cards.shift()]);
    }else{
      // show result // update db
    }
  });
});

server.listen(3000, function () {
  console.log("listening on *:3000");
});
