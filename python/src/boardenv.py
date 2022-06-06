import gym
from gym import spaces
import numpy as np
from jogo import Loa

class BoardEnv(gym.Env):
    board = [ Loa.E, Loa.E, Loa.E, Loa.E,
            Loa.B, Loa.E, Loa.E, Loa.B,
            Loa.B, Loa.E, Loa.E, Loa.B,
            Loa.E, Loa.E, Loa.E, Loa.E ]
    board = np.array(board, dtype = int)
            
    options = {
            "size": 4,
            "turn": Loa.B,
            "single": True,
            "board": board }

    def __init__(self):
        self.size = BoardEnv.options["size"]
        super(BoardEnv, self).__init__()
        self.action_space = spaces.Discrete(self.size * 4)
        self.observation_space = spaces.Box(low = -1, high = 1, shape = (self.size * self.size,), dtype = np.int64)
        # self.Loa = Loa(options = BoardEnv.options)

    def reset(self):
        self.Loa = Loa(options = BoardEnv.options)
        return self.Loa.board

    def step(self, action):
        # action = piece(in array/board order) * move(up, right, down, left)
        piece = action // 4 # 4 possible moves
        moves = ["up", "right", "down", "left"]
        move = moves[action % 4]
        print(self.Loa)

        self.Loa = self.Loa.play_relative(piece, move)
        win = self.Loa.status[0] != 0 # TODO : verify status[1]

        board = self.Loa.board
        reward = -1
        done = win
        info = {}

        if win:
            reward = 420

        # TODO : new reward system
        # each time the blob size increases
        # with a global max 


        # done = self.Loa.status[0] != 0
        # return board, reward, done, info
        return board, reward, done, info

