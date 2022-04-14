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
