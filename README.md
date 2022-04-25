# Lines of Action

It's a classic board game. Played by two "people", on a 8x8 board.

Read the rules (http://www.iggamecenter.com/info/en/loa.html)[http://www.iggamecenter.com/info/en/loa.html]

## Roadmap 
- [X] base engine
- [X] win logic missing
- [X] html visuals
- [X] html/js logic
- [X] ai
- [X] buttons

## Exemple
let loa_game = loa.new_board()
// black opens the game
loa_game = loa.play(loa_game, 'B', [[piecetomovex, piecetomovey], [wheretomovex, wheretomovey]])
// then white
loa_game = loa.play(loa_game, 'W', [[piecetomovex, piecetomovey], [wheretomovex, wheretomovey]])

and so on...

this will return errors along with game_state.

## How to run and play the game

A simple double click on the index.html file is enough