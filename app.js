var loa_1 = null;
var player1 = 'random';
var player2 = 'random';
function newgame() {
  player1 = document.getElementById("p1ai").value;
  player2 = document.getElementById("p2ai").value;
  clearboard();
  loa_1 = loa.new_board();
  draw();
  startgame();
}

function draw() {
  clearboard();
  if (!loa_1) return;
  let board = loa_1.board;
  let size = 8;
  for (let i = 0; i<size; i++)
    for (let j = 0; j<size; j++) {
      let piece = board[i][j];
      if (piece == '.') continue;
      let classpiece = piececolorclass(piece);
      let pos = i*size + j;
      document.getElementById(pos).className = classpiece; 
  }
  info();
}

function piececolorclass(text) {
  if (text == '.') return "";
  if (text == 'W') return "piece piecewhite";
  if (text == 'B') return "piece pieceblack";
}

function info() {
  if(!loa_1) return;
  let text="";
  let piece = "";
  if (loa_1.exist_win) {
    if (loa_1.player != null) {
      text = 'win';
      piece = piececolorclass(loa_1.player);
    }
    else {
      text = 'draw';
      piece = '';  
    }
  }
  else {
    text = 'turn';
    piece = piececolorclass(loa_1.turn);
  }
  let inf = document.getElementById('info');
  inf.children[0].innerText = text;
  inf.children[1].className = piece;
}

function clearboard() {
  let board = document.getElementsByClassName("board")[0].children[0];
  for (let c of board.children) {
    c.className = "grid-item";
    c.children[0].className = "";
  }
}

function myclick(n) {
  console.log('a', n);
  if (!loa_1 || loa_1.existe_win) return;
  
}


async function startgame() {
  console.log(player1, player2);
  let go = false;
  while (go) {
    console.log('in');
    let p1 = document.getElementById("p1ai").value;
    let p2 = document.getElementById("p2ai").value;
    //go = p1 == p2;
  };
  return;
}

