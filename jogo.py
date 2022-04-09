# X - black; O - white

start_piece = 'B'
tabuleiro = [ ['.' for y in range(8)] for x in range(8)]
for x in range(1, 7):
    tabuleiro[0][x] = 'B'
    tabuleiro[7][x] = 'B'
    tabuleiro[x][0] = 'W'
    tabuleiro[x][7] = 'W'

for linha in tabuleiro:
    print(" ".join(linha))

def moves(tabuleiro, piece):
    pass
