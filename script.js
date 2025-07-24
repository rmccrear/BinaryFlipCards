// Game state
let gameState = {
    cards: { 8: false, 4: false, 2: false, 1: false },
    targetNumber: 1
};

// DOM elements
const targetDisplay = document.getElementById('target-number');
const totalDisplay = document.getElementById('total-display');
const newTargetBtn = document.getElementById('new-target-btn');
const resetCardsBtn = document.getElementById('reset-cards-btn');
const feedback = document.getElementById('feedback');
const successModal = document.getElementById('success-modal');
const continueBtn = document.getElementById('continue-btn');
const miniCardsContainer = document.getElementById('mini-cards');
const explanationDiv = document.getElementById('explanation');

// Initialize dot patterns
function createDotPattern(value, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    switch (value) {
        case 8:
            // 3-2-3 pattern
            const row1 = document.createElement('div');
            row1.className = 'dot-row';
            for (let i = 0; i < 3; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot';
                row1.appendChild(dot);
            }
            
            const row2 = document.createElement('div');
            row2.className = 'dot-row';
            for (let i = 0; i < 2; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot';
                row2.appendChild(dot);
            }
            
            const row3 = document.createElement('div');
            row3.className = 'dot-row';
            for (let i = 0; i < 3; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot';
                row3.appendChild(dot);
            }
            
            container.appendChild(row1);
            container.appendChild(row2);
            container.appendChild(row3);
            break;
            
        case 4:
            // 2x2 grid
            const grid1 = document.createElement('div');
            grid1.className = 'dot-row';
            const grid2 = document.createElement('div');
            grid2.className = 'dot-row';
            
            for (let i = 0; i < 2; i++) {
                const dot1 = document.createElement('div');
                dot1.className = 'dot';
                grid1.appendChild(dot1);
                
                const dot2 = document.createElement('div');
                dot2.className = 'dot';
                grid2.appendChild(dot2);
            }
            
            container.appendChild(grid1);
            container.appendChild(grid2);
            break;
            
        case 2:
            // Vertical column
            for (let i = 0; i < 2; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot';
                container.appendChild(dot);
            }
            break;
            
        case 1:
            // Single dot
            const dot = document.createElement('div');
            dot.className = 'dot';
            container.appendChild(dot);
            break;
    }
}

// Create mini dot pattern for success modal
function createMiniDotPattern(value) {
    const container = document.createElement('div');
    container.className = 'mini-dot-pattern';
    
    switch (value) {
        case 8:
            // 3-2-3 pattern
            const row1 = document.createElement('div');
            row1.className = 'mini-dot-row';
            for (let i = 0; i < 3; i++) {
                const dot = document.createElement('div');
                dot.className = 'mini-dot';
                row1.appendChild(dot);
            }
            
            const row2 = document.createElement('div');
            row2.className = 'mini-dot-row';
            for (let i = 0; i < 2; i++) {
                const dot = document.createElement('div');
                dot.className = 'mini-dot';
                row2.appendChild(dot);
            }
            
            const row3 = document.createElement('div');
            row3.className = 'mini-dot-row';
            for (let i = 0; i < 3; i++) {
                const dot = document.createElement('div');
                dot.className = 'mini-dot';
                row3.appendChild(dot);
            }
            
            container.appendChild(row1);
            container.appendChild(row2);
            container.appendChild(row3);
            break;
            
        case 4:
            // 2x2 grid
            const grid1 = document.createElement('div');
            grid1.className = 'mini-dot-row';
            const grid2 = document.createElement('div');
            grid2.className = 'mini-dot-row';
            
            for (let i = 0; i < 2; i++) {
                const dot1 = document.createElement('div');
                dot1.className = 'mini-dot';
                grid1.appendChild(dot1);
                
                const dot2 = document.createElement('div');
                dot2.className = 'mini-dot';
                grid2.appendChild(dot2);
            }
            
            container.appendChild(grid1);
            container.appendChild(grid2);
            break;
            
        case 2:
            // Vertical column
            for (let i = 0; i < 2; i++) {
                const dot = document.createElement('div');
                dot.className = 'mini-dot';
                container.appendChild(dot);
            }
            break;
            
        case 1:
            // Single dot
            const dot = document.createElement('div');
            dot.className = 'mini-dot';
            container.appendChild(dot);
            break;
    }
    
    return container;
}

// Calculate total
function calculateTotal() {
    let total = 0;
    for (const [value, isUp] of Object.entries(gameState.cards)) {
        if (isUp) {
            total += parseInt(value);
        }
    }
    return total;
}

// Update total display
function updateTotalDisplay() {
    totalDisplay.textContent = calculateTotal();
}

// Generate new target (1-15, covering all possible binary combinations)
function generateNewTarget() {
    const newTarget = Math.floor(Math.random() * 15) + 1;
    gameState.targetNumber = newTarget;
    targetDisplay.textContent = newTarget;
    hideFeedback();
}

// Reset all cards to face down
function resetCards() {
    for (const value in gameState.cards) {
        gameState.cards[value] = false;
        const card = document.querySelector(`.binary-card[data-value="${value}"]`);
        card.classList.add('face-down');
    }
    updateTotalDisplay();
    hideFeedback();
}

// Flip card
function flipCard(value) {
    gameState.cards[value] = !gameState.cards[value];
    const card = document.querySelector(`.binary-card[data-value="${value}"]`);
    
    if (gameState.cards[value]) {
        card.classList.remove('face-down');
    } else {
        card.classList.add('face-down');
    }
    
    updateTotalDisplay();
    checkWinCondition();
}

// Show feedback
function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = `feedback ${type}`;
    feedback.classList.remove('hidden');
}

// Hide feedback
function hideFeedback() {
    feedback.classList.add('hidden');
}

// Check win condition
function checkWinCondition() {
    const total = calculateTotal();
    
    if (total === gameState.targetNumber) {
        showSuccessModal();
        hideFeedback();
    } else if (total > gameState.targetNumber) {
        showFeedback("Too high! Try flipping some cards face down.", "error");
    } else if (total > 0) {
        showFeedback("Too low! Try flipping more cards face up.", "warning");
    } else {
        hideFeedback();
    }
}

// Show success modal
function showSuccessModal() {
    // Create mini cards visualization
    miniCardsContainer.innerHTML = '';
    
    [8, 4, 2, 1].forEach(value => {
        const miniCard = document.createElement('div');
        miniCard.className = `mini-card ${gameState.cards[value] ? 'face-up' : 'face-down'}`;
        
        const label = document.createElement('div');
        label.className = 'mini-card-label';
        label.textContent = value;
        
        const content = document.createElement('div');
        content.className = 'mini-card-content';
        
        if (gameState.cards[value]) {
            content.appendChild(createMiniDotPattern(value));
        }
        
        miniCard.appendChild(label);
        miniCard.appendChild(content);
        miniCardsContainer.appendChild(miniCard);
    });
    
    // Create explanation
    const activeCards = Object.entries(gameState.cards)
        .filter(([_, isUp]) => isUp)
        .map(([value, _]) => parseInt(value))
        .sort((a, b) => b - a);
    
    let explanation = '';
    if (activeCards.length === 0) {
        explanation = "No cards are face up, so the total is 0.";
    } else {
        const mathExpression = activeCards.join(" + ") + " = " + calculateTotal();
        const binaryRepresentation = [8, 4, 2, 1]
            .map(value => gameState.cards[value] ? "1" : "0")
            .join("");
        
        explanation = `${mathExpression}\nBinary representation: ${binaryRepresentation}`;
    }
    
    explanationDiv.textContent = explanation;
    successModal.classList.remove('hidden');
}

// Hide success modal
function hideSuccessModal() {
    successModal.classList.add('hidden');
    resetCards();
    generateNewTarget();
}

// Initialize the game
function initGame() {
    // Create dot patterns
    createDotPattern(8, 'dots-8');
    createDotPattern(4, 'dots-4');
    createDotPattern(2, 'dots-2');
    createDotPattern(1, 'dots-1');
    
    // Set initial state
    resetCards();
    generateNewTarget();
    
    // Add event listeners
    document.querySelectorAll('.binary-card').forEach(card => {
        card.addEventListener('click', () => {
            const value = parseInt(card.dataset.value);
            flipCard(value);
        });
    });
    
    newTargetBtn.addEventListener('click', generateNewTarget);
    resetCardsBtn.addEventListener('click', resetCards);
    continueBtn.addEventListener('click', hideSuccessModal);
    
    // Close modal when clicking outside
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            hideSuccessModal();
        }
    });
}

// Start the game when page loads
document.addEventListener('DOMContentLoaded', initGame);