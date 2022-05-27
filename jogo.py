import numpy as np
# from copy import copy

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
        self.bsize = self.size * self.size
        self.turn = options['turn']
        self.board = options['make'](self.size)
        # status:
        self.status = [0, None]
        self.round = 0
        # 0 - running
        # 1 - one wins; check 2nd pos
        # 2 - draw

        # also check win here to fill blanks
        pass

    def __copy__(self):
        clone = Loa.__new__(Loa)
        clone.size = self.size
        clone.bsize = self.bsize
        clone.turn = self.turn
        clone.status = self.status
        clone.round = self.round
        clone.board = np.copy(self.board)
        return clone

    def __eq__(self, other):
        if not isinstance(other, Loa):
            return False

        if self.turn != other.turn:
            return False
        
        if self.round != other.round:
            return False
        
        if self.status != other.status:
            return False

        if not np.array_equal(self.board, other.board):
            return False
        
        return True


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
        for i in range(self.bsize):
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
            return count

        def countVertical():
            collumn = play_start % self.size
            count = 0
            for i in range(collumn, self.bsize, self.size):
                if (self.board[i] != 0):
                    count += 1
            return count

        def countDiagonal1():
            num = play_start
            x = num % self.size
            y = num // self.size

            count = 0
            for i in range(self.size - x): # range: [start.x, size[
                pos = self._pos(x + i, y + i)
                if (pos >= self.bsize):
                    break
                if (self.board[pos] != self.E):
                    count += 1

            for i in range(1, x + 1):
                pos = self._pos(x - i, y - i)
                if (pos < 0):
                    break
                if (self.board[pos] != self.E):
                    count += 1

            return count

        def countDiagonal2():
            num = play_start
            x = num % self.size
            y = num // self.size

            count = 0
            for i in range(self.size - x): # range: [start.x, size[
                pos = self._pos(x + i, y - i)
                if (pos < 0):
                    break
                if (self.board[pos] != self.E):
                    count += 1

            for i in range(1, x + 1):
                pos = self._pos(x - i, y + i)
                if (pos >= self.bsize):
                    break
                if (self.board[pos] != self.E):
                    count += 1

            return count

        if isHorizontal():
            # check move jump size with countHorizontal...
            step = countHorizontal()
            num_min = min(play_start, play_end)
            num_max = max(play_start, play_end)

            nxturn = self.turn * -1
            for i in range(step):
                num_min += 1
                piece = self.board[num_min]
                if piece == nxturn:
                    return False
                
            return True

        if isVertical():
            step = countVertical()
            num_min = min(play_start, play_end)
            num_max = max(play_start, play_end)

            nxturn = self.turn * -1
            for i in range(step):
                num_min += self.size
                piece = self.board[num_min]
                if piece == nxturn:
                    return False
                
            return True

        if isDiagonal1():
            step = countDiagonal1()
            num_min = min(play_start, play_end)
            num_max = max(play_start, play_end)

            nxturn = self.turn * -1
            for i in range(step):
                num_min += self.size + 1
                piece = self.board[num_min]
                if piece == nxturn:
                    return False
                
            return True

        if isDiagonal2():
            step = countDiagonal2()
            num_min = min(play_start, play_end)
            num_max = max(play_start, play_end)

            nxturn = self.turn * -1
            for i in range(step):
                num_min += self.size - 1
                piece = self.board[num_min]
                if piece == nxturn:
                    return False
                
            return True

        return False

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

        self.round += 1
        self.turn *= -1



# def my_b(size):
#     return [1]
# 
# a = {
#     'size': 1,
#     'turn': Loa.W,
#     'make': my_b
#     }
# 
# l = Loa() #options=a)
# ll = l.play(0, 0)
# print(l)
# print(ll)

l = Loa()
print(l)
ll = l.play(1, 7)
print(ll)
ll = ll.play(54, 0)
print(ll)
ll = ll.play(7, 0)
print(ll)
lll = ll.play(1, 7)
print(lll)
print(lll == l)
