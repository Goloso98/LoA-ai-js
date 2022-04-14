/**
 * AI for loa (game.js)
 * this is minmax 
 */

const minmax = {
  heuristic: function(game_state, myturn) {
    const board = game_state.board;
    let mypoints = 0;
    let advpoints = 0;
    let advturn = loa.get_next_turn_symbol(game_state);
    
    let center = loa.board_size / 2; // its a square so center x == center y...
    for (let i = 0; i < loa.board_size; i++)
      for (let j = 0; j < loa.board_size; j++) {
        let piece = board[i][j];
        let sum = (center - i) * (center - i) + (center - j) * (center - j); //(x-x0)^2 + (y-y0)^2
        console.log(sum);
        sum = Math.sqrt(sum);
        console.log(sum);
        sum = 1/sum; //make pieces closer value more than further..
        console.log(sum);
        if (piece == myturn)
          mypoints += sum;
        if (piece == advturn)
          advpoints += sum;
      }
  return mypoints - advpoints;
  }
}
