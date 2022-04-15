/**
 * AI for loa (game.js)
 * this is minmax 
 */

const ai = {
  random: function(game_state) {
    console.log('random');
    const moves = loa.get_moves(game_state, game_state.turn);
    if (moves.length < 1)
      return {'error': 'No valid moves to play.'};
    const rand = Math.floor(Math.random()*moves.length);
    //console.log(moves.length, rand, moves[rand]);
    return {'move': moves[rand]};
  },

  heuristic: function(game_state, myturn) {
    /**
     * This heuristic only computes the sum of distances to the center
     */

    const board = game_state.board;
    let win = loa.win(game_state);
    if (win.exist_win)
      if (win.player == null)
        return 0;
      else
        if (win.player == myturn)
          return 1000;
        else
          return -1000;

    let mypoints = 0;
    let advpoints = 0;
    let advturn = loa._get_next_turn_symbol(myturn);
    
    let center = loa.board_size / 2; // its a square so center x == center y...
    for (let i = 0; i < loa.board_size; i++)
      for (let j = 0; j < loa.board_size; j++) {
        let piece = board[i][j];
        let sum = (center - i) * (center - i) + (center - j) * (center - j); //(x-x0)^2 + (y-y0)^2
        //console.log(sum);
        //sum = Math.sqrt(sum);
        //console.log(sum);
        sum = 1/sum; //make pieces closer value more than further..
        sum *= 10;
        //console.log(sum);
        if (piece == myturn)
          mypoints += sum;
        if (piece == advturn)
          advpoints += sum;
        //console.log('piece: ', piece, ', my: ', myturn, piece == myturn, ', adv: ', advturn, piece == advturn);
        //console.log('my: ', mypoints, ', adv: ', advpoints);
      }
    return res = mypoints - advpoints;
  },

  minmax: function(game_state, depth, heuristic) {
    console.log('minmax');
    const moves = loa.get_moves(game_state, game_state.turn);
    let bestval = -9999;
    let bestmove = null;

    if (moves.length < 1)
      return {'error': 'No valid moves to play.'};

    for (let move of moves) {
      const new_game_state = loa.play(game_state, game_state.turn, move);
      const currval = ai._minmax_min(new_game_state, depth-1, heuristic);
      if (currval > bestval) {
        bestval = currval;
        bestmove = move;
      };
    };
    return {'move': bestmove, 'heuristic': bestval};
  },

  _minmax_max: function(game_state, depth, heuristic) {
    //console.log('max: ', depth);
    if (depth == 0)
      return heuristic(game_state, game_state.turn);

    const moves = loa.get_moves(game_state, game_state.turn);
    if (moves.length < 1)
      return heuristic(game_state, game_state.turn);

    let bestval = -9999;
    for (let move of moves) {
      const new_game_state = loa.play(game_state, game_state.turn, move);
      const currval = ai._minmax_min(new_game_state, depth-1, heuristic);
      bestval = Math.max(bestval, currval);
    };
    return bestval;
  },

  _minmax_min: function(game_state, depth, heuristic) {
    //console.log('min: ', depth);
    if (depth == 0)
      return heuristic(game_state, game_state.turn);

    const moves = loa.get_moves(game_state, game_state.turn);
    if (moves.length < 1)
      return heuristic(game_state, game_state.turn);

    let bestval = 9999;
    for (let move of moves) {
      const new_game_state = loa.play(game_state, game_state.turn, move);
      const currval = this._minmax_max(new_game_state, depth-1, heuristic);
      bestval = Math.min(bestval, currval);
    };
    return bestval;
  }
}

