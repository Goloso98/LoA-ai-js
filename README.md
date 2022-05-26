# Lines of Action

It's a classic board game. Played by two "people", on a 8x8 board.

[Read the rules here](http://www.iggamecenter.com/info/en/loa.html)

## Roadmap 
- [X] base engine
- [X] win logic missing
- [X] html visuals
- [X] html/js logic
- [X] ai
- [X] buttons

## Exemple
```js
let loa_game = loa.new_board()
// black opens the game
loa_game = loa.play(loa_game, 'B', [[piecetomovex, piecetomovey], [wheretomovex, wheretomovey]])
// then white
loa_game = loa.play(loa_game, 'W', [[piecetomovex, piecetomovey], [wheretomovex, wheretomovey]])
```

and so on...

this will return errors along with game\_state.

## How to run and play the game

A simple double click on the index.html file is enough to start the game. 
When you open the page there's a board and under it the options of how you want to play the game, you select the following options:

- Human vs Human
- Human vs AI
- Ai vs Human
- AI vs AI

The AI has 7 different levels Easy, then for Minmax algorithm we have Medium, Hard and Very Hard(Depth Search 1, 2 and 3 respectively) and the last 3 are using Alpha Beta Pruning with Medium, Hard and Very Hard(Depth Search 1, 2 and 3 respectively).

After choosing how you want to play simply click on the "New Game" button and you can start the game!
