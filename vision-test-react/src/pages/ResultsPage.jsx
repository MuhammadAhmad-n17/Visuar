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
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function ResultsPage() {
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
      { label: "Visual Acuity", value: 92, status: "excellent" },
      { label: "Contrast Sensitivity", value: 85, status: "good" },
      { label: "Color Perception", value: 88, status: "good" },
      { label: "Blink Rate", value: 78, status: "moderate" },
      { label: "Gaze Stability", value: 90, status: "excellent" },
      { label: "Focus Accuracy", value: 82, status: "good" },
    ],
    findings: [
      {
        type: "info",
        title: "Slightly Elevated Blink Rate",
        description:
          "Your blink rate is slightly higher than average, which may indicate mild digital eye strain from extended screen use.",
      },
      {
        type: "success",
        title: "Excellent Gaze Stability",
        description:
          "Your eye tracking shows stable gaze patterns with minimal deviation, indicating healthy eye muscle coordination.",
      },
    ],
    recommendations: [
      "Take regular breaks using the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds",
      "Consider adjusting screen brightness and contrast to reduce eye strain",
      "Ensure proper ambient lighting when using digital devices",
      "Schedule a comprehensive eye exam with an optometrist within the next 6 months",
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white p-4 md:p-8 relative overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-5xl mx-auto relative z-10">
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
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 border border-green-200 text-green-700 text-sm font-medium mb-4">
              <CheckCircle2 className="w-4 h-4" />
              Test Completed
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
              {testTitles[testId]} Results
            </h1>
            <p className="text-slate-600 text-lg">
              Completed on{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Overall Score */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 mb-8 border border-cyan-100">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-8 border-cyan-500 flex items-center justify-center bg-white">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-slate-900">
                      {results.overallScore}
                    </div>
                    <div className="text-xs text-slate-600">out of 100</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  Overall Vision Health
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Your vision assessment shows{" "}
                  <span className="text-cyan-600 font-semibold">
                    good overall health
                  </span>{" "}
                  with some areas for potential improvement.
                </p>
                <div className="flex gap-3 mt-6 justify-center md:justify-start">
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full">
                    <Download className="mr-2 w-4 h-4" />
                    Download Report
                  </Button>
                  <Button
                    variant="outline"
                    className="border-cyan-300 text-cyan-600 hover:bg-cyan-50 rounded-full bg-transparent"
                  >
                    <Share2 className="mr-2 w-4 h-4" />
                    Share Results
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="bg-white rounded-2xl p-8 mb-8 border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6 text-cyan-600" />
              Detailed Metrics
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {results.metrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-900">
                      {metric.label}
                    </span>
                    <Badge
                      className={
                        metric.status === "excellent"
                          ? "bg-green-500 text-white"
                          : metric.status === "good"
                          ? "bg-cyan-500 text-white"
                          : "bg-amber-500 text-white"
                      }
                    >
                      {metric.status}
                    </Badge>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
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
                  <div className="text-sm text-slate-600">{metric.value}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Findings */}
          <div className="bg-white rounded-2xl p-8 mb-8 border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Eye className="w-6 h-6 text-cyan-600" />
              Key Findings
            </h3>
            <div className="space-y-4">
              {results.findings.map((finding, index) => (
                <div
                  key={index}
                  className={`flex gap-4 p-5 rounded-xl border ${
                    finding.type === "success"
                      ? "bg-green-50 border-green-200"
                      : finding.type === "warning"
                      ? "bg-amber-50 border-amber-200"
                      : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {finding.type === "success" && (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    )}
                    {finding.type === "warning" && (
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                    )}
                    {finding.type === "info" && (
                      <Info className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">
                      {finding.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {finding.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-cyan-600" />
              Recommendations
            </h3>
            <div className="space-y-4">
              {results.recommendations.map((recommendation, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  </div>
                  <p className="text-slate-700 leading-relaxed">
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
                className="h-14 px-10 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full"
              >
                Take Another Test
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-10 border-2 border-cyan-500/20 text-cyan-600 hover:bg-cyan-50 rounded-full bg-transparent"
              >
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
