import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  Monitor,
  Globe,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useAuth } from "../context/AuthContext";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedBackground />

      <div className="w-full max-w-2xl relative z-10">
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
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Settings</h1>
            <p className="text-slate-600">Customize your Visuar experience</p>
          </div>

          <div className="space-y-6">
            {/* Appearance */}
            <div className="pb-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-cyan-600" />
                Appearance
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-700 font-medium">
                    Dark Mode
                  </Label>
                  <p className="text-sm text-slate-600">
                    Switch between light and dark themes
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-12 h-12 rounded-xl border-slate-300 bg-transparent"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>

            {/* Notifications */}
            <div className="pb-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-cyan-600" />
                Notifications
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-700 font-medium">
                    Test Reminders
                  </Label>
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-slate-300 text-cyan-500"
                    defaultChecked
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-slate-700 font-medium">
                    Progress Updates
                  </Label>
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-slate-300 text-cyan-500"
                    defaultChecked
                  />
                </div>
              </div>
            </div>

            {/* Language */}
            <div className="pb-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-600" />
                Language & Region
              </h3>
              <select className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-cyan-500 focus:outline-none text-slate-700">
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>

            {/* Help & Support */}
            <div className="pb-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-cyan-600" />
                Help & Support
              </h3>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-slate-700 hover:bg-cyan-50"
                >
                  FAQ
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-slate-700 hover:bg-cyan-50"
                >
                  Contact Support
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-slate-700 hover:bg-cyan-50"
                >
                  Privacy Policy
                </Button>
              </div>
            </div>

            {/* Logout */}
            <div>
              <Button
                onClick={handleLogout}
                className="w-full h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
