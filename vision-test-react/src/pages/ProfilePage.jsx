import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Mail, Save } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useAuth } from "../context/AuthContext";
import { profileAPI } from "../lib/api";
import { useTheme } from "../context/ThemeContext";

export default function ProfilePage() {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [profileData, setProfileData] = useState({
    occupation: "",
    average_screen_time: "",
    glasses_user: "",
    lens_power: "",
    lighting_environment: "",
    work_environment: "",
    diet_habits: "",
    eye_pain_or_headache: "",
    sleep_hours: "",
    medical_history: "",
    smoker: "",
    alcohol_consumption: "",
    exercise_frequency: "",
    water_intake: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = await profileAPI.getProfile();
      setProfileData(data);
    } catch (err) {
      // Profile might not exist yet, which is okay
      if (err.response?.status !== 404) {
        setError("Failed to load profile");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await profileAPI.createOrUpdateProfile(profileData);
      setSuccess("Profile saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors ${
          isDarkMode
            ? "bg-[#0a0e27]"
            : "bg-gradient-to-br from-blue-50 via-cyan-50 to-white"
        }`}
      >
        <AnimatedBackground isDarkMode={isDarkMode} />
        <div className="relative z-10">
          <div
            className={`backdrop-blur-md rounded-3xl shadow-2xl p-16 w-80 transition-colors animate-pulse ${
              isDarkMode
                ? "bg-[#1a1f3a]/90 border border-slate-700/50 shadow-cyan-400/20"
                : "bg-white/90 border border-white/60 shadow-cyan-500/20"
            }`}
          >
            <div className="relative flex items-center justify-center mb-10 mt-4">
              {/* Outer rotating ring */}
              <div
                className={`absolute animate-spin rounded-full h-24 w-24 border-4 border-transparent ${
                  isDarkMode
                    ? "border-t-cyan-400 border-r-purple-400"
                    : "border-t-cyan-500 border-r-purple-500"
                }`}
                style={{ animationDuration: "1.5s" }}
              ></div>
              {/* Middle counter-rotating ring */}
              <div
                className={`absolute animate-spin rounded-full h-20 w-20 border-4 border-transparent ${
                  isDarkMode
                    ? "border-b-blue-400 border-l-cyan-400"
                    : "border-b-blue-500 border-l-cyan-500"
                }`}
                style={{
                  animationDuration: "2s",
                  animationDirection: "reverse",
                }}
              ></div>
              {/* Inner pulsing circle */}
              <div
                className={`absolute animate-ping rounded-full h-16 w-16 opacity-30 ${
                  isDarkMode ? "bg-cyan-400" : "bg-cyan-500"
                }`}
              ></div>
              {/* Center dot */}
              <div
                className={`relative rounded-full h-4 w-4 ${
                  isDarkMode ? "bg-cyan-400" : "bg-cyan-500"
                }`}
              ></div>
            </div>
            <div className="text-center space-y-2">
              <p
                className={`text-xl font-bold transition-colors ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
              >
                {t("common.loading")}
              </p>
              <div className="flex items-center justify-center gap-1">
                <span
                  className={`w-2 h-2 rounded-full animate-bounce ${
                    isDarkMode ? "bg-cyan-400" : "bg-cyan-500"
                  }`}
                  style={{ animationDelay: "0ms" }}
                ></span>
                <span
                  className={`w-2 h-2 rounded-full animate-bounce ${
                    isDarkMode ? "bg-cyan-400" : "bg-cyan-500"
                  }`}
                  style={{ animationDelay: "150ms" }}
                ></span>
                <span
                  className={`w-2 h-2 rounded-full animate-bounce ${
                    isDarkMode ? "bg-cyan-400" : "bg-cyan-500"
                  }`}
                  style={{ animationDelay: "300ms" }}
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

      <div className="w-full max-w-2xl relative z-10">
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
          className={`backdrop-blur-md rounded-3xl shadow-xl p-8 md:p-12 transition-colors ${
            isDarkMode
              ? "bg-[#1a1f3a]/80 border border-slate-700/50"
              : "bg-white/80 border border-white/40"
          }`}
        >
          <div className="text-center mb-10">
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${
                isDarkMode ? "bg-cyan-400/20" : "bg-cyan-100"
              }`}
            >
              <User
                className={`w-12 h-12 transition-colors ${
                  isDarkMode ? "text-cyan-400" : "text-cyan-600"
                }`}
              />
            </div>
            <h1
              className={`text-4xl font-bold mb-2 transition-colors ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              {t("profile.yourProfile")}
            </h1>
            <p
              className={`transition-colors ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {user?.user_metadata?.full_name && (
                <span
                  className={`font-semibold transition-colors ${
                    isDarkMode ? "text-cyan-400" : "text-cyan-600"
                  }`}
                >
                  {user.user_metadata.full_name} -{" "}
                </span>
              )}
              {t("profile.manageInfo")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {success}
              </div>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className={`font-medium transition-colors ${
                  isDarkMode ? "text-slate-200" : "text-slate-700"
                }`}
              >
                {t("profile.email")}
              </Label>
              <div className="relative">
                <Mail
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    isDarkMode ? "text-slate-500" : "text-slate-400"
                  }`}
                />
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className={`pl-12 h-12 rounded-xl transition-colors ${
                    isDarkMode
                      ? "border-slate-700 bg-slate-800/50 text-slate-400"
                      : "border-slate-300 bg-slate-50"
                  }`}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="occupation"
                  className={`font-medium transition-colors ${
                    isDarkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  {t("profile.occupation")}
                </Label>
                <Input
                  id="occupation"
                  name="occupation"
                  type="text"
                  value={profileData.occupation}
                  onChange={handleChange}
                  required
                  className={`h-12 focus:border-cyan-500 rounded-xl transition-colors ${
                    isDarkMode
                      ? "border-slate-600 bg-slate-800/50 text-white placeholder:text-slate-500"
                      : "border-slate-300"
                  }`}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="average_screen_time"
                  className={`font-medium transition-colors ${
                    isDarkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  {t("profile.screenTime")}
                </Label>
                <Input
                  id="average_screen_time"
                  name="average_screen_time"
                  type="number"
                  value={profileData.average_screen_time}
                  onChange={handleChange}
                  required
                  className={`h-12 focus:border-cyan-500 rounded-xl transition-colors ${
                    isDarkMode
                      ? "border-slate-600 bg-slate-800/50 text-white placeholder:text-slate-500"
                      : "border-slate-300"
                  }`}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="glasses_user"
                  className={`font-medium transition-colors ${
                    isDarkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  {t("profile.glassesUser")}
                </Label>
                <Select
                  name="glasses_user"
                  value={profileData.glasses_user}
                  onChange={handleChange}
                  placeholder={t("profile.selectOption")}
                  options={[
                    { value: "yes", label: t("profile.yes") },
                    { value: "no", label: t("profile.no") },
                  ]}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="lens_power"
                  className={`font-medium transition-colors ${
                    isDarkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  {t("profile.lensPower")}
                </Label>
                <Input
                  id="lens_power"
                  name="lens_power"
                  type="text"
                  value={profileData.lens_power}
                  onChange={handleChange}
                  className={`h-12 focus:border-cyan-500 rounded-xl transition-colors ${
                    isDarkMode
                      ? "border-slate-600 bg-slate-800/50 text-white placeholder:text-slate-500"
                      : "border-slate-300"
                  }`}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="lighting_environment"
                  className={`font-medium transition-colors ${
                    isDarkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  {t("profile.lightingEnvironment")}
                </Label>
                <Input
                  id="lighting_environment"
                  name="lighting_environment"
                  type="text"
                  value={profileData.lighting_environment}
                  onChange={handleChange}
                  required
                  className={`h-12 focus:border-cyan-500 rounded-xl transition-colors ${
                    isDarkMode
                      ? "border-slate-600 bg-slate-800/50 text-white placeholder:text-slate-500"
                      : "border-slate-300"
                  }`}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="work_environment"
                  className={`font-medium transition-colors ${
                    isDarkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  {t("profile.workEnvironment")}
                </Label>
                <Input
                  id="work_environment"
                  name="work_environment"
                  type="text"
                  value={profileData.work_environment}
                  onChange={handleChange}
                  required
                  className={`h-12 focus:border-cyan-500 rounded-xl transition-colors ${
                    isDarkMode
                      ? "border-slate-600 bg-slate-800/50 text-white placeholder:text-slate-500"
                      : "border-slate-300"
                  }`}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="diet_habits"
                  className={`font-medium transition-colors ${
                    isDarkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  {t("profile.dietHabits")}
                </Label>
                <Input
                  id="diet_habits"
                  name="diet_habits"
                  type="text"
                  value={profileData.diet_habits}
                  onChange={handleChange}
                  required
                  className={`h-12 focus:border-cyan-500 rounded-xl transition-colors ${
                    isDarkMode
                      ? "border-slate-600 bg-slate-800/50 text-white placeholder:text-slate-500"
                      : "border-slate-300"
                  }`}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="eye_pain_or_headache"
                  className={`font-medium transition-colors ${
                    isDarkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  {t("profile.eyePainHeadache")}
                </Label>
                <Select
                  name="eye_pain_or_headache"
                  value={profileData.eye_pain_or_headache}
                  onChange={handleChange}
                  placeholder={t("profile.selectOption")}
                  options={[
                    { value: "yes", label: t("profile.yes") },
                    { value: "no", label: t("profile.no") },
                  ]}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="sleep_hours"
                  className={`font-medium transition-colors ${
                    isDarkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  {t("profile.sleepHours")}
                </Label>
                <Input
                  id="sleep_hours"
                  name="sleep_hours"
                  type="number"
                  value={profileData.sleep_hours}
                  onChange={handleChange}
                  required
                  className={`h-12 focus:border-cyan-500 rounded-xl transition-colors ${
                    isDarkMode
                      ? "border-slate-600 bg-slate-800/50 text-white placeholder:text-slate-500"
                      : "border-slate-300"
                  }`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="medical_history"
                className={`font-medium transition-colors ${
                  isDarkMode ? "text-slate-200" : "text-slate-700"
                }`}
              >
                {t("profile.medicalHistory")}
              </Label>
              <textarea
                id="medical_history"
                name="medical_history"
                value={profileData.medical_history}
                onChange={handleChange}
                rows={3}
                className={`w-full px-4 py-3 border rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 transition-colors ${
                  isDarkMode
                    ? "border-slate-600 bg-slate-800/50 text-white placeholder:text-slate-500"
                    : "border-slate-300"
                }`}
              />
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                disabled={saving}
                className={`flex-1 h-12 text-white rounded-full disabled:opacity-50 transition-colors ${
                  isDarkMode
                    ? "bg-cyan-500 hover:bg-cyan-400"
                    : "bg-cyan-500 hover:bg-cyan-600"
                }`}
              >
                <Save className="mr-2 w-5 h-5" />
                {saving ? t("profile.saving") : t("profile.saveChanges")}
              </Button>
              <Link to="/dashboard" className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  className={`w-full h-12 rounded-full transition-colors ${
                    isDarkMode
                      ? "border-slate-600 text-slate-300 bg-slate-800/50 hover:bg-slate-700/50"
                      : "border-slate-300 text-slate-700 bg-transparent"
                  }`}
                >
                  {t("profile.cancel")}
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
