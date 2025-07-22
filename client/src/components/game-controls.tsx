import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, RotateCcw, CheckCircle, ArrowDown, ArrowUp } from "lucide-react";

interface GameControlsProps {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetNumber: number;
  currentTotal: number;
  feedbackMessage: string;
  feedbackType: 'success' | 'error' | 'warning' | '';
  showFeedback: boolean;
  onDifficultyChange: (difficulty: 'beginner' | 'intermediate' | 'advanced') => void;
  onNewTarget: () => void;
  onReset: () => void;
}

export default function GameControls({
  difficulty,
  targetNumber,
  currentTotal,
  feedbackMessage,
  feedbackType,
  showFeedback,
  onDifficultyChange,
  onNewTarget,
  onReset
}: GameControlsProps) {
  const getFeedbackIcon = () => {
    switch (feedbackType) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error': return <ArrowDown className="w-5 h-5 text-red-500" />;
      case 'warning': return <ArrowUp className="w-5 h-5 text-orange-500" />;
      default: return null;
    }
  };

  const getFeedbackClasses = () => {
    switch (feedbackType) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return '';
    }
  };

  const getTotalClasses = () => {
    if (currentTotal === targetNumber) {
      return 'text-white bg-green-600 border-green-400 animate-pulse';
    } else if (currentTotal > targetNumber) {
      return 'text-white bg-red-500 border-red-400';
    } else if (currentTotal > 0) {
      return 'text-white bg-orange-500 border-orange-400';
    }
    return 'text-blue-600 bg-blue-50 border-blue-200';
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Difficulty Selector */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-gray-700">Difficulty:</label>
            <Select value={difficulty} onValueChange={onDifficultyChange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner (0-15)</SelectItem>
                <SelectItem value="intermediate">Intermediate (0-31)</SelectItem>
                <SelectItem value="advanced">Advanced (0-63)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Target Number Display */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700 mb-1">Target Number</p>
              <div className="text-3xl font-bold text-orange-600 bg-orange-50 px-4 py-2 rounded-lg border-2 border-orange-200">
                {targetNumber}
              </div>
            </div>
            
            {/* Current Total */}
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700 mb-1">Your Total</p>
              <div className={`text-3xl font-bold px-4 py-2 rounded-lg border-2 transition-all duration-300 ${getTotalClasses()}`}>
                {currentTotal}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            <Button onClick={onNewTarget} className="bg-green-600 hover:bg-green-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              New Target
            </Button>
            <Button onClick={onReset} variant="secondary" className="bg-gray-600 hover:bg-gray-700 text-white">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Cards
            </Button>
          </div>
        </div>

        {/* Feedback Message */}
        {showFeedback && (
          <div className={`mt-4 text-center text-lg font-semibold py-3 px-6 rounded-lg border flex items-center justify-center gap-2 ${getFeedbackClasses()}`}>
            {getFeedbackIcon()}
            {feedbackMessage}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
