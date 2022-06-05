from stable_baselines3.common.env_checker import check_env
from boardenv import BoardEnv

env = BoardEnv()
check_env(env)
