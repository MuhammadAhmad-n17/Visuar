import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Mail, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useAuth } from "../context/AuthContext";
import { profileAPI } from "../lib/api";

export default function ProfilePage() {
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

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
          <div className="text-center mb-10">
            <div className="w-24 h-24 rounded-full bg-cyan-100 flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-cyan-600" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Your Profile
            </h1>
            <p className="text-slate-600">Manage your health information</p>
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
              <Label htmlFor="email" className="text-slate-700 font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="pl-12 h-12 border-slate-300 bg-slate-50 rounded-xl"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="occupation"
                  className="text-slate-700 font-medium"
                >
                  Occupation
                </Label>
                <Input
                  id="occupation"
                  name="occupation"
                  type="text"
                  value={profileData.occupation}
                  onChange={handleChange}
                  required
                  className="h-12 border-slate-300 focus:border-cyan-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="average_screen_time"
                  className="text-slate-700 font-medium"
                >
                  Screen Time (hours/day)
                </Label>
                <Input
                  id="average_screen_time"
                  name="average_screen_time"
                  type="number"
                  value={profileData.average_screen_time}
                  onChange={handleChange}
                  required
                  className="h-12 border-slate-300 focus:border-cyan-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="glasses_user"
                  className="text-slate-700 font-medium"
                >
                  Glasses User
                </Label>
                <select
                  id="glasses_user"
                  name="glasses_user"
                  value={profileData.glasses_user}
                  onChange={handleChange}
                  required
                  className="w-full h-12 px-4 border border-slate-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="lens_power"
                  className="text-slate-700 font-medium"
                >
                  Lens Power (optional)
                </Label>
                <Input
                  id="lens_power"
                  name="lens_power"
                  type="text"
                  value={profileData.lens_power}
                  onChange={handleChange}
                  className="h-12 border-slate-300 focus:border-cyan-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="lighting_environment"
                  className="text-slate-700 font-medium"
                >
                  Lighting Environment
                </Label>
                <Input
                  id="lighting_environment"
                  name="lighting_environment"
                  type="text"
                  value={profileData.lighting_environment}
                  onChange={handleChange}
                  required
                  className="h-12 border-slate-300 focus:border-cyan-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="work_environment"
                  className="text-slate-700 font-medium"
                >
                  Work Environment
                </Label>
                <Input
                  id="work_environment"
                  name="work_environment"
                  type="text"
                  value={profileData.work_environment}
                  onChange={handleChange}
                  required
                  className="h-12 border-slate-300 focus:border-cyan-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="diet_habits"
                  className="text-slate-700 font-medium"
                >
                  Diet Habits
                </Label>
                <Input
                  id="diet_habits"
                  name="diet_habits"
                  type="text"
                  value={profileData.diet_habits}
                  onChange={handleChange}
                  required
                  className="h-12 border-slate-300 focus:border-cyan-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="eye_pain_or_headache"
                  className="text-slate-700 font-medium"
                >
                  Eye Pain/Headache
                </Label>
                <select
                  id="eye_pain_or_headache"
                  name="eye_pain_or_headache"
                  value={profileData.eye_pain_or_headache}
                  onChange={handleChange}
                  required
                  className="w-full h-12 px-4 border border-slate-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="sleep_hours"
                  className="text-slate-700 font-medium"
                >
                  Sleep Hours
                </Label>
                <Input
                  id="sleep_hours"
                  name="sleep_hours"
                  type="number"
                  value={profileData.sleep_hours}
                  onChange={handleChange}
                  required
                  className="h-12 border-slate-300 focus:border-cyan-500 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="medical_history"
                className="text-slate-700 font-medium"
              >
                Medical History (optional)
              </Label>
              <textarea
                id="medical_history"
                name="medical_history"
                value={profileData.medical_history}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                disabled={saving}
                className="flex-1 h-12 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full disabled:opacity-50"
              >
                <Save className="mr-2 w-5 h-5" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              <Link to="/dashboard" className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 border-slate-300 text-slate-700 rounded-full bg-transparent"
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
