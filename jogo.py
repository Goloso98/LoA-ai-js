import numpy as np

class loa():

    B = -1
    E = 0
    W = 1

    def make_board(self, size):
        board = np.zeros(size * size, dtype = int)
        #board[0] = loa.B
        for i in range(1, size-1):
            #board[i] = self.B   #top
            #board[(size - 1) * size + i] = self.B   #bot
            #board[i * size] = self.W    #left
            #board[(i * size) + (size - 1)] = self.W    #right
            board[self._pos(0, i)] = self.B   #top
            board[self._pos(size-1, i)] = self.B   #bot
            board[self._pos(i, 0)] = self.W    #left
            board[self._pos(i, size-1)] = self.W    #right

            
        return board

    def __init__(self, options=None):
        defaults = {
            'size': 8,
            'turn': self.B,
            'make': self.make_board
            }
        options = options or defaults

        self.size = options['size']
        self.turn = options['turn']
        self.board = options['make'](self.size)
        # status:
        self.status = [0, None]
        # 0 - running
        # 1 - one wins; check 2nd pos
        # 2 - draw

        # also check win here to fill blanks
        pass

    def _pos(self, x, y):
        return (self.size * x) + y

    def _pieces(self, n):
        if n == 1:
            return 'W'
        elif n == -1:
            return 'B'
        return '.'

    def __str__(self):
        board = self.board
        buff = ""
        buff += "Board:"
        for i in range(self.size * self.size):
            if not i%self.size:
                buff += "\n\t"
            buff += self._pieces(board[i])
            buff += " "
        buff += "\nTurn: "
        buff += self._pieces(self.turn)
        return buff

    def play(self, play):
        pass

    def clone(self):
        pass
    
    def _play(self, play):
        pass


def my_b(size):
    return [1]

a = {
    'size': 1,
    'turn': loa.W,
    'make': my_b
    }

l = loa() #options=a)
#print(l.board)
print(l)
