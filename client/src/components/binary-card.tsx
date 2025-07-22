import { cn } from "@/lib/utils";

interface BinaryCardProps {
  value: number;
  isFlipped: boolean;
  onFlip: () => void;
}

const getDotPattern = (value: number) => {
  switch (value) {
    case 8:
      return (
        <div className="flex flex-col h-full justify-center items-center gap-1 sm:gap-2 p-1 sm:p-2">
          {/* Top row - 3 dots */}
          <div className="flex gap-1 sm:gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-gray-800 rounded-full"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-gray-800 rounded-full"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-gray-800 rounded-full"></div>
          </div>
          {/* Middle row - 2 dots */}
          <div className="flex gap-1 sm:gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-gray-800 rounded-full"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-gray-800 rounded-full"></div>
          </div>
          {/* Bottom row - 3 dots */}
          <div className="flex gap-1 sm:gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-gray-800 rounded-full"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-gray-800 rounded-full"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-gray-800 rounded-full"></div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="grid grid-cols-2 gap-1 sm:gap-2 h-full items-center justify-items-center p-1 sm:p-2 md:p-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-gray-800 rounded-full"></div>
          ))}
        </div>
      );
    case 2:
      return (
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 h-full items-center justify-center p-2 sm:p-3 md:p-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-gray-800 rounded-full"></div>
          ))}
        </div>
      );
    case 1:
      return (
        <div className="flex items-center justify-center h-full">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-gray-800 rounded-full"></div>
        </div>
      );
    default:
      return null;
  }
};

const getPowerNotation = (value: number) => {
  switch (value) {
    case 8: return '2³';
    case 4: return '2²';
    case 2: return '2¹';
    case 1: return '2⁰';
    default: return '';
  }
};

export default function BinaryCard({ value, isFlipped, onFlip }: BinaryCardProps) {
  return (
    <div className="text-center">
      <p className="text-sm font-semibold text-gray-600 mb-2">
        {value} dots ({getPowerNotation(value)})
      </p>
      
      <div 
        className="w-16 h-20 sm:w-20 sm:h-28 md:w-24 md:h-32 cursor-pointer transition-all duration-300"
        onClick={onFlip}
      >
        {isFlipped ? (
          /* Face Up - With Dots */
          <div className="w-full h-full bg-white border-2 border-blue-600 rounded-lg hover:border-blue-700 transition-colors">
            {getDotPattern(value)}
          </div>
        ) : (
          /* Face Down - Dark/Blank */
          <div className="w-full h-full bg-gray-500 border-2 border-gray-600 rounded-lg hover:bg-gray-600 transition-colors">
          </div>
        )}
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        Status: <span className="font-medium">{isFlipped ? 'Face Up' : 'Face Down'}</span>
      </p>
    </div>
  );
}
