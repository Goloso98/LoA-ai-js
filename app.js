var loa_1 = null;
var player1 = 'random';
var player2 = 'random';
var nTracker = 0;

function newgame() {
  player1 = document.getElementById("p1ai").value;
  player2 = document.getElementById("p2ai").value;
  clearboard();
  loa_1 = loa.new_board();
  draw();
  startgame();
}

function draw() {
  //clearboard();
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
  //console.log('a', n);
  //console.log(nTracker);

  if (!loa_1 || loa_1.existe_win) return;
  let board = loa_1.board;

  let pieceX = Math.floor(n/8);
  let pieceY = Math.floor(n%8);
  //console.log(pieceX + ' ' + pieceY);
  let piece = board[pieceX][pieceY];
  //console.log(piece);
  
  if(loa_1.turn == 'B') {

    if(piece == 'B') {
      clearPossibleMoves();
      draw();
      info();
      nTracker = n;
      console.log(nTracker + ' ntracker');
      let possibleMoves = loa.get_piece_moves({'board':board, turn: 'B'}, {'x':pieceX, 'y':pieceY}, 'B');
      //console.log(possibleMoves);
      for(let i = 0; i < possibleMoves.length; i++) {
        let x = possibleMoves[i][0];
        let y = possibleMoves[i][1];
        //console.log(possibleMoves[i][0] + ' ' + possibleMoves[i][1]);
        let pos = x*8 + y;
        //console.log(pos);
        if(document.getElementById(pos).className != "piece pieceblack") {
          document.getElementById(pos).className = "piece possibleBlack";
        }
      }
    } else 
    
    if(document.getElementById(n).className == "piece possibleBlack") {

      let oldX = Math.floor(nTracker/8);
      let oldY = Math.floor(nTracker%8);
      console.log(oldX + ' ' + oldY + ' ' + nTracker);
      loa_1.board[oldX][oldY] = '.';
      loa_1.board[pieceX][pieceY] = 'B';

      clearPossibleMoves();
      loa_1.turn = 'W';
      draw();
      info();
    }
  } else {
  
    if(piece == 'W') {
      clearPossibleMoves();
      draw();
      info();
      nTracker = n;
      console.log(nTracker + ' ntracker');
      let possibleMoves = loa.get_piece_moves({'board':board, turn: 'W'}, {'x':pieceX, 'y':pieceY}, 'W');
      console.log(possibleMoves);
      for(let i = 0; i < possibleMoves.length; i++) {
        let x = possibleMoves[i][0];
        let y = possibleMoves[i][1];
        console.log(possibleMoves[i][0] + ' ' + possibleMoves[i][1]);
        let pos = x*8 + y;
        console.log(pos);
        if(document.getElementById(pos).className != "piece piecewhite") {
          document.getElementById(pos).className = "piece possibleWhite";
        }
      }
    } 
    else 
    
    if(document.getElementById(n).className == "piece possibleWhite") {

      let oldX = Math.floor(nTracker/8);
      let oldY = Math.floor(nTracker%8);
      console.log(oldX + ' ' + oldY + ' ' + nTracker);
      loa_1.board[oldX][oldY] = '.';
      loa_1.board[pieceX][pieceY] = 'W';

      clearPossibleMoves();
      loa_1.turn = 'B';
      draw();
      info();
    }
  }
}


function clearPossibleMoves() {
  let board = document.getElementsByClassName("board")[0].children[0];
  for (let c of board.children) {
    if(c.children[0].className == "piece possibleBlack" || c.children[0].className == "piece possibleWhite") {
      c.className = "grid-item";
      c.children[0].className = "";
    }
  }
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

const big_game_dict = {};
function handle_game(myevent) {
  //check the event
  // check if is a new game start...
  //check if game is on var

  //check if p1 has played
    //check who is to play
      // if player; handle the first key input... then on the next call handle the second key input

  //check if is p2 turn...
    //repet p1 steps...

  //check wins

  
}

