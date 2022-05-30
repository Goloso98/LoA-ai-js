from jogo import Loa
import numpy as np

# l = Loa()
# print(l)
# l = l.play(1, 7)
# print(l)


def make_board(size):
    def pos(x, y):
        return (y * size) + x
    board = np.zeros(size * size, dtype = int)
    for i in range(1, size-1):
        # board[pos(i, 0     )] = Loa.B   #top
        # board[pos(i, size-1)] = Loa.B   #bot
        board[pos(0     , i)] = Loa.B   #left
        board[pos(size-1, i)] = Loa.B   #right
    return board

size = 4
options = {
        "size": size,
        "turn": Loa.B,
        "single": True,
        "board": make_board(size)
        }

l2 = Loa(options = options)
print(l2)
l2 = l2.play(4, 6)
print(l2)
l2 = l2.play(8, 10)
print(l2)
