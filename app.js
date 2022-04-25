var loa_1 = null;
var player1 = 'random';
var player2 = 'random';
var MAXROUNDS = 1000;
var sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
var isrun = false;

function newgame() {
  if (isrun) {
    isrun = false;
    big_game_dict.state = 5;
  } else {
    isrun = true;
    player1 = document.getElementById("p1ai").value;
    player2 = document.getElementById("p2ai").value;
    clearboard();
    loa_1 = loa.new_board();
    draw();
    //handle_game(null);
    startgame();
  };
}

function startgame() {
  big_game_dict.state = 0;
  handle_game(null);
};

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
  handle_game({'event': 'click', 'where': n});
  return;
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

function getaicb(level) {
  switch(level) {
    case 0:
      return (game_board) => ai.random(game_board);
    case 1:
      return (game_board) => ai.minmax(game_board, 1, ai.heuristic);
    case 2:
      return (game_board) => ai.minmax(game_board, 2, ai.heuristic);
    case 3:
      return (game_board) => ai.minmax(game_board, 3, ai.heuristic);
    case 4:
      return (game_board) => ai.alphabeta(game_board, 1, ai.heuristic);
    case 5:
      return (game_board) => ai.alphabeta(game_board, 2, ai.heuristic);
    case 6:
      return (game_board) => ai.alphabeta(game_board, 3, ai.heuristic);
  };
};

const big_game_dict = {
  players: ['B', 'W'],
  rounds: 0,
  players_kind: [{kind: 'person', lastclick: null, lastclickround: -1}, {kind: 'ai', level: 0}],
  movestart: null,
  moveend: null,
  state: 0
};

const ailevels = {'random': 0, 'minmax1':1, 'minmax2':2, 'minmax3':3, 'alphabeta1':4, 'alphabeta2':5, 'alphabeta3':6};

async function handle_game(myevent) {
  let thisclick = null
  if (myevent && myevent.event == 'click')
    thisclick = {'x': Math.floor(myevent.where/8), 'y': myevent.where%8};
  do {
    draw();
    if (!isrun)
      return;
    switch(big_game_dict.state) {
      case 0:
        if (player1 == 'human')
          big_game_dict.players_kind[0] = {kind: 'person', lastclick: null, lastclickround: -1};
        else
          big_game_dict.players_kind[0] = {kind: 'ai', level: ailevels[player1]};

        if (player2 == 'human')
          big_game_dict.players_kind[1] = {kind: 'person', lastclick: null, lastclickround: -1};
        else
          big_game_dict.players_kind[1] = {kind: 'ai', level: ailevels[player2]};
        
        big_game_dict.rounds = 0; 
        big_game_dict.movestart = null; 
        big_game_dict.moveend = null; 
        big_game_dict.state = 1;
        break;

      case 1:
        if (big_game_dict.players_kind[ big_game_dict.rounds % 2 ].kind == 'person')
          big_game_dict.state = 3;
        else
          big_game_dict.state = 2;
        await sleep(100);
        break;

      case 2:
        const aicb = getaicb(big_game_dict.players_kind[big_game_dict.rounds % 2].level);
        const play = aicb(loa_1);
        //const play = ai.random(loa_1);
        //const play = ai.minmax(loa_1, 3, ai.heuristic);
        if (!play.move)
          console.log('AI Error');
        big_game_dict.movestart = play.move[0];
        big_game_dict.moveend = play.move[1];
        big_game_dict.state = 6;
        break;

      case 3:
        big_game_dict.players_kind[ big_game_dict.rounds % 2 ].lastclick = null;
        if (myevent.event != 'click')
          return;
        //thisclick = {'x': Math.floor(myevent.where/8), 'y': myevent.where%8};
        //const lastclick = big_game_dict.players_kind[ big_game_dict.rounds % 2 ].lastclick;
        //if (thisclick.x == lastclick.x && thisclick.y == lastclick.y)
        //  return;
        //big_game_dict.players_kind[ big_game_dict.rounds % 2 ].lastclick = thisclick;
        big_game_dict.movestart = [thisclick.x, thisclick.y];
        const validmoves = loa.get_piece_moves(loa_1, thisclick, loa_1.turn); 
        if (validmoves.length < 1)
          return;
        //draw possibles
        for (const pmove of validmoves) {
          const pid = pmove[0]*8 + pmove[1];
          if (loa_1.turn == 'B')
            document.getElementById(pid).className = 'piece possibleBlack';
          else
            document.getElementById(pid).className = 'piece possibleWhite';
        }; 
        big_game_dict.state = 4;
        break;

      case 4:
        //thisclick = {'x': Math.floor(myevent.where/8), 'y': myevent.where%8};
        big_game_dict.moveend = [thisclick.x, thisclick.y];
        //big_game_dict.players_kind[ big_game_dict.rounds % 2 ].lastclick = thisclick;
        if (!loa._play_in_moves([big_game_dict.movestart, big_game_dict.moveend], loa.get_moves(loa_1, loa_1.turn))) {
          big_game_dict.state = 3;
          return;
        };
        big_game_dict.state = 6;
        break;

      case 5:
        console.log('end state5');
        isrun = false;
        break;

      case 6:
        const doplay = [big_game_dict.movestart, big_game_dict.moveend];
        loa_1 = loa.play(loa_1, loa_1.turn, doplay);
        big_game_dict.rounds++;
        big_game_dict.state = 1;
        if (loa_1.exist_win || big_game_dict.rounds > MAXROUNDS)
          big_game_dict.state = 7;
        break;

      case 7:
        big_game_dict.state = 5;
        isrun = false;
        break;

    };
  } while (big_game_dict.state != 3 && 
        big_game_dict.state != 4 && 
        big_game_dict.state != 5);
}

