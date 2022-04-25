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
    //center += 0.0001; // no more infinity
    for (let i = 0; i < loa.board_size; i++)
      for (let j = 0; j < loa.board_size; j++) {
        let piece = board[i][j];
        let sum = (center - i) * (center - i) + (center - j) * (center - j); //(x-x0)^2 + (y-y0)^2
        //console.log(sum, ' new ', Math.max(sum, 0.8));
        sum = Math.max(sum, 0.8); // no more infinity
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
    return mypoints - advpoints;
  },

  minmax: function(game_state, depth, heuristic) {
    console.log('minmax ', depth);
    let moves = loa.get_moves(game_state, game_state.turn);
    let bestval = -Infinity;
    let bestmove = null;

    if (moves.length < 1)
      return {'error': 'No valid moves to play.'};

    //moves = [moves[0]];
    //console.log('len: ', moves.length);
    for (let move of moves) {
      //console.log(move.toString());
      const new_game_state = loa.play(game_state, game_state.turn, move);
      if (loa.win(new_game_state).player == game_state.turn)
        return {'move': move, 'heuristic': heuristic(new_game_state, game_state.turn)};
      const currval = ai._minmax_min(new_game_state, depth-1, heuristic);
      if (currval > bestval) {
        bestval = currval;
        bestmove = move;
        //console.log(bestval, bestmove);
      };
    };
    return {'move': bestmove, 'heuristic': bestval};
  },

  _minmax_max: function(game_state, depth, heuristic) {
    //console.log('max: ', depth);
    if (depth == 0) {
      //console.log(depth, 'max ', heuristic(game_state, game_state.turn));
      return heuristic(game_state, loa._get_next_turn_symbol(game_state.turn));
    };

    const moves = loa.get_moves(game_state, game_state.turn);
    if (moves.length < 1) {
      return heuristic(game_state, loa._get_next_turn_symbol(game_state.turn));
    };

    let bestval = -Infinity;
    for (let move of moves) {
      const new_game_state = loa.play(game_state, game_state.turn, move);
      const currval = ai._minmax_min(new_game_state, depth-1, heuristic);
      bestval = Math.max(bestval, currval);
    };
    return bestval;
  },

  _minmax_min: function(game_state, depth, heuristic) {
    //console.log('min:-', depth);
    if (depth == 0) {
      //console.log('min ', heuristic(game_state, game_state.turn));
      return heuristic(game_state, loa._get_next_turn_symbol(game_state.turn));
    };

    const moves = loa.get_moves(game_state, game_state.turn);
    if (moves.length < 1)
      return heuristic(game_state, loa._get_next_turn_symbol(game_state.turn));

    let bestval = Infinity
    for (let move of moves) {
      const new_game_state = loa.play(game_state, game_state.turn, move);
      const currval = this._minmax_max(new_game_state, depth-1, heuristic);
      bestval = Math.min(bestval, currval);
    };
    return bestval;
  },

  alphabeta: function(game_state, depth, heuristic) {
    console.log('alphabeta');
    let moves = loa.get_moves(game_state, game_state.turn);
    let bestval = -Infinity;
    let bestmove = null;

    if (moves.length < 1)
      return {'error': 'No valid moves to play.'};

    //moves = [moves[0]];
    //console.log('len: ', moves.length);
    for (let move of moves) {
      //console.log(move.toString());
      const new_game_state = loa.play(game_state, game_state.turn, move);
      if (loa.win(new_game_state).player == game_state.turn)
        return {'move': move, 'heuristic': heuristic(new_game_state, game_state.turn)};
      const currval = ai._alphabeta_max(new_game_state, -Infinity, Infinity, depth-1, heuristic);
      if (currval > bestval) {
        bestval = currval;
        bestmove = move;
        //console.log(bestval, bestmove);
      };
    };
    return {'move': bestmove, 'heuristic': bestval};
  },

  _alphabeta_max: function(game_state, alpha, beta, depth, heuristic) {
    //console.log('max: ', depth);
    if (depth == 0) {
      //console.log(depth, 'max ', heuristic(game_state, game_state.turn));
      return heuristic(game_state, loa._get_next_turn_symbol(game_state.turn));
    };

    const moves = loa.get_moves(game_state, game_state.turn);
    if (moves.length < 1) {
      return heuristic(game_state, loa._get_next_turn_symbol(game_state.turn));
    };

    let bestval = -Infinity;
    for (let move of moves) {
      const new_game_state = loa.play(game_state, game_state.turn, move);
      const currval = ai._alphabeta_min(new_game_state, alpha, beta, depth-1, heuristic);
      bestval = Math.max(bestval, currval);
      alpha = Math.max(alpha, bestval);
      if (beta <= alpha)
        break;
    };
    return bestval;
  },

  _alphabeta_min: function(game_state, alpha, beta, depth, heuristic) {
    //console.log('min:-', depth);
    if (depth == 0) {
      //console.log('min ', heuristic(game_state, game_state.turn));
      return heuristic(game_state, loa._get_next_turn_symbol(game_state.turn));
    };

    const moves = loa.get_moves(game_state, game_state.turn);
    if (moves.length < 1)
      return heuristic(game_state, loa._get_next_turn_symbol(game_state.turn));

    let bestval = Infinity
    for (let move of moves) {
      const new_game_state = loa.play(game_state, game_state.turn, move);
      const currval = this._alphabeta_max(new_game_state, alpha, beta, depth-1, heuristic);
      bestval = Math.min(bestval, currval);
      beta = Math.min(beta, bestval);
      if (beta <= alpha)
        break;
    };
    return bestval;
  }
}

