function shuffle(array = [...new Array(52)].map((x, index) => index + 1)) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array.map((x) => getCard(x));
}

function convertStringToArray(data) {
  if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      for (let key in data[i]) {
        if (isJsonString(data[i][key])) {
          data[i][key] = JSON.parse(data[i][key]);
        }
      }
    }
  } else {
    for (let key in data) {
      if (isJsonString(data[key])) {
        data[key] = JSON.parse(data[key]);
      }
    }
  }
  return data;
}

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function getCard(number) {
  if (number <= 13) {
    return String(convertNumToCard(number) + "S");
  } else if (number <= 26) {
    return String(convertNumToCard(number - 13) + "C");
  } else if (number <= 39) {
    return String(convertNumToCard(number - 26) + "D");
  } else return String(convertNumToCard(number - 39) + "H");
}

function convertNumToCard(num) {
  if (num == 1) return "A";
  else if (num == 11) return "J";
  else if (num == 12) return "Q";
  else if (num == 13) return "K";
  else return num;
}

function checkWinner(winner, payload) {
  let users = [];
  for (let i = 0; i < payload.users.length; i++) {
    if (payload.users[i].cards.join(",") == winner.cards) {
      console.log(payload.users[i]);
      payload.users[i].allCoins += payload.pot;
    } else {
      console.log(payload.users[i]);
      payload.users[i].allCoins -= payload.pot;
    }
    users.push(payload.users[i]);
  }
  let newPayload = {
    cardShowOnTable: JSON.stringify(payload.cardShowOnTable),
    isStart: 0,
    isShowResult: 1,
    users: JSON.stringify(users),
    winner: JSON.stringify(winner),
  };
  return newPayload;
}
module.exports = { shuffle, convertStringToArray, getCard, checkWinner };
