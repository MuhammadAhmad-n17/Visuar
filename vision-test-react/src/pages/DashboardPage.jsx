import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  TrendingUp,
  Calendar,
  Download,
  Eye,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const testHistory = [
    {
      id: 1,
      date: "2025-01-15",
      type: "Complete Assessment",
      score: 87,
      status: "good",
    },
    {
      id: 2,
      date: "2025-01-08",
      type: "Eye Tracking",
      score: 90,
      status: "excellent",
    },
    {
      id: 3,
      date: "2025-01-01",
      type: "Color Differentiation",
      score: 88,
      status: "good",
    },
    {
      id: 4,
      date: "2024-12-25",
      type: "Contrast Sensitivity",
      score: 85,
      status: "good",
    },
    {
      id: 5,
      date: "2024-12-18",
      type: "Depth Perception",
      score: 82,
      status: "good",
    },
  ];

  const averageScore = Math.round(
    testHistory.reduce((sum, test) => sum + test.score, 0) / testHistory.length
  );
  const latestScore = testHistory[0].score;
  const scoreImprovement =
    latestScore - testHistory[testHistory.length - 1].score;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white p-4 md:p-8 relative overflow-hidden">
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button
              variant="ghost"
              className="text-slate-700 hover:text-cyan-600 hover:bg-white/60"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Home
            </Button>
          </Link>
          <div className="flex gap-2">
            <Link to="/settings">
              <Button
                variant="ghost"
                className="text-slate-700 hover:text-cyan-600 hover:bg-white/60"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="text-slate-700 hover:text-red-600 hover:bg-white/60"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/40 p-8 md:p-12">
          {/* Title Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                Vision Dashboard
              </h1>
              <p className="text-slate-600 text-lg">
                Track your eye health progress over time
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/test-selection">
                <Button
                  size="lg"
                  className="h-14 px-10 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <Plus className="mr-2 w-5 h-5" />
                  Run New Test
                </Button>
              </Link>
              <Link to="/profile">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 border-2 border-cyan-500/20 text-cyan-600 hover:bg-cyan-50 rounded-full bg-transparent"
                >
                  View Profile
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-cyan-600" />
                </div>
                <Badge className="bg-cyan-500 text-white">Latest</Badge>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">
                {latestScore}
              </div>
              <div className="text-sm text-slate-600">Current Score</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <Badge className="bg-blue-500 text-white">Average</Badge>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">
                {averageScore}
              </div>
              <div className="text-sm text-slate-600">Average Score</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <Badge
                  className={
                    scoreImprovement >= 0
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }
                >
                  {scoreImprovement >= 0
                    ? `+${scoreImprovement}`
                    : scoreImprovement}
                </Badge>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">
                {scoreImprovement >= 0 ? "Improving" : "Declining"}
              </div>
              <div className="text-sm text-slate-600">Progress Trend</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-100 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <Badge className="bg-purple-500 text-white">Total</Badge>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">
                {testHistory.length}
              </div>
              <div className="text-sm text-slate-600">Tests Completed</div>
            </div>
          </div>

          {/* Test History */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Test History
              </h2>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 text-slate-700 bg-transparent"
              >
                <Download className="mr-2 w-4 h-4" />
                Export All
              </Button>
            </div>

            <div className="space-y-4">
              {testHistory.map((test) => (
                <div
                  key={test.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl bg-white border border-slate-200 hover:border-cyan-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center shrink-0">
                      <Eye className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">
                        {test.type}
                      </div>
                      <div className="text-sm text-slate-600">
                        {new Date(test.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900">
                        {test.score}
                      </div>
                      <Badge
                        className={
                          test.status === "excellent"
                            ? "bg-green-500 text-white"
                            : test.status === "good"
                            ? "bg-cyan-500 text-white"
                            : "bg-slate-300 text-slate-700"
                        }
                      >
                        {test.status}
                      </Badge>
                    </div>
                    <Link to={`/results/${test.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-cyan-300 text-cyan-600 hover:bg-cyan-50 bg-transparent"
                      >
                        View Report
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
