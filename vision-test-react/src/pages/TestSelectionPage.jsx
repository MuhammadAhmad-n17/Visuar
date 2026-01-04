import { Link } from "react-router-dom";
import {
  Eye,
  Palette,
  Target,
  Activity,
  Gauge,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function TestSelectionPage() {
  const tests = [
    {
      id: "contrast",
      icon: Gauge,
      title: "Contrast Sensitivity",
      description:
        "Measure your ability to distinguish between subtle differences in shading and contrast.",
      duration: "3 min",
    },
    {
      id: "color",
      icon: Palette,
      title: "Color Differentiation",
      description:
        "Test color perception and identify potential color vision deficiencies.",
      duration: "4 min",
    },
    {
      id: "eye-tracking",
      icon: Eye,
      title: "Eye Tracking",
      description:
        "Analyze gaze stability, blink patterns, and focus accuracy using AI-powered analysis.",
      duration: "5 min",
    },
    {
      id: "depth",
      icon: Target,
      title: "Depth Perception",
      description:
        "Evaluate your ability to perceive three-dimensional space and distance.",
      duration: "3 min",
    },
    {
      id: "reaction",
      icon: Zap,
      title: "Reaction Time",
      description:
        "Measure visual processing speed and response time to stimuli.",
      duration: "2 min",
    },
    {
      id: "strain",
      icon: Activity,
      title: "Digital Eye Strain",
      description:
        "Detect signs of computer vision syndrome and screen-related fatigue.",
      duration: "4 min",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedBackground />

      <div className="w-full max-w-5xl relative z-10">
        {/* Back Button */}
        <Link to="/dashboard">
          <Button
            variant="ghost"
            className="mb-6 text-slate-700 hover:text-cyan-600 hover:bg-white/60"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Main Card Container */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/40 p-8 md:p-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Select Your Tests
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Choose individual tests or start the complete assessment for
              comprehensive vision analysis
            </p>
          </div>

          {/* Tests Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {tests.map((test) => {
              const Icon = test.icon;
              return (
                <Link
                  key={test.id}
                  to={`/test/${test.id}`}
                  className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200/50 hover:border-cyan-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
                      <Icon className="w-6 h-6 text-cyan-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                      {test.duration}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {test.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {test.description}
                  </p>
                </Link>
              );
            })}
          </div>

          {/* Complete Assessment Button */}
          <div className="text-center">
            <Link to="/test/complete">
              <Button
                size="lg"
                className="h-14 px-12 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Start Complete Assessment
              </Button>
            </Link>
            <p className="mt-4 text-sm text-slate-600">
              Complete all tests in one comprehensive session (~20 minutes)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
