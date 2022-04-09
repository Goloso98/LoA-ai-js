# Lines of Action

It's a classic board game. Played by two "people", on a 8x8 board.

Read the rules (http://www.iggamecenter.com/info/en/loa.html)[http://www.iggamecenter.com/info/en/loa.html]

## Roadmap 
[] base engine
[]   - win logic missing
[] html visuals
[] html/js logic
[] ai
[] buttons

## Exemple
let loa_game = loa.new_board()
// black opens the game
loa_game = loa.play(loa_game, 'B', [[piecetomovex, piecetomovey], [wheretomovex, wheretomovey]])
// then white
loa_game = loa.play(loa_game, 'W', [[piecetomovex, piecetomovey], [wheretomovex, wheretomovey]])

and so on...

this will return errors along with game_state.
