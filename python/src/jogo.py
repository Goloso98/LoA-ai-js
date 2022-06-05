import numpy as np
from collections import deque
# from copy import copy

class Loa():
    # boards are square

    B = -1
    E = 0
    W = 1

    def make_board(self, size):
        def pos(x, y):
            return (y * size) + x
        board = np.zeros(size * size, dtype = int)
        for i in range(1, size-1):
            board[pos(i, 0     )] = self.B   #top
            board[pos(i, size-1)] = self.B   #bot
            board[pos(0     , i)] = self.W   #left
            board[pos(size-1, i)] = self.W   #right

        return board

    def __init__(self, options=None):
        defaults = {
            'size': 8,
            'turn': self.B,
            'single': False,
            'board': self.make_board(8) # np.array
            }
        options = options or defaults

        self.size = options['size']
        self.bsize = self.size * self.size
        self.turn = options['turn']
        self.single = options['single']
        self.board = options['board']
        self.round = 0
        # status:
        self.status = [0, 0]
        # 0 - running
        # 1 - one wins; check 2nd pos
        # 2 - draw

        # compute lists
        # lists with sets inside
        #    sets -> repetitive positions wont appear twice,
        #             and lookup position will be faster
        self.Horizontal_list = []
        self.Vertical_list = []
        self.Diagonal1_list = []
        self.Diagonal2_list = []
        self._lists()
        # also check win here to fill blanks
        # on small board, may start on win state
        self.set_win()
        pass

    def __copy__(self):
        clone = Loa.__new__(Loa)
        clone.size = self.size
        clone.bsize = self.bsize
        clone.turn = self.turn
        clone.single = self.single
        clone.status = self.status
        clone.round = self.round
        clone.board = np.copy(self.board)

        # this wont change between plays, cuz board size is the same
        clone.Horizontal_list = self.Horizontal_list 
        clone.Vertical_list = self.Vertical_list
        clone.Diagonal1_list = self.Diagonal1_list 
        clone.Diagonal2_list = self.Diagonal2_list 
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
        if x < 0 or x >= self.size or y < 0 or y >= self.size:
            return -1
        return (self.size * y) + x

    def _pos_expand(self, pos):
        return (pos % self.size, pos // self.size)

    def _pos_math(self, pos, i, j):
        # return -1 if not valid
        x, y = self._pos_expand(pos)
        x += i
        y += j

        # if x < 0 or x >= self.bsize or y < 0 or y >= self.bsize:
        #     return -1
        return self._pos(x, y)

    def _lists(self):
        # self.Horizontal_list
        H = []
        for y in range(self.size):
            s = set()
            for x in range(self.size):
                pos = self._pos(x, y)
                s.add(pos)
            H.append(s)
        self.Horizontal_list = H

        # self.Vertical_list
        V = []
        for x in range(self.size):
            s = set()
            for y in range(self.size):
                pos = self._pos(x, y)
                s.add(pos)
            V.append(s)
        self.Vertical_list = V

        # self.Diagonal1_list
        D1 = []
        # left numbers first
        for start_pos in range(0, self.bsize, self.size):
            s = set()
            for i in range(self.size):
                pos = self._pos_math(start_pos, i, i)
                if pos < 0:
                    break
                s.add(pos)
            D1.append(s)

        # then first row
        for start_pos in range(1, self.size):
            s = set()
            for i in range(self.size):
                pos = self._pos_math(start_pos, i, i)
                if pos < 0:
                    break
                s.add(pos)
            D1.append(s)
        self.Diagonal1_list = D1

        # self.Diagonal2_list
        D2 = []
        # first top row / not last pos, done later
        for start_pos in range(self.size -1):
            s = set()
            for i in range(self.size):
                pos = self._pos_math(start_pos, -i, i)
                if pos < 0:
                    break
                s.add(pos)
            D2.append(s)

        # then right collumn
        for start_pos in range(self.size -1, self.bsize, self.size):
            s = set()
            for i in range(self.size):
                pos = self._pos_math(start_pos, -i, i)
                if pos < 0:
                    break
                s.add(pos)
            D2.append(s)
        self.Diagonal2_list = D2

        # print
        # print("H ", self.Horizontal_list)
        # print("V ", self.Vertical_list)
        # print("D1", self.Diagonal1_list)
        # print("D2", self.Diagonal2_list)
        pass

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
        buff += str(self.status[0])
        buff += ", "
        buff += self._pieces(self.status[1])
        buff += "\n__________________"
        return buff
    
    def isValid(self, play_start, play_end):
        H_  = list(filter(lambda x: play_start in x, self.Horizontal_list))[0]
        V_  = list(filter(lambda x: play_start in x, self.Vertical_list))[0]
        D1_ = list(filter(lambda x: play_start in x, self.Diagonal1_list))[0]
        D2_ = list(filter(lambda x: play_start in x, self.Diagonal2_list))[0]

        def isHorizontal():
            # assume start, verify end
            return play_end in H_

        def isVertical():
            return play_end in V_

        def isDiagonal1(): # \
            return play_end in D1_

        def isDiagonal2(): # /
            return play_end in D2_

        def _count(the_list):
            l = list(map(lambda pos: self.board[pos], the_list))
            count = len(the_list) - l.count(self.E)
            return count

        def countVertical():
            count = _count(V_)
            return count

        def countDiagonal1():
            count = _count(D1_)
            return count

        def countDiagonal2():
            count = _count(D2_)
            return count

        def isLine(array):
            # 1 -> goes rights in list; -1 -> goes left
            step = 1 if play_start < play_end else -1
            l = list(array)
            l.sort()
            # with pos array sorted, slice the between part from it
            p1 = l.index(play_start)
            p2 = l.index(play_end)
            l_slice = l[p1 + step : p2 : step]
            # get the actual pieces values
            pieces_list = list(map(lambda pos: self.board[pos], l_slice))
            otherTurn = self.turn * -1
            # check if just other turn pieces
            if pieces_list.count(otherTurn) > 0:
                return False
            # check movement quantity with pieces in that line
            this_size = len(l_slice) + 1
            must_size = _count(array)
            return this_size == must_size


        if play_start < 0 or play_end < 0 or play_start >= self.bsize or play_end >= self.bsize: # bounds
            return False
        if self.status[0] != 0: # then game ended
            return False
        if self.board[play_start] != self.turn: # not your piece
            return False
        if self.board[play_end] == self.turn: # will not eat own piece
            return False

        if isHorizontal():
            return isLine(H_)

        if isVertical():
            return isLine(V_)

        if isDiagonal1():
            return isLine(D1_)

        if isDiagonal2():
            return isLine(D2_)

        return False

    def blob(self, turn):
        def add_neigh():
            for i in [-1, 0, 1]:
                for j in [-1, 0, 1]:
                    newpos = self._pos_math(cur, i, j)
                    if newpos not in visited and newpos >= 0 and newpos < self.bsize and self.board[newpos] == turn:
                        stack.append(newpos)

        i = 0
        while i < self.bsize and self.board[i] != turn:
            i += 1
        if i == self.bsize:
            return 0
        visited = set()
        stack = deque()
        stack.append(i)

        while len(stack) > 0:
            cur = stack.pop()
            visited.add(cur)
            add_neigh()
        return len(visited)

    def set_win(self):
        # also check for no more valid moves
        counts = {
            self.W: 0,
            self.B: 0,
            self.E: 0
            }
        for i in range(self.bsize):
            counts[self.board[i]] += 1

        if self.single:
            turn = self.turn
            count = counts[turn]
            blob = self.blob(turn)
            if count == blob:
                self.status[0] = 1
                self.status[1] = self.turn
            return

        Wblob = self.blob(self.W) 
        Bblob = self.blob(self.B) 

        W = Wblob == counts[self.W]
        B = Bblob == counts[self.B]


        if W and B:
            self.status[0] = 1
            self.status[1] = self.turn
        else:
            if W:
                self.status[0] = 1
                self.status[1] = self.W
            if B:
                self.status[0] = 1
                self.status[1] = self.B


        # print(Wblob, Bblob)
        # if W:
        #     if B:
        #         #check if equal or greater blob size
        #         if Wblob > Bblob:
        #             #W wins
        #             self.status[0] += 1
        #             self.status[1]  = self.W
        #         elif Bblob > Wblob:
        #             #B wins
        #             self.status[0] += 1
        #             self.status[1]  = self.B
        #         else:
        #             #draw
        #             self.status[0] = 2
        #     else:
        #         #W wins
        #         self.status[0] += 1
        #         self.status[1]  = self.W
        # else:
        #     if B:
        #         #B wins
        #         self.status[0] += 1
        #         self.status[1]  = self.B


    def play(self, play_start, play_end):
        my = self.__copy__()
        if not self.isValid(play_start, play_end):
            # also check if no moves left
            return my
        # if valide move
        my._play(play_start, play_end)
        return my

    def _play(self, play_start, play_end):
        #just play
        self.board[play_start] = self.E
        self.board[play_end] = self.turn

        self.round += 1
        if not self.single:
            self.turn *= -1

        #compute win state
        self.set_win()


if __name__ == "__main__":
    l = Loa()
    print(l)
    ll = l.play(1, 7)
    print(ll)
    ll = l.play(3, 19)
    print(ll)
    ll = l.play(1, 19)
    print(ll)
    ll = l.play(5, 19)
    print(ll)

