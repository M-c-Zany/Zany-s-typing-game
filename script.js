// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game-area');
    const textInput = document.getElementById('text-input');
    const scoreDisplay = document.getElementById('score');
    const mistakesDisplay = document.getElementById('mistakes');
    const startGameButton = document.getElementById('start-game');

    const words = ["apple", "banana", "cherry", "date", "fig", "grape", "kiwi", "lemon", "mango", "orange"];
    let score = 0;
    let mistakes = 0;
    let gameInterval;
    let bubbles = [];

    function startGame() {
        score = 0;
        mistakes = 0;
        updateDisplay();
        textInput.value = '';
        textInput.disabled = false;
        textInput.focus();
        clearInterval(gameInterval);
        gameInterval = setInterval(addBubble, 2000); // Add a bubble every 2 seconds
    }

    function endGame() {
        clearInterval(gameInterval);
        textInput.disabled = true;
        bubbles.forEach(bubble => gameArea.removeChild(bubble.element));
        bubbles = [];
    }

    function addBubble() {
        const word = words[Math.floor(Math.random() * words.length)];
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.textContent = word;
        bubble.style.left = `${Math.random() * 90}%`;
        gameArea.appendChild(bubble);

        const bubbleData = {
            element: bubble,
            word: word,
            timeout: setTimeout(() => {
                if (gameArea.contains(bubble)) {
                    gameArea.removeChild(bubble);
                    bubbles = bubbles.filter(b => b !== bubbleData);
                    mistakes++;
                    updateDisplay();
                }
            }, 10000) // Bubble disappears after 10 seconds
        };

        bubbles.push(bubbleData);
    }

    function updateDisplay() {
        scoreDisplay.textContent = score;
        mistakesDisplay.textContent = mistakes;
    }

    textInput.addEventListener('input', () => {
        const typedText = textInput.value.trim();
        const matchingBubbleIndex = bubbles.findIndex(b => b.word === typedText);
        if (matchingBubbleIndex !== -1) {
            const bubbleData = bubbles[matchingBubbleIndex];
            clearTimeout(bubbleData.timeout);
            gameArea.removeChild(bubbleData.element);
            bubbles.splice(matchingBubbleIndex, 1);
            score++;
            textInput.value = '';
            updateDisplay();
        }
    });

    startGameButton.addEventListener('click', startGame);

    // Start the game initially
    startGame();
});
