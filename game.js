/**
 * game_state = {board: 2darray, turn: piececolor}
 * cell = {x:xpos, y:ypos}
 */

const loa = {
  board_size: 8,

  new_board: function() {
    return {
      'board':[
        ['.', 'B', 'B', 'B', 'B', 'B', 'B', '.'],

        ['W', '.', '.', '.', '.', '.', '.', 'W'],

        ['W', '.', '.', '.', '.', '.', '.', 'W'],

        ['W', '.', '.', '.', '.', '.', '.', 'W'],

        ['W', '.', '.', '.', '.', '.', '.', 'W'],

        ['W', '.', '.', '.', '.', '.', '.', 'W'],

        ['W', '.', '.', '.', '.', '.', '.', 'W'],

        ['.', 'B', 'B', 'B', 'B', 'B', 'B', '.']],
      'turn': 'B'}
  },

  get_next_turn_symbol: function(game_state) { return  game_state.turn == 'B' ? 'W' : 'B'; },

  is_inside_bounds: function(cell) { return cell.y >= 0 && cell.x >= 0 && cell.y < this.board_size && cell.x < this.board_size; },

  get_piece_moves: function(game_state, cell, turn) {
    if (game_state.board[cell.x][cell.y] != turn) return [];
    let board = game_state.board;
    let enemy_piece = this.get_next_turn_symbol(game_state);
    
    let moves = [];
    let newcell = {};
    /*horizontal moves*/
    let hcount = 0;
    for (let y = 0; y < this.board_size; y++)
      if (board[cell.x][y] != '.')
        hcount++;
    /*positives horizontal*/
    let canplace = true;
    for (let y = 1; canplace && y < hcount; y++) {
      newcell = {'x':cell.x, 'y':cell.y+y};
      //console.log('x:' + newcell.x + ' y:' + newcell.y);
      if (!this.is_inside_bounds(newcell)) {  // break if out of bounds
        //console.log('play out of bounds');
        canplace = false;
        break;
      }
      if(board[newcell.x][newcell.y] == enemy_piece) {  // break if enemy piece on the way
        //console.log('play collide with enemy piece');
          canplace = false;
          break;
      }
    }
    newcell = {'x':cell.x, 'y':cell.y+hcount};
    if(canplace && this.is_inside_bounds(newcell) && board[newcell.x][newcell.y] != turn) {
      moves.push([newcell.x, newcell.y]) 
    }
    /*negative horizontal*/
    canplace = true;
    for (let y = 1; canplace && y < hcount; y++) {
      newcell = {'x':cell.x, 'y':cell.y-y};
      //console.log('x:' + newcell.x + ' y:' + newcell.y);
      if (!this.is_inside_bounds(newcell)) {  // break if out of bounds
        //console.log('play out of bounds');
        canplace = false;
        break;
      }
      if(board[newcell.x][newcell.y] == enemy_piece) {  // break if enemy piece on the way
        //console.log('play collide with enemy piece');
          canplace = false;
          break;
      }
    }
    newcell = {'x':cell.x, 'y':cell.y-hcount};
    if(canplace && this.is_inside_bounds(newcell) && board[newcell.x][newcell.y] != turn) {
      moves.push([newcell.x, newcell.y]) 
    }
    //console.log('hcount: ' + hcount);

    /*vertical moves*/
    let vcount = 0;
    for (let x = 0; x < this.board_size; x++)
      if (board[x][cell.y] != '.')
        vcount++;
    /*positives verticaly*/
    canplace = true;
    for (let x = 1; canplace && x < vcount; x++) {
      newcell = {'x':cell.x+x, 'y':cell.y};
      //console.log('x:' + newcell.x + ' y:' + newcell.y);
      if (!this.is_inside_bounds(newcell)) {  // break if out of bounds
        //console.log('play out of bounds');
        canplace = false;
        break;
      }
      if(board[newcell.x][newcell.y] == enemy_piece) {  // break if enemy piece on the way
        //console.log('play collide with enemy piece');
          canplace = false;
          break;
      }
    }
    newcell = {'x':cell.x+vcount, 'y':cell.y};
    if(canplace && this.is_inside_bounds(newcell) && board[newcell.x][newcell.y] != turn) {
      moves.push([newcell.x, newcell.y]) 
    }
    /*negatives verticaly*/
    canplace = true;
    for (let x = 1; canplace && x < vcount; x++) {
      newcell = {'x':cell.x-x, 'y':cell.y};
      //console.log('x:' + newcell.x + ' y:' + newcell.y);
      if (!this.is_inside_bounds(newcell)) {  // break if out of bounds
        //console.log('play out of bounds');
        canplace = false;
        break;
      }
      if(board[newcell.x][newcell.y] == enemy_piece) {  // break if enemy piece on the way
        //console.log('play collide with enemy piece');
          canplace = false;
          break;
      }
    }
    newcell = {'x':cell.x-vcount, 'y':cell.y};
    if(canplace && this.is_inside_bounds(newcell) && board[newcell.x][newcell.y] != turn) {
      moves.push([newcell.x, newcell.y]) 
    }
    //console.log('vcount: ' + vcount);

    /*diagonal 1 moves*/
    let d1count = 0;
    newcell = {'x':cell.x, 'y':cell.y}; //check self
    while(this.is_inside_bounds(newcell)) {
      if (board[newcell.x][newcell.y] != '.')
        d1count++;
      newcell.x++;
      newcell.y++;
    }
    newcell = {'x':cell.x-1, 'y':cell.y-1}; //dont check self
    while(this.is_inside_bounds(newcell)) {
      if (board[newcell.x][newcell.y] != '.')
        d1count++;
      newcell.x--;
      newcell.y--;
    }
    /*diagonal 1 positive*/
    canplace = true;
    for (let i = 1; canplace && i < d1count; i++) {
      newcell = {'x':cell.x+i, 'y':cell.y+i};
      //console.log('x:' + newcell.x + ' y:' + newcell.y);
      if (!this.is_inside_bounds(newcell)) {
        //console.log('play out of bounds');
        canplace = false;
        break;
      } 
      if(board[newcell.x][newcell.y] == enemy_piece) {  // break if enemy piece on the way
        //console.log('play collide with enemy piece');
          canplace = false;
          break;
      }
    }
    newcell = {'x':cell.x+d1count, 'y':cell.y+d1count};
    if(canplace && this.is_inside_bounds(newcell) && board[newcell.x][newcell.y] != turn) {
      moves.push([newcell.x, newcell.y]) 
    }
    /*diagonal 1 negative*/
    canplace = true;
    for (let i = 1; canplace && i < d1count; i++) {
      newcell = {'x':cell.x-i, 'y':cell.y-i};
      //console.log('x:' + newcell.x + ' y:' + newcell.y);
      if (!this.is_inside_bounds(newcell)) {
        //console.log('play out of bounds');
        canplace = false;
        break;
      } 
      if(board[newcell.x][newcell.y] == enemy_piece) {  // break if enemy piece on the way
        //console.log('play collide with enemy piece');
          canplace = false;
          break;
      }
    }
    newcell = {'x':cell.x-d1count, 'y':cell.y-d1count};
    if(canplace && this.is_inside_bounds(newcell) && board[newcell.x][newcell.y] != turn) {
      moves.push([newcell.x, newcell.y]) 
    }

    /*diagonal 2 moves*/
    let d2count = 0;
    newcell = {'x':cell.x, 'y':cell.y}; //check self
    while(this.is_inside_bounds(newcell)) {
      if (board[newcell.x][newcell.y] != '.')
        d2count++;
      newcell.x--;
      newcell.y++;
    }
    newcell = {'x':cell.x+1, 'y':cell.y-1}; //dont check self
    while(this.is_inside_bounds(newcell)) {
      if (board[newcell.x][newcell.y] != '.')
        d2count++;
      newcell.x++;
      newcell.y--;
    }

    /*diagonal 2 positive*/
    canplace = true;
    for (let i = 1; canplace && i < d2count; i++) {
      newcell = {'x':cell.x-i, 'y':cell.y+i};
      //console.log('x:' + newcell.x + ' y:' + newcell.y);
      if (!this.is_inside_bounds(newcell)) {
        //console.log('play out of bounds');
        canplace = false;
        break;
      } 
      if(board[newcell.x][newcell.y] == enemy_piece) {  // break if enemy piece on the way
        //console.log('play collide with enemy piece');
          canplace = false;
          break;
      }
    }
    newcell = {'x':cell.x-d2count, 'y':cell.y+d2count};
    if(canplace && this.is_inside_bounds(newcell) && board[newcell.x][newcell.y] != turn) {
      moves.push([newcell.x, newcell.y]) 
    }

    /*diagonal 2 negative*/
    canplace = true;
    for (let i = 1; canplace && i < d2count; i++) {
      newcell = {'x':cell.x+i, 'y':cell.y-i};
      //console.log('x:' + newcell.x + ' y:' + newcell.y);
      if (!this.is_inside_bounds(newcell)) {
        //console.log('play out of bounds');
        canplace = false;
        break;
      } 
      if(board[newcell.x][newcell.y] == enemy_piece) {  // break if enemy piece on the way
        //console.log('play collide with enemy piece');
          canplace = false;
          break;
      }
    }
    newcell = {'x':cell.x+d2count, 'y':cell.y-d2count};
    if(canplace && this.is_inside_bounds(newcell) && board[newcell.x][newcell.y] != turn) {
      moves.push([newcell.x, newcell.y]) 
    }
    return moves;
  },

  get_moves: function(game_state, turn) {
    let moves = [];
    if (game_state.turn != turn)
      return moves;

    for (let i = 0; i < this.board_size; i++)
      for (let j = 0; j < this.board_size; j++)
        if (game_state.board[i][j] == turn) {
          let mid = this.get_piece_moves(game_state, {'x':i, 'y':j}, turn);
          mid = mid.map(x => [[i,j], x]);
          moves.push(mid);
          //moves.push( this.get_piece_moves(game_state, {'x':i, 'y':j}, turn).map((move) => { return [[i,j], move]}) );
          //console.log('(' + i + ', ' + j + ')');
          //console.log(mid);
        }
    return moves.flat();
  },

  _play_in_moves(play, moves) {
    for (let m = 0; m < moves.length; m++) {
      let elem = moves[m];
      let equals = true;
      for (let i = 0; i < 2; i++)
        for (let j = 0; j < 2; j++)
          if (play[i][j] != elem[i][j])
            equals = false;
      if (equals) return true;
    }
    return false;
  },

  _board_copy: function(board) {
    let new_board = [];
    for (let i = 0; i < this.board_size; i++)
      new_board.push([... board[i]]);
    return new_board;
  },

  play: function(game_state, turn, play) {
    if (game_state.turn != turn) {
      game_state.error = "Turns dont match."; 
      return game_state;
    }
    let possible_moves = this.get_moves(game_state, turn);

    if (!this._play_in_moves(play, possible_moves)) {
      game_state.error = "Not a valid move."; 
      return game_state;
    }
    
    let board = this._board_copy(game_state.board);
    let last = play[0];
    let next = play[1];
    
    board[last[0]][last[1]] = '.';
    board[next[0]][next[1]] = turn;
    return {"board": board, "turn": this.get_next_turn_symbol(game_state)};
  }
}

function print_game_test(loa) {
  for (let i = 0; i < 8; i++)
    console.log(i + '  ' + loa.board[i].toString());
}


let loa1 = loa.new_board()
console.log(loa1)
//loa1.turn = loa.get_next_turn_symbol(loa1)
//let moves = loa.get_piece_moves(loa1, {x:1, y:2}, 'B')
console.log('all moves')
console.log(loa.get_moves(loa1, loa1.turn))
console.log('done')
