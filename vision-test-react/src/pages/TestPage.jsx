import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTheme } from "../context/ThemeContext";

export default function TestPage() {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
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
    <div
      className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300 ${
        isDarkMode
          ? "bg-[#0a0e27]"
          : "bg-gradient-to-br from-blue-50 via-cyan-50 to-white"
      }`}
    >
      <AnimatedBackground isDarkMode={isDarkMode} />

      {/* Language Selector */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSelector />
      </div>

      <div className="w-full max-w-4xl relative z-10">
        <Link to="/dashboard">
          <Button
            variant="ghost"
            className={`mb-6 transition-colors ${
              isDarkMode
                ? "text-slate-300 hover:text-white hover:bg-slate-800/50"
                : "text-slate-700 hover:text-cyan-600 hover:bg-white/60"
            }`}
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            {t("common.back")}
          </Button>
        </Link>

        <div
          className={`backdrop-blur-md rounded-3xl shadow-xl p-10 md:p-14 max-w-3xl mx-auto transition-colors ${
            isDarkMode
              ? "bg-[#1a1f3a]/80 border border-slate-700/50"
              : "bg-white/80 border border-white/40"
          }`}
        >
          <div className="text-center mb-10">
            <h1
              className={`text-4xl md:text-5xl font-bold mb-4 transition-colors ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              {testTitles[testId] || "Vision Test"}
            </h1>
            <p
              className={`text-lg transition-colors ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {t("test.instructions")}
            </p>
          </div>

          {!testStarted ? (
            <div className="text-center space-y-6">
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-colors ${
                  isDarkMode ? "bg-cyan-400/20" : "bg-cyan-100"
                }`}
              >
                <Camera
                  className={`w-12 h-12 transition-colors ${
                    isDarkMode ? "text-cyan-400" : "text-cyan-600"
                  }`}
                />
              </div>

              <div>
                <h2
                  className={`text-2xl font-bold mb-3 transition-colors ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {t("test.cameraRequired")}
                </h2>
                <p
                  className={`max-w-md mx-auto leading-relaxed transition-colors ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {t("test.cameraMessage")}
                </p>
              </div>

              {cameraPermission === "denied" && (
                <div
                  className={`flex items-center gap-3 p-4 rounded-xl border max-w-md mx-auto transition-colors ${
                    isDarkMode
                      ? "bg-red-500/10 border-red-500/30 text-red-400"
                      : "bg-red-50 border-red-200 text-red-700"
                  }`}
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p className="text-sm text-left">{t("test.cameraDenied")}</p>
                </div>
              )}

              {cameraPermission === "granted" && (
                <div
                  className={`flex items-center gap-3 p-4 rounded-xl border max-w-md mx-auto transition-colors ${
                    isDarkMode
                      ? "bg-green-500/10 border-green-500/30 text-green-400"
                      : "bg-green-50 border-green-200 text-green-700"
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <p className="text-sm">{t("test.cameraGranted")}</p>
                </div>
              )}

              <div className="pt-4">
                <Button
                  size="lg"
                  className={`h-14 px-12 text-white text-lg rounded-full shadow-lg transition-colors ${
                    isDarkMode
                      ? "bg-cyan-500 hover:bg-cyan-400"
                      : "bg-cyan-500 hover:bg-cyan-600"
                  }`}
                  onClick={requestCamera}
                  disabled={
                    cameraPermission === "requesting" ||
                    cameraPermission === "granted"
                  }
                >
                  {cameraPermission === "requesting" ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                      {t("test.requestingAccess")}
                    </>
                  ) : (
                    <>
                      <Camera className="mr-2 w-5 h-5" />
                      {t("test.enableCamera")}
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Instructions Box */}
              <div
                className={`p-5 rounded-2xl border transition-colors ${
                  isDarkMode
                    ? "bg-blue-500/10 border-blue-500/20"
                    : "bg-blue-50 border-blue-200"
                }`}
              >
                <h3
                  className={`font-semibold mb-2 flex items-center gap-2 transition-colors ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  {t("test.testInstructions")}
                </h3>
                <ul
                  className={`text-sm space-y-1 leading-relaxed transition-colors ${
                    isDarkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  <li>• {t("test.instruction1")}</li>
                  <li>• {t("test.instruction2")}</li>
                  <li>• {t("test.instruction3")}</li>
                  <li>• {t("test.instruction4")}</li>
                </ul>
              </div>

              {/* Video Preview */}
              <div
                className={`h-[320px] rounded-2xl flex items-center justify-center relative overflow-hidden border transition-colors ${
                  isDarkMode
                    ? "bg-slate-800/50 border-slate-700"
                    : "bg-slate-100 border-slate-200"
                }`}
              >
                <div
                  className={`absolute inset-0 animate-pulse transition-colors ${
                    isDarkMode
                      ? "bg-gradient-to-br from-cyan-400/10 via-blue-400/5 to-cyan-400/10"
                      : "bg-gradient-to-br from-cyan-100 via-blue-50 to-cyan-100"
                  }`}
                />
                <div className="relative z-10 text-center">
                  <Camera
                    className={`w-16 h-16 mx-auto mb-4 transition-colors ${
                      isDarkMode ? "text-cyan-400" : "text-cyan-600"
                    }`}
                  />
                  <p
                    className={`text-lg font-medium transition-colors ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {t("test.testInProgress")}
                  </p>
                  <p
                    className={`text-sm transition-colors ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {t("test.maintainFocus")}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span
                    className={`transition-colors ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {t("test.progress")}
                  </span>
                  <span
                    className={`font-medium transition-colors ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {progress}%
                  </span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
