var playerX = "X";
var playerO = "O";
var isXturn = true;
var Xarray = [];
var Oarray = [];
var clickCount = 0;

const $ = document.querySelectorAll.bind(document)
// Start Game
init();

document.getElementById('reset').addEventListener('click', function () {
  window.location.reload();
});

function playArea() {

  var r = 0,
    c = 0;
  var container = document.getElementsByClassName("container");
  for (var i = 0; i < 9; i++) {
    var gridDiv = document.createElement("div");
    gridDiv.classList.add('item');
    gridDiv.setAttribute('row', r);
    gridDiv.setAttribute('col', c);
    gridDiv.setAttribute('id', 'item' + i);
    container[0].appendChild(gridDiv);
    c++;
    if (c > 2) {
      r++;
      c = 0;
    }
  }
}

function init() {
  playArea();
  document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function (event) {
      drawText(event.currentTarget);
    })
  })
}

function drawText(target) {
  if (target.innerText == "") {
    clickCount++;
    if (isXturn) {
      target.innerText = playerX;
      Xarray.push({
        'r': target.getAttribute('row'),
        'c': target.getAttribute('col'),
        'id': target.getAttribute('id')
      });
    } else {
      target.innerText = playerO;
      Oarray.push({
        'r': target.getAttribute('row'),
        'c': target.getAttribute('col'),
        'id': target.getAttribute('id')
      });
    }
    if (Xarray.length > 2 || Oarray.length > 2)
      var [isWin, mArray] = WinCheck(isXturn ? Xarray : Oarray);
    if (!isWin) {
      isXturn = !isXturn;
      document.getElementById('messsage').innerText = isXturn ? "Player " + playerX + " Turn" : "Player " +
        playerO +
        " Turn";
    } else if (clickCount == 9) {
      document.getElementById('messsage').innerText = "Match Draw";
    } else {
      document.getElementById('messsage').innerText = "Player " + (isXturn ? playerX : playerO) + " Win...";
      MatchHighlight(mArray);
    }
  }
}

function WinCheck(selArray) {
  // Row Match Check
  var rowList = selArray.reduce(function (p, c) {
    p[c.r] = (p[c.r] || 0) + 1;
    return p;
  }, {});

  var rowMatch = selArray.filter(function (obj) {
    return rowList[obj.r] > 2;
  });

  if (rowMatch.length != 0)
    return [true, rowMatch];

  // Column Match Check
  var colList = selArray.reduce(function (p, c) {
    p[c.c] = (p[c.c] || 0) + 1;
    return p;
  }, {});

  var colMatch = selArray.filter(function (obj) {
    return colList[obj.c] > 2;
  });

  if (colMatch.length != 0)
    return [true, colMatch];

  // Diagonal Match Check
  // Left and Right ==> Top to Bottom
  // var rdiaMatch = selArray, cdiaMatch = selArray;
  // rdiaMatch.sort(function (c1, c2) {
  //   return c1.r - c2.r;
  // })
  // cdiaMatch.sort(function (c1, c2) {
  //   return c1.c - c2.c;
  // })
  // if ((rdiaMatch.map(item => {
  //     return item.r
  //   }).toString() == "0,1,2" || "2,1,0") && (cdiaMatch.map(item => {
  //     return item.c
  //   }).toString() == "0,1,2" || "2,1,0")) {
  //   return [true, cdiaMatch];
  // }

  // Left and Right ==> Bottom to Top
  // var diaMatch = selArray;
  // diaMatch.sort(function (a, b) {
  //   return b - a;
  // })
  // if (diaMatch.map(item => {
  //     return item.c
  //   }).toString() == "2,1,0")
  //   return [true, "2,1,0"];

  return [false, []];
}

function MatchHighlight(marray) {
  marray = typeof (marray) == 'object' ? marray : marray.split(',');
  marray.forEach(item => {
    $('#' + item.id)[0].classList.add('mcolor');
  });
}