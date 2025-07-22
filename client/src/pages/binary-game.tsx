import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calculator, Lightbulb, RefreshCw, RotateCcw, CheckCircle, ArrowDown, ArrowUp, Trophy } from "lucide-react";
import BinaryCard from "@/components/binary-card";
import GameControls from "@/components/game-controls";
import LearningInfo from "@/components/learning-info";

interface GameState {
  cards: Record<number, boolean>;
  targetNumber: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  score: number;
}

const difficultyRanges = {
  beginner: { min: 0, max: 15, cards: [8, 4, 2, 1] },
  intermediate: { min: 0, max: 31, cards: [16, 8, 4, 2, 1] },
  advanced: { min: 0, max: 63, cards: [32, 16, 8, 4, 2, 1] }
};

export default function BinaryGame() {
  const [gameState, setGameState] = useState<GameState>({
    cards: { 8: false, 4: false, 2: false, 1: false },
    targetNumber: 7,
    difficulty: 'beginner',
    score: 0
  });

  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | 'warning' | ''>("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const calculateTotal = (): number => {
    let total = 0;
    for (const [value, isUp] of Object.entries(gameState.cards)) {
      if (isUp) {
        total += parseInt(value);
      }
    }
    return total;
  };

  const generateNewTarget = (): void => {
    const range = difficultyRanges[gameState.difficulty];
    const newTarget = Math.floor(Math.random() * (range.max + 1));
    setGameState(prev => ({ ...prev, targetNumber: newTarget }));
    setShowFeedback(false);
  };

  const resetCards = (): void => {
    setGameState(prev => ({
      ...prev,
      cards: Object.keys(prev.cards).reduce((acc, key) => {
        acc[parseInt(key)] = false;
        return acc;
      }, {} as Record<number, boolean>)
    }));
    setShowFeedback(false);
  };

  const flipCard = (value: number): void => {
    setGameState(prev => ({
      ...prev,
      cards: { ...prev.cards, [value]: !prev.cards[value] }
    }));
  };

  const checkWinCondition = (): void => {
    const total = calculateTotal();
    
    if (total === gameState.targetNumber) {
      setShowSuccessDialog(true);
      setShowFeedback(false);
    } else if (total > gameState.targetNumber) {
      setFeedbackMessage("Too high! Try flipping some cards face down.");
      setFeedbackType("error");
      setShowFeedback(true);
    } else if (total > 0) {
      setFeedbackMessage("Too low! Try flipping more cards face up.");
      setFeedbackType("warning");
      setShowFeedback(true);
    } else {
      setShowFeedback(false);
    }
  };

  const handleSuccessDialogClose = (): void => {
    setShowSuccessDialog(false);
    generateNewTarget();
  };

  const getBinaryExplanation = (): string => {
    const activeCards = Object.entries(gameState.cards)
      .filter(([_, isUp]) => isUp)
      .map(([value, _]) => parseInt(value))
      .sort((a, b) => b - a);
    
    if (activeCards.length === 0) return "No cards are face up, so the total is 0.";
    
    const explanation = activeCards.join(" + ") + " = " + calculateTotal();
    const binaryRepresentation = [8, 4, 2, 1]
      .map(value => gameState.cards[value] ? "1" : "0")
      .join("");
    
    return `${explanation}\nBinary representation: ${binaryRepresentation}`;
  };

  useEffect(() => {
    checkWinCondition();
  }, [gameState.cards, gameState.targetNumber]);

  useEffect(() => {
    generateNewTarget();
  }, [gameState.difficulty]);

  const currentTotal = calculateTotal();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-4 flex items-center justify-center gap-3">
            <Calculator className="w-10 h-10" />
            Binary Number Cards
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Click the cards to flip them face up or face down. Create the target number using binary representation!
          </p>
        </div>

        {/* Binary Cards Section */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Binary Cards</h2>
              <p className="text-gray-600">Click each card to flip it face up (showing dots) or face down (blank)</p>
            </div>

            {/* Cards Container */}
            <div className="flex justify-center items-center gap-2 sm:gap-4 md:gap-6 overflow-x-auto px-2">
              {/* Total Display Card */}
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-600 mb-2">Total</p>
                <div className="w-16 h-20 sm:w-20 sm:h-28 md:w-24 md:h-32 bg-white border-2 border-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">{currentTotal}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Current Value</p>
              </div>

              {/* Binary Cards */}
              {[8, 4, 2, 1].map((value) => (
                <BinaryCard
                  key={value}
                  value={value}
                  isFlipped={gameState.cards[value]}
                  onFlip={() => flipCard(value)}
                />
              ))}
            </div>

            {/* Target Number Status */}
            <div className="mt-6 text-center">
              <div className="text-lg font-semibold text-gray-700">
                Target Number: <span className="text-orange-600">{gameState.targetNumber}</span>
                {currentTotal !== gameState.targetNumber && currentTotal > 0 && (
                  <span className={`ml-2 text-sm ${currentTotal > gameState.targetNumber ? 'text-red-500' : 'text-orange-500'}`}>
                    ({currentTotal > gameState.targetNumber ? 'too high' : 'too low'})
                  </span>
                )}
              </div>
            </div>

            {/* Binary Representation Display */}
            <div className="mt-6 text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Binary Representation</h3>
              <div className="flex justify-center gap-4 flex-wrap">
                {[8, 4, 2, 1].map((value) => (
                  <div key={value} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{value}s place:</span>
                    <span 
                      className={`font-mono text-xl font-bold px-3 py-1 rounded transition-colors ${
                        gameState.cards[value] 
                          ? 'text-white bg-blue-600' 
                          : 'text-gray-400 bg-gray-100'
                      }`}
                    >
                      {gameState.cards[value] ? '1' : '0'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Controls */}
        <GameControls
          difficulty={gameState.difficulty}
          targetNumber={gameState.targetNumber}
          currentTotal={currentTotal}
          feedbackMessage={feedbackMessage}
          feedbackType={feedbackType}
          showFeedback={showFeedback}
          onDifficultyChange={(difficulty) => setGameState(prev => ({ ...prev, difficulty }))}
          onNewTarget={generateNewTarget}
          onReset={resetCards}
        />

        {/* Learning Section */}
        <LearningInfo />
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <Trophy className="w-6 h-6" />
              Correct!
            </DialogTitle>
            <DialogDescription className="text-base">
              You successfully made the target number {gameState.targetNumber}!
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Explanation:</h4>
            <p className="text-green-700 whitespace-pre-line">{getBinaryExplanation()}</p>
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button onClick={handleSuccessDialogClose} className="bg-green-600 hover:bg-green-700">
              Continue to Next Challenge
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
