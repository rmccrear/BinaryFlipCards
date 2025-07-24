// Game state
var gameState = {
    cards: { 8: false, 4: false, 2: false, 1: false },
    targetNumber: 1,
    lastTargetNumber: null
};

// DOM elements
var targetDisplay = document.getElementById('target-number');
var totalDisplay = document.getElementById('total-display');
var newTargetBtn = document.getElementById('new-target-btn');
var resetCardsBtn = document.getElementById('reset-cards-btn');
var feedback = document.getElementById('feedback');
var successModal = document.getElementById('success-modal');
var continueBtn = document.getElementById('continue-btn');
var miniCardsContainer = document.getElementById('mini-cards');
var explanationDiv = document.getElementById('explanation');

// Initialize dot patterns
function createDotPattern(value, containerId) {
    var container = document.getElementById(containerId);
    var i, dot, row1, row2, row3, grid1, grid2, dot1, dot2;
    
    container.innerHTML = '';
    
    switch (value) {
        case 8:
            // 3-2-3 pattern
            row1 = document.createElement('div');
            row1.className = 'dot-row';
            for (i = 0; i < 3; i++) {
                dot = document.createElement('div');
                dot.className = 'dot';
                row1.appendChild(dot);
            }
            
            row2 = document.createElement('div');
            row2.className = 'dot-row';
            for (i = 0; i < 2; i++) {
                dot = document.createElement('div');
                dot.className = 'dot';
                row2.appendChild(dot);
            }
            
            row3 = document.createElement('div');
            row3.className = 'dot-row';
            for (i = 0; i < 3; i++) {
                dot = document.createElement('div');
                dot.className = 'dot';
                row3.appendChild(dot);
            }
            
            container.appendChild(row1);
            container.appendChild(row2);
            container.appendChild(row3);
            break;
            
        case 4:
            // 2x2 grid
            grid1 = document.createElement('div');
            grid1.className = 'dot-row';
            grid2 = document.createElement('div');
            grid2.className = 'dot-row';
            
            for (i = 0; i < 2; i++) {
                dot1 = document.createElement('div');
                dot1.className = 'dot';
                grid1.appendChild(dot1);
                
                dot2 = document.createElement('div');
                dot2.className = 'dot';
                grid2.appendChild(dot2);
            }
            
            container.appendChild(grid1);
            container.appendChild(grid2);
            break;
            
        case 2:
            // Vertical column
            for (i = 0; i < 2; i++) {
                dot = document.createElement('div');
                dot.className = 'dot';
                container.appendChild(dot);
            }
            break;
            
        case 1:
            // Single dot
            dot = document.createElement('div');
            dot.className = 'dot';
            container.appendChild(dot);
            break;
    }
}

// Create mini dot pattern for success modal
function createMiniDotPattern(value) {
    var container = document.createElement('div');
    var i, dot, row1, row2, row3, grid1, grid2, dot1, dot2;
    
    container.className = 'mini-dot-pattern';
    
    switch (value) {
        case 8:
            // 3-2-3 pattern
            row1 = document.createElement('div');
            row1.className = 'mini-dot-row';
            for (i = 0; i < 3; i++) {
                dot = document.createElement('div');
                dot.className = 'mini-dot';
                row1.appendChild(dot);
            }
            
            row2 = document.createElement('div');
            row2.className = 'mini-dot-row';
            for (i = 0; i < 2; i++) {
                dot = document.createElement('div');
                dot.className = 'mini-dot';
                row2.appendChild(dot);
            }
            
            row3 = document.createElement('div');
            row3.className = 'mini-dot-row';
            for (i = 0; i < 3; i++) {
                dot = document.createElement('div');
                dot.className = 'mini-dot';
                row3.appendChild(dot);
            }
            
            container.appendChild(row1);
            container.appendChild(row2);
            container.appendChild(row3);
            break;
            
        case 4:
            // 2x2 grid
            grid1 = document.createElement('div');
            grid1.className = 'mini-dot-row';
            grid2 = document.createElement('div');
            grid2.className = 'mini-dot-row';
            
            for (i = 0; i < 2; i++) {
                dot1 = document.createElement('div');
                dot1.className = 'mini-dot';
                grid1.appendChild(dot1);
                
                dot2 = document.createElement('div');
                dot2.className = 'mini-dot';
                grid2.appendChild(dot2);
            }
            
            container.appendChild(grid1);
            container.appendChild(grid2);
            break;
            
        case 2:
            // Vertical column
            for (i = 0; i < 2; i++) {
                dot = document.createElement('div');
                dot.className = 'mini-dot';
                container.appendChild(dot);
            }
            break;
            
        case 1:
            // Single dot
            dot = document.createElement('div');
            dot.className = 'mini-dot';
            container.appendChild(dot);
            break;
    }
    
    return container;
}

// Calculate total
function calculateTotal() {
    var total = 0;
    var value;
    for (value in gameState.cards) {
        if (gameState.cards[value]) {
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
    var newTarget;
    
    // Keep generating until we get a different number than the last one
    do {
        newTarget = Math.floor(Math.random() * 15) + 1;
    } while (newTarget === gameState.lastTargetNumber);
    
    gameState.lastTargetNumber = gameState.targetNumber;
    gameState.targetNumber = newTarget;
    targetDisplay.textContent = newTarget;
    hideFeedback();
}

// Reset all cards to face down
function resetCards() {
    var value, card;
    for (value in gameState.cards) {
        gameState.cards[value] = false;
        card = document.querySelector('.binary-card[data-value="' + value + '"]');
        card.classList.add('face-down');
    }
    updateTotalDisplay();
    hideFeedback();
}

// Flip card
function flipCard(value) {
    var card;
    gameState.cards[value] = !gameState.cards[value];
    card = document.querySelector('.binary-card[data-value="' + value + '"]');
    
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
    feedback.className = 'feedback ' + type;
    feedback.classList.remove('hidden');
}

// Hide feedback
function hideFeedback() {
    feedback.classList.add('hidden');
}

// Check win condition
function checkWinCondition() {
    var total = calculateTotal();
    
    if (total === gameState.targetNumber) {
        showSuccessModal();
        hideFeedback();
    } else if (total > gameState.targetNumber) {
        showFeedback("Too high", "error");
    } else if (total > 0) {
        showFeedback("Too low", "warning");
    } else {
        hideFeedback();
    }
}

// Show success modal
function showSuccessModal() {
    var values = [8, 4, 2, 1];
    var i, value, miniCard, label, content;
    var activeCards = [];
    var explanation = '';
    var mathExpression, binaryRepresentation;
    
    // Create mini cards visualization
    miniCardsContainer.innerHTML = '';
    
    for (i = 0; i < values.length; i++) {
        value = values[i];
        miniCard = document.createElement('div');
        miniCard.className = 'mini-card ' + (gameState.cards[value] ? 'face-up' : 'face-down');
        
        label = document.createElement('div');
        label.className = 'mini-card-label';
        label.textContent = value;
        
        content = document.createElement('div');
        content.className = 'mini-card-content';
        
        if (gameState.cards[value]) {
            content.appendChild(createMiniDotPattern(value));
        }
        
        miniCard.appendChild(label);
        miniCard.appendChild(content);
        miniCardsContainer.appendChild(miniCard);
    }
    
    // Create explanation
    for (value in gameState.cards) {
        if (gameState.cards[value]) {
            activeCards.push(parseInt(value));
        }
    }
    activeCards.sort(function(a, b) { return b - a; });
    
    if (activeCards.length === 0) {
        explanation = "No cards are face up, so the total is 0.";
    } else {
        mathExpression = activeCards.join(" + ") + " = " + calculateTotal();
        binaryRepresentation = '';
        for (i = 0; i < values.length; i++) {
            binaryRepresentation += gameState.cards[values[i]] ? "1" : "0";
        }
        
        explanation = mathExpression + "\nBinary representation: " + binaryRepresentation;
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
    var cards, i, card, value;
    
    // Create dot patterns
    createDotPattern(8, 'dots-8');
    createDotPattern(4, 'dots-4');
    createDotPattern(2, 'dots-2');
    createDotPattern(1, 'dots-1');
    
    // Set initial state
    resetCards();
    generateNewTarget();
    
    // Add event listeners
    cards = document.querySelectorAll('.binary-card');
    for (i = 0; i < cards.length; i++) {
        card = cards[i];
        value = parseInt(card.getAttribute('data-value'));
        card.addEventListener('click', function(val) {
            return function() {
                flipCard(val);
            };
        }(value));
    }
    
    newTargetBtn.addEventListener('click', generateNewTarget);
    resetCardsBtn.addEventListener('click', resetCards);
    continueBtn.addEventListener('click', hideSuccessModal);
    
    // Close modal when clicking outside
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            hideSuccessModal();
        }
    });
}

// Start the game when page loads
document.addEventListener('DOMContentLoaded', initGame);