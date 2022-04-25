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
  _get_next_turn_symbol: function(turn) { return  turn == 'B' ? 'W' : 'B'; },

  is_inside_bounds: function(cell) { return cell.y >= 0 && cell.x >= 0 && cell.y < this.board_size && cell.x < this.board_size; },

  get_piece_moves: function(game_state, cell, turn) {
    if (game_state.board[cell.x][cell.y] != turn) return [];
    if (this.endgame(game_state)) return [];
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
    if (this.endgame(game_state))
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

  duplicate: function(game_state) {
    return {'board': loa._board_copy(game_state.board), 'turn': game_state.turn};
  },

  count: function(game_state) {
    let counts = {};
    let board = game_state.board;
    for (let i = 0; i < this.board_size; i++)
      for (let j = 0; j < this.board_size; j++) {
        let car = board[i][j];
        if (!(car in counts))
          counts[car] = 0;
        counts[car]++;
      }
    return counts;
  },

  _split_pos: function(pos) { return {'x': Math.trunc(pos/this.board_size), 'y': (pos - (this.board_size * Math.trunc(pos/this.board_size)))};},

  _win_blob: function(game_state, turn) {
    // use "absolute" array possition, a list isnot consistent hashable, like numbers.
    // choose the first elememt to start the bfs visit
    let pos = -1;
    let board = game_state.board;
    for (let i = 0; pos < 0 && i < this.board_size; i++)
      for (let j = 0; pos < 0 && j < this.board_size; j++)
        if (board[i][j] == turn)
          pos = i * this.board_size + j;

    if (pos < 0) // no piece matching the turn was found
      return 0;

    let gen_neigh = function(pos) {
      let x = this._split_pos(pos).x;
      let y = this._split_pos(pos).y;
      // console.log(board[x][y], this.board_size, this._split_pos(10));
      // console.log(x, y);
      let neigh = [];
      for (let ii = -1; ii < 2; ii++)
        for (let jj = -1; jj < 2; jj++) {
          if (ii == 0 && jj == 0)
            continue;
          let i = x + ii;
          let j = y + jj;
          if (i < 0 || i >= this.board_size || j < 0 || j >= this.board_size)
            continue;
          if (board[i][j] == turn)
            neigh.push(i * this.board_size + j);
        };
      return neigh;
    };
    // console.log(gen_neigh.call(this));
    const visited = new Set();
    let stack = [];

    stack.push(pos);
    while (stack.length > 0) {
      let cur = stack.pop();
      if (!visited.has(cur)) {
        visited.add(cur);
        let neighs = gen_neigh.call(this, cur);
        for (let neigh = 0; neigh < neighs.length; neigh++) {
          let nei = neighs[neigh];
          if (!visited.has(nei))
            stack.push(nei);
        };
      };
    };
    // console.log(visited.size);
    return visited.size;
  },

  win: function(game_state) {
    // return {exist_win: bool, player: 'B'/null}
    // exist_win: false -> player null
    // exist_win: true -> player_turn
    // or draw exist_win: true -> null
    let count = this.count(game_state);
    let blobs = {}; // blobs[turn] will be set (to the size of the blob) if its in a end state, -1 otherwise;
    blobs[game_state.turn] = -1;
    blobs[this.get_next_turn_symbol(game_state)] = -1;

    for (let turn in blobs) {
      blobs[turn] = this._win_blob(game_state, turn);
      if (blobs[turn] != count[turn])
        blobs[turn] = -1;
    };

    let this_turn = game_state.turn;
    let next_turn = this.get_next_turn_symbol(game_state);
    if (blobs[this_turn] < 0 && blobs[next_turn] < 0)
      return {exist_win: false, player: null}; // no win yet

    if (blobs[this_turn] == blobs[next_turn])
      return {exist_win: true, player: null}; // draw

    if (blobs[this_turn] > blobs[next_turn])
      return {exist_win: true, player: this_turn}; // this_turn wins
    else
      return {exist_win: true, player: next_turn}; // next_turn wins
  },

  endgame: function(game_state) {
    let win = this.win(game_state);
    return win.exist_win;
  },
  _play: function(game_state, turn, play) {
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
  },

  play: function(game_state, turn, play) {
    let playres = this._play(game_state, turn, play);
    let winres  = this.win(playres);
    const res = Object.assign(playres, winres);
    return res;
  }
}
