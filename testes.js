function print_game_test(loa) {
  for (let i = 0; i < 8; i++)
    console.log(i + '  ' + loa.board[i].toString());
}


//let loa1 = loa.new_board()
//console.log(loa1)
////loa1.turn = loa.get_next_turn_symbol(loa1)
////let moves = loa.get_piece_moves(loa1, {x:1, y:2}, 'B')
//console.log('all moves')
//console.log(loa.get_moves(loa1, loa1.turn))
//console.log('done')

const loa1 = {
      'board':[
        ['.', '.', '.', '.', '.', '.', '.', '.'],

        ['.', '.', '.', '.', '.', 'W', 'B', '.'],

        ['.', '.', '.', '.', '.', '.', '.', '.'],

        ['.', 'W', 'B', '.', '.', '.', '.', '.'],

        ['.', '.', '.', '.', '.', '.', '.', '.'],

        ['.', '.', '.', '.', '.', '.', '.', '.'],

        ['.', '.', '.', '.', '.', '.', '.', '.'],

        ['.', '.', '.', '.', '.', '.', '.', '.']],
      'turn': 'B'}

console.log(loa.get_moves(loa1, 'B'));
//console.log(ai.heuristic(loa1, 'W'), 'W');
//console.log(ai.heuristic(loa1, 'B'), 'B');
console.log(ai.minmax(loa1, 3, ai.heuristic));

let bot = true;
let botai = ai.random;
let loa_game = loa.new_board();
print_game_test(loa_game);
while(prompt() != null) {
  //console.log('ola1');
  if (bot)
    botai = ai.minmax;
  else
    botai = ai.random;
  bot = !bot;
  loa_game = loa.play( loa_game, loa_game.turn, botai(loa_game, 3, ai.heuristic).move );
  //console.log('ola2');
  print_game_test(loa_game);
};

