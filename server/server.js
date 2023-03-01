const { default: axios } = require("axios");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./pool");
const utils = require("./utils");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
app.get("/", async function (req, res, next) {
  res.end("");
});

app.get("/get/:table", async function (req, res) {
  try {
    let { table, id } = req.params;
    let data = await getData(table, id);
    res.json(data);
  } catch (err) {
    res.send("err");
  }
});

app.get("/get/:table/:id", async function (req, res) {
  let { table, id } = req.params;
  let data = await getData(table, id);
  res.json(data || []);
});

app.post("/post/:table", async function (req, res) {
  let { table } = req.params;
  let payload = req.body;
  let data = await postData(table, payload);
  res.json(data || []);
});

app.post("/update/:table/:id", async function (req, res) {
  let { table, id } = req.params;
  let payload = req.body;
  let data = await updateData(table, payload, id);
  res.json(data || []);
});

app.delete("/delete/:table/:id", async function (req, res) {
  let { table, id } = req.params;
  console.log(req.params);
  let data = await deleteData(table, id);
  res.json(data);
});

const ROOM = "Room-";

io.on("connection", function (socket) {
  console.log("socketid", socket.id);

  socket.on("start", function (payload) {
    let cards = utils.shuffle();
    let newPayload = {
      users: JSON.stringify(
        payload.users.map((user, index) => ({
          ...user,
          cards: [cards.shift(), cards.shift()],
          coins: 0,
          isWin: false,
          isCall: false,
          isFold: false,
          allCoins: user.allCoins,
          coinsForRound: 0,
          isCheck: false,
          isAllin: false,
        }))
      ),
      cardsHaveChosen: JSON.stringify(cards),
      cardShowOnTable: JSON.stringify([]),
      isStart: 1,
      isShowResult: 0,
      coinsForTurn: 0,
      pot: 0,
      userTurn: 0,
      winner: JSON.stringify([]),
    };
    updateData("rooms", newPayload, payload.id).then((res) => {
      io.in(ROOM + payload.id).emit("message", "start");
    });
  });

  socket.on("joinroom", (roomdid) => {
    console.log("join id", roomdid);
    socket.join(ROOM + roomdid);
    io.in(ROOM + roomdid).emit("message", "join");
  });

  socket.on("leftroom", (roomdid) => {
    console.log("left", roomdid);
    socket.leave(ROOM + roomdid);
    io.in(ROOM + roomdid).emit("message", "left");
  });

  socket.on("nextround", function ({ type, payload }) {
    payload = utils.convertStringToArray(payload);

    if (type == "raise" || type == "call") {
      for (let i = 0; i < payload.users.length; i++) {
        payload.users[i].isCheck = false;
      }
    }

    let isRaised =
      payload.users.filter((x) => x.coins !== payload.users[0].coins).length >
      0;

    let isStatusCheckSame =
      payload.users.filter((x) => x.isCheck !== payload.users[0].isCheck)
        .length == 0;

    let isAllUsersFold = payload.users.filter((x) => !x.isFold).length == 1;

    let isStatusAllin =
      payload.users.filter((x) => x.isAllin).length == payload.users.length;

    if (isAllUsersFold) {
      ///check all users fold except 1 left
      let indexWinner = payload.users.findIndex((x) => !x.isFold);
      newPayload = utils.checkWinner(
        { cards: payload.users[indexWinner].cards.join(",") },
        payload
      );
      updateData("rooms", newPayload, payload.id).then((res) => {
        io.in(ROOM + payload.id).emit("message", "nextround");
      });
    } else if (isStatusAllin) {
      payload.cardShowOnTable = [
        ...payload.cardShowOnTable,
        payload.cardsHaveChosen.slice(0, 5 - payload.cardShowOnTable.length),
      ];
      let userCards = payload.users
        .map((x) => `pc[]=${x.cards.join(",")}`)
        .join("&");
      let url =
        process.env.API_POKER_CHECK_RESULT +
        `cc=${payload.cardShowOnTable.join(",")}&${userCards}`;

      axios.get(url).then((res) => {
        let newPayload = utils.checkWinner(res.data.winners[0], payload);
        updateData("rooms", newPayload, payload.id).then((res) => {
          io.in(ROOM + payload.id).emit("message", "endround");
        });
      });
    } else if (
      // check new turn
      isStatusAllin &&
      isStatusCheckSame &&
      !isRaised &&
      payload.cardShowOnTable.length < 5
    ) {
      let users = payload.users.map((x) => {
        x.coinsForRound += x.coins;
        x.coins = 0;
        x.isCheck = false;
        return x;
      });
      let newPayload = {
        userTurn: 0,
        pot: payload.pot,
        cardShowOnTable: JSON.stringify([
          ...payload.cardShowOnTable,
          ...payload.cardsHaveChosen.slice(
            0,
            payload.cardShowOnTable.length == 0 ? 3 : 1
          ),
        ]),
        cardsHaveChosen: JSON.stringify(
          payload.cardsHaveChosen.slice(
            payload.cardShowOnTable.length == 0 ? 3 : 1
          )
        ),
        coinsForTurn: 0,
        users: JSON.stringify(users),
      };
      updateData("rooms", newPayload, payload.id).then((res) => {
        io.in(ROOM + payload.id).emit("message", "nextround");
      });
    } else if (
      isStatusAllin &&
      isStatusCheckSame &&
      !isRaised &&
      payload.cardShowOnTable.length == 5
    ) {
      let userCards = payload.users
        .map((x) => `pc[]=${x.cards.join(",")}`)
        .join("&");
      let url =
        process.env.API_POKER_CHECK_RESULT +
        `cc=${payload.cardShowOnTable.join(",")}&${userCards}`;

      axios.get(url).then((res) => {
        let newPayload = utils.checkWinner(res.data.winners[0], payload);
        updateData("rooms", newPayload, payload.id).then((res) => {
          io.in(ROOM + payload.id).emit("message", "endround");
        });
      });
    } else {
      let nextTurn =
        payload.userTurn + 1 > payload.users.length - 1
          ? 0
          : payload.userTurn + 1;
      while (payload.users[nextTurn].isFold) {
        nextTurn++;
      }
      let newPayload = {
        userTurn: nextTurn,
        pot: payload.pot,
        coinsForTurn: payload.coinsForTurn,
        users: JSON.stringify(payload.users),
      };
      updateData("rooms", newPayload, payload.id).then((res) => {
        io.in(ROOM + payload.id).emit("message", "nextround");
      });
    }
  });

  socket.on("fecthRoom", () => {
    console.log("fetchroom");
    io.emit("message", "fetchroom");
  });
});

server.listen(process.env.PORT, function () {
  console.log("listening on *:3000");
});

function getData(table, id) {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM ${table} ${id ? `WHERE id = '${id}'` : ""}`,
      (err, res) => {
        if (err) reject(err);
        else {
          resolve(utils.convertStringToArray(res));
        }
      }
    );
  });
}

function postData(table, payload) {
  let obj = payload;
  payload = Object.entries(payload);

  let cols = payload.map((x) => x[0]).join(",");
  let data = payload.map((x) => `'${x[1]}'`).join(",");
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO ${table} (${cols}) VALUES (${data})`,
      (err, res) => {
        if (err) reject(err);
        else {
          obj.id = res.insertId;
          resolve(utils.convertStringToArray(obj));
        }
      }
    );
  });
}

function updateData(table, payload, id) {
  payload = Object.entries(payload);
  let data = payload.map((x) => `${x[0]} = '${x[1]}'`).join(",");
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE ${table} SET ${data} WHERE id = ${id}`, (err, res) => {
      if (err) reject(err);
      else {
        resolve(res);
      }
    });
  });
}

function deleteData(table, id) {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM ${table} WHERE id = ${id}`, (err, res) => {
      if (err) reject(err);
      else {
        resolve({ status: "success" });
      }
    });
  });
}
