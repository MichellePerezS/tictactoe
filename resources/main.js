document.addEventListener('DOMContentLoaded', () => {
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let difficultyLevel = 'easy';

    const cells = document.querySelectorAll('.fixed');
    const message = document.getElementById('message');
    const optionDlg = document.getElementById('option_dlg');
    const difficultyRadios = document.getElementsByName('Difficulty');

    const cellclick = (cellIndex) => {
        if (!gameActive) return;

        if (board[cellIndex] === '') {
            board[cellIndex] = currentPlayer;
            cells[cellIndex].innerText = currentPlayer;

            if (checkWinner()) {
                message.innerText = `¡${currentPlayer} ganó!`;
                gameActive = false;
            } else if (board.every(cell => cell !== '')) {
                message.innerText = '¡Empate!';
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                message.innerText = `Turno de ${currentPlayer}`;

                if (currentPlayer === 'O') {
                    makeComputerMove();
                }
            }
        }
    };

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
            [0, 4, 8], [2, 4, 6]              // Diagonales
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }

        return false;
    };

    const makeComputerMoveEasy = () => {
        const availableMoves = board.reduce((acc, cell, index) => {
            if (cell === '') acc.push(index);
            return acc;
        }, []);

        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        const move = availableMoves[randomIndex];
        board[move] = 'O';
        cells[move].innerText = 'O';
    };

    const makeComputerMoveHard = () => {
        // Implementar el algoritmo minimax aquí (puede requerir más código)
        // Para simplificar, puedes usar el siguiente método:
        makeComputerMoveEasy();
    };

    const makeComputerMove = () => {
        if (difficultyLevel === 'easy') {
            makeComputerMoveEasy();
        } else {
            makeComputerMoveHard();
        }
    };

    document.getElementById('startButton').addEventListener('click', initializeGame);

    document.getElementById('confirm_btn').addEventListener('click', () => {
        const selectedRadio = Array.from(difficultyRadios).find(radio => radio.checked);
        difficultyLevel = selectedRadio ? selectedRadio.value : 'easy';
        optionDlg.style.display = 'none';
        initializeGame();
    });

    const initializeGame = () => {
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        difficultyLevel = 'easy';

        cells.forEach(cell => cell.innerText = '');
        message.innerText = `Turno de ${currentPlayer}`;
    };

    initializeGame();
});