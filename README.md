# 🏃 Anagram Race

A fast-paced, vocabulary-building web game where players race against the clock to form as many valid English words as possible from scrambled letters.

## 🎮 Game Features

- **15 Challenging Rounds** with different letter sets and varying difficulty
- **60-Second Timer** per round to create fast-paced gameplay
- **Word Validation** against a 5000+ word English dictionary
- **Real-time Feedback** with green highlights for valid words, red for invalid
- **Scoring System** - Each word worth points equal to its length (3-letter = 3pts, etc.)
- **No Duplicates** - Can't submit the same word twice in a round
- **Comprehensive Stats** including:
  - Final score
  - Total words found
  - Best round score
  - Average words per round
  - Round-by-round breakdown
- **High Score Tracking** - Save and view your top 20 scores (local storage)
- **Fully Responsive Design** - Works great on desktop, tablet, and mobile
- **Vanilla JavaScript** - No frameworks needed, pure HTML5/CSS3/JS

## 🚀 How to Play

1. **Start a Game** - Click "Start Game" on the home screen
2. **Read the Letters** - You'll see 7-8 scrambled letters
3. **Find Words** - Type valid English words using any of the available letters
4. **Score Points** - Each word earns points equal to its length
5. **Race the Clock** - You have 60 seconds per round
6. **Complete 15 Rounds** - The difficulty progressively increases
7. **View Your Stats** - See your score breakdown and save it to history

### Word Rules

- Minimum **3 letters** per word
- Words must be **valid English words** from the dictionary
- Each letter can only be used **once per word** (but multiple times if available)
- **No duplicate words** in the same round
- Letters don't need to be used in order

### Example Round

**Letters:** A, T, E, R, S, O, P

Valid words you could find:
- STAR (4 pts)
- RATS (4 pts)
- TRAP (4 pts)
- SPOT (4 pts)
- PEA (3 pts)
- EAR (3 pts)
- SEAT (4 pts)
- RATE (4 pts)

## 📊 Scoring

Points are awarded based on word length:
- 3-letter word = 3 points
- 4-letter word = 4 points
- 5-letter word = 5 points
- And so on...

Longer words = bigger rewards!

## 🎯 Letter Sets

The game includes 15 carefully curated letter sets with progressively challenging combinations:

1. **Easy Rounds (1-5)** - Vowel-rich, common letter combinations
2. **Medium Rounds (6-10)** - Balanced difficulty with diverse letter mixes
3. **Hard Rounds (11-15)** - Consonant-heavy, challenging combinations

## 💾 High Scores

Your scores are automatically saved to your browser's local storage. You can:
- View your personal high score history
- See your top 20 scores
- Track your improvement over time
- Share your achievements (manually)

## 🛠️ Technical Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Word Dictionary:** 5000+ common English words
- **Storage:** Browser LocalStorage for score history
- **Responsive:** Mobile-first design with breakpoints for tablets and desktops
- **No Dependencies:** Pure vanilla code, no frameworks or libraries

## 📁 Project Structure

```
anagram-race/
├── index.html          # Main HTML structure
├── styles.css          # Styling and responsive design
├── game.js             # Game logic and controls
├── words.js            # Word dictionary and validation
└── README.md           # This file
```

## 🌐 Deployment

The game is deployed to GitHub Pages and is fully playable online.

Play now: https://schlaufuchs26.github.io/anagram-race/

## 🎨 Design Features

- **Gradient background** with modern color scheme
- **Smooth animations** for words and feedback
- **Timer warning** effect when time is running out
- **Responsive layout** that adapts to all screen sizes
- **Accessibility-friendly** with clear typography and color contrast
- **Smooth transitions** between screens and rounds

## 🔍 How Word Validation Works

1. Checks if word is at least 3 letters
2. Looks up word in the embedded dictionary
3. Verifies all required letters are available in the letter set
4. Ensures word hasn't been found already in this round
5. Provides instant feedback on validity

## 📈 Tips for High Scores

- Focus on longer words (5+ letters) for more points
- Think of common prefixes and suffixes
- Look for word patterns within the letters
- Don't waste time on questionable words
- Quick fingers = more words = higher score!

## 🔄 Updates & Future Ideas

Potential enhancements:
- Leaderboard system with player accounts
- Daily challenges with fixed letter sets
- Difficulty selector (Easy/Normal/Hard)
- Word hints system
- Multiplayer competitive mode
- Custom letter sets
- Statistics and analytics dashboard

## 📝 License

This project is open source and available for personal and educational use.

## 🙏 Credits

Created with vanilla JavaScript as a fun vocabulary game to improve English language skills.

---

Enjoy the game and challenge your vocabulary skills! 🎮✨
