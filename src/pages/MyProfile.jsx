// src/pages/MyProfile.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function joinComma(arr) {
  return (arr || []).join(", ");
}

function splitComma(text) {
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function MyProfile() {
  const nav = useNavigate();
  const { currentProfile, updateMyProfile, signOut } = useAuth();

  const [draft, setDraft] = useState(null);

  useEffect(() => {
    if (!currentProfile) return;
    setDraft({
      ...currentProfile,
      strengthsText: joinComma(currentProfile.strengths),
      goalsText: joinComma(currentProfile.goals),
    });
  }, [currentProfile]);

  const isReady = !!currentProfile;

  function onPickAvatar(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setDraft((p) => ({ ...p, avatarUrl: reader.result }));
    reader.readAsDataURL(file);
  }

 async function save() {
  try {
    await updateMyProfile({
      name: draft.name,
      location: draft.location,
      avatarUrl: draft.avatarUrl || null,
      role: draft.role,

      school: draft.role === "Player" ? draft.school || "" : "",
      positions: draft.role === "Player" ? draft.positions || "" : "",
      program: draft.role === "Coach" ? draft.program || "" : "",

      strengths: splitComma(draft.strengthsText || ""),
      goals: splitComma(draft.goalsText || ""),
    });

    nav(`/people/${currentProfile.id}`);
  } catch (error) {
    alert(error.message || "Failed to save profile.");
  }
}

  if (!isReady) {
    return (
      <div className="container py-5">
        <h1 className="section-title">My Profile</h1>
        <div className="cl-card p-4">
          <p className="text-muted mb-3">You’re not signed in.</p>
          <Link className="btn btn-primary" to="/auth">Go to Sign In</Link>
        </div>
      </div>
    );
  }

  if (!draft) return null;

  return (
    <div className="bg-cl-page">
      <div className="container py-5" style={{ maxWidth: 860 }}>
        <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap mb-3">
          <h1 className="section-title mb-0">My Profile</h1>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary" onClick={() => { signOut(); nav("/"); }}>
              Sign Out
            </button>
            <Link className="btn btn-outline-primary" to={`/people/${currentProfile.id}`}>
              View Public Profile
            </Link>
          </div>
        </div>

        <div className="cl-card p-4">
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label fw-bold">Profile photo</label>
              <input className="form-control" type="file" accept="image/*" onChange={(e) => onPickAvatar(e.target.files?.[0])} />
              {draft.avatarUrl && (
                <div className="mt-3">
                  <img
                    src={draft.avatarUrl}
                    alt="preview"
                    style={{ width: 96, height: 96, borderRadius: 999, objectFit: "cover" }}
                  />
                </div>
              )}
            </div>

            <div className="col-12">
              <label className="form-label fw-bold">Name</label>
              <input className="form-control form-control-lg" value={draft.name} onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))} />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold">Role</label>
              <select className="form-select form-select-lg" value={draft.role} onChange={(e) => setDraft((p) => ({ ...p, role: e.target.value }))}>
                <option value="Player">Player</option>
                <option value="Coach">Coach</option>
              </select>
              <div className="small text-muted mt-1">If you switch roles, fields change.</div>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold">Location</label>
              <input className="form-control form-control-lg" value={draft.location || ""} onChange={(e) => setDraft((p) => ({ ...p, location: e.target.value }))} />
            </div>

            {draft.role === "Player" ? (
              <>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">School</label>
                  <input className="form-control form-control-lg" value={draft.school || ""} onChange={(e) => setDraft((p) => ({ ...p, school: e.target.value }))} />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Positions</label>
                  <input className="form-control form-control-lg" value={draft.positions || ""} onChange={(e) => setDraft((p) => ({ ...p, positions: e.target.value }))} />
                </div>
              </>
            ) : (
              <div className="col-12">
                <label className="form-label fw-bold">Program</label>
                <input className="form-control form-control-lg" value={draft.program || ""} onChange={(e) => setDraft((p) => ({ ...p, program: e.target.value }))} />
              </div>
            )}

            <div className="col-12">
              <label className="form-label fw-bold">Strengths (comma-separated)</label>
              <input className="form-control form-control-lg" value={draft.strengthsText || ""} onChange={(e) => setDraft((p) => ({ ...p, strengthsText: e.target.value }))} />
            </div>

            <div className="col-12">
              <label className="form-label fw-bold">Goals (comma-separated)</label>
              <input className="form-control form-control-lg" value={draft.goalsText || ""} onChange={(e) => setDraft((p) => ({ ...p, goalsText: e.target.value }))} />
            </div>

            <div className="col-12 d-flex gap-2 mt-2">
              <button className="btn btn-primary btn-lg" onClick={save}>
                Save Changes
              </button>
              <Link className="btn btn-outline-primary btn-lg" to="/discover">
                Back to Discover
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}