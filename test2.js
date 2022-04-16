function print_game_test2(loa) {
  console.log(loa.turn, ' to play!');
  for (let i = 0; i < 8; i++) {
    let line = '';
    for (let car of loa.board[i])
      line += car + ' ';
    console.log(i + '  ' + line);
  };
};

let loa2 = {
      'board':[
        ['.', '.', '.', '.', '.', '.', '.', '.'],

        ['.', '.', '.', '.', '.', '.', '.', '.'],

        ['.', '.', '.', '.', 'W', '.', '.', '.'],

        ['.', '.', '.', '.', 'W', 'B', '.', '.'],

        ['.', '.', '.', '.', 'B', 'W', '.', 'W'],

        ['.', '.', '.', '.', '.', 'B', 'B', '.'],

        ['.', '.', '.', '.', '.', '.', '.', '.'],

        ['.', '.', '.', '.', '.', '.', '.', 'B']],
      'turn': 'B'}

//console.log('test2');
//console.log('test2');
//console.log('test2');
//console.log('test2');
//console.log('test2');
print_game_test2(loa2);

//console.log('depth1');
//console.log(ai.minmax(loa2, 1, ai.heuristic));
//console.log('depth2');
//console.log(ai.minmax(loa2, 2, ai.heuristic));
console.log('depth3');
console.log(ai.minmax(loa2, 3, ai.heuristic));
