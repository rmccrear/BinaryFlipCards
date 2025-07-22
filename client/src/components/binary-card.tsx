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
        <div className="grid grid-cols-3 gap-1 h-full items-center justify-items-center p-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-3 h-3 bg-gray-800 rounded-full"></div>
          ))}
        </div>
      );
    case 4:
      return (
        <div className="grid grid-cols-2 gap-2 h-full items-center justify-items-center p-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-3 h-3 bg-gray-800 rounded-full"></div>
          ))}
        </div>
      );
    case 2:
      return (
        <div className="flex flex-col gap-4 h-full items-center justify-center p-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="w-3 h-3 bg-gray-800 rounded-full"></div>
          ))}
        </div>
      );
    case 1:
      return (
        <div className="flex items-center justify-center h-full">
          <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
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
        className="relative w-24 h-32 cursor-pointer perspective-1000"
        onClick={onFlip}
      >
        <div 
          className={cn(
            "w-full h-full relative transition-transform duration-300 transform-style-preserve-3d",
            isFlipped && "rotate-y-180"
          )}
        >
          {/* Front Face (Face Down - Blank) */}
          <div className="absolute inset-0 backface-hidden bg-gray-200 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors">
            <span className="text-gray-500 text-xs font-semibold">Face Down</span>
          </div>
          
          {/* Back Face (Face Up - With Dots) */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white border-2 border-blue-600 rounded-lg">
            {getDotPattern(value)}
          </div>
        </div>
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        Status: <span className="font-medium">{isFlipped ? 'Face Up' : 'Face Down'}</span>
      </p>
    </div>
  );
}
