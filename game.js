// Game state
let targetBird = null;
let guesses = [];
let maxGuesses = 6;
let gameOver = false;
let practiceMode = false;
// Make functions globally accessible
window.submitGuess = submitGuess;
window.toggleBirdList = toggleBirdList;
window.showStats = showStats;
window.showHelp = showHelp;
window.closeModal = closeModal;
window.toggleMode = toggleMode;
window.showTypesGuide = showTypesGuide;
window.closeWinPopup = closeWinPopup;
window.showAnswer = showAnswer;
window.startNewPracticeGame = startNewPracticeGame;
function showTypesGuide() {
   const modal = document.getElementById('modal');
   const modalBody = document.getElementById('modal-body');
   const guide = window.BIRD_TYPE_GUIDE || {};
   let html = '<h2>🪶 Bird Types Guide</h2><div class="help-content">';
   Object.values(guide).forEach(t => {
       html += `<div style="margin-bottom:18px;padding:12px;background:#f9f9f9;border-radius:8px;border-left:4px solid #667eea;">
           <h3 style="margin-top:0;">${t.name}</h3>
           <p style="margin-bottom:8px;">${t.description}</p>
           <p style="font-size:.85em;"><strong>Traits:</strong> ${t.traits.join(' · ')}</p>
       </div>`;
   });
   html += '</div>';
   modalBody.innerHTML = html;
   modal.classList.remove('hidden');
}
window.onload = function() {
   initGame();
   loadGameState();
   setupAutocomplete();
   populateBirdList();
   updateBirdCount();
   document.getElementById('guess-input').addEventListener('keypress', function(e) {
       if (e.key === 'Enter') submitGuess();
   });
};
function initGame() {
   const savedMode = localStorage.getItem('birdlePracticeMode');
   if (savedMode === 'true') {
       practiceMode = true;
       updateModeButton();
   }
   if (practiceMode) {
       const randomIndex = Math.floor(Math.random() * BIRD_DATABASE.length);
       targetBird = BIRD_DATABASE[randomIndex];
   } else {
       targetBird = getDailyBird();
   }
   console.log('Target bird (for testing):', targetBird.name);
   renderBoard();
   initBirdPreview();
}
function toggleMode() {
   practiceMode = !practiceMode;
   localStorage.setItem('birdlePracticeMode', practiceMode);
   guesses = [];
   gameOver = false;
   if (practiceMode) {
       const randomIndex = Math.floor(Math.random() * BIRD_DATABASE.length);
       targetBird = BIRD_DATABASE[randomIndex];
       showMessage('Practice Mode: Play as many times as you want!', 'info');
   } else {
       targetBird = getDailyBird();
       loadGameState();
       showMessage('Daily Mode: One puzzle per day!', 'info');
   }
   updateModeButton();
   renderBoard();
   updateGuessCount();
   initBirdPreview();
}
function updateModeButton() {
   const btn = document.getElementById('mode-btn');
   if (practiceMode) {
       btn.textContent = 'Switch to Daily Mode';
       btn.classList.add('practice');
   } else {
       btn.textContent = 'Switch to Practice Mode';
       btn.classList.remove('practice');
   }
}
function submitGuess() {
   if (gameOver) {
       showMessage('Game is over! Come back tomorrow for a new bird.', 'info');
       return;
   }
   const input = document.getElementById('guess-input');
   const guessName = input.value.trim();
   if (!guessName) { showMessage('Please enter a bird name!', 'error'); return; }
   const guessBird = findBirdByName(guessName);
   if (!guessBird) { showMessage('That bird is not in our database!', 'error'); return; }
   if (guesses.some(g => g.name.toLowerCase() === guessName.toLowerCase())) {
       showMessage('You already guessed that bird!', 'error');
       return;
   }
   guesses.push(guessBird);
   input.value = '';
   renderBoard();
   updateGuessCount();
   saveGameState();
   updateBirdPreviewBlur();
   if (guessBird.name === targetBird.name) {
       gameOver = true;
       showWinPopup(targetBird.name);
       const previewImg = document.getElementById('bird-preview-img');
       if (previewImg) { previewImg.style.transition = 'filter 0.8s ease'; previewImg.style.filter = 'blur(0px)'; }
       updateStats(true, guesses.length);
   } else if (guesses.length >= maxGuesses) {
       gameOver = true;
       if (practiceMode) {
           showMessage(`Oh no, the bird actually was: ${targetBird.name}.`, 'error');
       } else {
           showMessage(`Oh no, the target bird was: ${targetBird.name}`, 'error');
       }
       updateStats(false, guesses.length);
   } else {
       const correctCategories = countCorrectCategories(guessBird);
       showMessage(`${correctCategories}/5 categories correct. Try again!`, 'info');
   }
}
const BLUR_LEVELS = { 0: 20, 1: 15, 2: 9, 3: 6, 4: 3, 5: 0 };
async function initBirdPreview() {
   const container = document.getElementById('bird-preview-container');
   const img = document.getElementById('bird-preview-img');
   const placeholder = document.getElementById('bird-preview-placeholder');
   if (!container) return;
   img.style.display = 'none';
   placeholder.style.display = 'none';
   img.style.filter = `blur(${BLUR_LEVELS[0]}px)`;
   const imageUrl = await fetchBirdImage(targetBird.name);
   if (imageUrl) {
       img.onload = () => updateBirdPreviewBlur();
       img.src = imageUrl;
       img.style.display = 'block';
       placeholder.style.display = 'none';
   } else {
       placeholder.style.display = 'flex';
   }
}
function updateBirdPreviewBlur() {
   const img = document.getElementById('bird-preview-img');
   if (!img) return;
   const bestMatch = guesses.reduce((best, g) => Math.max(best, countCorrectCategories(g)), 0);
   const blurPx = BLUR_LEVELS[bestMatch] ?? 20;
   img.style.transition = 'filter 0.6s ease';
   img.style.filter = `blur(${blurPx}px)`;
}
const BIRD_WIKI_TITLES = {
    'Ostrich':           'Common ostrich',
    'Emu':               'Emu',
    'Kiwi':              'Kiwi (bird)',
    'Penguin':           'Little penguin',
    'Emperor Penguin':   'Emperor penguin',
    'Dodo':              'Dodo',
    'Albatross':         'Wandering albatross',
    'Petrel':            'Northern fulmar',
    'Gannet':            'Northern gannet',
    'Frigatebird':       'Magnificent frigatebird',
    'Gull':              'European herring gull',
    'Seagull':           'Laughing gull',
    'Puffin':            'Atlantic puffin',
    'Loon':              'Common loon',
    'Pelican':           'American white pelican',
    'Swan':              'Mute swan',
    'Goose':             'Canada goose',
    'Mallard':           'Mallard',
    'Wood Duck':         'Wood duck',
    'Eider':             'Common eider',
    'Pintail':           'Northern pintail',
    'Nene':              'Nene (bird)',
    'Crane':             'Common crane',
    'Stork':             'White stork',
    'Ibis':              'Scarlet ibis',
    'Spoonbill':         'Roseate spoonbill',
    'Flamingo':          'Greater flamingo',
    'Shoebill':          'Shoebill',
    'Heron':             'Grey heron',
    'Stilt':             'Black-winged stilt',
    'Plover':            'Golden plover',
    'Lapwing':           'Northern lapwing',
    'Sandpiper':         'Common sandpiper',
    'Phalarope':         'Red-necked phalarope',
    'Cinnamon Bittern':  'Cinnamon bittern',
    'Condor':            'Andean condor',
    'Vulture':           'Griffon vulture',
    'Eagle':             'Golden eagle',
    'Bald Eagle':        'Bald eagle',
    'Hawk':              'Red-tailed hawk',
    'Falcon':            'Peregrine falcon',
    'Harrier':           'Hen harrier',
    'Owl':               'Barn owl',
    'Turkey':            'Wild turkey',
    'Chicken':           'Chicken',
    'Quail':             'Common quail',
    'Peafowl':           'Indian peafowl',
    'Capercaillie':      'Western capercaillie',
    'Tragopan':          'Satyr tragopan',
    'Bustard':           'Great bustard',
    'Parrot':            'African grey parrot',
    'Macaw':             'Scarlet macaw',
    'Parakeet':          'Budgerigar',
    'Kakapo':            'Kakapo',
    'Hummingbird':       'Ruby-throated hummingbird',
    'Kingfisher':        'Common kingfisher',
    'Cuckoo':            'Common cuckoo',
    'Roadrunner':        'Greater roadrunner',
    'Hornbill':          'Southern yellow-billed hornbill',
    'Toucan':            'Toco toucan',
    'Woodpecker':        'Great spotted woodpecker',
    'Hoopoe':            'Eurasian hoopoe',
    'Sparrow':           'House sparrow',
    'Finch':             'Zebra finch',
    'Snowfinch':         'White-rumped snowfinch',
    'Crow':              'Carrion crow',
    'Magpie':            'Eurasian magpie',
    'Raven':             'Common raven',
    'Robin':             'European robin',
    'Nightingale':       'Common nightingale',
    'Warbler':           'Garden warbler',
    'Blue Jay':          'Blue jay',
    'Great Tit':         'Great tit',
    'Canary':            'Atlantic canary',
    'Mockingbird':       'Northern mockingbird',
    'Starling':          'Common starling',
    'Pigeon':            'Rock dove',
    'Dove':              'Mourning dove',
    'Cock-of-the-rock':  'Andean cock-of-the-rock',
};
async function fetchBirdImage(birdName) {
   try {
       const wikiTitle = BIRD_WIKI_TITLES[birdName] || birdName;
       const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiTitle)}&prop=pageimages&format=json&pithumbsize=600&origin=*`;
       const res = await fetch(searchUrl);
       if (!res.ok) return null;
       const data = await res.json();
       const pages = data.query.pages;
       const page = Object.values(pages)[0];
       return page.thumbnail ? page.thumbnail.source : null;
   } catch {
       return null;
   }
}
async function showWinPopup(birdName) {
   const popup = document.getElementById('win-popup');
   const img = document.getElementById('win-bird-img');
   const nameEl = document.getElementById('win-bird-name');
   const guessEl = document.getElementById('win-guess-count');
   nameEl.textContent = birdName;
   guessEl.textContent = `Guessed in ${guesses.length} / ${maxGuesses}`;
   img.style.display = 'none';
   popup.classList.remove('hidden');
   const imageUrl = await fetchBirdImage(birdName);
   if (imageUrl) {
       img.src = imageUrl;
       img.style.display = 'block';
   }
}
function closeWinPopup() {
   document.getElementById('win-popup').classList.add('hidden');
}
function startNewPracticeGame() {
   guesses = [];
   gameOver = false;
   const randomIndex = Math.floor(Math.random() * BIRD_DATABASE.length);
   targetBird = BIRD_DATABASE[randomIndex];
   renderBoard();
   updateGuessCount();
   showMessage('New practice game started!', 'info');
   initBirdPreview();
}
function countCorrectCategories(guessBird) {
   let count = 0;
   if (guessBird.type === targetBird.type) count++;
   if (guessBird.color === targetBird.color) count++;
   if (guessBird.size === targetBird.size) count++;
   if (guessBird.habitat === targetBird.habitat) count++;
   if (guessBird.diet === targetBird.diet) count++;
   return count;
}
function renderBoard() {
   const board = document.getElementById('game-board');
   const header = board.querySelector('.category-headers');
   board.innerHTML = '';
   if (header) board.appendChild(header);
   guesses.forEach(guessBird => board.appendChild(createGuessRow(guessBird)));
   const remainingRows = maxGuesses - guesses.length;
   for (let i = 0; i < remainingRows; i++) board.appendChild(createEmptyRow());
}
function createGuessRow(guessBird) {
   const row = document.createElement('div');
   row.className = 'guess-row';
   const nameCell = document.createElement('div');
   nameCell.className = 'category-cell bird-name';
   nameCell.textContent = guessBird.name;
   row.appendChild(nameCell);
   row.appendChild(createCategoryCell(guessBird.type, guessBird.type === targetBird.type));
   row.appendChild(createCategoryCell(guessBird.color, guessBird.color === targetBird.color));
   row.appendChild(createCategoryCell(guessBird.size, guessBird.size === targetBird.size));
   row.appendChild(createCategoryCell(guessBird.habitat, guessBird.habitat === targetBird.habitat));
   row.appendChild(createCategoryCell(guessBird.diet, guessBird.diet === targetBird.diet));
   return row;
}
function createCategoryCell(value, isCorrect) {
   const cell = document.createElement('div');
   cell.className = 'category-cell';
   cell.textContent = value;
   cell.classList.add(isCorrect ? 'correct' : 'incorrect');
   return cell;
}
function createEmptyRow() {
   const row = document.createElement('div');
   row.className = 'guess-row empty-row';
   for (let i = 0; i < 6; i++) {
       const cell = document.createElement('div');
       cell.className = 'category-cell empty';
       row.appendChild(cell);
   }
   return row;
}
function updateGuessCount() {
   document.getElementById('guess-count').textContent = `${guesses.length}/${maxGuesses}`;
}
function updateBirdCount() {
   document.getElementById('bird-count').textContent = BIRD_DATABASE.length;
}
function showMessage(text, type) {
   const messageEl = document.getElementById('message');
   messageEl.textContent = text;
   messageEl.className = `message ${type}`;
   messageEl.style.display = 'block';
   setTimeout(() => { messageEl.style.display = 'none'; }, 4000);
}
function setupAutocomplete() {
   const input = document.getElementById('guess-input');
   const autocompleteList = document.getElementById('autocomplete-list');
   input.addEventListener('input', function() {
       const val = this.value.toLowerCase();
       autocompleteList.innerHTML = '';
       if (!val) return;
       const matches = getAllBirdNames().filter(name => name.toLowerCase().includes(val));
       matches.slice(0, 8).forEach(name => {
           const div = document.createElement('div');
           div.className = 'autocomplete-item';
           div.textContent = name;
           div.addEventListener('click', function() {
               input.value = name;
               autocompleteList.innerHTML = '';
           });
           autocompleteList.appendChild(div);
       });
   });
   document.addEventListener('click', function(e) {
       if (e.target !== input) autocompleteList.innerHTML = '';
   });
}
function populateBirdList() {
   const listEl = document.getElementById('bird-list');
   let html = '<h3>All Birds in Database</h3><table class="bird-table">';
   html += '<thead><tr><th>Name</th><th>Type</th><th>Color</th><th>Size</th><th>Habitat</th><th>Diet</th></tr></thead><tbody>';
   const sortedBirds = [...BIRD_DATABASE].sort((a, b) => a.name.localeCompare(b.name));
   sortedBirds.forEach(bird => {
       html += `<tr>
           <td><strong>${bird.name}</strong></td>
           <td>${bird.type}</td><td>${bird.color}</td>
           <td>${bird.size}</td><td>${bird.habitat}</td><td>${bird.diet}</td>
       </tr>`;
   });
   html += '</tbody></table>';
   listEl.innerHTML = html;
}
function toggleBirdList() {
   const listEl = document.getElementById('bird-list');
   const btnEl = document.getElementById('toggle-list-btn');
   if (listEl.classList.contains('hidden')) {
       listEl.classList.remove('hidden');
       btnEl.textContent = 'Hide All Birds';
   } else {
       listEl.classList.add('hidden');
       btnEl.textContent = 'Show All Birds';
   }
}
function showStats() {
   const stats = getStats();
   const modal = document.getElementById('modal');
   const modalBody = document.getElementById('modal-body');
   modalBody.innerHTML = `
       <h2>📊 Your Statistics</h2>
       <div class="stats-grid">
           <div class="stat-item"><div class="stat-value">${stats.played}</div><div class="stat-label">Played</div></div>
           <div class="stat-item"><div class="stat-value">${stats.wins}</div><div class="stat-label">Wins</div></div>
           <div class="stat-item"><div class="stat-value">${stats.played > 0 ? Math.round((stats.wins / stats.played) * 100) : 0}%</div><div class="stat-label">Win Rate</div></div>
           <div class="stat-item"><div class="stat-value">${stats.currentStreak}</div><div class="stat-label">Current Streak</div></div>
       </div>`;
   modal.classList.remove('hidden');
}
function showHelp() {
   const modal = document.getElementById('modal');
   const modalBody = document.getElementById('modal-body');
   modalBody.innerHTML = `
       <h2>❓ How to Play</h2>
       <div class="help-content">
           <p>Guess the daily bird in ${maxGuesses} tries by matching its characteristics!</p>
           <h3>Rules:</h3>
           <ul>
               <li>Each guess must be a valid bird from our database</li>
               <li>After each guess, you'll see which categories match:</li>
           </ul>
           <div class="examples">
               <div class="example-category"><div class="example-box correct"></div><span><strong>Green:</strong> This category matches the target bird</span></div>
               <div class="example-category"><div class="example-box incorrect"></div><span><strong>Red:</strong> This category does not match</span></div>
           </div>
           <h3>Categories:</h3>
           <ul>
               <li><strong>Type:</strong> ${getCategoryValues().types.join(', ')}</li>
               <li><strong>Color:</strong> ${getCategoryValues().colors.join(', ')}</li>
               <li><strong>Size:</strong> ${getCategoryValues().sizes.join(', ')}</li>
               <li><strong>Habitat:</strong> ${getCategoryValues().habitats.join(', ')}</li>
               <li><strong>Diet:</strong> ${getCategoryValues().diets.join(', ')}</li>
           </ul>
           <p><strong>A new bird is available each day!</strong></p>
       </div>`;
   modal.classList.remove('hidden');
}
function showAnswer() {
   const password = prompt('Enter password:');
   if (password === 'birdclub1') {
       alert(`Today's bird is: ${targetBird.name}`);
   } else {
       alert('Wrong password.');
   }
}
function closeModal() {
   document.getElementById('modal').classList.add('hidden');
}
function saveGameState() {
   if (practiceMode) return;
   const today = new Date().toISOString().split('T')[0];
   const gameState = { date: today, guesses, gameOver, targetBird };
   localStorage.setItem('birdleCategoryGameState', JSON.stringify(gameState));
}
function loadGameState() {
   if (practiceMode) return;
   const today = new Date().toISOString().split('T')[0];
   const saved = localStorage.getItem('birdleCategoryGameState');
   if (saved) {
       const gameState = JSON.parse(saved);
       if (gameState.date === today && gameState.targetBird.name === targetBird.name) {
           guesses = gameState.guesses;
           gameOver = gameState.gameOver;
           renderBoard();
           updateGuessCount();
           updateBirdPreviewBlur();
           if (gameOver) {
               if (guesses[guesses.length - 1].name === targetBird.name) {
                   showMessage(`You already won today! The bird was: ${targetBird.name}`, 'success');
               } else {
                   showMessage(`You already played today. The bird was: ${targetBird.name}`, 'info');
               }
           }
       }
   }
}
function getStats() {
   const saved = localStorage.getItem('birdleCategoryStats');
   if (saved) return JSON.parse(saved);
   return { played: 0, wins: 0, currentStreak: 0, maxStreak: 0 };
}
function updateStats(won, guessCount) {
   if (practiceMode) return;
   const stats = getStats();
   stats.played++;
   if (won) {
       stats.wins++;
       stats.currentStreak++;
       stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
   } else {
       stats.currentStreak = 0;
   }
   localStorage.setItem('birdleCategoryStats', JSON.stringify(stats));
}
window.onclick = function(event) {
   const modal = document.getElementById('modal');
   if (event.target === modal) closeModal();
   const winPopup = document.getElementById('win-popup');
   if (event.target === winPopup) closeWinPopup();
}
