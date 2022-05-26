import numpy as np
from copy import copy

class Loa():

    B = -1
    E = 0
    W = 1

    def make_board(self, size):
        board = np.zeros(size * size, dtype = int)
        #board[0] = Loa.B
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

    def __copy__(self):
        clone = Loa.__new__(Loa)
        clone.size = self.size
        clone.turn = self.turn
        clone.status = self.status
        clone.board = np.copy(self.board)
        return clone


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
        buff += "__________________\n"
        buff += "Board:"
        for i in range(self.size * self.size):
            if not i%self.size:
                buff += "\n\t"
            else:
                buff += " "
            buff += self._pieces(board[i])
        buff += "\nTurn: "
        buff += self._pieces(self.turn)
        buff += "\nStatus: "
        buff += "nope"
        buff += "\n__________________"
        return buff
    
    def isValid(self, play_start, play_end):

        def isHorizontal():
            # assume start, verify end
            Hstart = (play_start // self.size) * self.size # included
            Hend   = Hstart + self.size # not included
            return play_end >= Hstart and play_end < Hend

        def isVertical():
            return (play_start % self.size) == (play_end % self.size)

        def isDiagonal1(): # \
            return ((play_start % self.size) - (play_end % self.size)) == \
                    ((play_start // self.size) - (play_end // self.size))

        def isDiagonal2(): # /
            return ((play_start % self.size) - (play_end % self.size)) == \
                    (((play_start // self.size) - (play_end // self.size)) * -1)

        def countHorizontal():
            line = play_start // self.size
            count = 0
            for i in range(line*self.size, line*self.size+self.size):
                if (self.board[i] != 0):
                    count += 1

        def countVertical():
            collumn = play_start % self.size
            count = 0
            for i in range(collumn, self.size * self.size, self.size):
                if (self.board[i] != 0):
                    count += 1

        def countDiagonal1():
            num = play_start
            x = num % self.size
            y = num // self.size
            # mult = 1

            # if (num) < self._pos(y,y):
            #     # if num below main diagonal
            #     # then mirror it perpendicular to the main diag
            #     num = self.pos(y,x)
            #     x, y = y, x
            #     mult = self.size

            # # y = distance to left edge
            lower = x-y
            if lower < 0:
                lower *= self.size * -1

            count = 0
            for i in range(lower, self.size * self.size, self.size + 1): # range: [lower, size**2[ not included
                if (self.board[i] != 0):
                    count += 1

        def countDiagonal2():
            num = play_start
            x = num % self.size
            y = num // self.size

            lower = 0
            count = 0
            for i in range(lower, self.size * self.size, self.size - 1):
                if (self.board[i] != 0):
                    count += 1

        if (play_start == play_end):
            return False
        if (play_start < 0 or play_end < 0 or \
                play_start >= self.size * self.size or \
                play_end >= self.size * self.size):
            return False

        if isHorizontal():
            pass


    def play(self, play_start, play_end):
        my = self.__copy__()
        if not self.isValid(play_start, play_end):
            return my
        # if valide move
        my._play(play_start, play_end)
        return my

    def _play(self, play_start, play_end):
        #just play
        self.board[play_start] = self.E
        self.board[play_end] = self.turn

        self.turn *= -1



def my_b(size):
    return [1]

a = {
    'size': 1,
    'turn': Loa.W,
    'make': my_b
    }

l = Loa() #options=a)
ll = l.play(0, 0)
print(l)
print(ll)
