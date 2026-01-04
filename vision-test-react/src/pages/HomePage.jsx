import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedBackground />

      <div className="text-center space-y-8 max-w-3xl relative z-10">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-cyan-500/10 flex items-center justify-center animate-eye-blink">
            <Eye className="w-10 h-10 text-cyan-500 stroke-[2.5]" />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          <span className="text-slate-900">See Clearly. </span>
          <span className="text-cyan-500">Live Brightly.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Welcome to Visuar, your first step towards better vision. Start a
          quick, intuitive test or manage your profile.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link to="/test-selection">
            <Button
              size="lg"
              className="text-lg h-14 px-10 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Start Vision Test
            </Button>
          </Link>
          <Link to="/login">
            <Button
              size="lg"
              variant="outline"
              className="text-lg h-14 px-10 bg-white/80 backdrop-blur-sm border-2 border-cyan-500/20 text-cyan-600 hover:bg-white hover:border-cyan-500/40 rounded-full transition-all"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
