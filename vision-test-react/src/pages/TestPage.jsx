import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function TestPage() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [testStarted, setTestStarted] = useState(false);
  const [cameraPermission, setCameraPermission] = useState("idle");
  const [progress, setProgress] = useState(0);

  const testTitles = {
    contrast: "Contrast Sensitivity Test",
    color: "Color Differentiation Test",
    "eye-tracking": "Eye Tracking Analysis",
    depth: "Depth Perception Test",
    reaction: "Reaction Time Test",
    strain: "Digital Eye Strain Assessment",
    complete: "Complete Vision Assessment",
  };

  const requestCamera = async () => {
    setCameraPermission("requesting");
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraPermission("granted");
      setTimeout(() => {
        setTestStarted(true);
        simulateTest();
      }, 500);
    } catch (error) {
      setCameraPermission("denied");
    }
  };

  const simulateTest = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          navigate(`/results/${testId}`);
        }, 500);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedBackground />
      <div className="w-full max-w-4xl relative z-10">
        <Link to="/dashboard">
          <Button
            variant="ghost"
            className="mb-6 text-slate-700 hover:text-cyan-600 hover:bg-white/60"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/40 p-8 md:p-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {testTitles[testId] || "Vision Test"}
            </h1>
            <p className="text-slate-600 text-lg">
              Follow the instructions carefully for accurate results
            </p>
          </div>

          {!testStarted ? (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 rounded-full bg-cyan-100 flex items-center justify-center mx-auto">
                <Camera className="w-12 h-12 text-cyan-600" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  Camera Access Required
                </h2>
                <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
                  This test uses your webcam to analyze eye movement patterns.
                  Your privacy is protected - no video is stored.
                </p>
              </div>

              {cameraPermission === "denied" && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 max-w-md mx-auto">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p className="text-sm text-left">
                    Camera access was denied. Please enable camera permissions
                    in your browser settings.
                  </p>
                </div>
              )}

              {cameraPermission === "granted" && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 max-w-md mx-auto">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <p className="text-sm">
                    Camera access granted. Starting test...
                  </p>
                </div>
              )}

              <div className="pt-4">
                <Button
                  size="lg"
                  className="h-14 px-12 bg-cyan-500 hover:bg-cyan-600 text-white text-lg rounded-full shadow-lg"
                  onClick={requestCamera}
                  disabled={
                    cameraPermission === "requesting" ||
                    cameraPermission === "granted"
                  }
                >
                  {cameraPermission === "requesting" ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      Requesting Access...
                    </>
                  ) : (
                    <>
                      <Camera className="mr-2 w-5 h-5" />
                      Enable Camera & Start
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="aspect-video bg-slate-100 rounded-2xl flex items-center justify-center relative overflow-hidden border border-slate-200">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-blue-50 to-cyan-100 animate-pulse" />
                <div className="relative z-10 text-center">
                  <Camera className="w-16 h-16 text-cyan-600 mx-auto mb-4" />
                  <p className="text-lg font-medium text-slate-900">
                    Test in Progress...
                  </p>
                  <p className="text-sm text-slate-600">
                    Please maintain focus on the screen
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Progress</span>
                  <span className="font-medium text-slate-900">
                    {progress}%
                  </span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>

              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-200">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  Test Instructions
                </h3>
                <ul className="text-sm text-slate-600 space-y-2 leading-relaxed">
                  <li>• Sit approximately 50-70cm from your screen</li>
                  <li>• Ensure your face is well-lit and clearly visible</li>
                  <li>• Keep your head steady and follow on-screen prompts</li>
                  <li>• Avoid distractions during the test</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
