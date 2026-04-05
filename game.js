// Anagram Race Game Logic
class AnagramGame {
    constructor() {
        this.currentRound = 1;
        this.totalRounds = 15;
        this.timePerRound = 60; // seconds
        this.currentTime = this.timePerRound;
        this.totalScore = 0;
        this.currentRoundScore = 0;
        this.currentLetters = [];
        this.foundWords = [];
        this.roundResults = [];
        this.isGameRunning = false;
        this.timerInterval = null;
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
        document.getElementById('playAgainBtn').addEventListener('click', () => this.resetGame());
        document.getElementById('viewHighScoresBtn').addEventListener('click', () => this.showHighScores());
        document.getElementById('backBtn').addEventListener('click', () => this.goToResults());
        document.getElementById('wordInput').addEventListener('keypress', (e) => this.handleWordInput(e));
    }

    startGame() {
        this.isGameRunning = true;
        this.totalScore = 0;
        this.currentRound = 1;
        this.roundResults = [];
        this.showScreen('gameScreen');
        this.startRound();
    }

    startRound() {
        this.currentRoundScore = 0;
        this.foundWords = [];
        this.currentTime = this.timePerRound;
        this.currentLetters = this.generateLetterSet();
        this.displayLetters();
        this.updateDisplay();
        
        clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => this.updateTimer(), 1000);
        
        document.getElementById('wordInput').focus();
        document.getElementById('wordInput').value = '';
    }

    generateLetterSet() {
        // Letter set with varied difficulty
        const letterSets = [
            'AEIOUSTR', // Easy vowel-heavy
            'STONEFLARE', // Medium
            'SCRAPTONE', // Medium
            'TRAMPOLES', // Medium-hard
            'STRANGLE', // Medium-hard
            'SPRINTED', // Medium-hard
            'ADOPTERS', // Hard
            'TRANSPOSE', // Hard
            'PERSONATE', // Hard
            'PREDATORS', // Hard
            'SLAPSTONE', // Hard
            'DEFROSTS', // Hard
            'DROPLETS', // Medium
            'SPROCKET', // Medium-hard
            'POSTERED', // Medium-hard
        ];
        
        let letterSet = letterSets[this.currentRound - 1] || letterSets[0];
        // Shuffle the letters
        return letterSet.split('').sort(() => Math.random() - 0.5).join('');
    }

    displayLetters() {
        const letterDisplay = document.getElementById('letterDisplay');
        letterDisplay.innerHTML = '';
        
        this.currentLetters.split('').forEach(letter => {
            const letterDiv = document.createElement('div');
            letterDiv.className = 'letter';
            letterDiv.textContent = letter;
            letterDisplay.appendChild(letterDiv);
        });
    }

    handleWordInput(e) {
        if (e.key !== 'Enter') return;
        
        const input = document.getElementById('wordInput');
        const word = input.value.trim().toUpperCase();
        input.value = '';
        
        if (!word) return;
        
        // Validate word
        const validation = this.validateWord(word);
        this.displayFeedback(validation);
        
        if (validation.valid) {
            this.foundWords.push(word);
            const points = word.length;
            this.currentRoundScore += points;
            this.totalScore += points;
            this.addWordToList(word, points, true);
            this.updateDisplay();
        }
        
        input.focus();
    }

    validateWord(word) {
        // Check length
        if (word.length < 3) {
            return { valid: false, message: 'Word must be at least 3 letters!' };
        }
        
        // Check if word is in dictionary
        if (!isValidWord(word)) {
            return { valid: false, message: 'Not a valid word!' };
        }
        
        // Check if already found in this round
        if (this.foundWords.includes(word)) {
            return { valid: false, message: 'Already found this word!' };
        }
        
        // Check if all letters are available
        const availableLetters = this.currentLetters.split('');
        const wordLetters = word.split('');
        
        for (let letter of wordLetters) {
            const index = availableLetters.indexOf(letter);
            if (index === -1) {
                return { valid: false, message: 'Not all letters available!' };
            }
            availableLetters.splice(index, 1);
        }
        
        return { valid: true, message: `${word} (${word.length} pts)!` };
    }

    displayFeedback(validation) {
        const feedback = document.getElementById('feedback');
        feedback.textContent = validation.message;
        feedback.className = 'feedback show ' + (validation.valid ? 'valid' : 'invalid');
        
        setTimeout(() => {
            feedback.classList.remove('show');
        }, 2000);
    }

    addWordToList(word, points, isValid) {
        const wordsList = document.getElementById('wordsList');
        const wordTag = document.createElement('div');
        wordTag.className = 'word-tag valid';
        wordTag.innerHTML = `
            <span>${word}</span>
            <span class="word-points">${points}</span>
        `;
        wordsList.appendChild(wordTag);
    }

    updateTimer() {
        this.currentTime--;
        this.updateDisplay();
        
        if (this.currentTime <= 0) {
            this.endRound();
        }
    }

    updateDisplay() {
        document.getElementById('currentScore').textContent = this.totalScore;
        document.getElementById('roundNumber').textContent = `${this.currentRound}/15`;
        document.getElementById('timer').textContent = this.currentTime;
        document.getElementById('wordsCount').textContent = this.foundWords.length;
        
        // Add warning color to timer when low
        const timer = document.getElementById('timer');
        if (this.currentTime <= 10) {
            timer.parentElement.classList.add('warning');
        } else {
            timer.parentElement.classList.remove('warning');
        }
    }

    endRound() {
        clearInterval(this.timerInterval);
        
        // Save round results
        this.roundResults.push({
            round: this.currentRound,
            letters: this.currentLetters,
            words: [...this.foundWords],
            score: this.currentRoundScore,
            wordCount: this.foundWords.length
        });
        
        if (this.currentRound < this.totalRounds) {
            this.currentRound++;
            setTimeout(() => this.startRound(), 1500);
        } else {
            setTimeout(() => this.endGame(), 1500);
        }
    }

    endGame() {
        this.isGameRunning = false;
        this.saveHighScore();
        this.showResults();
    }

    showResults() {
        const totalWords = this.roundResults.reduce((sum, r) => sum + r.wordCount, 0);
        const bestRound = Math.max(...this.roundResults.map(r => r.score));
        const avgWords = (totalWords / this.totalRounds).toFixed(2);
        const totalPointsValue = this.roundResults.reduce((sum, r) => {
            return sum + r.words.reduce((wordSum, w) => wordSum + w.length, 0);
        }, 0);
        
        document.getElementById('finalScore').textContent = this.totalScore;
        document.getElementById('statWords').textContent = totalWords;
        document.getElementById('statBestRound').textContent = bestRound;
        document.getElementById('statAvgWords').textContent = avgWords;
        document.getElementById('statPointsValue').textContent = totalPointsValue;
        
        // Create round breakdown
        const breakdown = document.getElementById('roundBreakdown');
        breakdown.innerHTML = '';
        
        this.roundResults.forEach(result => {
            const item = document.createElement('div');
            item.className = 'breakdown-item';
            item.innerHTML = `
                <div>
                    <div class="breakdown-round">Round ${result.round}: ${result.letters}</div>
                </div>
                <div class="breakdown-stats">
                    ${result.wordCount} words • ${result.score} pts
                </div>
            `;
            breakdown.appendChild(item);
        });
        
        this.showScreen('resultsScreen');
    }

    saveHighScore() {
        let scores = JSON.parse(localStorage.getItem('anagramScores') || '[]');
        scores.push({
            score: this.totalScore,
            words: this.roundResults.reduce((sum, r) => sum + r.wordCount, 0),
            date: new Date().toLocaleString(),
            timestamp: Date.now()
        });
        
        // Keep only top 20 scores
        scores.sort((a, b) => b.score - a.score);
        scores = scores.slice(0, 20);
        
        localStorage.setItem('anagramScores', JSON.stringify(scores));
    }

    showHighScores() {
        const scores = JSON.parse(localStorage.getItem('anagramScores') || '[]');
        const scoresList = document.getElementById('scoresList');
        scoresList.innerHTML = '';
        
        if (scores.length === 0) {
            scoresList.innerHTML = '<div class="no-scores">No high scores yet. Play a game!</div>';
        } else {
            scores.forEach((score, index) => {
                const entry = document.createElement('div');
                entry.className = 'score-entry';
                entry.innerHTML = `
                    <div class="score-rank">${index + 1}</div>
                    <div class="score-info">
                        <div>${score.score} points</div>
                        <div class="score-date">${score.words} words • ${score.date}</div>
                    </div>
                    <div class="score-value">${score.score}</div>
                `;
                scoresList.appendChild(entry);
            });
        }
        
        this.showScreen('scoresScreen');
    }

    goToResults() {
        this.showScreen('resultsScreen');
    }

    resetGame() {
        this.startGame();
    }

    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        document.getElementById(screenId).classList.add('active');
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new AnagramGame();
    window.anagramGame = game; // Expose to window for debugging
});
