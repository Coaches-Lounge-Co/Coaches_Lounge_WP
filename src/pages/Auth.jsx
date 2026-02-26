// src/pages/Auth.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const emptyPlayer = {
  role: "Player",
  name: "",
  school: "",
  positions: "",
  location: "",
  strengthsText: "",
  goalsText: "",
};

const emptyCoach = {
  role: "Coach",
  name: "",
  program: "",
  location: "",
  strengthsText: "",
  goalsText: "",
};

function splitComma(text) {
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function Auth() {
  const nav = useNavigate();
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState("signin"); // "signin" | "signup"

  // auth fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // profile fields
  const [role, setRole] = useState("Player");
  const [avatarUrl, setAvatarUrl] = useState(null);

  const [player, setPlayer] = useState(emptyPlayer);
  const [coach, setCoach] = useState(emptyCoach);

  const profileDraft = useMemo(() => {
    const base = role === "Player" ? player : coach;

    const profile = {
      role,
      name: base.name,
      location: base.location,
      avatarUrl,

      strengths: splitComma(base.strengthsText),
      goals: splitComma(base.goalsText),

      stats: { activeEvents: 0, totalGames: 0, connections: 0 },
      highlights: [],
      recentActivity: [],
      coachesNotes: [],
    };

    if (role === "Player") {
      profile.school = base.school;
      profile.positions = base.positions;
    } else {
      profile.program = base.program;
    }

    return profile;
  }, [role, player, coach, avatarUrl]);

  function onPickAvatar(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarUrl(reader.result); // data URL
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (mode === "signin") {
        await signIn({ email, password });
        nav("/my-profile");
        return;
      }

      // signup
      if (!profileDraft.name.trim()) throw new Error("Name is required.");
      if (role === "Player" && !profileDraft.positions?.trim()) throw new Error("Positions are required for players.");
      if (role === "Coach" && !profileDraft.program?.trim()) throw new Error("Program is required for coaches.");

      const id = await signUp({ email, password, profile: profileDraft });

      // after sign up, go to their public profile or my-profile
      nav(`/people/${id}`);
    } catch (err) {
      alert(err.message || "Something went wrong.");
    }
  }

  const form = role === "Player" ? player : coach;
  const setForm = role === "Player" ? setPlayer : setCoach;

  return (
    <div className="bg-cl-page">
      <div className="container py-5" style={{ maxWidth: 720 }}>
        <h1 className="section-title mb-2">{mode === "signin" ? "Sign In" : "Sign Up"}</h1>
        <p className="text-muted mb-4">
          {mode === "signin" ? "Access your profile." : "Create your profile and get listed in Discover."}
        </p>

        <div className="cl-card p-4">
          <div className="d-flex gap-2 mb-3">
            <button
              className={`btn ${mode === "signin" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setMode("signin")}
              type="button"
            >
              Sign In
            </button>
            <button
              className={`btn ${mode === "signup" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setMode("signup")}
              type="button"
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-12">
              <label className="form-label fw-bold">Email</label>
              <input className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="col-12">
              <label className="form-label fw-bold">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {mode === "signup" && (
                <div className="small text-muted mt-1">Mock-only for now (later: Firebase/Supabase).</div>
              )}
            </div>

            {mode === "signup" && (
              <>
                <div className="col-12">
                  <label className="form-label fw-bold">Role</label>
                  <select
                    className="form-select form-select-lg"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="Player">Player</option>
                    <option value="Coach">Coach</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label fw-bold">Profile photo</label>
                  <input className="form-control" type="file" accept="image/*" onChange={(e) => onPickAvatar(e.target.files?.[0])} />
                  {avatarUrl && (
                    <div className="mt-3 d-flex align-items-center gap-3">
                      <img src={avatarUrl} alt="preview" style={{ width: 72, height: 72, borderRadius: 999, objectFit: "cover" }} />
                      <button type="button" className="btn btn-outline-primary" onClick={() => setAvatarUrl(null)}>
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                <div className="col-12">
                  <label className="form-label fw-bold">Name</label>
                  <input
                    className="form-control form-control-lg"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  />
                </div>

                {role === "Player" ? (
                  <>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold">School</label>
                      <input
                        className="form-control form-control-lg"
                        value={player.school}
                        onChange={(e) => setPlayer((p) => ({ ...p, school: e.target.value }))}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold">Positions</label>
                      <input
                        className="form-control form-control-lg"
                        placeholder="Point Guard / Shooting Guard"
                        value={player.positions}
                        onChange={(e) => setPlayer((p) => ({ ...p, positions: e.target.value }))}
                      />
                    </div>
                  </>
                ) : (
                  <div className="col-12">
                    <label className="form-label fw-bold">Program</label>
                    <input
                      className="form-control form-control-lg"
                      value={coach.program}
                      onChange={(e) => setCoach((p) => ({ ...p, program: e.target.value }))}
                    />
                  </div>
                )}

                <div className="col-12">
                  <label className="form-label fw-bold">Location</label>
                  <input
                    className="form-control form-control-lg"
                    placeholder="Fairfax, VA"
                    value={form.location}
                    onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-bold">Strengths (comma-separated)</label>
                  <input
                    className="form-control form-control-lg"
                    placeholder="Ball Handling, Quickness, Shooting"
                    value={form.strengthsText}
                    onChange={(e) => setForm((p) => ({ ...p, strengthsText: e.target.value }))}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-bold">Goals (comma-separated)</label>
                  <input
                    className="form-control form-control-lg"
                    placeholder="Improve Shooting, Gain exposure"
                    value={form.goalsText}
                    onChange={(e) => setForm((p) => ({ ...p, goalsText: e.target.value }))}
                  />
                </div>
              </>
            )}

            <div className="col-12 d-grid mt-2">
              <button className="btn btn-primary btn-lg" type="submit">
                {mode === "signin" ? "Sign In" : "Create Profile"}
              </button>
            </div>
          </form>
        </div>

        <div className="text-muted small mt-3">
          Note: This only simulates authentication for demo purposes. Don't use a real email or password, as there's no real security here.
        </div>
      </div>
    </div>
  );
}