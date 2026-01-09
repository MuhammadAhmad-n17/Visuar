import { Link } from "react-router-dom";
import {
  Eye,
  Target,
  Activity,
  Gauge,
  Circle,
  Focus,
  Layers,
  ArrowLeft,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTheme } from "../context/ThemeContext";

export default function TestSelectionPage() {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const tests = [
    {
      id: "snellen-acuity",
      icon: Eye,
      title: "Snellen Acuity",
      description: t("testSelection.snellenAcuityDesc"),
      duration: "4 min",
    },
    {
      id: "contrast-sensitivity",
      icon: Gauge,
      title: "Contrast Sensitivity",
      description: t("testSelection.contrastSensitivityDesc"),
      duration: "3 min",
    },
    {
      id: "orientation-discrimination",
      icon: Circle,
      title: "Orientation Discrimination",
      description: t("testSelection.orientationDiscriminationDesc"),
      duration: "3 min",
    },
    {
      id: "rapid-recognition",
      icon: Activity,
      title: "Rapid Recognition",
      description: t("testSelection.rapidRecognitionDesc"),
      duration: "2 min",
    },
    {
      id: "sustained-focus",
      icon: Target,
      title: "Sustained Focus",
      description: t("testSelection.sustainedFocusDesc"),
      duration: "5 min",
    },
    {
      id: "blur-tolerance",
      icon: Focus,
      title: "Blur Tolerance",
      description: t("testSelection.blurToleranceDesc"),
      duration: "3 min",
    },
    {
      id: "near-far-switching",
      icon: Layers,
      title: "Near-Far Switching",
      description: t("testSelection.nearFarSwitchingDesc"),
      duration: "4 min",
    },
  ];

  return (
    <div
      className={`min-h-screen p-8 relative overflow-hidden transition-colors duration-300 ${
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

      <div className="w-full max-w-6xl mx-auto relative z-10">
        {/* Back Button */}
        <Link to="/dashboard">
          <Button
            variant="ghost"
            className={`mb-8 transition-colors ${
              isDarkMode
                ? "text-slate-300 hover:text-white hover:bg-slate-800/50"
                : "text-slate-700 hover:text-cyan-600 hover:bg-white/60"
            }`}
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            {t("testSelection.back")}
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4 transition-colors ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            {t("testSelection.title")}
          </h1>
          <p
            className={`text-lg max-w-2xl mx-auto leading-relaxed transition-colors ${
              isDarkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {t("testSelection.subtitle")}
          </p>
        </div>

        {/* Tests Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {tests.map((test, index) => {
            const Icon = test.icon;
            return (
              <Link
                key={test.id}
                to={`/test/${test.id}`}
                className={`group backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isDarkMode
                    ? "bg-[#1a1f3a]/80 border border-slate-700/50 hover:border-cyan-400/50 hover:bg-[#1f2542]/90"
                    : "bg-white/90 border border-white/60 hover:border-cyan-300"
                } ${index === tests.length - 1 ? "lg:col-start-2" : ""}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isDarkMode
                        ? "bg-cyan-400/20 group-hover:bg-cyan-400/30"
                        : "bg-cyan-100 group-hover:bg-cyan-500"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 transition-colors ${
                        isDarkMode
                          ? "text-cyan-400 group-hover:text-cyan-300"
                          : "text-cyan-600 group-hover:text-white"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full transition-colors ${
                      isDarkMode
                        ? "bg-slate-700/50 text-slate-300"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {test.duration}
                  </span>
                </div>
                <h3
                  className={`text-lg font-bold mb-2 transition-colors ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {test.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed transition-colors ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
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
              className={`h-14 px-12 text-white text-lg rounded-full shadow-lg hover:shadow-xl transition-all ${
                isDarkMode
                  ? "bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500"
                  : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              }`}
            >
              {t("testSelection.startTest")}
            </Button>
          </Link>
          <p
            className={`mt-4 text-sm transition-colors ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {t("testSelection.completeAssessmentDesc")}
          </p>
        </div>
      </div>
    </div>
  );
}
