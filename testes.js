function print_game_test(loa) {
  console.log(loa.turn, ' to play!');
  for (let i = 0; i < 8; i++) {
    let line = '';
    for (let car of loa.board[i])
      line += car + ' ';
    console.log(i + '  ' + line);
  };
}


//let loa1 = loa.new_board()
//console.log(loa1)
////loa1.turn = loa.get_next_turn_symbol(loa1)
////let moves = loa.get_piece_moves(loa1, {x:1, y:2}, 'B')
//console.log('all moves')
//console.log(loa.get_moves(loa1, loa1.turn))
//console.log('done')

let loa1 = {
      'board':[
        ['.', '.', '.', '.', '.', '.', '.', '.'],

        ['.', '.', '.', '.', '.', '.', '.', '.'],

        ['.', '.', '.', '.', '.', 'W', '.', '.'],

        ['.', '.', '.', '.', 'W', '.', '.', 'B'],

        ['.', '.', '.', '.', 'B', 'W', '.', 'W'],

        ['.', '.', '.', '.', '.', 'B', 'B', '.'],

        ['.', '.', '.', '.', '.', '.', '.', '.'],

        ['.', '.', '.', '.', '.', '.', '.', 'B']],
      'turn': 'B'}

loa1 = loa.play(loa1, loa1.turn, ai.minmax(loa1, 3, ai.heuristic).move); // print_game_test(loa1);
loa1 = loa.play(loa1, loa1.turn, ai.minmax(loa1, 3, ai.heuristic).move); print_game_test(loa1);
print_game_test(loa1);
console.log(loa.get_moves(loa1, 'B'));
//console.log(ai.heuristic(loa1, 'W'), 'W');
//console.log(ai.heuristic(loa1, 'B'), 'B');
console.log(ai.minmax(loa1, 3, ai.heuristic));
//console.log(ai.minmax(loa1, 1, ai.heuristic));

function soloplay() {
  let bot = true;
  let botai = ai.random;
  let times = 50;
  let loa_game = loa.new_board();
  print_game_test(loa_game);

  while(!loa_game.exist_win && prompt() != null) {
    while (times >= 0 && !loa_game.exist_win) {
      //console.log('ola1');
      if (bot)
        botai = ai.minmax;
      else
        botai = ai.alphabeta;
      bot = !bot;
      loa_game = loa.play( loa_game, loa_game.turn, botai(loa_game, 3, ai.heuristic).move );
      //console.log('ola2');
      print_game_test(loa_game);
      times--;
    };
    times = 20;
  };
};
//soloplay();
