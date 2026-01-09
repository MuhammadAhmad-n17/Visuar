import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Share2,
  CheckCircle2,
  AlertTriangle,
  Info,
  TrendingUp,
  Eye,
  Activity,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTheme } from "../context/ThemeContext";

export default function ResultsPage() {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const { testId } = useParams();

  const testTitles = {
    contrast: "Contrast Sensitivity",
    color: "Color Differentiation",
    "eye-tracking": "Eye Tracking",
    depth: "Depth Perception",
    reaction: "Reaction Time",
    strain: "Digital Eye Strain",
    complete: "Complete Vision Assessment",
  };

  const results = {
    overallScore: 87,
    status: "good",
    metrics: [
      { label: t("test.visualAcuity"), value: 92, status: "excellent" },
      { label: t("test.contrastSensitivity"), value: 85, status: "good" },
      { label: t("test.colorPerception"), value: 88, status: "good" },
      { label: t("test.blinkRate"), value: 78, status: "moderate" },
      { label: t("test.gazeStability"), value: 90, status: "excellent" },
      { label: t("test.focusAccuracy"), value: 82, status: "good" },
    ],
    findings: [
      {
        type: "info",
        title: t("test.finding1Title"),
        description: t("test.finding1Desc"),
      },
      {
        type: "success",
        title: t("test.finding2Title"),
        description: t("test.finding2Desc"),
      },
    ],
    recommendations: [
      t("test.recommendation1"),
      t("test.recommendation2"),
      t("test.recommendation3"),
      t("test.recommendation4"),
    ],
  };

  return (
    <div
      className={`min-h-screen p-4 md:p-8 relative overflow-hidden transition-colors ${
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

      <div className="max-w-5xl mx-auto relative z-10">
        <Link to="/dashboard">
          <Button
            variant="ghost"
            className={`mb-6 transition-colors ${
              isDarkMode
                ? "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                : "text-slate-700 hover:text-cyan-600 hover:bg-white/60"
            }`}
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            {t("common.back")}
          </Button>
        </Link>

        <div
          className={`backdrop-blur-md rounded-3xl shadow-xl p-8 md:p-12 transition-colors ${
            isDarkMode
              ? "bg-[#1a1f3a]/80 border border-slate-700/50"
              : "bg-white/80 border border-white/40"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 transition-colors ${
                isDarkMode
                  ? "bg-green-500/20 border border-green-500/30 text-green-400"
                  : "bg-green-100 border border-green-200 text-green-700"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {t("test.testCompleted")}
            </div>
            <h1
              className={`text-4xl md:text-5xl font-bold mb-3 transition-colors ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              {testTitles[testId]} Results
            </h1>
            <p
              className={`text-lg transition-colors ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {t("test.completedOn")}{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Overall Score */}
          <div
            className={`rounded-2xl p-8 mb-8 transition-colors ${
              isDarkMode
                ? "bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
                : "bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100"
            }`}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div
                  className={`w-32 h-32 rounded-full border-8 border-cyan-500 flex items-center justify-center transition-colors ${
                    isDarkMode ? "bg-slate-800/50" : "bg-white"
                  }`}
                >
                  <div className="text-center">
                    <div
                      className={`text-4xl font-bold transition-colors ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {results.overallScore}
                    </div>
                    <div
                      className={`text-xs transition-colors ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {t("test.outOf")}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2
                  className={`text-3xl font-bold mb-2 transition-colors ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {t("test.overallVisionHealth")}
                </h2>
                <p
                  className={`text-lg leading-relaxed transition-colors ${
                    isDarkMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {t("test.healthMessage")}
                </p>
                <div className="flex gap-3 mt-6 justify-center md:justify-start">
                  <Button
                    className={`rounded-full transition-colors ${
                      isDarkMode
                        ? "bg-cyan-500 hover:bg-cyan-400 text-white"
                        : "bg-cyan-500 hover:bg-cyan-600 text-white"
                    }`}
                  >
                    <Download className="mr-2 w-4 h-4" />
                    {t("test.downloadReport")}
                  </Button>
                  <Button
                    variant="outline"
                    className={`rounded-full transition-colors ${
                      isDarkMode
                        ? "border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 bg-transparent"
                        : "border-cyan-300 text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700 bg-transparent"
                    }`}
                  >
                    <Share2 className="mr-2 w-4 h-4" />
                    {t("test.shareResults")}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Metrics */}
          <div
            className={`rounded-2xl p-8 mb-8 transition-colors ${
              isDarkMode
                ? "bg-slate-800/50 border border-slate-700/50"
                : "bg-white border border-slate-200"
            }`}
          >
            <h3
              className={`text-2xl font-bold mb-6 flex items-center gap-2 transition-colors ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              <Activity
                className={`w-6 h-6 transition-colors ${
                  isDarkMode ? "text-cyan-400" : "text-cyan-600"
                }`}
              />
              {t("test.detailedMetrics")}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {results.metrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span
                      className={`font-medium transition-colors ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {metric.label}
                    </span>
                    <Badge
                      className={
                        metric.status === "excellent"
                          ? isDarkMode
                            ? "bg-green-500/20 border-green-500/30 text-green-400"
                            : "bg-green-500 text-white"
                          : metric.status === "good"
                          ? isDarkMode
                            ? "bg-cyan-500/20 border-cyan-500/30 text-cyan-400"
                            : "bg-cyan-500 text-white"
                          : isDarkMode
                          ? "bg-amber-500/20 border-amber-500/30 text-amber-400"
                          : "bg-amber-500 text-white"
                      }
                    >
                      {t(`test.${metric.status}`)}
                    </Badge>
                  </div>
                  <div
                    className={`h-2 rounded-full overflow-hidden transition-colors ${
                      isDarkMode ? "bg-slate-700/50" : "bg-slate-100"
                    }`}
                  >
                    <div
                      className={`h-full transition-all ${
                        metric.status === "excellent"
                          ? "bg-green-500"
                          : metric.status === "good"
                          ? "bg-cyan-500"
                          : "bg-amber-500"
                      }`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                  <div
                    className={`text-sm transition-colors ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {metric.value}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Findings */}
          <div
            className={`rounded-2xl p-8 mb-8 transition-colors ${
              isDarkMode
                ? "bg-slate-800/50 border border-slate-700/50"
                : "bg-white border border-slate-200"
            }`}
          >
            <h3
              className={`text-2xl font-bold mb-6 flex items-center gap-2 transition-colors ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              <Eye
                className={`w-6 h-6 transition-colors ${
                  isDarkMode ? "text-cyan-400" : "text-cyan-600"
                }`}
              />
              {t("test.keyFindings")}
            </h3>
            <div className="space-y-4">
              {results.findings.map((finding, index) => (
                <div
                  key={index}
                  className={`flex gap-4 p-5 rounded-xl border transition-colors ${
                    isDarkMode
                      ? finding.type === "success"
                        ? "bg-green-500/10 border-green-500/30"
                        : finding.type === "warning"
                        ? "bg-amber-500/10 border-amber-500/30"
                        : "bg-blue-500/10 border-blue-500/30"
                      : finding.type === "success"
                      ? "bg-green-50 border-green-200"
                      : finding.type === "warning"
                      ? "bg-amber-50 border-amber-200"
                      : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {finding.type === "success" && (
                      <CheckCircle2
                        className={`w-5 h-5 transition-colors ${
                          isDarkMode ? "text-green-400" : "text-green-600"
                        }`}
                      />
                    )}
                    {finding.type === "warning" && (
                      <AlertTriangle
                        className={`w-5 h-5 transition-colors ${
                          isDarkMode ? "text-amber-400" : "text-amber-600"
                        }`}
                      />
                    )}
                    {finding.type === "info" && (
                      <Info
                        className={`w-5 h-5 transition-colors ${
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                      />
                    )}
                  </div>
                  <div>
                    <h4
                      className={`font-semibold mb-1 transition-colors ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {finding.title}
                    </h4>
                    <p
                      className={`text-sm leading-relaxed transition-colors ${
                        isDarkMode ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {finding.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div
            className={`rounded-2xl p-8 transition-colors ${
              isDarkMode
                ? "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20"
                : "bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100"
            }`}
          >
            <h3
              className={`text-2xl font-bold mb-6 flex items-center gap-2 transition-colors ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              <TrendingUp
                className={`w-6 h-6 transition-colors ${
                  isDarkMode ? "text-cyan-400" : "text-cyan-600"
                }`}
              />
              {t("test.recommendations")}
            </h3>
            <div className="space-y-4">
              {results.recommendations.map((recommendation, index) => (
                <div key={index} className="flex gap-4">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isDarkMode ? "bg-cyan-500/20" : "bg-cyan-100"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full transition-colors ${
                        isDarkMode ? "bg-cyan-400" : "bg-cyan-500"
                      }`}
                    />
                  </div>
                  <p
                    className={`leading-relaxed transition-colors ${
                      isDarkMode ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    {recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/test-selection">
              <Button
                size="lg"
                className={`h-14 px-10 rounded-full transition-colors ${
                  isDarkMode
                    ? "bg-cyan-500 hover:bg-cyan-400 text-white"
                    : "bg-cyan-500 hover:bg-cyan-600 text-white"
                }`}
              >
                {t("test.retakeTest")}
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className={`h-14 px-10 border-2 rounded-full bg-transparent transition-colors ${
                  isDarkMode
                    ? "border-cyan-400/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400"
                    : "border-cyan-500/30 text-cyan-600 hover:bg-cyan-50 hover:border-cyan-500 hover:text-cyan-700"
                }`}
              >
                {t("test.backToDashboard")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
