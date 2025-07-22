import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export default function LearningInfo() {
  return (
    <Card>
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
          <Lightbulb className="w-6 h-6 text-orange-500" />
          How Binary Numbers Work
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-3">Understanding Place Values</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <span className="font-mono font-bold text-blue-600">2³ = 8</span>
                <span className="text-gray-700">Leftmost card represents 8</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <span className="font-mono font-bold text-blue-600">2² = 4</span>
                <span className="text-gray-700">Second card represents 4</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <span className="font-mono font-bold text-blue-600">2¹ = 2</span>
                <span className="text-gray-700">Third card represents 2</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <span className="font-mono font-bold text-blue-600">2⁰ = 1</span>
                <span className="text-gray-700">Rightmost card represents 1</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-green-600 mb-3">Examples</h3>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-semibold text-green-600 mb-1">Number 7:</div>
                <div className="text-sm text-gray-700">8(0) + 4(1) + 2(1) + 1(1) = 0 + 4 + 2 + 1 = 7</div>
                <div className="font-mono text-sm mt-1">Binary: 0111</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-semibold text-green-600 mb-1">Number 10:</div>
                <div className="text-sm text-gray-700">8(1) + 4(0) + 2(1) + 1(0) = 8 + 0 + 2 + 0 = 10</div>
                <div className="font-mono text-sm mt-1">Binary: 1010</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-semibold text-green-600 mb-1">Number 15:</div>
                <div className="text-sm text-gray-700">8(1) + 4(1) + 2(1) + 1(1) = 8 + 4 + 2 + 1 = 15</div>
                <div className="font-mono text-sm mt-1">Binary: 1111</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
